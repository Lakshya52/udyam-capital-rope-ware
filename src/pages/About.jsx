import { useRef } from "react";
import { Link } from "react-router-dom";
import { useLineReveal } from "../lib/reveal.js";
import WhyUs from "../components/WhyUs.jsx";
import StatsBelt from "../components/StatsBelt.jsx";

function LinkedInIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
		</svg>
	);
}

// Edit these — replace name, role, photo (path in public/) and bio.
// Leave photo empty to keep the initials avatar.
// `linkedin` = full profile URL. Leave "" to hide the icon for that member.
const team = [
	{
		name: "Punit Kumar Rai",
		role: "Founder & Managing Partner",
		photo: "",
		linkedin: "https://www.linkedin.com/",
		bio: "Leads the firm's vision and key client relationships.",
	},
	{
		name: "Sashi Ranjan Singh",
		role: "Lead Finance Operations",
		photo: "",
		linkedin: "https://www.linkedin.com/",
		bio: "Runs the firm's finance operations and funding execution.",
	},
	{
		name: "Deepa Sharma",
		role: "HR Manager",
		photo: "",
		linkedin: "https://www.linkedin.com/",
		bio: "Builds the team and culture behind every engagement.",
	},
	{
		name: "Ayush Saxena",
		role: "Chartered Accountant",
		photo: "",
		linkedin: "https://www.linkedin.com/",
		bio: "Brings financial rigor to structuring and compliance.",
	},
	{
		name: "Nilesh Singh",
		role: "Senior Manager IT",
		photo: "",
		linkedin: "https://www.linkedin.com/",
		bio: "Keeps the firm's technology and infrastructure running.",
	},
	{
		name: "Lakshya Mittal",
		role: "Full Stack Developer",
		photo: "",
		linkedin: "https://www.linkedin.com/in/lakshya52",
		bio: "Builds and maintains the firm's digital platforms.",
	},
	{
		name: "Aman Singh",
		role: "Accountant",
		photo: "",
		linkedin: "https://www.linkedin.com/",
		bio: "Manages accounts and financial records with precision.",
	},
	{
		name: "Rahul",
		role: "Accounts",
		photo: "",
		linkedin: "https://www.linkedin.com/",
		bio: "Supports day-to-day accounting and client documentation.",
	},
];

const capabilities = [
	{ label: "Transaction Advisory", to: "/services/transaction-advisory" },
	{
		label: "Credit Ratings Advisory",
		to: "/services/credit-ratings-advisory",
	},
	{ label: "CFO Services", to: "/services/cfo-services" },
	{
		label: "Debt & Capital Advisory",
		to: "/services/debt-capital-advisory",
	},
];

export default function About() {
	const rootRef = useRef(null);
	useLineReveal(rootRef);

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

			{/* hero */}
			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[10dvh] pt-28 md:px-8 lg:pt-44 xl:px-0">
				<div className="max-w-3xl">
					<p className="rv-fade font-inter-reg fs-body-sm text-(--color-primary)">
						About Us
					</p>
					<h1 className="mt-2 font-heading text-[1.9rem] leading-[1.15] text-(--color-black) sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
						<span className="block overflow-hidden pb-2">
							<span className="rv-line block">
								We Are{" "}
								<span className="text-(--color-primary)">
									Udyam Capital
								</span>
							</span>
						</span>
					</h1>
					{/* <p className="rv-fade mt-4 font-inter-reg fs-body text-neutral-500">
						Udyam Capital is a forward-thinking strategic management
						consulting firm focused on solving the most pressing
						business challenges.
					</p> */}
				</div>

				{/* intro */}
				<div id="overview" className="rv-fade mt-10 w-full scroll-mt-24 lg:mt-14 lg:scroll-mt-36 sm:text-justify " >
					<p className="font-inter-reg fs-body leading-relaxed text-neutral-600">
						Udyam Capital is a financial advisory firm focused on
						one thing: getting the right capital into growing
						businesses on the right terms. We work across four
						practices — Transaction Advisory for deals and
						structures, Credit Ratings Advisory for stronger
						borrowing profiles, CFO Services for a disciplined
						finance function, and Debt &amp; Capital Advisory for
						term loans, working capital, LAP, project finance and
						syndications.
					</p>
					<p className="mt-5 font-inter-reg fs-body leading-relaxed text-neutral-600">
						Every engagement runs the same way: an honest
						assessment first, lender-grade preparation next, and
						parallel approaches so lenders compete for your mandate
						— tracked from first conversation to final disbursal.
						No generic playbooks and no open-ended meters; scope
						and commercials are agreed in writing before work
						begins.
					</p>
					<p className="mt-5 font-inter-reg fs-body leading-relaxed text-neutral-600">
						Our team blends credit, structuring and operating
						experience, and we craft custom solutions for every
						business we serve — measured in sanctions won, pricing
						improved and ratings repaired. Lower borrowing costs,
						steadier cash flows and funded growth: that is what we
						mean by a successful business journey.
					</p>
				</div>

				{/* vision + mission */}
				<div id="vision-mission" className="mt-10 grid scroll-mt-24 grid-cols-1 gap-[18px] lg:mt-14 lg:grid-cols-2 lg:scroll-mt-36">
					
					<div className="rv-fade rounded-[16px] bg-(--color-primary) p-6 sm:p-8 text-(--color-white)">
						<p className="font-heading text-[2rem] leading-none ">
							Vision
						</p>
						<p className="mt-4 font-inter-reg fs-body text-(--color-white)">
							To be the most trusted and reliable partner,
							empowering businesses to grow and create enduring
							value.
						</p>
					</div>
					<div className="rv-fade rounded-[16px] border border-black/5 bg-[#EAF1FC] p-6 sm:p-8">
						<p className="font-heading text-[2rem] leading-none text-(color-mix(in_oklab,var(--color-primary)_60%,transparent))">
							Mission
						</p>
						<p className="mt-4 font-inter-reg fs-body ">
							To enable businesses to thrive and stay competitive
							by delivering Innovative, Customized Solutions that
							foster Transformation and Growth.
						</p>
					</div>
				</div>
			</section>

			{/* what sets us apart */}
			<section id="what-sets-us-apart" className="relative z-10 mx-auto w-full max-w-[1166px] scroll-mt-24 px-5 pb-[10dvh] md:px-8 lg:scroll-mt-36 xl:px-0">
				<div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
					<div>
						<h2 className="font-heading text-[1.9rem] leading-[1.15] text-(--color-primary) sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
							<span className="block overflow-hidden pb-2">
								<span className="rv-line block">
									What Set's Us Apart
								</span>
							</span>
						</h2>
						<div className="mt-4 flex flex-col gap-5">
							{[
								{
									title: "Strategic Depth with Execution Focus",
									body: "Practical strategies that drive measurable results — not just theoretical advice.",
								},
								{
									title: "Customized, Collaborative Approach",
									body: "We act as an extension of your team, co-creating solutions around your goals.",
								},
								{
									title: "Empowerment-Driven Philosophy",
									body: "We empower entrepreneurs with clarity, resilience, and forward momentum.",
								},
								{
									title: "Results That Speak",
									body: "Capital raised, operations optimized, risks mitigated, value unlocked.",
								},
							].map((item, i) => (
								<p
									key={item.title}
									className="rv-fade font-inter-reg fs-body leading-relaxed text-neutral-700"
								>
									<span className="font-heading text-(--color-black)">
										{i + 1}. {item.title}
									</span>{" "}
									{item.body}
								</p>
							))}
						</div>
					</div>
					<div className="rv-fade">
						<img
							src="/AboutUsImage.svg"
							alt="Team collaborating on business growth"
							loading="lazy"
							decoding="async"
							className="h-auto w-full object-contain"
						/>
					</div>
				</div>
			</section>

			<div id="why-us" className="scroll-mt-24 lg:scroll-mt-36">
				<WhyUs />
			</div>
			<StatsBelt />
			

			{/* team */}
			<section id="meet-the-team" className="relative z-10 mx-auto w-full max-w-[1166px] scroll-mt-24 px-5 py-[10dvh] md:px-8 lg:scroll-mt-36 xl:px-0">
				<div className="max-w-2xl">
					<h2 className="font-heading text-[1.9rem] leading-[1.15] text-(--color-black) sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
						<span className="block overflow-hidden pb-2">
							<span className="rv-line block">
								Meet The{" "}
								<span className="text-(--color-primary)">
									Team
								</span>
							</span>
						</span>
					</h2>
					<p className="rv-fade mt-2 font-inter-reg fs-body text-neutral-500">
						The people behind the outcomes.
					</p>
				</div>
				<div className="mt-8 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
					{team.map((member, i) => {
						const initials = member.name
							.split(" ")
							.filter(Boolean)
							.slice(0, 2)
							.map((w) => w[0])
							.join("")
							.toUpperCase();
						return (
							<div
								key={`${member.name}-${i}`}
								className="rv-fade overflow-hidden rounded-[16px] border border-black/5 bg-white shadow-[0_24px_60px_rgba(12,31,51,0.08)]"
							>
								<div className="relative">
									{member.photo ? (
										<img
											src={member.photo}
											alt={member.name}
											loading="lazy"
											decoding="async"
											className="aspect-square w-full object-cover"
										/>
									) : (
										<div
											className={`grid aspect-square w-full place-items-center font-heading text-[3rem] ${
												i % 2 === 0
													? "bg-(--color-primary) text-(--color-white)"
													: "bg-[#9cc7ff] text-(--color-black)"
											}`}
											aria-hidden="true"
										>
											{initials || "?"}
										</div>
									)}
									{member.linkedin && (
										<a
											href={member.linkedin}
											target="_blank"
											rel="noreferrer"
											aria-label={`${member.name} on LinkedIn`}
											className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white text-(--color-primary) shadow-[0_12px_25px_rgba(12,31,51,0.25)] transition-all duration-300 hover:-translate-y-0.5"
										>
											<LinkedInIcon />
										</a>
									)}
								</div>
								<div className="p-5">
									<h3 className="font-heading text-[1.1rem] text-(--color-black)">
										{member.name}
									</h3>
									<p className="mt-0.5 font-inter-reg fs-body-sm text-(--color-primary)">
										{member.role}
									</p>
									<p className="mt-2 font-inter-reg text-[0.9rem] leading-relaxed text-neutral-500">
										{member.bio}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</section>

			{/* capabilities */}
			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[10dvh] md:px-8 xl:px-0">
				<div className="rv-fade rounded-[16px] bg-(--color-primary) p-6 sm:p-10">
					<h2 className="font-heading text-[1.5rem] text-(--color-white) sm:text-[2rem]">
						Four practices, one mandate
					</h2>
					<p className="mt-2 max-w-2xl font-inter-reg fs-body text-(--color-white)">
						A deal structured, a rating repaired, a finance
						function run, or funds disbursed — whatever your
						capital need, it lives in one of our practices. Tap
						one to explore it.
					</p>
					<div className="mt-6 flex flex-wrap gap-3">
						{capabilities.map((c) => (
							<Link
								key={c.label}
								to={c.to}
								className="rounded-full border border-white/30 px-5 py-2.5 font-inter-reg fs-body text-(--color-white) transition-colors duration-300 hover:bg-white hover:text-(--color-primary)"
							>
								{c.label}
							</Link>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
