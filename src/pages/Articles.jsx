import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, Eye, Search } from "lucide-react";
import { useLineReveal } from "../lib/reveal.js";
import { articles, formatViews, getViews } from "../data/articles.js";


export default function Articles() {
	const rootRef = useRef(null);
	useLineReveal(rootRef);
	const [searchParams] = useSearchParams();
	const [query, setQuery] = useState("");
	const [topic, setTopic] = useState("All topics");
	const [debouncedQuery, setDebouncedQuery] = useState("");

	// debounce search so filtering runs 300ms after the user stops typing
	useEffect(() => {
		const t = setTimeout(() => setDebouncedQuery(query), 300);
		return () => clearTimeout(t);
	}, [query]);

	const topics = [
		"All topics",
		...new Set([
			...articles.map((a) => a.category),
			...articles.flatMap((a) => a.tags || []),
		]),
	];

	// deep link support: /articles?topic=Guides (used by detail-page tags)
	useEffect(() => {
		const t = searchParams.get("topic");
		if (t && topics.includes(t)) setTopic(t);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const q = debouncedQuery.trim().toLowerCase();
	const visible = articles.filter((a) => {
		const inTopic =
			topic === "All topics" ||
			a.category === topic ||
			(a.tags || []).includes(topic);
		const inQuery =
			q === "" ||
			`${a.title} ${a.excerpt} ${a.category} ${(a.tags || []).join(" ")}`
				.toLowerCase()
				.includes(q);
		return inTopic && inQuery;
	});

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

			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[10dvh] pt-28 md:px-8 lg:pt-44 xl:px-0">
				{/* heading */}
				<div className="max-w-2xl">
					<p className="rv-fade font-inter-reg fs-body-sm text-(--color-primary)">
						Articles
					</p>
					<h1 className="mt-2 font-heading text-[1.9rem] leading-[1.15] text-(--color-black) sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
						<span className="block overflow-hidden pb-2">
							<span className="rv-line block">
								Insights for{" "}
								<span className="text-(--color-primary)">
									Growing Businesses
								</span>
							</span>
						</span>
					</h1>
				</div>

				{/* search + topics */}
				<div className="rv-fade mt-8 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_220px]">
					<label className="group relative block">
						<Search
							size={16}
							className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors duration-300 group-focus-within:text-(--color-primary)"
						/>
						<input
							type="search"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search articles…"
							className="w-full rounded-xl border border-black/10 bg-white py-3 pl-11 pr-4 font-inter-reg text-[0.95rem] text-(--color-black) placeholder:text-neutral-400 outline-none transition-all duration-300 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20"
						/>
					</label>
					<label className="relative block">
						<select
							value={topic}
							onChange={(e) => setTopic(e.target.value)}
							aria-label="Filter by topic"
							className="w-full appearance-none rounded-xl border border-black/10 bg-white px-4 py-3 pr-10 font-inter-reg text-[0.95rem] text-(--color-black) outline-none transition-all duration-300 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20"
						>
							{topics.map((t) => (
								<option key={t} value={t}>
									{t}
								</option>
							))}
						</select>
						<span
							aria-hidden="true"
							className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
						>
							⌄
						</span>
					</label>
				</div>

				{visible.length === 0 ? (
					<div className="mt-10">
						<p className="font-inter-reg fs-body text-neutral-500">
							No articles match your search.
						</p>
						<button
							type="button"
							onClick={() => {
								setQuery("");
								setTopic("All topics");
							}}
							className="mt-3 font-inter-reg text-[0.95rem] text-(--color-primary) hover:underline hover:underline-offset-4"
						>
							Clear search and filters
						</button>
					</div>
				) : (
					<div className="mt-10 border-t border-black/10">
						{visible.map((a, i) => (
							<Link
								key={a.slug}
								to={`/articles/${a.slug}`}
								className="rv-fade group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-b border-black/10 py-6 transition-colors duration-300 hover:bg-[#EAF1FC]/50 sm:gap-8 sm:py-8"
							>
								<span className="font-heading text-[0.95rem] text-neutral-400 transition-colors duration-300 group-hover:text-(--color-primary)">
									{String(i + 1).padStart(2, "0")}
								</span>
								<div>
									<p className="font-inter-reg text-[0.8rem] tracking-wide text-neutral-500">
										<span className="font-heading text-(--color-primary)">
											{a.category}
										</span>
										{"  ·  "}
										{a.date}
										{"  ·  "}
										{a.readTime}
										{"  ·  "}
										<span className="inline-flex items-center gap-1 align-middle">
											<Eye size={16} />
											{formatViews(getViews(a.slug))}
										</span>
									</p>
									<h2 className="mt-2 font-heading text-[1.25rem] leading-snug text-(--color-black) transition-colors duration-300 group-hover:text-(--color-primary) sm:text-[1.6rem]">
										{a.title}
									</h2>
									<p className="mt-2 hidden max-w-2xl font-inter-reg text-[0.95rem] leading-relaxed text-neutral-500 sm:block">
										{a.excerpt}
									</p>
								</div>
								<span className="grid h-11 w-11 shrink-0 place-items-center self-center rounded-full border border-black/15 text-(--color-black) transition-all duration-300 group-hover:border-(--color-primary) group-hover:bg-(--color-primary) group-hover:text-white">
									<ArrowUpRight size={16} />
								</span>
							</Link>
						))}
					</div>
				)}

			</section>
		</main>
	);
}
