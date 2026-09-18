import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight as Arrow } from "lucide-react";
import { Wallet } from "lucide-react";
import { useLineReveal } from "../lib/reveal.js";
import { services } from "../data/services.js";

function ArrowRight() {
	return (
		<>
			<div className="pointer-events-none absolute bottom-0 right-0 z-10 h-[55px] w-[55px] rounded-tl-[30px] bg-white">
				<div className="absolute bottom-0 left-[-40px] z-50 h-[40px] w-[40px] rounded-br-[16px] bg-transparent shadow-[10px_10px_0_0_#FFFFFF]" />
				<div className="absolute right-0 top-[-40px] z-50 h-[40px] w-[40px] rounded-br-[16px] bg-transparent shadow-[10px_10px_0_0_#FFFFFF]" />
			</div>
			{/* Arrow overlapping the corner */}
			<span className="absolute bottom-[5px] right-[4px] z-20 grid h-10 w-10 place-items-center rounded-full bg-[var(--color-primary)] text-[var(--color-white)] transition-transform duration-300 group-hover:-rotate-45">
				<Arrow size={17} />
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
}) {
	return (
		<article
			className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-bl-[16px] rounded-tl-[16px] rounded-tr-[16px] transition-colors duration-500 hover:bg-[var(--color-primary)] ${bg} ${className}`}
		>
			{/* Hover image — fades in over the solid card color */}
			<div className="absolute inset-0 opacity-5 blur-2xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-none">
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
						className="absolute inset-0 h-full w-full scale-100 object-cover transition-transform duration-700 group-hover:scale-105"
					/>
				)}
				<div className="absolute inset-0 bg-linear-to-t from-[color-mix(in_oklab,var(--color-black)_70%,transparent)] via-[color-mix(in_oklab,var(--color-black)_25%,transparent)] to-transparent" />
			</div>

			{/* Text — pinned 40px above the card bottom in every card */}
			<div className="relative z-10 flex h-full flex-1 flex-col justify-end pb-[40px] pl-[14px] pr-16 pt-7">
				{/* <span className={`${titleClass} mb-4 opacity-20 transition-colors duration-500 group-hover:text-[var(--color-white)] [&>svg]:h-10 [&>svg]:w-10`}>
          {icon}
        </span> */}
				<h3
					className={`font-heading fs-body tracking-tight transition-colors duration-500 ${titleClass} group-hover:text-[var(--color-white)]`}
				>
					{title}
				</h3>
				<div className="grid grid-rows-[1fr] transition-all duration-500 group-hover:grid-rows-[0fr]">
					<p
						className={`mt-2 min-h-0 max-w-[300px] overflow-hidden font-inter-light fs-body-sm transition-all duration-500 group-hover:mt-0 group-hover:opacity-0 ${descClass} ${tall ? "lg:max-w-[90%]" : ""}`}
					>
						{desc}
					</p>
				</div>
			</div>

			<ArrowRight />
		</article>
	);
}

const cards = services.map((service) => ({ ...service, icon: <Wallet /> }));

export default function ServicesGrid() {
	const rootRef = useRef(null);
	useLineReveal(rootRef);

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
			<div className="relative z-10 mb-20 flex flex-wrap items-end justify-between gap-4 px-5 md:px-8 xl:px-0">
				<div>
					<p className="rv-fade font-inter-reg fs-body-sm text-[var(--color-primary)]">
						Our Services
					</p>
					<h2 className="mt-2 font-heading fs-heading text-[var(--color-black)]">
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

			<div className="relative z-10 grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[240px]">
				{cards.map((card) => (
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
						className={`${card.span} min-h-[210px] ${card.tall ? "min-h-[420px]" : ""}`}
					/>
				))}
			</div>
		</section>
	);
}
