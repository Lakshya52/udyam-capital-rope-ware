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
				<div className="absolute top-[-60px] left-[28%] h-[520px] w-px rotate-[18deg] bg-gradient-to-b from-transparent via-[#155bd4]/15 to-transparent" />
				<div className="absolute top-[-60px] left-[33%] h-[520px] w-px rotate-[18deg] bg-gradient-to-b from-transparent via-[#155bd4]/10 to-transparent" />
			</div>

			{/* Text block — capped at 1166px, padded to clear the overlaid navbar */}
			<div className="relative z-10 flex items-end justify-between max-w-[1166px] mx-auto pt-[160px] md:pt-[180px] pb-10 px-5 md:px-8 xl:px-0">
				<div className="flex flex-col items-start justify-center">
					<h1 className="font-heading fs-heading text-[#101828]">
						<span className="block overflow-hidden pb-1">
							<span className="hero-line block">Strategic Partner in your</span>
						</span>
						<span className="block overflow-hidden pb-2">
							<span className="hero-line block bg-(--color-primary) bg-clip-text text-transparent">
								Successful Business Journey
							</span>
						</span>
					</h1>
					<p className="hero-fade font-inter-reg fs-body max-w-3xl mt-5">
						We are focused on solving Business Challenges with our
						Expertise, Groundbreaking Solutions and a Collaborative
						Mindset
					</p>
				</div>

				{/* shapes — small dusty-blue, with soft glow behind */}
				<div className="hero-fade flex flex-col items-end">
					<div
						className="relative w-fit pointer-events-none hidden sm:flex items-center justify-center mt-4"
						aria-hidden="true"
					>
						<div className="absolute h-32 w-48 rounded-full bg-white/40 blur-2xl" />
						<div className="relative h-10 w-10 rotate-45 bg-white/60 mr-2"></div>
						<div className="relative h-14 w-14 rounded-full bg-white/60 flex items-center justify-center">
							<div className="h-5 w-5 rounded-full bg-[#EAF1FB]"></div>
						</div>
						<div className="relative h-14 w-14 bg-white/60"></div>
					</div>
					<Link
						to="/contact"
						className="mt-6 inline-block rounded-lg w-fit bg-white px-7 py-2.5 text-[13.5px] font-inter-reg fs-body text-[#101828] shadow-lg shadow-[#155bd4]/15 transition-colors hover:bg-blue-50"
					>
						Schedule a Consultation
					</Link>
				</div>
			</div>

			{/* Ropes — keyed canvas over the SAME continuous backdrop, so no edge */}
			<div className="relative z-10 w-full overflow-hidden bg-transparent md:h-[44vh] lg:h-[48vh]">
				<HeroVideo />
				{/* gentle melt into the page white at the very bottom */}
				<div
					className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-b from-transparent to-white"
					aria-hidden="true"
				/>
			</div>
		</section>
	);
}
