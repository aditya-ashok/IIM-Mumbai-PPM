import { useState, useEffect } from "react";

const categories = {
  distributive: {
    label: "Distributive",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    description:
      "Policies that allocate tangible benefits — subsidies, grants, infrastructure spending — to specific groups or sectors. Costs are diffused across taxpayers; benefits are concentrated.",
    icon: "📦",
  },
  redistributive: {
    label: "Redistributive",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    description:
      "Policies that deliberately transfer resources or opportunities from one broad class to another — typically via taxation, social insurance, or entitlement expansion.",
    icon: "⚖️",
  },
  regulatory: {
    label: "Regulatory",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    description:
      "Policies that impose rules, standards, or constraints on private-sector conduct to correct market failures, protect consumers, or ensure fair competition.",
    icon: "📋",
  },
  constituent: {
    label: "Constituent",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#c4b5fd",
    description:
      "Policies that create, reorganise, or restructure government institutions, administrative processes, or the rules of political participation itself.",
    icon: "🏛️",
  },
  morality: {
    label: "Morality",
    color: "#be185d",
    bg: "#fdf2f8",
    border: "#f9a8d4",
    description:
      "Policies driven by moral or ethical values rather than economic cost-benefit — regulating personal conduct, social norms, or culturally sensitive issues.",
    icon: "⚖️",
  },
};

const policies = [
  { cat: "distributive", sector: "Finance", title: "Credit Guarantee Scheme for MSMEs", detail: "60% guarantee on loans up to ₹100 crore for MSME equipment purchases; total guarantee cap of ₹7 lakh crore." },
  { cat: "distributive", sector: "Finance", title: "Collateral-Free Agricultural Loans — limit raised", detail: "RBI raised the collateral-free farm loan ceiling from ₹1.6 lakh to ₹2 lakh per borrower." },
  { cat: "distributive", sector: "Finance", title: "NPS Vatsalya — Pension Scheme for Minors", detail: "National Pension System extended to minors (below 18); minimum ₹1,000 to open, transitions to regular NPS at 18." },
  { cat: "distributive", sector: "Finance", title: "UPI Incentive Scheme for Low-Value Transactions", detail: "₹1,500 crore outlay; 0.15% incentive per P2M transaction up to ₹2,000 to promote digital payments among small merchants." },
  { cat: "distributive", sector: "Agriculture", title: "MSP for Kharif & Rabi Crops 2024-25", detail: "Assured procurement prices increased across crops — paddy +5%, tur +8%, wheat +6.6%, nigerseed +13%." },
  { cat: "distributive", sector: "Agriculture", title: "PM Annadata Aay Sanrakshan Abhiyan (PM-AASHA)", detail: "Continuation of Price Support, Price Stabilisation Fund, Price Deficit Payment & Market Intervention schemes; ₹35,000 crore outlay." },
  { cat: "distributive", sector: "Agriculture", title: "Nutrient Based Subsidy on Fertilisers (Rabi & Kharif)", detail: "₹24,476 crore for Rabi 2024 and ₹37,216 crore for Kharif 2025 on P&K fertilisers." },
  { cat: "distributive", sector: "Agriculture", title: "Clean Plant Programme", detail: "₹1,766 crore to set up 9 Clean Plant Centres for virus-free planting material; certification under Seeds Act." },
  { cat: "distributive", sector: "Agriculture", title: "National Mission on Edible Oils — Oilseeds", detail: "₹10,103 crore (2024-31) to raise primary oilseed production from 39 MT to 70 MT; 65 new seed hubs." },
  { cat: "distributive", sector: "Agriculture", title: "Agriculture Infrastructure Fund — Expansion", detail: "AIF expanded to cover community farming assets and integrated processing projects; 500 lakh tonnes additional storage created." },
  { cat: "distributive", sector: "Agriculture", title: "Credit Guarantee Scheme for e-NWR Pledge Financing", detail: "₹1,000 crore corpus; guarantee cover of 75-85% on loans up to ₹75 lakh (agricultural) / ₹2 crore (non-agricultural)." },
  { cat: "distributive", sector: "Commerce & Industry", title: "Electronics Component Manufacturing Scheme", detail: "₹22,919 crore to attract investment in domestic electronics component manufacturing and global value chains." },
  { cat: "distributive", sector: "Commerce & Industry", title: "New Industrial Corridor Nodes", detail: "12 new industrial smart cities across 10 states under the National Industrial Corridor Programme; ₹28,602 crore investment." },
  { cat: "distributive", sector: "Commerce & Industry", title: "Diamond Imprest Authorisation Scheme", detail: "Duty-free import of small natural diamonds (< ¼ carat) for exporters meeting turnover thresholds; effective April 2025." },
  { cat: "distributive", sector: "Commerce & Industry", title: "Ethanol Interest Subvention for Cooperative Sugar Mills", detail: "6% interest subvention (or 50% of interest) for 5 years to convert sugarcane ethanol plants to multi-feedstock." },
  { cat: "distributive", sector: "Commerce & Industry", title: "BioE3 Policy — High-Performance Biomanufacturing", detail: "Innovation support for bio-based R&D across climate-resilient agriculture, marine research, biopolymers; Bio-AI hubs." },
  { cat: "distributive", sector: "Commerce & Industry", title: "₹1,000 Crore VC Fund for Space Startups", detail: "INSPACe venture capital fund for space-based startups; ₹150-200 crore/year over 2025-30; investments of ₹10-60 crore per startup." },
  { cat: "distributive", sector: "Electricity", title: "Viability Gap Funding for Offshore Wind Energy", detail: "₹6,853 crore support for 1 GW offshore wind (500 MW each off Gujarat & Tamil Nadu); ₹600 crore for port upgrades." },
  { cat: "distributive", sector: "Electricity", title: "Model Solar Village Scheme", detail: "₹1 crore per district to solarise one village; competition-based selection under PM-Surya Ghar Yojana." },
  { cat: "distributive", sector: "Electricity", title: "Green Hydrogen Production Incentive (SIGHT Tranche-II)", detail: "4,50,000 MT capacity allocation via bidding; incentive up to ₹50/kg (year 1), declining over 3 years." },
  { cat: "distributive", sector: "Petroleum", title: "PM JI-VAN Yojana Modifications", detail: "Extended 5 years (to 2028-29); expanded to support second-gen ethanol from agricultural residues, industrial waste, algae." },
  { cat: "distributive", sector: "Rural Development", title: "PMGSY-IV — Rural Roads", detail: "₹70,125 crore (2024-29) to build 62,500 km roads connecting 25,000 unconnected habitations." },
  { cat: "distributive", sector: "Housing", title: "PMAY — Gramin Continuation", detail: "₹3,06,137 crore over 5 years for 2 crore additional pucca houses; ₹1.20-1.30 lakh per house." },
  { cat: "distributive", sector: "Education", title: "PM Vidyalakshmi — Student Loans", detail: "Collateral-free loans for students in top-ranked institutions; 3% interest subvention on loans up to ₹10 lakh for families earning ≤ ₹8 lakh." },
  { cat: "distributive", sector: "Science & Tech", title: "Vigyan Dhara Scheme", detail: "₹10,580 crore over 5 years merging 3 R&D schemes; research labs, transnational collaboration, women in science." },
  { cat: "distributive", sector: "Tribal Affairs", title: "PM Janjatiya Unnat Gram Abhiyan", detail: "₹79,156 crore over 5 years covering 63,000 villages; 25 interventions across housing, roads, water, health, education." },
  { cat: "distributive", sector: "Home Affairs", title: "National Forensic Infrastructure Enhancement Scheme", detail: "₹2,254 crore (2024-29) for NFSU campuses, Central Forensic Science Laboratories; target >90% conviction rate." },
  { cat: "distributive", sector: "Corporate Affairs", title: "PM Internship Scheme — Pilot", detail: "1.25 lakh internships in top-500 CSR companies; ₹5,000/month stipend (₹500 from company CSR + ₹4,500 from Centre)." },
  { cat: "distributive", sector: "Skill Development", title: "Skill India Programme Continuation", detail: "₹8,800 crore (2022-26); combines PMKVY, apprenticeship promotion, and Jan Shikshan Sansthan schemes." },
  { cat: "distributive", sector: "Health", title: "Ni-kshay Poshan Yojana Expansion (TB Nutrition)", detail: "Monthly support doubled from ₹500 to ₹1,000 per TB patient; nutritional supplements for underweight patients; ₹1,040 crore." },
  { cat: "distributive", sector: "Agriculture", title: "National Mission on Natural Farming", detail: "₹2,481 crore; 15,000 clusters, 1 crore farmers, 7.5 lakh hectares; 30,000 Krishi Sakhis; model demo farms." },
  { cat: "distributive", sector: "Agriculture", title: "PM-RKVY & Krishonnati Yojana (Rationalised)", detail: "₹57,075 crore for sustainable agriculture + ₹44,247 crore for food security; states can reallocate between components." },
  { cat: "distributive", sector: "Agriculture", title: "Free Fortified Rice under PMGKAY (Extended)", detail: "Free supply of micronutrient-enriched rice extended from July 2024 to December 2028 under all welfare schemes." },
  { cat: "redistributive", sector: "Finance", title: "Union Budget 2025-26 — Tax Reforms", detail: "New tax slabs: 100% rebate on income up to ₹12 lakh; enhanced TDS/TCS limits; fiscal deficit target 4.4% of GDP." },
  { cat: "redistributive", sector: "Finance", title: "Unified Pension Scheme (UPS)", detail: "Assured 50% pension of last-12-month average pay for 25+ years of service; inflation-indexed; 60% family pension. Government contribution raised from 14% to 18.5%." },
  { cat: "redistributive", sector: "Health", title: "Ayushman Bharat Expansion to All Senior Citizens (70+)", detail: "₹5 lakh cashless hospitalisation extended to all citizens aged 70+; additional ₹5 lakh for those already covered; 4.5 crore families added." },
  { cat: "redistributive", sector: "Housing", title: "PMAY — Urban 2.0", detail: "₹2.3 lakh crore for 1 crore urban families; ₹2.5 lakh for construction, 4% interest subsidy, affordable rental housing models." },
  { cat: "redistributive", sector: "Finance", title: "RBI Priority Sector Lending — Revised Directions", detail: "Urban cooperative banks' PSL target fixed at 60%; renewable energy loan limit raised to ₹35 crore; transgenders added to weaker sections." },
  { cat: "redistributive", sector: "Finance", title: "Income Tax Bill, 2025", detail: "Replaces 1961 Act; retains most rates but expands search powers to virtual digital spaces; virtual digital assets included in undisclosed income." },
  { cat: "regulatory", sector: "Finance", title: "RBI Directions on Wilful & Large Defaulters", detail: "Classification procedure for wilful defaulters (≥ ₹25 lakh); covers diversion of funds, siphoning, disposal of secured assets without consent." },
  { cat: "regulatory", sector: "Finance", title: "IRDAI Master Circular on Health Insurance", detail: "Supersedes 55 circulars; mandates coverage for all ages/conditions; cashless settlement within 1 hour; Customer Information Sheet in simple language." },
  { cat: "regulatory", sector: "Finance", title: "RBI Directions for Asset Reconstruction Companies", detail: "Minimum NOF ₹300 crore (₹1,000 crore for IBC resolution); mandatory security receipt rating within 6 months; board-approved acquisition policy." },
  { cat: "regulatory", sector: "Finance", title: "RBI — Housing Finance Company Framework Amended", detail: "Deposit-accepting HFCs to be regulated at par with NBFCs; harmonised regulatory parameters." },
  { cat: "regulatory", sector: "Finance", title: "RBI — P2P Lending Platform Directions Revised", detail: "Platforms cannot assume credit risk; must disclose NPA performance and all lender losses; banned promoting P2P as assured-return investment." },
  { cat: "regulatory", sector: "Finance", title: "SEBI — Mutual Fund & AMC Regulations", detail: "New investment product (min ₹10 lakh); passive fund framework; mandatory institutional mechanisms against front-running and market abuse." },
  { cat: "regulatory", sector: "Finance", title: "SEBI — SME Listing Framework Amended", detail: "SMEs must show operating profit of ₹1 crore in 2 of 3 previous years; no listing for repaying promoter loans." },
  { cat: "regulatory", sector: "Finance", title: "SEBI — FPI Disclosure Threshold Raised", detail: "Disclosure threshold for FPIs raised from ₹25,000 crore to ₹50,000 crore; university funds exempted under certain conditions." },
  { cat: "regulatory", sector: "Finance", title: "SEBI — Real-Time Price Data Sharing Norms", detail: "Stock exchanges barred from sharing real-time data with gaming/virtual-trading platforms; 1-day lag for investor education." },
  { cat: "regulatory", sector: "Finance", title: "SEBI — Bar on Association with Unregistered Advisors", detail: "SEBI-regulated entities prohibited from monetary transactions, client referrals, or IT integration with unregistered advisory persons." },
  { cat: "regulatory", sector: "Finance", title: "Cross-Border Equity Swaps Permitted", detail: "FEMA rules amended to allow equity swaps between residents and non-residents; 100% FDI in white-label ATMs via automatic route." },
  { cat: "regulatory", sector: "Finance", title: "SEBI — Cybersecurity & AI Frameworks", detail: "Cybersecurity framework for all SEBI entities (data localisation, classification); AI tool framework making entities responsible for outputs." },
  { cat: "regulatory", sector: "Mines", title: "Offshore Mineral Conservation & Development Rules", detail: "Mandatory exploration and production plans; 15-second buffer zones; no mining within 1 nautical mile of shore; up to 5-year imprisonment for violations." },
  { cat: "regulatory", sector: "Mines", title: "Offshore Mineral Trust & Auction Rules", detail: "Production and composite licences via auction; 10% royalty contribution to Offshore Mineral Trust Fund; performance security requirements." },
  { cat: "regulatory", sector: "Commerce & Industry", title: "Boilers Bill, 2024", detail: "Replaces 1923 Act; retains all provisions for safe manufacture, installation, use, and repair of boilers with enhanced clarity." },
  { cat: "regulatory", sector: "Commerce & Industry", title: "Oilfields (Regulation & Development) Amendment Bill", detail: "Expanded definition of mineral oils to include CBM, shale gas/oil; introduced petroleum lease concept; added penalties." },
  { cat: "regulatory", sector: "Commerce & Industry", title: "MSME Classification Thresholds Revised", detail: "Investment and turnover limits raised across all categories — Micro: ₹2.5 cr / ₹10 cr; Small: ₹25 cr / ₹100 cr; Medium: ₹125 cr / ₹500 cr." },
  { cat: "regulatory", sector: "Telecom & IT", title: "TRAI — Telecom Infrastructure & Spectrum Sharing", detail: "Recommended sharing of all passive/active infrastructure; spectrum sharing with 2-year lock-in; 0.5% government fee on shared spectrum." },
  { cat: "regulatory", sector: "Telecom & IT", title: "Aadhaar Authentication Rules Amended", detail: "Added 'promoting ease of living' as purpose; non-government entities can now propose Aadhaar authentication uses." },
  { cat: "regulatory", sector: "Electricity", title: "CERC — Inter-State Transmission Licence Regulations", detail: "Exemption for distribution licensees and bulk consumers (33 kV+); additional works can be added to existing licences without fresh licences." },
  { cat: "regulatory", sector: "Electricity", title: "Cross-Border Electricity Trade Guidelines Amended", detail: "Central government can permit additional fuel sources for coal/gas electricity exports; export-oriented generators can sell domestically under conditions." },
  { cat: "regulatory", sector: "Civil Aviation", title: "Bharatiya Vayuyan Vidheyak, 2024", detail: "Replaces Aircraft Act, 1934; establishes DGCA, BCAS, AAIB; adds aircraft design regulation; two-tier appellate mechanism; penalties up to ₹1 crore." },
  { cat: "regulatory", sector: "Civil Aviation", title: "Aircraft Security Rules Amended", detail: "DG BCAS can refuse entry/require exit from aircraft; prohibition on communicating false safety information; penalties up to ₹1 crore." },
  { cat: "regulatory", sector: "Civil Aviation", title: "Protection of Interests in Aircraft Objects Bill", detail: "Implements Cape Town Convention; creditor remedies within 2 months on debtor default; government entities can detain assets for unpaid dues." },
  { cat: "regulatory", sector: "Shipping", title: "Merchant Shipping Bill, 2024", detail: "Mandatory registration for all vessels; relaxed ownership criteria to include OCIs and partial ownership; foreign chartered vessels registrable." },
  { cat: "regulatory", sector: "Shipping", title: "Coastal Shipping Bill, 2024", detail: "Coasting trade expanded to include services; Indian-owned vessels exempt from licence; specific grounds for licence revocation." },
  { cat: "regulatory", sector: "Shipping", title: "Bills of Lading Bill, 2024", detail: "Replaces 1856 Act; retains bill of lading as conclusive evidence of goods; adds central government power to issue directions." },
  { cat: "regulatory", sector: "Shipping", title: "Carriage of Goods by Sea Bill, 2024", detail: "Replaces 1925 Act; retains Hague Rules framework; central government empowered to amend schedule and issue directions." },
  { cat: "regulatory", sector: "Road Transport", title: "Voluntary Vehicle Modernisation Programme", detail: "Vehicle scrapping policy: network of scrapping facilities, automated testing stations; manufacturer discounts on new vehicles against scrappage certificates." },
  { cat: "regulatory", sector: "Environment", title: "Public Liability Insurance Rules Amended", detail: "Max insurer liability raised from ₹5 crore to ₹250 crore per accident; ₹5 lakh relief for death; ₹50 lakh cap for property damage." },
  { cat: "regulatory", sector: "Environment", title: "End-of-Life Vehicles Rules, 2025", detail: "EPR obligations on producers; 8% steel scrapping target; 180-day deposit deadline; environmental compensation for damage." },
  { cat: "regulatory", sector: "Education", title: "UGC — Faculty & VC Appointment Draft Regulations", detail: "VCs appointable from industry/public policy; search committee constituted by Chancellor/Visitor; contract faculty 6-month cap, no 10% limit." },
  { cat: "regulatory", sector: "Education", title: "RTE Rules Amended — Holding Back Students", detail: "Students in classes 5 and 8 can be held back after failing re-examination; exams must test competency, not memorisation." },
  { cat: "regulatory", sector: "Education", title: "UGC PG Curriculum & Credit Framework", detail: "Flexibility to switch subjects in PG; credits from industry engagements; exit with PG diploma after 1 year; continuous assessment." },
  { cat: "regulatory", sector: "Health", title: "Uniform Code for Medical Device Marketing", detail: "Prohibits unqualified 'safe' claims; brand reminders capped at ₹1,000; Ethics Committees in industry associations; penalties for violations." },
  { cat: "regulatory", sector: "Media", title: "TRAI — Broadcasting & Cable Tariff/QoS Amended", detail: "NCF ceiling removed; DPO discounts raised to 45%; financial penalties for violations; HD/SD carriage fee distinction removed." },
  { cat: "regulatory", sector: "Finance", title: "Banking Laws (Amendment) Bill, 2024", detail: "Up to 4 nominees for bank deposits; fortnight redefined for cash reserves; cooperative bank director tenure raised to 10 years." },
  { cat: "regulatory", sector: "Law & Justice", title: "Bombay HC Struck Down IT Rules (Fact Check Unit)", detail: "Court held government-appointed FCU violates free speech (Art 19); terms 'false or misleading' vague; exceeded scope of IT Act." },
  { cat: "regulatory", sector: "Minority Affairs", title: "Waqf (Amendment) Bill, 2024", detail: "5-year Muslim practice required for waqf declaration; waqf-by-user removed; government property ceases to be waqf; non-Muslims on Council/Boards." },
  { cat: "constituent", sector: "Finance", title: "Eighth Central Pay Commission Approved", detail: "Constitution approved for central government employees; Seventh Pay Commission recommendations expire in 2026." },
  { cat: "constituent", sector: "Finance", title: "RBI — Small Finance Bank to Universal Bank Transition", detail: "Voluntary transition path: 5-year track record, listed shares, ₹1,000 crore net worth, 2-year profitability; diversified portfolio preferred." },
  { cat: "constituent", sector: "Law & Justice", title: "Simultaneous Elections — 129th Constitutional Amendment Bill", detail: "Synchronise Lok Sabha and all State Assembly elections; fresh elections for remainder of 5-year term on premature dissolution; referred to JPC." },
  { cat: "constituent", sector: "Law & Justice", title: "Union Territories Laws (Amendment) Bill, 2024", detail: "Implements simultaneous elections for UT legislatures (Puducherry, Delhi, J&K); amends GNCTD Act, J&K Reorganisation Act." },
  { cat: "constituent", sector: "Home Affairs", title: "Disaster Management (Amendment) Bill, 2024", detail: "States empowered to create Urban Disaster Management Authorities and State Disaster Response Forces; NDMA to audit state preparedness." },
  { cat: "constituent", sector: "Home Affairs", title: "Immigration and Foreigners Bill, 2025", detail: "Consolidates 4 Acts; establishes Bureau of Immigration; registration of foreigners; educational/medical institutions must report foreign nationals." },
  { cat: "constituent", sector: "Railways", title: "Railways (Amendment) Bill, 2024", detail: "Repeals Railway Board Act, 1905; incorporates its provisions into Railways Act, 1989 — structural consolidation." },
  { cat: "constituent", sector: "Shipping", title: "Indian Ports Bill, 2025", detail: "Establishes Maritime State Development Council; statutory recognition to State Maritime Boards; Dispute Resolution Committees in states." },
  { cat: "constituent", sector: "Telecom & IT", title: "TRAI — Regulatory Sandbox Framework", detail: "Test environment for new digital communication services; 12-month permissions; oversight by National Telecom institute; DBN funding possible." },
  { cat: "constituent", sector: "Mines", title: "SC Upheld States' Power to Tax Mineral-Bearing Lands", detail: "Royalty is not a tax; states can tax mineral lands based on mineral value; Parliament cannot limit states' taxing powers on minerals." },
  { cat: "constituent", sector: "Law & Justice", title: "SC Struck Down Domicile Reservations in PG Medical", detail: "Residence-based reservation in PG medical violates Art 14; all state-quota PG seats to be filled on NEET merit; institutional preferences upheld." },
  { cat: "constituent", sector: "Law & Justice", title: "SC Ruled Against Unilateral Arbitrator Appointment", detail: "Government/PSUs cannot unilaterally appoint arbitrators; equal treatment extends to all stages including appointment; violates Art 14." },
  { cat: "constituent", sector: "Sports", title: "Draft National Sports Governance Bill, 2024", detail: "Creates Sports Regulatory Board of India; regulates NOC, NPC, NSFs; Appellate Sports Tribunal; 10% Sportspersons of Outstanding Merit in General Body." },
  { cat: "constituent", sector: "Law & Justice", title: "Goa ST Assembly Reservation Bill, 2024", detail: "Seeks to reserve seats in Goa Legislative Assembly for Scheduled Tribes based on 2001 Census." },
  { cat: "constituent", sector: "Home Affairs", title: "India-Bangladesh Border Monitoring Committee", detail: "5-member committee under ADG BSF Eastern Command to monitor border situation and ensure safety of Indian citizens/minorities." },
  { cat: "constituent", sector: "Education", title: "Tribhuvan Sahkari University Bill, 2025", detail: "Establishes IRMA (Gujarat) as Tribhuvan Sahkari University; preserves IRMA's autonomous identity within university framework." },
  { cat: "constituent", sector: "Education", title: "CBSE Draft — Two Board Exams per Year for Class X", detail: "From 2026, two exam windows (Feb-Mar and May); results released together; aims to reduce exam pressure." },
  { cat: "constituent", sector: "Finance", title: "SEBI — Same-Day Settlement Scope Expanded", detail: "Optional T+0 settlement expanded from top 25 to top 500 companies by market cap; co-exists with T+1." },
];

const sectorColors = {
  Finance: "#1e40af", Agriculture: "#15803d", "Commerce & Industry": "#b45309",
  "Telecom & IT": "#0e7490", Electricity: "#ca8a04", Petroleum: "#78350f",
  Railways: "#6b21a8", "Civil Aviation": "#0369a1", Shipping: "#1e3a5f",
  "Road Transport": "#92400e", Environment: "#166534", Education: "#7e22ce",
  Health: "#be123c", "Rural Development": "#4d7c0f", Housing: "#9333ea",
  "Tribal Affairs": "#a16207", "Home Affairs": "#64748b", "Law & Justice": "#475569",
  "Minority Affairs": "#6d28d9", Media: "#0891b2", "Corporate Affairs": "#059669",
  "Skill Development": "#d97706", Sports: "#dc2626", "Science & Tech": "#2563eb",
  Mines: "#57534e",
};

// --- localStorage persistence helpers ---
const STORAGE_KEY = "lowi_policy_responses";
const USER_KEY = "lowi_participant";
const CHOICES_KEY = "lowi_participant_choices";

function loadResponses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveResponses(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadParticipant() {
  try { return localStorage.getItem(USER_KEY) || ""; } catch { return ""; }
}

function saveParticipant(name) {
  localStorage.setItem(USER_KEY, name);
}

function loadChoices() {
  try {
    const raw = localStorage.getItem(CHOICES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveChoices(data) {
  localStorage.setItem(CHOICES_KEY, JSON.stringify(data));
}

// --- Feedback panel for each policy ---
function PolicyFeedback({ policyIndex, responses, onUpdate }) {
  const key = `policy_${policyIndex}`;
  const current = responses[key] || { stance: null, comment: "" };
  const [comment, setComment] = useState(current.comment);
  const [editing, setEditing] = useState(false);

  const setStance = (stance) => {
    const updated = { ...current, stance, comment: current.comment };
    onUpdate(key, updated);
  };

  const saveComment = () => {
    const updated = { ...current, comment };
    onUpdate(key, updated);
    setEditing(false);
  };

  const btnStyle = (isActive, color) => ({
    padding: "6px 16px",
    border: `2px solid ${isActive ? color : "#d5d5d0"}`,
    borderRadius: 6,
    background: isActive ? color : "#fff",
    color: isActive ? "#fff" : "#666",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "inherit",
    transition: "all 0.15s",
  });

  return (
    <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px dashed #e0e0dc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: "#999", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
          Classification:
        </span>
        <button style={btnStyle(current.stance === "agree", "#16a34a")} onClick={(e) => { e.stopPropagation(); setStance(current.stance === "agree" ? null : "agree"); }}>
          Agree
        </button>
        <button style={btnStyle(current.stance === "disagree", "#dc2626")} onClick={(e) => { e.stopPropagation(); setStance(current.stance === "disagree" ? null : "disagree"); }}>
          Disagree
        </button>
      </div>
      <div>
        {!editing && !current.comment && (
          <button
            onClick={(e) => { e.stopPropagation(); setEditing(true); }}
            style={{ fontSize: 12, color: "#888", background: "none", border: "1px dashed #ccc", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontFamily: "inherit" }}
          >
            + Add comment
          </button>
        )}
        {!editing && current.comment && (
          <div
            onClick={(e) => { e.stopPropagation(); setEditing(true); }}
            style={{ fontSize: 12, color: "#555", background: "#f8f8f5", borderRadius: 6, padding: "8px 12px", cursor: "pointer", lineHeight: 1.5, border: "1px solid #e8e8e4" }}
          >
            <span style={{ fontWeight: 600, color: "#999", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>Comment: </span>
            {current.comment}
          </div>
        )}
        {editing && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }} onClick={(e) => e.stopPropagation()}>
            <textarea
              autoFocus
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Why do you agree/disagree with this classification?"
              style={{
                flex: 1, padding: "8px 12px", border: "1px solid #d5d5d0", borderRadius: 6,
                fontSize: 13, fontFamily: "inherit", resize: "vertical", minHeight: 60, outline: "none",
              }}
            />
            <button
              onClick={saveComment}
              style={{
                padding: "8px 16px", background: "#1a1a2e", color: "#fff", border: "none",
                borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit",
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Participant classification choice per policy ---
function PolicyChoice({ policyIndex, choices, onUpdate, participant }) {
  const key = `policy_${policyIndex}`;
  const current = choices[key] || null;

  if (!participant) return null;

  return (
    <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px dashed #d0d0cc" }}>
      <div style={{ fontSize: 11, color: "#999", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
        Your Classification ({participant}):
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {Object.entries(categories).map(([key2, cat]) => {
          const isSelected = current === key2;
          return (
            <button
              key={key2}
              onClick={(e) => { e.stopPropagation(); onUpdate(key, isSelected ? null : key2); }}
              style={{
                padding: "5px 14px",
                border: `2px solid ${isSelected ? cat.color : "#e0e0dc"}`,
                borderRadius: 6,
                background: isSelected ? cat.color : "#fff",
                color: isSelected ? "#fff" : "#888",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              {cat.icon} {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Public Procurement Tab ---
function PublicProcurement() {
  const sectionStyle = { background: "#fff", borderRadius: 10, padding: "20px", border: "1px solid #e5e5e0", marginBottom: 16 };
  const ruleStyle = { background: "#f8fafc", borderRadius: 8, padding: "14px 16px", border: "1px solid #e2e8f0", marginBottom: 10, borderLeft: "4px solid #1e40af" };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
      {/* Header */}
      <div style={{ ...sectionStyle, borderLeft: "4px solid #1e40af" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" }}>
          Public Procurement of Goods Above ₹50 Lakh
        </h2>
        <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
          Conditions and procedures as per General Financial Rules (GFR), 2017 — Government of India, Ministry of Finance, Department of Expenditure
        </div>
      </div>

      {/* GFR Overview */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>Applicable GFR Rules</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 16 }}>
          {[
            { rule: "Rule 149", desc: "Fundamental principles of public buying" },
            { rule: "Rule 154", desc: "Modes of procurement" },
            { rule: "Rule 155", desc: "Advertised Tender Enquiry" },
            { rule: "Rule 156", desc: "Limited Tender Enquiry" },
            { rule: "Rule 157", desc: "Single Tender Enquiry" },
            { rule: "Rule 158", desc: "Two-Stage Bidding" },
            { rule: "Rule 160", desc: "Bid Security (EMD)" },
            { rule: "Rule 161", desc: "Performance Security" },
            { rule: "Rule 166", desc: "Procurement from GeM" },
            { rule: "Rule 170", desc: "Contract management" },
          ].map((r, i) => (
            <div key={i} style={{ background: "#eff6ff", borderRadius: 8, padding: "10px", textAlign: "center", border: "1px solid #bfdbfe" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#1e40af" }}>{r.rule}</div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 4, lineHeight: 1.3 }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Conditions for > 50 Lakh */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 }}>
          Mandatory Conditions for Procurement of Goods Above ₹50 Lakh
        </div>
        <div style={{ fontSize: 12, color: "#777", marginBottom: 16 }}>As per GFR 2017, Rules 149-170</div>

        <div style={ruleStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 6 }}>1. Advertised Tender Enquiry (ATE) — Rule 155</div>
          <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
            For estimated value above ₹25 lakh, Open Tender / Advertised Tender Enquiry is <strong>mandatory</strong>. The tender must be published on the Central Public Procurement Portal (CPPP) and the departmental website. For goods above ₹50 lakh, this is the default and preferred mode. Minimum bid submission period is <strong>21 days</strong> from the date of publication (can be relaxed to 14 days in emergencies with recorded reasons).
          </div>
        </div>

        <div style={ruleStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 6 }}>2. e-Procurement — Rule 159</div>
          <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
            All Ministries/Departments must mandatorily use e-procurement for tenders above ₹10 lakh. For goods above ₹50 lakh, the entire process — publication, bid submission, opening — must be conducted through the <strong>Central Public Procurement Portal (CPPP)</strong> or <strong>Government e-Marketplace (GeM)</strong>.
          </div>
        </div>

        <div style={ruleStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 6 }}>3. Bid Security / Earnest Money Deposit (EMD) — Rule 160</div>
          <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
            Bidders must furnish Bid Security of <strong>2% to 5%</strong> of the estimated value of the goods. For goods above ₹50 lakh, this is typically ₹1-2.5 lakh or more. Bid Security can be in the form of bank guarantee, FDR, or banker's cheque. MSEs registered with NSIC are <strong>exempt</strong> from Bid Security.
          </div>
        </div>

        <div style={ruleStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 6 }}>4. Performance Security — Rule 161</div>
          <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
            The successful bidder must furnish Performance Security of <strong>5% to 10%</strong> of the contract value within 15 days of receipt of the order. For contracts above ₹50 lakh, this is a significant amount and is held until 60 days after contract completion.
          </div>
        </div>

        <div style={ruleStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 6 }}>5. Two-Bid System (Technical + Financial) — Rule 155(vi)</div>
          <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
            For procurement above ₹50 lakh involving complex specifications, the <strong>two-bid system</strong> is recommended: Technical Bid (evaluated first for compliance, quality, specifications) and Financial Bid (opened only for technically qualified bidders). Evaluation criteria must be clearly stated in the tender document.
          </div>
        </div>

        <div style={ruleStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 6 }}>6. Constitution of Purchase Committee — Rule 154</div>
          <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
            Purchases above ₹25 lakh require a duly constituted <strong>Purchase Committee</strong>. For purchases above ₹50 lakh, the committee should include a <strong>finance representative</strong>. The committee evaluates bids, negotiates (if needed — only with L1 bidder), and recommends the award.
          </div>
        </div>

        <div style={ruleStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 6 }}>7. GeM Procurement — Rule 149(i) & Rule 166</div>
          <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
            As per <strong>Rule 149(i)</strong>, procurement of goods available on GeM is <strong>mandatory</strong> through GeM. For goods above ₹50 lakh on GeM, the buyer must use the <strong>GeM Bid/RA (Reverse Auction)</strong> functionality, not direct purchase. All GFR rules on transparency, competition, and fairness apply to GeM procurements.
          </div>
        </div>

        <div style={ruleStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 6 }}>8. Make in India / Purchase Preference — Public Procurement Order 2017</div>
          <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
            <strong>Purchase preference of 20%</strong> to local suppliers (minimum 50% local content) under Make in India. For goods above ₹50 lakh, tenders must specify minimum local content requirements and provide purchase preference to Class-I local suppliers (50%+ local content) over Class-II (20-50%) and non-local suppliers.
          </div>
        </div>

        <div style={ruleStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 6 }}>9. MSE Preference — Rule 153(iv) & PPP-MoMSME Order</div>
          <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
            <strong>25% of annual procurement</strong> must be from Micro and Small Enterprises (MSEs), with <strong>4% from SC/ST</strong> and <strong>3% from women-owned MSEs</strong>. MSEs quoting within L1+15% price band get purchase preference. They are also exempt from bid security and prior turnover/experience criteria.
          </div>
        </div>

        <div style={ruleStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 6 }}>10. Integrity Pact — Rule 175 & CVC Guidelines</div>
          <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
            For procurement above ₹50 lakh (some organisations set ₹1 crore threshold), an <strong>Integrity Pact</strong> must be signed between the buyer and all bidders. An <strong>Independent External Monitor (IEM)</strong> appointed by CVC oversees the procurement process. Violations can lead to debarment, forfeiture of security, and legal action.
          </div>
        </div>
      </div>

      {/* Threshold Summary */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>GFR Procurement Thresholds Summary</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "inherit" }}>
            <thead>
              <tr style={{ background: "#1e40af", color: "#fff" }}>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Value Range</th>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Mode of Procurement</th>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Key Rule</th>
              </tr>
            </thead>
            <tbody>
              {[
                { range: "Up to ₹25,000", mode: "Direct Purchase (petty purchase)", rule: "Rule 154(i)" },
                { range: "₹25,001 to ₹2,50,000", mode: "Purchase without quotation / PAC approval", rule: "Rule 154(ii)" },
                { range: "₹2,50,001 to ₹25,00,000", mode: "Limited Tender Enquiry (min 3 quotations)", rule: "Rule 156" },
                { range: "Above ₹25,00,000", mode: "Advertised / Open Tender Enquiry", rule: "Rule 155" },
                { range: "Above ₹50,00,000", mode: "ATE + Two-Bid + Purchase Committee + e-Procurement", rule: "Rules 155, 159" },
              ].map((r, i) => (
                <tr key={i} style={{ background: i === 4 ? "#eff6ff" : i % 2 ? "#f8fafc" : "#fff", fontWeight: i === 4 ? 700 : 400, borderBottom: "1px solid #e5e5e0" }}>
                  <td style={{ padding: "8px 12px" }}>{r.range}</td>
                  <td style={{ padding: "8px 12px" }}>{r.mode}</td>
                  <td style={{ padding: "8px 12px", color: "#1e40af", fontWeight: 600 }}>{r.rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 20px", background: "#f0f0ec", borderRadius: 10, fontSize: 12, color: "#777", lineHeight: 1.7 }}>
        <strong>Source:</strong> General Financial Rules (GFR), 2017 — Government of India, Ministry of Finance, Department of Expenditure. Also: Manual for Procurement of Goods, 2017 (Ministry of Finance) and Public Procurement (Preference to Make in India) Order, 2017 (DPIIT).
      </div>
    </div>
  );
}

// --- BMC Voter Survey Tab ---
function BMCVoterSurvey() {
  const barStyle = (pct, color) => ({
    width: `${pct}%`, background: color, height: 24, borderRadius: 4,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: 10, fontWeight: 700, fontFamily: "monospace",
    minWidth: pct > 5 ? 30 : 0, transition: "width 0.3s",
  });
  const sectionStyle = { background: "#fff", borderRadius: 10, padding: "20px", border: "1px solid #e5e5e0", marginBottom: 16 };
  const labelStyle = { fontSize: 12, color: "#666", marginBottom: 4, display: "flex", justifyContent: "space-between" };

  const HBar = ({ label, value, max, color }) => (
    <div style={{ marginBottom: 8 }}>
      <div style={labelStyle}><span>{label}</span><span style={{ fontWeight: 700 }}>{value}%</span></div>
      <div style={{ background: "#f0f0ec", borderRadius: 4, overflow: "hidden", height: 24 }}>
        <div style={barStyle(value / (max || 100) * 100, color)}>{value > 5 ? `${value}%` : ""}</div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
      {/* Header */}
      <div style={{ ...sectionStyle, borderLeft: "4px solid #0f3460" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" }}>
          Why People Do Not Vote in Municipal Corporation Elections
        </h2>
        <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
          A Voter-Based Survey in Brihanmumbai Municipal Corporation (BMC) | Gokhale Institute of Politics and Economics, Pune
        </div>
        <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
          Survey: Jan 3-12, 2017 | ~2,786 respondents | 10 wards (7 low VT + 3 high VT)
        </div>
      </div>

      {/* Key Finding: Top 3 Reasons */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 16 }}>Top 3 Reasons for Not Voting</div>
        <HBar label="Casting my vote has not changed anything so far" value={27} max={30} color="#dc2626" />
        <HBar label="My name was not in the voter's list" value={25} max={30} color="#f59e0b" />
        <HBar label="All candidates are more or less of same quality" value={25} max={30} color="#ea580c" />
      </div>

      {/* Voter Classification */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>Mumbai Voter Classification</div>
        <div style={{ display: "flex", height: 36, borderRadius: 6, overflow: "hidden", gap: 2, marginBottom: 12 }}>
          <div style={barStyle(23.3, "#dc2626")}>Rare 23.3%</div>
          <div style={barStyle(38.8, "#f59e0b")}>Intermittent 38.8%</div>
          <div style={barStyle(30.5, "#16a34a")}>Regular 30.5%</div>
        </div>
        <div style={{ fontSize: 12, color: "#777", lineHeight: 1.6 }}>
          Only 30.5% of Mumbaikars vote regularly. 38.8% are intermittent voters — the key target group for awareness campaigns.
        </div>
      </div>

      {/* Gender */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={sectionStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>Male Voters</div>
          <HBar label="Rare" value={21.9} max={50} color="#dc2626" />
          <HBar label="Intermittent" value={36.2} max={50} color="#f59e0b" />
          <HBar label="Regular" value={35.2} max={50} color="#16a34a" />
        </div>
        <div style={sectionStyle}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>Female Voters</div>
          <HBar label="Rare" value={24.6} max={50} color="#dc2626" />
          <HBar label="Intermittent" value={41.5} max={50} color="#f59e0b" />
          <HBar label="Regular" value={25.6} max={50} color="#16a34a" />
        </div>
      </div>

      {/* Age */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>Voting by Age Group</div>
        {[
          { age: "18-35 (Youth)", rare: 37.1, inter: 24.8, regular: 18.1 },
          { age: "36-50 (Middle)", rare: 16.2, inter: 47.2, regular: 36.5 },
          { age: "51+ (Senior)", rare: 12.9, inter: 47.2, regular: 39.8 },
        ].map((r, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 4 }}>{r.age}</div>
            <div style={{ display: "flex", height: 24, borderRadius: 4, overflow: "hidden", gap: 2 }}>
              <div style={barStyle(r.rare, "#dc2626")}>{r.rare}%</div>
              <div style={barStyle(r.inter, "#f59e0b")}>{r.inter}%</div>
              <div style={barStyle(r.regular, "#16a34a")}>{r.regular}%</div>
            </div>
          </div>
        ))}
        <div style={{ fontSize: 12, color: "#777", marginTop: 8, lineHeight: 1.5 }}>
          Youth (18-35) are the most reluctant: 37.1% rare voters, only 18.1% regular. Seniors (51+) form the strongest voter base at 39.8% regular.
        </div>
      </div>

      {/* Education */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>Voting by Education Level</div>
        {[
          { ed: "Illiterate", rare: 9.9, regular: 28.4 },
          { ed: "School (V-IX)", rare: 24.4, regular: 25.8 },
          { ed: "SSC to HSC", rare: 23.4, regular: 24.8 },
          { ed: "Graduate/PG (General)", rare: 33.8, regular: 25.4 },
          { ed: "Graduate/PG (Professional)", rare: 54.2, regular: 24.0 },
        ].map((r, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <div style={labelStyle}><span>{r.ed}</span><span style={{ color: "#dc2626" }}>Rare: {r.rare}%</span></div>
            <div style={{ display: "flex", height: 20, borderRadius: 4, overflow: "hidden", gap: 2 }}>
              <div style={barStyle(r.rare, "#dc2626")}></div>
              <div style={barStyle(100 - r.rare - r.regular, "#f59e0b")}></div>
              <div style={barStyle(r.regular, "#16a34a")}></div>
            </div>
          </div>
        ))}
        <div style={{ fontSize: 12, color: "#777", marginTop: 8, lineHeight: 1.5 }}>
          Paradoxically, higher education correlates with lower voting: 54.2% of professional degree holders are rare voters vs. only 9.9% of illiterate voters.
        </div>
      </div>

      {/* Period of Stay */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>Voting by Years of Residence in Mumbai</div>
        {[
          { stay: "Less than 5 years", rare: 45.0, inter: 21.3, regular: 17.5 },
          { stay: "5-10 years", rare: 38.9, inter: 33.8, regular: 18.6 },
          { stay: "More than 10 years", rare: 19.7, inter: 40.6, regular: 32.9 },
        ].map((r, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 4 }}>{r.stay}</div>
            <div style={{ display: "flex", height: 24, borderRadius: 4, overflow: "hidden", gap: 2 }}>
              <div style={barStyle(r.rare, "#dc2626")}>{r.rare}%</div>
              <div style={barStyle(r.inter, "#f59e0b")}>{r.inter}%</div>
              <div style={barStyle(r.regular, "#16a34a")}>{r.regular}%</div>
            </div>
          </div>
        ))}
      </div>

      {/* Ward Turnout */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>Ward-Wise Voter Turnout (BMC 2012)</div>
        {[
          { ward: "Mumbadevi", pct: 30.68, type: "low" },
          { ward: "Dharavi Transit Camp", pct: 33.18, type: "low" },
          { ward: "Swami Samarth Nagar", pct: 32.50, type: "low" },
          { ward: "Union Park (Bandra)", pct: 36.00, type: "low" },
          { ward: "Anushakti Nagar", pct: 36.56, type: "low" },
          { ward: "New Collectors Colony", pct: 38.36, type: "low" },
          { ward: "Borivali TPS", pct: 39.27, type: "low" },
          { ward: "Datar Colony (Mulund)", pct: 52.18, type: "high" },
          { ward: "Gavdevi (Bhandup)", pct: 53.69, type: "high" },
          { ward: "Bholar Ghatla Village", pct: 55.41, type: "high" },
        ].map((w, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <div style={labelStyle}>
              <span>{w.ward} <span style={{ fontSize: 10, color: w.type === "high" ? "#16a34a" : "#dc2626", fontWeight: 700 }}>({w.type.toUpperCase()} VT)</span></span>
              <span style={{ fontWeight: 700 }}>{w.pct}%</span>
            </div>
            <div style={{ background: "#f0f0ec", borderRadius: 4, overflow: "hidden", height: 18 }}>
              <div style={{ width: `${w.pct}%`, background: w.type === "high" ? "#16a34a" : "#dc2626", height: 18, borderRadius: 4, transition: "width 0.3s" }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Categories */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>Key Groups with Low Voting</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          {[
            { group: "Youth (18-35)", stat: "37.1% rare", icon: "👤" },
            { group: "Females", stat: "24.6% rare", icon: "👩" },
            { group: "High Income (SEC A)", stat: "22.1% rare", icon: "💰" },
            { group: "Professional Graduates", stat: "54.2% rare", icon: "🎓" },
            { group: "New Residents (<5 yrs)", stat: "45% rare", icon: "🏠" },
            { group: "Unmarried", stat: "37.5% rare", icon: "💍" },
          ].map((g, i) => (
            <div key={i} style={{ background: "#fef2f2", borderRadius: 8, padding: "12px", textAlign: "center", border: "1px solid #fecaca" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{g.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a2e" }}>{g.group}</div>
              <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 600 }}>{g.stat}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 20px", background: "#f0f0ec", borderRadius: 10, fontSize: 12, color: "#777", lineHeight: 1.7 }}>
        <strong>Source:</strong> "Why People Do Not Vote in Municipal Corporation Elections: A Voter-Based Survey in BMC" — Rajas K. Parchure, Manasi V. Phadke, Dnyandeo Talule, Gokhale Institute of Politics and Economics, Pune, 2017. Commissioned by State Election Commission of Maharashtra.
      </div>
    </div>
  );
}

// --- Jan Vishwas Bill Tab ---
function JanVishwasBill() {
  const sections = [
    { title: "Overview", content: "The Jan Vishwas (Amendment of Provisions) Bill, 2026 was introduced in Lok Sabha on March 27, 2026. It seeks to amend 80 central Acts to decriminalise or rationalise offences and penalties. It replaces the 2025 Bill (which covered 17 Acts), incorporating recommendations from the Select Committee (Chair: Mr. Tejasvi Surya) which suggested amendments to 65 additional Acts." },
    { title: "Decriminalising Offences", content: "The Bill decriminalises several offences, imposing civil penalties instead of criminal punishment. For example, under the Drugs and Cosmetics Act, 1940, manufacturing/sale of cosmetics in contravention is changed from imprisonment (up to 1 year) + fine (up to Rs 20,000) to a civil penalty of Rs 1 lakh or 3x value of confiscated cosmetics. Under the National Highways Act, 1956, making a highway impassable changes from imprisonment (up to 5 years) to civil penalty of Rs 10 lakh to Rs 1 crore." },
    { title: "Removal of Imprisonment Terms", content: "In some cases, the Bill removes imprisonment while retaining and increasing fines. Examples: Indian Succession Act, 1925 — failure to surrender revoked probate (was: 3 months imprisonment + fine, now: fine only, increased). Electricity Act, 2003 — non-compliance with orders (was: 3 months imprisonment + fine, now: fine only, increased)." },
    { title: "Omission of Offences", content: "The Bill removes several offences entirely, including: (i) giving false alarm of fire under the Delhi Police Act, 1978, (ii) failure to give information of births and deaths under the Delhi Municipal Corporation Act, 1957, and (iii) making false entries in the register of copyrights under the Copyright Act, 1957." },
    { title: "Revision of Fines & Penalties", content: "The Bill revises monetary values of fines and penalties for several offences. It provides that fines and penalties will auto-increase by 10% of the respective minimum amount every three years." },
    { title: "Warnings on First & Second Offences", content: "Some Acts are amended to provide advisories or warnings for first/second instances. Example: Under the Apprentices Act, 1961 — first contravention gets an advisory, second gets a warning, civil penalty only for subsequent contraventions." },
    { title: "Improvement Notices", content: "Under the Legal Metrology Act, 2009, the Bill introduces improvement notices for first offences (e.g., manufacturing/using non-standard weights). These require rectifying non-compliance within a specified time. Civil penalty for second offence, criminal fine for subsequent offences." },
    { title: "Adjudication of Penalties", content: "The Bill provides for appointment of adjudicating officers to hold inquiries and adjudicate penalties, and appellate authorities to hear appeals against their decisions." },
    { title: "Property & Advertisement Tax (New Delhi)", content: "Amends the New Delhi Municipal Council Act, 1994. Property tax will consist of building tax + vacant land tax. Establishes a Municipal Valuation Committee for base values and a Hardship and Anomaly Committee for grievances. Removes provisions for levying advertisement tax." },
    { title: "Revision under Jan Vishwas Act 2023", content: "The Jan Vishwas Act, 2023 provides for revision of fines every 3 years. This Bill adds that if any Act already prescribes its own revision method, that method will apply instead." },
  ];

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ background: "#fff", borderRadius: 10, padding: "24px", border: "1px solid #e5e5e0", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#059669", background: "#ecfdf5", padding: "4px 10px", borderRadius: 4 }}>Regulatory</span>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#7c3aed", background: "#f5f3ff", padding: "4px 10px", borderRadius: 4 }}>Constituent</span>
          <span style={{ fontSize: 10, color: "#b45309", fontWeight: 600 }}>Commerce & Industry</span>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" }}>The Jan Vishwas (Amendment of Provisions) Bill, 2026</h2>
        <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
          Ministry of Commerce and Industry | Introduced in Lok Sabha: March 27, 2026
        </div>
        <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
          Source: PRS Legislative Research
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sections.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "16px 20px", border: "1px solid #e5e5e0", borderLeft: "4px solid #0f3460" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>{s.content}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: "16px 20px", background: "#f0f0ec", borderRadius: 10, fontSize: 12, color: "#777", lineHeight: 1.7 }}>
        <strong>Lowi Classification:</strong> This Bill is primarily <strong>Regulatory</strong> (rationalising penalties and decriminalising offences across 80 Acts) with <strong>Constituent</strong> elements (restructuring adjudication mechanisms, creating new institutional bodies like the Municipal Valuation Committee).
      </div>
    </div>
  );
}

export default function LowiClassification() {
  const [activeTab, setActiveTab] = useState("publicpolicy");
  const [subTab, setSubTab] = useState("classify");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSector, setActiveSector] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const [responses, setResponses] = useState(loadResponses);
  const [participant, setParticipant] = useState(loadParticipant);
  const [nameInput, setNameInput] = useState(loadParticipant);
  const [choices, setChoices] = useState(loadChoices);

  const updateResponse = (key, value) => {
    setResponses((prev) => {
      const next = { ...prev, [key]: value };
      saveResponses(next);
      return next;
    });
  };

  const updateChoice = (key, value) => {
    setChoices((prev) => {
      const next = { ...prev, [key]: value };
      saveChoices(next);
      return next;
    });
  };

  const handleSetParticipant = () => {
    const trimmed = nameInput.trim();
    if (trimmed) { setParticipant(trimmed); saveParticipant(trimmed); }
  };

  const counts = {};
  Object.keys(categories).forEach((k) => { counts[k] = policies.filter((p) => p.cat === k).length; });
  const total = policies.length;

  const filtered = policies.filter((p) => {
    if (activeCategory && p.cat !== activeCategory) return false;
    if (activeSector && p.sector !== activeSector) return false;
    if (searchTerm && !p.title.toLowerCase().includes(searchTerm.toLowerCase()) && !p.detail.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const sectors = [...new Set(policies.filter((p) => !activeCategory || p.cat === activeCategory).map((p) => p.sector))].sort();

  // Stats
  const totalResponded = Object.values(responses).filter((r) => r.stance).length;
  const totalAgreed = Object.values(responses).filter((r) => r.stance === "agree").length;
  const totalDisagreed = Object.values(responses).filter((r) => r.stance === "disagree").length;

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#fafaf8", minHeight: "100vh", padding: 0 }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", color: "#fff", padding: "18px 24px 14px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", opacity: 0.6, marginBottom: 4 }}>
            IIM Mumbai PPM — Assignment & Learning
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
            {activeTab === "publicpolicy" ? "Public Policy" : "Public Procurement"}
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 0 }}>
          {[
            { key: "publicpolicy", label: "Public Policy" },
            { key: "procurement", label: "Public Procurement" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "12px 24px", border: "none", borderBottom: activeTab === tab.key ? "3px solid #0f3460" : "3px solid transparent",
                background: "none", cursor: "pointer", fontSize: 13, fontWeight: activeTab === tab.key ? 700 : 400,
                color: activeTab === tab.key ? "#0f3460" : "#888", fontFamily: "inherit", transition: "all 0.15s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "procurement" && <PublicProcurement />}

      {activeTab === "publicpolicy" && <div>
        {/* Sub-nav for Public Policy sections */}
        <div style={{ background: "#f8f8f5", borderBottom: "1px solid #e5e5e0" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
            {[
              { key: "classify", label: "Lowi Classification" },
              { key: "janvishwas", label: "Jan Vishwas Bill" },
              { key: "bmcvoter", label: "BMC Voter Survey" },
            ].map((sub) => (
              <button
                key={sub.key}
                onClick={() => setSubTab(sub.key)}
                style={{
                  padding: "10px 20px", border: "none", borderBottom: subTab === sub.key ? "2px solid #be185d" : "2px solid transparent",
                  background: "none", cursor: "pointer", fontSize: 12, fontWeight: subTab === sub.key ? 700 : 400,
                  color: subTab === sub.key ? "#be185d" : "#999", fontFamily: "inherit", transition: "all 0.15s", whiteSpace: "nowrap",
                }}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>

        {subTab === "janvishwas" && <JanVishwasBill />}
        {subTab === "bmcvoter" && <BMCVoterSurvey />}

        {subTab === "classify" && <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
        {/* Participant Name */}
        <div style={{ background: "#fff", borderRadius: 10, padding: "14px 20px", marginBottom: 20, border: "1px solid #e5e5e0", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#555" }}>Participant:</span>
          {!participant ? (
            <>
              <input
                type="text" placeholder="Enter your name..." value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSetParticipant()}
                style={{ flex: "1 1 200px", padding: "8px 12px", border: "1px solid #d5d5d0", borderRadius: 6, fontSize: 13, fontFamily: "inherit", outline: "none" }}
              />
              <button onClick={handleSetParticipant} style={{ padding: "8px 20px", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>
                Start
              </button>
            </>
          ) : (
            <>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>{participant}</span>
              <span style={{ fontSize: 12, color: "#999" }}>
                — Classified: {Object.values(choices).filter(Boolean).length}/{total}
              </span>
              <button onClick={() => { setParticipant(""); setNameInput(""); saveParticipant(""); }} style={{ marginLeft: "auto", padding: "4px 12px", background: "none", border: "1px solid #ddd", borderRadius: 4, cursor: "pointer", fontSize: 11, color: "#999", fontFamily: "inherit" }}>
                Change
              </button>
            </>
          )}
        </div>

        {/* Category Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
          {Object.entries(categories).map(([key, cat]) => {
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => { setActiveCategory(isActive ? null : key); setActiveSector(null); setExpandedPolicy(null); }}
                style={{
                  background: isActive ? cat.color : cat.bg,
                  color: isActive ? "#fff" : cat.color,
                  border: `2px solid ${isActive ? cat.color : cat.border}`,
                  borderRadius: 10, padding: "16px 14px", cursor: "pointer",
                  textAlign: "left", transition: "all 0.2s", position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 22 }}>{cat.icon}</span>
                  <span style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Courier New', monospace", opacity: isActive ? 1 : 0.5 }}>{counts[key]}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{cat.label}</div>
                <div style={{ fontSize: 11, lineHeight: 1.4, marginTop: 4, opacity: 0.8 }}>{cat.description.split('.')[0]}.</div>
              </button>
            );
          })}
        </div>

        {/* Bar chart — based on participant choices */}
        <div style={{ background: "#fff", borderRadius: 10, padding: "16px 20px", marginBottom: 20, border: "1px solid #e5e5e0" }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#999", marginBottom: 12 }}>
            {participant ? `Your Classification (${Object.values(choices).filter(Boolean).length}/${total})` : "Distribution"}
          </div>
          {(() => {
            const choiceCounts = {};
            Object.keys(categories).forEach((k) => { choiceCounts[k] = 0; });
            const classified = Object.values(choices).filter(Boolean);
            if (participant && classified.length > 0) {
              classified.forEach((v) => { if (choiceCounts[v] !== undefined) choiceCounts[v]++; });
            } else {
              Object.keys(categories).forEach((k) => { choiceCounts[k] = counts[k]; });
            }
            const chartTotal = Object.values(choiceCounts).reduce((a, b) => a + b, 0) || 1;
            return (
              <>
                <div style={{ display: "flex", height: 28, borderRadius: 6, overflow: "hidden", gap: 2 }}>
                  {Object.entries(categories).map(([key, cat]) => (
                    choiceCounts[key] > 0 ? (
                      <div
                        key={key}
                        style={{
                          width: `${(choiceCounts[key] / chartTotal) * 100}%`,
                          background: activeCategory && activeCategory !== key ? "#e5e5e0" : cat.color,
                          transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontSize: 10, fontWeight: 700, fontFamily: "monospace", cursor: "pointer",
                        }}
                        onClick={() => { setActiveCategory(activeCategory === key ? null : key); setActiveSector(null); }}
                        title={`${cat.label}: ${choiceCounts[key]} (${Math.round((choiceCounts[key] / chartTotal) * 100)}%)`}
                      >
                        {choiceCounts[key] > 1 ? `${Math.round((choiceCounts[key] / chartTotal) * 100)}%` : ""}
                      </div>
                    ) : null
                  ))}
                  {participant && classified.length === 0 && (
                    <div style={{ width: "100%", background: "#e5e5e0", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#999" }}>
                      Classify policies to see your distribution
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
                  {Object.entries(categories).map(([key, cat]) => (
                    <div key={key} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#666" }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: cat.color }} />
                      {cat.label} ({choiceCounts[key]})
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>

        {/* Search + Sector Filter */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text" placeholder="Search policies..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: "1 1 200px", padding: "10px 14px", border: "1px solid #d5d5d0",
              borderRadius: 8, fontSize: 14, fontFamily: "inherit", background: "#fff", outline: "none",
            }}
          />
          <select
            value={activeSector || ""}
            onChange={(e) => { setActiveSector(e.target.value || null); setExpandedPolicy(null); }}
            style={{
              padding: "10px 14px", border: "1px solid #d5d5d0", borderRadius: 8,
              fontSize: 13, fontFamily: "inherit", background: "#fff", cursor: "pointer",
            }}
          >
            <option value="">All Sectors ({sectors.length})</option>
            {sectors.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
          {(activeCategory || activeSector || searchTerm) && (
            <button
              onClick={() => { setActiveCategory(null); setActiveSector(null); setSearchTerm(""); setExpandedPolicy(null); }}
              style={{
                padding: "10px 16px", border: "1px solid #d5d5d0", borderRadius: 8,
                fontSize: 12, background: "#fff", cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <div style={{ fontSize: 12, color: "#999", marginBottom: 12 }}>
          Showing {filtered.length} of {total} policies
        </div>

        {/* Policy List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {filtered.map((p, i) => {
            const globalIndex = policies.indexOf(p);
            const cat = categories[p.cat];
            const isExpanded = expandedPolicy === i;
            const resp = responses[`policy_${globalIndex}`];
            const participantChoice = choices[`policy_${globalIndex}`] || null;
            const choiceCat = participantChoice ? categories[participantChoice] : null;
            const borderColor = participantChoice ? choiceCat.color : "#ccc";
            return (
              <div
                key={i}
                onClick={() => setExpandedPolicy(isExpanded ? null : i)}
                style={{
                  background: "#fff",
                  border: `1px solid ${isExpanded ? (choiceCat?.border || "#e5e5e0") : "#e5e5e0"}`,
                  borderLeft: `4px solid ${borderColor}`,
                  borderRadius: 8, padding: "12px 16px", cursor: "pointer", transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      {participantChoice ? (
                        <span style={{
                          fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                          color: categories[participantChoice].color, background: categories[participantChoice].bg, padding: "2px 8px", borderRadius: 4,
                        }}>{categories[participantChoice].icon} {categories[participantChoice].label}</span>
                      ) : (
                        <span style={{
                          fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                          color: "#aaa", background: "#f0f0ec", padding: "2px 8px", borderRadius: 4,
                        }}>Unclassified</span>
                      )}
                      <span style={{ fontSize: 10, color: sectorColors[p.sector] || "#666", fontWeight: 600 }}>{p.sector}</span>
                      {resp?.stance && (
                        <span style={{
                          fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                          color: resp.stance === "agree" ? "#16a34a" : "#dc2626",
                          background: resp.stance === "agree" ? "#f0fdf4" : "#fef2f2",
                          padding: "2px 6px", borderRadius: 4,
                        }}>
                          {resp.stance === "agree" ? "Agreed" : "Disagreed"}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3 }}>{p.title}</div>
                  </div>
                  <span style={{ fontSize: 12, color: "#ccc", transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0, marginTop: 4 }}>&#9660;</span>
                </div>
                {isExpanded && (
                  <div>
                    <div style={{
                      marginTop: 10, paddingTop: 10, borderTop: `1px solid ${cat.border}`,
                      fontSize: 13, lineHeight: 1.6, color: "#444",
                    }}>
                      {p.detail}
                    </div>
                    <PolicyChoice policyIndex={globalIndex} choices={choices} onUpdate={updateChoice} participant={participant} />
                    <PolicyFeedback policyIndex={globalIndex} responses={responses} onUpdate={updateResponse} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#999", fontSize: 14 }}>
            No policies match the current filters.
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 32, padding: "16px 20px", background: "#f0f0ec", borderRadius: 10, fontSize: 12, color: "#777", lineHeight: 1.7 }}>
          <strong>About Lowi's Framework:</strong> Theodore Lowi (1964, 1972) proposed that policies fall into distinct arenas — each with its own politics. <em>Distributive</em> policies allocate benefits without visible losers. <em>Redistributive</em> policies transfer resources across broad classes. <em>Regulatory</em> policies constrain private conduct. <em>Constituent</em> policies restructure government itself. Some policies span categories; the classification above reflects their primary character.
          <br /><br />
          <strong>Source:</strong> PRS Legislative Research — Annual Policy Review, April 2024 – March 2025
        </div>
      </div>}
      </div>}
    </div>
  );
}
