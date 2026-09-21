import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	ArrowRight,
	ArrowUpRight,
	CheckCircle2,
	FileText,
	Plus,
} from "lucide-react";
import { useLineReveal } from "../lib/reveal.js";
import {
	services,
	getService,
	getServiceDetails,
	documentChecklist,
} from "../data/services.js";
import Error from "./Error.jsx";

const steps = [
	{
		n: "01",
		title: "Share your requirement",
		desc: "Tell us the amount, purpose, and timelines — a call or the contact form works.",
	},
	{
		n: "02",
		title: "Get the right structure",
		desc: "We compare lenders and shape the facility around your cash flows.",
	},
	{
		n: "03",
		title: "Close and disburse",
		desc: "Documentation, sanction, and disbursement — tracked till credit.",
	},
];

function FaqItem({ item, open, onToggle }) {
	return (
		<div className="overflow-hidden rounded-[10px] bg-[#a9ceff]">
			<button
				type="button"
				onClick={onToggle}
				aria-expanded={open}
				className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
			>
				<span className="font-heading text-[1.05rem] text-(--color-black) sm:text-[1.25rem]">
					{item.q}
				</span>
				<span
					className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-neutral-600 transition-transform duration-300 ${
						open ? "rotate-45" : ""
					}`}
				>
					<Plus size={16} />
				</span>
			</button>
			<div
				className={`grid transition-all duration-500 ease-out ${
					open
						? "grid-rows-[1fr] opacity-100"
						: "grid-rows-[0fr] opacity-0"
				}`}
			>
				<div className="min-h-0 overflow-hidden">
					<p className="px-5 pb-5 font-inter-reg fs-body text-neutral-600 sm:px-6 sm:pb-6">
						{item.a}
					</p>
				</div>
			</div>
		</div>
	);
}

export default function Services() {
	const { id } = useParams();
	const rootRef = useRef(null);
	useLineReveal(rootRef);
	const [openFaq, setOpenFaq] = useState(0);

	const service = id ? getService(id) : undefined;
	const details = id ? getServiceDetails(id) : undefined;
	const docs = details?.documents ?? documentChecklist;
	const [checked, setChecked] = useState(() => docs.map(() => false));

	// fresh checklist per service
	useEffect(() => {
		setChecked(docs.map(() => false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (!service) return <Error />;

	const doneCount = checked.filter(Boolean).length;
	const donePct = Math.round((doneCount / docs.length) * 100);
	const toggleDoc = (i) =>
		setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));

	const process = details?.process ?? steps;

	const others = services.filter((s) => s.id !== service.id).slice(0, 3);

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
			{/* header */}
			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[10dvh] pt-28 md:px-8 lg:pt-44 xl:px-0">
				<nav
					aria-label="Breadcrumb"
					className="rv-fade flex flex-wrap items-center gap-2 font-inter-reg fs-body-sm text-neutral-500"
				>
					<Link
						to="/"
						className="transition-colors duration-300 hover:text-(--color-primary)"
					>
						Home
					</Link>
					<span aria-hidden="true">/</span>
					<span className="text-(--color-black)">Services</span>
					<span aria-hidden="true">/</span>
					<span className="text-(--color-primary)">{service.title}</span>
				</nav>
				<h1 className="mt-4 max-w-3xl font-heading text-[1.9rem] leading-[1.15] text-(--color-black) sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
					<span className="block overflow-hidden pb-2">
						<span className="rv-line block">{service.title}</span>
					</span>
				</h1>
				{/* <p className="rv-fade mt-3 max-w-2xl font-inter-reg fs-body text-neutral-500">
					{service.intro}
				</p> */}
				{details?.intro && (
					<p className="rv-fade font-inter-reg fs-body leading-relaxed text-neutral-600 text-justify">
						{details.intro}
					</p>
				)}
				<div className="rv-fade mt-6 flex flex-wrap gap-3">
						<button
							type="button"
							onClick={() => {
								const el = document.getElementById("documents");
								if (!el) return;
								const lenis = window.__lenis;
								if (lenis && typeof lenis.scrollTo === "function") {
									lenis.scrollTo(el, {
										offset: window.innerWidth >= 1024 ? -140 : -90,
									});
								} else {
									el.scrollIntoView({ behavior: "smooth", block: "start" });
								}
							}}
							className="group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-(--color-primary) px-7 py-3 font-inter-reg fs-body-sm text-white shadow-[0_16px_40px_rgba(8,83,160,0.3)] transition-all duration-300 hover:gap-3 hover:bg-[#0b4da2] active:scale-[0.98]"
						>
							Required Documents
							<ArrowRight
								size={16}
								className="transition-transform duration-300 group-hover:translate-x-0.5"
							/>
						</button>
						<Link
							to={`/contact?service=${encodeURIComponent(service.title)}`}
							className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-7 py-3 font-inter-reg fs-body-sm text-(--color-black) transition-all duration-300 hover:border-(--color-primary) hover:text-(--color-primary) active:scale-[0.98]"
						>
							Contact us
						</Link>
				</div>
			</section>

			{/* image left, intro + story right */}
			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[5dvh] md:px-8 xl:px-0">
				<div className="grid grid-cols-1 items-start gap-[18px] lg:grid-cols-2 lg:gap-10">
					{service.image && (
						<div className="rv-fade overflow-hidden rounded-[16px] shadow-[0_24px_60px_rgba(12,31,51,0.15)] lg:sticky lg:top-32">
							<img
								src={service.image}
								alt={service.title}
								loading="lazy"
								decoding="async"
								className="aspect-[4/3] w-full object-cover"
							/>
						</div>
					)}
					<div>
						{details?.story && (
							<div className="">
								<h2 className="font-heading text-[1.9rem] leading-[1.15] text-(--color-black) sm:text-[2.6rem]">
									<span className="block overflow-hidden pb-2">
										<span className="rv-line block">{details.story.heading}</span>
									</span>
								</h2>
								{details.story.paras.map((para, i) => (
									<p
										key={i}
										className="rv-fade mt-5 font-inter-reg fs-body leading-relaxed text-neutral-600"
									>
										{para}
									</p>
								))}
							</div>
						)}
					</div>
				</div>
			</section>
			{/* documents you'll need */}
			<section id="documents" className="relative z-10 mx-auto w-full max-w-[1166px] scroll-mt-24 px-5 pb-[5dvh] md:px-8 lg:scroll-mt-36 xl:px-0">
				{/* <h2 className=" font-heading text-[1.9rem] leading-[1.15] text-(--color-black) sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
					<span className="block overflow-hidden pb-2 ">
						<span className="rv-line block">
							Documents You&apos;ll{" "}
							<span className="text-(--color-primary)">
								Need
							</span>
						</span>
					</span>
				</h2>
				<div className="bg-gray-400 h-[0.5px] rounded-full" /> */}
				<div className="grid grid-cols-1 gap-[18px] lg:grid-cols-2 mt-8">
					<div>
						{/* progress readout */}
						<div className="rv-fade mt-8 flex items-start gap-5 flex-col">
							<p className="font-heading text-[4.5rem] leading-none text-(--color-primary) sm:text-[5.5rem]">
								{donePct}
								<span className="text-[2rem] sm:text-[2.5rem]">
									%
								</span>
							</p>
							<div className="pb-2 flex items-center gap-2">
								<p className="font-heading text-[1.1rem] text-(--color-black)">
									{doneCount === docs.length
										? "All set — nice!"
										: `${doneCount} of ${docs.length} ready`}
								</p>
								{doneCount > 0 ? (
									<button
										type="button"
										onClick={() =>
											setChecked(
												docs.map(
													() => false,
												),
											)
										}
										className="mt-1 font-inter-reg fs-body-sm text-neutral-500 transition-colors hover:text-(--color-primary) hover:underline hover:underline-offset-4"
									>
										Start over
									</button>
								) : (
									<p className="mt-1 font-inter-reg fs-body-sm text-neutral-500">
										Tap a document to mark it done.
									</p>
								)}
							</div>
						</div>
						<div
							role="progressbar"
							aria-valuenow={donePct}
							aria-valuemin={0}
							aria-valuemax={100}
							aria-label="Documents checklist progress"
							className="rv-fade mt-4 h-2 max-w-md overflow-hidden rounded-full bg-black/10"
						>
							<div
								className="h-full rounded-full bg-(--color-primary) transition-all duration-500 ease-out"
								style={{ width: `${donePct}%` }}
							/>
						</div>
						<Link
							to="/contact"
							className="rv-fade group mt-6 inline-flex items-center gap-2 font-inter-reg fs-body text-(--color-primary)"
						>
							Missing something? Ask us
							<ArrowRight
								size={16}
								className="transition-transform duration-300 group-hover:translate-x-1"
							/>
						</Link>
						<p className="rv-fade mt-2 font-inter-reg fs-body text-neutral-500">
							Keep these handy — it speeds up sanction
							dramatically. Tick off what you already have.
						</p>
					</div>
					<div className="rv-fade overflow-hidden rounded-[16px] bg-(--color-primary) p-2 sm:p-3">
						<ul className="flex flex-col">
							{docs.map((doc, i) => {
								const done = checked[i];
								return (
									<li key={doc}>
										<button
											type="button"
											onClick={() => toggleDoc(i)}
											aria-pressed={done}
											className={`group flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-4 text-left transition-all duration-300 active:scale-[0.99] ${
												done ? "" : "hover:bg-white/10"
											}`}
										>
											<span
												className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-all duration-300 ${
													done
														? "scale-110 border-white bg-white text-(--color-primary)"
														: "border-white/40 bg-transparent text-transparent group-hover:border-white"
												}`}
											>
												<svg
													width="13"
													height="13"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="3.5"
													strokeLinecap="round"
													strokeLinejoin="round"
													aria-hidden="true"
												>
													<path d="M4 12.5l5 5L20 6.5" />
												</svg>
											</span>
											<span
												className={`flex items-start gap-2.5 font-inter-reg fs-body transition-all duration-300 ${
													done
														? "text-white/50 line-through decoration-white/40"
														: "text-(--color-white)"
												}`}
											>
												{/* <FileText
													size={16}
													className={`mt-1.5 shrink-0 transition-colors duration-300 ${
														done
															? "text-white/40"
															: "text-white/75"
													}`}
												/> */}
												{doc}
											</span>
										</button>
									</li>
								);
							})}
						</ul>
						{/* appears when every document is ticked */}
						<div
							className={`grid transition-all duration-500 ease-out ${
								doneCount === docs.length
									? "mt-3 grid-rows-[1fr] opacity-100"
									: "grid-rows-[0fr] opacity-0"
							}`}
						>
							<div className="min-h-0 overflow-hidden">
								<Link
									to={`/contact?service=${encodeURIComponent(service.title)}`}
									className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-inter-reg fs-body-sm text-(--color-primary) transition-all duration-300 hover:gap-3 active:scale-[0.99]"
								>
									Continue to consultation
									<ArrowRight
										size={16}
										className="transition-transform duration-300 group-hover:translate-x-1"
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* who it's for + what's included */}
			{details && (
				<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pt-[5dvh] md:px-8 xl:px-0">
					<div className="rv-fade rounded-[16px] bg-(--color-primary) p-6 sm:p-10">
						<p className="font-inter-reg fs-body-sm uppercase tracking-widest text-white/70">
							Who it&apos;s for
						</p>
						<p className="mt-2 max-w-3xl font-heading text-[1.5rem] leading-snug text-(--color-white) sm:text-[2rem]">
							{details.audience}
						</p>
					</div>
					<div className="mt-[10dvh] grid grid-cols-1 gap-[18px] sm:grid-cols-2">
						{(details.benefits ?? []).map((b, i) => (
							<div
								key={b.title}
								className="rv-fade rounded-[16px] border  border-black/5 bg-[#a9ceff] p-6 shadow-[0_24px_60px_rgba(12,31,51,0.08)] sm:p-7"
							>
								<div className="flex items-center gap-3">
									<CheckCircle2
										size={16}
										className="shrink-0 text-(--color-primary)"
									/>
									<p className="font-heading fs-body-sm text-(color-mix(in_oklab,var(--color-primary)_60%,transparent))">
										0{i + 1}
									</p>
								</div>
								<h3 className="mt-3 font-heading text-[1.25rem] text-(--color-black)">
									{b.title}
								</h3>
								<p className="mt-2 font-inter-reg fs-body text-neutral-600">
									{b.desc}
								</p>
							</div>
						))}
					</div>
				</section>
			)}

			{/* how it works */}
			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 py-[10dvh] md:px-8 xl:px-0">
				<div className="max-w-2xl">
					<h2 className="font-heading text-[1.9rem] leading-[1.15] text-(--color-black) sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
						<span className="block overflow-hidden pb-2">
							<span className="rv-line block">
								How It{" "}
								<span className="text-(--color-primary)">
									Works
								</span>
							</span>
						</span>
					</h2>
				</div>
				<div className="mt-8 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
					{process.map((s) => (
						<div
							key={s.n}
							className="rv-fade rounded-[16px] border border-black/5 bg-[#a9ceff] p-6 sm:p-7"
						>
							<p className="font-heading text-[2rem] leading-none text-(color-mix(in_oklab,var(--color-primary)_45%,transparent))">
								{s.n}
							</p>
							<h3 className="mt-4 font-heading text-[1.25rem] text-(--color-black)">
								{s.title}
							</h3>
							<p className="mt-2 font-inter-reg fs-body text-neutral-600">
								{s.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			

			{/* other services */}
			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[10dvh] md:px-8 xl:px-0">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<h2 className="font-heading text-[1.9rem] leading-[1.15] text-(--color-black) sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
						<span className="block overflow-hidden pb-2">
							<span className="block">
								Explore{" "}
								<span className="text-(--color-primary)">
									More Services
								</span>
							</span>
						</span>
					</h2>
					<Link
						to="/contact"
						className="font-inter-reg fs-body-sm text-(--color-black) transition-colors hover:text-(--color-primary) hover:underline hover:underline-offset-4"
					>
						Not sure which fits? Contact Us.
					</Link>
				</div>
				<div className="mt-8 grid grid-cols-1 gap-[18px] sm:grid-cols-3">
					{others.map((s) => (
						<Link
							key={s.id}
							to={`/services/${s.id}`}
							className="group flex items-center justify-between gap-4 rounded-[16px] bg-[#a9ceff] px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(12,31,51,0.18)] sm:px-6 sm:py-6"
						>
							<span>
								<span className="block font-heading text-[1.15rem] text-(--color-black)">
									{s.title}
								</span>
								<span className="mt-1 block font-inter-reg fs-body-sm text-neutral-600">
									{s.desc}
								</span>
							</span>
							<span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-(--color-primary) transition-transform duration-300 group-hover:-rotate-45">
								<ArrowUpRight size={16} />
							</span>
						</Link>
					))}
				</div>
			</section>

			{/* faqs */}
			{(details?.faqs ?? []).length > 0 && (
				<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[10dvh] md:px-8 xl:px-0">
					<div className="text-center">
						<h2 className="font-heading text-[1.9rem] leading-[1.15] text-(--color-black) sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
							<span className="block overflow-hidden pb-2">
								<span className="rv-line block">
									Common{" "}
									<span className="text-(--color-primary)">
										Questions
									</span>
								</span>
							</span>
						</h2>
					</div>
					<div className="mt-8 flex flex-col gap-2.5">
						{details.faqs.map((item, i) => (
							<FaqItem
								key={item.q}
								item={item}
								open={openFaq === i}
								onToggle={() =>
									setOpenFaq(openFaq === i ? null : i)
								}
							/>
						))}
					</div>
				</section>
			)}
		</main>
	);
}
