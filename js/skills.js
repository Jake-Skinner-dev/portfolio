/*
  ============================================================
  YOUR STARTING XI — edit this list to change the Skills pitch.
  ============================================================

  Eleven skills laid out in a 4-4-2. Each one becomes a player on the
  pitch and gets a player card when clicked.

  Fields:
    number   Shirt number shown on the token
    name     The skill
    pos      Position label on the card (GK, DEF, MID, FWD)
    x, y     Where they stand: x = 0 (own goal) to 100 (opponent's goal),
             y = 0 to 100 across the pitch
    rating   Overall rating, out of 99
    stats    Six attributes, out of 99:
             CRE creativity, STR strategy, CRA craft,
             SPD speed, COL collaboration, RES results
    note     One line about how you use this skill
*/

window.SQUAD = [
  {
    number: 1, name: "Strategy", pos: "GK", x: 6, y: 50, rating: 88,
    stats: { CRE: 80, STR: 94, CRA: 82, SPD: 84, COL: 90, RES: 91 },
    note: "The last line of defence: every project starts with a clear brief, audience and goal."
  },
  {
    number: 2, name: "Research", pos: "DEF", x: 25, y: 86, rating: 84,
    stats: { CRE: 76, STR: 90, CRA: 80, SPD: 82, COL: 86, RES: 85 },
    note: "Audience insight, competitor audits and trend spotting before a single pixel is placed."
  },
  {
    number: 5, name: "Typography", pos: "DEF", x: 23, y: 62, rating: 90,
    stats: { CRE: 88, STR: 80, CRA: 95, SPD: 84, COL: 82, RES: 86 },
    note: "Type pairing, hierarchy and kerning that make layouts feel considered."
  },
  {
    number: 4, name: "Layout & Grids", pos: "DEF", x: 23, y: 38, rating: 87,
    stats: { CRE: 84, STR: 82, CRA: 93, SPD: 86, COL: 80, RES: 84 },
    note: "Solid grids that keep everything — from posters to social carousels — in shape."
  },
  {
    number: 3, name: "Colour", pos: "DEF", x: 25, y: 14, rating: 86,
    stats: { CRE: 90, STR: 78, CRA: 90, SPD: 82, COL: 80, RES: 84 },
    note: "Palettes with purpose: accessible, on-brand and built to stand out."
  },
  {
    number: 6, name: "Analytics", pos: "MID", x: 48, y: 62, rating: 85,
    stats: { CRE: 72, STR: 92, CRA: 78, SPD: 86, COL: 84, RES: 94 },
    note: "Reading the data — Meta Ads, Google Analytics, A/B tests — and acting on it."
  },
  {
    number: 10, name: "Art Direction", pos: "FWD", x: 74, y: 34, rating: 91,
    stats: { CRE: 95, STR: 88, CRA: 92, SPD: 82, COL: 92, RES: 88 },
    note: "The number 10 up front: setting the creative vision and pulling the whole campaign together."
  },
  {
    number: 8, name: "Copywriting", pos: "MID", x: 48, y: 38, rating: 84,
    stats: { CRE: 88, STR: 84, CRA: 85, SPD: 86, COL: 82, RES: 84 },
    note: "Headlines, captions and calls to action that sound like the brand."
  },
  {
    number: 7, name: "Social Media", pos: "MID", x: 50, y: 86, rating: 90,
    stats: { CRE: 92, STR: 86, CRA: 88, SPD: 94, COL: 86, RES: 92 },
    note: "Flying down the wing: scroll-stopping posts, reels and template systems that keep brands consistent at speed."
  },
  {
    number: 9, name: "Brand Identity", pos: "FWD", x: 74, y: 66, rating: 93,
    stats: { CRE: 95, STR: 90, CRA: 96, SPD: 84, COL: 88, RES: 92 },
    note: "The striker: logos, visual systems and guidelines that people recognise instantly."
  },
  {
    number: 11, name: "Campaigns", pos: "MID", x: 50, y: 14, rating: 91,
    stats: { CRE: 93, STR: 92, CRA: 88, SPD: 88, COL: 90, RES: 94 },
    note: "Integrated concepts across OOH, digital and email — built to launch and convert."
  }
];
