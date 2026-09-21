import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroVideo from "./HeroVideo.jsx";
import { onSiteReady } from "../lib/siteReady.js";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
	const rootRef = useRef(null);

	useLayoutEffect(() => {
		let off = null;
		let st = null;
		const ctx = gsap.context(() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			// paused until the preloader reveals the site, then replays
			// every time the hero scrolls back into view
			const tl = gsap
				.timeline({ paused: true, defaults: { ease: "power3.out" } })
				.from(".hero-line", { yPercent: 110, duration: 0.9, stagger: 0.12 })
				.from(
					".hero-fade",
					{ y: 24, opacity: 0, duration: 0.7, stagger: 0.1 },
					"-=0.5"
				);
			off = onSiteReady(() => {
				st = ScrollTrigger.create({
					trigger: rootRef.current,
					start: "top 85%",
					toggleActions: "play none none reverse",
					animation: tl,
				});
			});
			// (shape ambient animation removed — shapes stay static)
		}, rootRef);
		return () => {
			if (off) off();
			if (st) st.kill();
			ctx.revert();
		};
	}, []);

	return (
		<section ref={rootRef} className="relative isolate w-full overflow-hidden bg-white">
			{/* ===== One continuous backdrop for text + video (no seams) ===== */}
			<div
				className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
				aria-hidden="true"
			>
				{/* single vertical wash: blue behind navbar/text, melting to white */}
				<div
					className="absolute inset-0"
					style={{
						backgroundImage:
							"linear-gradient(to bottom, #BDD1EF 0%, #D3E3F8 28%, #E4EEFB 52%, #F2F7FE 76%, #FFFFFF 100%)",
					}}
				/>
				{/* small soft glows near the top only */}
				<div className="absolute -top-24 -left-24 h-[380px] w-[480px] rounded-full bg-[#9DBDE8]/40 blur-[90px]" />
				<div className="absolute -top-20 right-[-80px] h-[320px] w-[420px] rounded-full bg-white/50 blur-[80px]" />
				{/* faint grid, fading out before the video area */}
				<div
					className="absolute top-0 inset-x-0 h-[560px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
					style={{
						backgroundImage:
							"linear-gradient(to right, rgba(21,91,212,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(21,91,212,0.07) 1px, transparent 1px)",
						backgroundSize: "48px 48px",
					}}
				/>
				{/* two faint diagonal lines near the top */}
				{/* <div className="absolute top-[-60px] left-[28%] h-[520px] w-px rotate-[18deg] bg-linear-to-b from-transparent via-[#155bd4]/15 to-transparent" />
				<div className="absolute top-[-60px] left-[33%] h-[520px] w-px rotate-[18deg] bg-linear-to-b from-transparent via-[#155bd4]/10 to-transparent" /> */}
			</div>

			{/* Text block — capped at 1166px, padded to clear the overlaid navbar */}
			{/* Mobile: stacked (texts → shapes & buttons). Desktop: side-by-side */}
			<div className="relative z-10 mx-auto flex max-w-[1166px] flex-col gap-8 px-5 pt-[120px] pb-8 sm:pt-[140px] md:flex-row md:items-end md:justify-between md:gap-6 md:px-8 md:pt-[180px] md:pb-10 xl:px-0">
				<div className="flex w-full flex-col items-start justify-center md:w-auto md:min-w-0 md:flex-1">
					<h1 className="font-heading text-[#101828] text-[2.05rem] leading-[1.12] sm:text-[2.75rem] lg:text-[3.5rem] lg:leading-[114%]">
						<span className="block overflow-hidden pb-1">
							<span className="hero-line block">Strategic Partner in your</span>
						</span>
						<span className="block overflow-hidden pb-2">
							<span className="hero-line block bg-(--color-primary) bg-clip-text text-transparent">
								Successful Business Journey
							</span>
						</span>
					</h1>
					<p className="hero-fade font-inter-reg mt-4 max-w-3xl text-[1rem] leading-relaxed text-[#344054] sm:mt-5 sm:text-[1.125rem] lg:text-[1.25rem]">
						We are focused on solving Business Challenges with our
						Expertise, Groundbreaking Solutions and a Collaborative
						Mindset
					</p>
				</div>

				{/* shapes & buttons — stacked under text on mobile, right column on desktop */}
				<div className="hero-fade flex w-full flex-col items-start gap-5 md:w-auto md:shrink-0 md:items-end md:gap-0">
					{/* <div
						className="pointer-events-none relative mt-0 hidden w-fit origin-left items-center justify-center md:mt-4 md:flex"
						aria-hidden="true"
					>
						<div className="absolute h-32 w-48 rounded-full bg-white/40 blur-2xl" />
						<div className="relative mr-2 h-10 w-10 rotate-45 bg-white/60"></div>
						<div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/60">
							<div className="h-5 w-5 rounded-full bg-[#EAF1FB]"></div>
						</div>
						<div className="relative h-14 w-14 bg-white/60"></div>
					</div> */}
					<Link
						to="/contact"
						className="inline-block w-fit rounded-lg bg-white px-7 py-2.5 font-inter-reg text-[13.5px] text-[#101828] shadow-lg shadow-[#155bd4]/15 transition-colors hover:bg-blue-50 md:mt-6"
					>
						Schedule a Consultation
					</Link>
				</div>
			</div>

			{/* Ropes — keyed canvas over the SAME continuous backdrop, so no edge */}
			{/* Mobile: stacked below buttons with its own height. Desktop: taller band */}
			<div className="relative z-10 h-[240px] w-full overflow-hidden bg-transparent sm:h-[340px] md:h-[44vh] lg:h-[48vh]">
				<HeroVideo />
				{/* gentle melt into the page white at the very bottom */}
				<div
					className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-linear-to-b from-transparent to-white"
					aria-hidden="true"
				/>
			</div>
		</section>
	);
}
