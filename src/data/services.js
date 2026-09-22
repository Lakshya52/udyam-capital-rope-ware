// Single source of truth for the 4 main practices — shared by the
// home-page grid and the /services pages. Slugs match the navbar links.
// The 9 previous services live on as sub-services nested under a parent.
export const services = [
	{
		id: "transaction-advisory",
		title: "Transaction Advisory",
		desc: "Deal structuring, due diligence and closure — from first term sheet to final payout.",
		span: "lg:col-span-7",
		image: "/services/corporate-finance.jpg",
		bg: "bg-(--color-primary)",
		hoverBg:
			"bg-linear-to-br from-(--color-primary) via-(--color-dark-blue) to-(--color-black)",
		titleClass: "text-(--color-white)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-white)_55%,transparent))",
		children: ["corporate-finance", "fund-raising", "debt-restructuring"],
	},
	{
		id: "credit-ratings-advisory",
		title: "Credit Ratings Advisory",
		desc: "Build a rating that borrows cheaper — assessment, roadmap and lender-ready packaging.",
		span: "lg:col-span-5",
		image: "/services/business-loans.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-linear-to-br from-(--blue-light) via-(--blue-sky) to-(--color-primary)",
		titleClass: "text-(--color-black)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-black)_55%,transparent))",
		children: ["credit-rating-advisory", "rating-enhancement", "credit-profile-advisory"],
	},
	{
		id: "cfo-services",
		title: "CFO Services",
		desc: "A senior finance function without the full-time cost — planning, controls and lender conversations.",
		span: "lg:col-span-5",
		image: "/services/financial-advisory.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-linear-to-br from-(--color-primary-dull) via-(--blue-sky) to-(--color-primary)",
		titleClass: "text-(--color-black)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-black)_55%,transparent))",
		children: ["fpa", "mis-reporting", "cash-flow-management"],
	},
	{
		id: "debt-capital-advisory",
		title: "Debt & Capital Advisory",
		desc: "Term loans, working capital, LAP, project finance and syndications — structured and closed end to end.",
		span: "lg:col-span-7",
		image: "/services/fund-raising.jpg",
		bg: "bg-(--color-primary)",
		hoverBg:
			"bg-linear-to-br from-(--color-primary) via-(--color-dark-blue) to-(--color-black)",
		titleClass: "text-(--color-white)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-white)_55%,transparent))",
		children: ["business-loans", "working-capital", "lap", "project-finance", "debt-syndication"],
	},
];

// Sub-services — the previous 9 offerings, each nested under one parent
// practice. They keep their own detail pages at /services/:id.
export const subServices = [
	{
		id: "business-loans",
		title: "Business Loans",
		desc: "Funding structured around your business and growth plans.",
		parent: "debt-capital-advisory",
		span: "lg:col-span-3",
		image: "/services/business-loans.jpg",
		bg: "bg-(--color-primary)",
		hoverBg:
			"bg-linear-to-br from-(--color-primary) via-(--color-dark-blue) to-(--color-black)",
		titleClass: "text-(--color-white)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-white)_55%,transparent))",
	},
	{
		id: "debt-restructuring",
		title: "Debt Restructuring",
		desc: "Reshape your debt to improve flexibility and financial stability.",
		parent: "transaction-advisory",
		span: "lg:col-span-3 lg:row-span-2",
		tall: true,
		image: "/services/debt-restructuring.jpg",
		bg: "bg-(--color-primary)",
		hoverBg:
			"bg-linear-to-br from-(--blue-sky) via-(--color-primary) to-(--color-primary)",
		titleClass: "text-(--color-white)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-white)_55%,transparent))",
	},
	{
		id: "corporate-finance",
		title: "Corporate Finance",
		desc: "Advisory across debt, refinancing, and expansion.",
		parent: "transaction-advisory",
		span: "lg:col-span-3",
		image: "/services/corporate-finance.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-linear-to-br from-(--blue-light) via-(--blue-sky) to-(--color-primary)",
		titleClass: "text-(--color-black)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-black)_55%,transparent))",
	},
	{
		id: "lap",
		title: "LAP",
		desc: "Leverage eligible property for required business funding.",
		parent: "debt-capital-advisory",
		span: "lg:col-span-3",
		image: "/services/lap-property.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-linear-to-br from-(--color-primary-dull) via-(--blue-sky) to-(--color-primary)",
		titleClass: "text-(--color-black)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-black)_55%,transparent))",
	},
	{
		id: "working-capital",
		title: "Working Capital",
		desc: "Flexible funding for day-to-day operations and growth.",
		parent: "debt-capital-advisory",
		span: "lg:col-span-3",
		image: "/services/working-capital.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-linear-to-br from-(--blue-light) via-(--blue-sky) to-(--color-primary)",
		titleClass: "text-(--color-black)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-black)_55%,transparent))",
	},
	{
		id: "fund-raising",
		title: "Fund Raising",
		desc: "Structure the right financing mix for your next stage of growth.",
		parent: "transaction-advisory",
		span: "lg:col-span-6",
		image: "/services/fund-raising.jpg",
		bg: "bg-(--color-primary)",
		hoverBg:
			"bg-linear-to-br from-(--color-primary) via-(--color-dark-blue) to-(--color-black)",
		titleClass: "text-(--color-white)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-white)_55%,transparent))",
	},
	{
		id: "project-finance",
		title: "Project Finance",
		desc: "Finance for new projects, expansion, and capacity growth.",
		parent: "debt-capital-advisory",
		span: "lg:col-span-4",
		image: "/services/project-finance.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-linear-to-br from-(--color-primary-dull) via-(--blue-sky) to-(--color-primary)",
		titleClass: "text-(--color-black)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-black)_55%,transparent))",
	},
	{
		id: "credit-rating-advisory",
		title: "Credit Rating Advisory",
		desc: "An independent read of your credit profile — where you stand and what lenders see.",
		parent: "credit-ratings-advisory",
		span: "lg:col-span-3",
		image: "/services/working-capital.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-linear-to-br from-(--blue-light) via-(--blue-sky) to-(--color-primary)",
		titleClass: "text-(--color-black)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-black)_55%,transparent))",
	},
	{
		id: "rating-enhancement",
		title: "Rating Enhancement",
		desc: "Sequenced fixes that lift your score — leverage, conduct and documentation.",
		parent: "credit-ratings-advisory",
		span: "lg:col-span-3",
		image: "/services/debt-restructuring.jpg",
		bg: "bg-(--color-primary)",
		hoverBg:
			"bg-linear-to-br from-(--color-primary) via-(--color-dark-blue) to-(--color-black)",
		titleClass: "text-(--color-white)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-white)_55%,transparent))",
	},
	{
		id: "credit-profile-advisory",
		title: "Credit Profile Advisory",
		desc: "Ongoing counsel that keeps every borrowing rating-positive.",
		parent: "credit-ratings-advisory",
		span: "lg:col-span-3",
		image: "/services/business-loans.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-linear-to-br from-(--blue-light) via-(--blue-sky) to-(--color-primary)",
		titleClass: "text-(--color-black)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-black)_55%,transparent))",
	},
	{
		id: "fpa",
		title: "Financial Planning & Analysis",
		desc: "Budgets, forecasts and variance analysis that turn numbers into decisions.",
		parent: "cfo-services",
		span: "lg:col-span-3",
		image: "/services/financial-advisory.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-linear-to-br from-(--blue-light) via-(--blue-sky) to-(--color-black)",
		titleClass: "text-(--color-black)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-black)_55%,transparent))",
	},
	{
		id: "mis-reporting",
		title: "MIS & Reporting",
		desc: "Board-ready monthly packs — P&L, cash and KPIs you can act on.",
		parent: "cfo-services",
		span: "lg:col-span-3",
		image: "/services/msme-finance.jpg",
		bg: "bg-(--color-primary)",
		hoverBg:
			"bg-linear-to-br from-(--color-primary) via-(--color-dark-blue) to-(--color-black)",
		titleClass: "text-(--color-white)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-white)_55%,transparent))",
	},
	{
		id: "cash-flow-management",
		title: "Cash Flow Management",
		desc: "13-week visibility and controls so cash never surprises you.",
		parent: "cfo-services",
		span: "lg:col-span-3",
		image: "/services/working-capital.jpg",
		bg: "bg-[#9cc7ff]",
		hoverBg:
			"bg-linear-to-br from-(--blue-light) via-(--blue-sky) to-(--color-primary)",
		titleClass: "text-(--color-black)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-black)_55%,transparent))",
	},
	{
		id: "debt-syndication",
		title: "Debt Syndication",
		desc: "Multi-lender funding mapped, negotiated and syndicated to closure.",
		parent: "debt-capital-advisory",
		span: "lg:col-span-3",
		image: "/services/fund-raising.jpg",
		bg: "bg-(--color-primary)",
		hoverBg:
			"bg-linear-to-br from-(--color-primary) via-(--color-dark-blue) to-(--color-black)",
		titleClass: "text-(--color-white)",
		descClass:
			"text-(color-mix(in_oklab,var(--color-white)_55%,transparent))",
	},
];

export function getService(id) {
	return (
		services.find((service) => service.id === id) ??
		subServices.find((service) => service.id === id)
	);
}

export function isMainService(id) {
	return services.some((service) => service.id === id);
}

export function getSubServices(parentId) {
	const parent = services.find((service) => service.id === parentId);
	if (!parent?.children) return [];
	return parent.children
		.map((childId) => subServices.find((s) => s.id === childId))
		.filter(Boolean);
}

export function getParentService(childId) {
	const child = subServices.find((service) => service.id === childId);
	if (!child?.parent) return undefined;
	return services.find((service) => service.id === child.parent);
}

// ─── Detail content (edit freely — marketing copy, review before publishing)
export const serviceDetails = {
	"business-loans": {
		audience: "SMEs and growing companies that need timely, right-sized funding.",
		intro:
			"Business loans are funds borrowed specifically for business purposes — expansion, equipment, inventory, or working capital. They are repaid with interest over an agreed tenure, and can be secured against assets or unsecured, depending on the borrower's profile and requirement size. For most growing companies, a well-structured business loan is the fastest way to convert opportunity into capacity: stock the order, buy the machine, or hire ahead of demand without waiting years to save up. The key is matching the loan's size, tenure, and repayment rhythm to how your business actually earns — which is exactly where our structuring work begins.",
		points: [
			"Funding sized to your turnover and cash flows",
			"Term loans and working capital structures",
			"Repayments aligned to your business cycle",
			"Documentation and lender coordination handled",
		],
		story: {
			heading: "Why the structure matters as much as the sanction",
			paras: [
				"Two businesses can borrow the same amount and end up in completely different places. The difference is rarely the interest rate alone — it is tenure matched to asset life, moratorium aligned to cash ramp-up, and security kept proportionate instead of pledged wholesale.",
				"Lenders are risk managers to be satisfied, not adversaries to convince. A file that anticipates their questions moves faster and prices better.",
			],
		},
		documents: [
			"KYC documents of promoters and the business",
			"Last 3 years' financial statements",
			"12-month bank statements",
			"GST returns and tax filings",
			"Details of existing loans and repayments",
			"Business proof (Udyam / shop license)",
		],
		benefits: [
			{
				title: "Right-sized funding",
				desc: "Loan amounts matched to your turnover and repayment capacity — never more than you need, never less than growth demands.",
			},
			{
				title: "Flexible structures",
				desc: "Term loans for assets, working capital lines for cycles — or a blend of both inside one banking relationship.",
			},
			{
				title: "Faster decisions",
				desc: "We package your case completely before approaching lenders, cutting the usual back-and-forth to a minimum.",
			},
			{
				title: "Transparent terms",
				desc: "Every charge on the table upfront — processing, prepayment, and penal clauses explained before you sign anything.",
			},
		],
		process: [
			{
				title: "Share your books",
				desc: "Financials, bank statements, and the requirement — a 30-minute conversation is enough to start.",
			},
			{
				title: "Compare real options",
				desc: "We approach suitable lenders and lay competing offers side by side for you to choose from.",
			},
			{
				title: "Complete documentation",
				desc: "One checklist and one coordinator — we chase the paperwork, not you.",
			},
			{
				title: "Sanction and disbursal",
				desc: "We track your file through credit approval till the money reaches your account.",
			},
		],
		faqs: [
			{
				q: "How much can I borrow?",
				a: "It depends on turnover, profitability, and existing obligations — lenders generally size loans as a multiple of your cash flows. Share your financials and we will estimate your eligible range before you apply.",
			},
			{
				q: "Secured or unsecured — which is right for me?",
				a: "Unsecured suits smaller, shorter needs with faster processing. Secured unlocks larger amounts, longer tenures, and better pricing. We recommend based on your requirement, not the lender's preference.",
			},
			{
				q: "How long does the process take?",
				a: "A complete, well-packaged file typically moves from application to disbursal in 2–6 weeks, depending on the lender and complexity.",
			},
			{
				q: "Can I top up an existing business loan?",
				a: "Usually yes — through enhancement of the current limit or a parallel facility, subject to repayment track record and current cash flows.",
			},
			{
				q: "What hurts approval chances most?",
				a: "Over-leveraging, cheque bounces, and inconsistent banking conduct. Six months of clean banking before applying matters enormously.",
			},
		],
	},
	"debt-restructuring": {
		audience: "Businesses whose repayments no longer match their cash generation.",
		intro:
			"Debt restructuring means modifying the terms of existing borrowings — tenure, EMI, interest, or moratorium — so repayments fit what the business actually earns. It is used when cash flows and loan schedules fall out of sync, and done early it can prevent stress from becoming default. Businesses usually reach this point for honest reasons: an expansion that took longer to pay back, a slow season that never recovered, or several short-tenure loans stacking EMIs beyond monthly surplus. Restructuring is not an admission of failure — it is a financial reset that gives a viable business the repayment schedule it should have had in the first place.",
		points: [
			"EMI realignment to affordable levels",
			"Consolidation of multiple facilities",
			"Moratorium and tenure structuring",
			"Negotiation support with lenders",
		],
		story: {
			heading: "Timing is everything in a reset",
			paras: [
				"The single biggest predictor of a successful restructuring is how early it starts. A business approaching lenders with a plan — before the first default — negotiates from credibility. The same request after months of missed payments becomes a recovery discussion with far fewer options.",
				"What lenders need is viability, not apologies: honest numbers and a believable forward plan turn a difficult conversation into a commercial one.",
			],
		},
		documents: [
			"Sanction letters of all existing loans",
			"12-month statements of every facility",
			"Last 3 years' financial statements",
			"Cash-flow projections for 2 years",
			"KYC documents of promoters and the business",
			"Details of securities already pledged",
		],
		benefits: [
			{
				title: "Breathing room, fast",
				desc: "EMIs brought back in line with actual monthly cash generation — so operations stop bleeding to service debt.",
			},
			{
				title: "One EMI instead of many",
				desc: "Scattered facilities consolidated into a single, trackable repayment with one lender relationship.",
			},
			{
				title: "Credit standing protected",
				desc: "A structured reset done early does far less damage than missed payments and recovery action later.",
			},
			{
				title: "Someone in your corner",
				desc: "We prepare the proposal, present the viability case, and negotiate with lenders on your behalf.",
			},
		],
		process: [
			{
				title: "Diagnose the gap",
				desc: "We map every facility against your cash flows to find exactly where the structure breaks.",
			},
			{
				title: "Design the reset",
				desc: "Tenure extension, consolidation, moratorium — modeled to a repayment you can actually meet.",
			},
			{
				title: "Negotiate with lenders",
				desc: "A viability-backed proposal presented professionally, with follow-through till approval.",
			},
			{
				title: "Stay on track",
				desc: "Post-restructure monitoring so the new schedule holds through seasonal ups and downs.",
			},
		],
		faqs: [
			{
				q: "Will restructuring hurt my credit score?",
				a: "Any restructuring is recorded, but a negotiated, performing reset damages your standing far less than defaults or recovery proceedings — and on-time payments afterwards rebuild it.",
			},
			{
				q: "Who qualifies for restructuring?",
				a: "Viable businesses facing genuine cash-flow mismatches — not unviable ones. If the underlying business earns, lenders generally prefer a reset to recovery.",
			},
			{
				q: "How long does it take?",
				a: "From diagnosis to approval, most mandates close in 6–12 weeks depending on the number of lenders involved.",
			},
			{
				q: "Can stressed or NPA accounts be restructured?",
				a: "Once classified NPA, options narrow — but negotiated settlements and revival packages remain possible. Earlier is always better; reach out at the first missed payment, not the last.",
			},
			{
				q: "Will my existing lender even agree?",
				a: "Lenders generally prefer a viable reset to lengthy recovery. A well-presented viability case and honest engagement carry real weight in those conversations.",
			},
		],
	},
	"corporate-finance": {
		audience: "Mid-sized companies planning growth, refinancing, or expansion.",
		intro:
			"Corporate finance covers how a company funds itself and grows — raising debt, refinancing existing facilities, and planning capital allocation. Good corporate finance keeps the cost of capital low while leaving room to move when opportunities appear. As companies cross from small to mid-sized, borrowing gets more complex: multiple facilities, varying rates, security structures, and covenants that interact in ways no single loan officer will explain. Our role is to stand on your side of that table — organizing the full picture, then negotiating each piece from a position of preparation rather than urgency.",
		points: [
			"Refinancing and balance-sheet advisory",
			"Expansion funding structures",
			"Capital strategy and planning",
			"Investor- and lender-ready documentation",
		],
		story: {
			heading: "Capital strategy is a habit, not an event",
			paras: [
				"Most companies think about capital only when they need it — which is precisely when negotiating power is lowest. Businesses that review their facilities annually refinance before rates bite, retire expensive debt on schedule, and keep dry powder for opportunities.",
				"Each well-negotiated facility improves the ratios and track record that price the next one — the gap compounds over the years.",
			],
		},
		documents: [
			"Last 3 years' financial statements + projections",
			"Details of all existing facilities and rates",
			"12-month bank statements",
			"Board resolution for the borrowing",
			"KYC documents of promoters and the business",
			"Business profile and growth plan",
		],
		benefits: [
			{
				title: "Lower cost of capital",
				desc: "Existing debt repriced and restructured so you stop overpaying for money you already borrowed.",
			},
			{
				title: "Growth runway",
				desc: "Expansion funded without starving operations — growth capital separated from working capital.",
			},
			{
				title: "Healthier balance sheet",
				desc: "Tenures, security cover, and leverage ratios organized so the next raise is easier than the last.",
			},
			{
				title: "Investor readiness",
				desc: "Financials, projections, and narrative packaged the way serious capital expects to see them.",
			},
		],
		process: [
			{
				title: "Financial diagnosis",
				desc: "We study your books, facilities, and plans to find where capital is helping — and where it is hurting.",
			},
			{
				title: "Capital strategy",
				desc: "A clear funding map: what to refinance, what to raise fresh, and in which order.",
			},
			{
				title: "Documentation",
				desc: "Models, projections, and lender decks built to withstand credit-committee scrutiny.",
			},
			{
				title: "Closure",
				desc: "Negotiation and coordination till sanction, disbursal, and beyond.",
			},
		],
		faqs: [
			{
				q: "How is this different from just taking a loan?",
				a: "A loan solves one need. Corporate finance looks at your entire capital structure — what to keep, refinance, or raise — so each borrowing makes the next one cheaper and easier.",
			},
			{
				q: "My books aren't perfect. Can you still help?",
				a: "Yes — most growing businesses have messy books. Part of our work is presenting your case honestly but in its strongest accurate light.",
			},
			{
				q: "How do engagements work?",
				a: "Every engagement starts with a discovery conversation. Scope and commercials are agreed in writing before any work begins.",
			},
			{
				q: "We already have a CA — why an advisor?",
				a: "CAs ensure compliance and accounting accuracy; capital strategy and lender negotiation is a different craft. The two roles complement, not replace, each other.",
			},
			{
				q: "Do you work with early-stage startups?",
				a: "Startups with operating cash flows, yes. Pre-revenue ventures usually need an equity-first path — which we will point you toward honestly.",
			},
		],
	},
	lap: {
		audience: "Property owners who need large-ticket funds without selling.",
		intro:
			"A Loan Against Property (LAP) lets owners borrow against residential or commercial property while continuing to use it. Because the loan is secured, amounts are larger and tenures longer than unsecured borrowing — commonly used for expansion, consolidation, or major spending. For many business owners, property is their largest asset and also their most idle one: LAP converts that locked value into working or growth capital without selling. The outcomes hinge on three things — honest valuation, clean title, and a tenure that keeps EMIs comfortable — and we manage all three before any application goes in.",
		points: [
			"Residential and commercial property accepted",
			"Longer tenures for comfortable EMIs",
			"Balance transfer options from existing loans",
			"Transparent valuation process",
		],
		story: {
			heading: "Your property is already working — put it to work",
			paras: [
				"Indian business owners hold enormous wealth in property that earns nothing while the business starves for capital. LAP simply corrects that mismatch: the same asset continues to house or host the business while also backing its growth.",
				"Title issues surface late and kill files. Front-loading title checks is the difference between a 3-week and a 3-month process.",
			],
		},
		documents: [
			"Complete property paper chain (sale deeds, title)",
			"Approved building plan and occupancy proof",
			"Latest property tax receipts",
			"Income proof and 12-month bank statements",
			"KYC documents of all owners",
			"Existing loan details (for balance transfer)",
		],
		benefits: [
			{
				title: "Big tickets, low stress",
				desc: "Property-backed lending unlocks far larger amounts than unsecured loans — at meaningfully lower rates.",
			},
			{
				title: "Keep using your property",
				desc: "You continue living in or operating from the property. Only the papers move, not you.",
			},
			{
				title: "Tenures that breathe",
				desc: "Long repayment horizons keep EMIs comfortable even on large sanctions.",
			},
			{
				title: "Clean balance transfers",
				desc: "Already have a LAP elsewhere? We benchmark and move it if the math favors you.",
			},
		],
		process: [
			{
				title: "Property valuation",
				desc: "Independent valuation establishes the eligible loan range for your property.",
			},
			{
				title: "Eligibility check",
				desc: "Income, obligations, and title clarity assessed upfront — no wasted applications.",
			},
			{
				title: "Legal and technical",
				desc: "Title verification and technical evaluation coordinated end to end.",
			},
			{
				title: "Sanction and disbursal",
				desc: "Registration, documentation, and disbursal tracked till credit.",
			},
		],
		faqs: [
			{
				q: "Which properties qualify?",
				a: "Self-occupied and rented residential property, offices, shops, and plots in approved areas. Clear title is essential — disputed or agricultural land generally doesn't qualify.",
			},
			{
				q: "How much of the property value can I get?",
				a: "Lenders typically fund 50–70% of market value depending on property type and your income profile. Valuation decides the final number.",
			},
			{
				q: "Can I prepay without penalty?",
				a: "Most lenders allow part-prepayment; foreclosure norms vary between fixed and floating rates. We flag the exact clauses before you sign.",
			},
			{
				q: "Can I get LAP on a property with an existing home loan?",
				a: "Yes — through a balance-transfer top-up or a second charge, subject to margins and repayment capacity.",
			},
			{
				q: "Residential or commercial — which is better?",
				a: "Both work. Commercial property typically allows higher loan-to-value; residential is valued more conservatively but processes smoothly.",
			},
		],
	},
	"working-capital": {
		audience: "Businesses with gaps between payables and receivables.",
		intro:
			"Working capital is the short-term money that keeps daily operations running — salaries, inventory, supplier payments — while you wait on customer receipts. Working capital finance bridges that timing gap through cash credit, overdrafts, or receivables-backed limits. Almost every growing business hits the same paradox: more orders can mean less cash in hand, as stock and receivables swell faster than collections. The fix is rarely 'borrow more' — it is borrowing in the right form, sized to your operating cycle, with room to flex in peak months. That sizing exercise is the heart of what we do here.",
		points: [
			"Cash credit, overdraft, and demand-loan structures",
			"Receivables-backed limits",
			"Seasonal enhancements for peak cycles",
			"Vendor-payment support lines",
		],
		story: {
			heading: "Measure the cycle, master the business",
			paras: [
				"Ask most promoters their working capital gap and you'll hear a round number that is really a feeling. The truth lives in three counts: how many days stock sits, how many days customers take, and how many days suppliers give. Subtract the third from the first two and you have your cycle — and your real requirement.",
				"Businesses that measure their cycle monthly spot trouble quarters early — and borrow exactly what the cycle demands.",
			],
		},
		documents: [
			"Stock statements and receivables ageing",
			"Last 2 years' financial statements",
			"12-month bank statements (all operating accounts)",
			"GST returns and tax filings",
			"KYC documents of promoters and the business",
			"Details of existing working capital limits",
		],
		benefits: [
			{
				title: "Operations never stall",
				desc: "Payroll, suppliers, and inventory funded on time, every cycle — growth stops waiting on collections.",
			},
			{
				title: "Limits that flex",
				desc: "Seasonal top-ups and ad-hoc enhancements for peak months, festival rushes, and large orders.",
			},
			{
				title: "Receivables put to work",
				desc: "Unpaid invoices become borrowing base instead of dead weight on your balance sheet.",
			},
			{
				title: "Supplier confidence",
				desc: "Pay on time, negotiate better terms, and capture early-payment discounts worth real margin.",
			},
		],
		process: [
			{
				title: "Cycle study",
				desc: "We map your operating cycle — inventory days, receivable days, payable days — to size the real gap.",
			},
			{
				title: "Limit structuring",
				desc: "Fund-based and non-fund-based limits designed around how your money actually moves.",
			},
			{
				title: "Documentation",
				desc: "Stock statements, receivables ageing, and financials packaged the way banks want them.",
			},
			{
				title: "Review and renewal",
				desc: "Annual reviews and enhancements handled proactively — limits grow as you grow.",
			},
		],
		faqs: [
			{
				q: "Cash credit vs overdraft — what's the difference?",
				a: "Cash credit is typically secured against stock and receivables with drawing power reviewed periodically; overdrafts are usually cleaner, shorter facilities. The right pick depends on your cycle length and collateral.",
			},
			{
				q: "How is my limit calculated?",
				a: "Lenders apply methods like maximum permissible bank finance on your projected turnover and operating cycle. We estimate it upfront so there are no surprises.",
			},
			{
				q: "What happens at annual renewal?",
				a: "Limits are reviewed yearly against fresh financials and stock audits. Clean operations and documentation make renewals — and enhancements — straightforward.",
			},
			{
				q: "My sales are growing but cash is always short — why?",
				a: "Growth consumes working capital: stock and receivables swell faster than collections refill them. It is the classic growing-business paradox, and fixable with right-sized limits.",
			},
			{
				q: "Can limits be increased later?",
				a: "Yes — annual reviews and interim enhancements track your turnover growth. We initiate them before you feel the squeeze.",
			},
		],
	},
	"fund-raising": {
		audience: "Promoters raising growth or project capital.",
		intro:
			"Fund raising is the process of securing external capital — debt or structured instruments — to power the next stage of a business. Successful raises rest on three things: clean financials, convincing documentation, and a structure lenders believe in. Most promoters underestimate the middle one: lenders see hundreds of files, and the ones that close are those that answer every credit question before it is asked. Our work is making your case that file — requirement sized honestly, end-use mapped clearly, and risks addressed head-on rather than hidden.",
		points: [
			"Debt and structured financing options",
			"Investor-ready documentation and narrative",
			"Milestone-linked disbursement structures",
			"Negotiation support till closure",
		],
		story: {
			heading: "Preparation is the real fundraising",
			paras: [
				"By the time a promoter meets a lender, experienced advisors believe the outcome is 80% decided — by the quality of the file, not the charm of the meeting. Clean books, coherent projections, and documented end-use do the persuading before anyone speaks.",
				"One application to one lender is a request; the same case presented to four lenders in parallel is a negotiation.",
			],
		},
		documents: [
			"Business plan with fund requirement and end-use",
			"Last 3 years' financial statements + projections",
			"12-month bank statements",
			"Details of existing debt and obligations",
			"KYC documents of promoters and the business",
			"Valuation or project reports (if available)",
		],
		benefits: [
			{
				title: "The right mix, not just money",
				desc: "Debt, structured, phased — the combination that funds growth without mortgaging your future flexibility.",
			},
			{
				title: "A story lenders buy",
				desc: "Financials plus narrative: why this business, why this amount, why now — answered before it's asked.",
			},
			{
				title: "Disbursement with discipline",
				desc: "Milestone-linked releases keep end-use clean and lenders comfortable through the journey.",
			},
			{
				title: "Negotiation muscle",
				desc: "Rate, tenure, covenants, security — every term negotiated, not just accepted.",
			},
		],
		process: [
			{
				title: "Assess the need",
				desc: "Requirement sizing, end-use mapping, and a realistic view of what the market will fund.",
			},
			{
				title: "Package the case",
				desc: "Information memorandum, projections, and documentation built for credit committees.",
			},
			{
				title: "Approach the market",
				desc: "Suitable lenders approached in parallel — competition improves your terms.",
			},
			{
				title: "Close the raise",
				desc: "Negotiation, sanction, documentation, and disbursal — managed till the end.",
			},
		],
		faqs: [
			{
				q: "Debt or equity — which should I raise?",
				a: "Debt suits predictable cash flows and keeps ownership intact; equity suits high-risk, high-growth bets. Most growing businesses we serve raise debt first — it's cheaper and non-dilutive.",
			},
			{
				q: "How long does a raise take?",
				a: "Straightforward debt raises close in 6–10 weeks from a complete file; larger structured mandates can take a quarter or more.",
			},
			{
				q: "What documents will I need?",
				a: "Financials, bank statements, GST returns, existing loan details, KYC, and a business plan or projections. Our documents checklist covers it exhaustively.",
			},
			{
				q: "How much dilution should I expect?",
				a: "For debt-led raises: zero. The structures here prioritize non-dilutive capital so promoters keep control while funding growth.",
			},
			{
				q: "What if lenders have already rejected us?",
				a: "Rejections usually signal packaging problems, not profile problems. We diagnose the objection — documents, structure, or lender fit — and re-approach correctly.",
			},
		],
	},
	"project-finance": {
		audience: "New and expanding industrial and infrastructure projects.",
		intro:
			"Project finance funds a specific venture — a plant, unit, or facility — largely against the cash flows that project will generate. Disbursement happens in phases against construction milestones, with repayments beginning after commissioning. Unlike a general business loan, everything here revolves around one question: will this project, on its own, earn enough to repay what it borrows? Lenders answer it with DSCR models, sensitivity checks, and security structures — and promoters who walk in with those answers ready close faster and borrow cheaper. Preparing that viability case is where our engagement typically starts.",
		points: [
			"Cash-flow-based project sizing",
			"Phased disbursement against milestones",
			"Moratorium aligned to commissioning",
			"Security and documentation support",
		],
		story: {
			heading: "Viability on paper before concrete on ground",
			paras: [
				"The most expensive words in project finance are 'we'll figure out the funding as we build.' Stalled half-built structures across industrial estates testify to raises attempted backwards — construction first, financing later.",
				"Prove demand, lock costs, secure contribution — then break ground. Lenders fund discipline as much as they fund projects.",
			],
		},
		documents: [
			"Detailed project report (DPR) with cost break-up",
			"Quotations for plant, machinery, and civil work",
			"Land papers and project approvals/licenses",
			"Promoter KYC and net-worth statements",
			"Means-of-finance plan with contribution proof",
			"Existing business financials (for brownfield)",
		],
		benefits: [
			{
				title: "Sized on the project's future",
				desc: "Loan quantum derived from projected cash flows and DSCR — not just your existing balance sheet.",
			},
			{
				title: "Money follows milestones",
				desc: "Phased releases against certified construction progress keep end-use clean and costs controlled.",
			},
			{
				title: "Breathe till commissioning",
				desc: "Moratorium structured so repayments begin when revenue does — not before.",
			},
			{
				title: "Risk ring-fenced",
				desc: "Security and recourse structured around the project, protecting the rest of your business.",
			},
		],
		process: [
			{
				title: "Viability assessment",
				desc: "Project cost, means of finance, and cash-flow projections stress-tested before any application.",
			},
			{
				title: "Structuring",
				desc: "Debt-equity mix, tenure, moratorium, and security package designed as one coherent proposal.",
			},
			{
				title: "Approvals and sanction",
				desc: "Techno-economic diligence and credit approval coordinated with lenders and consultants.",
			},
			{
				title: "Phased disbursal",
				desc: "Milestone certifications, disbursement tracking, and progress reporting till commissioning.",
			},
		],
		faqs: [
			{
				q: "How much must promoters contribute?",
				a: "Lenders typically expect 25–40% promoter contribution depending on sector and risk. Lower contribution needs stronger cash flows or additional security.",
			},
			{
				q: "What is DSCR and why does it matter?",
				a: "Debt Service Coverage Ratio measures how comfortably project cash flows cover repayments. Lenders usually look for 1.25x and above — we model and defend yours.",
			},
			{
				q: "How long do project loans take to close?",
				a: "Greenfield mandates typically take 3–6 months including diligence. Brownfield expansions with existing cash flows move faster.",
			},
			{
				q: "Do I need land and title cleared first?",
				a: "Largely yes — clear title and basic approvals are preconditions most lenders insist on before appraising the project.",
			},
			{
				q: "Can existing businesses use project finance?",
				a: "Yes — expansion projects with ring-fenced cash flows qualify even from established companies, often on better terms than greenfield ones.",
			},
		],
	},
	"transaction-advisory": {
		audience: "Promoters planning a fundraise, acquisition, sale, merger or restructuring.",
		intro:
			"Transaction advisory is the end-to-end handling of a financial transaction — sizing the requirement, structuring the deal, preparing lender-grade documentation, and negotiating till closure. Whether you are raising growth capital, acquiring a unit, bringing in a partner, or resetting stressed debt, the outcome is decided long before the signing: by the quality of preparation. We run that preparation — financial models, due diligence readiness, term-sheet negotiation and disbursal tracking — so you transact from strength, not urgency.",
		story: {
			heading: "Deals close on preparation, not persuasion",
			paras: [
				"Lenders and counterparties see hundreds of proposals. The ones that close are those that answer every credit question before it is asked — clean books, coherent projections, documented end-use and risks addressed head-on rather than hidden.",
				"One application to one lender is a request; the same case presented to four suitable lenders in parallel is a negotiation. We create that competition for every mandate.",
			],
		},
		documents: [
			"Last 3 years' financial statements + projections",
			"12-month bank statements of operating accounts",
			"Details of existing debt, rates and securities",
			"Business plan with fund requirement and end-use",
			"KYC documents of promoters and the business",
			"Valuation, project or due-diligence reports (if available)",
		],
		benefits: [
			{
				title: "Structured for leverage",
				desc: "Debt, tenure, moratorium and security designed as one coherent proposal — so every term is negotiated, not accepted.",
			},
			{
				title: "Diligence-ready files",
				desc: "Models, projections and documentation built to survive credit-committee scrutiny the first time.",
			},
			{
				title: "Competitive tension",
				desc: "Suitable lenders approached in parallel, so competing offers improve your pricing and covenants.",
			},
			{
				title: "Managed till payout",
				desc: "Negotiation, sanction documentation and phased disbursal tracked till money reaches your account.",
			},
		],
		process: [
			{
				title: "Assess the need",
				desc: "Requirement sizing, end-use mapping and a realistic view of what the market will fund.",
			},
			{
				title: "Package the case",
				desc: "Information memorandum, projections and documentation built for decision-makers.",
			},
			{
				title: "Approach the market",
				desc: "Suitable lenders and counterparties approached in parallel with a consistent narrative.",
			},
			{
				title: "Close the deal",
				desc: "Term negotiation, documentation and disbursal — managed till the end.",
			},
		],
		faqs: [
			{
				q: "What kinds of transactions do you handle?",
				a: "Growth fundraisers, acquisitions, partner inductions, refinancing and debt resets — any transaction where capital changes hands and terms matter.",
			},
			{
				q: "How long does a transaction take?",
				a: "Straightforward raises close in 6–10 weeks from a complete file; acquisitions and structured mandates can take a quarter or more.",
			},
			{
				q: "My books aren't perfect. Can you still help?",
				a: "Yes — most growing businesses have messy books. Part of our work is presenting your case honestly but in its strongest accurate light.",
			},
			{
				q: "Do you guarantee closure?",
				a: "No honest advisor can. What we guarantee is thorough preparation, correct counterparty fit and persistent execution.",
			},
		],
	},
	"credit-ratings-advisory": {
		audience: "Businesses that want cheaper borrowing through a stronger credit profile.",
		intro:
			"Credit ratings advisory improves how lenders and rating agencies see your business — so the same cash flows borrow larger amounts at lower rates. A strong rating is not luck: it comes from disciplined borrowing conduct, right-sized facilities, clean repayment track records and financials presented the way credit committees evaluate them. We assess where your profile stands today, fix what drags the score down, and package every future application so it strengthens rather than strains your standing.",
		story: {
			heading: "Your rating is a price tag on your debt",
			paras: [
				"A single notch of rating improvement can move pricing by meaningful basis points across every facility you hold — compounding year after year. Yet most businesses discover their rating only when a lender quotes against it.",
				"Six months of clean banking conduct before an application matters enormously. Ratings are built in the quarters before you borrow, not during the application.",
			],
		},
		documents: [
			"Last 3 years' financial statements",
			"12-month bank statements of all operating accounts",
			"Details of all existing facilities, limits and utilisation",
			"Repayment track record and overdue history, if any",
			"GST returns and tax filings",
			"KYC documents of promoters and the business",
		],
		benefits: [
			{
				title: "Know your standing",
				desc: "A clear read of your current profile — what helps the score, what hurts it, and by how much.",
			},
			{
				title: "A repair roadmap",
				desc: "Sequenced fixes: over-leverage correction, utilisation discipline, overdue closure and conduct clean-up.",
			},
			{
				title: "Borrowing that builds",
				desc: "Future facilities structured so repayments and utilisation strengthen the profile quarter after quarter.",
			},
			{
				title: "Lender-ready packaging",
				desc: "Applications presented with the ratios, projections and narrative that rating desks reward.",
			},
		],
		process: [
			{
				title: "Profile diagnosis",
				desc: "Facilities, utilisation, repayments and financials mapped against what ratings actually measure.",
			},
			{
				title: "Improvement plan",
				desc: "A prioritised roadmap — quick wins first, structural fixes sequenced behind them.",
			},
			{
				title: "Disciplined execution",
				desc: "Restructured facilities and right-sized new borrowing, coordinated with lenders.",
			},
			{
				title: "Monitor and sustain",
				desc: "Periodic reviews so the score keeps climbing instead of slipping back.",
			},
		],
		faqs: [
			{
				q: "How fast can my rating improve?",
				a: "Conduct-led improvement typically shows within 2–4 quarters of disciplined execution. Structural issues like over-leverage take longer but move the needle most.",
			},
			{
				q: "Will past overdues permanently hurt me?",
				a: "No — their weight fades as clean recent conduct accumulates. A structured reset done early does far less damage than prolonged defaults.",
			},
			{
				q: "Does this replace the rating agency?",
				a: "No. Agencies assess independently; we make sure what they see is your strongest accurate picture — and fix what genuinely needs fixing first.",
			},
			{
				q: "Is this only for large companies?",
				a: "No — SMEs gain the most, since their borrowing costs are most sensitive to profile quality and lender confidence.",
			},
		],
	},
	"cfo-services": {
		audience: "Growing businesses that need senior finance leadership without a full-time CFO.",
		intro:
			"CFO Services give you an experienced finance function on tap — capital planning, cash-flow control, lender relationships, compliance calendars and board-ready reporting. Most growing businesses outgrow their accountant long before they can justify a full-time CFO, and that gap is where expensive mistakes happen: mispriced debt, unmanaged working capital, missed renewals. We fill it with structured monthly finance leadership that keeps your money working as hard as you do.",
		story: {
			heading: "Every growing business needs a CFO before it can afford one",
			paras: [
				"The costliest finance errors are sins of omission — the refinancing never reviewed, the limit never enhanced, the covenant signed without reading. A standing finance function catches them as routine.",
				"Businesses that review facilities annually refinance before rates bite and keep dry powder for opportunities. Capital strategy is a habit, not an event.",
			],
		},
		documents: [
			"Last 2 years' financial statements",
			"12-month bank statements of operating accounts",
			"Summary of existing facilities, rates and renewals due",
			"Stock statements and receivables ageing (if applicable)",
			"GST returns and tax filings",
			"Udyam registration (for MSME-linked benefits)",
		],
		benefits: [
			{
				title: "Planning that predicts",
				desc: "Budgets and rolling forecasts reviewed monthly — variances explained, actions agreed.",
			},
			{
				title: "Reporting you can act on",
				desc: "A monthly pack of P&L, cash and KPIs in plain view — twenty minutes to the truth.",
			},
			{
				title: "Cash under control",
				desc: "13-week visibility, collection rhythms and buffers so cash never surprises you.",
			},
			{
				title: "Lender-ready always",
				desc: "Projections, packs and conduct maintained so every borrowing conversation starts strong.",
			},
		],
		process: [
			{
				title: "Finance health-check",
				desc: "Books, facilities, cycles and compliances assessed to find where money leaks.",
			},
			{
				title: "Operating cadence",
				desc: "Monthly reviews, reporting formats and compliance calendars put in place.",
			},
			{
				title: "Fix and fund",
				desc: "Gaps closed — refinanced, right-sized or newly funded — in priority order.",
			},
			{
				title: "Steady state",
				desc: "Ongoing leadership with quarterly strategy reviews as the business scales.",
			},
		],
		faqs: [
			{
				q: "How is this different from my accountant or CA?",
				a: "CAs ensure compliance and accounting accuracy; we provide forward-looking finance leadership — planning, lender strategy and cash decisions. The roles complement each other.",
			},
			{
				q: "How much time do you spend with us?",
				a: "Engagements are scoped to your size — typically a few structured days a month plus availability for decisions as they arise.",
			},
			{
				q: "Is this worth it for a small business?",
				a: "If the requirement is simple, going direct may be fine — we will tell you honestly in the discovery conversation itself.",
			},
			{
				q: "Can you help with Udyam registration and schemes?",
				a: "Yes — registration, guarantee-backed programs and subsidy matching are part of the standard scope for eligible businesses.",
			},
		],
	},
	"debt-capital-advisory": {
		audience: "Promoters funding operations, expansion, property-backed needs or multi-lender requirements.",
		intro:
			"Debt & Capital Advisory secures the actual money — term loans, working-capital limits, property-backed funding, project finance and syndicated facilities, from first assessment to final disbursal. Different needs need different instruments: a plant needs phased project finance, a peak season needs flexible working capital, and a large requirement needs several lenders acting together. We map the right instrument to each need, prepare lender-grade files, and negotiate across banks and NBFCs till every facility credits.",
		story: {
			heading: "Right instrument, right lender, right terms",
			paras: [
				"Most businesses borrow whatever their existing bank offers — and overpay for years. Term debt for long assets, working lines for cycles, LAP for large low-rate tickets, syndication when one lender isn't enough: matching instrument to end-use is where the savings hide.",
				"One application to one lender is a request; the same case presented to several lenders in parallel is a negotiation. We create that competition for every mandate.",
			],
		},
		documents: [
			"Last 3 years' financial statements + projections",
			"12-month bank statements of operating accounts",
			"Details of existing facilities, rates and securities",
			"GST returns and tax filings",
			"Property papers / project reports (for LAP and project finance)",
			"KYC documents of promoters and the business",
		],
		benefits: [
			{
				title: "Every instrument, one desk",
				desc: "Business loans, working capital, LAP, project finance and syndications — structured as one coherent borrowing program.",
			},
			{
				title: "Syndicated when it matters",
				desc: "Large requirements split across suitable lenders with coordinated documentation and a single negotiation view.",
			},
			{
				title: "Priced by competition",
				desc: "Parallel lender approaches mean competing offers — on rate, tenure, moratorium and security.",
			},
			{
				title: "Tracked till credit",
				desc: "Sanction conditions, documentation and phased releases followed through till money reaches your account.",
			},
		],
		process: [
			{
				title: "Requirement mapping",
				desc: "Each need sized and matched to its right instrument — amount, tenure and end-use.",
			},
			{
				title: "File preparation",
				desc: "Financials, projections, asset papers and lender decks built for credit committees.",
			},
			{
				title: "Lender approaches",
				desc: "Suitable banks and NBFCs approached in parallel; offers compared side by side.",
			},
			{
				title: "Sanction to disbursal",
				desc: "Negotiation, documentation and release tracking till every facility credits.",
			},
		],
		faqs: [
			{
				q: "When do I need syndication instead of a single loan?",
				a: "When one lender's appetite, limit or pricing doesn't cover the requirement cleanly — typically larger tickets, where splitting across two or three lenders improves terms and spreads risk.",
			},
			{
				q: "How long does funding take?",
				a: "Working-capital and term loans typically close in 2–6 weeks from a complete file; LAP depends on title clarity; projects take 3–6 months including diligence.",
			},
			{
				q: "Can you take over my existing expensive loans?",
				a: "Yes — balance transfers and refinancing are a standard starting point. We benchmark your current pricing before recommending a move.",
			},
			{
				q: "Which properties qualify for LAP?",
				a: "Self-occupied and rented residential property, offices, shops and plots in approved areas. Clear title is essential.",
			},
		],
	},
	"credit-rating-advisory": {
		audience: "Businesses that want to know exactly where their credit profile stands.",
		intro:
			"Credit Rating Advisory is the diagnostic starting point: a structured assessment of your financials, borrowing conduct, utilisation and repayment history through the lens lenders and rating agencies use. You get a clear read of your current standing, the factors helping or hurting it, and a prioritised action plan. No jargon, no generic advice — a factual baseline every future borrowing decision can build on.",
		story: {
			heading: "You can't improve what you haven't measured",
			paras: [
				"Most promoters discover their credit standing only when a lender quotes against it — at the worst possible moment to fix anything. An independent assessment beforehand turns surprises into a plan.",
				"Ratings move on evidence: leverage ratios, utilisation discipline, repayment consistency and financial quality. Each is measurable, and each has a fix.",
			],
		},
		documents: [
			"Last 3 years' financial statements",
			"12-month bank statements of operating accounts",
			"Details of all existing facilities and limits",
			"Repayment track record and overdue history, if any",
			"GST returns and tax filings",
			"KYC documents of promoters and the business",
		],
		benefits: [
			{
				title: "A factual baseline",
				desc: "Your profile scored the way credit desks score it — strengths, weaknesses and their relative weight.",
			},
			{
				title: "Prioritised action plan",
				desc: "Fixes sequenced by impact and effort, so the first steps move the needle fastest.",
			},
			{
				title: "Lender-language clarity",
				desc: "Ratios and benchmarks explained in plain terms — useful in every future lender conversation.",
			},
			{
				title: "A decision tool",
				desc: "Know before you borrow whether to apply now, repair first, or restructure — and why.",
			},
		],
		process: [
			{
				title: "Data gathering",
				desc: "Financials, facilities, utilisation and repayment history collected in one structured pass.",
			},
			{
				title: "Profile scoring",
				desc: "Each rating factor assessed and weighted the way agencies and lenders assess it.",
			},
			{
				title: "Findings review",
				desc: "A walkthrough of where you stand, what drags the score and what lifts it.",
			},
			{
				title: "Action roadmap",
				desc: "A written plan with sequenced next steps and realistic timelines.",
			},
		],
		faqs: [
			{
				q: "Is this the same as getting rated by an agency?",
				a: "No — agencies rate independently. This tells you what they will see before they see it, so you can fix issues first.",
			},
			{
				q: "How long does an assessment take?",
				a: "Typically one to two weeks from complete documents — it is diagnostic work, not a borrowing process.",
			},
			{
				q: "My records are messy. Is that a problem?",
				a: "No — part of the work is organising your information into a lender-readable picture.",
			},
			{
				q: "What happens after the assessment?",
				a: "You get the roadmap. Most clients continue into enhancement or profile advisory; some execute with their existing team.",
			},
		],
	},
	"rating-enhancement": {
		audience: "Businesses whose borrowing costs suffer from a weak or damaged profile.",
		intro:
			"Rating Enhancement executes the repair: correcting over-leverage, disciplining utilisation, closing overdue positions, cleaning banking conduct and rebuilding a track record quarter by quarter. Scores improve on evidence, not appeals — so we sequence quick wins first for momentum, then structural fixes that move pricing permanently. Typical mandates show measurable improvement within two to four quarters of disciplined execution.",
		story: {
			heading: "Scores follow conduct, not the other way round",
			paras: [
				"There is no shortcut to a better rating — only a sequence of correct quarters. The good news: lenders weight recent conduct most, so disciplined execution starts paying back sooner than most promoters expect.",
				"A single notch of improvement reprices every facility you hold. Enhancement is among the highest-return projects a business can run.",
			],
		},
		documents: [
			"Credit assessment findings (or fresh financials to assess)",
			"Sanction letters of all existing loans and limits",
			"12-month statements of every facility",
			"Overdue and restructuring history, if any",
			"Cash-flow projections for 2 years",
			"KYC documents of promoters and the business",
		],
		benefits: [
			{
				title: "Quick wins first",
				desc: "Overdues closed, utilisation corrected, conduct cleaned — visible progress in the first quarter.",
			},
			{
				title: "Structural repair",
				desc: "Leverage right-sized and facilities restructured so the improvement holds permanently.",
			},
			{
				title: "Cheaper borrowing",
				desc: "A stronger score repriced into renewals, enhancements and every future application.",
			},
			{
				title: "Guided throughout",
				desc: "Quarterly reviews keep execution on track through seasonal ups and downs.",
			},
		],
		process: [
			{
				title: "Repair sequencing",
				desc: "Fixes ordered by impact — what moves the score this quarter versus next year.",
			},
			{
				title: "Lender coordination",
				desc: "Restructures, closures and limit corrections negotiated and documented.",
			},
			{
				title: "Conduct discipline",
				desc: "Utilisation guardrails and repayment rhythms put in place and monitored.",
			},
			{
				title: "Score tracking",
				desc: "Progress measured each quarter against the original baseline.",
			},
		],
		faqs: [
			{
				q: "How fast will my score improve?",
				a: "Conduct-led improvement typically shows within 2–4 quarters. Structural issues like over-leverage take longer but move pricing most.",
			},
			{
				q: "Do past overdues permanently block me?",
				a: "No — their weight fades as clean recent conduct accumulates. Early structured action beats waiting.",
			},
			{
				q: "Will enhancement disrupt my operations?",
				a: "No — the work runs alongside operations. Most fixes are financial structuring, not operational interference.",
			},
			{
				q: "What if my account is already stressed?",
				a: "Stressed positions need restructuring first — our transaction advisory handles the reset, then enhancement rebuilds from there.",
			},
		],
	},
	"credit-profile-advisory": {
		audience: "Businesses that borrow regularly and want every application to strengthen their standing.",
		intro:
			"Credit Profile Advisory is ongoing counsel for businesses that live on bank funding: working-capital renewals, limit enhancements, new facilities and rating interactions, all managed so each event lifts rather than strains your profile. Instead of scrambling before every renewal, you operate on a calendar — utilisation reviewed, financials packaged, applications timed to your strongest quarters.",
		story: {
			heading: "Profiles are maintained, not repaired",
			paras: [
				"Businesses that review their facilities annually refinance before rates bite, enhance limits before they feel the squeeze, and walk into renewals with packaged financials instead of apologies.",
				"Each well-managed renewal improves the ratios and track record that price the next one. The gap between maintained and neglected profiles compounds for years.",
			],
		},
		documents: [
			"Summary of all live facilities, limits and renewal dates",
			"Latest financial statements",
			"Recent bank statements of operating accounts",
			"Stock statements and receivables ageing (if applicable)",
			"GST returns and tax filings",
			"KYC documents of promoters and the business",
		],
		benefits: [
			{
				title: "Renewals without drama",
				desc: "Every review prepared in advance — packaged financials, clean conduct, justified enhancements.",
			},
			{
				title: "Timed applications",
				desc: "New facilities applied for in your strongest quarters, when approval odds and pricing are best.",
			},
			{
				title: "Early warnings",
				desc: "Utilisation spikes, covenant risks and conduct slips flagged before lenders notice them.",
			},
			{
				title: "A standing advisor",
				desc: "Someone who knows your file picks up the lender's call with you — every time.",
			},
		],
		process: [
			{
				title: "Profile calendar",
				desc: "Renewals, reviews and rating events mapped across the year — nothing arrives by surprise.",
			},
			{
				title: "Quarterly reviews",
				desc: "Utilisation, conduct and ratios checked against plan each quarter.",
			},
			{
				title: "Event preparation",
				desc: "Each renewal or application packaged and negotiated professionally.",
			},
			{
				title: "Annual strategy",
				desc: "Borrowing plan for the coming year — what to renew, enhance, refinance or close.",
			},
		],
		faqs: [
			{
				q: "How is this different from a one-time assessment?",
				a: "Assessment is a snapshot; this is the ongoing discipline that keeps the picture improving through renewals, enhancements and new borrowing.",
			},
			{
				q: "We already have a CA. Why add this?",
				a: "CAs ensure compliance accuracy; we manage how lenders perceive and price you — renewals, applications and rating events.",
			},
			{
				q: "How much time does it take from our side?",
				a: "A structured quarterly review plus event preparation — typically a few days a quarter, scheduled around your calendar.",
			},
			{
				q: "Is this only for large borrowers?",
				a: "No — mid-sized businesses with working-capital limits gain the most, since renewals dominate their lender interactions.",
			},
		],
	},
	"fpa": {
		audience: "Promoters who want forecasts they can trust and variances they can act on.",
		intro:
			"Financial planning and analysis — turns your accounts into forward vision: annual budgets, rolling forecasts, variance analysis and scenario models that support real decisions. Most growing businesses plan from gut feel and discover problems in hindsight. We install a monthly planning rhythm where targets are set, actuals are compared honestly, and corrections happen while they still matter.",
		story: {
			heading: "Plans are guesses; planning is control",
			paras: [
				"The value isn't the budget document — it's the monthly conversation it forces: why did margins slip, which product funds growth, can we afford the hire. Businesses that hold that conversation outperform those that don't, almost regardless of the plan's accuracy.",
				"Forecasts also borrow better: lenders price businesses that can show where next year's cash comes from.",
			],
		},
		documents: [
			"Last 2 years' financial statements",
			"Current-year books or trial balance",
			"Sales pipeline and order book (if maintained)",
			"Salary, rent and major cost schedules",
			"Existing budgets or projections (if any)",
			"12-month bank statements",
		],
		benefits: [
			{
				title: "Budgets that mean something",
				desc: "Annual targets built from your cost structure and pipeline — not last year plus ten percent.",
			},
			{
				title: "Rolling forecasts",
				desc: "Forward view refreshed monthly, so decisions use next quarter's reality, not last quarter's results.",
			},
			{
				title: "Variance with answers",
				desc: "Every gap between plan and actuals explained — and converted into an action, not an excuse.",
			},
			{
				title: "Scenario confidence",
				desc: "What-if models for hiring, pricing and expansion calls before money moves.",
			},
		],
		process: [
			{
				title: "Baseline build",
				desc: "History decoded — revenue drivers, cost behaviour and cash patterns mapped.",
			},
			{
				title: "Budget setting",
				desc: "Targets agreed with owners, with clear owners for each number.",
			},
			{
				title: "Monthly review",
				desc: "Actuals versus plan, variances explained, forecast rolled forward.",
			},
			{
				title: "Decision support",
				desc: "Scenarios modelled for the big calls — expansion, pricing, hiring, borrowing.",
			},
		],
		faqs: [
			{
				q: "We already do annual budgets. What changes?",
				a: "Static budgets die by February. FP&A makes planning rolling and monthly — the review rhythm matters more than the document.",
			},
			{
				q: "How accurate are the forecasts?",
				a: "Near-term forecasts run tight; longer horizons are scenarios, not promises. The discipline of updating beats any single prediction.",
			},
			{
				q: "Do you need our data to be perfect?",
				a: "No — messy books are normal. Part of setup is organising information into usable shape.",
			},
			{
				q: "Can this help with lender conversations?",
				a: "Directly — credible projections are the backbone of every sanction and enhancement request.",
			},
		],
	},
	"mis-reporting": {
		audience: "Owners and boards that need the truth about performance, monthly.",
		intro:
			"MIS & Reporting builds your monthly information pack: profit and loss, cash position, receivables and payables ageing, key ratios and KPIs — delivered in a format you can read in twenty minutes and act on immediately. Most promoters drown in raw data or fly blind between year-ends. We define the dozen numbers that actually run your business and report them with the discipline of a listed company.",
		story: {
			heading: "What gets reported gets managed",
			paras: [
				"Businesses rarely fail from one big mistake — they drift from dozens of small ones nobody measured. A monthly pack makes drift visible while correction is still cheap.",
				"The same pack transforms lender and investor conversations: nothing signals control like consistent, professional reporting.",
			],
		},
		documents: [
			"Access to accounting system (Tally, Zoho, Busy or equivalent)",
			"Bank statements of operating accounts",
			"Stock and receivables data (if maintained)",
			"Payroll and statutory payment records",
			"Existing reports or formats in use",
			"List of decisions the reports should support",
		],
		benefits: [
			{
				title: "Twenty-minute truth",
				desc: "One pack, once a month — performance, cash and risks in plain view.",
			},
			{
				title: "KPIs that matter",
				desc: "A dozen business-specific indicators tracked consistently, not fifty vanity metrics.",
			},
			{
				title: "Early warnings",
				desc: "Margin slips, ageing build-ups and cash squeezes flagged before they become crises.",
			},
			{
				title: "Board-grade polish",
				desc: "Reporting quality that impresses lenders, investors and partners alike.",
			},
		],
		process: [
			{
				title: "Metric design",
				desc: "The numbers that run your business identified with owners — then templated.",
			},
			{
				title: "Data plumbing",
				desc: "Sources connected and formats fixed so reporting runs on rails, not heroics.",
			},
			{
				title: "Monthly delivery",
				desc: "Pack delivered on a fixed date with commentary on what moved and why.",
			},
			{
				title: "Review and refine",
				desc: "Metrics evolved as the business changes — reporting grows with you.",
			},
		],
		faqs: [
			{
				q: "Which accounting systems do you work with?",
				a: "Tally, Zoho Books, Busy and most Indian SME systems — plus Excel-based setups. If it records transactions, we can report from it.",
			},
			{
				q: "How fast can reporting start?",
				a: "First pack typically within 30 days of data access — design in week one, delivery from month-end close.",
			},
			{
				q: "Will this burden my accountant?",
				a: "No — we design around existing processes and usually reduce ad-hoc reporting requests overall.",
			},
			{
				q: "Can reports be customised for lenders?",
				a: "Yes — lender-specific cuts (stock statements, CMA data, projections) are a standard add-on.",
			},
		],
	},
	"cash-flow-management": {
		audience: "Businesses where profit exists on paper but cash never seems available.",
		intro:
			"Cash Flow Management installs forward visibility and control over your money: 13-week rolling cash forecasts, collection and payment rhythms, working-capital guardrails and contingency buffers. Profit is an opinion; cash is a fact — and most growing businesses fail from timing gaps, not losses. We close those gaps with weekly discipline: knowing every major inflow and outflow before it happens.",
		story: {
			heading: "Run out of cash and the profit doesn't matter",
			paras: [
				"Growth consumes cash: stock and receivables swell faster than collections refill them. The classic growing-business paradox — more orders, less money in hand — is a forecasting failure, not a business failure.",
				"Businesses with 13-week cash visibility spot trouble quarters early, borrow exactly what the cycle demands, and never pay panic prices for emergency funds.",
			],
		},
		documents: [
			"12-month bank statements of all operating accounts",
			"Receivables ageing with customer-wise breakup",
			"Payables schedule and EMI obligations",
			"Salary and statutory payment calendar",
			"Order book and expected collection dates",
			"Existing working-capital limits and utilisation",
		],
		benefits: [
			{
				title: "13-week visibility",
				desc: "Every major inflow and outflow forecast weekly — surprises eliminated, not managed.",
			},
			{
				title: "Collection rhythm",
				desc: "Follow-up cadences and ageing targets that convert receivables into cash faster.",
			},
			{
				title: "Payment intelligence",
				desc: "Pay on time where it earns discounts, schedule where it preserves buffers — deliberately.",
			},
			{
				title: "Right-sized buffers",
				desc: "Contingency reserves and backup lines calibrated to your actual volatility.",
			},
		],
		process: [
			{
				title: "Cash mapping",
				desc: "Inflows, outflows and timing gaps charted across a 13-week horizon.",
			},
			{
				title: "Rhythm setup",
				desc: "Weekly forecast reviews, collection targets and payment calendars installed.",
			},
			{
				title: "Guardrails",
				desc: "Minimum balances, utilisation caps and escalation triggers agreed and monitored.",
			},
			{
				title: "Steady state",
				desc: "Forecasting becomes routine — reviewed weekly, refined monthly, trusted always.",
			},
		],
		faqs: [
			{
				q: "My sales are growing but cash is always short — why?",
				a: "Growth consumes working capital: stock and receivables swell faster than collections refill them. Forecasting closes that timing gap.",
			},
			{
				q: "How is this different from accounting?",
				a: "Accounting records the past; this manages the future — weekly forecasts, collection action and payment timing.",
			},
			{
				q: "What if a large customer delays payment?",
				a: "The forecast flags the impact weeks ahead, so buffers, backup lines or phased payments activate before crisis.",
			},
			{
				q: "Does this replace working-capital loans?",
				a: "No — it sizes them correctly. Many clients discover they need smaller limits once cash is managed, saving interest.",
			},
		],
	},
	"debt-syndication": {
		audience: "Promoters whose requirements exceed what a single lender covers well.",
		intro:
			"Debt Syndication structures funding across multiple lenders — mapping the requirement, allocating slices by appetite, running parallel credit processes and documenting a coordinated closure. Large tickets strain single-lender limits, pricing and risk appetite; a syndicated structure gets each lender their comfortable slice while you get better blended terms and execution certainty. We act as the single point that keeps every lender moving at the same pace.",
		story: {
			heading: "Big requirements need choreography, not applications",
			paras: [
				"Approaching five lenders sequentially takes five times as long and leaks negotiating power each round. Syndication runs them in parallel with consistent information — so competition improves terms instead of confusion delaying them.",
				"Lenders syndicate among themselves routinely; the difference here is someone running the process from your side of the table.",
			],
		},
		documents: [
			"Business plan with fund requirement and end-use breakup",
			"Last 3 years' financial statements + projections",
			"12-month bank statements",
			"Details of existing debt and security cover",
			"Project reports or asset papers (where applicable)",
			"KYC documents of promoters and the business",
		],
		benefits: [
			{
				title: "Full requirement, funded",
				desc: "Ticket sizes no single lender would hold alone — assembled from complementary appetites.",
			},
			{
				title: "Better blended pricing",
				desc: "Parallel competition across lenders prices every slice keenly.",
			},
			{
				title: "One coordinated close",
				desc: "Documentation, security sharing and conditions aligned across lenders to a single timeline.",
			},
			{
				title: "Your side of the table",
				desc: "An advisor whose only incentive is your terms — not any lender's targets.",
			},
		],
		process: [
			{
				title: "Syndication design",
				desc: "Requirement split into slices matched to lender appetites — banks, NBFCs or both.",
			},
			{
				title: "Information memorandum",
				desc: "One consistent pack for all lenders — no contradictions, no delays.",
			},
			{
				title: "Parallel execution",
				desc: "Credit processes run together with coordinated follow-ups and term comparison.",
			},
			{
				title: "Closure",
				desc: "Sanctions aligned, documentation completed and disbursements coordinated.",
			},
		],
		faqs: [
			{
				q: "How large must a requirement be to syndicate?",
				a: "Typically mid-to-large tickets where single-lender limits, pricing or risk appetite constrain the outcome — the threshold varies by sector and profile.",
			},
			{
				q: "Does syndication cost more in fees?",
				a: "Arrangement effort is higher, but competing lenders usually more than offset it through better pricing and terms.",
			},
			{
				q: "How long does it take?",
				a: "Parallel execution typically closes in 8–14 weeks from a complete memorandum, depending on lender count.",
			},
			{
				q: "Who coordinates between lenders?",
				a: "We do — single point of contact, consistent information flow, and aligned timelines across all participants.",
			},
		],
	},
};

export const documentChecklist = [
	"KYC documents of promoters and the business",
	"Last 3 years' financial statements",
	"12-month bank statements",
	"GST returns and tax filings",
	"Details of existing loans and repayments",
	"Property papers (only if secured funding)",
];

export function getServiceDetails(id) {
	return serviceDetails[id];
}
