# Jake Skinner — Portfolio

A fast, dependency-free personal portfolio built with plain HTML, CSS and JavaScript.
No build step — Vercel serves the files as-is.

## Structure

```
index.html        Page content (look for <!-- EDIT --> comments)
404.html          Not-found page
css/styles.css    All styling; colours live at the top under "Theme tokens"
js/main.js        Theme toggle, mobile menu, scroll animations
assets/           Favicon and any images (e.g. project screenshots)
vercel.json       Vercel settings (clean URLs, security headers)
```

## Editing your content

Open `index.html` and search for `EDIT` — each comment marks something to personalise:
your intro, about text, skills, projects, experience, email and social links.

To use a real screenshot for a project, drop the image in `assets/` and replace the
placeholder inside `.project-thumb`:

```html
<div class="project-thumb"><img src="/assets/my-project.png" alt="Screenshot of My Project" /></div>
```

To change the accent colour, edit `--accent` in `css/styles.css` (one for dark mode, one for light).

## Running locally

Any static server works, for example:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploying

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the repo.
3. Leave the framework preset as **Other** with no build command, and click **Deploy**.

Every push to `main` will redeploy automatically.
