import { useRef } from "react";
import { useLineReveal } from "../lib/reveal.js";

// NOTE: template text — have legal counsel review before publishing.
const sections = [
	{
		h: "Information we collect",
		p: "When you contact us through forms, email, or phone, we collect the details you share — such as your name, contact information, business details, and requirement description — solely to respond to your enquiry. We also receive basic technical data (device type, browser, pages visited) that helps us keep the website secure and working well.",
	},
	{
		h: "How we use it",
		p: "Your information is used to respond to enquiries, assess financing requirements, prepare proposals, and communicate about our services. We may also use aggregated, non-identifying data to understand how visitors use the website and improve it. We do not sell your personal information to third parties.",
	},
	{
		h: "Cookies and similar technologies",
		p: "This website may use essential cookies and local storage for core functionality such as remembering preferences and measuring page performance. You can control cookies through your browser settings; disabling them may affect how parts of the site behave.",
	},
	{
		h: "Data sharing",
		p: "Where a financing proposal requires it, relevant business information may be shared with lending and professional partners — only with your knowledge and consent. We may also disclose information where required by law or to protect our legal rights.",
	},
	{
		h: "Data security",
		p: "We apply reasonable administrative and technical safeguards to protect your information against unauthorized access, alteration, or loss. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
	},
	{
		h: "Data retention",
		p: "We retain enquiry records for as long as reasonably needed to serve you and meet legal and regulatory obligations, after which they are securely deleted or anonymized.",
	},
	{
		h: "Your rights",
		p: "You may request access to, correction of, or deletion of your personal information at any time. To exercise these rights, write to us using the contact details below — we will respond within a reasonable timeframe.",
	},
	{
		h: "Third-party links",
		p: "This website may link to external sites such as maps or social platforms. Their privacy practices are governed by their own policies, and we encourage you to review them.",
	},
	{
		h: "Changes to this policy",
		p: "We may update this policy from time to time to reflect operational or legal changes. The current version will always be posted on this page.",
	},
	{
		h: "Contact us",
		p: "For any privacy-related questions or requests, write to we.care@udyamcapital.com or call us on +91 82875 98661.",
	},
];

export default function PrivacyPolicy() {
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
						<span className="rv-line block">Privacy Policy</span>
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
