// Generates backend/seed/seed.sql from the CURRENT site content.
// Run:  node backend/seed/generate-seed.mjs "<bcrypt-hash-for-admin>"
// (get the hash with: php -r "echo password_hash('YOUR_PASSWORD', PASSWORD_DEFAULT), PHP_EOL;")
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { services, subServices, serviceDetails } from "../../src/data/services.js";
import { articles } from "../../src/data/articles.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const esc = (v) => (v === null || v === undefined ? "NULL" : `'${String(v).replace(/'/g, "''")}'`);
const J = (v) => esc(JSON.stringify(v ?? []));
const out = ["-- Auto-generated seed. DO NOT hand-edit; re-run generate-seed.mjs.", "USE `udyam`;", ""];

// ---- services (mains first, then subs so FK order is safe) ----
for (const [idx, s] of services.entries()) {
  out.push(
    `INSERT INTO services (id, parent_id, title, description, image, bg, hover_bg, title_class, desc_class, span, is_main, sort_order) VALUES (${esc(s.id)}, NULL, ${esc(s.title)}, ${esc(s.desc)}, ${esc(s.image)}, ${esc(s.bg)}, ${esc(s.hoverBg)}, ${esc(s.titleClass)}, ${esc(s.descClass)}, ${esc(s.span)}, 1, ${idx});`
  );
}
for (const s of subServices) {
  out.push(
    `INSERT INTO services (id, parent_id, title, description, image, bg, hover_bg, title_class, desc_class, span, is_main, sort_order) VALUES (${esc(s.id)}, ${esc(s.parent)}, ${esc(s.title)}, ${esc(s.desc)}, ${esc(s.image)}, ${esc(s.bg)}, ${esc(s.hoverBg)}, ${esc(s.titleClass)}, ${esc(s.descClass)}, ${esc(s.span)}, 0, 0);`
  );
}
out.push("");
for (const [sid, d] of Object.entries(serviceDetails)) {
  out.push(
    `INSERT INTO service_details (service_id, audience, intro, story, documents, benefits, process, faqs) VALUES (${esc(sid)}, ${esc(d.audience)}, ${esc(d.intro)}, ${J(d.story)}, ${J(d.documents)}, ${J(d.benefits)}, ${J(d.process)}, ${J(d.faqs)});`
  );
}
out.push("");

// ---- articles ----
for (const a of articles) {
  out.push(
    `INSERT INTO articles (slug, title, excerpt, category, date, read_time, image, author_name, author_role, tags, sections) VALUES (${esc(a.slug)}, ${esc(a.title)}, ${esc(a.excerpt)}, ${esc(a.category)}, ${esc(a.date)}, ${esc(a.readTime)}, ${esc(a.image)}, ${esc(a.author?.name)}, ${esc(a.author?.role)}, ${J(a.tags)}, ${J(a.sections)});`
  );
}
out.push("");

// ---- case studies (mirrors src/pages/CaseStudies.jsx) ----
const cases = [
  ["Auto Components Manufacturer", "Manufacturing", "Working Capital", "Unlocking growth capital stuck in receivables", "Rapid order growth had locked cash in 90-day receivables while suppliers demanded advance payment — operations were stalling for lack of day-to-day funds.", "We structured a receivables-backed working capital limit aligned to the order cycle, with a vendor-payment sub-limit for critical suppliers.", [["₹4.2 Cr", "Limit structured"], ["45 days", "Cash cycle improvement"], ["2x", "Order capacity"]]],
  ["Regional Logistics Operator", "Logistics", "Debt Restructuring", "Resetting repayments the business could actually meet", "Multiple short-tenure loans taken during fleet expansion created EMIs far above monthly cash generation, pushing the account toward stress.", "We consolidated the facilities into a single tenure-aligned term loan with a moratorium matched to seasonal cash flows.", [["38%", "EMI reduction"], ["1 loan", "From five facilities"], ["On track", "Repayment status"]]],
  ["Packaged Foods MSME", "Food Processing", "Fund Raising", "Funding a new plant without losing control", "The promoters needed growth capital for a second unit but wanted to avoid heavy dilution or unserviceable debt.", "We designed a blended debt-plus-expansion-finance structure with milestone-linked disbursement tied to plant commissioning.", [["₹6.5 Cr", "Total raise"], ["0%", "Equity diluted"], ["14 mo", "To commissioning"]]],
  ["Textile Exporter", "Textiles", "Working Capital", "Financing export orders without choking cash flow", "Large seasonal export orders needed upfront fabric purchases, but packing credit limits fell far short of the order book.", "We enhanced the export packing credit with order-backed top-ups mapped to the shipment calendar.", [["₹3.8 Cr", "Enhanced limit"], ["100%", "Order fulfilment"], ["2 seasons", "Funded smoothly"]]],
  ["Pharma Distributor", "Healthcare", "Business Loans", "Stocking up for the winter demand surge", "Peak-season stocking needed 3x normal inventory holding, but the existing cash-credit limit covered barely half of it.", "We placed a seasonal overdraft alongside the base limit, drawable only against distributor invoices.", [["₹2.1 Cr", "Seasonal line"], ["0", "Stock-outs"], ["18%", "Revenue growth"]]],
  ["Restaurant Chain", "Hospitality", "Project Finance", "Funding outlets three and four", "Two profitable outlets and landlord offers for two more — but fit-out costs would have drained operating reserves.", "We structured outlet-level project loans with repayments stepping up after each outlet's breakeven month.", [["₹1.9 Cr", "Project loans"], ["2", "New outlets"], ["7 mo", "To breakeven"]]],
  ["Auto Dealership", "Automotive", "LAP", "Turning showroom property into growth funds", "The dealership owned its showroom outright while paying high-cost unsecured debt for inventory — capital trapped in bricks.", "We raised a loan against the showroom at a far lower rate and retired the expensive facilities.", [["₹5.4 Cr", "LAP raised"], ["4%", "Interest saved"], ["3 loans", "Closed early"]]],
  ["Construction Contractor", "Infrastructure", "Fund Raising", "Bridging retention money gaps", "Retention money stuck with government clients for 12+ months was starving running projects of working funds.", "We arranged retention-backed bridge funding with release mapped to project certification milestones.", [["₹7.2 Cr", "Bridge arranged"], ["4", "Projects kept live"], ["0", "Work stoppages"]]],
  ["E-commerce Seller", "Retail", "Working Capital", "Surviving the festive inventory spike", "Festive sales needed 4x inventory two months early, but marketplace payouts lagged sales by three weeks.", "We set up a short-cycle working capital line sized to the festive calendar, with auto-sweep from payout accounts.", [["₹95 L", "Festive line"], ["3.1x", "Festive sales"], ["21 days", "Full rotation"]]],
  ["Diagnostics Clinic", "Healthcare", "MSME Finance", "Equipping a new diagnostics wing", "A growing clinic needed analyzers and imaging equipment but lacked collateral beyond the machines themselves.", "We structured equipment-backed MSME funding with tenures matched to each machine's payback period.", [["₹1.4 Cr", "Equipment funded"], ["6", "Machines installed"], ["5 yrs", "Aligned tenure"]]],
  ["Private School", "Education", "Project Finance", "Building classrooms before admissions", "Admissions were waitlisted but new classrooms needed funding a full year before fee income would arrive.", "We arranged phased construction finance with a principal moratorium until the first full-fee academic year.", [["₹3.3 Cr", "Construction finance"], ["12", "New classrooms"], ["1 yr", "Moratorium"]]],
  ["Boutique Hotel", "Hospitality", "Debt Restructuring", "Resetting loans after slow seasons", "Two slow seasons left the property servicing EMIs from reserves, with stress close behind.", "We rescheduled the term debt with a seasonal repayment calendar — lighter summers, stronger winters.", [["30%", "EMI relief in summer"], ["Current", "Account status"], ["2 yrs", "Extended runway"]]],
  ["Printing Press", "Manufacturing", "Corporate Finance", "Refinancing machinery the smart way", "Aging presses were raising rejection rates while existing machinery loans carried penal-rate baggage.", "We refinanced the book and funded a modern press in one facility, priced off the improved margin profile.", [["₹2.6 Cr", "Refinanced + funded"], ["2.5%", "Rate improvement"], ["-40%", "Rejection rate"]]],
];
cases.forEach(([client, industry, service, title, challenge, solution, stats], i) => {
  const statObjs = stats.map(([value, label]) => ({ value, label }));
  out.push(
    `INSERT INTO case_studies (client, industry, service, title, challenge, solution, stats, sort_order) VALUES (${esc(client)}, ${esc(industry)}, ${esc(service)}, ${esc(title)}, ${esc(challenge)}, ${esc(solution)}, ${J(statObjs)}, ${i});`
  );
});
out.push("");

// ---- about ----
const about = {
  overview_paras: [
    "Udyam Capital is a financial advisory firm focused on one thing: getting the right capital into growing businesses on the right terms. We work across four practices — Transaction Advisory for deals and structures, Credit Ratings Advisory for stronger borrowing profiles, CFO Services for a disciplined finance function, and Debt & Capital Advisory for term loans, working capital, LAP, project finance and syndications.",
    "Every engagement runs the same way: an honest assessment first, lender-grade preparation next, and parallel approaches so lenders compete for your mandate — tracked from first conversation to final disbursal. No generic playbooks and no open-ended meters; scope and commercials are agreed in writing before work begins.",
    "Our team blends credit, structuring and operating experience, and we craft custom solutions for every business we serve — measured in sanctions won, pricing improved and ratings repaired. Lower borrowing costs, steadier cash flows and funded growth: that is what we mean by a successful business journey.",
  ],
  vision: "To be the most trusted and reliable partner, empowering businesses to grow and create enduring value.",
  mission: "To enable businesses to thrive and stay competitive by delivering Innovative, Customized Solutions that foster Transformation and Growth.",
  team: [
    { name: "Punit Kumar Rai", role: "Founder & Managing Partner", photo: "", linkedin: "https://www.linkedin.com/", bio: "Leads the firm's vision and key client relationships." },
    { name: "Sashi Ranjan Singh", role: "Lead Finance Operations", photo: "", linkedin: "https://www.linkedin.com/", bio: "Runs the firm's finance operations and funding execution." },
    { name: "Deepa Sharma", role: "HR Manager", photo: "", linkedin: "https://www.linkedin.com/", bio: "Builds the team and culture behind every engagement." },
    { name: "Ayush Saxena", role: "Chartered Accountant", photo: "", linkedin: "https://www.linkedin.com/", bio: "Brings financial rigor to structuring and compliance." },
    { name: "Nilesh Singh", role: "Senior Manager IT", photo: "", linkedin: "https://www.linkedin.com/", bio: "Keeps the firm's technology and infrastructure running." },
    { name: "Lakshya Mittal", role: "Full Stack Developer", photo: "", linkedin: "https://www.linkedin.com/in/lakshya52", bio: "Builds and maintains the firm's digital platforms." },
    { name: "Aman Singh", role: "Accountant", photo: "", linkedin: "https://www.linkedin.com/", bio: "Manages accounts and financial records with precision." },
    { name: "Rahul", role: "Accounts", photo: "", linkedin: "https://www.linkedin.com/", bio: "Supports day-to-day accounting and client documentation." },
  ],
  capabilities: [
    { label: "Transaction Advisory", to: "/services/transaction-advisory" },
    { label: "Credit Ratings Advisory", to: "/services/credit-ratings-advisory" },
    { label: "CFO Services", to: "/services/cfo-services" },
    { label: "Debt & Capital Advisory", to: "/services/debt-capital-advisory" },
  ],
};
for (const [k, v] of Object.entries(about)) {
  out.push(`INSERT INTO about_content (\`key_name\`, \`value\`) VALUES (${esc(k)}, ${esc(typeof v === "string" ? v : JSON.stringify(v))});`);
}
out.push("");

// ---- site settings (today scattered across Contact/Footer/Navbar) ----
const settings = {
  content_revision: "1",  landline_label: "Landline : 0120 444 5816",
  landline_href: "tel:01204445816",
  mobile_label: "Mobile : +91 82875 98661",
  mobile_href: "tel:+918287598661",
  navbar_phone_href: "tel:+918287598661",
  email1: "we.care@udyamcapital.com",
  email2: "info@udyamcapital.com",
  address: "214, 2nd floor, Vishal Chambers, Noida Sector 18, Uttar Pradesh - 201301",
  map_query: "Vishal Chambers Noida Sector 18",
  map_embed: "https://www.google.com/maps?q=Vishal+Chambers,+Sector+18,+Noida,+Uttar+Pradesh+201301&output=embed",
};
for (const [k, v] of Object.entries(settings)) {
  out.push(`INSERT INTO site_settings (\`key_name\`, \`value\`) VALUES (${esc(k)}, ${esc(v)});`);
}
out.push("");

// ---- admin user (hash passed as argv; change password after first login) ----
const hash = process.argv[2];
if (!hash || !hash.startsWith("$2y$")) {
  console.error("Usage: node backend/seed/generate-seed.mjs \"<bcrypt-hash>\"");
  console.error("Get one with: php -r \"echo password_hash('YOUR_PASSWORD', PASSWORD_DEFAULT), PHP_EOL;\"");
  process.exit(1);
}
out.push(`INSERT INTO admin_users (username, password_hash) VALUES ('admin', '${hash}');`);
out.push("");

writeFileSync(join(root, "seed", "seed.sql"), out.join("\n"), "utf8");
const counts = {
  services: services.length + subServices.length,
  details: Object.keys(serviceDetails).length,
  articles: articles.length,
  cases: cases.length,
};
console.log("seed.sql written:", JSON.stringify(counts));
if (counts.details !== counts.services) {
  console.warn("WARNING: details count != services count — every service needs a details row.");
}
