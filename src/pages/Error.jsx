import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLineReveal } from "../lib/reveal.js";

export default function Error() {
	const rootRef = useRef(null);
	useLineReveal(rootRef);

	return (
		<main ref={rootRef} className="relative overflow-hidden bg-white">
			{/* backdrop graphics */}
			<div
				className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px] overflow-hidden"
				aria-hidden="true"
			>
				<div className="absolute left-[6%] top-0 h-72 w-[480px] rounded-full bg-[#9cc7ff]/50 blur-[110px]" />
				<div className="absolute right-[4%] top-10 h-56 w-56 rounded-full bg-[#5495D8]/30 blur-[90px]" />
			</div>

			<section className="relative z-10 mx-auto flex w-full max-w-[1166px] flex-col items-center px-5 pb-[10dvh] pt-32 text-center md:px-8 lg:pt-48 xl:px-0">
				<p className="rv-fade font-heading text-[5rem] leading-none text-(color-mix(in_oklab,var(--color-primary)_20%,transparent)) sm:text-[8rem]">
					404
				</p>
				<h1 className="mt-2 font-heading text-[1.9rem] leading-[1.15] text-(--color-black) sm:text-[2.6rem]">
					<span className="block overflow-hidden pb-2">
						<span className="rv-line block">
							This page went{" "}
							<span className="text-(--color-primary)">
								off the books
							</span>
						</span>
					</span>
				</h1>
				<p className="rv-fade mt-4 max-w-md font-inter-reg fs-body text-neutral-500">
					The link you followed doesn&apos;t exist or was moved.
					Let&apos;s get you back on track.
				</p>
				<div className="rv-fade mt-8 flex flex-wrap items-center justify-center gap-3">
					<Link
						to="/"
						className="group inline-flex items-center gap-2 rounded-lg bg-(--color-primary) px-7 py-3 font-inter-reg text-[0.95rem] text-white shadow-[0_16px_40px_rgba(8,83,160,0.3)] transition-all duration-300 hover:gap-3 active:scale-[0.98]"
					>
						<ArrowLeft
							size={16}
							className="transition-transform duration-300 group-hover:-translate-x-0.5"
						/>
						Back to home
					</Link>
					<Link
						to="/contact"
						className="group inline-flex items-center gap-2 rounded-lg border border-black/10 px-7 py-3 font-inter-reg text-[0.95rem] text-(--color-black) transition-all duration-300 hover:gap-3 hover:border-(--color-primary) hover:text-(--color-primary) active:scale-[0.98]"
					>
						Talk to us
						<ArrowRight
							size={16}
							className="transition-transform duration-300 group-hover:translate-x-0.5"
						/>
					</Link>
				</div>
			</section>
		</main>
	);
}
