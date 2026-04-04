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
function PolicyChoice({ policyIndex, correctCat, choices, onUpdate, participant }) {
  const key = `policy_${policyIndex}`;
  const current = choices[key] || null;
  const isCorrect = current === correctCat;

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
      {current && (
        <div style={{
          marginTop: 8, fontSize: 12, fontWeight: 700,
          color: isCorrect ? "#16a34a" : "#dc2626",
          background: isCorrect ? "#f0fdf4" : "#fef2f2",
          padding: "6px 12px", borderRadius: 6, display: "inline-block",
        }}>
          {isCorrect ? "Correct! Matches the given classification." : `Different from given classification (${categories[correctCat].label}).`}
        </div>
      )}
    </div>
  );
}

export default function LowiClassification() {
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
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", color: "#fff", padding: "32px 24px 28px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", opacity: 0.6, marginBottom: 8 }}>
            IIM Mumbai PPM — Assignment & Learning
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 }}>
            India's Annual Policy Review 2024-25
          </h1>
          <div style={{ fontSize: 14, opacity: 0.7 }}>
            Theodore Lowi's Framework · PRS Legislative Research · {total} policies classified
          </div>
          {totalResponded > 0 && (
            <div style={{ marginTop: 12, display: "flex", gap: 16, fontSize: 12, opacity: 0.8 }}>
              <span style={{ background: "rgba(255,255,255,0.15)", padding: "4px 10px", borderRadius: 4 }}>
                Reviewed: {totalResponded}/{total}
              </span>
              <span style={{ background: "rgba(22,163,74,0.3)", padding: "4px 10px", borderRadius: 4 }}>
                Agree: {totalAgreed}
              </span>
              <span style={{ background: "rgba(220,38,38,0.3)", padding: "4px 10px", borderRadius: 4 }}>
                Disagree: {totalDisagreed}
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
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
              {Object.values(choices).filter(Boolean).length > 0 && (
                <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>
                  Correct: {Object.entries(choices).filter(([k, v]) => v && v === policies[parseInt(k.split("_")[1])]?.cat).length}
                </span>
              )}
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

        {/* Bar chart */}
        <div style={{ background: "#fff", borderRadius: 10, padding: "16px 20px", marginBottom: 20, border: "1px solid #e5e5e0" }}>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#999", marginBottom: 12 }}>Distribution</div>
          <div style={{ display: "flex", height: 28, borderRadius: 6, overflow: "hidden", gap: 2 }}>
            {Object.entries(categories).map(([key, cat]) => (
              <div
                key={key}
                style={{
                  width: `${(counts[key] / total) * 100}%`,
                  background: activeCategory && activeCategory !== key ? "#e5e5e0" : cat.color,
                  transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 10, fontWeight: 700, fontFamily: "monospace", cursor: "pointer",
                }}
                onClick={() => { setActiveCategory(activeCategory === key ? null : key); setActiveSector(null); }}
                title={`${cat.label}: ${counts[key]} (${Math.round((counts[key] / total) * 100)}%)`}
              >
                {counts[key] > 3 ? `${Math.round((counts[key] / total) * 100)}%` : ""}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
            {Object.entries(categories).map(([key, cat]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#666" }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: cat.color }} />
                {cat.label} ({counts[key]})
              </div>
            ))}
          </div>
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
            const stanceBadge = resp?.stance === "agree" ? "border-left: 4px solid #16a34a" : resp?.stance === "disagree" ? "border-left: 4px solid #dc2626" : "";
            return (
              <div
                key={i}
                onClick={() => setExpandedPolicy(isExpanded ? null : i)}
                style={{
                  background: "#fff",
                  border: `1px solid ${isExpanded ? cat.border : "#e5e5e0"}`,
                  borderLeft: `4px solid ${resp?.stance === "agree" ? "#16a34a" : resp?.stance === "disagree" ? "#dc2626" : cat.color}`,
                  borderRadius: 8, padding: "12px 16px", cursor: "pointer", transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                        color: cat.color, background: cat.bg, padding: "2px 8px", borderRadius: 4,
                      }}>{cat.label}</span>
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
                    <PolicyChoice policyIndex={globalIndex} correctCat={p.cat} choices={choices} onUpdate={updateChoice} participant={participant} />
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
      </div>
    </div>
  );
}
