# Jake Skinner — Marketing & Graphic Designer Portfolio

A fast, dependency-free portfolio built with plain HTML, CSS and JavaScript.
No build step — Vercel serves the files as-is.

## Features

- **Kinetic hero** — rotating headline phrases and draggable "stickers" (badge, star, colour swatch, pills)
- **Services marquee** — an endlessly scrolling band of what you do
- **Animated stats** — numbers count up when they scroll into view
- **Filterable work gallery** — filter by category with smooth animated re-layout
- **Case study pop-ups** — challenge, approach, results and gallery for each project, with
  shareable links (e.g. `yoursite.com/#case-bloom-co`) and ←/→ keyboard navigation
- **Generated poster artwork** — every project gets a designed cover until you add real images
- **Click-to-copy colour palette** and **copy email** button with a toast confirmation
- **Testimonials carousel**, services list with hover fills, and a process section
- **Custom cursor** that turns into a "View" bubble over projects, and **magnetic buttons** (desktop)
- **Light/dark mode**, scroll progress bar, live local-time clock, film-grain texture
- Accessible: keyboard friendly, reduced-motion support, mobile layout

## Structure

```
index.html        Page text (search for <!-- EDIT --> comments)
js/projects.js    Your projects — the Work gallery and case studies are built from this
js/main.js        All the interactive features
css/styles.css    Styling; colours live at the top under "Theme tokens"
assets/           Favicon, your CV and project images
404.html          Not-found page
vercel.json       Vercel settings (clean URLs, security headers)
```

## Making it yours

1. **Text** — open `index.html` and search for `EDIT`. Each comment marks something to personalise:
   headline phrases, intro, stats, about, palette, toolkit, services, testimonials, experience,
   email, social links and your city/time zone.
2. **Projects** — open `js/projects.js`. The instructions at the top explain each field.
   To use real artwork, put images in `assets/work/` and set `image: "/assets/work/your-file.jpg"`;
   extra case study images go in `gallery`.
3. **CV** — save your CV as `assets/Jake-Skinner-CV.pdf` (or change the link in `index.html`).
4. **Colours** — change `--accent` in `css/styles.css` (there's one for light mode and one for dark).

## Running locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploying

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the repo.
3. Leave the framework preset as **Other** with no build command, and click **Deploy**.

Every push to `main` redeploys automatically.
