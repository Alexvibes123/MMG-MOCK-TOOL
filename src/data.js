// ── NAV ────────────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: "docs",        label: "Document Access",    icon: "D" },
  { id: "om_discovery",label: "OM Library",         icon: "O" },
  { id: "om_detail",   label: "OM Detail",          icon: "M" },
  { id: "prospecting", label: "Tenant Prospecting", icon: "T" },
  { id: "pipeline",    label: "Outreach & Pipeline",icon: "P" },
  { id: "integrations",label: "Integrations",       icon: "⚙" },
  { id: "workspace",   label: "AI Workspace",       icon: "W" },
];

export const PASS_REASONS = [
  "Pricing / cap rate too tight","Rollover risk too high","Anchor lease concern",
  "Below-market occupancy","Environmental / structural issues","Unfavorable submarket",
  "Lease structure (gross vs NNN)","Seller not motivated","Better opportunities in pipeline",
  "Financing not available","IC did not approve","Market timing",
];

export const PIPELINE_STAGES = ["Identified","Researched","Qualified","Outreach","Meeting","Tour"];

// ── QUICK ACTIONS ──────────────────────────────────────────────────────────
export const QUICK_ACTIONS = [
  { cat: "Search & Compare", color: "#2E75B6", lightBg: "#eff6ff", icon: "⊞", actions: [
    { label: "Compare Rent Rolls",  desc: "Side-by-side comparison of two properties — occupancy, WALT, anchor, avg rent", prompt: "Compare the rent rolls for two properties" },
    { label: "Find Expiring Leases",desc: "List all leases expiring within a date range, sorted by rollover risk", prompt: "Show me all leases expiring in the next 6 months" },
    { label: "Occupancy Check",     desc: "Review current occupancy across all properties or a specific submarket", prompt: "Which properties have occupancy below 90%?" },
    { label: "Search Documents",    desc: "Find any lease, OM, or report by keyword, tenant name, or property", prompt: "Search documents for" },
  ]},
  { cat: "Draft Documents", color: "#059669", lightBg: "#f0fdf4", icon: "✎", actions: [
    { label: "Draft LOI Response",   desc: "Generate a Letter of Intent using MMG standard NNN terms", prompt: "Draft an LOI response using our standard terms for" },
    { label: "Lease Renewal Offer",  desc: "Write a formal renewal offer letter for an existing tenant", prompt: "Write a lease renewal offer for tenant" },
    { label: "Broker Intro Letter",  desc: "Professional outreach letter to a broker about a new listing", prompt: "Draft a broker intro letter for" },
    { label: "Tenant Default Notice",desc: "Formal notice letter to a tenant for non-payment or lease violation", prompt: "Draft a formal notice letter for tenant" },
  ]},
  { cat: "Reports & Summaries", color: "#7c3aed", lightBg: "#faf5ff", icon: "▤", actions: [
    { label: "Monthly Property Report",desc: "Full financial and occupancy summary — revenue, NOI, collections, lease activity", prompt: "Generate a monthly property report for" },
    { label: "Portfolio Overview",     desc: "High-level performance summary across all 40+ properties", prompt: "Create a portfolio performance overview for Q1 2026" },
    { label: "NOI vs Budget Analysis", desc: "Variance report comparing actual NOI to budget", prompt: "Summarize NOI vs budget for" },
    { label: "Lease Expiration Report",desc: "Rollover risk summary for next 6, 12, and 24 months", prompt: "Generate a lease expiration risk report for the next 12 months" },
  ]},
  { cat: "Charts & Visuals", color: "#ea580c", lightBg: "#fff7ed", icon: "◈", actions: [
    { label: "NOI Trend Chart",       desc: "Line chart of actual NOI vs budget over a selected period", prompt: "Chart NOI vs budget for the last 6 months for" },
    { label: "Occupancy Timeline",    desc: "Visual occupancy trend across all properties", prompt: "Show occupancy trends across all properties" },
    { label: "Lease Expiration Chart",desc: "Bar chart showing SF expiring by quarter", prompt: "Build a lease expiration timeline chart" },
    { label: "Rent Roll Heatmap",     desc: "Color-coded breakdown of rent by tenant and use category", prompt: "Create a rent roll heatmap for" },
  ]},
  { cat: "File Actions", color: "#b45309", lightBg: "#fffbeb", icon: "⊡", actions: [
    { label: "Save to SharePoint",   desc: "Save any document, draft, or report to a SharePoint folder", prompt: "Save this document to SharePoint under" },
    { label: "Email Report to Team", desc: "Send a formatted report directly to team members", prompt: "Email this report to the team" },
    { label: "Find a Document",      desc: "Locate any lease, OM, or report by property name or date", prompt: "Find the lease document for" },
    { label: "Upload & Analyze",     desc: "Upload a PDF, Word, or Excel file for instant AI analysis", prompt: "UPLOAD" },
  ]},
];

// ── DOCUMENT ACCESS ────────────────────────────────────────────────────────
export const PAST_CHATS = [
  { id: 1, label: "Compare rent rolls for Midtown...", date: "Mar 25", saved: true },
  { id: 2, label: "Lease terms for Suite 200...",      date: "Mar 24", saved: false },
  { id: 3, label: "Draft LOI response for Doral...",   date: "Mar 23", saved: true },
  { id: 4, label: "Expirations next 6 months...",      date: "Mar 21", saved: false },
  { id: 5, label: "Monthly report Wynwood...",          date: "Mar 20", saved: false },
];

// ── OM LIBRARY ─────────────────────────────────────────────────────────────
export const RECENT_INGESTED = [
  { name: "Kendall Fresh Plaza",  type: "Retail-GA",  typeColor: "#2E75B6", city: "Miami",      price: "$14.1M",  cap: "6.2%", status: "Return to Market", statusColor: "#b45309", statusBg: "#fef3c7", date: "Mar 24" },
  { name: "Sunrise Office Park",  type: "Office",     typeColor: "#059669", city: "Plantation", price: "$8.75M",  cap: "7.1%", status: "New",              statusColor: "#1d4ed8", statusBg: "#dbeafe", date: "Mar 23" },
  { name: "Coral Way Strip",      type: "Retail-SC",  typeColor: "#2E75B6", city: "Miami",      price: "$5.2M",   cap: "6.8%", status: "New",              statusColor: "#1d4ed8", statusBg: "#dbeafe", date: "Mar 22" },
  { name: "Homestead Medical",    type: "Medical",    typeColor: "#7c3aed", city: "Homestead",  price: "$6.4M",   cap: "6.5%", status: "Processing",       statusColor: "#6b7280", statusBg: "#f3f4f6", date: "Mar 22" },
  { name: "Aventura Mixed Use",   type: "Mixed",      typeColor: "#ea580c", city: "Aventura",   price: "$22.3M",  cap: "5.8%", status: "New",              statusColor: "#1d4ed8", statusBg: "#dbeafe", date: "Mar 21" },
];

export const NEEDS_REVIEW = [
  { name: "Kendall Fresh Plaza", field: "NOI",          value: "$874,200",    conf: "medium" },
  { name: "Sunrise Office Park", field: "Parking Ratio",value: "4.2/1,000",  conf: "low"    },
  { name: "Coral Way Strip",     field: "Suite 3 Rent", value: "$41.50/SF",  conf: "low"    },
];

export const UPCOMING_EXP = [
  { tenant: "The UPS Store",       property: "Kendall Fresh Plaza", sf: "1,200", exp: "Apr 15, 2026", type: "Service",      typeColor: "#6b7280", typeBg: "#f3f4f6"  },
  { tenant: "Kumon Learning",      property: "Meadows Square",      sf: "1,600", exp: "Jul 1, 2026",  type: "Education",    typeColor: "#0e7490", typeBg: "#cffafe"  },
  { tenant: "European Wax Center", property: "Kendall Corners",     sf: "1,500", exp: "Sep 30, 2026", type: "Personal Care",typeColor: "#be185d", typeBg: "#fce7f3"  },
  { tenant: "Amscot Financial",    property: "Kendall Fresh Plaza", sf: "3,800", exp: "Jul 31, 2026", type: "Financial",    typeColor: "#2E75B6", typeBg: "#dbeafe"  },
  { tenant: "Little Caesars",      property: "Colonial Shopping",   sf: "1,400", exp: "Nov 30, 2027", type: "QSR",          typeColor: "#ea580c", typeBg: "#ffedd5"  },
];

export const LIBRARY_ROWS = [
  { name: "Kendall Corners",        type: "Retail-GA", typeColor: "#2E75B6", city: "Miami",          gla: "38,400 SF", price: "$9.7M",  cap: "6.4%", occ: "96%", anchor: "Presidente Supermarket", status: "Active Pursuit", statusColor: "#059669", statusBg: "#d1fae5", date: "Mar 2026" },
  { name: "Pinecrest Center",       type: "Retail-SC", typeColor: "#2E75B6", city: "Pinecrest",       gla: "24,200 SF", price: "$6.1M",  cap: "6.7%", occ: "92%", anchor: "Walgreens",              status: "New",            statusColor: "#1d4ed8", statusBg: "#dbeafe", date: "Mar 2026" },
  { name: "Colonial Shopping Center",type:"Retail-SC", typeColor: "#2E75B6", city: "Miami",          gla: "41,800 SF", price: "$11.2M", cap: "6.3%", occ: "89%", anchor: "dd's Discounts",          status: "Passed",         statusColor: "#dc2626", statusBg: "#fee2e2", date: "Feb 2026" },
  { name: "Midpoint",               type: "Mixed",     typeColor: "#ea580c", city: "Miami",          gla: "29,600 SF", price: "$8.4M",  cap: "5.9%", occ: "94%", anchor: "Bank of America",         status: "New",            statusColor: "#1d4ed8", statusBg: "#dbeafe", date: "Mar 2026" },
  { name: "Little River Retail",    type: "Retail-SC", typeColor: "#2E75B6", city: "Miami",          gla: "18,200 SF", price: "$4.8M",  cap: "7.0%", occ: "88%", anchor: "Family Dollar",           status: "Processing",     statusColor: "#6b7280", statusBg: "#f3f4f6", date: "Mar 2026" },
  { name: "Meadows Square",         type: "Retail-GA", typeColor: "#2E75B6", city: "Hialeah",        gla: "52,100 SF", price: "$13.8M", cap: "6.1%", occ: "97%", anchor: "Winn-Dixie",             status: "Passed",         statusColor: "#dc2626", statusBg: "#fee2e2", date: "Jan 2026" },
  { name: "Pine Plaza",             type: "Retail-SC", typeColor: "#2E75B6", city: "Pembroke Pines", gla: "31,400 SF", price: "$7.6M",  cap: "6.6%", occ: "91%", anchor: "Subway",                 status: "New",            statusColor: "#1d4ed8", statusBg: "#dbeafe", date: "Feb 2026" },
  { name: "Westlake Plaza",         type: "Office",    typeColor: "#059669", city: "Plantation",     gla: "44,000 SF", price: "$10.1M", cap: "7.2%", occ: "85%", anchor: "—",                      status: "New",            statusColor: "#1d4ed8", statusBg: "#dbeafe", date: "Mar 2026" },
  { name: "Naranja Plaza",          type: "Retail-GA", typeColor: "#2E75B6", city: "Homestead",      gla: "36,800 SF", price: "$8.9M",  cap: "6.8%", occ: "93%", anchor: "Presidente Supermarket", status: "Active Pursuit", statusColor: "#059669", statusBg: "#d1fae5", date: "Mar 2026" },
  { name: "Town & Country Plaza",   type: "Retail-SC", typeColor: "#2E75B6", city: "Miami",          gla: "27,500 SF", price: "$7.2M",  cap: "6.5%", occ: "90%", anchor: "Starbucks",              status: "New",            statusColor: "#1d4ed8", statusBg: "#dbeafe", date: "Feb 2026" },
  { name: "Pinecrest Shoppes",      type: "Retail-SC", typeColor: "#2E75B6", city: "Pinecrest",      gla: "21,300 SF", price: "$5.9M",  cap: "6.9%", occ: "96%", anchor: "Tropical Smoothie",      status: "Passed",         statusColor: "#dc2626", statusBg: "#fee2e2", date: "Jan 2026" },
  { name: "Centre at Cutler Bay",   type: "Retail-GA", typeColor: "#2E75B6", city: "Cutler Bay",     gla: "58,200 SF", price: "$15.4M", cap: "6.0%", occ: "95%", anchor: "Publix",                 status: "New",            statusColor: "#1d4ed8", statusBg: "#dbeafe", date: "Mar 2026" },
];

export const MAP_DOTS = [
  { x: 62, y: 54, type: "retail",  label: "Kendall Corners"      },
  { x: 58, y: 60, type: "retail",  label: "Kendall Fresh Plaza"  },
  { x: 52, y: 48, type: "retail",  label: "Coral Way Strip"      },
  { x: 47, y: 44, type: "retail",  label: "Midpoint"             },
  { x: 70, y: 40, type: "office",  label: "Sunrise Office Park"  },
  { x: 75, y: 46, type: "office",  label: "Westlake Plaza"       },
  { x: 55, y: 70, type: "retail",  label: "Naranja Plaza"        },
  { x: 50, y: 78, type: "medical", label: "Homestead Medical"    },
  { x: 80, y: 30, type: "mixed",   label: "Aventura Mixed"       },
  { x: 43, y: 50, type: "retail",  label: "Town & Country"       },
  { x: 46, y: 56, type: "retail",  label: "Pinecrest Center"     },
  { x: 60, y: 74, type: "retail",  label: "Centre at Cutler Bay" },
  { x: 35, y: 38, type: "retail",  label: "Pine Plaza"           },
  { x: 40, y: 42, type: "retail",  label: "Meadows Square"       },
  { x: 66, y: 32, type: "retail",  label: "Little River Retail"  },
  { x: 55, y: 36, type: "mixed",   label: "Colonial Shopping"    },
];
export const DOT_COLOR = { retail: "#2E75B6", office: "#059669", medical: "#7c3aed", mixed: "#ea580c" };

// ── OM DETAIL ──────────────────────────────────────────────────────────────
export const RENT_ROLL_ROWS = [
  { tenant: "Presidente Supermarket", suite: "A",   sf: "22,000", baseRent: "$18.50", totalRent: "$24.00", type: "NNN",   start: "2020-03", exp: "2030-03", use: "Grocery",       useColor: "#059669", useBg: "#d1fae5", pos: "Anchor", conf: "high"   },
  { tenant: "Wingstop",               suite: "102", sf: "1,800",  baseRent: "$35.00", totalRent: "$42.00", type: "NNN",   start: "2022-06", exp: "2027-06", use: "QSR",           useColor: "#ea580c", useBg: "#ffedd5", pos: "Inline", conf: "high"   },
  { tenant: "European Wax Center",    suite: "103", sf: "1,500",  baseRent: "$38.00", totalRent: "$45.00", type: "NNN",   start: "2021-09", exp: "2026-09", use: "Personal Care", useColor: "#be185d", useBg: "#fce7f3", pos: "Inline", conf: "high"   },
  { tenant: "Aspen Dental",           suite: "104", sf: "3,200",  baseRent: "$40.00", totalRent: "$48.00", type: "NNN",   start: "2023-01", exp: "2028-01", use: "Medical",       useColor: "#7c3aed", useBg: "#ede9fe", pos: "Inline", conf: "high"   },
  { tenant: "The UPS Store",          suite: "105", sf: "1,200",  baseRent: "$32.00", totalRent: "$39.00", type: "NNN",   start: "2019-04", exp: "2026-04", use: "Service",       useColor: "#6b7280", useBg: "#f3f4f6", pos: "Inline", conf: "medium" },
  { tenant: "Little Caesars",         suite: "106", sf: "1,400",  baseRent: "$34.00", totalRent: "$41.00", type: "NNN",   start: "2022-11", exp: "2027-11", use: "QSR",           useColor: "#ea580c", useBg: "#ffedd5", pos: "Inline", conf: "high"   },
  { tenant: "Kumon Learning",         suite: "107", sf: "1,600",  baseRent: "$30.00", totalRent: "$37.00", type: "Gross", start: "2023-06", exp: "2026-06", use: "Education",     useColor: "#0e7490", useBg: "#cffafe", pos: "Inline", conf: "high"   },
  { tenant: "Clean Juice",            suite: "108", sf: "1,200",  baseRent: "$36.00", totalRent: "$43.00", type: "NNN",   start: "2024-01", exp: "2029-01", use: "QSR",           useColor: "#ea580c", useBg: "#ffedd5", pos: "Inline", conf: "high"   },
  { tenant: "Vacant",                 suite: "109", sf: "2,100",  baseRent: "—",      totalRent: "—",      type: "—",     start: "—",       exp: "—",       use: "—",             useColor: "#9ca3af", useBg: "#f3f4f6", pos: "Inline", conf: "none"   },
  { tenant: "Amscot Financial",       suite: "Pad", sf: "3,800",  baseRent: "$28.00", totalRent: "$33.00", type: "NNN",   start: "2018-07", exp: "2026-07", use: "Financial",     useColor: "#2E75B6", useBg: "#dbeafe", pos: "Pad",    conf: "low"    },
];

export const LEASE_COMPS = [
  { property: "Sunset Square",       tenant: "Starbucks",       sf: "1,800", rent: "$44.00", type: "NNN", date: "Jan 2026", term: "7 yr",  dist: "0.8 mi" },
  { property: "Kendale Lakes Plaza", tenant: "Popeyes",         sf: "2,100", rent: "$38.00", type: "NNN", date: "Nov 2025", term: "10 yr", dist: "1.2 mi" },
  { property: "Miller Square",       tenant: "Tropical Smoothie",sf:"1,400", rent: "$36.50", type: "NNN", date: "Oct 2025", term: "5 yr",  dist: "1.5 mi" },
  { property: "Westbrook Center",    tenant: "Five Guys",       sf: "2,400", rent: "$41.00", type: "NNN", date: "Sep 2025", term: "10 yr", dist: "2.1 mi" },
  { property: "Hammocks Town Ctr",   tenant: "Jersey Mike's",   sf: "1,600", rent: "$35.00", type: "NNN", date: "Aug 2025", term: "7 yr",  dist: "2.4 mi" },
  { property: "Killian Commons",     tenant: "Wingstop",        sf: "1,900", rent: "$34.50", type: "NNN", date: "Jul 2025", term: "5 yr",  dist: "2.8 mi" },
  { property: "Southland Mall Pad",  tenant: "Checkers",        sf: "1,200", rent: "$32.00", type: "NNN", date: "Jun 2025", term: "10 yr", dist: "3.2 mi" },
];

export const SALES_COMPS = [
  { property: "Hammocks Marketplace", gla: "48,200 SF", ask: "$13.2M", psf: "$274", cap: "6.1%", occ: "94%", anchor: "Winn-Dixie",             omDate: "Oct 2025", sale: "$12.8M" },
  { property: "Kendale Town Ctr",     gla: "41,600 SF", ask: "$11.8M", psf: "$284", cap: "6.4%", occ: "96%", anchor: "Presidente Supermarket", omDate: "Aug 2025", sale: "$11.4M" },
  { property: "Miller Square",        gla: "52,400 SF", ask: "$15.1M", psf: "$288", cap: "6.0%", occ: "92%", anchor: "Key Foods",               omDate: "Jul 2025", sale: "—"      },
  { property: "Westbrook Center",     gla: "38,800 SF", ask: "$10.4M", psf: "$268", cap: "6.6%", occ: "89%", anchor: "Family Dollar",           omDate: "May 2025", sale: "—"      },
  { property: "Killian Commons",      gla: "44,100 SF", ask: "$12.6M", psf: "$286", cap: "6.2%", occ: "95%", anchor: "dd's Discounts",          omDate: "Mar 2025", sale: "$12.1M" },
];

export const INGESTION_QUEUE = [
  { name: "Kendall_Fresh_Plaza_OM.pdf",    status: "complete",   type: "Retail-GA", city: "Miami",          date: "Mar 24", records: 10, dupes: false, confidence: "high",   fields: 18 },
  { name: "Sunrise_Office_Park_OM.pdf",    status: "complete",   type: "Office",    city: "Plantation",     date: "Mar 23", records: 6,  dupes: false, confidence: "medium", fields: 16 },
  { name: "Coral_Way_Strip_OM.pdf",        status: "extracting", type: "Retail-SC", city: "Miami",          date: "Mar 22", records: null,dupes:false, confidence: null,    fields: null},
  { name: "Homestead_Medical_Center.pdf",  status: "review",     type: "Medical",   city: "Homestead",      date: "Mar 22", records: 4,  dupes: false, confidence: "low",    fields: 14 },
  { name: "Aventura_Mixed_Use_OM.pdf",     status: "duplicate",  type: "Mixed",     city: "Aventura",       date: "Mar 21", records: null,dupes:true,  confidence: null,    fields: null},
  { name: "Pine_Plaza_Broward.pdf",        status: "complete",   type: "Retail-SC", city: "Pembroke Pines", date: "Mar 20", records: 8,  dupes: false, confidence: "high",   fields: 18 },
];

export const EXTRACTED_FIELDS = [
  { field: "Property Name",   value: "Kendall Fresh Plaza",              pass: 1, conf: "high",   flag: "" },
  { field: "Address",         value: "13500 SW 120th St, Miami, FL",     pass: 1, conf: "high",   flag: "" },
  { field: "Property Type",   value: "Retail — Grocery Anchored",        pass: 1, conf: "high",   flag: "" },
  { field: "GLA",             value: "45,200 SF",                        pass: 1, conf: "high",   flag: "" },
  { field: "Asking Price",    value: "$14,100,000",                      pass: 1, conf: "high",   flag: "" },
  { field: "Cap Rate",        value: "6.2%",                             pass: 1, conf: "high",   flag: "" },
  { field: "NOI",             value: "$874,200",                         pass: 1, conf: "medium", flag: "Calculated from rent roll — verify with broker" },
  { field: "Occupancy",       value: "92%",                              pass: 1, conf: "high",   flag: "" },
  { field: "Year Built",      value: "1998",                             pass: 1, conf: "high",   flag: "" },
  { field: "Renovation Year", value: "2019",                             pass: 1, conf: "medium", flag: "" },
  { field: "Lot Size",        value: "3.2 acres",                        pass: 1, conf: "high",   flag: "" },
  { field: "Parking Ratio",   value: "4.8/1,000 SF",                    pass: 1, conf: "medium", flag: "" },
  { field: "Zoning",          value: "BU-2",                             pass: 1, conf: "high",   flag: "" },
  { field: "Broker Name",     value: "Andrew Easton",                    pass: 1, conf: "high",   flag: "" },
  { field: "Brokerage",       value: "The Easton Group",                 pass: 1, conf: "high",   flag: "" },
  { field: "OM Date",         value: "March 2026",                       pass: 1, conf: "high",   flag: "" },
  { field: "Anchor Tenant",   value: "Presidente Supermarket",           pass: 1, conf: "high",   flag: "" },
  { field: "Submarket",       value: "Kendall",                          pass: 1, conf: "high",   flag: "" },
];

export const EXTRACTED_TENANTS = [
  { tenant: "Presidente Supermarket", sf: "22,000", rent: "$18.50", start: "2020-03", exp: "2030-03", use: "Grocery",       naics: "445110", conf: "high",   flag: "" },
  { tenant: "Wingstop",               sf: "1,800",  rent: "$35.00", start: "2022-06", exp: "2027-06", use: "QSR",           naics: "722513", conf: "high",   flag: "" },
  { tenant: "European Wax Center",    sf: "1,500",  rent: "$38.00", start: "2021-09", exp: "2026-09", use: "Personal Care", naics: "812112", conf: "high",   flag: "" },
  { tenant: "Aspen Dental",           sf: "3,200",  rent: "$40.00", start: "2023-01", exp: "2028-01", use: "Medical",       naics: "621210", conf: "high",   flag: "" },
  { tenant: "The UPS Store",          sf: "1,200",  rent: "$32.00", start: "2019-04", exp: "2026-04", use: "Service",       naics: "491110", conf: "medium", flag: "Expiration unclear — two dates found in doc" },
  { tenant: "Little Caesars",         sf: "1,400",  rent: "$34.00", start: "2022-11", exp: "2027-11", use: "QSR",           naics: "722513", conf: "high",   flag: "" },
  { tenant: "Kumon Learning",         sf: "1,600",  rent: "$30.00", start: "2023-06", exp: "2026-06", use: "Education",     naics: "611691", conf: "high",   flag: "" },
  { tenant: "Clean Juice",            sf: "1,200",  rent: "$36.00", start: "2024-01", exp: "2029-01", use: "QSR",           naics: "722513", conf: "high",   flag: "" },
  { tenant: "Vacant",                 sf: "2,100",  rent: "—",      start: "—",       exp: "—",       use: "—",             naics: "—",      conf: "none",   flag: "" },
  { tenant: "Amscot Financial",       sf: "3,800",  rent: "$28.00", start: "2018-07", exp: "2026-07", use: "Financial",     naics: "522390", conf: "low",    flag: "Rent figure inconsistent — OM shows $28 and $33 on different pages" },
];

// ── TENANT PROSPECTING ─────────────────────────────────────────────────────
export const EXPIRING_TENANTS = [
  { name: "Coastal Coffee Co.",    current: "Kendall Corners",   sf: 1800, rent: "$34.00", exp: "Jun 15, 2026", daysLeft: 70,  use: "QSR",          useColor: "#ea580c", useBg: "#ffedd5", locations: 6, score: 94 },
  { name: "Tropical Smoothie Cafe",current: "Pinecrest Shoppes", sf: 1600, rent: "$32.00", exp: "Aug 3, 2026",  daysLeft: 119, use: "QSR",          useColor: "#ea580c", useBg: "#ffedd5", locations: 3, score: 76 },
  { name: "Heartland Dental",      current: "Naranja Plaza",     sf: 2400, rent: "$38.00", exp: "Apr 30, 2027", daysLeft: 389, use: "Medical",      useColor: "#7c3aed", useBg: "#ede9fe", locations: 2, score: 68 },
  { name: "The UPS Store",         current: "Colonial Shopping", sf: 1200, rent: "$30.00", exp: "Sep 15, 2026", daysLeft: 162, use: "Service",      useColor: "#6b7280", useBg: "#f3f4f6", locations: 4, score: 55 },
  { name: "Kumon Learning Ctr",    current: "Meadows Square",    sf: 1400, rent: "$28.00", exp: "Jul 1, 2026",  daysLeft: 86,  use: "Education",    useColor: "#0e7490", useBg: "#cffafe", locations: 2, score: 42 },
  { name: "BurgerFi",              current: "Westlake Plaza",    sf: 2100, rent: "$36.00", exp: "Mar 1, 2027",  daysLeft: 329, use: "QSR",          useColor: "#ea580c", useBg: "#ffedd5", locations: 8, score: 88 },
  { name: "European Wax Center",   current: "Pinecrest Center",  sf: 1500, rent: "$38.00", exp: "Sep 30, 2026", daysLeft: 177, use: "Personal Care",useColor: "#be185d", useBg: "#fce7f3", locations: 5, score: 78 },
];

export const MMG_AT_RISK = [
  { name: "The UPS Store",       property: "Kendall Fresh Plaza", sf: "1,200", exp: "Apr 15, 2026", daysLeft: 9,   risk: "high"   },
  { name: "Kumon Learning",      property: "Meadows Square",      sf: "1,600", exp: "Jul 1, 2026",  daysLeft: 86,  risk: "high"   },
  { name: "Amscot Financial",    property: "Kendall Fresh Plaza", sf: "3,800", exp: "Jul 31, 2026", daysLeft: 116, risk: "high"   },
  { name: "European Wax Center", property: "Kendall Corners",     sf: "1,500", exp: "Sep 30, 2026", daysLeft: 177, risk: "medium" },
];

export const TOP_PROSPECTS = [
  { name: "Coastal Coffee Co.",    score: 94, vacancy: "Wynwood Retail Suite 104",    source: "OM Library",  status: "New",           fit: null, industry: "QSR",          sf: 1800, growth: "High",   timing: "82 days",  locations: 6  },
  { name: "BurgerFi",             score: 88, vacancy: "Wynwood Retail Suite 104",    source: "Market Scan", status: "New",           fit: null, industry: "QSR",          sf: 2100, growth: "High",   timing: "329 days", locations: 8  },
  { name: "Orangetheory Fitness", score: 87, vacancy: "Kendall Corners Pad Site",    source: "Market Scan", status: "Contacted",     fit: null, industry: "Fitness",      sf: 3200, growth: "High",   timing: "180 days", locations: 12 },
  { name: "Jersey Mike's",        score: 82, vacancy: "Colonial Unit 12",            source: "Market Scan", status: "Responded",     fit: "good",industry: "QSR",         sf: 1800, growth: "Medium", timing: "329 days", locations: 8  },
  { name: "European Wax Center",  score: 78, vacancy: "Pinecrest Suite 208",         source: "OM Library",  status: "New",           fit: null, industry: "Personal Care",sf: 1500, growth: "Medium", timing: "177 days", locations: 5  },
  { name: "Clean Juice",          score: 71, vacancy: "Town & Country Endcap",       source: "Market Scan", status: "Tour Scheduled",fit: "good",industry: "QSR",         sf: 1200, growth: "High",   timing: "265 days", locations: 4  },
  { name: "Heartland Dental",     score: 66, vacancy: "Kendall Corners Pad Site",    source: "OM Library",  status: "Contacted",     fit: null, industry: "Medical",      sf: 2400, growth: "Medium", timing: "389 days", locations: 2  },
];

export const ACTIVE_VACANCIES = [
  { property: "Wynwood Retail",   suite: "Suite 104", sf: 3200, asking: "$42/SF NNN", days: 71, prospects: 8, stages: [3,2,2,1,0,0] },
  { property: "Kendall Corners",  suite: "Pad Site",  sf: 2800, asking: "$38/SF NNN", days: 34, prospects: 6, stages: [2,2,1,1,0,0] },
  { property: "Pinecrest Center", suite: "Suite 208", sf: 1500, asking: "$44/SF NNN", days: 12, prospects: 4, stages: [3,1,0,0,0,0] },
  { property: "Colonial Shopping",suite: "Unit 12",   sf: 4100, asking: "$36/SF NNN", days: 45, prospects: 7, stages: [3,2,1,1,0,0] },
  { property: "Town & Country",   suite: "Endcap",    sf: 2200, asking: "$40/SF NNN", days: 22, prospects: 5, stages: [2,1,1,1,0,0] },
  { property: "Midpoint",         suite: "Suite 301", sf: 3800, asking: "$34/SF NNN", days: 58, prospects: 3, stages: [2,1,0,0,0,0] },
];

export const OM_LIBRARY_LEADS = [
  { name: "Coastal Coffee Co.",    current: "Kendall Corners",   rent: "$34.00", sf: 1800, exp: "Jun 15, 2026", days: 70,  dist: "2.1 mi", use: "QSR",          useColor: "#ea580c", useBg: "#ffedd5", score: 94 },
  { name: "Tropical Smoothie",    current: "Pinecrest Shoppes", rent: "$32.00", sf: 1600, exp: "Aug 3, 2026",  days: 119, dist: "3.4 mi", use: "QSR",          useColor: "#ea580c", useBg: "#ffedd5", score: 76 },
  { name: "Heartland Dental",     current: "Naranja Plaza",     rent: "$38.00", sf: 2400, exp: "Apr 30, 2027", days: 389, dist: "4.8 mi", use: "Medical",      useColor: "#7c3aed", useBg: "#ede9fe", score: 68 },
  { name: "The UPS Store",        current: "Colonial",          rent: "$30.00", sf: 1200, exp: "Sep 15, 2026", days: 162, dist: "1.9 mi", use: "Service",      useColor: "#6b7280", useBg: "#f3f4f6", score: 55 },
  { name: "Kumon Learning",       current: "Meadows Square",    rent: "$28.00", sf: 1400, exp: "Jul 1, 2026",  days: 86,  dist: "5.2 mi", use: "Education",    useColor: "#0e7490", useBg: "#cffafe", score: 42 },
];

export const MARKET_SCAN_LEADS = [
  { name: "BurgerFi",      industry: "QSR",       signal: "Signed 3 new FL leases in 2025",     location: "Doral",       score: 88 },
  { name: "Pollo Tropical",industry: "QSR",       signal: "Hiring store managers Miami-Dade",   location: "Hialeah",     score: 79 },
  { name: "Stretch Zone",  industry: "Fitness",   signal: "5 new locations planned SE FL",      location: "Coral Gables",score: 72 },
  { name: "Mathnasium",    industry: "Education", signal: "Franchise expansion South FL",        location: "Aventura",    score: 61 },
];

// ── OUTREACH & PIPELINE ────────────────────────────────────────────────────
export const OUTREACH_ITEMS = [
  { name: "Coastal Coffee Co.",    vacancy: "Wynwood Suite 104",       score: 94, source: "OM Library",  subject: "A new space in Wynwood for Coastal Coffee's next chapter",           status: "Draft",          date: null,    opened: false, replied: false },
  { name: "BurgerFi",             vacancy: "Wynwood Suite 104",       score: 88, source: "Market Scan", subject: "Prime Wynwood retail opportunity for BurgerFi's South FL expansion",  status: "Draft",          date: null,    opened: false, replied: false },
  { name: "Orangetheory Fitness", vacancy: "Kendall Corners Pad Site",score: 87, source: "Market Scan", subject: "Kendall pad site — ideal for Orangetheory's next location",            status: "Sent",           date:"Mar 24", opened: true,  replied: false },
  { name: "Jersey Mike's",        vacancy: "Colonial Unit 12",        score: 82, source: "Market Scan", subject: "4,100 SF opportunity in North Miami for Jersey Mike's",                status: "Replied",        date:"Mar 22", opened: true,  replied: true  },
  { name: "European Wax Center",  vacancy: "Pinecrest Suite 208",     score: 78, source: "OM Library",  subject: "Pinecrest retail space — aligned with your expansion timeline",        status: "Sent",           date:"Mar 23", opened: false, replied: false },
  { name: "Clean Juice",          vacancy: "Town & Country Endcap",   score: 71, source: "Market Scan", subject: "Town & Country endcap — no competing juice bar in the center",         status: "Tour Scheduled", date:"Mar 21", opened: true,  replied: true  },
  { name: "Heartland Dental",     vacancy: "Kendall Corners Pad Site",score: 66, source: "OM Library",  subject: "Medical pad opportunity in Kendall — available Q2 2026",               status: "Sent",           date:"Mar 20", opened: true,  replied: false },
  { name: "Pollo Tropical",       vacancy: "Colonial Unit 12",        score: 79, source: "Market Scan", subject: "High-visibility inline space at Colonial Shopping Center",             status: "Draft",          date: null,    opened: false, replied: false },
];

export const KANBAN_CARDS = [
  { name: "Coastal Coffee Co.",    property: "Wynwood Suite 104",    score: 94, source: "OM Library",  stage: 0, days: 2  },
  { name: "BurgerFi",             property: "Wynwood Suite 104",    score: 88, source: "Market Scan", stage: 0, days: 1  },
  { name: "Heartland Dental",     property: "Kendall Pad Site",     score: 66, source: "OM Library",  stage: 0, days: 5  },
  { name: "Pollo Tropical",       property: "Colonial Unit 12",     score: 79, source: "Market Scan", stage: 0, days: 3  },
  { name: "Orangetheory Fitness", property: "Kendall Pad Site",     score: 87, source: "Market Scan", stage: 1, days: 8  },
  { name: "European Wax Center",  property: "Pinecrest Suite 208",  score: 78, source: "OM Library",  stage: 1, days: 6  },
  { name: "Stretch Zone",         property: "Midpoint Suite 301",   score: 72, source: "Market Scan", stage: 1, days: 4  },
  { name: "Jersey Mike's",        property: "Colonial Unit 12",     score: 82, source: "Market Scan", stage: 2, days: 11 },
  { name: "Kumon Learning",       property: "Pinecrest Suite 208",  score: 55, source: "OM Library",  stage: 2, days: 9  },
  { name: "Mathnasium",           property: "Midpoint Suite 301",   score: 61, source: "Market Scan", stage: 2, days: 7  },
  { name: "Clean Juice",          property: "Town & Country",       score: 71, source: "Market Scan", stage: 3, days: 14 },
  { name: "Tropical Smoothie",    property: "Wynwood Suite 104",    score: 76, source: "OM Library",  stage: 3, days: 18 },
  { name: "Wingstop",             property: "Colonial Unit 12",     score: 83, source: "Market Scan", stage: 4, days: 22 },
  { name: "Aspen Dental",         property: "Kendall Pad Site",     score: 79, source: "OM Library",  stage: 5, days: 31 },
];

export const WEEKLY_REPORT_DATA = {
  newProspects: 8, outreachSent: 12, responseRate: 33, toursBooked: 2,
  byVacancy: [
    { vacancy: "Wynwood Retail Suite 104",    newP: 3, sent: 4, responses: 2, tours: 1 },
    { vacancy: "Kendall Corners Pad Site",    newP: 2, sent: 3, responses: 1, tours: 1 },
    { vacancy: "Pinecrest Center Suite 208",  newP: 1, sent: 2, responses: 0, tours: 0 },
    { vacancy: "Colonial Shopping Unit 12",   newP: 2, sent: 3, responses: 1, tours: 0 },
  ],
  omRate: 40, scanRate: 22,
  topPerformers: [
    { name: "Jersey Mike's",  action: "Replied positively — interested in touring Colonial Unit 12", score: 82 },
    { name: "Clean Juice",    action: "Tour scheduled for Mar 28 at Town & Country Endcap",          score: 71 },
    { name: "Orangetheory",   action: "Email opened 3x — no reply yet. Follow up recommended.",      score: 87 },
  ],
  aiActions: [
    "Follow up with Coastal Coffee Co. — score 94, lease expiring in 70 days, no response yet. Draft a second-touch email referencing their recent Wynwood hiring posts.",
    "Jersey Mike's responded positively — schedule a tour at Colonial Unit 12 this week before momentum drops.",
    "Expand search radius for Midpoint Suite 301 to 5 miles — only 3 prospects at current 3-mile range.",
  ],
};

// ── AI WORKSPACE ───────────────────────────────────────────────────────────
export const AGENT_CATALOG = [
  { id:"ag1", name:"Acquisition Scout",    status:"active",    color:"#2E75B6", tagline:"Monitors the market daily and surfaces the best deals before your competitors see them.",          desc:"Watches Crexi, LoopNet, and broker email submissions 24/7. Scores OMs against MMG acquisition criteria and surfaces top opportunities each morning.",  tools:["Crexi","LoopNet","SharePoint","Claude","Teams"],   capabilities:["Monitors 3 listing platforms daily","Scores OMs against 12 acquisition criteria","Flags price changes on tracked properties","Morning briefing to acquisitions team","Requires approval before adding to pipeline"], lastAction:"Flagged Kendall Fresh Plaza price reduction (-12.9%) at 7:14 AM", actionsToday:4, requiresApproval:true  },
  { id:"ag2", name:"Lease Renewal Agent",  status:"active",    color:"#059669", tagline:"Proactively works every expiring lease so nothing slips through the cracks.",                    desc:"Pulls all expiring leases from Yardi 18 months out. At 90, 60, and 30 days drafts personalized renewal offers, sends them via Outlook, and escalates non-responses.", tools:["Yardi","Outlook","Claude","HubSpot","Teams"],      capabilities:["Tracks leases expiring within 18 months","Drafts renewal offers using current market comps","Sends and tracks emails via Outlook","Escalates non-responses at 60 and 30 days","Logs all activity in HubSpot"],             lastAction:"Sent renewal offer to Amscot Financial at 8:55 AM",              actionsToday:2, requiresApproval:false },
  { id:"ag3", name:"Prospecting Agent",    status:"active",    color:"#7c3aed", tagline:"Finds the right tenants for every vacancy and starts the conversation — automatically.",         desc:"When a vacancy is added, searches the OM library for expiring tenants nearby and scans market signals for expanding operators. Drafts personalized outreach.", tools:["Yardi","HubSpot","Outlook","Claude","Teams"],      capabilities:["Scans OM library for nearby expiring tenants","Monitors hiring and expansion signals","Scores each prospect 0-100","Drafts personalized outreach emails","Requires approval before sending"],                              lastAction:"Drafted 4 outreach emails for Wynwood Suite 104 at 10:30 AM",    actionsToday:6, requiresApproval:true  },
  { id:"ag4", name:"Portfolio Reporter",   status:"idle",      color:"#ea580c", tagline:"Every report your team needs, generated and delivered without anyone asking.",                   desc:"Pulls financial and occupancy data from Yardi on schedule. Generates monthly property reports, weekly leasing summaries, and quarterly portfolio overviews.", tools:["Yardi","SharePoint","Outlook","Teams","Claude"],   capabilities:["Monthly reports for all 40+ properties","Weekly leasing and prospecting summaries","Quarterly portfolio performance overview","Delivers via email and Teams","Saves all reports to SharePoint"],                             lastAction:"Idle — next run: Monday April 7 at 8:00 AM",                     actionsToday:0, requiresApproval:false },
  { id:"ag5", name:"Deal Monitor",         status:"active",    color:"#b45309", tagline:"Watches every deal in your pipeline and tells you exactly what to do next.",                    desc:"Monitors all active deals in HubSpot. Flags stalled prospects, identifies deals ready to advance, tracks LOI response times, and surfaces deals at risk.", tools:["HubSpot","Outlook","Teams","Claude"],              capabilities:["Flags prospects stalled 7+ days","Identifies deals ready to advance","Tracks LOI response times","Daily action digest to leasing team","Updates HubSpot stages automatically"],                                            lastAction:"Flagged Orangetheory as stalled (8 days, email opened 3x) at 9:00 AM", actionsToday:3, requiresApproval:false },
  { id:"ag6", name:"Compliance Guardian",  status:"available", color:"#6b7280", tagline:"Keeps the AI accountable — logs every action and flags anything that needs human review.",      desc:"Watches all AI activity across connected tools. Logs every read, write, send, and automation run. Flags any action that exceeds defined permission boundaries.", tools:["SharePoint","Teams"],                            capabilities:["Logs every AI action in real time","Flags permission boundary breaches","Weekly compliance report export","Alerts admin on unusual patterns","Read-only — never takes actions itself"],                                     lastAction:"Not yet activated",                                              actionsToday:0, requiresApproval:false },
];

export const PERMISSIONS_CONFIG = [
  { app:"Microsoft SharePoint", appColor:"#0078d4", logo:"SP", permissions:[
    { name:"Read documents",    enabled:true,  desc:"AI can read leases, rent rolls, OMs, and reports" },
    { name:"Write documents",   enabled:true,  desc:"AI can save generated drafts and reports" },
    { name:"Delete documents",  enabled:false, desc:"AI cannot delete any files" },
    { name:"Share externally",  enabled:false, desc:"AI cannot share files outside MMG" },
  ]},
  { app:"Microsoft Outlook",   appColor:"#0078d4", logo:"OL", permissions:[
    { name:"Send emails",         enabled:true,  desc:"AI can send outreach on behalf of team members" },
    { name:"Read emails",         enabled:true,  desc:"AI can read replies to track prospect engagement" },
    { name:"Delete emails",       enabled:false, desc:"AI cannot delete emails" },
    { name:"Access all mailboxes",enabled:false, desc:"AI only accesses mailboxes of connected users" },
  ]},
  { app:"HubSpot",             appColor:"#ff7a59", logo:"HS", permissions:[
    { name:"Read contacts & deals",  enabled:true,  desc:"AI can read prospect and pipeline data" },
    { name:"Create & update records",enabled:true,  desc:"AI can create leads and update deal stages" },
    { name:"Delete records",         enabled:false, desc:"AI cannot delete CRM records" },
    { name:"Access billing data",    enabled:false, desc:"AI cannot access billing or payment info" },
  ]},
  { app:"Yardi",               appColor:"#e63946", logo:"YD", permissions:[
    { name:"Read tenant data",   enabled:true,  desc:"AI can read tenant, lease, and expiration data" },
    { name:"Read financial data",enabled:true,  desc:"AI can read NOI, collections, and budget data" },
    { name:"Write to Yardi",     enabled:false, desc:"AI cannot modify Yardi records" },
  ]},
  { app:"Microsoft Teams",     appColor:"#5558af", logo:"MT", permissions:[
    { name:"Post to channels",enabled:true,  desc:"AI can post reports and alerts to designated channels" },
    { name:"Read messages",   enabled:false, desc:"AI cannot read team conversations" },
    { name:"Create channels", enabled:false, desc:"AI cannot create or modify channels" },
  ]},
];

export const AUTOMATION_RULES = [
  { id:1, name:"OM Auto-Ingest",          trigger:"New PDF added to /SharePoint/OMs/Incoming/",              action:"Extract property + tenant data, apply naming convention, flag low-confidence fields", apps:["SharePoint","Claude"],           active:true,  runs:18, lastRun:"Today 9:41 AM"   },
  { id:2, name:"Prospect Reply Alert",    trigger:"Prospect replies to outreach email in Outlook",            action:"Update HubSpot stage to Responded, notify Lisa R. in Teams, flag for follow-up",    apps:["Outlook","HubSpot","Teams"],     active:true,  runs:4,  lastRun:"Today 10:42 AM"  },
  { id:3, name:"Weekly Prospecting Report",trigger:"Every Monday at 8:00 AM",                                action:"Generate report from HubSpot pipeline data, post to #leasing-team in Teams",         apps:["HubSpot","Teams","SharePoint"],  active:true,  runs:12, lastRun:"Today 9:30 AM"   },
  { id:4, name:"Lease Expiration Alert",  trigger:"Tenant lease expires within 90 days (from Yardi)",        action:"Flag in Tenant Expiration Tracker, draft renewal offer email, notify team member",   apps:["Yardi","Outlook","Teams"],       active:true,  runs:7,  lastRun:"Yesterday"        },
  { id:5, name:"Tour Confirmation",       trigger:"Tour Scheduled stage in HubSpot pipeline",                 action:"Create calendar event in Outlook, send confirmation email, save property brief",     apps:["HubSpot","Outlook","SharePoint"],active:true,  runs:3,  lastRun:"Today 9:15 AM"   },
  { id:6, name:"New CoStar Comp Alert",   trigger:"New comparable sale or lease posted in target submarket", action:"Extract comp data, add to Comps Engine library, notify acquisitions team in Teams",  apps:["CoStar","Teams"],                active:false, runs:0,  lastRun:"Not yet run"      },
];

export const ACTIVITY_FEED = [
  { id:1,  time:"10:47 AM",          app:"SharePoint", appColor:"#0078d4", action:"Saved document",       detail:"LOI Response — Suite 104 — March 2026.docx saved to /Doral Retail/Active Leases/",                                      type:"write",  user:"AI (Sarah M.)"   },
  { id:2,  time:"10:42 AM",          app:"Outlook",    appColor:"#0078d4", action:"Email sent",            detail:"Outreach email sent to Coastal Coffee Co. — 'A new space in Wynwood for Coastal Coffee's next chapter'",                 type:"send",   user:"AI (Lisa R.)"    },
  { id:3,  time:"10:31 AM",          app:"SharePoint", appColor:"#0078d4", action:"Document read",         detail:"Read Midtown Plaza Rent Roll Q1 2026.xlsx and Midtown Corner Rent Roll Q1 2026.xlsx for comparison analysis",            type:"read",   user:"AI (Sarah M.)"   },
  { id:4,  time:"10:18 AM",          app:"Yardi",      appColor:"#e63946", action:"Data pulled",           detail:"Synced tenant expiration data for 40 properties — 4 at-risk tenants flagged for renewal outreach",                       type:"read",   user:"AI (Automated)"  },
  { id:5,  time:"9:55 AM",           app:"HubSpot",    appColor:"#ff7a59", action:"Contact updated",       detail:"Jersey Mike's pipeline stage updated: Responded → Tour Scheduled. Tour date set for Mar 28.",                            type:"write",  user:"AI (Lisa R.)"    },
  { id:6,  time:"9:41 AM",           app:"SharePoint", appColor:"#0078d4", action:"Document ingested",     detail:"Kendall_Fresh_Plaza_OM.pdf auto-detected — 18 fields extracted, 10 tenant rows processed",                               type:"ingest", user:"AI (Automated)"  },
  { id:7,  time:"9:30 AM",           app:"Teams",      appColor:"#5558af", action:"Report delivered",      detail:"Weekly Prospecting Report — Week of March 23 sent to #leasing-team channel",                                             type:"send",   user:"AI (Automated)"  },
  { id:8,  time:"9:15 AM",           app:"Outlook",    appColor:"#0078d4", action:"Calendar event created",detail:"Tour scheduled: Clean Juice at Town & Country Endcap — Mar 28, 2:00 PM",                                               type:"write",  user:"AI (Lisa R.)"    },
  { id:9,  time:"Yesterday 4:52 PM", app:"HubSpot",    appColor:"#ff7a59", action:"Lead exported",         detail:"5 OM Library leads exported to HubSpot for Wynwood Suite 104",                                                           type:"write",  user:"AI (Lisa R.)"    },
  { id:10, time:"Yesterday 3:10 PM", app:"SharePoint", appColor:"#0078d4", action:"Document read",         detail:"Read Wynwood Retail Financials Jan-Feb 2026 and Rent Roll for monthly report generation",                                type:"read",   user:"AI (Sarah M.)"   },
];

// ── INTEGRATIONS ───────────────────────────────────────────────────────────
export const INTEGRATION_GROUPS = [
  { cat:"Document & File Management", desc:"Connect your document storage so the AI can read, write, and organize files automatically.", integrations:[
    { name:"Microsoft SharePoint",        status:"connected",  desc:"Primary document store. AI reads leases, rent rolls, OMs, and reports. Saves generated documents directly.", logo:"SP", color:"#0078d4", tag:"Core"        },
    { name:"Microsoft OneDrive",          status:"available",  desc:"Personal file sync for team members. Connect to allow AI access to files in individual drives.",              logo:"OD", color:"#0078d4", tag:null           },
    { name:"Google Drive",                status:"available",  desc:"Connect Google Drive to index and search documents stored outside SharePoint.",                               logo:"GD", color:"#34a853", tag:null           },
    { name:"Dropbox",                     status:"available",  desc:"Sync Dropbox folders for document access and auto-saving AI-generated files.",                               logo:"DB", color:"#0061ff", tag:null           },
  ]},
  { cat:"Email & Calendar", desc:"Let the AI send outreach, schedule tours, and sync with your calendar.", integrations:[
    { name:"Gmail",                       status:"available",  desc:"Send AI-drafted outreach emails directly from Gmail. Track opens and replies in the pipeline.",              logo:"GM", color:"#ea4335", tag:"Recommended"  },
    { name:"Microsoft Outlook",           status:"connected",  desc:"Send and receive emails through Outlook. AI drafts sent with your signature from AI Settings.",             logo:"OL", color:"#0078d4", tag:"Core"         },
    { name:"Google Calendar",             status:"available",  desc:"Sync property tours and follow-up reminders directly to Google Calendar.",                                   logo:"GC", color:"#4285f4", tag:null           },
    { name:"Microsoft Calendar",          status:"connected",  desc:"Tour scheduling and reminders sync automatically when a prospect advances stages.",                          logo:"MC", color:"#0078d4", tag:null           },
  ]},
  { cat:"CRM & Sales", desc:"Keep your CRM in sync with the AI's prospecting engine.", integrations:[
    { name:"HubSpot",                     status:"connected",  desc:"Two-way sync. Prospects export from OM Library and Tenant Prospecting into HubSpot automatically.",         logo:"HS", color:"#ff7a59", tag:"Core"         },
    { name:"Salesforce",                  status:"available",  desc:"Push qualified leads and pipeline data into Salesforce. Supports custom field mapping for CRE.",             logo:"SF", color:"#00a1e0", tag:null           },
    { name:"Yardi",                       status:"connected",  desc:"Pulls live tenant data, rent rolls, and expiration dates. Used to flag at-risk tenants.",                   logo:"YD", color:"#e63946", tag:"Core"         },
    { name:"AppFolio",                    status:"available",  desc:"Connect for property management data including work orders and collections rates.",                          logo:"AF", color:"#6366f1", tag:null           },
  ]},
  { cat:"Data & Market Intelligence", desc:"Feed the AI with live market data so comps and scoring stay current.", integrations:[
    { name:"CoStar",                      status:"available",  desc:"Pull live lease comps, sales comps, and market vacancy data into the Comps Engine.",                        logo:"CS", color:"#1a56db", tag:"Recommended"  },
    { name:"Crexi",                       status:"available",  desc:"Sync new OM listings from Crexi automatically into the Ingestion Queue.",                                   logo:"CX", color:"#f59e0b", tag:null           },
    { name:"LoopNet",                     status:"available",  desc:"Monitor LoopNet for new listings matching MMG's acquisition criteria. Auto-ingest matching OMs.",           logo:"LN", color:"#003087", tag:null           },
    { name:"Reonomy",                     status:"available",  desc:"Enrich property records with ownership history, debt, and tax data.",                                        logo:"RE", color:"#7c3aed", tag:null           },
  ]},
  { cat:"Communication & Collaboration", desc:"Keep your team aligned with AI-generated summaries and alerts.", integrations:[
    { name:"Microsoft Teams",             status:"connected",  desc:"Receive weekly prospecting reports, lease expiration alerts, and deal updates in Teams channels.",          logo:"MT", color:"#5558af", tag:"Core"         },
    { name:"Slack",                       status:"available",  desc:"Post AI-generated alerts and reports to Slack channels. Supports custom notification rules.",               logo:"SL", color:"#4a154b", tag:null           },
    { name:"Zoom",                        status:"available",  desc:"Generate meeting summaries after tenant calls and add them to the prospect's pipeline card.",               logo:"ZM", color:"#2d8cff", tag:null           },
  ]},
  { cat:"AI & Automation", desc:"The AI services powering document extraction, scoring, drafting, and market intelligence.", integrations:[
    { name:"Claude (Anthropic)",          status:"connected",  desc:"Core AI engine. Powers document Q&A, outreach drafting, property summaries, IC memos, and all NL features.",logo:"CL", color:"#d97706", tag:"Core"         },
    { name:"Azure Document Intelligence", status:"connected",  desc:"Extracts structured data from OMs and rent rolls during ingestion. Handles Pass 1 and Pass 2 pipeline.",   logo:"AZ", color:"#0078d4", tag:"Core"         },
    { name:"Zapier",                      status:"available",  desc:"Build custom automation workflows between MMG's AI platform and any other tool in your stack.",             logo:"ZP", color:"#ff4a00", tag:null           },
    { name:"Make (Integromat)",           status:"available",  desc:"Advanced workflow automation for complex multi-step triggers and data routing across systems.",             logo:"MK", color:"#6d28d9", tag:null           },
  ]},
];
