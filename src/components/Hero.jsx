import { useLayoutEffect, useRef } from "react";
import { TrendingUp } from "lucide-react";
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
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
				return;
			// paused until the preloader reveals the site, then replays
			// every time the hero scrolls back into view
			const tl = gsap
				.timeline({ paused: true, defaults: { ease: "power3.out" } })
				.from(".hero-line", {
					yPercent: 110,
					duration: 0.9,
					stagger: 0.12,
				})
				.from(
					".hero-fade",
					{ y: 24, opacity: 0, duration: 0.7, stagger: 0.1 },
					"-=0.5",
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

	// Scroll parallax — one shared trigger driving all layers (cheaper than
	// three separate ones), with smoothed scrub. Skipped for reduced motion.
	useLayoutEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
			return;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: "none" },
				scrollTrigger: {
					trigger: rootRef.current,
					start: "top top",
					end: "bottom top",
					scrub: 0.6,
					fastScrollEnd: true,
				},
			});
			tl.to(".hero-bg", { yPercent: 12 }, 0);
			tl.to(".hero-content", { y: -70, opacity: 0.2 }, 0);
			tl.to(".hero-cards", { y: -150 }, 0);
		}, rootRef);
		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={rootRef}
			className="relative isolate flex w-full flex-col overflow-hidden bg-white lg:min-h-dvh"
		>
			{/* cloud backdrop */}
			<div
				className="hero-bg pointer-events-none absolute inset-0 z-0 will-change-transform"
				aria-hidden="true"
			>
				<img
					src="/HeroBg.webp"
					alt=""
					loading="eager"
					decoding="async"
					className="h-full w-full scale-[1.25] object-cover"
				/>
			</div>

			{/* content — text left, finance cards right */}
			<div className="relative z-10 mx-auto grid w-full max-w-[1166px] grid-cols-1 items-center gap-10 px-5 pb-14 pt-[100px] md:px-8 lg:my-auto lg:grid-cols-[1fr_1fr] lg:gap-4 lg:pb-20 lg:pt-[140px] xl:px-0">
				<div className="hero-content flex w-full max-w-[650px] flex-col items-start justify-center will-change-transform">
					<h1 className="font-heading text-[2.05rem] leading-[1.12] text-[#101828] sm:text-[2.75rem] lg:text-[3.5rem] lg:leading-[114%]">
						<span className="block overflow-hidden pb-2">
							<span className="hero-line block text-(--color-dark-blue)">
								Strategic Partner in your Successful Business
								Journey
							</span>
						</span>
					</h1>
					<p className="hero-fade font-inter-reg mt-4 max-w-lg text-[1rem] leading-relaxed text-[#344054] sm:mt-5 sm:text-[1.125rem] lg:text-[1.25rem] ">
						We are focused on solving Business Challenges with our
						Expertise, Groundbreaking Solutions and a Collaborative
						Mindset
					</p>
				</div>

				{/* overlapping finance cards */}
				<div
					className="hero-cards hero-fade relative mx-auto h-auto w-full max-w-[620px] will-change-transform lg:h-[500px] "
					aria-hidden="true"
				>
					{/* Back card — Let's Plan your business journey */}
					<div
						className="
							relative ml-auto z-20 hero-float-a lg:absolute lg:right-0 lg:top-[-60px]
							flex h-auto min-h-[260px] w-[82%] max-w-[325px] lg:h-[380px]
							flex-col
							rounded-2xl
							justify-evenly pb-10
							border border-white/60
							bg-white/90
							p-5
							shadow-[0_30px_70px_rgba(12,31,51,0.22)]
							backdrop-blur-xl
							
						"
					>
						<p className="font-heading fs-body text-neutral-800">
							Let's Plan Your Business Journey
						</p>
						<p className="text-(--color-primary) fs-body-sm font-inter-reg" > Custom solutions</p>

						<ol className="mt-4 space-y-4">
							{[
								{ s: "Plan", d: "Capital strategy first" },
								{ s: "Raise", d: "Debt shaped to cash flows" },
								{ s: "Manage", d: "Finance run with discipline" },
								{ s: "Scale", d: "Funding for every stage" },
							].map((st, i) => (
								<li
									key={st.s}
									className="flex items-center gap-3"
								>
									<span className="w-10 shrink-0 font-heading text-[2rem] leading-none text-(--color-primary)/25">
										0{i + 1}
									</span>

									<span>
										<span className="block font-heading text-(--color-primary) text-[13px] ">
											{st.s}
										</span>

										<span className="mt-0.5 block font-inter-reg text-[13px] leading-snug">
											{st.d}
										</span>
									</span>
								</li>
							))}
						</ol>
					</div>

					{/* Front card — strategic partner */}
					<div
						className="
							relative mt-6 hero-float-b lg:absolute lg:bottom-0 lg:left-0 
							flex items-start h-auto min-h-[240px] w-[82%] max-w-[325px] lg:mt-0 lg:h-[435px]
							flex-col justify-evenly
							rounded-2xl
							p-5
							bg-[#f8f8f8]
							
						"
					>
						{/* <div className="relative mx-auto mt-2 h-48 w-full lg:h-64">
							<svg
								viewBox="0 0 100 100"
								preserveAspectRatio="none"
								className="absolute inset-0 h-full w-full"
								aria-hidden="true"
							>
								<line x1="50" y1="50" x2="50" y2="14" stroke="rgba(8,83,160,0.28)" strokeWidth="0.7" />
								<line x1="50" y1="50" x2="86" y2="50" stroke="rgba(8,83,160,0.28)" strokeWidth="0.7" />
								<line x1="50" y1="50" x2="50" y2="86" stroke="rgba(8,83,160,0.28)" strokeWidth="0.7" />
								<line x1="50" y1="50" x2="14" y2="50" stroke="rgba(8,83,160,0.28)" strokeWidth="0.7" />
							</svg>

							<span
								className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-primary)/[0.07]"
								aria-hidden="true"
							/>

							<span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-(--color-primary) text-white shadow-[0_10px_25px_rgba(8,83,160,0.4)]">
								<TrendingUp size={18} />
							</span>

							{[
								{ lines: ["Transaction", "Advisory"], c: "left-1/2 top-0 -translate-x-1/2" },
								{ lines: ["Credit Ratings", "Advisory"], c: "right-0 top-1/2 -translate-y-1/2" },
								{ lines: ["CFO", "Services"], c: "bottom-0 left-1/2 -translate-x-1/2" },
								{ lines: ["Debt & Capital", "Advisory"], c: "left-0 top-1/2 -translate-y-1/2" },
							].map((n) => (
								<span
									key={n.lines.join(" ")}
									className={`absolute ${n.c} flex  flex-col items-center rounded-full bg-white/95 px-2.5 py-1 font-heading text-[10px] leading-tight text-neutral-700 shadow-sm ring-1 ring-black/5`}
								>
									{n.lines.map((w) => (
										<span key={w}>{w}</span>
									))}
								</span>
							))}
						</div> */}
						<p className="font-heading fs-body text-neutral-800">Financial Clarity. <br /> Smarter Decisions.</p>
						<p className="text-(--color-primary) fs-body-sm font-inter-reg"  >Right Perspective.</p>
						<img src="/RupeesWheelWhite.webp" alt="" />
					</div>
				</div>
			</div>

			{/* gentle melt into the next section */}
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-b from-transparent to-white"
				aria-hidden="true"
			/>
		</section>
	);
}
