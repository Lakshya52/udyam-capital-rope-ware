import { createContext, useContext, useEffect, useState } from "react";
import {
	services as staticServices,
	subServices as staticSubs,
	serviceDetails as staticDetails,
	documentChecklist,
} from "../data/services.js";
import {
	articles as staticArticles,
	formatViews as staticFormatViews,
} from "../data/articles.js";

// Base of the deployed app (domain root OR a subfolder like /udyam),
// so api/ resolves correctly on every route. VITE_API_URL overrides all.
function apiRoot() {
	const override = import.meta.env.VITE_API_URL;
	if (override) return String(override).replace(/\/$/, "");
	const m = window.location.pathname.match(
		/^(.*)\/(services|articles|case-studies|about|contact|privacy-policy|terms-of-use)(\/.*)?$/,
	);
	const base = m ? m[1] : window.location.pathname.replace(/\/$/, "");
	return window.location.origin + base;
}

const CACHE_KEY = "uc_content_v1";
const TTL = 30 * 60 * 1000;

// Public-asset URL resolver: turns "/Logo.png" into an app-root-absolute
// URL so images work at a domain root AND in a subfolder (/udyam).
// Absolute http(s)/data URLs pass through untouched.
export function asset(p) {
	if (!p || /^(data:|[a-z]+:\/\/)/i.test(p)) return p;
	const path = String(p).replace(/^\/+/, "");
	return `${apiRoot()}/${path}`;
}

function readCache() {
	try {
		const raw = localStorage.getItem(CACHE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed?.ts || Date.now() - parsed.ts > TTL) return null;
		return parsed; // { ts, version, data }
	} catch {
		return null;
	}
}

async function fetchVersion() {
	try {
		const r = await fetch(`${apiRoot()}/api/content.php?type=version`);
		if (!r.ok) return undefined;
		const j = await r.json();
		return j.version ?? null;
	} catch {
		return undefined; // backend too old / unreachable → full fetch below decides
	}
}

async function fetchAll() {
	const get = (q) =>
		fetch(`${apiRoot()}/api/content.php?${q}`).then((r) => {
			if (!r.ok) throw new Error("api");
			return r.json();
		});
	const [services, articles, cases, about, settings] = await Promise.all([
		get("type=services"),
		get("type=articles"),
		get("type=cases"),
		get("type=about"),
		get("type=settings"),
	]);
	if (services?.error || !services?.services) throw new Error("api");
	return { services, articles, cases, about, settings };
}

const ContentCtx = createContext(null);

export function ContentProvider({ children }) {
	const [live, setLive] = useState(() => readCache()?.data ?? null);
	useEffect(() => {
		let on = true;
		const store = (data, version) => {
			if (!on) return;
			setLive(data);
			try {
				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({ ts: Date.now(), version, data }),
				);
			} catch {
				/* storage full/blocked — memory cache still works */
			}
		};
		(async () => {
			try {
				const version = await fetchVersion();
				const cached = readCache();
				// Cache hit: same revision as the server — nothing to do.
				if (
					version !== undefined &&
					version !== null &&
					cached &&
					cached.version === version
				) {
					return;
				}
				store(await fetchAll(), version ?? null);
			} catch {
				// Fallback: full fetch (also covers backends without ?type=version).
				try {
					store(await fetchAll(), null);
				} catch {
					/* offline — static fallback keeps the site alive */
				}
			}
		})();
		return () => {
			on = false;
		};
	}, []);
	return <ContentCtx.Provider value={live}>{children}</ContentCtx.Provider>;
}

// ---- services (mains + subs + details), live with static fallback ----
export function useServices() {
	const live = useContext(ContentCtx);
	const s = live?.services;
	const services = (s?.services ?? staticServices).map((x) => ({
		...x,
		image: asset(x.image),
	}));
	const subServices = (s?.subServices ?? staticSubs).map((x) => ({
		...x,
		image: asset(x.image),
	}));
	const serviceDetails = s?.serviceDetails ?? staticDetails;
	return {
		services,
		subServices,
		serviceDetails,
		documentChecklist,
		getService: (id) =>
			services.find((x) => x.id === id) ??
			subServices.find((x) => x.id === id),
		isMainService: (id) => services.some((x) => x.id === id),
		getSubServices: (pid) => {
			const p = services.find((x) => x.id === pid);
			return (p?.children ?? [])
				.map((cid) => subServices.find((x) => x.id === cid))
				.filter(Boolean);
		},
		getParentService: (cid) => {
			const c = subServices.find((x) => x.id === cid);
			return services.find((x) => x.id === c?.parent);
		},
		getServiceDetails: (id) => serviceDetails[id],
	};
}

// ---- articles ----
export function useArticles() {
	const live = useContext(ContentCtx);
	const articles = (live?.articles?.articles ?? staticArticles).map((a) => ({
		...a,
		image: asset(a.image),
	}));
	return {
		articles,
		getArticle: (slug) => articles.find((a) => a.slug === slug),
		formatViews: staticFormatViews,
	};
}

// Single article (also bumps the server view counter). Null on failure.
export async function fetchLiveArticle(slug) {
	try {
		const r = await fetch(
			`${apiRoot()}/api/content.php?type=article&slug=${encodeURIComponent(slug)}`,
		);
		if (!r.ok) return null;
		const j = await r.json();
		if (!j.article) return null;
		return { ...j.article, image: asset(j.article.image) };
	} catch {
		return null;
	}
}

// ---- case studies (null = use the page's static list) ----
export function useCases() {
	const live = useContext(ContentCtx);
	return live?.cases?.cases ?? null;
}

// ---- about page (null = keep the page's static copy) ----
export function useAbout() {
	const live = useContext(ContentCtx);
	const a = live?.about;
	if (!a) return null;
	return {
		...a,
		team: (a.team ?? []).map((m) => ({ ...m, photo: asset(m.photo) })),
	};
}

// ---- contact details (null = keep hardcoded fallback) ----
export function useSettings() {
	const live = useContext(ContentCtx);
	return live?.settings ?? null;
}

// ---- contact form → PHP (false = caller falls back to mailto:) ----
export async function submitLead(data) {
	try {
		const r = await fetch(`${apiRoot()}/api/contact.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...data, company: "" }),
		});
		if (!r.ok) return null;
		return await r.json();
	} catch {
		return null;
	}
}
