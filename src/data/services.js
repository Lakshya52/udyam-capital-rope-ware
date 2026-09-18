// Single source of truth for the 9 services — shared by the
// home-page grid and the /services pages. Slugs match the navbar links.
export const services = [
	{
		id: "business-loans",
		title: "Business Loans",
		desc: "Funding structured around your business and growth plans.",
		span: "lg:col-span-3",
		image: "/services/business-loans.jpg",
		bg: "bg-[var(--color-primary)]",
		hoverBg:
			"bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-dark-blue)] to-[var(--color-black)]",
		titleClass: "text-[var(--color-white)]",
		descClass:
			"text-[color-mix(in_oklab,var(--color-white)_55%,transparent)]",
	},
	{
		id: "debt-restructuring",
		title: "Debt Restructuring",
		desc: "Reshape your debt to improve flexibility and financial stability.",
		span: "lg:col-span-3 lg:row-span-2",
		tall: true,
		image: "/services/debt-restructuring.jpg",
		bg: "bg-[var(--color-primary)]",
		hoverBg:
			"bg-gradient-to-br from-[var(--blue-sky)] via-[var(--color-primary)] to-[var(--color-primary)]",
		titleClass: "text-[var(--color-white)]",
		descClass:
			"text-[color-mix(in_oklab,var(--color-white)_55%,transparent)]",
	},
	{
		id: "corporate-finance",
		title: "Corporate Finance",
		desc: "Advisory across debt, refinancing, and expansion.",
		span: "lg:col-span-3",
		image: "/services/corporate-finance.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-gradient-to-br from-[var(--blue-light)] via-[var(--blue-sky)] to-[var(--color-primary)]",
		titleClass: "text-[var(--color-black)]",
		descClass:
			"text-[color-mix(in_oklab,var(--color-black)_55%,transparent)]",
	},
	{
		id: "lap",
		title: "LAP",
		desc: "Leverage eligible property for required business funding.",
		span: "lg:col-span-3",
		image: "/services/lap-property.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-gradient-to-br from-[var(--color-primary-dull)] via-[var(--blue-sky)] to-[var(--color-primary)]",
		titleClass: "text-[var(--color-black)]",
		descClass:
			"text-[color-mix(in_oklab,var(--color-black)_55%,transparent)]",
	},
	{
		id: "working-capital",
		title: "Working Capital",
		desc: "Flexible funding for day-to-day operations and growth.",
		span: "lg:col-span-3",
		image: "/services/working-capital.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-gradient-to-br from-[var(--blue-light)] via-[var(--blue-sky)] to-[var(--color-primary)]",
		titleClass: "text-[var(--color-black)]",
		descClass:
			"text-[color-mix(in_oklab,var(--color-black)_55%,transparent)]",
	},
	{
		id: "fund-raising",
		title: "Fund Raising",
		desc: "Structure the right financing mix for your next stage of growth.",
		span: "lg:col-span-6",
		image: "/services/fund-raising.jpg",
		bg: "bg-[var(--color-primary)]",
		hoverBg:
			"bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-dark-blue)] to-[var(--color-black)]",
		titleClass: "text-[var(--color-white)]",
		descClass:
			"text-[color-mix(in_oklab,var(--color-white)_55%,transparent)]",
	},
	{
		id: "project-finance",
		title: "Project Finance",
		desc: "Finance for new projects, expansion, and capacity growth.",
		span: "lg:col-span-4",
		image: "/services/project-finance.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-gradient-to-br from-[var(--color-primary-dull)] via-[var(--blue-sky)] to-[var(--color-primary)]",
		titleClass: "text-[var(--color-black)]",
		descClass:
			"text-[color-mix(in_oklab,var(--color-black)_55%,transparent)]",
	},
	{
		id: "msme-finance",
		title: "MSME Finance",
		desc: "Funding solutions designed for the realities of growing businesses.",
		span: "lg:col-span-4",
		image: "/services/msme-finance.jpg",
		bg: "bg-[var(--color-primary)]",
		hoverBg:
			"bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-dark-blue)] to-[var(--color-black)]",
		titleClass: "text-[var(--color-white)]",
		descClass:
			"text-[color-mix(in_oklab,var(--color-white)_55%,transparent)]",
	},
	{
		id: "financial-advisory",
		title: "Financial Advisory",
		desc: "Financial guidance from capital planning to lender conversations.",
		span: "lg:col-span-4",
		image: "/services/financial-advisory.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-gradient-to-br from-[var(--blue-light)] via-[var(--blue-sky)] to-[var(--color-black)]",
		titleClass: "text-[var(--color-black)]",
		descClass:
			"text-[color-mix(in_oklab,var(--color-black)_55%,transparent)]",
	},
];

export function getService(id) {
	return services.find((service) => service.id === id);
}
