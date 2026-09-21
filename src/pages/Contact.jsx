import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
	Mail,
	Phone,
	MapPin,
	ArrowRight,
	CheckCircle2,
	ChevronDown,
} from "lucide-react";
import { useLineReveal } from "../lib/reveal.js";
import { services } from "../data/services.js";

const infoCards = [
	{
		icon: <Phone size={16} />,
		label: "Contact",
		lines: ["Landline : 0120 444 5816", "Mobile : +91 82875 98661"],
		hrefs: ["tel:01204445816", "tel:+918287598661"],
	},
	{
		icon: <Mail size={16} />,
		label: "Email us",
		lines: ["we.care@udyamcapital.com", "info@udyamcapital.com"],
		hrefs: [
			"mailto:we.care@udyamcapital.com",
			"mailto:info@udyamcapital.com",
		],
	},
	{
		icon: <MapPin size={16} />,
		label: "Address",
		lines: [
			"214, 2nd floor, Vishal Chambers, Noida Sector 18, Uttar Pradesh - 201301",
		],
		hrefs: [
			"https://www.google.com/maps/search/?api=1&query=Vishal+Chambers+Noida+Sector+18",
		],
		external: true,
	},
];

const steps = [
	{
		n: "01",
		title: "Share your requirement",
		desc: "Fill the form above or call us directly with your funding need.",
		dark: true,
	},
	{
		n: "02",
		title: "Get a callback",
		desc: "We review it and call you back within one business day to understand it better.",
		dark: false,
	},
	{
		n: "03",
		title: "Get structured",
		desc: "Receive the right capital solution for your business with clear next steps.",
		dark: true,
	},
];

const fieldInput =
	"peer w-full rounded-xl border border-black/10 bg-white px-4 pb-2.5 pt-4 font-inter-reg fs-body-sm text-[var(--color-black)] outline-none transition-all duration-300 placeholder-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20";
const fieldLabel =
	"pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1.5 font-inter-light text-[0.75rem] text-neutral-500 transition-all duration-300 peer-placeholder-shown:left-4 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-[1.25rem] peer-placeholder-shown:text-neutral-400 peer-focus:left-3 peer-focus:top-0 peer-focus:bg-white peer-focus:px-1.5 peer-focus:text-[0.75rem] peer-focus:text-[var(--color-primary)]";

export default function Contact() {
	const rootRef = useRef(null);
	useLineReveal(rootRef);
	const [searchParams] = useSearchParams();
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		service: "",
		message: "",
	});
	const [sent, setSent] = useState(false);

	// pre-select service when arriving from a service page (?service=...)
	useEffect(() => {
		const s = searchParams.get("service");
		if (s && services.some((x) => x.title === s)) {
			setForm((f) => ({ ...f, service: s }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const set = (key) => (e) => {
		setForm((f) => ({ ...f, [key]: e.target.value }));
		setSent(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const subject = encodeURIComponent(
			`Consultation request — ${form.name || "New enquiry"}${form.service ? ` (${form.service})` : ""}`,
		);
		const body = encodeURIComponent(
			`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service || "—"}\n\nMessage:\n${form.message}`,
		);
		window.location.href = `mailto:we.care@udyamcapital.com?subject=${subject}&body=${body}`;
		setSent(true);
	};

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
				<div className="">
					<p className="rv-fade font-inter-reg fs-body-sm text-[var(--color-primary)]">
						Contact Us
					</p>
					<h1 className="mt-2 font-heading text-[1.9rem] leading-[1.15] text-[var(--color-black)] sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
						<span className="block overflow-hidden pb-2">
							<span className="rv-line block">
								Let&apos;s Talk About{" "}
								<span className="text-[var(--color-primary)]">
									Your Growth
								</span>
							</span>
						</span>
					</h1>
					<p className="rv-fade font-inter-reg fs-body mt-4 text-neutral-500 max-w-2xl">
						Tell us about your financial requirements and we&apos;ll
						get back with the right capital solution for your
						business.
					</p>
				</div>

				<div className="mt-10 grid grid-cols-1 items-start gap-[18px] lg:mt-14 lg:grid-cols-12">
					{/* info column */}
					<div className="flex flex-col gap-[18px] lg:col-span-5">
						{infoCards.map((card) => (
							<div
								key={card.label}
								className="rv-fade rounded-[16px] border border-black/5 bg-[#EAF1FC] p-5 sm:p-6"
							>
								<div className="flex items-center gap-3 font-inter-reg fs-body">
									<span className="grid place-items-center h-10 w-10  rounded-full bg-(--color-primary) text-white">
										{card.icon}
									</span>
									<h2 className=" text-(--color-black)">
										{card.label}
									</h2>
								</div>
								<div className="space-y-1.5 pl-[52px]">
									{card.lines.map((line, i) => (
										<a
											key={line}
											href={card.hrefs[i]}
											{...(card.external
												? {
														target: "_blank",
														rel: "noreferrer",
													}
												: {})}
											className="block w-fit font-inter-reg fs-body-sm text-[var(--color-primary)] transition-all duration-300 hover:translate-x-1 hover:underline hover:underline-offset-4"
										>
											{line}
										</a>
									))}
								</div>
							</div>
						))}
					</div>

					{/* form column */}
					<div className="rv-fade rounded-[16px] border border-black/5 bg-white p-5 shadow-[0_24px_60px_rgba(12,31,51,0.12)] sm:p-8 lg:col-span-7">
						{/* <h2 className="font-heading text-[1.25rem] text-[var(--color-black)] sm:text-[1.5rem]">
							Request a Consultation
						</h2> */}
						{/* <p className="mt-1 font-inter-reg fs-body text-neutral-500">
							Fill this in — it opens your mail app addressed to us.
						</p> */}
						<form
							onSubmit={handleSubmit}
							className="flex flex-col gap-6"
						>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<label className="relative block">
									<input
										required
										value={form.name}
										onChange={set("name")}
										placeholder=" "
										className={fieldInput}
									/>
									<span className={fieldLabel}>
										Full name *
									</span>
								</label>
								<label className="relative block">
									<input
										required
										type="tel"
										value={form.phone}
										onChange={set("phone")}
										placeholder=" "
										className={fieldInput}
									/>
									<span className={fieldLabel}>Phone *</span>
								</label>
							</div>
							<label className="relative block">
								<input
									required
									type="email"
									value={form.email}
									onChange={set("email")}
									placeholder=" "
									className={fieldInput}
								/>
								<span className={fieldLabel}>Email *</span>
							</label>
							<label className="group relative block">
								<select
									value={form.service}
									onChange={set("service")}
									className="w-full appearance-none rounded-xl border border-black/10 bg-white px-4 pb-2.5 pt-4 font-inter-reg fs-body-sm text-[var(--color-black)] outline-none transition-all duration-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
								>
									<option value="" hidden></option>
									{services.map((s) => (
										<option key={s.id} value={s.title}>
											{s.title}
										</option>
									))}
								</select>
								<span
									className={`font-inter-light pointer-events-none absolute -translate-y-1/2 font-inter-reg transition-all duration-300 group-focus-within:left-3 group-focus-within:top-0 group-focus-within:bg-white group-focus-within:px-1.5 group-focus-within:text-[0.75rem] group-focus-within:text-[var(--color-primary)] ${
										form.service
											? "left-3 top-0 bg-white px-1.5 text-[0.75rem] text-neutral-500"
											: "left-4 top-1/2 bg-transparent text-[1.25rem] text-neutral-400"
									}`}
								>
									Service you&apos;re interested in
								</span>
								<span
									aria-hidden="true"
									className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
								>
									<ChevronDown size={16} />
								</span>
							</label>
							<label className="relative block">
								<textarea
									required
									rows={4}
									value={form.message}
									onChange={set("message")}
									placeholder=" "
									className={`${fieldInput} resize-none`}
								/>
								<span className={fieldLabel}>Message *</span>
							</label>
							<div className="flex flex-col sm:flex-row">
								<p className="rv-fade px-1 font-inter-reg fs-body-sm leading-relaxed text-neutral-500">
									We usually respond within one business day.
									For urgent requirements, a quick call works
									best.
								</p>
								<button
									type="submit"
									className="group mt-6 sm:mt-2 sm:ml-auto inline-flex w-fit items-center gap-2 rounded-lg bg-[var(--color-primary)] px-7 py-3 font-inter-reg fs-body text-white shadow-[0_16px_40px_rgba(8,83,160,0.3)] transition-all duration-300 hover:gap-3 hover:bg-[#0b4da2] active:scale-[0.98]"
								>
									Submit
									<ArrowRight
										size={16}
										className="transition-transform duration-300 group-hover:translate-x-0.5"
									/>
								</button>
							</div>
							{sent && (
								<p className="flex items-center gap-2 font-inter-reg fs-body text-[var(--color-primary)]">
									<CheckCircle2 size={16} />
									Your mail app should have opened — just hit
									send and we&apos;ll take it from there.
								</p>
							)}
						</form>
					</div>
				</div>
			</section>


			{/* find us */}
			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[10dvh] md:px-8 xl:px-0">
				{/* <div className="max-w-2xl">
					<h2 className="font-heading text-[1.9rem] leading-[1.15] text-[var(--color-black)] sm:text-[2.6rem]">
						<span className="block overflow-hidden pb-2">
							<span className="block">
								Find Us{" "}
								<span className="text-[var(--color-primary)]">Here</span>
							</span>
						</span>
					</h2>
					<p className="mt-2 font-inter-reg fs-body text-neutral-500">
						214, 2nd floor, Vishal Chambers, Noida Sector 18, Uttar
						Pradesh - 201301
					</p>
				</div> */}
				<div className="rv-fade mt-8 overflow-hidden rounded-[16px] border border-black/5 shadow-[0_24px_60px_rgba(12,31,51,0.12)]">
					<iframe
						title="Udyam Capital office location map"
						src="https://www.google.com/maps?q=Vishal+Chambers,+Sector+18,+Noida,+Uttar+Pradesh+201301&output=embed"
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						className="h-[320px] w-full border-0 lg:h-[420px]"
					/>
				</div>
			</section>

			{/* not sure where to start */}
			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[10dvh] md:px-8 xl:px-0">
				<div className="max-w-2xl">
					<h2 className="font-heading text-[1.9rem] leading-[1.15] text-[var(--color-black)] sm:text-[2.6rem]">
						<span className="block overflow-hidden pb-2">
							<span className="rv-line block">
								Not Sure{" "}
								<span className="text-[var(--color-primary)]">
									Where to Start?
								</span>
							</span>
						</span>
					</h2>
					<p className="rv-fade mt-2 font-inter-reg fs-body text-neutral-500">
						Browse what we offer first — then tell us which one
						fits.
					</p>
				</div>
				<div className="mt-8 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
					{services.map((s) => (
						<Link
							key={s.id}
							to={`/services/${s.id}`}
							className="group flex items-center justify-between gap-4 rounded-[16px] border border-black/5 bg-[#EAF1FC] px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-primary)] hover:shadow-[0_24px_60px_rgba(12,31,51,0.18)]"
						>
							<span className="font-heading text-[1.05rem] text-[var(--color-black)] transition-colors duration-300 group-hover:text-[var(--color-white)]">
								{s.title}
							</span>
							<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-primary)] text-white transition-transform duration-300 group-hover:-rotate-45 group-hover:bg-white group-hover:text-[var(--color-primary)]">
								<ArrowRight size={16} />
							</span>
						</Link>
					))}
				</div>
			</section>

			{/* what happens next */}
			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[10dvh] md:px-8 xl:px-0">
				<div className="max-w-2xl">
					<h2 className="font-heading text-[1.9rem] leading-[1.15] text-[var(--color-black)] sm:text-[2.6rem]">
						<span className="block overflow-hidden pb-2">
							<span className="block">
								What Happens{" "}
								<span className="text-[var(--color-primary)]">
									Next
								</span>
							</span>
						</span>
					</h2>
					<p className="mt-2 font-inter-reg fs-body text-neutral-500">
						Three simple steps between your requirement and the
						right capital.
					</p>
				</div>
				<div className="mt-8 grid grid-cols-1 gap-[18px] sm:grid-cols-3">
					{steps.map((step) => (
						<div
							key={step.n}
							className={`rounded-[16px] p-6 sm:p-7 ${
								step.dark
									? "bg-[var(--color-primary)]"
									: "border border-black/5 bg-[#9cc7ff]"
							}`}
						>
							<p
								className={`font-heading text-[2.5rem] leading-none ${
									step.dark
										? "text-[color-mix(in_oklab,var(--color-white)_35%,transparent)]"
										: "text-[color-mix(in_oklab,var(--color-black)_25%,transparent)]"
								}`}
							>
								{step.n}
							</p>
							<h3
								className={`mt-4 font-heading text-[1.25rem] ${
									step.dark
										? "text-[var(--color-white)]"
										: "text-[var(--color-black)]"
								}`}
							>
								{step.title}
							</h3>
							<p
								className={`mt-2 font-inter-reg fs-body ${
									step.dark
										? "text-[color-mix(in_oklab,var(--color-white)_80%,transparent)]"
										: "text-[color-mix(in_oklab,var(--color-black)_65%,transparent)]"
								}`}
							>
								{step.desc}
							</p>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
