/*
  ============================================================
  YOUR PROJECTS — edit this list to change the Work section.
  ============================================================

  Each project becomes a card in the gallery and a case study that
  opens when someone clicks it. All of these are SAMPLE projects —
  replace them with your own.

  Fields:
    title        Project name (shown on the cover artwork)
    client       Client or brand name
    category     One of: "Branding", "Campaigns", "Social", "Print"
                 (these become the filter buttons — add new ones freely)
    year         Year delivered
    role         What you did
    summary      One-line description for the card
    challenge    The problem / brief
    approach     What you did and why
    results      Up to 3 headline numbers: { value: "+180%", label: "..." }
                 (the first one also appears in the Results timing tower)
    deliverables List of things you produced
    link         Optional URL to the live work (or leave as "")

  Artwork:
    image        Optional path to a cover image, e.g. "/assets/work/bloom.jpg".
                 If empty, a designed placeholder poster is generated using:
    bg, fg       Poster background and text colours
    motif        Poster pattern: "circle", "stripes", "grid", "arch", "dots", "wave"
    gallery      Optional extra images for the case study:
                 ["/assets/work/bloom-1.jpg", "/assets/work/bloom-2.jpg"]
*/

window.PROJECTS = [
  {
    title: "Bloom & Co.",
    client: "Bloom & Co. Florists",
    category: "Branding",
    year: "2025",
    role: "Brand identity, art direction",
    summary: "A full rebrand for an independent florist moving online.",
    challenge:
      "Bloom had a loyal local following but a dated logo and no visual system that worked on social or e-commerce. They needed an identity that felt premium without losing its neighbourhood warmth.",
    approach:
      "I ran a discovery workshop with the founders, built moodboards around 'wild but considered', then designed a flexible logo suite, a botanical illustration set and a colour system that flexes across packaging, web and Instagram.",
    results: [
      { value: "+64%", label: "online orders in 3 months" },
      { value: "2.1×", label: "Instagram follower growth" },
      { value: "40+", label: "branded assets delivered" }
    ],
    deliverables: ["Logo suite", "Brand guidelines", "Packaging", "Social templates"],
    link: "",
    image: "",
    bg: "#f6c1c7",
    fg: "#5b1220",
    motif: "circle",
    gallery: []
  },
  {
    title: "Summer Drop",
    client: "Volt Sportswear",
    category: "Campaigns",
    year: "2025",
    role: "Campaign concept, design, paid social",
    summary: "An integrated launch campaign for a seasonal product drop.",
    challenge:
      "Volt needed to launch a limited summer collection in a crowded market with a modest paid budget and a two-week window.",
    approach:
      "I developed the 'Built for the heat' concept, then designed out-of-home posters, a motion-led paid social set and an email sequence — all built from one modular layout system so variations could be produced quickly.",
    results: [
      { value: "3.2M", label: "campaign impressions" },
      { value: "4.8%", label: "paid social CTR" },
      { value: "Sold out", label: "in 9 days" }
    ],
    deliverables: ["Campaign concept", "OOH posters", "Paid social", "Email design"],
    link: "",
    image: "",
    bg: "#ff4d2e",
    fg: "#1a0b06",
    motif: "stripes",
    gallery: []
  },
  {
    title: "Northside",
    client: "Northside Coffee Roasters",
    category: "Print",
    year: "2024",
    role: "Packaging design",
    summary: "Coffee packaging system for a small-batch roaster.",
    challenge:
      "Northside's bags all looked the same, so customers struggled to tell blends apart on the shelf.",
    approach:
      "I created a colour-coded packaging system where each origin gets its own palette and pattern, with tasting notes set in a bold, scannable hierarchy.",
    results: [
      { value: "+35%", label: "retail sell-through" },
      { value: "12", label: "SKUs redesigned" },
      { value: "1", label: "regional design award" }
    ],
    deliverables: ["Packaging system", "Labels", "Point of sale"],
    link: "",
    image: "",
    bg: "#1f3b2d",
    fg: "#e9dcc0",
    motif: "arch",
    gallery: []
  },
  {
    title: "FitFuel",
    client: "FitFuel Nutrition",
    category: "Social",
    year: "2024",
    role: "Social strategy, content design",
    summary: "A social content system that tripled engagement.",
    challenge:
      "FitFuel posted daily but with no consistent look, and engagement had flatlined.",
    approach:
      "I audited their channels, defined three content pillars and designed a template library for posts, stories and reels covers — making it easy for their team to stay on-brand at speed.",
    results: [
      { value: "+180%", label: "average engagement" },
      { value: "+22k", label: "new followers" },
      { value: "60%", label: "less time per post" }
    ],
    deliverables: ["Content strategy", "Template library", "Reels covers"],
    link: "",
    image: "",
    bg: "#d7f25c",
    fg: "#18200a",
    motif: "dots",
    gallery: []
  },
  {
    title: "Riverside Fest",
    client: "Riverside Arts Festival",
    category: "Print",
    year: "2023",
    role: "Poster series, wayfinding",
    summary: "A bold typographic poster series and festival signage.",
    challenge:
      "The festival needed a look that would stand out across the city and scale from posters to wristbands to stage signage.",
    approach:
      "I designed a kinetic, type-led identity built on a grid, so every artist poster felt part of one family while still being unique.",
    results: [
      { value: "18k", label: "attendees" },
      { value: "30", label: "posters in the series" },
      { value: "+48%", label: "ticket sales vs last year" }
    ],
    deliverables: ["Poster series", "Wayfinding", "Merch"],
    link: "",
    image: "",
    bg: "#2b2bff",
    fg: "#f3f0e8",
    motif: "grid",
    gallery: []
  },
  {
    title: "Lumen",
    client: "Lumen App",
    category: "Campaigns",
    year: "2023",
    role: "Launch campaign, landing page design",
    summary: "Go-to-market campaign for a new productivity app.",
    challenge:
      "Lumen was launching into a market full of lookalike apps and needed a clear, memorable story.",
    approach:
      "I shaped the 'Light up your day' message, designed the landing page and created launch creative for App Store, social and email.",
    results: [
      { value: "25k", label: "sign-ups in launch month" },
      { value: "12%", label: "landing page conversion" },
      { value: "#3", label: "on Product Hunt" }
    ],
    deliverables: ["Messaging", "Landing page", "Launch creative"],
    link: "",
    image: "",
    bg: "#16161a",
    fg: "#ffd166",
    motif: "wave",
    gallery: []
  }
];
