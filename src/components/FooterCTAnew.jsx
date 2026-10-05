import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { useLineReveal } from "../lib/reveal.js";
import { asset } from "../lib/content.jsx";

// FooterCTAnew — bold conversion panel. Deep primary blue with the
// cloth-waves backdrop, white headline, a white Consultation pill plus a
// ghost call pill, and a decorative ring-arrow motif on desktop.
export default function FooterCTAnew() {
	const rootRef = useRef(null);
	useLineReveal(rootRef);

	return (
		<section ref={rootRef} className="section mx-auto w-full max-w-[1166px] px-5 md:px-8 xl:px-0">
			<div className="relative overflow-hidden rounded-[20px] bg-(--color-primary)">
				{/* backdrop — waves photo dimmed for white-text contrast */}
				<div className="pointer-events-none absolute inset-0" aria-hidden="true">
					<img
						src={asset("/bgClotheWaves.png")}
						alt=""
						loading="lazy"
						decoding="async"
						className="h-full w-full scale-105 object-cover opacity-50"
					/>
					<div className="absolute inset-0 bg-linear-to-r from-(--color-primary)/85 via-(--color-primary)/60 to-(--color-dark-blue)/70" />
				</div>

				{/* decorative rings + arrow, desktop only — rings dip when the arrow is pressed */}
				<div className="group pointer-events-none absolute -right-20 top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden="true">
					<div className="relative grid h-[320px] w-[320px] place-items-center rounded-full border border-white/15 transition-transform duration-300 ease-out group-hover:scale-[1.05] group-active:scale-[0.94] pulse-breathe">
						<div className="grid h-[220px] w-[220px] place-items-center rounded-full border border-white/15 transition-transform duration-300 ease-out group-hover:scale-[1.08] group-active:scale-[0.92] pulse-breathe [animation-delay:160ms]">
							<Link to="/contact" aria-label="Go to contact page" className="pointer-events-auto relative z-[2] cursor-pointer grid h-20 w-20 place-items-center rounded-full bg-white text-(--color-primary) shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-90 pulse-breathe [animation-delay:320ms]">
								<ArrowUpRight size={32} />
							</Link>
						</div>
					</div>
				</div>

				<div className="relative z-10 max-w-[800px] p-8 sm:p-12 lg:p-14">
					<p className="rv-fade font-inter-reg fs-body-sm text-white/70">
						Let's talk
					</p>
					<h2 className="mt-2 font-heading text-[1.9rem] leading-[1.12] text-white sm:text-[2.6rem] lg:text-[3.2rem] lg:leading-[114%]">
						<span className="block overflow-hidden pb-1">
							<span className="rv-line block">Ready To Start Your</span>
						</span>
						<span className="block overflow-hidden pb-2">
							<span className="rv-line block">Growth Journey With Us?</span>
						</span>
					</h2>
					<p className="rv-fade mt-3 font-inter-reg text-[1rem] leading-relaxed text-white sm:text-[1.125rem]">
						We map the capital route for your business journey — honest options, real
						lender comparisons, and guidance till the money hits
						your account.
					</p>
					<div className="rv-fade mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
						{/* <Link
							to="/contact"
							className="group inline-flex items-center gap-2 rounded-full bg-white py-2.5 pl-6 pr-2.5 font-heading text-[14px] text-(--color-primary) shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-[#EAF1FC] active:scale-[0.98]"
						>
							Schedule a Consultation
							<span className="grid h-7 w-7 place-items-center rounded-full bg-(--color-primary) text-white transition-transform duration-300 group-hover:-rotate-45">
								<ArrowRight size={15} />
							</span>
						</Link> */}
						<a
							href="tel:+918287598661"
							className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-heading text-[14px] text-white ring-1 ring-white/30 transition-all duration-300 hover:bg-white/10 hover:ring-white/60 active:scale-[0.98]"
						>
							<Phone size={15} />
							+91 82875 98661
						</a>
					</div>
					<p className="rv-fade mt-5 font-inter-reg text-[0.8rem] tracking-wide text-white/55">
						15+ PSU banks · 50+ lending partners · closures in ~20 working days
					</p>
				</div>
			</div>
		</section>
	);
}
