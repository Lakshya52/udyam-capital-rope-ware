import { useRef } from "react";
import { useLineReveal } from "../lib/reveal.js";

// NOTE: template text — have legal counsel review before publishing.
const sections = [
	{
		h: "About this website",
		p: "This website presents the services of Udyam Capital and allows visitors to request consultations. Content here is for general information only and does not constitute financial, legal, or investment advice.",
	},
	{
		h: "Our services",
		p: "Udyam Capital offers business loans facilitation, debt restructuring, corporate finance, loan against property, working capital solutions, fund raising, project finance, MSME finance, and financial advisory. Specific terms for any engagement are set out in a separate written agreement.",
	},
	{
		h: "No offer or guarantee",
		p: "Financing outcomes depend on lender evaluation of each case. Nothing on this website constitutes an offer of credit or a guarantee of approval, amounts, timelines, or terms.",
	},
	{
		h: "Accuracy of information",
		p: "We aim to keep website content accurate and current, but we make no warranties about completeness or reliability. Articles and guides reflect general perspectives at the time of writing and may not reflect later regulatory or market changes.",
	},
	{
		h: "Acceptable use",
		p: "You agree not to misuse this website — including submitting false or misleading information, attempting to disrupt the service, harvesting data, or infringing intellectual property rights.",
	},
	{
		h: "Intellectual property",
		p: "All text, visuals, branding, and design on this website belong to Udyam Capital unless stated otherwise, and may not be copied, reproduced, or distributed without prior written permission.",
	},
	{
		h: "Third-party links",
		p: "Links to external websites are provided for convenience. We do not endorse and are not responsible for the content, products, or practices of third-party sites.",
	},
	{
		h: "Limitation of liability",
		p: "To the maximum extent permitted by law, Udyam Capital is not liable for any indirect or consequential losses arising from the use of, or reliance on, this website's content.",
	},
	{
		h: "Governing law",
		p: "These terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of the courts at Gautam Buddha Nagar, Uttar Pradesh.",
	},
	{
		h: "Changes to these terms",
		p: "We may revise these terms periodically. Continued use of the website after changes are posted constitutes acceptance of the updated terms.",
	},
	{
		h: "Contact",
		p: "Questions about these terms can be sent to we.care@udyamcapital.com or call us on +91 82875 98661.",
	},
];

export default function TermsOfUse() {
	const rootRef = useRef(null);
	useLineReveal(rootRef);

	return (
		<main ref={rootRef} className="relative overflow-hidden bg-white">
			<div
				className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px] overflow-hidden"
				aria-hidden="true"
			>
				<div className="absolute left-[6%] top-0 h-72 w-[480px] rounded-full bg-[#9cc7ff]/50 blur-[110px]" />
				<div className="absolute right-[4%] top-10 h-56 w-56 rounded-full bg-[#5495D8]/30 blur-[90px]" />
			</div>

			<section className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pb-[10dvh] pt-28 md:px-8 lg:pt-44 xl:px-0">
				<p className="rv-fade font-inter-reg fs-body-sm text-[var(--color-primary)]">
					Legal
				</p>
				<h1 className="mt-2 font-heading text-[1.9rem] leading-[1.15] text-[var(--color-black)] sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
					<span className="block overflow-hidden pb-2">
						<span className="rv-line block">Terms of Use</span>
					</span>
				</h1>
				<div className="mt-8 flex flex-col gap-8">
					{sections.map((s) => (
						<div key={s.h} className="rv-fade">
							<h2 className="font-heading text-[1.25rem] text-[var(--color-black)]">
								{s.h}
							</h2>
							<p className="mt-2 font-inter-reg fs-body leading-relaxed text-neutral-600">
								{s.p}
							</p>
						</div>
					))}
				</div>
			</section>
		</main>
	);
}
