import { Link } from "react-router-dom";

const exploreLinks = [
	{ label: "Services", to: "/services" },
	{ label: "About Us", to: "/about" },
	{ label: "Contact", to: "/contact" },
	// { label: 'Schedule Consultation', to: '/contact' },
	{ label: "Our Team", to: "/about" },
];

function SocialIcons() {
	const iconClass =
		"grid place-items-center rounded-full p-2 text-(--color-dark-blue) transition-all duration-300 hover:-translate-y-1 hover:bg-[#0C1F33]/10 hover:text-[#155bd4]";
	return (
		<div className="mt-5 flex items-center gap-4">
			<a
				href="https://x.com"
				target="_blank"
				rel="noreferrer"
				aria-label="X"
				className={iconClass}
			>
				<svg
					width="17"
					height="17"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23z" />
				</svg>
			</a>
			<a
				href="https://instagram.com"
				target="_blank"
				rel="noreferrer"
				aria-label="Instagram"
				className={iconClass}
			>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
				>
					<rect x="3" y="3" width="18" height="18" rx="5" />
					<circle cx="12" cy="12" r="4" />
					<circle
						cx="17.2"
						cy="6.8"
						r="1.2"
						fill="currentColor"
						stroke="none"
					/>
				</svg>
			</a>
			<a
				href="https://youtube.com"
				target="_blank"
				rel="noreferrer"
				aria-label="YouTube"
				className={iconClass}
			>
				<svg
					width="19"
					height="19"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.6 3.5 12 3.5 12 3.5s-4.6 0-7.7.4c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.6 1 1.9.2 7.5.4 7.5.4s4.6 0 7.7-.4c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8ZM9.8 15.1V8.4l6.2 3.4-6.2 3.3Z" />
				</svg>
			</a>
			<a
				href="https://linkedin.com"
				target="_blank"
				rel="noreferrer"
				aria-label="LinkedIn"
				className={iconClass}
			>
				<svg
					width="17"
					height="17"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
				</svg>
			</a>
		</div>
	);
}

export default function Footer() {
	return (
		<footer className="relative overflow-hidden bg-[#9cc7ff] h-[70dvh] flex flex-col justify-end">
			{/* backdrop graphics */}
			<div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0C1F33]/30 to-transparent" />
				<div className="absolute bottom-[-140px] left-1/2 h-[320px] w-[720px] -translate-x-1/2 rounded-[100%] bg-white/40 blur-[100px]" />
			</div>
			<div className="flex w-full max-w-[1166px] mx-auto gap-[18px]">
				<div className="w-3/5">
					<div className="flex gap-10">
						<Link
							to="/"
							className="inline-flex shrink-0 items-center rounded-[12px]"
						>
							<img
								src="/Logo.png"
								alt="Udyam Capital"
								className="h-[60px] w-auto object-contain"
							/>
						</Link>
						<SocialIcons />
					</div>
					<p className="mt-5 font-inter-light fs-body-sm leading-relaxed text-(--color-dark-blue)">
						Trusted strategic partner, committed to empowering
						businesses with tailored financial, operational, and
						technological solutions. We combine deep expertise with
						a forward-thinking approach to help you unlock growth,
						build resilience, and create lasting value.
					</p>
				</div>

				<div className="flex items-start gap-18 w-2/5 ">
					<div className="1/2 ml-auto">
						<h4 className="font-heading fs-body-sm text-(--color-dark-blue)">
							Explore
						</h4>
						<ul className="mt-4 space-y-2.5">
							{exploreLinks.map((link) => (
								<li key={link.label}>
									<Link
										to={link.to}
										className="inline-block font-inter-light fs-body-sm text-(--color-dark-blue) transition-all duration-300 hover:translate-x-1 hover:text-[#155bd4]"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="w-1/2">
						<h4 className="font-heading fs-body-sm text-(--color-dark-blue)">
							Contact
						</h4>
						<div className="mt-4 space-y-2.5 font-inter-light fs-body-sm text-(--color-dark-blue)">
							<a
								href="mailto:we.care@udyamcapital.com"
								className="block w-fit transition-all duration-300 hover:text-[#155bd4] hover:underline hover:underline-offset-4"
							>
								we.care@udyamcapital.com
							</a>
							<a
								href="mailto:info@udyamcapital.com"
								className="block w-fit transition-all duration-300 hover:text-[#155bd4] hover:underline hover:underline-offset-4"
							>
								info@udyamcapital.com
							</a>
							{/* <p className="pt-1 font-inter-reg text-[#144fd7]">Phone</p> */}
							<a
								href="tel: 01204445816"
								className="block w-fit transition-all duration-300 hover:text-[#155bd4] hover:underline hover:underline-offset-4"
							>
								Landline : 0120 444 5816
							</a>
							<a
								href="tel:+911234567890"
								className="block w-fit transition-all duration-300 hover:text-[#155bd4] hover:underline hover:underline-offset-4"
							>
								Mobile : +91 82875 98661
							</a>
						</div>
					</div>  
				</div>
			</div>

			{/* Giant watermark, cropped at the bottom */}
			<div className="mx-auto w-full max-w-[1166px] px-5 md:px-8 xl:px-0">
				<div
					aria-hidden="true"
					className="translate-y-[18%] select-none whitespace-nowrap font-heading text-[13dvw] text-center leading-[1] tracking-tight text-(--color-dark-blue)/15 "
				>
					UdyamCapital
				</div>
			</div>
		</footer>
	);
}
