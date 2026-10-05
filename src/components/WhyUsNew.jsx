import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Award, Lightbulb, Users, Heart, Leaf, ArrowUpRight } from "lucide-react";
import { useLineReveal } from "../lib/reveal.js";

// WhyUsNew — sticky intro on the left, clean feature cards on the right.
// Same values copy as before, presented as icon cards on white instead of
// the blue accordion.
const items = [
	{
		icon: Award,
		title: "Commitment",
		body: "Pursuing the highest quality standards in all our endeavours. Every proposal, every lender conversation, and every follow-up is held to the same bar — because your outcome depends on our discipline.",
	},
	{
		icon: Lightbulb,
		title: "Reimagine the Possible",
		body: "Seeking new and better ways to serve clients and keeping an open mind to the possibilities. When the standard structures don't fit, we design ones that do.",
	},
	{
		icon: Users,
		title: "Collaborative Growth",
		body: "Achieving shared success through teamwork and mutual support. We act as an extension of your leadership team — your goals become our milestones.",
	},
	{
		icon: Heart,
		title: "Respect",
		body: "Valuing every individual with dignity and fairness. Clients, lenders, and teammates alike — respect shapes every conversation we have.",
	},
	{
		icon: Leaf,
		title: "Sustainable",
		body: "Building a brighter tomorrow through integrity, purpose, and responsibility. We structure capital that businesses can actually sustain — growth that lasts.",
	},
];

function FeatureCard({ item, index }) {
	const Icon = item.icon;
	const num = String(index + 1).padStart(2, "0");

	return (
		<div className="whyusnew-card group flex gap-5 rounded-[16px] bg-white p-6 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(8,83,160,0.16)] hover:ring-(--color-primary)/25 sm:p-7">
			<div className="flex shrink-0 flex-col items-center gap-3">
				<span className="grid h-12 w-12 place-items-center rounded-[14px] bg-(--color-primary)/10 text-(--color-primary) transition-colors duration-500 group-hover:bg-(--color-primary) group-hover:text-white">
					<Icon size={22} />
				</span>
				<span className="font-heading text-[0.75rem] tracking-[0.18em] text-neutral-300 transition-colors duration-500 group-hover:text-(--color-primary)/60">
					{num}
				</span>
			</div>
			<div>
				<h3 className="font-heading text-[1.15rem] text-(--color-black) sm:text-[1.35rem]">
					{item.title}
				</h3>
				<p className="mt-2 font-inter-reg text-[0.95rem] leading-relaxed text-[#344054]">
					{item.body}
				</p>
			</div>
		</div>
	);
}

export default function WhyUsNew() {
	const rootRef = useRef(null);
	const { pathname } = useLocation();
	useLineReveal(rootRef);

	// NOTE: re-runs on pathname change, not just mount — param routes
	// like /services/:id and /articles/:slug reuse the same component
	// instance across navigations (no remount), so without this the
	// cards would stay revealed and never replay the animation.
	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;
		const cards = Array.from(root.querySelectorAll(".whyusnew-card"));
		if (
			window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
			!("IntersectionObserver" in window)
		) {
			return; // leave everything visible
		}
		cards.forEach((card, i) => {
			card.style.opacity = "0";
			card.style.transform = "translateY(48px)";
			card.style.transition = `opacity 0.7s ease ${Math.min(i * 60, 240)}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${Math.min(i * 60, 240)}ms`;
		});
		const reveal = (card) => {
			card.style.opacity = "1";
			card.style.transform = "none";
		};
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						reveal(entry.target);
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		cards.forEach((card) => io.observe(card));
		// Fallback: plain scroll-position check, in case the observer
		// misbehaves in some layout — any card past 90% viewport reveals.
		let ticking = false;
		const check = () => {
			ticking = false;
			const line = window.innerHeight * 0.9;
			cards.forEach((card) => {
				if (
					card.style.opacity !== "1" &&
					card.getBoundingClientRect().top < line
				) {
					reveal(card);
					io.unobserve(card);
				}
			});
		};
		const onScroll = () => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(check);
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		check(); // cards already in view on mount
		return () => {
			io.disconnect();
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [pathname]);

	return (
		<section ref={rootRef} className="section relative mx-auto grid w-full max-w-[1166px] grid-cols-1 items-start gap-8 px-5 sm:gap-10 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-14 xl:px-0">
			{/* backdrop graphics */}
			<div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
				<div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#9cc7ff]/40 blur-[110px]" />
				<div
					className="absolute left-[4%] top-8 h-32 w-56 [mask-image:radial-gradient(closest-side,black,transparent)]"
					style={{
						backgroundImage: "radial-gradient(rgba(21,91,212,0.45) 1.5px, transparent 1.5px)",
						backgroundSize: "16px 16px",
					}}
				/>
			</div>

			{/* left — sticky intro */}
			<div className="relative z-10 lg:sticky lg:top-28">
				<p className="rv-fade font-inter-reg fs-body-sm text-(--color-primary)">
					Why Us
				</p>
				<h2 className="mt-2 font-heading text-[1.9rem] leading-[1.15] text-(--color-black) sm:text-[2.6rem] lg:text-[3.2rem] lg:leading-[114%]">
					<span className="block overflow-hidden pb-2">
						<span className="rv-line block">
							Where Business Ambition Meets the{" "}
							<span className="text-(--color-primary)">Right Capital</span>
						</span>
					</span>
				</h2>
				<p className="rv-fade font-inter-light mt-4 max-w-lg text-[1rem] leading-relaxed sm:mt-5 sm:text-[1.125rem]">
					Helping businesses turn financial requirements into the
					right capital solutions for sustainable growth.
				</p>
				<Link
					to="/about"
					className="rv-fade group mt-6 inline-flex items-center gap-1.5 font-heading text-[14px] text-(--color-primary) transition-colors hover:text-[#0b4da2]"
				>
					Meet the team behind it
					<ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
				</Link>
			</div>

			{/* right — feature cards */}
			<div className="whyusnew-list relative z-10 flex flex-col gap-4">
				{items.map((item, i) => (
					<FeatureCard key={item.title} item={item} index={i} />
				))}
			</div>
		</section>
	);
}
