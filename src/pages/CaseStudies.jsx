import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Plus, Search } from "lucide-react";
import { useLineReveal } from "../lib/reveal.js";
import WhyUs from "../components/WhyUs.jsx";

// ─── CONTENT NOTE ────────────────────────────────────────────────────────────
// Replace these placeholders with real, permissioned client stories.
// `client` can stay industry-generic ("Auto Components Manufacturer") if
// names can't be disclosed. Stats should be real numbers before publishing.
const cases = [
	{
		client: "Auto Components Manufacturer",
		industry: "Manufacturing",
		service: "Working Capital",
		title: "Unlocking growth capital stuck in receivables",
		challenge:
			"Rapid order growth had locked cash in 90-day receivables while suppliers demanded advance payment — operations were stalling for lack of day-to-day funds.",
		solution:
			"We structured a receivables-backed working capital limit aligned to the order cycle, with a vendor-payment sub-limit for critical suppliers.",
		stats: [
			{ value: "₹4.2 Cr", label: "Limit structured" },
			{ value: "45 days", label: "Cash cycle improvement" },
			{ value: "2x", label: "Order capacity" },
		],
	},
	{
		client: "Regional Logistics Operator",
		industry: "Logistics",
		service: "Debt Restructuring",
		title: "Resetting repayments the business could actually meet",
		challenge:
			"Multiple short-tenure loans taken during fleet expansion created EMIs far above monthly cash generation, pushing the account toward stress.",
		solution:
			"We consolidated the facilities into a single tenure-aligned term loan with a moratorium matched to seasonal cash flows.",
		stats: [
			{ value: "38%", label: "EMI reduction" },
			{ value: "1 loan", label: "From five facilities" },
			{ value: "On track", label: "Repayment status" },
		],
	},
	{
		client: "Packaged Foods MSME",
		industry: "Food Processing",
		service: "Fund Raising",
		title: "Funding a new plant without losing control",
		challenge:
			"The promoters needed growth capital for a second unit but wanted to avoid heavy dilution or unserviceable debt.",
		solution:
			"We designed a blended debt-plus-expansion-finance structure with milestone-linked disbursement tied to plant commissioning.",
		stats: [
			{ value: "₹6.5 Cr", label: "Total raise" },
			{ value: "0%", label: "Equity diluted" },
			{ value: "14 mo", label: "To commissioning" },
		],
	},
	{
		client: "Textile Exporter",
		industry: "Textiles",
		service: "Working Capital",
		title: "Financing export orders without choking cash flow",
		challenge:
			"Large seasonal export orders needed upfront fabric purchases, but packing credit limits fell far short of the order book.",
		solution:
			"We enhanced the export packing credit with order-backed top-ups mapped to the shipment calendar.",
		stats: [
			{ value: "₹3.8 Cr", label: "Enhanced limit" },
			{ value: "100%", label: "Order fulfilment" },
			{ value: "2 seasons", label: "Funded smoothly" },
		],
	},
	{
		client: "Pharma Distributor",
		industry: "Healthcare",
		service: "Business Loans",
		title: "Stocking up for the winter demand surge",
		challenge:
			"Peak-season stocking needed 3x normal inventory holding, but the existing cash-credit limit covered barely half of it.",
		solution:
			"We placed a seasonal overdraft alongside the base limit, drawable only against distributor invoices.",
		stats: [
			{ value: "₹2.1 Cr", label: "Seasonal line" },
			{ value: "0", label: "Stock-outs" },
			{ value: "18%", label: "Revenue growth" },
		],
	},
	{
		client: "Restaurant Chain",
		industry: "Hospitality",
		service: "Project Finance",
		title: "Funding outlets three and four",
		challenge:
			"Two profitable outlets and landlord offers for two more — but fit-out costs would have drained operating reserves.",
		solution:
			"We structured outlet-level project loans with repayments stepping up after each outlet's breakeven month.",
		stats: [
			{ value: "₹1.9 Cr", label: "Project loans" },
			{ value: "2", label: "New outlets" },
			{ value: "7 mo", label: "To breakeven" },
		],
	},
	{
		client: "Auto Dealership",
		industry: "Automotive",
		service: "LAP",
		title: "Turning showroom property into growth funds",
		challenge:
			"The dealership owned its showroom outright while paying high-cost unsecured debt for inventory — capital trapped in bricks.",
		solution:
			"We raised a loan against the showroom at a far lower rate and retired the expensive facilities.",
		stats: [
			{ value: "₹5.4 Cr", label: "LAP raised" },
			{ value: "4%", label: "Interest saved" },
			{ value: "3 loans", label: "Closed early" },
		],
	},
	{
		client: "Construction Contractor",
		industry: "Infrastructure",
		service: "Fund Raising",
		title: "Bridging retention money gaps",
		challenge:
			"Retention money stuck with government clients for 12+ months was starving running projects of working funds.",
		solution:
			"We arranged retention-backed bridge funding with release mapped to project certification milestones.",
		stats: [
			{ value: "₹7.2 Cr", label: "Bridge arranged" },
			{ value: "4", label: "Projects kept live" },
			{ value: "0", label: "Work stoppages" },
		],
	},
	{
		client: "E-commerce Seller",
		industry: "Retail",
		service: "Working Capital",
		title: "Surviving the festive inventory spike",
		challenge:
			"Festive sales needed 4x inventory two months early, but marketplace payouts lagged sales by three weeks.",
		solution:
			"We set up a short-cycle working capital line sized to the festive calendar, with auto-sweep from payout accounts.",
		stats: [
			{ value: "₹95 L", label: "Festive line" },
			{ value: "3.1x", label: "Festive sales" },
			{ value: "21 days", label: "Full rotation" },
		],
	},
	{
		client: "Diagnostics Clinic",
		industry: "Healthcare",
		service: "MSME Finance",
		title: "Equipping a new diagnostics wing",
		challenge:
			"A growing clinic needed analyzers and imaging equipment but lacked collateral beyond the machines themselves.",
		solution:
			"We structured equipment-backed MSME funding with tenures matched to each machine's payback period.",
		stats: [
			{ value: "₹1.4 Cr", label: "Equipment funded" },
			{ value: "6", label: "Machines installed" },
			{ value: "5 yrs", label: "Aligned tenure" },
		],
	},
	{
		client: "Private School",
		industry: "Education",
		service: "Project Finance",
		title: "Building classrooms before admissions",
		challenge:
			"Admissions were waitlisted but new classrooms needed funding a full year before fee income would arrive.",
		solution:
			"We arranged phased construction finance with a principal moratorium until the first full-fee academic year.",
		stats: [
			{ value: "₹3.3 Cr", label: "Construction finance" },
			{ value: "12", label: "New classrooms" },
			{ value: "1 yr", label: "Moratorium" },
		],
	},
	{
		client: "Boutique Hotel",
		industry: "Hospitality",
		service: "Debt Restructuring",
		title: "Resetting loans after slow seasons",
		challenge:
			"Two slow seasons left the property servicing EMIs from reserves, with stress close behind.",
		solution:
			"We rescheduled the term debt with a seasonal repayment calendar — lighter summers, stronger winters.",
		stats: [
			{ value: "30%", label: "EMI relief in summer" },
			{ value: "Current", label: "Account status" },
			{ value: "2 yrs", label: "Extended runway" },
		],
	},
	{
		client: "Printing Press",
		industry: "Manufacturing",
		service: "Corporate Finance",
		title: "Refinancing machinery the smart way",
		challenge:
			"Aging presses were raising rejection rates while existing machinery loans carried penal-rate baggage.",
		solution:
			"We refinanced the book and funded a modern press in one facility, priced off the improved margin profile.",
		stats: [
			{ value: "₹2.6 Cr", label: "Refinanced + funded" },
			{ value: "2.5%", label: "Rate improvement" },
			{ value: "-40%", label: "Rejection rate" },
		],
	},
];

export default function CaseStudies() {
	const rootRef = useRef(null);
	useLineReveal(rootRef);
	const [openIndex, setOpenIndex] = useState(0);
	const [query, setQuery] = useState("");
	const [industry, setIndustry] = useState("All industries");
	const [debouncedQuery, setDebouncedQuery] = useState("");

	// debounce search so filtering runs 300ms after the user stops typing
	useEffect(() => {
		const t = setTimeout(() => setDebouncedQuery(query), 300);
		return () => clearTimeout(t);
	}, [query]);

	const industries = [
		"All industries",
		...new Set(cases.map((c) => c.industry)),
	];
	const q = debouncedQuery.trim().toLowerCase();
	const visible = cases.filter((c) => {
		const inIndustry =
			industry === "All industries" || c.industry === industry;
		const inQuery =
			q === "" ||
			`${c.title} ${c.client} ${c.industry} ${c.service}`
				.toLowerCase()
				.includes(q);
		return inIndustry && inQuery;
	});

	// keep an open card whenever the filter result changes
	useEffect(() => {
		setOpenIndex(visible.length > 0 ? 0 : null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedQuery, industry]);

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
						Case Studies
					</p>
					<h1 className="mt-2 font-heading text-[1.9rem] leading-[1.15] text-(--color-black) sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
						<span className="block overflow-hidden pb-2">
							<span className="rv-line block">
								Work That{" "}
								<span className="text-(--color-primary)">
									Delivered
								</span>
							</span>
						</span>
					</h1>
					<p className="rv-fade mt-4 font-inter-reg fs-body text-neutral-500">
						Real engagements, real outcomes — open a story to see
						how we structure capital around growing businesses.
					</p>
				</div>

				{/* search + industries */}
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
							placeholder="Search case studies…"
							className="w-full rounded-xl border border-black/10 bg-white py-3 pl-11 pr-4 font-inter-reg text-[0.95rem] text-(--color-black) placeholder:text-neutral-400 outline-none transition-all duration-300 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20"
						/>
					</label>
					<label className="relative block">
						<select
							value={industry}
							onChange={(e) => setIndustry(e.target.value)}
							aria-label="Filter by industry"
							className="w-full appearance-none rounded-xl border border-black/10 bg-white px-4 py-3 pr-10 font-inter-reg text-[0.95rem] text-(--color-black) outline-none transition-all duration-300 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/20"
						>
							{industries.map((t) => (
								<option key={t} value={t}>
									{t}
								</option>
							))}
						</select>
						<span
							aria-hidden="true"
							className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
						>
							<ChevronDown size={16}/>
						</span>
					</label>
				</div>

				{visible.length === 0 ? (
					<div className="mt-10">
						<p className="font-inter-reg fs-body text-neutral-500">
							No case studies match your search.
						</p>
						<button
							type="button"
							onClick={() => {
								setQuery("");
								setIndustry("All industries");
							}}
							className="mt-3 font-inter-reg text-[0.95rem] text-(--color-primary) hover:underline hover:underline-offset-4"
						>
							Clear search and filters
						</button>
					</div>
				) : (
				/* expandable stories */
				<div className="mt-10 flex flex-col gap-[18px] lg:mt-14">
					{visible.map((c, i) => {
						const open = openIndex === i;
						return (
							<div
								key={c.title}
								className={`rv-fade overflow-hidden rounded-[16px] transition-colors duration-500 ${
									open
										? "bg-(--color-primary)"
										: "border border-black/5 bg-[#EAF1FC] hover:bg-[#d8e7fb]"
								}`}
							>
								<button
									type="button"
									onClick={() => setOpenIndex(open ? null : i)}
									aria-expanded={open}
									className={`w-full cursor-pointer px-4 py-5 text-left sm:px-8 sm:py-7 ${
										open
											? "flex flex-col gap-4"
											: "grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-8"
									}`}
								>
									{open ? (
										<span className="flex items-center justify-between">
											<span className="font-heading text-[0.95rem] text-white/60">
												{String(i + 1).padStart(2, "0")}
											</span>
											<span className="grid h-10 w-10 shrink-0 rotate-45 place-items-center rounded-full bg-white text-(--color-primary) transition-all duration-500 sm:h-11 sm:w-11">
												<Plus size={16} />
											</span>
										</span>
									) : (
										<span className="font-heading text-[0.95rem] text-neutral-400 transition-colors duration-500">
											{String(i + 1).padStart(2, "0")}
										</span>
									)}
									<span>
										<span
											className={`break-words font-inter-reg text-[0.75rem] tracking-wide transition-colors duration-500 sm:text-[0.8rem] ${
												open ? "text-white/70" : "text-neutral-500"
											}`}
										>
											<span
												className={`font-heading ${
													open
														? "text-(--color-white)"
														: "text-(--color-primary)"
												}`}
											>
												{c.industry}
											</span>
											{"  ·  "}
											{c.service}
											{"  ·  "}
											{c.stats[0].value} {c.stats[0].label.toLowerCase()}
										</span>
										<span
											className={`mt-2 block break-words font-heading text-[1.1rem] leading-snug transition-colors duration-500 sm:text-[1.75rem] ${
												open
													? "text-(--color-white)"
													: "text-(--color-black)"
											}`}
										>
											{c.title}
										</span>
									</span>
									{!open && (
										<span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/15 text-(--color-black) transition-all duration-500 sm:h-11 sm:w-11">
											<Plus size={16} />
										</span>
									)}
								</button>
								<div
									className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
										open
											? "grid-rows-[1fr] opacity-100"
											: "grid-rows-[0fr] opacity-0"
									}`}
								>
									<div className="min-h-0 overflow-hidden">
										<div className="grid grid-cols-1 gap-6 px-4 pb-6 sm:px-8 sm:pb-8 lg:grid-cols-2 lg:gap-10">
											
											<div className="flex flex-col justify-center gap-5">
												{c.stats.map((s, si) => (
													<div
														key={s.label}
														style={{
															transitionDelay: open ? `${250 + si * 90}ms` : "0ms",
														}}
														className={`flex items-baseline justify-between gap-4 border-b border-white/15 pb-4 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] last:border-0 last:pb-0 ${
															open
																? "translate-x-0 opacity-100"
																: "translate-x-6 opacity-0"
														}`}
													>
														<span className="min-w-0 break-words font-heading text-[1.5rem] text-(--color-white) sm:text-[2.25rem]">
															{s.value}
														</span>
														<span className="shrink-0 text-right font-inter-reg text-[0.8rem] text-white/70 sm:text-[0.9rem]">
															{s.label}
														</span>
													</div>
												))}
											</div>

											<div
												style={{ transitionDelay: open ? "150ms" : "0ms" }}
												className={`space-y-4 font-inter-reg fs-body text-(color-mix(in_oklab,var(--color-white)_82%,transparent)) transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
													open
														? "translate-y-0 opacity-100"
														: "translate-y-4 opacity-0"
												}`}
											>
												<p className="text-(--color-white)/80" >
													<span className="font-heading text-(--color-white)">
														Challenge —{" "}
													</span>
													{c.challenge}
												</p>
												<p className="text-(--color-white)/80" >
													<span className="font-heading text-(--color-white)">
														What we did —{" "}
													</span>
													{c.solution}
												</p>
												<p className="font-inter-reg text-[0.9rem] text-white/60">
													{c.client}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				)}


				<WhyUs />
				{/* cta */}
				{/* <div className="rv-fade mt-[18px] flex flex-col items-start justify-between gap-5 rounded-[16px] bg-(--color-primary) p-6 sm:flex-row sm:items-center sm:p-10">
					<h2 className="font-heading text-[1.5rem] text-(--color-white) sm:text-[2rem]">
						Your business could be next.
					</h2>
					<Link
						to="/contact"
						className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-white px-7 py-3 font-inter-reg text-[0.95rem] text-(--color-black) transition-all duration-300 hover:gap-3 active:scale-[0.98]"
					>
						Talk to us
						<ArrowRight
							size={16}
							className="transition-transform duration-300 group-hover:translate-x-0.5"
						/>
					</Link>
				</div> */}
			</section>
		</main>
	);
}
