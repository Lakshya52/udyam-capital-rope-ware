import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	ArrowLeft,
	ArrowRight,
	ArrowUpRight,
	Check,
	Clock,
	Eye,
	Link2,
} from "lucide-react";
import { useLineReveal } from "../lib/reveal.js";
import {
	articles,
	formatViews,
	getArticle,
	getViews,
	trackView,
} from "../data/articles.js";
import Error from "./Error.jsx";
import WhyUs from "../components/WhyUs.jsx";
// import FooterCTA from "../components/FooterCTA.jsx";

function ShareRow({ title }) {
	const [copied, setCopied] = useState(false);

	const share = () => {
		const url = window.location.href;
		return encodeURIComponent(url);
	};
	const text = encodeURIComponent(title);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
		} catch {
			const ta = document.createElement("textarea");
			ta.value = window.location.href;
			document.body.appendChild(ta);
			ta.select();
			document.execCommand("copy");
			document.body.removeChild(ta);
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const btn =
		"grid h-10 w-10 place-items-center rounded-full border border-black/15 text-neutral-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white";
	const iconBtn =
		"grid h-10 w-10 place-items-center rounded-full bg-[var(--color-primary)] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(8,83,160,0.35)]";

	return (
		<div className="flex items-center gap-2.5">
			<button
				type="button"
				onClick={copy}
				aria-label="Copy article link"
				title="Copy link"
				className={copied ? iconBtn : btn}
			>
				{copied ? <Check size={16} /> : <Link2 size={16} />}
			</button>
			<a
				href={`https://twitter.com/intent/tweet?text=${text}&url=${share()}`}
				target="_blank"
				rel="noreferrer"
				aria-label="Share on X"
				className={btn}
			>
				<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
					<path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23z" />
				</svg>
			</a>
			<a
				href={`https://www.linkedin.com/sharing/share-offsite/?url=${share()}`}
				target="_blank"
				rel="noreferrer"
				aria-label="Share on LinkedIn"
				className={btn}
			>
				<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
					<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
				</svg>
			</a>
			<a
				href={`https://wa.me/?text=${text}%20${share()}`}
				target="_blank"
				rel="noreferrer"
				aria-label="Share on WhatsApp"
				className={btn}
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.2.5.1.7-.1l.8-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.5Z" />
				</svg>
			</a>
		</div>
	);
}

export default function ArticleDetail() {
	const { slug } = useParams();
	const rootRef = useRef(null);
	useLineReveal(rootRef);

	const article = getArticle(slug || "");
	const [views, setViews] = useState(0);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, [slug]);

	useEffect(() => {
		trackView(slug || "");
		setViews(getViews(slug || ""));
	}, [slug]);

	if (!article) return <Error />;

	const idx = articles.findIndex((a) => a.slug === article.slug);
	const prev = idx > 0 ? articles[idx - 1] : null;
	const next = idx < articles.length - 1 ? articles[idx + 1] : null;
	const related = articles
		.filter((a) => a.slug !== article.slug && a.category === article.category)
		.concat(
			articles.filter(
				(a) => a.slug !== article.slug && a.category !== article.category
			)
		)
		.slice(0, 3);
	const initials = article.author.name
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((w) => w[0])
		.join("")
		.toUpperCase();

	return (
		<main ref={rootRef} className="relative overflow-hidden bg-white">
			{/* backdrop graphics */}
			<div
				className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px] overflow-hidden"
				aria-hidden="true"
			>
				<div className="absolute left-[6%] top-0 h-72 w-[480px] rounded-full bg-[#9cc7ff]/50 blur-[110px]" />
				<div className="absolute right-[4%] top-10 h-56 w-56 rounded-full bg-[#5495D8]/30 blur-[90px]" />
			</div>

			<article className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[10dvh] pt-28 md:px-8 lg:pt-44 xl:px-0">
				<Link
					to="/articles"
					className="rv-fade inline-flex items-center gap-2 font-inter-reg text-[0.95rem] text-neutral-500 transition-colors duration-300 hover:text-[var(--color-primary)]"
				>
					<ArrowLeft size={16} />
					All articles
				</Link>

				<p className="rv-fade mt-8 font-inter-reg text-[0.85rem] tracking-wide text-neutral-500">
					<span className="font-heading text-[var(--color-primary)]">
						{article.category}
					</span>
					{"  ·  "}
					{article.date}
					{"  ·  "}
					<span className="inline-flex items-center gap-1 align-middle">
						<Clock size={16} />
						{article.readTime}
					</span>
					{"  ·  "}
					<span className="inline-flex items-center gap-1 align-middle">
						<Eye size={16} />
						{formatViews(views)} views
					</span>
				</p>
				<h1 className="mt-3 font-heading text-[1.9rem] leading-[1.15] text-[var(--color-black)] sm:text-[2.6rem] lg:text-[3.25rem]">
					<span className="block overflow-hidden pb-2">
						<span className="rv-line block">{article.title}</span>
					</span>
				</h1>

				{/* author + share */}
				<div className="rv-fade mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-black/10 py-4">
					<div className="flex items-center gap-3">
						<span
							aria-hidden="true"
							className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-primary)] font-heading text-[1rem] text-white"
						>
							{initials}
						</span>
						<div>
							<p className="font-heading text-[0.95rem] text-[var(--color-black)]">
								{article.author.name}
							</p>
							<p className="font-inter-reg text-[0.8rem] text-neutral-500">
								{article.author.role}
							</p>
						</div>
					</div>
					<ShareRow title={article.title} />
				</div>

				<p className="rv-fade mt-6 font-inter-reg fs-body text-neutral-500">
					{article.excerpt}
				</p>

				{/* banner image — commented out for now
				{article.image ? (
					<img
						src={article.image}
						alt=""
						aria-hidden="true"
						loading="lazy"
						decoding="async"
						className="rv-fade mt-8 aspect-[16/9] w-full rounded-[16px] object-cover"
					/>
				) : (
					<div
						aria-hidden="true"
						className="rv-fade mt-8 flex aspect-[16/9] w-full items-end justify-start rounded-[16px] bg-linear-to-br from-[#0A5CB8] via-[var(--color-primary)] to-[#0C1F33] p-8 sm:p-12"
					>
						<span className="font-heading text-[4rem] leading-none text-white/90 sm:text-[6rem]">
							{article.title.charAt(0)}
						</span>
					</div>
				)}
				*/}

				{/* table of contents */}
				{article.sections.length > 1 && (
					<nav
						aria-label="On this page"
						className="rv-fade mt-8 rounded-[16px] border border-black/10 bg-[#EAF1FC] p-5 sm:p-6"
					>
						<p className="font-heading text-[0.95rem] text-[var(--color-black)]">
							On this page
						</p>
						<ol className="mt-3 space-y-2.5">
							{article.sections.map((s, i) => (
								<li key={s.heading}>
									<a
										href={`#section-${i}`}
										className="group inline-flex items-baseline gap-2.5 font-inter-reg text-[0.95rem] text-neutral-600 transition-colors duration-300 hover:text-[var(--color-primary)]"
									>
										<span className="font-heading text-[0.8rem] text-[var(--color-primary)]">
											{String(i + 1).padStart(2, "0")}
										</span>
										<span className="group-hover:underline group-hover:underline-offset-4">
											{s.heading}
										</span>
									</a>
								</li>
							))}
						</ol>
					</nav>
				)}

				{/* body */}
				<div className="mt-8 flex flex-col gap-8">
					{article.sections.map((s, i) => (
						<section key={s.heading} id={`section-${i}`} className="scroll-mt-28">
							<h2 className="font-heading text-[1.5rem] text-[var(--color-black)] sm:text-[1.75rem]">
								{s.heading}
							</h2>
							<div className="mt-4 flex flex-col gap-5">
								{s.paras.map((para, j) => (
									<p
										key={j}
										className="font-inter-reg fs-body leading-relaxed text-neutral-600"
									>
										{para}
									</p>
								))}
							</div>
						</section>
					))}
				</div>

				{/* tags */}
				{article.tags.length > 0 && (
					<div className="mt-10 flex flex-wrap gap-2.5 border-t border-black/10 pt-8">
						{article.tags.map((t) => (
							<Link
								key={t}
								to={`/articles?topic=${encodeURIComponent(t)}`}
								className="rounded-full border border-black/10 px-4 py-2 font-inter-reg text-[0.85rem] text-neutral-600 transition-all duration-300 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
							>
								{t}
							</Link>
						))}
					</div>
				)}

				{/* prev / next */}
				<div className="mt-8 grid grid-cols-1 gap-[18px] sm:grid-cols-2">
					{prev ? (
						<Link
							to={`/articles/${prev.slug}`}
							className="group rounded-[16px] border border-black/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] sm:p-6"
						>
							<span className="inline-flex items-center gap-2 font-inter-reg text-[0.85rem] text-neutral-500">
								<ArrowLeft
									size={16}
									className="transition-transform duration-300 group-hover:-translate-x-1"
								/>
								Previous
							</span>
							<p className="mt-2 font-heading text-[1.1rem] leading-snug text-[var(--color-black)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
								{prev.title}
							</p>
						</Link>
					) : (
						<span />
					)}
					{next && (
						<Link
							to={`/articles/${next.slug}`}
							className="group rounded-[16px] border border-black/10 p-5 text-right transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] sm:p-6"
						>
							<span className="inline-flex items-center gap-2 font-inter-reg text-[0.85rem] text-neutral-500">
								Next
								<ArrowRight
									size={16}
									className="transition-transform duration-300 group-hover:translate-x-1"
								/>
							</span>
							<p className="mt-2 font-heading text-[1.1rem] leading-snug text-[var(--color-black)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
								{next.title}
							</p>
						</Link>
					)}
				</div>

				{/* cta */}
				<div className="mt-[18px] flex flex-col items-start justify-between gap-5 rounded-[16px] bg-linear-to-br from-[#0A5CB8] via-[var(--color-primary)] to-[#0C1F33] p-6 sm:flex-row sm:items-center sm:p-10">
					<div>
						<h2 className="font-heading text-[1.5rem] text-[var(--color-white)] sm:text-[2rem]">
							Need this structured for your business?
						</h2>
						<p className="mt-2 font-inter-reg text-[0.95rem] text-white/80">
							Talk to our team about your requirement.
						</p>
					</div>
					<Link
						to="/contact"
						className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-white px-7 py-3 font-inter-reg text-[0.95rem] text-[var(--color-black)] transition-all duration-300 hover:gap-3 active:scale-[0.98]"
					>
						Talk to us
						<ArrowRight
							size={16}
							className="transition-transform duration-300 group-hover:translate-x-0.5"
						/>
					</Link>
				</div>

				{/* related */}
				{related.length > 0 && (
					<div className="mt-14 border-t border-black/10 pt-8">
						<h2 className="font-heading text-[1.5rem] text-[var(--color-black)]">
							Keep reading
						</h2>
						<div className="mt-4 border-t border-black/10">
							{related.map((a, i) => (
								<Link
									key={a.slug}
									to={`/articles/${a.slug}`}
									className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-b border-black/10 py-5 transition-colors duration-300 hover:bg-[#EAF1FC]/50 sm:gap-6"
								>
									<span className="font-heading text-[0.9rem] text-neutral-400 transition-colors duration-300 group-hover:text-[var(--color-primary)]">
										{String(i + 1).padStart(2, "0")}
									</span>
									<div>
										<p className="font-inter-reg text-[0.78rem] tracking-wide text-neutral-500">
											<span className="font-heading text-[var(--color-primary)]">
												{a.category}
											</span>
											{"  ·  "}
											{a.date}
										</p>
										<h3 className="mt-1.5 font-heading text-[1.1rem] leading-snug text-[var(--color-black)] transition-colors duration-300 group-hover:text-[var(--color-primary)] sm:text-[1.3rem]">
											{a.title}
										</h3>
									</div>
									<span className="grid h-10 w-10 shrink-0 place-items-center self-center rounded-full border border-black/15 text-[var(--color-black)] transition-all duration-300 group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white">
										<ArrowUpRight size={16} />
									</span>
								</Link>
							))}
						</div>
					</div>
				)}
			</article>

			
			<WhyUs />
			{/* <FooterCTA /> */}
		</main>
	);
}
