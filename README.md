# Jake Skinner — Marketing & Graphic Designer Portfolio

A fast, dependency-free portfolio built with plain HTML, CSS and JavaScript, themed around
four hobbies: **F1, football, photography and walking**. No build step — Vercel serves the files as-is.

## Features

| Section | Hobby | What it does |
| --- | --- | --- |
| Hero | F1 | Start lights launch the page; a **reaction-time game** saves your best time; telemetry gauges count up |
| About | All four | Hobby cards explaining the theme |
| Work | Photography | Gallery seen **through a camera viewfinder** (autofocus, rule of thirds); filter by category; case studies open with a **shutter flash** and a "shot info" panel; shareable links like `/#work-bloom-co` |
| Skills | Football | Your **starting XI** on a pitch (turns portrait on phones); tap a player for their **player card**; toolkit as the subs' bench |
| Journey | Walking | A **trail map** that draws itself as you scroll, waypoints for each role, and a step counter |
| Results | F1 + football | **Timing tower** of headline results (with a purple fastest lap) and post-match ratings for testimonials |
| Contact | F1 + football | **Team radio** message that types itself out, copy-email button, and a "transfer status" card |

Also: lap counter in the nav, progress bar, chequered-flag footer, reduced-motion support and a mobile layout.

## Structure

```
index.html        Page text (search for <!-- EDIT --> comments)
js/projects.js    Your projects — gallery, case studies and timing tower
js/skills.js      Your starting XI — the pitch and player cards
js/main.js        All the interactive features
css/styles.css    Styling; colours live at the top under "Tokens"
assets/           Favicon, your CV and project images
404.html          "Off track" page
vercel.json       Vercel settings (clean URLs, security headers)
```

## Making it yours

1. **Text** — open `index.html` and search for `EDIT`: pitch, numbers, about, hobby cards, toolkit,
   journey, testimonials, email, social links and your city/time zone.
2. **Projects** — open `js/projects.js`; the instructions at the top explain each field. To use real
   artwork, put images in `assets/work/` and set `image: "/assets/work/your-file.jpg"`.
3. **Skills** — open `js/skills.js` to rename players, move them around the pitch or change ratings.
4. **CV** — save your CV as `assets/Jake-Skinner-CV.pdf`.

## Running locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploying

Pushes to `main` on GitHub redeploy automatically on Vercel.
