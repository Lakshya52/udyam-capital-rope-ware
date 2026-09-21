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
			"bg-linear-to-br from-[var(--color-primary)] via-[var(--color-dark-blue)] to-[var(--color-black)]",
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
			"bg-linear-to-br from-[var(--blue-sky)] via-[var(--color-primary)] to-[var(--color-primary)]",
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
			"bg-linear-to-br from-[var(--blue-light)] via-[var(--blue-sky)] to-[var(--color-primary)]",
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
			"bg-linear-to-br from-[var(--color-primary-dull)] via-[var(--blue-sky)] to-[var(--color-primary)]",
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
			"bg-linear-to-br from-[var(--blue-light)] via-[var(--blue-sky)] to-[var(--color-primary)]",
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
			"bg-linear-to-br from-[var(--color-primary)] via-[var(--color-dark-blue)] to-[var(--color-black)]",
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
			"bg-linear-to-br from-[var(--color-primary-dull)] via-[var(--blue-sky)] to-[var(--color-primary)]",
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
			"bg-linear-to-br from-[var(--color-primary)] via-[var(--color-dark-blue)] to-[var(--color-black)]",
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
			"bg-linear-to-br from-[var(--blue-light)] via-[var(--blue-sky)] to-[var(--color-black)]",
		titleClass: "text-[var(--color-black)]",
		descClass:
			"text-[color-mix(in_oklab,var(--color-black)_55%,transparent)]",
	},
];

export function getService(id) {
	return services.find((service) => service.id === id);
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
		],
	},
	"msme-finance": {
		audience: "Micro, small, and medium enterprises at every stage.",
		intro:
			"MSME finance refers to funding products designed for smaller enterprises — often with lighter collateral, government scheme support, and faster processing. It covers both day-to-day working needs and longer-term business investment. Small businesses face a peculiar disadvantage: they need capital the most and find it hardest to access, caught between informal moneylenders and bank processes built for larger borrowers. The ecosystem has responded with guarantee programs, priority-sector mandates, and digital lending — but navigating it still takes guidance. We help MSMEs find the window they actually qualify for, and walk through it with them.",
		points: [
			"Collateral-light structures where possible",
			"Working capital + term-loan combinations",
			"Scheme and subsidy guidance",
			"Quick, assisted processing",
		],
		benefits: [
			{
				title: "Funding without fear",
				desc: "Collateral-light and guarantee-backed options designed for businesses without large assets to pledge.",
			},
			{
				title: "Schemes decoded",
				desc: "CGTMSE, ECLGS-type programs, and subsidies — we match your profile to what you actually qualify for.",
			},
			{
				title: "Working plus term, together",
				desc: "Day-to-day limits and growth loans structured as one coherent package instead of scattered facilities.",
			},
			{
				title: "Assisted till disbursal",
				desc: "Udyam registration to final paperwork — guided processing that respects how small teams work.",
			},
		],
		process: [
			{
				title: "Assess the business",
				desc: "Turnover, vintage, sector, and requirement mapped to the right MSME products.",
			},
			{
				title: "Match schemes and lenders",
				desc: "Banks, NBFCs, and programs compared for cost, speed, and fit.",
			},
			{
				title: "Apply with assistance",
				desc: "Applications, registrations, and documentation completed alongside you.",
			},
			{
				title: "Disburse and review",
				desc: "Funds tracked to credit, with limit reviews as the business grows.",
			},
		],
		faqs: [
			{
				q: "Does my business qualify as an MSME?",
				a: "MSME status depends on investment and turnover thresholds set by the government, revised from time to time. Udyam registration formalizes it — we help you check and register.",
			},
			{
				q: "Can I borrow without collateral?",
				a: "Often yes — guarantee-backed programs and cash-flow-based lending exist precisely for this. Eligibility depends on vintage, turnover, and repayment history.",
			},
			{
				q: "What documents will I need?",
				a: "Udyam registration, KYC, bank statements, GST returns, and financials. Our checklist keeps it to exactly what's needed — nothing more.",
			},
		],
	},
	"financial-advisory": {
		audience: "Businesses planning capital decisions or lender conversations.",
		intro:
			"Financial advisory gives promoters an expert second brain for money decisions — capital planning, financial modeling, lender presentations, and fundraising strategy. The goal is simple: walk into every financial conversation prepared. Most promoters are experts in their business, not in how lenders think — and that asymmetry costs them in pricing, covenants, and missed options they never knew existed. An advisor closes that gap: translating your business into the language of credit, pressure-testing decisions before money moves, and staying available as conditions change.",
		points: [
			"Financial modeling and projections",
			"Lender presentations and documentation",
			"Capital and debt planning",
			"End-to-end fundraising strategy",
		],
		benefits: [
			{
				title: "Clarity before commitment",
				desc: "Know exactly how much to raise, in what form, and from whom — before spending months chasing the wrong capital.",
			},
			{
				title: "Numbers that convince",
				desc: "Models and projections built to survive lender diligence, not just impress in a meeting.",
			},
			{
				title: "Better terms",
				desc: "Prepared borrowers negotiate from strength — on rate, tenure, covenants, and security.",
			},
			{
				title: "A sounding board",
				desc: "Ongoing counsel as conditions change — refinancing calls, expansion timing, and lender choices.",
			},
		],
		process: [
			{
				title: "Discovery",
				desc: "A deep conversation about where the business stands and where it needs to go.",
			},
			{
				title: "Analysis and modeling",
				desc: "Financials decoded, projections built, options mapped with honest trade-offs.",
			},
			{
				title: "Packaging",
				desc: "Lender-ready documentation and a narrative that frames your case accurately and strongly.",
			},
			{
				title: "Support till closure",
				desc: "We stay in the room through negotiation, sanction, and disbursal.",
			},
		],
		faqs: [
			{
				q: "When should I hire an advisor instead of going direct?",
				a: "When the requirement is large, the structure is complex, time is short, or past applications have stalled. Advisors earn their keep in better terms and saved months.",
			},
			{
				q: "How is this different from my CA's work?",
				a: "CAs ensure compliance and accounting accuracy; we specialize in capital strategy and lender negotiations. The two roles complement each other.",
			},
			{
				q: "How do engagements work?",
				a: "A discovery conversation first, then scope and commercials agreed in writing. No surprises, no open-ended meters.",
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
