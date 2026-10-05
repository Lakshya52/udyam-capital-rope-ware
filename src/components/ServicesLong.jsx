import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight as Arrow } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLineReveal } from "../lib/reveal.js";
import { useServices, asset } from "../lib/content.jsx";

gsap.registerPlugin(ScrollTrigger);

// Long-form services showcase — stacking cards in the site's theme, no
// photos: solid primary / light-blue cards with white/dark text, the
// signature corner-cut arrow, and a slight alternating tilt (left /
// right) for a playful stacked-deck feel. Each card sticks to the top as
// you scroll while the next one slides over it.
// Slim scroll progress for the deck — updates a sticky pill (01 / 04 +
// bar) via refs so scrolling stays jank-free with no re-renders.
function useDeckProgress(deckRef, barRef, labelRef, count) {
	useLayoutEffect(() => {
		const deck = deckRef.current;
		const bar = barRef.current;
		const label = labelRef.current;
		if (!deck || !bar || !label || !count) return;
		const total = String(count).padStart(2, "0");
		const render = (p) => {
			const clamped = Math.min(0.9999, Math.max(0, p));
			bar.style.transform = `scaleX(${clamped})`;
			label.textContent = `${String(Math.floor(clamped * count) + 1).padStart(2, "0")} / ${total}`;
		};
		render(0);
		const st = ScrollTrigger.create({
			trigger: deck,
			start: "top 75%",
			end: "bottom 45%",
			onUpdate: (self) => render(self.progress),
		});
		return () => st.kill();
	}, [deckRef, barRef, labelRef, count]);
}

function useStackOnScroll(rootRef, count) {
	useLayoutEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray(".services-long-card", rootRef.current);
			cards.forEach((card, i) => {
				// resting tilt — clearly visible fan; GSAP owns rotation so
				// the scrub below can ease it back to exactly 0 as the
				// card stacks
				gsap.set(card, { rotation: i % 2 === 0 ? -2 : 2 });
				if (i === cards.length - 1) {
					// last card is never covered — straighten it as it
					// arrives at its stuck position instead
					gsap.to(card, {
						rotation: 0,
						ease: "none",
						scrollTrigger: {
							trigger: card,
							start: "top bottom",
							end: `top ${96 + i * 24}px`,
							scrub: true,
							markers: false,
							id: `service-card-last`,
						},
					});
					return;
				}
				gsap.to(card, {
					scale: 1 - (cards.length - 1 - i) * 0.035,
					rotation: 0,
					transformOrigin: "center top",
					ease: "none",
					scrollTrigger: {
						trigger: cards[i + 1],
						start: "top bottom",
						end: "top top+=140",
						scrub: true,
						markers: false,
						id: `service-card-${i}`,
					},
				});
			});
		}, rootRef);
		return () => ctx.revert();
	}, [rootRef, count]);
}

// Signature corner-cut arrow — same motif as ServicesGrid cards.
function CornerArrow() {
	return (
		<>
			<div className="pointer-events-none absolute bottom-0 right-0 z-10 h-13.75 w-13.75 rounded-tl-[30px] bg-white">
				<div className="absolute bottom-0 -left-10 z-50 h-10 w-10 rounded-br-2xl bg-transparent shadow-[10px_10px_0_0_#FFFFFF]" />
				<div className="absolute right-0 -top-10 z-50 h-10 w-10 rounded-br-2xl bg-transparent shadow-[10px_10px_0_0_#FFFFFF]" />
			</div>
			<span className="absolute bottom-1.25 right-1 z-20 grid h-10 w-10 place-items-center rounded-full bg-(--color-primary) text-white transition-transform duration-300 lg:group-hover:-rotate-45">
				<Arrow size={16} />
			</span>
		</>
	);
}

function ServiceCard({ service, subs, index }) {
	const num = String(index + 1).padStart(2, "0");
	const dark = index % 2 === 0;

	return (
		<article
			className={`services-long-card group sticky overflow-hidden rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl ${
				dark ? "bg-(--color-primary)" : "bg-[#a9ceff]"
			}`}
			style={{
				top: `${96 + index * 24}px`,
			}}
		>
			{/* card backdrop — same cloth-waves image as FooterCTAnew,
			    dimmed under a theme wash so text stays readable */}
			<div className="pointer-events-none absolute inset-0" aria-hidden="true">
				<img
					src={asset("/bgClotheWaves.png")}
					alt=""
					loading="lazy"
					decoding="async"
					className={`h-full w-full scale-105 object-cover ${dark ? "opacity-50" : "opacity-60"}`}
				/>
				<div
					className={`absolute inset-0 ${
						dark
							? "bg-linear-to-br from-(--color-primary)/80 via-(--color-primary)/60 to-(--color-dark-blue)/70"
							: "bg-linear-to-br from-[#a9ceff]/55 via-[#a9ceff]/40 to-white/25"
					}`}
				/>
			</div>
			{/* full-card click target → main service page. Sub-service
			    pills and the corner arrow sit above it (z-2) so they
			    keep their own destinations. Keyboard users are served by
			    the visible title / pill / corner links, so this stays out
			    of the tab order. */}
			<Link
				to={`/services/${service.id}`}
				aria-hidden="true"
				tabIndex={-1}
				className="absolute inset-0 z-1"
			/>
			{/* interior decor — a single ghost numeral, nothing else */}
			<span
				className={`pointer-events-none absolute right-5 top-1 z-0 select-none font-heading text-[5rem] leading-none sm:right-8 sm:text-[7rem] ${
					dark ? "text-white/9" : "text-(--color-primary)/9"
				}`}
				aria-hidden="true"
			>
				{num}
			</span>
			<div className="relative flex min-h-90 flex-col justify-center p-6 pr-14 sm:min-h-100 sm:p-10 sm:pr-20 lg:min-h-107.5 lg:p-12 lg:pr-24">
				{/* meta row */}
				{/* <div className="flex items-center gap-3">
					<span
						className={`rounded-full px-3.5 py-1.5 font-heading text-[12px] tracking-[0.18em] ${
							dark ? "bg-white/15 text-white" : "bg-(--color-primary)/10 text-(--color-primary)"
						}`}
					>
						{num}
					</span>
					<span
						className={`h-px w-10 ${dark ? "bg-white/25" : "bg-(--color-primary)/25"}`}
						aria-hidden="true"
					/>
					<span
						className={`font-inter-reg text-[0.75rem] font-semibold tracking-[0.18em] ${
							dark ? "text-white/55" : "text-(--color-primary)/60"
						}`}
					>
						PRACTICE {num}
					</span>
				</div> */}
				<h3
					className={`mt-4 font-heading text-[1.9rem] leading-[1.1] tracking-tight sm:text-[2.4rem] lg:text-[2.9rem] ${
						dark ? "text-white" : "text-[#0C1F33]"
					}`}
				>
					<Link
						to={`/services/${service.id}`}
						className={`relative z-2 rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
							dark ? "focus-visible:outline-white" : "focus-visible:outline-(--color-primary)"
						}`}
					>
						{service.title}
					</Link>
				</h3>
				<p
					className={`mt-4 max-w-140 font-inter-light text-[1rem] leading-relaxed sm:text-[1.1rem] ${
						dark ? "text-white/75" : "text-[#0C1F33]/75"
					}`}
				>
					{service.desc}
				</p>
				{subs.length > 0 && (
					<div className="mt-6 flex max-w-160 flex-wrap gap-2.5">
						{subs.map((sub) => (
							<Link
								key={sub.id}
								to={`/services/${sub.id}`}
								className={`relative z-2 rounded-full px-4 py-2 font-inter-reg text-[13.5px] ring-1 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 ${
									dark
										? "bg-white/15 text-white ring-white/20 backdrop-blur-sm hover:bg-white hover:text-(--color-primary) hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] focus-visible:outline-white"
										: "bg-white/50 text-[#0b4da2] ring-(--color-primary)/15 hover:bg-(--color-primary) hover:text-white hover:shadow-[0_10px_25px_rgba(8,83,160,0.35)] focus-visible:outline-(--color-primary)"
								}`}
							>
								{sub.title}
							</Link>
						))}
					</div>
				)}
			</div>

			<Link
				to={`/services/${service.id}`}
				aria-label={`Explore ${service.title}`}
				className={`absolute bottom-0 right-0 z-2 block h-18 w-18 rounded-full focus-visible:outline-2 focus-visible:-outline-offset-2 ${
					dark ? "focus-visible:outline-white" : "focus-visible:outline-(--color-primary)"
				}`}
			>
				<CornerArrow />
			</Link>
		</article>
	);
}

export default function ServicesLong() {
	const rootRef = useRef(null);
	const deckRef = useRef(null);
	const barRef = useRef(null);
	const labelRef = useRef(null);
	useLineReveal(rootRef);
	const { services, getSubServices } = useServices();
	useStackOnScroll(rootRef, services.length);
	useDeckProgress(deckRef, barRef, labelRef, services.length);

	return (
		<section ref={rootRef} className="section relative mx-auto max-w-291.5">
			{/* backdrop graphics — same wash as ServicesGrid */}
			<div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 overflow-hidden" aria-hidden="true">
				<div className="absolute left-[8%] top-0 h-72 w-120 rounded-full bg-[#9cc7ff]/50 blur-[110px]" />
				<div className="absolute right-[4%] top-10 h-56 w-56 rounded-full bg-[#5495D8]/30 blur-[90px]" />
				<div
					className="absolute right-[2%] top-4 h-28 w-64 [mask-image:radial-gradient(closest-side,black,transparent)]"
					style={{
						backgroundImage: "radial-gradient(rgba(21,91,212,0.5) 1.5px, transparent 1.5px)",
						backgroundSize: "16px 16px",
					}}
				/>
			</div>

			{/* heading — commented out per request
			<div className="relative z-10 mb-10 flex flex-wrap items-end justify-between gap-4 px-5 md:mb-14 md:px-8 xl:px-0">
				<div>
					<p className="rv-fade font-inter-reg fs-body-sm text-(--color-primary)">
						Our Services
					</p>
					<h2 className="mt-2 font-heading text-[1.9rem] leading-[1.15] text-black sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
						<span className="block overflow-hidden pb-2">
							<span className="rv-line block">
								Financial Solutions For{" "}
								<span className="text-(--color-primary)">Every Stage</span>
							</span>
						</span>
					</h2>
				</div>
			</div>
			*/}

			{/* stacking deck */}
			{/* sticky position pill — orientation while scrolling the stack */}
			<div className="sticky top-19 z-30 mb-4 flex justify-end">
				{/* <div className="flex items-center gap-2.5 rounded-full bg-[#0C1F33]/85 py-1.5 pl-4 pr-3 text-white shadow-lg backdrop-blur-md">
					<span ref={labelRef} className="font-heading text-[12px] tracking-[0.14em]">
						01 / 04
					</span>
					<span className="h-1 w-16 overflow-hidden rounded-full bg-white/20">
						<span
							ref={barRef}
							className="block h-full w-full origin-left rounded-full bg-white"
							style={{ transform: "scaleX(0)" }}
						/>
					</span>
				</div> */}
			</div>
			{/* overflow-clip (not hidden) so the card tilt can't cause a
			    page-level horizontal scrollbar, while sticky keeps working */}
			<div ref={deckRef} className="relative z-10 flex flex-col gap-4.5 px-5 pb-0 pt-1 md:px-8 xl:px-0">
				{services.map((service, i) => (
					<ServiceCard
						key={service.id}
						service={service}
						subs={getSubServices(service.id)}
						index={i}
					/>
				))}
			</div>
		</section>
	);
}
