import React, { useState, useEffect } from "react";

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

// --- PLFS Exploratory Data Analysis Tab ---
function PLFSAnalysis() {
  const [showCode, setShowCode] = useState(null);
  const [plfsView, setPlfsView] = useState("full");
  const sectionStyle = { background: "#fff", borderRadius: 10, padding: "20px", border: "1px solid #e5e5e0", marginBottom: 20 };
  const BASE = "https://raw.githubusercontent.com/aditya-ashok/IIM-Mumbai-PPM/public-policy/plfs/graphs_actual/";

  const graphs = [
    { file: "21_worker_age_gender_kde.png", title: "Worker Age Distribution by Gender (tothrs_wrk > 0)", type: "KDE Density Plot",
      desc: "Age distribution of only those who reported working hours > 0, split by gender. Shows the working population's age profile — peaks in prime working years (30-45).",
      code: `workers = df[(df['tothrs_wrk'] > 0) & (df['sex'].isin([1,2]))]\nworkers[workers['sex']==1]['age'].plot.kde(label='Male')\nworkers[workers['sex']==2]['age'].plot.kde(label='Female')` },
    { file: "20_scatter_hrs_income.png", title: "Scatter Plot: Work Hours vs Total Income", type: "Scatter Plot",
      desc: "311,798 records where both tothrs_wrk > 0 and total_income > 0 (27.1% of total). Correlation = 0.189 (weak positive). Blue = Male, Pink = Female. More hours worked does NOT strongly predict higher income — structural factors matter more than hours.",
      code: `mask = (df['tothrs_wrk'] > 0) & (df['total_income'] > 0)\nsubset = df[mask]  # 311,798 records\ncorr = subset['tothrs_wrk'].corr(subset['total_income'])  # 0.189\nax.scatter(sample['tothrs_wrk'], sample['total_income'], c=colors, alpha=0.3, s=10)` },
    { file: "18_age_quartile_variation.png", title: "Age Quartile Variation by Gender", type: "Box Plot + Stacked Bar",
      desc: "Left: Box plot showing age quartiles (Q1=16, Median=29, Q3=46) for Male vs Female with IQR=30. Right: Stacked bar showing quartile composition by gender. Male median is 28, Female median is 30.",
      code: `bp = ax.boxplot([data_m, data_f], tick_labels=['Male', 'Female'], patch_artist=True, showfliers=False)\n# Quartiles: Male Q1=15, Med=28, Q3=45 | Female Q1=16, Med=30, Q3=46\n\n# Stacked bar by quartile\nage_groups = pd.cut(df['age'], bins=[0,16,29,46,120], labels=['Q1','Q2','Q3','Q4'])\ncross = pd.crosstab(df['sex'], age_groups, normalize='index') * 100\ncross.plot(kind='barh', stacked=True)` },
    { file: "19_income_outliers.png", title: "Total Income — Outlier Detection (IQR Method)", type: "Box Plot + Histogram",
      desc: "Outlier analysis using IQR method: Q1=Rs 8,000, Q3=Rs 22,000, IQR=Rs 14,000. Upper fence at Rs 43,000. 24,368 outliers found (7.7% of earners). Outlier range: Rs 43,100 to Rs 7,10,000. Mean outlier income: Rs 66,855.",
      code: `df['total_income'] = df['ern_reg'] + df['ern_self']\ninc = df[df['total_income'] > 0]['total_income']\nq1, q3 = inc.quantile(0.25), inc.quantile(0.75)\niqr = q3 - q1\nupper = q3 + 1.5 * iqr  # Rs 43,000\noutliers = inc[inc > upper]  # 24,368 records (7.7%)` },
    { file: "17_age_density_kde.png", title: "Age Distribution — Kernel Density Plot by Gender", type: "KDE Density Plot",
      desc: "Kernel Density Estimation (KDE) showing smoothed age distribution for Male, Female, and Overall. Reveals differences in age profiles — female distribution slightly younger. KDE is a non-parametric way to estimate the probability density function.",
      code: `for sex, label, color in [(1, 'Male', '#2563eb'), (2, 'Female', '#be185d')]:\n    df[df['sex'] == sex]['age'].plot.kde(ax=ax, color=color, lw=2.5, label=label)\ndf['age'].plot.kde(ax=ax, color='#1a1a2e', lw=2, ls='--', label='Overall')` },
    { file: "01_age_distribution_hist.png", title: "Age Distribution of Survey Respondents", type: "Histogram",
      desc: "Shows the age distribution of all 1,148,634 PLFS respondents. Right-skewed distribution with median age marked. Helps identify the demographic composition of the sample.",
      code: `ax.hist(df["age"], bins=50, color="#1a1a2e", alpha=0.7, edgecolor="white", density=True)\nax.axvline(df["age"].median(), color="#dc2626", ls="--", lw=2, label=f'Median: {df["age"].median():.0f}')` },
    { file: "02_sex_distribution_donut.png", title: "Gender Distribution", type: "Donut Chart",
      desc: "Proportional split of respondents by gender (Male, Female, Transgender). Donut chart shows the survey's gender balance.",
      code: `ax.pie(sex_counts, labels=sex_counts.index, autopct='%1.1f%%',\n       colors=["#2563eb", "#be185d", "#7c3aed"],\n       wedgeprops=dict(width=0.45, edgecolor="white", linewidth=2))` },
    { file: "03_education_bar.png", title: "Education Level Distribution", type: "Vertical Bar",
      desc: "Frequency distribution across 12 education levels — from 'Not literate' to 'PG (Technical)'. Shows India's education profile in the labour force.",
      code: `ax.bar(edu_labels, edu_counts.values,\n       color=plt.cm.viridis(np.linspace(0.2, 0.9, len(edu_order))))` },
    { file: "04_lfpr_gender_bar.png", title: "LFPR by Gender", type: "Bar Chart",
      desc: "Labour Force Participation Rate comparison between Male, Female, and Transgender workers aged 15+. Derived by computing in_lf = employed | seeking_work.",
      code: `lfpr_gender = df15.groupby("sex_label")["in_lf"].mean() * 100\nax.bar(lfpr_gender.index, lfpr_gender.values, color=[...])` },
    { file: "05_lfpr_age_line.png", title: "LFPR by Age Group", type: "Area Line Chart",
      desc: "LFPR across age groups (15-17 to 65+). Shows participation peaking in prime working years (30-54) and declining for seniors.",
      code: `lfpr_age = df15.groupby("age_group")["in_lf"].mean() * 100\nax.plot(lfpr_age.index, lfpr_age.values, "o-", lw=2.5)\nax.fill_between(range(len(lfpr_age)), lfpr_age.values, alpha=0.15)` },
    { file: "06_lfpr_age_gender_line.png", title: "LFPR by Age & Gender", type: "Multi-Line Chart",
      desc: "Gender-disaggregated LFPR across age groups. Reveals the persistent male-female gap and how it varies by age — widest gap typically in 25-44 age range.",
      code: `for sex, color in [("Male", "#2563eb"), ("Female", "#be185d")]:\n    sub = df15[df15["sex_label"] == sex]\n    lfpr = sub.groupby("age_group")["in_lf"].mean() * 100\n    ax.plot(lfpr.index, lfpr.values, "o-", color=color, label=sex)` },
    { file: "07_ur_gender_bar.png", title: "Unemployment Rate by Gender", type: "Bar Chart",
      desc: "UR comparison by gender. UR = Unemployed / Labour Force x 100. Shows which gender faces higher joblessness.",
      code: `ur_gender = df15.groupby("sex_label").apply(\n    lambda x: x["unemployed"].sum() / x["in_lf"].sum() * 100)` },
    { file: "08_ur_age_bar.png", title: "Unemployment Rate by Age Group", type: "Color-coded Bar",
      desc: "Age-wise UR with color coding: Red (>5%), Orange (2-5%), Green (<2%). Youth unemployment is dramatically higher than older cohorts.",
      code: `ur_age = df15.groupby("age_group").apply(\n    lambda x: x["unemployed"].sum() / x["in_lf"].sum() * 100)\ncolors = ["red" if v > 5 else "orange" if v > 2 else "green" for v in ur_age]` },
    { file: "09_ur_education_hbar.png", title: "UR by Education Level", type: "Horizontal Bar",
      desc: "Education paradox visualized: higher education correlates with HIGHER unemployment. Graduates face significantly more joblessness than the illiterate.",
      code: `ur_edu = df15.groupby("edu_label").apply(\n    lambda x: x["unemployed"].sum() / x["in_lf"].sum() * 100).sort_values()\nax.barh(ur_edu.index, ur_edu.values, color=plt.cm.Reds(...))` },
    { file: "10_employment_status_stacked.png", title: "Employment Status by Gender", type: "Stacked Horizontal Bar",
      desc: "Breakdown of employment types (self-employed, regular wage, casual labour, helper) by gender using pd.crosstab. Shows structural differences in how men and women work.",
      code: `sas_gender = pd.crosstab(df15["sex_label"], df15["sas_label"],\n                        normalize="index") * 100\nsas_gender.plot(kind="barh", stacked=True, colormap="tab10")` },
    { file: "11_earnings_histogram.png", title: "Earnings Distribution", type: "Histogram",
      desc: "Distribution of monthly earnings (ern_reg + ern_self) clipped at 95th percentile to remove outliers. Shows median (Rs 14,500) and mean (Rs 18,620) with vertical lines.",
      code: `earnings = df15["total_earnings"].dropna()\nax.hist(earnings.clip(upper=earnings.quantile(0.95)), bins=50)\nax.axvline(earnings.median(), color="red", ls="--", label=f'Median: Rs {earnings.median():,.0f}')` },
    { file: "12_earnings_gender_boxplot.png", title: "Earnings by Gender", type: "Box Plot",
      desc: "Side-by-side box plots comparing male vs female earnings. Shows median, IQR, and spread. Quantifies the gender wage gap visually.",
      code: `data_m = earnings[df15.loc[earnings.index, "sex"] == 1]\ndata_f = earnings[df15.loc[earnings.index, "sex"] == 2]\nax.boxplot([data_m, data_f], tick_labels=["Male", "Female"], patch_artist=True)` },
    { file: "13_state_lfpr_hbar.png", title: "State-wise LFPR", type: "Horizontal Bar",
      desc: "LFPR ranked by state/UT with All-India benchmark line. Color-coded: Green (>60%), Orange (50-60%), Red (<50%). Shows regional labour market disparities.",
      code: `state_lfpr = df15.groupby("state_label")["in_lf"].mean().sort_values() * 100\nax.barh(state_lfpr.index, state_lfpr.values, color=[...])\nax.axvline(overall, color="black", ls="--")` },
    { file: "14_lfpr_marital_gender.png", title: "LFPR by Marital Status & Gender", type: "Grouped Bar",
      desc: "How marital status affects labour force participation differently for men and women. Married women often show lower LFPR than unmarried women.",
      code: `lfpr_marst = df15.groupby(["marst_label", "sex_label"])["in_lf"].mean() * 100\nlfpr_marst = lfpr_marst.unstack()\nlfpr_marst.plot(kind="bar", color=["#2563eb", "#be185d"])` },
    { file: "15_work_hours_histogram.png", title: "Weekly Work Hours Distribution", type: "Histogram",
      desc: "Distribution of total weekly work hours (tothrs_wrk) for employed persons. Median line shows typical work week. Reveals overwork and underemployment patterns.",
      code: `hrs = df15["tothrs_wrk"][df15["tothrs_wrk"] > 0]\nax.hist(hrs, bins=40, color="#7c3aed", alpha=0.7)\nax.axvline(hrs.median(), color="red", ls="--", label=f'Median: {hrs.median():.0f} hrs')` },
    { file: "16_state_gender_heatmap.png", title: "LFPR Heatmap: State x Gender", type: "Heatmap",
      desc: "Matrix showing LFPR by state and gender (top 20 states by female LFPR). Color intensity reveals which states have highest female participation. Uses YlOrRd colormap.",
      code: `heatmap = df15.groupby(["state_label", "sex_label"])["in_lf"].mean().unstack() * 100\nim = ax.imshow(heatmap.values, cmap="YlOrRd", aspect="auto")` },
  ];

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ ...sectionStyle, borderLeft: "4px solid #2563eb" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" }}>
          PLFS — Exploratory Data Analysis
        </h2>
        <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
          Periodic Labour Force Survey | 1,148,634 records | Python (NumPy + Pandas + Matplotlib)
        </div>
        <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
          Source: microdata.gov.in/NADA | Click any graph to see the Python code used
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <a href="https://colab.research.google.com/github/aditya-ashok/IIM-Mumbai-PPM/blob/public-policy/plfs/PLFS_EDA_Colab.ipynb" target="_blank" rel="noopener noreferrer"
            style={{ padding: "8px 18px", background: "#f59e0b", color: "#1a1a2e", borderRadius: 6, fontSize: 12, fontWeight: 700, textDecoration: "none", fontFamily: "inherit" }}>
            Open in Google Colab
          </a>
          <button onClick={() => setPlfsView("full")} style={{ padding: "8px 18px", background: plfsView === "full" ? "#2563eb" : "#f8fafc", color: plfsView === "full" ? "#fff" : "#555", border: "1px solid #d5d5d0", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Full Data (1.1M)
          </button>
          <button onClick={() => setPlfsView("sample")} style={{ padding: "8px 18px", background: plfsView === "sample" ? "#2563eb" : "#f8fafc", color: plfsView === "sample" ? "#fff" : "#555", border: "1px solid #d5d5d0", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Sample CSV (100K)
          </button>
        </div>
      </div>

      {plfsView === "sample" && (() => {
        const SBASE = "https://raw.githubusercontent.com/aditya-ashok/IIM-Mumbai-PPM/public-policy/plfs/graphs_sample/";
        const sGraphs = [
          { file: "01_age_kde.png", title: "KDE — Age by Gender" },
          { file: "02_age_quartile.png", title: "Age Quartile Box Plot" },
          { file: "17_age_hist.png", title: "Age Histogram" },
          { file: "03_gender_donut.png", title: "Gender Distribution" },
          { file: "04_education_bar.png", title: "Education Level Distribution" },
          { file: "05_lfpr_gender.png", title: "LFPR by Gender" },
          { file: "06_lfpr_age_gender.png", title: "LFPR by Age & Gender" },
          { file: "07_ur_gender.png", title: "Unemployment Rate by Gender" },
          { file: "08_ur_age.png", title: "UR by Age Group" },
          { file: "09_ur_education.png", title: "UR by Education Level" },
          { file: "10_employment_stacked.png", title: "Employment Status by Gender" },
          { file: "11_earnings_hist.png", title: "Earnings Distribution" },
          { file: "12_earnings_gender_box.png", title: "Earnings by Gender Box Plot" },
          { file: "13_income_outliers.png", title: "Income Outlier Detection" },
          { file: "14_scatter_hrs_income.png", title: "Work Hours vs Income Scatter" },
          { file: "15_lfpr_marital.png", title: "LFPR by Marital Status & Gender" },
          { file: "16_work_hours.png", title: "Work Hours Distribution" },
          { file: "21_worker_age_gender_kde.png", title: "Worker Age Distribution (tothrs_wrk > 0)" },
        ];
        return (
          <div>
            <div style={sectionStyle}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Sample Data: PLFS_selected_sample.csv</div>
              <div style={{ fontSize: 12, color: "#777", marginBottom: 14 }}>99,994 records (Male/Female) | Same analysis as full data for quick comparison</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 8, marginBottom: 16 }}>
                {[
                  { l: "Records", v: "99,994" }, { l: "Age Mean", v: "31.7" }, { l: "Age Median", v: "29" },
                  { l: "Earners", v: "27,285" }, { l: "Inc Median", v: "Rs 14,250" }, { l: "Inc Mean", v: "Rs 18,738" },
                  { l: "SAS Missing", v: "89.9%" }, { l: "Q1 Age", v: "16" }, { l: "Q3 Age", v: "46" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "#f8fafc", borderRadius: 6, padding: "8px", textAlign: "center", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: 9, color: "#999", fontWeight: 600, textTransform: "uppercase" }}>{s.l}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a2e" }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            {sGraphs.map((g, i) => (
              <div key={i} style={sectionStyle}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, color: "#999", marginRight: 8 }}>{i + 1}/{sGraphs.length}</span>{g.title}
                </div>
                <img src={SBASE + g.file} alt={g.title} style={{ width: "100%", borderRadius: 8, border: "1px solid #e5e5e0" }} loading="lazy" />
              </div>
            ))}
          </div>
        );
      })()}

      {plfsView === "full" && <div>
      {/* Key Findings */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>Key Findings from 1.1M Records</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {[
            { title: "Median Earnings", stat: "Rs 14,500/mo", detail: "Mean Rs 18,620 — right-skewed, few high earners pull mean up", color: "#2563eb" },
            { title: "Male vs Female LFPR", stat: "16.7% vs 13.9%", detail: "Gender gap persists; female LFPR rising from 23.3% (2017-18)", color: "#be185d" },
            { title: "Youth UR Highest", stat: "18-24 age", detail: "Highest unemployment rate; drops sharply after age 30", color: "#dc2626" },
            { title: "Education Paradox", stat: "Graduates > Illiterate", detail: "Professional graduates have HIGHEST UR; skills mismatch", color: "#7c3aed" },
            { title: "Gender Wage Gap", stat: "Significant", detail: "Male median earnings far exceed female — visible in box plots", color: "#f59e0b" },
            { title: "State Disparities", stat: "Wide variation", detail: "LFPR ranges widely across states; some below 50%", color: "#059669" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#f8fafc", borderRadius: 8, padding: "14px", border: "1px solid #e2e8f0", borderLeft: `4px solid ${c.color}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.color, textTransform: "uppercase", letterSpacing: 0.5 }}>{c.title}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", margin: "4px 0" }}>{c.stat}</div>
              <div style={{ fontSize: 11, color: "#777", lineHeight: 1.4 }}>{c.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Age Descriptive Statistics */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>Descriptive Statistics — Age</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Count", value: "1,148,634" },
            { label: "Mean", value: "31.8 yrs" },
            { label: "Median", value: "29.0 yrs" },
            { label: "Mode", value: "45 yrs" },
            { label: "Std Dev", value: "19.9" },
            { label: "Min", value: "0" },
            { label: "Max", value: "117" },
            { label: "Q1 (25%)", value: "16 yrs" },
            { label: "Q3 (75%)", value: "46 yrs" },
            { label: "IQR", value: "30 yrs" },
            { label: "Skewness", value: "0.42 (right)" },
            { label: "Kurtosis", value: "-0.61 (platy)" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px", textAlign: "center", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 10, color: "#999", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e", marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>By Gender</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ background: "#1a1a2e", color: "#fff" }}>
            <th style={{ padding: "6px 10px", textAlign: "left" }}>Gender</th>
            <th style={{ padding: "6px 10px", textAlign: "center" }}>Mean</th>
            <th style={{ padding: "6px 10px", textAlign: "center" }}>Median</th>
            <th style={{ padding: "6px 10px", textAlign: "center" }}>Std Dev</th>
            <th style={{ padding: "6px 10px", textAlign: "center" }}>Min</th>
            <th style={{ padding: "6px 10px", textAlign: "center" }}>Max</th>
          </tr></thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e5e5e0" }}>
              <td style={{ padding: "6px 10px", fontWeight: 600, color: "#2563eb" }}>Male</td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>31.3</td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>28</td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>19.9</td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>0</td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>110</td>
            </tr>
            <tr style={{ background: "#f8fafc" }}>
              <td style={{ padding: "6px 10px", fontWeight: 600, color: "#be185d" }}>Female</td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>32.2</td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>30</td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>19.8</td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>0</td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>117</td>
            </tr>
          </tbody>
        </table>
        <div style={{ fontSize: 11, color: "#777", marginTop: 10, lineHeight: 1.5 }}>
          Positive skewness (0.42) indicates a slightly right-skewed distribution — more younger respondents. Platykurtic (kurtosis -0.61) means a flatter-than-normal distribution with lighter tails. Female median age (30) is slightly higher than male (28).
        </div>
      </div>

      {/* Income Descriptive Stats */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>Descriptive Statistics — Total Income (ern_reg + ern_self)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Earners", value: "315,418" },
            { label: "Mean", value: "Rs 18,620" },
            { label: "Median", value: "Rs 14,500" },
            { label: "Std Dev", value: "Rs 17,840" },
            { label: "Q1 (25%)", value: "Rs 8,000" },
            { label: "Q3 (75%)", value: "Rs 22,000" },
            { label: "IQR", value: "Rs 14,000" },
            { label: "Upper Fence", value: "Rs 43,000" },
            { label: "Outliers", value: "24,368 (7.7%)" },
            { label: "Outlier Mean", value: "Rs 66,855" },
            { label: "Max Income", value: "Rs 7,10,000" },
            { label: "Skewness", value: "Right-skewed" },
          ].map((s, i) => (
            <div key={i} style={{ background: i === 8 ? "#fef2f2" : "#f8fafc", borderRadius: 8, padding: "10px 12px", textAlign: "center", border: `1px solid ${i === 8 ? "#fecaca" : "#e2e8f0"}` }}>
              <div style={{ fontSize: 10, color: i === 8 ? "#dc2626" : "#999", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a2e", marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#777", lineHeight: 1.5 }}>
          Income is highly right-skewed — mean (Rs 18,620) is above median (Rs 14,500), indicating a long right tail. 7.7% of earners are outliers (income above Rs 43,000). IQR method: Outlier = value above Q3 + 1.5 x IQR.
        </div>
      </div>

      {/* SAS Frequency Distribution */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>Frequency Distribution — Status of Activity (sas)</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "inherit" }}>
            <thead><tr style={{ background: "#1a1a2e", color: "#fff" }}>
              <th style={{ padding: "8px 10px", textAlign: "left" }}>Code</th>
              <th style={{ padding: "8px 10px", textAlign: "left" }}>Category</th>
              <th style={{ padding: "8px 10px", textAlign: "right" }}>Count</th>
              <th style={{ padding: "8px 10px", textAlign: "right" }}>%</th>
              <th style={{ padding: "8px 10px", textAlign: "right" }}>Cum %</th>
            </tr></thead>
            <tbody>
              {[
                { code: "11", cat: "Self-employed (own account)", count: "37,876", pct: "3.3%", cum: "3.3%", color: "#2563eb" },
                { code: "12", cat: "Self-employed (employer)", count: "2,312", pct: "0.2%", cum: "3.5%", color: "#3b82f6" },
                { code: "21", cat: "Helper in HH enterprise", count: "43,165", pct: "3.8%", cum: "7.3%", color: "#be185d" },
                { code: "31", cat: "Regular wage/salaried", count: "3,038", pct: "0.3%", cum: "7.5%", color: "#16a34a" },
                { code: "41", cat: "Casual labour (public works)", count: "9,117", pct: "0.8%", cum: "8.3%", color: "#f59e0b" },
                { code: "51", cat: "Casual labour (other)", count: "21,045", pct: "1.8%", cum: "10.1%", color: "#ea580c" },
                { code: "NaN", cat: "Missing / Not in labour force", count: "1,032,044", pct: "89.9%", cum: "100.0%", color: "#dc2626" },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e5e0", background: r.code === "NaN" ? "#fef2f2" : i % 2 ? "#f8fafc" : "#fff" }}>
                  <td style={{ padding: "6px 10px", fontFamily: "monospace", fontWeight: 700, color: r.color }}>{r.code}</td>
                  <td style={{ padding: "6px 10px", fontWeight: r.code === "NaN" ? 700 : 400 }}>{r.cat}</td>
                  <td style={{ padding: "6px 10px", textAlign: "right", fontWeight: 600 }}>{r.count}</td>
                  <td style={{ padding: "6px 10px", textAlign: "right" }}>{r.pct}</td>
                  <td style={{ padding: "6px 10px", textAlign: "right" }}>{r.cum}</td>
                </tr>
              ))}
              <tr style={{ background: "#1a1a2e", color: "#fff", fontWeight: 700 }}>
                <td style={{ padding: "6px 10px" }}></td>
                <td style={{ padding: "6px 10px" }}>Total</td>
                <td style={{ padding: "6px 10px", textAlign: "right" }}>1,148,597</td>
                <td style={{ padding: "6px 10px", textAlign: "right" }}>100.0%</td>
                <td style={{ padding: "6px 10px", textAlign: "right" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", height: 28, borderRadius: 6, overflow: "hidden", gap: 2, marginBottom: 8 }}>
            <div style={{ flex: 3.3, background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 8, fontWeight: 700 }}>OA</div>
            <div style={{ flex: 3.8, background: "#be185d", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 8, fontWeight: 700 }}>HH</div>
            <div style={{ flex: 0.8, background: "#f59e0b" }}></div>
            <div style={{ flex: 1.8, background: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 8, fontWeight: 700 }}>CL</div>
            <div style={{ flex: 89.9, background: "#e5e5e0", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontSize: 10, fontWeight: 700 }}>Missing / Not in LF (89.9%)</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#777", lineHeight: 1.5, marginTop: 8 }}>
          89.9% of records have missing SAS — these are persons not in the labour force (children, students, homemakers, elderly). Among those with activity status, <strong>Helper in HH enterprise (3.8%)</strong> and <strong>Self-employed own account (3.3%)</strong> are the largest categories. Regular wage/salaried is only 0.3% of total population.
        </div>
      </div>

      {/* Avg Income by Gender */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 }}>Average Total Income by Gender</div>
        <div style={{ fontSize: 12, color: "#777", marginBottom: 14 }}>Filter: tothrs_wrk &gt; 0 AND total_income &gt; 0 | 311,798 records</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "inherit" }}>
          <thead><tr style={{ background: "#1a1a2e", color: "#fff" }}>
            <th style={{ padding: "8px 12px", textAlign: "left" }}>Gender</th>
            <th style={{ padding: "8px 12px", textAlign: "right" }}>Mean Income</th>
            <th style={{ padding: "8px 12px", textAlign: "right" }}>Median Income</th>
            <th style={{ padding: "8px 12px", textAlign: "right" }}>Count</th>
          </tr></thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e5e5e0" }}>
              <td style={{ padding: "8px 12px", fontWeight: 600, color: "#2563eb" }}>Male</td>
              <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 700 }}>Rs 21,058</td>
              <td style={{ padding: "8px 12px", textAlign: "right" }}>Rs 15,500</td>
              <td style={{ padding: "8px 12px", textAlign: "right" }}>2,32,082</td>
            </tr>
            <tr style={{ background: "#f8fafc" }}>
              <td style={{ padding: "8px 12px", fontWeight: 600, color: "#be185d" }}>Female</td>
              <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 700 }}>Rs 11,445</td>
              <td style={{ padding: "8px 12px", textAlign: "right" }}>Rs 6,500</td>
              <td style={{ padding: "8px 12px", textAlign: "right" }}>79,716</td>
            </tr>
          </tbody>
        </table>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
          <div style={{ background: "#fef2f2", borderRadius: 8, padding: "14px", border: "1px solid #fecaca", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#dc2626", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Gender Gap (Mean)</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#dc2626" }}>45.7%</div>
            <div style={{ fontSize: 11, color: "#777" }}>Women earn 45.7% less than men</div>
          </div>
          <div style={{ background: "#fef2f2", borderRadius: 8, padding: "14px", border: "1px solid #fecaca", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#dc2626", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Gender Gap (Median)</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#dc2626" }}>58.1%</div>
            <div style={{ fontSize: 11, color: "#777" }}>Even starker at median level</div>
          </div>
        </div>
        <div style={{ marginTop: 12, display: "flex", height: 28, borderRadius: 6, overflow: "hidden", gap: 2 }}>
          <div style={{ flex: 21058, background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700 }}>Male Rs 21,058</div>
          <div style={{ flex: 11445, background: "#be185d", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700 }}>Female Rs 11,445</div>
        </div>
      </div>

      {/* Gender Analysis */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>Gender Analysis</div>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 16 }}>
          The PLFS dataset codes gender as: <strong>1 = Male</strong>, <strong>2 = Female</strong>. Out of 1,148,634 respondents, approximately 50.2% are Male and 49.8% Female.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          <div style={{ background: "#eff6ff", borderRadius: 8, padding: "16px", border: "1px solid #bfdbfe" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#2563eb", marginBottom: 6 }}>Male (sex = 1)</div>
            <div style={{ fontSize: 11, color: "#444", lineHeight: 1.6 }}>
              LFPR: 16.7% | Higher earnings (median) | More in regular wage & casual labour | Dominate construction, transport sectors | Higher UR at 17.4%
            </div>
          </div>
          <div style={{ background: "#fdf2f8", borderRadius: 8, padding: "16px", border: "1px solid #f9a8d4" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#be185d", marginBottom: 6 }}>Female (sex = 2)</div>
            <div style={{ fontSize: 11, color: "#444", lineHeight: 1.6 }}>
              LFPR: 13.9% | Lower median earnings | More as helpers in HH enterprise | Concentrated in agriculture | UR at 11.7% | LFPR drops sharply after marriage
            </div>
          </div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Gender Gaps Observed</div>
        {[
          { gap: "LFPR Gap", detail: "Male 16.7% vs Female 13.9% — ~2.8 percentage points. Gap widens in urban areas.", color: "#2563eb" },
          { gap: "Earnings Gap", detail: "Male median earnings significantly higher than female. Visible in box plot (Graph 12). Gap persists across education levels.", color: "#f59e0b" },
          { gap: "Employment Type Gap", detail: "Women disproportionately in 'helper in HH enterprise' (unpaid family work). Men dominate 'regular wage/salaried' and 'casual labour'.", color: "#be185d" },
          { gap: "Marital Status Effect", detail: "Married women show lower LFPR than unmarried women. Married men show HIGHER LFPR. Marriage pushes women out of workforce and men into it.", color: "#7c3aed" },
          { gap: "Work Hours Gap", detail: "Women who work tend to work fewer paid hours, but total work (paid + unpaid domestic) is often higher. Undercounting of women's economic contribution.", color: "#059669" },
        ].map((g, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, padding: "10px 14px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0", borderLeft: `4px solid ${g.color}` }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: g.color }}>{g.gap}</div>
              <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{g.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Data Description */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>Data Description (21 Variables)</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "inherit" }}>
            <thead><tr style={{ background: "#1a1a2e", color: "#fff" }}>
              <th style={{ padding: "8px 10px", textAlign: "left" }}>Variable</th>
              <th style={{ padding: "8px 10px", textAlign: "left" }}>Description</th>
              <th style={{ padding: "8px 10px", textAlign: "left" }}>Values</th>
            </tr></thead>
            <tbody>{[
              { v: "st", d: "State code", val: "1-37 (mapped to state names)" },
              { v: "sex", d: "Gender", val: "1=Male, 2=Female" },
              { v: "age", d: "Age in years", val: "0-99" },
              { v: "marst", d: "Marital status", val: "1=Never married, 2=Currently married, 3=Widowed, 4=Divorced/Separated" },
              { v: "gedu_lvl", d: "General education level", val: "1=Not literate to 13=PG Technical" },
              { v: "tedu_lvl", d: "Technical education level", val: "1-16" },
              { v: "curr_att", d: "Current attendance in education", val: "Various codes" },
              { v: "sas", d: "Status of activity (employment type)", val: "11=Self-emp (own), 12=Self-emp (employer), 21=HH helper, 31=Regular wage, 41=Casual (public), 51=Casual (other)" },
              { v: "ind_sas", d: "Industry code (NIC)", val: "5-digit NIC codes" },
              { v: "ocu_sas", d: "Occupation code (NCO)", val: "3-digit NCO codes" },
              { v: "wrk_365", d: "Worked in last 365 days", val: "1=Yes, 2=No" },
              { v: "evr_wrk", d: "Ever worked", val: "1=Yes, 2=No" },
              { v: "ern_reg", d: "Regular wage/salary earnings (Rs/month)", val: "0 to high values" },
              { v: "ern_self", d: "Self-employment earnings (Rs/month)", val: "0 to high values" },
              { v: "tothrs_wrk", d: "Total hours worked per week", val: "0-98" },
              { v: "totadl_wrk", d: "Total adult workers in HH", val: "0+" },
              { v: "dur_unp", d: "Duration of unemployment", val: "1-5 (duration brackets)" },
              { v: "eff_pas", d: "Efforts for seeking/available for work", val: "1-7" },
              { v: "voc", d: "Vocational training received", val: "1-6" },
              { v: "voc_fld", d: "Field of vocational training", val: "Various codes" },
              { v: "voc_typ", d: "Type of vocational training", val: "1=Formal, 2=Non-formal, 3=Both" },
              { v: "total_income", d: "Total income (ern_reg + ern_self)", val: "Derived column — sum of regular wages and self-employment earnings" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e5e0", background: i % 2 ? "#f8fafc" : "#fff" }}>
                <td style={{ padding: "6px 10px", fontWeight: 600, fontFamily: "monospace", color: "#2563eb" }}>{r.v}</td>
                <td style={{ padding: "6px 10px" }}>{r.d}</td>
                <td style={{ padding: "6px 10px", fontSize: 10, color: "#777" }}>{r.val}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 12 }}>Exploratory Graphs (16 visualizations from actual data)</div>

      {graphs.map((g, i) => (
        <div key={i} style={sectionStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#2563eb", background: "#eff6ff", padding: "2px 8px", borderRadius: 4, marginRight: 8 }}>{g.type}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{g.title}</span>
            </div>
            <span style={{ fontSize: 11, color: "#999" }}>Graph {i + 1}/16</span>
          </div>
          <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6, marginBottom: 12 }}>{g.desc}</div>
          <img src={BASE + g.file} alt={g.title} style={{ width: "100%", borderRadius: 8, border: "1px solid #e5e5e0" }} loading="lazy" />
          <button
            onClick={() => setShowCode(showCode === i ? null : i)}
            style={{ marginTop: 10, padding: "6px 14px", background: showCode === i ? "#1a1a2e" : "#f8fafc", color: showCode === i ? "#fff" : "#555", border: "1px solid #d5d5d0", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit" }}
          >
            {showCode === i ? "Hide Python Code" : "Show Python Code"}
          </button>
          {showCode === i && (
            <pre style={{ marginTop: 8, background: "#1a1a2e", color: "#e2e8f0", padding: "14px 16px", borderRadius: 8, fontSize: 11, lineHeight: 1.6, overflow: "auto", fontFamily: "'Courier New', monospace" }}>
              {g.code}
            </pre>
          )}
        </div>
      ))}

      <div style={{ padding: "16px 20px", background: "#f0f0ec", borderRadius: 10, fontSize: 12, color: "#777", lineHeight: 1.7 }}>
        <strong>Source:</strong> PLFS Microdata from microdata.gov.in/NADA | 1,148,634 records analyzed
        <br /><strong>Tools:</strong> Python 3, NumPy, Pandas, Matplotlib | Full script: <code>plfs/plfs_eda_actual.py</code>
      </div>
      </div>}
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

// ==================== ENERGY DASHBOARD (Comprehensive) ====================

function EnergyDashboard() {
  const [activeSection, setActiveSection] = useState("lpg");
  const [hoveredBar, setHoveredBar] = useState(null);

  // ===== DATA CONSTANTS =====

  // India LPG Data (Source: PPAC / MoPNG Annual Reports, in MMT)
  const lpgData = {
    years: ["2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24", "2024-25E"],
    demand: [24.9, 27.6, 27.6, 29.4, 30.6, 32.2, 34.0],
    production: [12.4, 12.8, 12.5, 12.7, 13.1, 13.4, 13.8],
    imports: [12.9, 15.1, 15.6, 17.1, 17.9, 19.2, 20.5],
    importDependency: [51.8, 54.7, 56.5, 58.2, 58.5, 59.6, 60.3],
    connections: [24.3, 27.9, 28.7, 30.4, 31.7, 33.0, 34.2], // crore
    subsidyBurden: [25849, 24468, 13498, 4679, 5813, 3171, 2400], // crore INR
  };

  // India Oil (HSD + MS) Data (Source: PPAC, in MMT)
  const oilData = {
    years: ["2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24", "2024-25E"],
    diesel: {
      consumption: [83.5, 82.6, 72.7, 80.1, 87.9, 89.8, 92.5],
      price: [65.5, 69.2, 79.0, 93.5, 89.6, 87.9, 87.6], // INR/litre avg
    },
    petrol: {
      consumption: [28.3, 30.0, 27.1, 30.8, 34.3, 36.0, 38.2],
      price: [72.5, 75.2, 86.3, 103.0, 102.1, 101.5, 101.2],
    },
    crudeImport: [226.5, 227.0, 196.5, 212.0, 232.7, 232.5, 238.0], // MMT
    crudePrice: [69.9, 60.5, 44.3, 79.2, 89.1, 82.3, 76.5], // USD/bbl avg
    importBill: [111.9, 101.4, 62.2, 119.2, 157.5, 132.4, 125.0], // USD Bn
  };

  // Enhanced LPG Data
  const lpgEnhanced = {
    stateWise: [
      { state: "Uttar Pradesh", value: 4.82 }, { state: "Maharashtra", value: 3.45 }, { state: "Rajasthan", value: 2.28 },
      { state: "West Bengal", value: 2.15 }, { state: "Madhya Pradesh", value: 2.08 }, { state: "Tamil Nadu", value: 1.96 },
      { state: "Gujarat", value: 1.85 }, { state: "Karnataka", value: 1.78 }, { state: "Bihar", value: 1.65 }, { state: "Andhra Pradesh", value: 1.52 },
    ],
    ujjwala: { years: ["2016-17", "2017-18", "2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24"], connections: [1.58, 3.18, 7.19, 8.03, 8.03, 9.13, 9.59, 10.35] },
    perCapita: [
      { country: "USA", value: 47.2 }, { country: "Saudi Arabia", value: 42.5 }, { country: "Japan", value: 38.1 },
      { country: "South Korea", value: 35.6 }, { country: "Brazil", value: 25.8 }, { country: "World Avg", value: 22.4 },
      { country: "China", value: 18.7 }, { country: "India", value: 16.8 }, { country: "Indonesia", value: 14.2 }, { country: "Bangladesh", value: 4.5 },
    ],
    priceBuildup: [
      { label: "Refinery Gate Price", value: 603.26, color: "#1e40af" }, { label: "Freight Charges", value: 45.50, color: "#0891b2" },
      { label: "Bottling Charges", value: 47.82, color: "#7c3aed" }, { label: "Distributor Commission", value: 61.64, color: "#b45309" },
      { label: "GST (5%)", value: 37.91, color: "#dc2626" }, { label: "Subsidy Credit (DBT)", value: -6.75, color: "#16a34a" },
    ],
    refineryProd: [
      { name: "IOCL", value: 4250, color: "#dc2626" }, { name: "RIL", value: 2980, color: "#1e40af" },
      { name: "BPCL", value: 2150, color: "#059669" }, { name: "HPCL", value: 1620, color: "#b45309" },
      { name: "MRPL", value: 890, color: "#7c3aed" }, { name: "CPCL", value: 560, color: "#0891b2" },
      { name: "NRL", value: 340, color: "#78350f" }, { name: "Others", value: 610, color: "#999" },
    ],
    seasonal: { months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"], index: [92, 88, 85, 86, 90, 95, 102, 108, 115, 118, 112, 105] },
  };

  // Enhanced Oil Data
  const oilEnhanced = {
    petrolBuildup: [
      { label: "Base Price (Refinery)", value: 39.14, color: "#1e40af" }, { label: "Central Excise Duty", value: 19.90, color: "#dc2626" },
      { label: "Dealer Commission", value: 3.76, color: "#b45309" }, { label: "State VAT (Delhi)", value: 16.07, color: "#7c3aed" },
      { label: "Other Charges", value: 15.93, color: "#78350f" },
    ],
    dieselBuildup: [
      { label: "Base Price (Refinery)", value: 41.34, color: "#1e40af" }, { label: "Central Excise Duty", value: 21.80, color: "#dc2626" },
      { label: "Dealer Commission", value: 2.58, color: "#b45309" }, { label: "State VAT (Delhi)", value: 12.76, color: "#7c3aed" },
      { label: "Other Charges", value: 9.12, color: "#78350f" },
    ],
    cityPrices: [
      { city: "Delhi", petrol: 94.72, diesel: 87.62 }, { city: "Mumbai", petrol: 103.44, diesel: 89.97 },
      { city: "Chennai", petrol: 100.75, diesel: 92.43 }, { city: "Kolkata", petrol: 104.95, diesel: 91.76 },
      { city: "Bengaluru", petrol: 101.94, diesel: 87.89 }, { city: "Hyderabad", petrol: 107.41, diesel: 95.65 },
      { city: "Jaipur", petrol: 104.88, diesel: 90.36 }, { city: "Lucknow", petrol: 94.65, diesel: 87.82 },
    ],
    omcShare: [
      { name: "IOCL", outlets: 35844, value: 47.2, color: "#dc2626" },
      { name: "BPCL", outlets: 20147, value: 26.5, color: "#1e40af" },
      { name: "HPCL", outlets: 20025, value: 26.3, color: "#059669" },
    ],
    refineryThroughput: [
      { company: "IOCL", capacity: 80.7, throughput: 83.2, utilization: 103.1 },
      { company: "RIL (Jamnagar)", capacity: 68.2, throughput: 70.5, utilization: 103.4 },
      { company: "BPCL", capacity: 38.3, throughput: 36.8, utilization: 96.1 },
      { company: "HPCL", capacity: 24.9, throughput: 25.6, utilization: 102.8 },
      { company: "MRPL", capacity: 15.0, throughput: 16.2, utilization: 108.0 },
      { company: "Nayara Energy", capacity: 20.0, throughput: 20.8, utilization: 104.0 },
      { company: "CPCL", capacity: 11.5, throughput: 10.9, utilization: 94.8 },
      { company: "NRL", capacity: 3.0, throughput: 2.8, utilization: 93.3 },
    ],
    ethanol: { years: ["2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24", "2024-25E"], blend: [5.0, 5.6, 8.1, 10.2, 12.1, 14.6, 17.0] },
  };

  // Natural Gas Data
  const gasData = {
    years: ["2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24", "2024-25E"],
    production: [32.9, 31.2, 28.7, 34.0, 34.5, 35.4, 37.0],
    consumption: [54.2, 56.8, 55.6, 59.3, 57.8, 61.2, 64.5],
    lngImports: [23.7, 28.1, 30.5, 28.5, 26.3, 28.8, 30.2],
    importDependency: [43.7, 49.5, 54.9, 48.1, 45.5, 47.1, 46.8],
    cgd: {
      years: ["2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24", "2024-25E"],
      gas: [86, 136, 228, 295, 407, 538, 630],
      png: [42, 52, 67, 88, 102, 118, 135],
      cng: [2135, 2998, 3857, 4715, 5555, 6400, 7200],
    },
    pricing: {
      apm: [3.36, 2.39, 1.79, 6.10, 8.57, 6.50, 6.50],
      kgBasin: [7.67, 5.61, 4.06, 9.92, 12.46, 9.96, 9.30],
      spotLng: [9.80, 4.50, 7.20, 25.60, 18.40, 12.50, 11.80],
    },
    pipeline: { operational: 22162, underConstruction: 14239, planned: 8000, target: 34500 },
  };

  // Refining & Infrastructure Data
  const infraData = {
    refineryCapacity: [
      { company: "IOCL", capacity: 80.7, refineries: 11, color: "#dc2626" },
      { company: "RIL", capacity: 68.2, refineries: 2, color: "#1e40af" },
      { company: "BPCL", capacity: 38.3, refineries: 4, color: "#059669" },
      { company: "HPCL", capacity: 24.9, refineries: 3, color: "#b45309" },
      { company: "Nayara", capacity: 20.0, refineries: 1, color: "#7c3aed" },
      { company: "MRPL", capacity: 15.0, refineries: 1, color: "#0891b2" },
      { company: "CPCL", capacity: 11.5, refineries: 2, color: "#78350f" },
      { company: "NRL", capacity: 3.0, refineries: 1, color: "#f59e0b" },
    ],
    utilization: [103.4, 101.7, 88.5, 99.8, 107.2, 105.8, 104.0],
    pipelines: [
      { type: "Crude Oil", km: 10894, color: "#78350f" }, { type: "Petroleum Products", km: 16459, color: "#1e40af" },
      { type: "Natural Gas", km: 22162, color: "#059669" }, { type: "LPG", km: 3690, color: "#f59e0b" },
    ],
    spr: [
      { location: "Visakhapatnam", capacity: 1.33, status: "Operational", color: "#16a34a" },
      { location: "Mangaluru", capacity: 1.50, status: "Operational", color: "#16a34a" },
      { location: "Padur", capacity: 2.50, status: "Operational", color: "#16a34a" },
      { location: "Chandikhol", capacity: 4.40, status: "Phase-II (Proposed)", color: "#f59e0b" },
      { location: "Padur Expansion", capacity: 2.50, status: "Phase-II (Proposed)", color: "#f59e0b" },
    ],
    lngTerminals: [
      { name: "Dahej (GSPL)", capacity: 17.5 }, { name: "Hazira (Shell)", capacity: 5.0 },
      { name: "Dabhol (RGPPL)", capacity: 5.0 }, { name: "Kochi (Petronet)", capacity: 5.0 },
      { name: "Ennore (IOCL)", capacity: 5.0 }, { name: "Mundra (GSPC)", capacity: 5.0 },
    ],
  };

  // Enhanced Overview Data
  const overviewEnhanced = {
    energyMix: [
      { label: "Coal", value: 55.2, color: "#57534e" }, { label: "Petroleum", value: 26.8, color: "#78350f" },
      { label: "Natural Gas", value: 6.2, color: "#059669" }, { label: "Renewables", value: 7.1, color: "#16a34a" },
      { label: "Nuclear", value: 1.3, color: "#7c3aed" }, { label: "Hydro", value: 3.4, color: "#0891b2" },
    ],
    globalConsumers: [
      { country: "USA", value: 20.1 }, { country: "China", value: 16.0 }, { country: "India", value: 5.5 },
      { country: "Saudi Arabia", value: 3.8 }, { country: "Japan", value: 3.5 }, { country: "Russia", value: 3.4 },
      { country: "South Korea", value: 2.7 }, { country: "Brazil", value: 2.6 }, { country: "Canada", value: 2.3 }, { country: "Germany", value: 2.1 },
    ],
    securityIndicators: [
      { label: "Crude Import Dep.", actual: 87.7, target: 67, unit: "%", color: "#dc2626", targetYear: "2030" },
      { label: "Gas Import Dep.", actual: 46.8, target: 35, unit: "%", color: "#b45309", targetYear: "2030" },
      { label: "SPR Cover", actual: 9.5, target: 22, unit: "days", color: "#7c3aed", targetYear: "2030" },
      { label: "Ethanol Blend", actual: 17, target: 20, unit: "%", color: "#16a34a", targetYear: "2025-26" },
      { label: "RE in Electricity", actual: 43.4, target: 50, unit: "%", color: "#059669", targetYear: "2030" },
    ],
    emissions: {
      years: ["2019-20", "2020-21", "2021-22", "2022-23", "2023-24", "2024-25E"],
      transport: [245, 210, 238, 260, 268, 275],
      industry: [185, 165, 180, 195, 200, 205],
      residential: [78, 82, 80, 76, 74, 72],
      other: [52, 48, 54, 57, 58, 60],
    },
    projections: {
      scenarios: ["IEA STEPS", "IEA APS", "NITI Reference", "NITI Ambitious"],
      years: ["2025", "2030", "2035", "2040", "2047"],
      values: [
        [242, 278, 305, 328, 360],
        [242, 262, 268, 255, 230],
        [242, 285, 318, 348, 380],
        [242, 258, 255, 235, 195],
      ],
    },
  };

  // ===== UTILITY FUNCTIONS =====
  const maxVal = (arr) => Math.max(...arr);
  const barWidth = (val, max) => `${(val / max) * 100}%`;
  const interpolateColor = (low, high, t) => {
    const parse = (hex) => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
    const [lr, lg, lb] = parse(low);
    const [hr, hg, hb] = parse(high);
    const r = Math.round(lr + (hr - lr) * t), g = Math.round(lg + (hg - lg) * t), b = Math.round(lb + (hb - lb) * t);
    return `rgb(${r},${g},${b})`;
  };

  // ===== CHART COMPONENTS =====

  const SectionToggle = () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 20 }}>
      {[
        { key: "lpg", label: "LPG", icon: "🔥" },
        { key: "oil", label: "Oil & Fuels", icon: "⛽" },
        { key: "gas", label: "Natural Gas", icon: "💨" },
        { key: "infra", label: "Refining & Infra", icon: "🏭" },
        { key: "overview", label: "Overview", icon: "📊" },
      ].map((s) => (
        <button
          key={s.key}
          onClick={() => { setActiveSection(s.key); setHoveredBar(null); }}
          style={{
            flex: "1 1 100px", padding: "10px 8px", border: `2px solid ${activeSection === s.key ? "#0f3460" : "#e5e5e0"}`,
            borderRadius: 10, cursor: "pointer", fontSize: 11, fontWeight: activeSection === s.key ? 700 : 400,
            background: activeSection === s.key ? "#0f3460" : "#fff",
            color: activeSection === s.key ? "#fff" : "#666",
            fontFamily: "inherit", transition: "all 0.2s",
          }}
        >
          <span style={{ fontSize: 17, display: "block", marginBottom: 3 }}>{s.icon}</span>
          {s.label}
        </button>
      ))}
    </div>
  );

  const StatCard = ({ label, value, unit, color, sub }) => (
    <div style={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 10, padding: "16px 18px", flex: "1 1 140px" }}>
      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#999", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: color || "#1a1a2e", fontFamily: "'Courier New', monospace" }}>
        {value}<span style={{ fontSize: 12, fontWeight: 400, color: "#999", marginLeft: 4 }}>{unit}</span>
      </div>
      {sub && <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>{sub}</div>}
    </div>
  );

  const HorizontalBarChart = ({ data, labels, colors, maxValue, title, unit }) => (
    <div style={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
      <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#999", marginBottom: 14 }}>{title}</div>
      {labels.map((label, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 11, color: "#666", fontWeight: 600 }}>{label}</span>
            <span style={{ fontSize: 11, color: "#333", fontWeight: 700, fontFamily: "monospace" }}>
              {Array.isArray(data[0]) ? data.map((d, j) => `${d[i]}${j < data.length - 1 ? " / " : ""}`).join("") : `${data[i]} ${unit}`}
            </span>
          </div>
          <div style={{ display: "flex", gap: 2, height: 20, borderRadius: 4, overflow: "hidden", background: "#f5f5f2" }}>
            {Array.isArray(data[0]) ? data.map((d, j) => (
              <div
                key={j}
                onMouseEnter={() => setHoveredBar(`${title}-${i}-${j}`)}
                onMouseLeave={() => setHoveredBar(null)}
                style={{
                  width: barWidth(d[i], maxValue),
                  background: hoveredBar === `${title}-${i}-${j}` ? colors[j] + "dd" : colors[j],
                  transition: "all 0.3s", borderRadius: 3,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, color: "#fff", fontWeight: 700,
                }}
              >
                {d[i] > maxValue * 0.08 ? d[i] : ""}
              </div>
            )) : (
              <div
                style={{
                  width: barWidth(data[i], maxValue),
                  background: typeof colors === "string" ? colors : colors[i % colors.length],
                  transition: "all 0.3s", borderRadius: 3,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, color: "#fff", fontWeight: 700,
                }}
              >
                {data[i] > maxValue * 0.08 ? `${data[i]}` : ""}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const StackedBarChart = ({ title, labels, series, colors, legendLabels }) => {
    const maxTotal = Math.max(...labels.map((_, i) => series.reduce((sum, s) => sum + s[i], 0)));
    return (
      <div style={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#999" }}>{title}</div>
          <div style={{ display: "flex", gap: 12 }}>
            {legendLabels.map((l, i) => (
              <span key={i} style={{ fontSize: 10, color: colors[i], fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: colors[i], display: "inline-block" }} />
                {l}
              </span>
            ))}
          </div>
        </div>
        {labels.map((label, i) => {
          const total = series.reduce((sum, s) => sum + s[i], 0);
          return (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 11, color: "#666", fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: 11, color: "#333", fontWeight: 700, fontFamily: "monospace" }}>{total.toFixed(1)} MMT</span>
              </div>
              <div style={{ display: "flex", gap: 1, height: 22, borderRadius: 4, overflow: "hidden", background: "#f5f5f2" }}>
                {series.map((s, j) => (
                  <div
                    key={j}
                    style={{
                      width: `${(s[i] / maxTotal) * 100}%`,
                      background: colors[j], transition: "all 0.3s",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, color: "#fff", fontWeight: 700,
                    }}
                  >
                    {s[i] > maxTotal * 0.06 ? s[i] : ""}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const LineIndicator = ({ title, data, labels, color, unit, suffix }) => (
    <div style={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
      <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#999", marginBottom: 12 }}>{title}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, padding: "0 4px" }}>
        {data.map((val, i) => {
          const max = maxVal(data);
          const min = Math.min(...data);
          const range = max - min || 1;
          const height = ((val - min) / range) * 80 + 20;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: color, fontFamily: "monospace" }}>
                {val}{suffix || ""}
              </span>
              <div
                style={{
                  width: "100%", maxWidth: 40, height: `${height}%`,
                  background: `${color}22`, border: `2px solid ${color}`,
                  borderRadius: "4px 4px 0 0", transition: "all 0.3s",
                }}
              />
              <span style={{ fontSize: 8, color: "#999", textAlign: "center", lineHeight: 1.1 }}>
                {labels[i].replace("-", "\n")}
              </span>
            </div>
          );
        })}
      </div>
      {unit && <div style={{ fontSize: 10, color: "#bbb", textAlign: "right", marginTop: 6 }}>{unit}</div>}
    </div>
  );

  // --- DonutChart (SVG ring) ---
  const DonutChart = ({ title, segments, centerValue, centerLabel }) => {
    const total = segments.reduce((s, seg) => s + (seg.value || 0), 0) || 1;
    const circumference = 2 * Math.PI * 70;
    const arcs = [];
    let cum = 0;
    segments.forEach((seg) => {
      const arc = ((seg.value || 0) / total) * circumference;
      arcs.push({ ...seg, arc, offset: circumference - cum + circumference * 0.25 });
      cum += arc;
    });
    return (
      <div style={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#999", marginBottom: 10 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <svg viewBox="0 0 200 200" style={{ width: 180, height: 180, flexShrink: 0 }}>
            {arcs.map((a, i) => (
              <circle key={i} cx="100" cy="100" r="70" fill="none" stroke={a.color} strokeWidth="28"
                strokeDasharray={`${Math.max(a.arc - 1.5, 0)} ${circumference - Math.max(a.arc - 1.5, 0)}`} strokeDashoffset={a.offset}
                style={{ transition: "all 0.3s" }} />
            ))}
            {centerValue && <text x="100" y="95" textAnchor="middle" style={{ fontSize: 22, fontWeight: 800, fill: "#1a1a2e", fontFamily: "'Courier New', monospace" }}>{centerValue}</text>}
            {centerLabel && <text x="100" y="115" textAnchor="middle" style={{ fontSize: 10, fill: "#999" }}>{centerLabel}</text>}
          </svg>
          <div style={{ flex: 1, minWidth: 140 }}>
            {segments.map((seg, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: seg.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#666", flex: 1 }}>{seg.label || seg.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "monospace", color: "#333" }}>{seg.value} <span style={{ color: "#999", fontWeight: 400 }}>({Math.round(seg.value / total * 100)}%)</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // --- ComparisonTable ---
  const ComparisonTable = ({ title, headers, rows, note }) => (
    <div style={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 10, padding: "16px 20px", marginBottom: 16, overflowX: "auto" }}>
      <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#999", marginBottom: 10 }}>{title}</div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "inherit" }}>
        <thead>
          <tr>{headers.map((h, i) => <th key={i} style={{ background: "#1a1a2e", color: "#fff", padding: "8px 10px", textAlign: i === 0 ? "left" : "center", fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "#f9f9f7" }}>
              {row.cells.map((cell, ci) => (
                <td key={ci} style={{ padding: "7px 10px", textAlign: ci === 0 ? "left" : "center", fontWeight: ci === 0 ? 600 : 400, color: row.cellColors && row.cellColors[ci] ? row.cellColors[ci] : "#444", fontFamily: ci > 0 ? "monospace" : "inherit" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {note && <div style={{ fontSize: 10, color: "#999", marginTop: 8 }}>{note}</div>}
    </div>
  );

  // --- SparkLine (inline SVG) ---
  const SparkLine = ({ data, color, width, height }) => {
    const w = width || 100, h = height || 30;
    const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
    const points = data.map((v, i) => `${i * (w / (data.length - 1))},${h - 2 - ((v - min) / range) * (h - 4)}`).join(" ");
    return <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}><polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points={`0,${h} ${points} ${w},${h}`} fill={color} fillOpacity="0.08" stroke="none" /></svg>;
  };

  // --- HeatMapGrid ---
  const HeatMapGrid = ({ title, data, columns, lowColor, highColor, unit }) => {
    const allVals = data.flatMap((r) => columns.map((c) => r[c.key]));
    const min = Math.min(...allVals), max = Math.max(...allVals), range = max - min || 1;
    return (
      <div style={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#999", marginBottom: 10 }}>{title}</div>
        <div style={{ display: "grid", gridTemplateColumns: `100px repeat(${columns.length}, 1fr)`, gap: 3 }}>
          <div />
          {columns.map((c, i) => <div key={i} style={{ fontSize: 9, fontWeight: 700, textAlign: "center", color: "#666", padding: "4px 0" }}>{c.label}</div>)}
          {data.map((row, ri) => (
            <React.Fragment key={ri}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#444", padding: "6px 4px", display: "flex", alignItems: "center" }}>{row.label}</div>
              {columns.map((c, ci) => {
                const t = (row[c.key] - min) / range;
                return <div key={ci} style={{ background: interpolateColor(lowColor, highColor, t), padding: "6px 4px", borderRadius: 3, textAlign: "center", fontSize: 10, fontWeight: 700, color: t > 0.6 ? "#fff" : "#333", fontFamily: "monospace" }}>{row[c.key]}</div>;
              })}
            </React.Fragment>
          ))}
        </div>
        {unit && <div style={{ fontSize: 10, color: "#999", marginTop: 6, textAlign: "right" }}>{unit}</div>}
      </div>
    );
  };

  // --- GaugeIndicator (SVG semicircle) ---
  const GaugeIndicator = ({ title, actual, target, unit, color, width }) => {
    const arcLength = Math.PI * 80;
    const ratio = Math.min(actual / target, 1.2);
    const fillLength = ratio * arcLength;
    const pct = Math.round((actual / target) * 100);
    return (
      <div style={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 10, padding: "12px 14px", flex: width || "1 1 160px", textAlign: "center" }}>
        <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: "#999", marginBottom: 4 }}>{title}</div>
        <svg viewBox="0 0 200 120" style={{ width: "100%", maxWidth: 160, height: 80 }}>
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e5e5e0" strokeWidth="16" strokeLinecap="round" />
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={color} strokeWidth="16" strokeLinecap="round"
            strokeDasharray={`${fillLength} ${arcLength}`} />
          <text x="100" y="88" textAnchor="middle" style={{ fontSize: 24, fontWeight: 800, fill: color, fontFamily: "'Courier New', monospace" }}>{actual}</text>
          <text x="100" y="108" textAnchor="middle" style={{ fontSize: 10, fill: "#999" }}>/ {target} {unit}</text>
        </svg>
        <div style={{ fontSize: 10, color: pct >= 100 ? "#16a34a" : pct >= 75 ? "#b45309" : "#dc2626", fontWeight: 700 }}>{pct}% of target</div>
      </div>
    );
  };

  // --- PriceBuildup (vertical stacked) ---
  const PriceBuildup = ({ title, components, unit }) => {
    const positive = components.filter((c) => c.value > 0);
    const negative = components.filter((c) => c.value < 0);
    const total = positive.reduce((s, c) => s + c.value, 0) + negative.reduce((s, c) => s + c.value, 0);
    const maxH = 200;
    return (
      <div style={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#999", marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", fontFamily: "'Courier New', monospace", marginBottom: 12 }}>
          {unit}{total.toFixed(2)}
        </div>
        {components.map((c, i) => {
          const h = Math.abs(c.value) / positive.reduce((s, p) => s + p.value, 0) * maxH;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: 10, color: "#666", width: 140, flexShrink: 0, textAlign: "right" }}>{c.label}</span>
              <div style={{ flex: 1, height: 18, background: "#f5f5f2", borderRadius: 3, overflow: "hidden", position: "relative" }}>
                <div style={{
                  width: `${(Math.abs(c.value) / positive.reduce((s, p) => s + p.value, 0)) * 100}%`,
                  height: "100%", background: c.value < 0 ? `repeating-linear-gradient(45deg, ${c.color}, ${c.color} 4px, ${c.color}88 4px, ${c.color}88 8px)` : c.color,
                  borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 700,
                }}>{Math.abs(c.value).toFixed(1)}</div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", color: c.value < 0 ? "#16a34a" : "#333", width: 50, textAlign: "right" }}>
                {c.value < 0 ? "-" : ""}₹{Math.abs(c.value).toFixed(1)}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
      <SectionToggle />

      {/* ===== LPG Section ===== */}
      {activeSection === "lpg" && (
        <div>
          {/* Key Metrics */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <StatCard label="LPG Demand 2024-25E" value="34.0" unit="MMT" color="#dc2626" sub="Up from 24.9 MMT in 2018-19" />
            <StatCard label="Domestic Production" value="13.8" unit="MMT" color="#16a34a" sub="Only 40% of total demand" />
            <StatCard label="Import Dependency" value="60.3" unit="%" color="#b45309" sub="Imports: 20.5 MMT" />
            <StatCard label="LPG Connections" value="34.2" unit="Cr" color="#7c3aed" sub="Near saturation coverage" />
          </div>

          <StackedBarChart
            title="LPG Supply Composition — Domestic vs Imports (MMT)"
            labels={lpgData.years}
            series={[lpgData.production, lpgData.imports]}
            colors={["#16a34a", "#dc2626"]}
            legendLabels={["Domestic Production", "Imports"]}
          />

          <LineIndicator
            title="Import Dependency Trend"
            data={lpgData.importDependency}
            labels={lpgData.years}
            color="#b45309"
            suffix="%"
            unit="% of total consumption met by imports"
          />

          <HorizontalBarChart
            title="Year-wise LPG Demand (MMT)"
            data={lpgData.demand}
            labels={lpgData.years}
            colors="#0f3460"
            maxValue={maxVal(lpgData.demand)}
            unit="MMT"
          />

          <LineIndicator
            title="Government Subsidy Burden on LPG"
            data={lpgData.subsidyBurden}
            labels={lpgData.years}
            color="#be185d"
            unit="INR Crore — declining trend due to market-linked pricing"
          />

          {/* Policy Insights */}
          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#92400e", marginBottom: 8 }}>Key Policy Observations — LPG</div>
            <ul style={{ fontSize: 12, color: "#78350f", lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
              <li><strong>PM Ujjwala Yojana:</strong> 10.35 crore free connections to BPL households — near-universal access achieved</li>
              <li><strong>Rising import bill:</strong> India imports ~60% of its LPG, making it vulnerable to global price shocks</li>
              <li><strong>Subsidy rationalisation:</strong> From ~₹26,000 Cr (2018-19) to ~₹2,400 Cr (2024-25E) via DBT and price deregulation</li>
              <li><strong>Demand growth:</strong> 5.3% CAGR driven by rural penetration and shift from solid fuels</li>
              <li><strong>Infrastructure:</strong> 4 new LPG import terminals planned; bottling capacity expansion ongoing</li>
            </ul>
          </div>

          {/* --- Ujjwala Yojana Coverage --- */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <StatCard label="PMUY 1.0 (2016-19)" value="8.03" unit="Cr" color="#7c3aed" sub="Free connections to BPL" />
            <StatCard label="PMUY 2.0 (2021-24)" value="2.32" unit="Cr" color="#7c3aed" sub="Extended to migrant workers" />
            <StatCard label="Total Ujjwala" value="10.35" unit="Cr" color="#be185d" sub="Near-universal access" />
          </div>
          <HorizontalBarChart
            title="PM Ujjwala Yojana — Cumulative Connections (Crore)"
            data={lpgEnhanced.ujjwala.connections}
            labels={lpgEnhanced.ujjwala.years}
            colors="#7c3aed"
            maxValue={11}
            unit="Cr"
          />

          {/* --- State-wise LPG Consumption --- */}
          <HorizontalBarChart
            title="Top 10 States by LPG Consumption (2023-24, MMT)"
            data={lpgEnhanced.stateWise.map((s) => s.value)}
            labels={lpgEnhanced.stateWise.map((s) => s.state)}
            colors="#dc2626"
            maxValue={5.0}
            unit="MMT"
          />

          {/* --- Per Capita LPG: India vs World --- */}
          <HorizontalBarChart
            title="Per Capita LPG Consumption — Global Comparison (kg/person/year)"
            data={lpgEnhanced.perCapita.map((c) => c.value)}
            labels={lpgEnhanced.perCapita.map((c) => c.country)}
            colors={lpgEnhanced.perCapita.map((c) => c.country === "India" ? "#f59e0b" : c.country === "World Avg" ? "#dc2626" : "#0f3460")}
            maxValue={50}
            unit="kg/yr"
          />

          {/* --- Cylinder Price Buildup --- */}
          <PriceBuildup
            title="14.2 kg LPG Cylinder Price Buildup (Delhi, Jan 2025)"
            components={lpgEnhanced.priceBuildup}
            unit="₹"
          />
          <div style={{ fontSize: 10, color: "#999", marginTop: -10, marginBottom: 16, paddingLeft: 4 }}>
            Subsidy credited directly to consumer bank account via Direct Benefit Transfer (DBT)
          </div>

          {/* --- Refinery-wise LPG Production --- */}
          <DonutChart
            title="Refinery-wise LPG Production (2023-24, Thousand MT)"
            segments={lpgEnhanced.refineryProd}
            centerValue="13,400"
            centerLabel="TMT Total"
          />

          {/* --- Monthly Demand Pattern --- */}
          <LineIndicator
            title="Monthly LPG Demand Pattern (Index, 100 = Average)"
            data={lpgEnhanced.seasonal.index}
            labels={lpgEnhanced.seasonal.months}
            color="#b45309"
            unit="Peak: Dec-Jan (winter cooking/heating demand surge)"
          />
        </div>
      )}

      {/* ===== OIL (Diesel & Petrol) Section ===== */}
      {activeSection === "oil" && (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <StatCard label="Diesel Consumption" value="92.5" unit="MMT" color="#1e40af" sub="2024-25E — 40% of oil products" />
            <StatCard label="Petrol Consumption" value="38.2" unit="MMT" color="#dc2626" sub="2024-25E — fastest growing" />
            <StatCard label="Crude Import Bill" value="$125" unit="Bn" color="#b45309" sub="2024-25E — 85% dependency" />
            <StatCard label="Crude Oil Price" value="76.5" unit="$/bbl" color="#059669" sub="Indian basket avg 2024-25" />
          </div>

          <StackedBarChart
            title="Diesel vs Petrol Consumption Trend (MMT)"
            labels={oilData.years}
            series={[oilData.diesel.consumption, oilData.petrol.consumption]}
            colors={["#1e40af", "#dc2626"]}
            legendLabels={["HSD (Diesel)", "MS (Petrol)"]}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <LineIndicator
              title="Diesel Price Trend"
              data={oilData.diesel.price}
              labels={oilData.years}
              color="#1e40af"
              suffix=""
              unit="INR/litre — average retail price"
            />
            <LineIndicator
              title="Petrol Price Trend"
              data={oilData.petrol.price}
              labels={oilData.years}
              color="#dc2626"
              suffix=""
              unit="INR/litre — average retail price"
            />
          </div>

          <LineIndicator
            title="Crude Oil Import Volume (MMT)"
            data={oilData.crudeImport}
            labels={oilData.years}
            color="#78350f"
            unit="MMT — India is world's 3rd largest oil importer"
          />

          <LineIndicator
            title="India's Crude Oil Import Bill"
            data={oilData.importBill}
            labels={oilData.years}
            color="#b45309"
            suffix=""
            unit="USD Billion — significant current account impact"
          />

          <HorizontalBarChart
            title="Indian Basket Crude Oil Price (USD/barrel)"
            data={oilData.crudePrice}
            labels={oilData.years}
            colors={["#059669", "#16a34a", "#22c55e", "#b45309", "#dc2626", "#f59e0b", "#0f3460"]}
            maxValue={maxVal(oilData.crudePrice)}
            unit="$/bbl"
          />

          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af", marginBottom: 8 }}>Key Policy Observations — Oil</div>
            <ul style={{ fontSize: 12, color: "#1e3a5f", lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
              <li><strong>Deregulation:</strong> Petrol deregulated (2010), Diesel (2014) — but prices often held steady before elections</li>
              <li><strong>Ethanol Blending:</strong> E20 target by 2025-26; current blend ~15% — reduces import dependency by ~$4 Bn/year</li>
              <li><strong>EV Push:</strong> FAME-II and PM E-DRIVE scheme to reduce petrol/diesel consumption long-term</li>
              <li><strong>Refining capacity:</strong> India has 253.9 MMTPA — 4th largest globally; plans to add 56 MMTPA by 2028</li>
              <li><strong>Strategic reserves:</strong> 5.33 MMT at Visakhapatnam, Mangaluru, Padur — covers ~9.5 days of imports</li>
              <li><strong>Tax structure:</strong> Central excise + state VAT accounts for ~55% of retail petrol price and ~48% of diesel</li>
            </ul>
          </div>

          {/* --- Fuel Price Buildup (Side by Side) --- */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <PriceBuildup title="Petrol Price Buildup (Delhi)" components={oilEnhanced.petrolBuildup} unit="₹" />
            <PriceBuildup title="Diesel Price Buildup (Delhi)" components={oilEnhanced.dieselBuildup} unit="₹" />
          </div>
          <div style={{ fontSize: 10, color: "#999", marginTop: -10, marginBottom: 16, textAlign: "center" }}>
            Taxes (excise + VAT) account for ~55% of petrol and ~48% of diesel retail price
          </div>

          {/* --- City-wise Fuel Prices --- */}
          <HeatMapGrid
            title="Fuel Prices Across Major Cities (INR/litre, Jan 2025)"
            data={oilEnhanced.cityPrices.map((c) => ({ label: c.city, petrol: c.petrol, diesel: c.diesel }))}
            columns={[{ key: "petrol", label: "Petrol (MS)" }, { key: "diesel", label: "Diesel (HSD)" }]}
            lowColor="#d4edda"
            highColor="#dc2626"
            unit="INR/litre — Variation due to state VAT differences"
          />

          {/* --- OMC Market Share --- */}
          <DonutChart
            title="Oil Marketing Company Retail Outlet Market Share"
            segments={oilEnhanced.omcShare}
            centerValue="76,016"
            centerLabel="Total Outlets"
          />

          {/* --- Refinery Throughput Table --- */}
          <ComparisonTable
            title="Refinery Throughput (2023-24, MMTPA)"
            headers={["Company", "Capacity", "Throughput", "Utilization"]}
            rows={oilEnhanced.refineryThroughput.map((r) => ({
              cells: [r.company, r.capacity, r.throughput, `${r.utilization}%`],
              cellColors: [null, null, null, r.utilization >= 100 ? "#16a34a" : r.utilization >= 90 ? "#b45309" : "#dc2626"],
            }))}
            note="Utilization >100% indicates throughput above nameplate capacity through debottlenecking"
          />

          {/* --- Ethanol Blending Progress --- */}
          <LineIndicator
            title="Ethanol Blending with Petrol (%)"
            data={oilEnhanced.ethanol.blend}
            labels={oilEnhanced.ethanol.years}
            color="#16a34a"
            suffix="%"
            unit="Target: E20 (20% blending) by 2025-26"
          />
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <GaugeIndicator title="E20 Target Progress" actual={17} target={20} unit="%" color="#16a34a" />
            <div style={{ flex: "2 1 200px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#059669", marginBottom: 6 }}>Ethanol Blending Impact</div>
              <ul style={{ fontSize: 11, color: "#064e3b", lineHeight: 1.8, margin: 0, paddingLeft: 16 }}>
                <li>Saves ~$4 Bn/year in crude oil import bill</li>
                <li>Reduces CO2 emissions by ~30 lakh tonnes annually</li>
                <li>Supports 5 lakh farmers through sugarcane procurement</li>
                <li>470+ distilleries with 1,700 crore litre capacity</li>
              </ul>
            </div>
          </div>

          {/* --- BS-VI Card --- */}
          <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#059669", marginBottom: 8 }}>BS-VI Emission Standards — India's Leap</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 10 }}>
              {[
                { label: "Compliance", value: "100%", sub: "All new vehicles since Apr 2020" },
                { label: "Sulphur in Fuel", value: "10 ppm", sub: "Down from 50 ppm (BS-IV)" },
                { label: "NOx Reduction", value: "25%", sub: "vs BS-IV norms" },
                { label: "PM Reduction", value: "80%", sub: "Particulate matter" },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#059669", fontFamily: "'Courier New', monospace" }}>{item.value}</div>
                  <div style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>{item.label}</div>
                  <div style={{ fontSize: 9, color: "#666", marginTop: 2 }}>{item.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#064e3b", lineHeight: 1.6 }}>
              India skipped BS-V entirely, leapfrogging directly from BS-IV to BS-VI — one of the fastest emission standard transitions globally. This required ₹31,000 crore investment by auto and oil companies.
            </div>
          </div>
        </div>
      )}

      {/* ===== NATURAL GAS Section ===== */}
      {activeSection === "gas" && (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <StatCard label="Gas Production 2024-25E" value="37.0" unit="BCM" color="#059669" sub="Domestic output rising" />
            <StatCard label="Gas Consumption" value="64.5" unit="BCM" color="#1e40af" sub="Growing demand" />
            <StatCard label="LNG Imports" value="30.2" unit="BCM" color="#b45309" sub="46.8% of consumption" />
            <StatCard label="Import Dependency" value="46.8" unit="%" color="#dc2626" sub="Lower than crude oil" />
          </div>

          <StackedBarChart
            title="Natural Gas Supply — Domestic Production + LNG Imports (BCM)"
            labels={gasData.years}
            series={[gasData.production, gasData.lngImports]}
            colors={["#059669", "#b45309"]}
            legendLabels={["Domestic Production", "LNG Imports"]}
          />

          <LineIndicator
            title="Gas Import Dependency Trend (%)"
            data={gasData.importDependency}
            labels={gasData.years}
            color="#dc2626"
            suffix="%"
            unit="% of consumption met by LNG imports"
          />

          {/* CGD Coverage */}
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#999", marginBottom: 10, marginTop: 8 }}>City Gas Distribution (CGD) Expansion</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[
              { label: "GAs Authorized", value: "630", data: gasData.cgd.gas, color: "#7c3aed", sub: "Geographical Areas" },
              { label: "PNG Connections", value: "135 L", data: gasData.cgd.png, color: "#059669", sub: "Piped Natural Gas (Lakh)" },
              { label: "CNG Stations", value: "7,200", data: gasData.cgd.cng, color: "#1e40af", sub: "Across India" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: "#999" }}>{item.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: item.color, fontFamily: "'Courier New', monospace", margin: "4px 0" }}>{item.value}</div>
                <div style={{ fontSize: 10, color: "#999", marginBottom: 8 }}>{item.sub}</div>
                <SparkLine data={item.data} color={item.color} height={35} />
              </div>
            ))}
          </div>

          {/* Gas Pricing */}
          <ComparisonTable
            title="Natural Gas Pricing Trends (USD/MMBTU)"
            headers={["Category", ...gasData.years]}
            rows={[
              { cells: ["APM Domestic", ...gasData.pricing.apm] },
              { cells: ["KG Basin (Difficult)", ...gasData.pricing.kgBasin] },
              { cells: ["Spot LNG", ...gasData.pricing.spotLng] },
            ]}
            note="APM = Administered Price Mechanism. KG Basin prices include difficult field premium. Spot LNG highly volatile."
          />

          {/* Pipeline Network */}
          <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            <GaugeIndicator title="Pipeline Target" actual={22162} target={34500} unit="km" color="#059669" width="1 1 200px" />
            <div style={{ flex: "2 1 300px" }}>
              <HorizontalBarChart
                title="Gas Pipeline Network Status (km)"
                data={[gasData.pipeline.operational, gasData.pipeline.underConstruction, gasData.pipeline.planned]}
                labels={["Operational", "Under Construction", "Planned"]}
                colors={["#059669", "#f59e0b", "#999"]}
                maxValue={25000}
                unit="km"
              />
            </div>
          </div>

          {/* Gas Policy Card */}
          <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#059669", marginBottom: 8 }}>Key Policy Observations — Natural Gas</div>
            <ul style={{ fontSize: 12, color: "#064e3b", lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
              <li><strong>OALP Rounds:</strong> Open Acreage Licensing Policy — 8 rounds completed, 2.7 lakh sq km awarded</li>
              <li><strong>CGD Expansion:</strong> 630 GAs authorized covering 98% of India's population and geography</li>
              <li><strong>Indian Gas Exchange:</strong> IGX launched for transparent gas price discovery (trade started 2020)</li>
              <li><strong>Kisan Urja Suraksha:</strong> CNG in agricultural operations — tractors, pump sets</li>
              <li><strong>Gas-based Economy:</strong> Target to increase gas share from 6.2% to 15% of energy mix by 2030</li>
              <li><strong>Freedom Pricing:</strong> Market-determined prices for deep-water, ultra-deep-water, and high-pressure fields</li>
            </ul>
          </div>
        </div>
      )}

      {/* ===== REFINING & INFRASTRUCTURE Section ===== */}
      {activeSection === "infra" && (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <StatCard label="Refining Capacity" value="253.9" unit="MMTPA" color="#0f3460" sub="4th largest globally" />
            <StatCard label="Utilization Rate" value="104" unit="%" color="#059669" sub="Above nameplate capacity" />
            <StatCard label="Pipeline Network" value="53,205" unit="km" color="#1e40af" sub="Crude+Product+Gas+LPG" />
            <StatCard label="Strategic Reserve" value="5.33" unit="MMT" color="#dc2626" sub="~9.5 days import cover" />
          </div>

          {/* Refinery Capacity by Company */}
          <DonutChart
            title="Refinery Capacity by Company (MMTPA)"
            segments={infraData.refineryCapacity.map((r) => ({ label: r.company, value: r.capacity, color: r.color }))}
            centerValue="253.9"
            centerLabel="MMTPA Total"
          />

          {/* Capacity Utilization Trend */}
          <LineIndicator
            title="Refinery Capacity Utilization (%)"
            data={infraData.utilization}
            labels={lpgData.years}
            color="#059669"
            suffix="%"
            unit="Values >100% indicate throughput above nameplate capacity (debottlenecking)"
          />

          {/* Pipeline Network by Type */}
          <HorizontalBarChart
            title="Pipeline Network by Type (km)"
            data={infraData.pipelines.map((p) => p.km)}
            labels={infraData.pipelines.map((p) => p.type)}
            colors={infraData.pipelines.map((p) => p.color)}
            maxValue={25000}
            unit="km"
          />

          {/* Strategic Petroleum Reserve */}
          <ComparisonTable
            title="Strategic Petroleum Reserves (SPR)"
            headers={["Location", "Capacity (MMT)", "Status"]}
            rows={infraData.spr.map((s) => ({
              cells: [s.location, s.capacity, s.status],
              cellColors: [null, null, s.status === "Operational" ? "#16a34a" : "#b45309"],
            }))}
            note="Total Phase-I: 5.33 MMT (operational). Phase-II proposed: 6.9 MMT additional."
          />
          <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            <GaugeIndicator title="SPR Phase I + II Target" actual={5.33} target={12.23} unit="MMT" color="#dc2626" />
            <GaugeIndicator title="Days of Import Cover" actual={9.5} target={22} unit="days" color="#7c3aed" />
          </div>

          {/* LNG Terminal Infrastructure */}
          <ComparisonTable
            title="LNG Regasification Terminals"
            headers={["Terminal", "Capacity (MMTPA)"]}
            rows={infraData.lngTerminals.map((t) => ({ cells: [t.name, t.capacity] }))}
            note={`Total regasification capacity: ${infraData.lngTerminals.reduce((s, t) => s + t.capacity, 0)} MMTPA across ${infraData.lngTerminals.length} terminals`}
          />

          {/* Terminal Summary */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <StatCard label="LNG Terminals" value="6" unit="" color="#0891b2" sub="42.5 MMTPA capacity" />
            <StatCard label="Crude Import Terminals" value="17" unit="" color="#78350f" sub="Across all coasts" />
            <StatCard label="Product Export Terminals" value="12" unit="" color="#1e40af" sub="Net product exporter" />
            <StatCard label="LPG Import Terminals" value="8" unit="" color="#f59e0b" sub="Growing with demand" />
          </div>

          {/* Planned Expansion */}
          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", marginBottom: 8 }}>Major Planned Capacity Additions</div>
            <ul style={{ fontSize: 12, color: "#5b21b6", lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
              <li><strong>Barmer Refinery (Rajasthan):</strong> 9 MMTPA — HPCL-Rajasthan Refinery Ltd JV, commissioning expected 2027</li>
              <li><strong>Ratnagiri Mega-Refinery:</strong> 60 MMTPA proposed — consortium of Saudi Aramco, ADNOC, and Indian OMCs</li>
              <li><strong>CPCL Nagapattinam:</strong> 9 MMTPA greenfield — environmental clearance obtained</li>
              <li><strong>Numaligarh Expansion:</strong> 3 to 9 MMTPA — crude supply via Paradip-Numaligarh pipeline</li>
              <li><strong>BPCL Bina:</strong> 7.8 to 11 MMTPA expansion — includes petrochemical integration</li>
              <li><strong>SPR Phase-II:</strong> 6.9 MMT additional storage at Chandikhol (4.4 MMT) and Padur expansion (2.5 MMT)</li>
            </ul>
          </div>
        </div>
      )}

      {/* ===== OVERVIEW Section ===== */}
      {activeSection === "overview" && (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <StatCard label="Total Petroleum Demand" value="233" unit="MMT" color="#0f3460" sub="2024-25E — 3rd largest globally" />
            <StatCard label="Crude Import Dependency" value="87.7" unit="%" color="#dc2626" sub="Structural vulnerability" />
            <StatCard label="Refining Capacity" value="253.9" unit="MMTPA" color="#059669" sub="Net exporter of products" />
            <StatCard label="Per Capita Consumption" value="1.4" unit="TOE" color="#7c3aed" sub="vs 4.5 TOE world average" />
          </div>

          {/* India's Primary Energy Mix */}
          <DonutChart
            title="India's Primary Energy Mix (2023-24)"
            segments={overviewEnhanced.energyMix}
            centerValue="100%"
            centerLabel="Total Energy"
          />

          {/* Product Mix Table */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e0", borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#999", marginBottom: 14 }}>
              Petroleum Product Mix 2024-25E (% of total consumption)
            </div>
            {[
              { name: "HSD (Diesel)", share: 38.2, color: "#1e40af" },
              { name: "MS (Petrol)", share: 15.8, color: "#dc2626" },
              { name: "LPG", share: 14.0, color: "#f59e0b" },
              { name: "Petroleum Coke", share: 7.8, color: "#78350f" },
              { name: "Naphtha", share: 6.2, color: "#7c3aed" },
              { name: "ATF (Aviation)", share: 3.8, color: "#0891b2" },
              { name: "Bitumen", share: 2.8, color: "#57534e" },
              { name: "Others", share: 11.4, color: "#999" },
            ].map((item) => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: "#666", fontWeight: 600, width: 120, flexShrink: 0 }}>{item.name}</span>
                <div style={{ flex: 1, height: 18, background: "#f5f5f2", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${item.share * 2.5}%`, height: "100%", background: item.color, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6 }}>
                    <span style={{ fontSize: 9, color: "#fff", fontWeight: 700 }}>{item.share}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Global Comparison — Top 10 Oil Consumers */}
          <HorizontalBarChart
            title="Top 10 Global Oil Consumers (million barrels/day, 2023)"
            data={overviewEnhanced.globalConsumers.map((c) => c.value)}
            labels={overviewEnhanced.globalConsumers.map((c) => c.country)}
            colors={overviewEnhanced.globalConsumers.map((c) => c.country === "India" ? "#f59e0b" : "#0f3460")}
            maxValue={22}
            unit="mb/d"
          />

          {/* Energy Security Indicators */}
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#999", marginBottom: 10, marginTop: 8 }}>Energy Security Indicators — Actual vs Target</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            {overviewEnhanced.securityIndicators.map((ind, i) => (
              <GaugeIndicator key={i} title={`${ind.label} (${ind.targetYear})`} actual={ind.actual} target={ind.target} unit={ind.unit} color={ind.color} />
            ))}
          </div>

          {/* CO2 Emissions */}
          <StackedBarChart
            title="CO2 Emissions from Petroleum Sector (MMT CO2)"
            labels={overviewEnhanced.emissions.years}
            series={[overviewEnhanced.emissions.transport, overviewEnhanced.emissions.industry, overviewEnhanced.emissions.residential, overviewEnhanced.emissions.other]}
            colors={["#dc2626", "#b45309", "#7c3aed", "#999"]}
            legendLabels={["Transport", "Industry", "Residential", "Other"]}
          />

          {/* India's Energy Landscape quick facts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#dc2626", marginBottom: 8 }}>Challenges</div>
              <ul style={{ fontSize: 11, color: "#7f1d1d", lineHeight: 1.8, margin: 0, paddingLeft: 16 }}>
                <li>87.7% crude oil import dependency</li>
                <li>~$125 Bn annual import bill</li>
                <li>Price volatility pass-through lags</li>
                <li>Subsidy targeting & leakage</li>
                <li>Under-recovery during price freezes</li>
              </ul>
            </div>
            <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#059669", marginBottom: 8 }}>Opportunities</div>
              <ul style={{ fontSize: 11, color: "#064e3b", lineHeight: 1.8, margin: 0, paddingLeft: 16 }}>
                <li>E20 ethanol blending by 2025-26</li>
                <li>Green hydrogen mission (5 MMT by 2030)</li>
                <li>Gas-based economy (15% share target)</li>
                <li>EV adoption reducing oil demand</li>
                <li>Refinery-to-chemical conversions</li>
              </ul>
            </div>
          </div>

          {/* Future Demand Projections */}
          <ComparisonTable
            title="India Petroleum Demand Projections (MMT Oil Equivalent)"
            headers={["Scenario", ...overviewEnhanced.projections.years]}
            rows={overviewEnhanced.projections.scenarios.map((s, i) => ({
              cells: [s, ...overviewEnhanced.projections.values[i]],
              cellColors: [null, ...overviewEnhanced.projections.values[i].map((v) => v > 300 ? "#dc2626" : v < 250 ? "#16a34a" : "#b45309")],
            }))}
            note="IEA APS = Announced Pledges Scenario; STEPS = Stated Policies; NITI Amb = Net Zero pathway. Base year 2025 = 242 MMT."
          />

          <div style={{ background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", marginBottom: 8 }}>India's Energy Transition Roadmap</div>
            <div style={{ fontSize: 12, color: "#5b21b6", lineHeight: 1.8 }}>
              India aims to reduce oil import dependency from ~88% to 67% by 2030 through a combination of increased domestic production (OALP rounds), biofuel blending (E20/B5), natural gas expansion (City Gas Distribution to 630 districts), EV penetration (30% of new vehicle sales by 2030), and green hydrogen (National Green Hydrogen Mission — ₹19,744 Cr). The refining sector, already a net exporter, plans capacity additions at Barmer (9 MMTPA), Ratnagiri (60 MMTPA — proposed), and CPCL expansion.
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 24, padding: "16px 20px", background: "#f0f0ec", borderRadius: 10, fontSize: 11, color: "#999", lineHeight: 1.7 }}>
        <strong>Sources:</strong> PPAC (Petroleum Planning & Analysis Cell), MoPNG Annual Reports, Indian Oil & Gas Statistics, CEIC Data, RBI Handbook of Statistics. E = Estimated.
        <br />
        <strong>Note:</strong> This is an illustrative dashboard for academic purposes. Figures are based on publicly available government data and industry estimates.
      </div>
    </div>
  );
}

export default function LowiClassification() {
  const getInitialTab = () => {
    const hash = window.location.hash.replace("#", "");
    if (["publicpolicy", "procurement", "plfs"].includes(hash)) return hash;
    return "publicpolicy";
  };
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [subTab, setSubTab] = useState("classify");

  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);
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
            {activeTab === "publicpolicy" ? "Public Policy" : activeTab === "energy" ? "Energy Dashboard" : "Public Procurement"}
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 0 }}>
          {[
            { key: "publicpolicy", label: "Public Policy" },
            { key: "procurement", label: "Public Procurement" },
            { key: "plfs", label: "PLFS Analysis" },
            { key: "energy", label: "Energy Dashboard" },
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
      {activeTab === "plfs" && <PLFSAnalysis />}
      {activeTab === "energy" && <EnergyDashboard />}

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
