import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Segmented copy — identical text to before, split only so key phrases
// can carry emphasis. Boundaries always fall on spaces (or carry the
// adjacent punctuation) so the rendered copy is byte-identical.
const PARAS = [
	[
		{ t: "Udyam Capital", s: "brand" },
		{ t: "is a forward-thinking Strategic Management consulting firm focused on solving most pressing business challenges. We specialize in helping companies" },
		{ t: "raise the capital", s: "hl" },
		{ t: "they need to drive growth and implement transformative strategies, whether looking to" },
		{ t: "Expand, Diversify, or Strengthen financial liquidity.", s: "b" },
		{ t: "We offer Innovative, Tailored Solutions designed to meet the unique needs." },
	],
	[
		{ t: "Beyond capital raising," },
		{ t: "Udyam Capital", s: "brand" },
		{ t: "provides cutting-edge advisory services to" },
		{ t: "build and optimize key business functions", s: "hl" },
		{ t: "such as IT & Infrastructure, Sales & Marketing, HR & Administration, Supply Chain, and Logistics, etc. We combine" },
		{ t: "deep Industry Expertise", s: "b" },
		{ t: "with creative strategies and financial insights to guide through the complexities of fundraising and business evolution." },
	],
	[
		{ t: "With" },
		{ t: "decades of experience,", s: "b" },
		{ t: "our team brings a wealth of knowledge, actionable insights, and a" },
		{ t: "results-driven mindset", s: "hl" },
		{ t: "to every engagement. We recognize that every business is" },
		{ t: "unique,", s: "u" },
		{ t: "and we craft custom solutions that drive long-term success, improve operational efficiency, mitigate risk, and maximize value" },
	],
];

const Intro = () => {
	const rootRef = useRef(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			// all three paragraphs treated as ONE continuous word stream
			const words = gsap.utils.toArray(".intro-word");
			gsap.fromTo(
				words,
				{ opacity: 0.15 },
				{
					opacity: 1,
					ease: "none",
					stagger: 0.05,
					scrollTrigger: {
						trigger: rootRef.current,
						start: "top 15%",
						end: "+=150%",
						scrub: 0.5,
						pin: true,
						anticipatePin: 1,
						
					},
				}
			);
		}, rootRef);
		return () => ctx.revert();
	}, []);

	return (
		<div ref={rootRef} className="section mx-auto flex w-full max-w-[1166px] flex-col gap-6 px-5 sm:gap-8 sm:px-8 lg:gap-10 xl:px-0">
			{PARAS.map((segs, i) => {
				const words = [];
				segs.forEach((seg) => {
					seg.t
						.split(" ")
						.filter(Boolean)
						.forEach((w) => words.push({ w, s: seg.s }));
				});
				return (
					<p key={i} className="intro-para font-inter-reg text-left text-[1rem] leading-relaxed sm:text-justify sm:text-[1.125rem] lg:text-[1.25rem]">
						{words.map((obj, j) => (
							<span key={j} className="intro-word">
								{obj.w}{" "}
							</span>
						))}
					</p>
				);
			})}
		</div>
	);
};

export default Intro;
