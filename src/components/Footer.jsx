import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSettings, asset } from "../lib/content.jsx";

const FALLBACK_CONTACT = {
	email1: "we.care@udyamcapital.com",
	email2: "info@udyamcapital.com",
	landline_label: "Landline : 0120 444 5816",
	landline_href: "tel:01204445816",
	mobile_label: "Mobile : +91 82875 98661",
	mobile_href: "tel:+911234567890",
};

const exploreLinks = [
	{ label: "Services", to: "/services" },
	{ label: "About Us", to: "/about" },
	{ label: "Contact", to: "/contact" },
	// { label: 'Schedule Consultation', to: '/contact' },
	{ label: "Our Team", to: "/about" },
];

function SocialIcons() {
		const iconClass =
		"grid place-items-center rounded-full p-2 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:text-white";
	return (
		<div className="flex items-center gap-4">
			<a
				href="https://x.com"
				target="_blank"
				rel="noreferrer"
				aria-label="X"
				className={iconClass}
			>
				<svg
					width="17"
					height="17"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23z" />
				</svg>
			</a>
			<a
				href="https://instagram.com"
				target="_blank"
				rel="noreferrer"
				aria-label="Instagram"
				className={iconClass}
			>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
				>
					<rect x="3" y="3" width="18" height="18" rx="5" />
					<circle cx="12" cy="12" r="4" />
					<circle
						cx="17.2"
						cy="6.8"
						r="1.2"
						fill="currentColor"
						stroke="none"
					/>
				</svg>
			</a>
			<a
				href="https://youtube.com"
				target="_blank"
				rel="noreferrer"
				aria-label="YouTube"
				className={iconClass}
			>
				<svg
					width="19"
					height="19"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.6 3.5 12 3.5 12 3.5s-4.6 0-7.7.4c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.6 1 1.9.2 7.5.4 7.5.4s4.6 0 7.7-.4c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8ZM9.8 15.1V8.4l6.2 3.4-6.2 3.3Z" />
				</svg>
			</a>
			<a
				href="https://linkedin.com"
				target="_blank"
				rel="noreferrer"
				aria-label="LinkedIn"
				className={iconClass}
			>
				<svg
					width="17"
					height="17"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
				</svg>
			</a>
		</div>
	);
}

function GiantWatermark() {
	const wrapRef = useRef(null);
	const textRef = useRef(null);

	useLayoutEffect(() => {
		const wrap = wrapRef.current;
		const text = textRef.current;
		if (!wrap || !text) return;

		const fit = () => {
			// Measure natural width at 100px, then scale font-size so
			// width == container width. No horizontal squeeze — glyphs
			// keep natural proportions, only font-size (height) changes.
			text.style.fontSize = "100px";
			const natural = text.scrollWidth;
			const avail = wrap.clientWidth;
			if (natural > 0 && avail > 0) {
				text.style.fontSize = `${(100 * avail) / natural}px`;
			}
		};

		fit();
		// Re-fit once webfont loads (Jakarta changes natural width)
		let cancelled = false;
		if (document.fonts?.ready) {
			document.fonts.ready.then(() => {
				if (!cancelled) fit();
			});
		}
		const ro = new ResizeObserver(fit);
		ro.observe(wrap);
		return () => {
			cancelled = true;
			ro.disconnect();
		};
	}, []);

	return (
		<div className="relative z-10 mx-auto w-full max-w-291.5 px-5 md:px-8 xl:px-0">
			<div ref={wrapRef} className="w-full">
				<div
					ref={textRef}
					aria-hidden="true"
					className="w-max max-w-none origin-left translate-y-[18%] text-center font-heading leading-[0.8] tracking-[-0.04em] text-white/10"
				>
					UdyamCapital
				</div>
			</div>
		</div>
	);
}

export default function Footer() {
	const ct = { ...FALLBACK_CONTACT, ...(useSettings() ?? {}) };
	return (
		<footer className="relative flex h-fit w-full flex-col justify-end overflow-hidden bg-(--color-primary) pt-12">
			{/* Cloth-waves backdrop image */}
			<div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
				<img
					src={asset("/bgClotheWaves.png")}
					alt=""
					loading="lazy"
					decoding="async"
					className="h-full w-full scale-105 object-cover opacity-80 blur-md"
				/>
			</div>
			<div className="relative z-10 mx-auto flex w-full max-w-291.5 flex-col gap-10 px-5 md:px-8 lg:flex-row lg:gap-4.5 xl:px-0">
				<div className="w-full lg:w-3/5">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
						{/* <Link
							to="/"
							className="inline-flex shrink-0 items-center rounded-[12px]"
						>
							<img
								src="/LogoWhite.png"
								alt="Udyam Capital"
								className="h-10 w-auto object-contain sm:h-12 lg:h-[60px]"
							/>
						</Link> */}
						<SocialIcons />
					</div>
					<p className="mt-5 max-w-xl font-inter-reg text-[0.95rem] leading-relaxed text-white sm:text-[1rem]">
						Trusted strategic partner, committed to empowering
						businesses with tailored financial, operational, and
						technological solutions. We combine deep expertise with
						a forward-thinking approach to help you unlock growth,
						build resilience, and create lasting value.
					</p>
				</div>

				<div className="grid w-full grid-cols-2 items-start gap-0 sm:gap-10 lg:flex lg:w-2/5 lg:gap-10">
					<div className="w-full min-w-0 lg:ml-auto lg:w-[45%]">
						<h4 className="font-heading fs-body-sm text-white">
							Explore
						</h4>
						<ul className="mt-4 space-y-2.5">
							{exploreLinks.map((link) => (
								<li key={link.label}>
									<Link
										to={link.to}
										className="inline-block font-inter-reg fs-body-sm text-white transition-all duration-300 hover:translate-x-1 hover:text-white"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="w-full min-w-0 lg:w-[55%]">
						<h4 className="font-heading fs-body-sm text-white">
							Contact
						</h4>
						<div className="mt-4 min-w-0 space-y-2.5 wrap-break-word font-inter-reg text-[0.85rem] leading-snug text-white sm:text-[1rem]">
							<a
								href={`mailto:${ct.email1}`}
								className="block w-fit max-w-full whitespace-nowrap transition-all duration-300 hover:text-white hover:underline hover:underline-offset-4 lg:text-[0.85rem] xl:text-[1rem]"
							>
								{ct.email1}
							</a>
							<a
								href={`mailto:${ct.email2}`}
								className="block w-fit max-w-full whitespace-nowrap transition-all duration-300 hover:text-white hover:underline hover:underline-offset-4 lg:text-[0.85rem] xl:text-[1rem]"
							>
								{ct.email2}
							</a>
							{/* <p className="pt-1 font-inter-reg text-[#144fd7]">Phone</p> */}
							<a
								href={ct.landline_href}
								className="block w-fit max-w-full transition-all duration-300 hover:text-white hover:underline hover:underline-offset-4"
							>
								{ct.landline_label}
							</a>
							<a
								href={ct.mobile_href}
								className="block w-fit max-w-full transition-all duration-300 hover:text-white hover:underline hover:underline-offset-4"
							>
								{ct.mobile_label}
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Giant watermark — locked to the same container width as navbar, no squeeze */}
			<GiantWatermark />

			{/* legal bar */}
			<div className="relative z-10 ">
				<div className="mx-auto flex w-full max-w-291.5 flex-col items-start justify-between gap-2 px-5 py-5 sm:flex-row sm:items-center md:px-8 xl:px-0">
					<p>
						{/* empty to create space */}
					</p>
					<p className="font-inter-reg text-[0.8rem] text-white/40">
						© {new Date().getFullYear()} Udyam Capital. All rights
						reserved.
					</p>
					<div className="flex items-center gap-5">
						<Link
							to="/privacy-policy"
							className="font-inter-reg text-[0.8rem] text-white/40 transition-colors duration-300 hover:text-white hover:underline hover:underline-offset-4"
						>
							Privacy Policy
						</Link>
						<Link
							to="/terms-of-use"
							className="font-inter-reg text-[0.8rem] text-white/40 transition-colors duration-300 hover:text-white hover:underline hover:underline-offset-4"
						>
							Terms of Use
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
