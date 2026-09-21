import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight as Arrow } from "lucide-react";
import { Wallet } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLineReveal } from "../lib/reveal.js";
import { services } from "../data/services.js";

gsap.registerPlugin(ScrollTrigger);

// Mobile/small (< lg) stacked-deck scroll: cards are position:sticky via CSS
// (.services-stack-card) and each covered card scales down slightly with scrub
// as the next card slides over it.
// Desktop (lg+): each card reveals its image (same look as hover) while it
// crosses the viewport, via the .is-revealed class (see index.css).
function useStackOnScroll(rootRef) {
	useLayoutEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const mm = gsap.matchMedia();
		mm.add("(min-width: 1024px)", () => {
			const grid = rootRef.current?.querySelector(".services-reveal-grid");
			const cards = gsap.utils.toArray(".services-stack-card", rootRef.current);
			ScrollTrigger.create({
				// markers: true,
				trigger: grid,
				start: "top 85%",
				end: "bottom 60%",
				scrub: 0.4,
				onUpdate: (self) => {
					// reveal strictly one by one, in grid order; reverses on scroll up
					const n = Math.floor(self.progress * cards.length);
					cards.forEach((card, i) => card.classList.toggle("is-revealed", i < n));
				},
			});
		});
		mm.add("(max-width: 1023.5px)", () => {
			const cards = gsap.utils.toArray(".services-stack-card", rootRef.current);
			const total = cards.length;
			cards.forEach((card, i) => {
				if (i === total - 1) return;
				gsap.to(card, {
					scale: 1 - (total - 1 - i) * 0.015,
					transformOrigin: "center top",
					ease: "none",
					scrollTrigger: {
						// markers: true,
						trigger: cards[i + 1],
						start: "top bottom",
						end: "top top+=160",
						scrub: true,
					},
				});
			});
		});
		return () => mm.revert();
	}, [rootRef]);
}

function ArrowRight() {
	return (
		<>
			<div className="pointer-events-none absolute bottom-0 right-0 z-10 h-[55px] w-[55px] rounded-tl-[30px] bg-white">
				<div className="absolute bottom-0 left-[-40px] z-50 h-[40px] w-[40px] rounded-br-[16px] bg-transparent shadow-[10px_10px_0_0_#FFFFFF]" />
				<div className="absolute right-0 top-[-40px] z-50 h-[40px] w-[40px] rounded-br-[16px] bg-transparent shadow-[10px_10px_0_0_#FFFFFF]" />
			</div>
			{/* Arrow overlapping the corner */}
			<span className="reveal-arrow absolute bottom-[5px] right-[4px] z-20 grid h-10 w-10 place-items-center rounded-full bg-[var(--color-primary)] text-[var(--color-white)] transition-transform duration-300 lg:group-hover:-rotate-45">
				<Arrow size={16} />
			</span>
		</>
	);
}

function Card({
	icon,
	title,
	desc,
	bg,
	hoverBg,
	titleClass,
	descClass,
	image,
	className = "",
	tall = false,
	style,
}) {
	return (
		<article
			style={style}
			className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-bl-[16px] rounded-tl-[16px] rounded-tr-[16px] transition-colors duration-500 lg:hover:bg-[var(--color-primary)] ${bg} ${className}`}
		>
			{/* Card image — always visible on mobile/small, hover/scroll-revealed on lg+ */}
			<div className="reveal-img absolute inset-0 opacity-100 blur-none transition-all duration-500 lg:opacity-5 lg:blur-2xl lg:group-hover:opacity-100 lg:group-hover:blur-none">
				<div className={`absolute inset-0 ${hoverBg}`} />
				{image && (
					<img
						src={image}
						alt=""
						aria-hidden="true"
						loading="lazy"
						decoding="async"
						onError={(e) => {
							e.currentTarget.style.display = "none";
						}}
						className="absolute inset-0 h-full w-full scale-100 object-cover transition-transform duration-700 lg:group-hover:scale-105"
					/>
				)}
				<div className="absolute inset-0 bg-linear-to-t from-[color-mix(in_oklab,var(--color-black)_70%,transparent)] via-[color-mix(in_oklab,var(--color-black)_25%,transparent)] to-transparent" />
				{/* Slight black overlay so white text stays readable on mobile/small */}
				<div className="absolute inset-0 bg-black/60 lg:hidden" aria-hidden="true" />
			</div>

			{/* Text — pinned 40px above the card bottom in every card */}
			<div className="relative z-10 flex h-full flex-1 flex-col justify-end pb-[40px] pl-[14px] pr-16 pt-7">
				{/* <span className={`${titleClass} mb-4 opacity-20 transition-colors duration-500 group-hover:text-[var(--color-white)] [&>svg]:h-10 [&>svg]:w-10`}>
          {icon}
        </span> */}
				<h3
					className={`card-title font-heading fs-body tracking-tight transition-colors duration-500 ${titleClass} group-hover:text-[var(--color-white)]`}
				>
					{title}
				</h3>
				<div className="card-desc-wrap grid grid-rows-[1fr] transition-all duration-500 lg:group-hover:grid-rows-[0fr]">
					<p
						className={`card-desc mt-2 min-h-0 max-w-[300px] overflow-hidden font-inter-light fs-body-sm transition-all duration-500 lg:group-hover:mt-0 lg:group-hover:opacity-0 ${descClass} ${tall ? "lg:max-w-[90%]" : ""}`}
					>
						{desc}
					</p>
				</div>
			</div>

			<ArrowRight size={16} />
		</article>
	);
}

const cards = services.map((service) => ({ ...service, icon: <Wallet size={16} /> }));

export default function ServicesGrid() {
	const rootRef = useRef(null);
	useLineReveal(rootRef);
	useStackOnScroll(rootRef);

	return (
		<section ref={rootRef} className="section relative mx-auto max-w-[1166px] ">
			{/* backdrop graphics behind the heading */}
			<div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[380px] overflow-hidden" aria-hidden="true">
				<div className="absolute left-[8%] top-0 h-72 w-[480px] rounded-full bg-[#9cc7ff]/50 blur-[110px]" />
				<div className="absolute right-[4%] top-10 h-56 w-56 rounded-full bg-[#5495D8]/30 blur-[90px]" />
				<div
					className="absolute right-[2%] top-4 h-28 w-64 [mask-image:radial-gradient(closest-side,black,transparent)]"
					style={{
						backgroundImage: 'radial-gradient(rgba(21,91,212,0.5) 1.5px, transparent 1.5px)',
						backgroundSize: '16px 16px',
					}}
				/>
			</div>
			{/* Section heading */}
			<div className="relative z-10 mb-10 flex flex-wrap items-end justify-between gap-4 px-5 md:mb-20 md:px-8 xl:px-0">
				<div>
					<p className="rv-fade font-inter-reg fs-body-sm text-[var(--color-primary)]">
						Our Services
					</p>
					<h2 className="mt-2 font-heading text-[1.9rem] leading-[1.15] text-[var(--color-black)] sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
						<span className="block overflow-hidden pb-2">
							<span className="rv-line block">
								Financial Solutions For{" "}
								<span className="text-[var(--color-primary)]">Every Stage</span>
							</span>
						</span>
					</h2>
				</div>
				{/* <Link
					to="/services"
					className="rv-fade font-inter-reg fs-body-sm text-[var(--color-black)] transition-colors hover:text-[var(--color-primary)] hover:underline hover:underline-offset-4"
				>
					View all services
				</Link> */}
			</div>

		<div className="services-reveal-grid relative z-10 grid grid-cols-1 items-stretch gap-[18px] px-5 md:px-8 lg:grid-cols-12 lg:auto-rows-[240px] xl:px-0">
			{cards.map((card, i) => (
				<Card
					key={card.title}
					icon={card.icon}
					title={card.title}
					desc={card.desc}
					bg={card.bg}
					hoverBg={card.hoverBg}
					titleClass={card.titleClass}
					descClass={card.descClass}
					tall={card.tall}
					image={card.image}
					style={{ "--stack-top": `${88 + i * 14}px` }}
					className={`${card.span} services-stack-card h-auto min-h-[220px] sm:min-h-[240px] lg:h-full lg:min-h-0`}
				/>
			))}
			</div>
		</section>
	);
}
