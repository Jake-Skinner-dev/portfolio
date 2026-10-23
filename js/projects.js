/*
  ============================================================
  YOUR PROJECTS — edit this list to change the Work section.
  ============================================================

  Each project becomes a card in the gallery and a case study that
  opens when someone clicks it.

  Fields:
    title        Project name (shown on the cover artwork)
    code         Optional 3-letter code for the Results timing tower
    client       Client or brand name
    category     Used for the filter buttons, e.g. "Social", "Marketing", "Branding"
    year         When you did it
    role         What you did
    summary      One-line description for the card
    challenge    The problem / brief
    approach     What you did and why
    results      Up to 3 headline results: { value: "+180%", label: "..." }
                 (the first one also appears in the Results timing tower)
    deliverables List of things you produced
    link         Optional URL to the live work (or leave as "")

  Artwork:
    image        Optional path to a cover image, e.g. "/assets/work/ratby.jpg".
                 If empty, a designed placeholder poster is generated using:
    bg, fg       Poster background and text colours
    motif        Poster pattern: "circle", "stripes", "grid", "arch", "dots", "wave"
    gallery      Optional extra images for the case study:
                 ["/assets/work/ratby-1.jpg", "/assets/work/ratby-2.jpg"]
*/

window.PROJECTS = [
  {
    title: "Fusion 360 Group",
    code: "FUS",
    client: "Fusion 360 Group",
    category: "Marketing",
    year: "2025 — Present",
    role: "Sales & Marketing Executive",
    summary: "Looking after the company's social media and organising and running events and exhibitions across the UK.",
    challenge:
      "As Sales & Marketing Executive, my role covers two sides of marketing: keeping the brand active and consistent on social media, and getting the company in front of people face to face at events and exhibitions around the UK.",
    approach:
      "I manage the social media channels day to day, planning and creating content that keeps the brand visible. Alongside that, I organise and run events and exhibitions across the UK, from the early planning and logistics through to representing the company on the day.",
    // EDIT: swap in real numbers when you have them, e.g. { value: "12", label: "exhibitions run" }
    results: [
      { value: "UK-wide", label: "events & exhibitions organised and run" },
      { value: "Daily", label: "social media management" },
      { value: "2-in-1", label: "sales and marketing role" }
    ],
    deliverables: ["Social media management", "Content creation", "Event planning", "Exhibitions"],
    link: "",
    image: "",
    bg: "#16161a",
    fg: "#ffb020",
    motif: "wave",
    gallery: []
  },
  {
    title: "Ratby Sunday FC",
    code: "RSF",
    client: "Ratby Sunday FC",
    category: "Branding",
    year: "Jan 2025 — Present",
    role: "Website design, social media, branding",
    summary: "Designed the club's website, run its social media and refreshed its branding.",
    challenge:
      "The aim was to give Ratby Sunday FC a proper home online: somewhere players, supporters and sponsors can find the club, backed up by a consistent look across everything the club puts out.",
    approach:
      "I designed the club's website, updated its branding so it works consistently across the site and social channels, and now run the club's social media, keeping supporters up to date with fixtures, results and club news.",
    // EDIT: swap in real numbers when you have them, e.g. { value: "+40%", label: "follower growth" }
    results: [
      { value: "New", label: "club website designed" },
      { value: "Refresh", label: "updated club branding" },
      { value: "Ongoing", label: "social media since Jan 2025" }
    ],
    deliverables: ["Website design", "Branding refresh", "Social media management"],
    link: "", // EDIT: add the club website's URL here
    image: "",
    bg: "#ff2d20",
    fg: "#0d0e10",
    motif: "dots",
    gallery: []
  },
  {
    title: "Mia Treleven",
    code: "MIA",
    client: "Mia Treleven — personal wellness brand",
    category: "Branding",
    year: "", // EDIT: add the year, e.g. "2025"
    role: "Logo design, content planning, sponsorship portfolio",
    summary: "Helped Mia Treleven launch her personal wellness brand on social media, from logo to content plan to a sponsorship-ready portfolio.",
    challenge:
      "Mia wanted to turn her passion for wellness into a personal brand on social media, but was starting from scratch: no logo, no plan for what to post, and nothing to show brands she wanted to work with.",
    approach:
      "I designed her logo to give the brand a recognisable identity from day one, worked with her on content planning so she had a clear direction for what to post and when, and put together a portfolio she can send to brands when approaching them for sponsorships.",
    // EDIT: swap in real numbers when you have them, e.g. { value: "2k", label: "followers" }
    results: [
      { value: "Launched", label: "wellness brand on social media" },
      { value: "New", label: "logo designed" },
      { value: "Ready", label: "portfolio for sponsorship pitches" }
    ],
    deliverables: ["Logo design", "Content planning", "Sponsorship portfolio"],
    link: "", // EDIT: add her Instagram or TikTok link here
    image: "",
    bg: "#cfe3d4",
    fg: "#24463a",
    motif: "arch",
    gallery: []
  },
  {
    title: "Leicester & Charnwood",
    code: "LCS",
    client: "Leicester & Charnwood Sunday Football League",
    category: "Social",
    year: "2025",
    role: "Social media, template design, insights",
    summary: "Ran the league's social media, created a new set of templates and monitored all of its insights.",
    challenge:
      "A Sunday league has a lot to communicate every week: fixtures, results, tables and announcements across many clubs. The league needed social media that kept everyone up to date and looked consistent while doing it.",
    approach:
      "I ran the league's social media and designed a new set of reusable templates, so every post was quick to produce and instantly recognisable as the league's. I monitored the insights across the channels to see which content performed best, and used what I learned to shape what we posted.",
    // EDIT: swap in real numbers when you have them, e.g. { value: "+65%", label: "reach" }
    results: [
      { value: "New", label: "social media template suite" },
      { value: "Data-led", label: "content shaped by insights" },
      { value: "2025", label: "season of league content" }
    ],
    deliverables: ["Social media management", "Template design", "Insights reporting"],
    link: "",
    image: "",
    bg: "#1f6f37",
    fg: "#f3f3f1",
    motif: "stripes",
    gallery: []
  }
];
