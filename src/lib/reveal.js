import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Hero-style entrance, scroll-triggered: masked `.rv-line` rise +
// `.rv-fade` lift. Plays once when the section scrolls into view.
export function useLineReveal(rootRef, start = "top 85%") {
	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			gsap
				.timeline({
					defaults: { ease: "power3.out" },
					scrollTrigger: { trigger: rootRef.current, start, toggleActions: "play none none reverse" },
				})
				.from(".rv-line", { yPercent: 110, duration: 0.9, stagger: 0.12 })
				.from(
					".rv-fade",
					{ y: 24, opacity: 0, duration: 0.7, stagger: 0.1 },
					"-=0.5"
				);
		}, rootRef);
		return () => ctx.revert();
	}, [rootRef, start]);
}
