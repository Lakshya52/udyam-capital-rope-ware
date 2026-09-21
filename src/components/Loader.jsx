import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const IMAGE_ASSETS = [
	"/Logo.png",
	"/NumberBg.png",
	"/IndiaMap.svg",
	"/RupeesWheel.svg",
	"/services/business-loans.jpg",
	"/services/debt-restructuring.jpg",
	"/services/corporate-finance.jpg",
	"/services/lap-property.jpg",
	"/services/working-capital.jpg",
	"/services/fund-raising.jpg",
	"/services/project-finance.jpg",
	"/services/msme-finance.jpg",
	"/services/financial-advisory.jpg",
];
const VIDEO_SRC = "/UCHeroFinal.mp4";
const MIN_DISPLAY_MS = 1400;
const HARD_CAP_MS = 10000;

function withTimeout(promise, ms, fallback) {
	return Promise.race([
		promise,
		new Promise((resolve) => setTimeout(() => resolve(fallback), ms)),
	]);
}

function loadImage(src) {
	return withTimeout(
		new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve(true);
			img.onerror = () => resolve(false);
			img.src = src;
		}),
		8000,
		false
	);
}

function loadVideo(src) {
	return withTimeout(
		new Promise((resolve) => {
			const vid = document.createElement("video");
			vid.muted = true;
			vid.preload = "auto";
			vid.oncanplaythrough = () => resolve(true);
			vid.onerror = () => resolve(false);
			vid.src = src;
			vid.load();
		}),
		8000,
		false
	);
}

function loadFonts() {
	return withTimeout(
		typeof document !== "undefined" && document.fonts
			? document.fonts.ready.then(() => true).catch(() => false)
			: Promise.resolve(true),
		5000,
		false
	);
}

export default function Loader({ onExitStart, onExited }) {
	const [progress, setProgress] = useState(0);
	const overlayRef = useRef(null);
	const contentRef = useRef(null);
	const exitStartedRef = useRef(false);
	const onExitStartRef = useRef(onExitStart);
	const onExitedRef = useRef(onExited);
	onExitStartRef.current = onExitStart;
	onExitedRef.current = onExited;

	useEffect(() => {
		let cancelled = false;
		const startedAt = Date.now();
		const total = IMAGE_ASSETS.length + 2; // images + video + fonts
		let settled = 0;

		// lock scroll while loading
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		if (window.__lenis) window.__lenis.stop();

		// ambient blob drift — removed (minimal loader)

		const bump = () => {
			if (cancelled) return;
			settled += 1;
			setProgress(Math.min(1, settled / total));
		};

		const finish = () => {
			if (cancelled || exitStartedRef.current) return;
			exitStartedRef.current = true;
			const elapsed = Date.now() - startedAt;
			const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
			setTimeout(() => {
				if (cancelled) return;
				setProgress(1);
				const tl = gsap.timeline({
					onComplete: () => {
						document.body.style.overflow = prevOverflow;
						if (window.__lenis) window.__lenis.start();
						onExitedRef.current && onExitedRef.current();
					},
				});
				tl.to(contentRef.current, {
					y: -30,
					opacity: 0,
					duration: 0.4,
					ease: "power2.in",
				}).to(
					overlayRef.current,
					{
						yPercent: -100,
						duration: 0.9,
						ease: "power4.inOut",
						onStart: () => {
							onExitStartRef.current && onExitStartRef.current();
						},
					},
					"-=0.1"
				);
			}, wait);
		};

		withTimeout(
			Promise.all([
				...IMAGE_ASSETS.map((src) => loadImage(src).then(bump)),
				loadVideo(VIDEO_SRC).then(bump),
				loadFonts().then(bump),
			]),
			HARD_CAP_MS,
			null
		).then(() => {
			if (!cancelled) {
				setProgress(1);
				finish();
			}
		});

		return () => {
			cancelled = true;
			document.body.style.overflow = prevOverflow;
			if (window.__lenis) window.__lenis.start();
		};
	}, []);

	const pct = Math.round(progress * 100);

	return (
		<div
			ref={overlayRef}
			className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-linear-to-b from-[#CFE0F6] via-[#E7EFFB] to-white"
			aria-hidden="true"
		>
			<div ref={contentRef} className="absolute bottom-8 left-6 md:bottom-12 md:left-12">
				<p className="font-heading text-7xl leading-none text-[#101828] md:text-8xl">
					{pct}
					<span className="text-3xl text-[#155bd4] md:text-4xl">%</span>
				</p>
			</div>
		</div>
	);
}
