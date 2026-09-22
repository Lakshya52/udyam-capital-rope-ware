import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { useLineReveal } from "../lib/reveal.js";
import {
	getService,
	getServiceDetails,
	getSubServices,
	isMainService,
} from "../data/services.js";
import Error from "./Error.jsx";
import FooterCTA from "../components/FooterCTA.jsx";
import WhyUs from "../components/WhyUs.jsx";

// Presentation copy per practice — everything else (intro, tracks,
// benefits, process, FAQs) comes straight from services.js.
const CONFIG = {
	"transaction-advisory": {
		titlePrefix: "Deals structured",
		titleAccent: "to close.",
		badgeTop: "End-to-end",
		badgeBottom: "deal execution",
		// tracksPrefix: "Three ways we",
		tracksAccent: "transact",
		tracksCta: "Meet the tracks",
		rhythmTitle: "How a mandate runs",
		rhythm: [
			{
				t: "Weeks 1–2 · Package",
				d: "Requirement sized, file built lender-grade, strategy agreed.",
			},
			{
				t: "Weeks 3–6 · Market",
				d: "Parallel lender approaches, competing offers compared.",
			},
			{
				t: "Close · Disburse",
				d: "Negotiation to sanction to money credited — tracked throughout.",
			},
		],
	},
	"credit-ratings-advisory": {
		titlePrefix: "A rating that",
		titleAccent: "borrows cheaper.",
		badgeTop: "750+",
		badgeBottom: "target score band",
		// tracksPrefix: "One journey,",
		tracksAccent: "three stages",
		tracksCta: "See the journey",
		rhythmTitle: "How a quarter runs",
		rhythm: [
			{
				t: "Month 1 · Assess",
				d: "Profile scored through the lender's lens, roadmap agreed.",
			},
			{
				t: "Month 2 · Execute",
				d: "Fixes implemented, lenders coordinated, conduct disciplined.",
			},
			{
				t: "Month 3 · Review",
				d: "Score re-measured against baseline, next quarter planned.",
			},
		],
	},
	"cfo-services": {
		titlePrefix: "A finance function,",
		titleAccent: "without the full-time cost.",
		badgeTop: "Monthly",
		badgeBottom: "finance rhythm",
		// tracksPrefix: "Three disciplines,",
		tracksAccent: "one function",
		tracksCta: "Meet the tracks",
		rhythmTitle: "How a month runs",
		rhythm: [
			{
				t: "Week 1 · Close",
				d: "Books closed, cash position confirmed, last month sealed.",
			},
			{
				t: "Week 2 · Review",
				d: "Actuals vs plan, variances explained, forecast rolled forward.",
			},
			{
				t: "Week 3–4 · Act",
				d: "Collections pushed, payments timed, decisions modelled.",
			},
		],
	},
	"debt-capital-advisory": {
		titlePrefix: "Right instrument. Right lender.",
		titleAccent: "Right terms.",
		badgeTop: "5 instruments",
		badgeBottom: "one borrowing program",
		// tracksPrefix: "Five instruments,",
		tracksAccent: "one desk",
		tracksCta: "Compare instruments",
		rhythmTitle: "How funding closes",
		rhythm: [
			{
				t: "Week 1 · Map",
				d: "Each need matched to its instrument, lenders shortlisted.",
			},
			{
				t: "Weeks 2–4 · Execute",
				d: "Files packaged, credit processes run in parallel.",
			},
			{
				t: "Close · Credit",
				d: "Sanctions aligned, documentation done, funds disbursed.",
			},
		],
	},
};

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

export default function ServicesMain() {
	const { id } = useParams();
	const rootRef = useRef(null);
	useLineReveal(rootRef);
	const [openFaq, setOpenFaq] = useState(0);

	const service = id ? getService(id) : undefined;
	if (!service || !isMainService(service.id)) return <Error />;

	const details = getServiceDetails(service.id);
	const tracks = getSubServices(service.id);
	const cfg = CONFIG[service.id];
	const benefits = details?.benefits ?? [];
	const process = details?.process ?? [];
	const faqs = details?.faqs ?? [];

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

			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pt-28 md:px-8 lg:pt-44 xl:px-0">
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
					<span className="text-(--color-primary)">
						{service.title}
					</span>
				</nav>
			</section>

			{/* ── split editorial hero ── */}
			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pt-6 md:px-8 xl:px-0">
				{/* <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2"> */}
				<div className="rv-fade">
					{/* <p className="font-inter-reg text-[11px] uppercase tracking-[0.28em] text-(--color-primary)">
							Practice · {service.title}
						</p> */}
					<h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] text-(--color-black) sm:text-[3.2rem]">
						{service.title} <br />
						<span className="text-(--color-primary)">
							{cfg.titlePrefix} {cfg.titleAccent}
						</span>
					</h1>
					<p className="mt-5  font-inter-reg fs-body leading-relaxed text-neutral-600 text-justify">
						{details?.intro}
					</p>
					{/* <div className="mt-7 flex flex-wrap gap-3"> */}
						{/* <Link
							to={`/contact?service=${encodeURIComponent(service.title)}`}
							className="group inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 font-heading text-[14px] text-white shadow-[0_16px_40px_rgba(8,83,160,0.3)] transition-all hover:gap-3"
						>
							Contact Us
							<ArrowRight size={15} />
						</Link> */}
						{/* <a
								href="#tracks"
								className="inline-flex items-center rounded-full px-6 py-3 font-heading text-[14px] text-(--color-black) ring-1 ring-black/15 transition-colors hover:border-(--color-primary) hover:text-(--color-primary)"
							>
								{cfg.tracksCta}
							</a> */}
					{/* </div> */}
				</div>
				{/* <div className="rv-fade relative">
						<div className="overflow-hidden rounded-[24px] shadow-[0_28px_70px_rgba(12,31,51,0.2)]">
							<img
								src={service.image}
								alt=""
								aria-hidden="true"
								loading="lazy"
								className="aspect-[4/3] w-full object-cover"
							/>
						</div>
						<div className="absolute -bottom-6 -left-3 rounded-[16px] bg-[#0C1F33] px-6 py-5 text-white shadow-xl sm:-left-6">
							<p className="font-heading text-[1.7rem] leading-none">
								{cfg.badgeTop}
							</p>
							<p className="mt-1 font-inter-reg text-[12px] uppercase tracking-[0.2em] text-white/55">
								{cfg.badgeBottom}
							</p>
						</div>
					</div> */}
				{/* </div> */}
			</section>

			{/* ── tracks: alternating editorial rows ── */}
			<section
				id="tracks"
				className="relative z-10 mx-auto w-full max-w-[1166px] scroll-mt-32 px-5 py-[8dvh] md:px-8 xl:px-0"
			>
			
				<div className="mt-10 flex flex-col gap-[28px]">
					{tracks.map((t, i) => (
						<div
							key={t.id}
							className="rv-fade grid grid-cols-1 items-stretch gap-[18px] lg:grid-cols-2"
						>
							<div
								className={`relative min-h-[240px] overflow-hidden rounded-[20px] ${
									i % 2 === 1 ? "lg:order-2" : ""
								}`}
							>
								<img
									src={t.image}
									alt=""
									aria-hidden="true"
									loading="lazy"
									className="absolute inset-0 h-full w-full object-cover"
								/>
								<div className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent" />
								{/* <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 font-heading text-[13px] text-[#0C1F33]">
									Track 0{i + 1}
								</span> */}
							</div>
							<Link
								to={`/services/${t.id}`}
								className={`relative flex cursor-pointer flex-col justify-center overflow-hidden rounded-bl-[20px] rounded-tl-[20px] rounded-tr-[20px] bg-[#EAF1FC] hover:bg-[#a9ceff] transition-all duration-200 p-8 pr-20 sm:p-10 sm:pr-24 ${
									i % 2 === 1 ? "lg:order-1" : ""
								}`}
							>
								<h3 className="font-heading text-[1.6rem] text-(--color-black) sm:text-[2rem]">
									{t.title}
								</h3>
								<p className="mt-3 font-inter-reg fs-body leading-relaxed text-neutral-600">
									{t.desc}
								</p>
								{/* bottom-right corner notch + arrow, same as ServicesGrid cards */}
								<div className="pointer-events-none absolute bottom-0 right-0 z-10 h-[55px] w-[55px] rounded-tl-[30px] bg-white">
									<div className="absolute bottom-0 left-[-40px] z-50 h-[40px] w-[40px] rounded-br-[16px] bg-transparent shadow-[10px_10px_0_0_#FFFFFF]" />
									<div className="absolute right-0 top-[-40px] z-50 h-[40px] w-[40px] rounded-br-[16px] bg-transparent shadow-[10px_10px_0_0_#FFFFFF]" />
								</div>
								<span className="absolute bottom-[5px] right-[4px] z-20 grid h-10 w-10 place-items-center rounded-full bg-(--color-primary) text-(--color-white)">
									<ArrowRight size={16} />
								</span>
							</Link>
						</div>
					))}
				</div>
			</section>

			{/* ── rhythm strip ── */}
			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[8dvh] md:px-8 xl:px-0">
				<div className="rv-fade rounded-[20px] bg-(--color-primary) p-8 text-white sm:p-10">
					<p className="font-inter-reg fs-body uppercase  text-white/50">
						{cfg.rhythmTitle}
					</p>
					<div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
						{cfg.rhythm.map((c) => (
							<div
								key={c.t}
								className="border-t-2 border-white/15 pt-4"
							>
								<p className="font-heading fs-body">
									{c.t}
								</p>
								<p className="mt-2 font-inter-reg fs-body-sm leading-relaxed ">
									{c.d}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── benefits + process ── */}
			{/* <section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[8dvh] md:px-8 xl:px-0">
				<div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
					{benefits.map((b, i) => (
						<div
							key={b.title}
							className="rv-fade rounded-[20px] border border-black/5 bg-white p-7 shadow-[0_20px_50px_rgba(12,31,51,0.08)]"
						>
							<p className="font-heading text-[2rem] leading-none text-(color-mix(in_oklab,var(--color-primary)_45%,transparent))">
								0{i + 1}
							</p>
							<h3 className="mt-3 font-heading text-[1.2rem] text-(--color-black)">
								{b.title}
							</h3>
							<p className="mt-2 font-inter-reg fs-body-sm text-neutral-600">
								{b.desc}
							</p>
						</div>
					))}
				</div>
				<div className="mt-[18px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
					{process.map((s) => (
						<div
							key={s.title}
							className="rv-fade rounded-[20px] bg-[#9cc7ff]/40 p-6"
						>
							<h3 className="font-heading text-[1.05rem] text-(--color-black)">
								{s.title}
							</h3>
							<p className="mt-2 font-inter-reg text-[13.5px] leading-relaxed text-neutral-600">
								{s.desc}
							</p>
						</div>
					))}
				</div>
			</section> */}

			{/* ── faqs ── */}
			{faqs.length > 0 && (
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
						{faqs.map((item, i) => (
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

			<WhyUs />
			<FooterCTA />
		</main>
	);
}
