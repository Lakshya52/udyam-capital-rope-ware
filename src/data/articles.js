// ─── BACKEND NOTE ────────────────────────────────────────────────────────────
// Replace this placeholder array with data from your PHP admin portal API.
// Expected shape per article:
// { slug, title, excerpt, category, date, readTime, image, author, tags, sections }
// `image` = absolute URL returned by the portal; leave "" to show the fallback.
// `author` = { name, role }. `tags` = string array (drives topic links).
// `sections` = [{ heading, paras }] — drives the table of contents + body.
const teamAuthor = { name: "Team Udyam Capital", role: "Research Desk" };

const lorem = [
	"This is placeholder body copy. Replace it with the article text from your admin portal — paragraphs, headings, and pull quotes will render in this column.",
	"Lenders look beyond the headline numbers: cash-flow consistency, repayment history, and the story your financials tell over several quarters all shape their decision.",
	"When the PHP backend is ready, swap this file's array for an API fetch. The list page, filters, and this detail view all read from the same shape, so no UI changes will be needed.",
];

function body() {
	return [
		{ heading: "Why this matters", paras: [...lorem] },
		{ heading: "How lenders look at it", paras: [...lorem] },
		{ heading: "Common mistakes to avoid", paras: [...lorem] },
		{ heading: "What to do next", paras: [...lorem] },
	];
}

export const articles = [
	{
		slug: "understanding-business-loans",
		title: "Understanding Business Loans: A Founder's Primer",
		excerpt:
			"Term loans, working capital limits, LAP — what each structure is really for and how lenders evaluate your application.",
		category: "Guides",
		date: "Jan 12, 2026",
		readTime: "6 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Business Loans", "Guides", "Fundraising"],
		sections: body(),
	},
	{
		slug: "debt-restructuring-explained",
		title: "When Debt Restructuring Makes Sense",
		excerpt:
			"Five signals that your repayment structure — not your business — is the problem, and what a reset looks like.",
		category: "Strategy",
		date: "Jan 28, 2026",
		readTime: "5 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Debt Restructuring", "Strategy"],
		sections: body(),
	},
	{
		slug: "working-capital-mistakes",
		title: "5 Working Capital Mistakes Growing Businesses Make",
		excerpt:
			"Cash locked in receivables, overstocking, misaligned credit cycles — and how to fix each one.",
		category: "Guides",
		date: "Feb 09, 2026",
		readTime: "7 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Working Capital", "Guides"],
		sections: body(),
	},
	{
		slug: "msme-finance-options-2026",
		title: "MSME Finance Options in 2026",
		excerpt:
			"A tour of the schemes, lenders, and structures available to micro, small and medium enterprises this year.",
		category: "Industry",
		date: "Feb 21, 2026",
		readTime: "8 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["MSME Finance", "Industry"],
		sections: body(),
	},
	{
		slug: "project-finance-basics",
		title: "Project Finance Basics for First-Time Promoters",
		excerpt:
			"How lenders size up a greenfield project — DSCR, security cover, and the documents that matter most.",
		category: "Strategy",
		date: "Mar 04, 2026",
		readTime: "6 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Project Finance", "Strategy"],
		sections: body(),
	},
	{
		slug: "fund-raising-readiness",
		title: "Are You Fund-Raising Ready? A Checklist",
		excerpt:
			"Financial hygiene, documentation, and narrative — the three things investors check before the numbers.",
		category: "Guides",
		date: "Mar 18, 2026",
		readTime: "4 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Fund Raising", "Guides"],
		sections: body(),
	},
	{
		slug: "loan-against-property-guide",
		title: "Loan Against Property: Unlocking Dead Capital",
		excerpt:
			"Your premises can fund your expansion — how LAP valuations, tenures, and rates actually work.",
		category: "Guides",
		date: "Apr 02, 2026",
		readTime: "5 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["LAP", "Guides"],
		sections: body(),
	},
	{
		slug: "cibil-score-business-loans",
		title: "Your CIBIL Score and Your Business Loan",
		excerpt:
			"What lenders read in your credit report — and practical ways to repair it before you apply.",
		category: "Guides",
		date: "Apr 16, 2026",
		readTime: "4 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Business Loans", "Guides"],
		sections: body(),
	},
	{
		slug: "term-loan-vs-overdraft",
		title: "Term Loan vs Overdraft: Picking Right",
		excerpt:
			"One funds assets, the other funds cycles. Mixing them up is expensive — here's how to choose.",
		category: "Strategy",
		date: "May 01, 2026",
		readTime: "6 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Working Capital", "Strategy"],
		sections: body(),
	},
	{
		slug: "nbfc-vs-banks-borrowing",
		title: "NBFC vs Banks: Where Should You Borrow?",
		excerpt:
			"Speed against pricing, flexibility against process — comparing your two lender universes.",
		category: "Industry",
		date: "May 14, 2026",
		readTime: "7 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Industry"],
		sections: body(),
	},
	{
		slug: "cash-flow-forecasting-small-business",
		title: "Cash Flow Forecasting for Small Businesses",
		excerpt:
			"A simple 13-week method to see crunches coming before they arrive.",
		category: "Guides",
		date: "May 29, 2026",
		readTime: "5 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Working Capital", "Guides"],
		sections: body(),
	},
	{
		slug: "why-business-loans-get-rejected",
		title: "Why Business Loans Get Rejected",
		excerpt:
			"The seven most common rejection reasons — and the fix for each one.",
		category: "Strategy",
		date: "Jun 11, 2026",
		readTime: "6 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Business Loans", "Strategy"],
		sections: body(),
	},
	{
		slug: "collateral-free-lending",
		title: "Collateral-Free Lending: What Lenders Want",
		excerpt:
			"No security doesn't mean no scrutiny — what unsecured lenders check instead.",
		category: "Industry",
		date: "Jun 25, 2026",
		readTime: "5 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["MSME Finance", "Industry"],
		sections: body(),
	},
	{
		slug: "gst-returns-borrowing-power",
		title: "How GST Returns Affect Your Borrowing Power",
		excerpt:
			"Your filings are your financial CV — lenders read them closely. Here's what they look for.",
		category: "Guides",
		date: "Jul 09, 2026",
		readTime: "4 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Guides"],
		sections: body(),
	},
	{
		slug: "balance-sheet-cleanup-fundraising",
		title: "Balance Sheet Cleanup Before Fundraising",
		excerpt:
			"Related-party loans, WWIP tangles, personal expenses — cleaning up before investors look.",
		category: "Strategy",
		date: "Jul 23, 2026",
		readTime: "7 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Fund Raising", "Strategy"],
		sections: body(),
	},
	{
		slug: "co-lending-explained-borrowers",
		title: "Co-Lending Explained for Borrowers",
		excerpt:
			"When banks and NBFCs lend together, borrowers can win — if you understand the structure.",
		category: "Industry",
		date: "Aug 06, 2026",
		readTime: "5 min read",
		image: "",
		author: { ...teamAuthor },
		tags: ["Industry"],
		sections: body(),
	},
];

export function getArticle(slug) {
	return articles.find((a) => a.slug === slug);
}

// ─── VIEWS (placeholder until the PHP backend serves real counts) ────────────
// Deterministic per-article base + a device-local increment (once per session).
// Replace getViews() with an API call when the portal tracks views.
function hashSlug(s) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
	return Math.abs(h);
}

export function getViews(slug) {
	const base = 500 + (hashSlug(slug || "") % 2500);
	let extra = 0;
	try {
		extra = parseInt(localStorage.getItem(`article-views:${slug}`) || "0", 10) || 0;
	} catch {
		extra = 0;
	}
	return base + extra;
}

export function trackView(slug) {
	try {
		if (!slug || sessionStorage.getItem(`viewed:${slug}`)) return;
		sessionStorage.setItem(`viewed:${slug}`, "1");
		const k = `article-views:${slug}`;
		const n = parseInt(localStorage.getItem(k) || "0", 10) || 0;
		localStorage.setItem(k, String(n + 1));
	} catch {
		// storage unavailable — counts stay at base
	}
}

export function formatViews(n) {
	return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
}
