const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// ---------- Footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Local time clock ----------
const clockEl = document.querySelector(".clock");
if (clockEl) {
  const fmt = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: clockEl.dataset.tz || undefined
  });
  const tick = () => (clockEl.textContent = fmt.format(new Date()));
  tick();
  setInterval(tick, 15000);
}

// ---------- Theme toggle ----------
function currentTheme() {
  const set = root.getAttribute("data-theme");
  if (set) return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

document.querySelector(".theme-toggle")?.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// ---------- Mobile nav ----------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

function setNavOpen(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navLinks.classList.toggle("open", open);
}

navToggle?.addEventListener("click", () => {
  setNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
});
navLinks?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => setNavOpen(false))
);

// ---------- Header border + scroll progress bar ----------
const header = document.querySelector(".site-header");
const progress = document.querySelector(".progress");

function onScroll() {
  header?.classList.toggle("scrolled", window.scrollY > 10);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress?.style.setProperty("--progress", max > 0 ? window.scrollY / max : 0);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Toast ----------
const toast = document.querySelector(".toast");
let toastTimer;

function showToast(html) {
  toast.innerHTML = html;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}

// ---------- Hero: rotating words ----------
const rotatorWords = document.querySelectorAll(".rotator span");
if (rotatorWords.length > 1 && !reducedMotion) {
  let index = 0;
  setInterval(() => {
    const current = rotatorWords[index];
    index = (index + 1) % rotatorWords.length;
    const next = rotatorWords[index];

    current.classList.remove("is-active");
    current.classList.add("is-leaving");
    next.classList.remove("is-leaving");
    next.classList.add("is-active");
    // Once the old word has slid out, park it below ready for its next turn
    setTimeout(() => current.classList.remove("is-leaving"), 750);
  }, 2600);
}

// ---------- Hero: draggable stickers ----------
let topZ = 10;

document.querySelectorAll(".sticker").forEach((sticker) => {
  let startX, startY, baseX, baseY;

  sticker.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    sticker.setPointerCapture(e.pointerId);
    sticker.classList.add("is-dragging");
    sticker.style.zIndex = ++topZ;
    startX = e.clientX;
    startY = e.clientY;
    baseX = parseFloat(sticker.style.getPropertyValue("--dx")) || 0;
    baseY = parseFloat(sticker.style.getPropertyValue("--dy")) || 0;
  });

  sticker.addEventListener("pointermove", (e) => {
    if (!sticker.hasPointerCapture(e.pointerId)) return;
    const dx = e.clientX - startX;
    sticker.style.setProperty("--dx", `${baseX + dx}px`);
    sticker.style.setProperty("--dy", `${baseY + e.clientY - startY}px`);
    // Tilt slightly in the direction of travel
    sticker.style.setProperty("--tilt", `${Math.max(-12, Math.min(12, dx / 20))}deg`);
  });

  const drop = (e) => {
    if (sticker.hasPointerCapture(e.pointerId)) sticker.releasePointerCapture(e.pointerId);
    sticker.classList.remove("is-dragging");
    sticker.style.setProperty("--tilt", "0deg");
  };
  sticker.addEventListener("pointerup", drop);
  sticker.addEventListener("pointercancel", drop);
});

// ---------- Marquee: duplicate the list so it loops seamlessly ----------
const marqueeTrack = document.querySelector(".marquee-track");
const marqueeList = marqueeTrack?.querySelector(".marquee-list");
if (marqueeList) {
  const clone = marqueeList.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  marqueeTrack.appendChild(clone);
}

// ---------- Animated stat counters ----------
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const decimals = (el.dataset.count.split(".")[1] || "").length;
  const duration = 1600;
  const start = performance.now();

  const frame = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

// ---------- Scroll reveal + counters ----------
const revealEls = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  if (!reducedMotion) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => countObserver.observe(el));
  }
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

// ---------- Highlight the nav link for the section in view ----------
const navTargets = [...(navLinks?.querySelectorAll("a[href^='#']:not(.nav-cta)") || [])]
  .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
  .filter((t) => t.section);

function updateActiveLink() {
  const line = window.innerHeight * 0.4;
  let current = null;
  navTargets.forEach((t) => {
    const rect = t.section.getBoundingClientRect();
    if (rect.top <= line && rect.bottom > line) current = t;
  });
  navTargets.forEach((t) => t.link.classList.toggle("active", t === current));
}
window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

// ============================================================
// Work gallery, filters and case study modal
// ============================================================
const projects = (window.PROJECTS || []).map((p) => ({
  ...p,
  slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}));

const workGrid = document.getElementById("work-grid");
const filtersEl = document.querySelector(".filters");
const dialog = document.getElementById("case");
const caseContent = dialog?.querySelector(".case-content");
let activeFilter = "All";
let openIndex = -1;

const escapeHTML = (str = "") =>
  String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function posterHTML(p) {
  if (p.image) {
    return `<div class="poster"><div class="poster-art"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.title)} cover" loading="lazy" /></div></div>`;
  }
  return `
    <div class="poster motif-${escapeHTML(p.motif || "circle")}" style="--p-bg:${escapeHTML(p.bg)};--p-fg:${escapeHTML(p.fg)}">
      <div class="poster-art">
        <span class="poster-meta"><span>${escapeHTML(p.category)}</span><span>${escapeHTML(p.year)}</span></span>
        <span class="poster-title">${escapeHTML(p.title)}</span>
      </div>
    </div>`;
}

function renderFilters() {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  filtersEl.innerHTML = categories
    .map((cat) => {
      const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
      return `<button class="filter" aria-pressed="${cat === activeFilter}" data-filter="${escapeHTML(cat)}">${escapeHTML(cat)}<sup>${count}</sup></button>`;
    })
    .join("");
}

function renderWork() {
  const visible = projects.filter((p) => activeFilter === "All" || p.category === activeFilter);
  workGrid.innerHTML = visible
    .map(
      (p) => `
      <a class="work-card" href="#case-${p.slug}" data-slug="${p.slug}" data-cursor="view" style="view-transition-name: card-${p.slug}">
        ${posterHTML(p)}
        <div class="work-info">
          <h3>${escapeHTML(p.title)}</h3>
          <span class="work-cat">${escapeHTML(p.client)}</span>
        </div>
        <p class="work-summary">${escapeHTML(p.summary)}</p>
      </a>`
    )
    .join("");
}

if (workGrid && filtersEl && projects.length) {
  renderFilters();
  renderWork();

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn || btn.dataset.filter === activeFilter) return;
    activeFilter = btn.dataset.filter;
    filtersEl.querySelectorAll(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));

    // Animate cards into their new positions where the browser supports it
    if (document.startViewTransition && !reducedMotion) {
      document.startViewTransition(renderWork);
    } else {
      renderWork();
    }
  });

  workGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".work-card");
    if (!card) return;
    e.preventDefault();
    openCase(projects.findIndex((p) => p.slug === card.dataset.slug));
  });
}

function caseHTML(p) {
  const results = (p.results || [])
    .map((r) => `<li><strong>${escapeHTML(r.value)}</strong><span>${escapeHTML(r.label)}</span></li>`)
    .join("");
  const gallery = (p.gallery || [])
    .map((src) => `<img src="${escapeHTML(src)}" alt="${escapeHTML(p.title)} project image" loading="lazy" />`)
    .join("");

  return `
    ${posterHTML(p)}
    <div class="case-body">
      <p class="case-kicker">${escapeHTML(p.category)} — ${escapeHTML(p.year)}</p>
      <h2 id="case-title">${escapeHTML(p.title)}</h2>
      <p class="case-summary">${escapeHTML(p.summary)}</p>

      <dl class="case-meta">
        <div><dt>Client</dt><dd>${escapeHTML(p.client)}</dd></div>
        <div><dt>Role</dt><dd>${escapeHTML(p.role)}</dd></div>
        <div><dt>Year</dt><dd>${escapeHTML(p.year)}</dd></div>
        <div><dt>Deliverables</dt><dd>${(p.deliverables || []).map(escapeHTML).join(", ")}</dd></div>
      </dl>

      <div class="case-cols">
        <div><h3>The challenge</h3><p>${escapeHTML(p.challenge)}</p></div>
        <div><h3>The approach</h3><p>${escapeHTML(p.approach)}</p></div>
      </div>

      ${results ? `<div class="case-results"><h3>The results</h3><ul>${results}</ul></div>` : ""}
      ${gallery ? `<div class="case-gallery">${gallery}</div>` : ""}
      ${p.link ? `<a class="btn btn-primary case-link" href="${escapeHTML(p.link)}" target="_blank" rel="noopener">View live project ↗</a>` : ""}
    </div>`;
}

function openCase(index) {
  if (!dialog || index < 0) return;
  openIndex = index;
  const p = projects[index];
  caseContent.innerHTML = caseHTML(p);
  dialog.querySelector(".case-inner").scrollTop = 0;
  if (!dialog.open) dialog.showModal();
  // Shareable link straight to this case study
  history.replaceState(null, "", `#case-${p.slug}`);
}

function closeCase() {
  if (dialog?.open) dialog.close();
}

if (dialog) {
  dialog.querySelector(".case-close").addEventListener("click", closeCase);
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeCase(); // click on backdrop
  });
  dialog.addEventListener("close", () => {
    openIndex = -1;
    history.replaceState(null, "", "#work");
  });
  dialog.querySelectorAll("[data-step]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const step = Number(btn.dataset.step);
      openCase((openIndex + step + projects.length) % projects.length);
    })
  );
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") openCase((openIndex + 1) % projects.length);
    if (e.key === "ArrowLeft") openCase((openIndex - 1 + projects.length) % projects.length);
  });

  // Open a case study directly from a shared link like /#case-bloom-co
  const fromHash = location.hash.startsWith("#case-") ? location.hash.slice(6) : null;
  if (fromHash) openCase(projects.findIndex((p) => p.slug === fromHash));
}

// ---------- Copy: palette swatches + email ----------
document.querySelectorAll(".swatch").forEach((swatch) =>
  swatch.addEventListener("click", async () => {
    const hex = swatch.dataset.hex;
    const ok = await copyText(hex);
    showToast(ok ? `<i style="--swatch:${hex}"></i>Copied ${hex}` : hex);
  })
);

document.querySelector(".copy-email")?.addEventListener("click", async (e) => {
  const email = e.currentTarget.dataset.copy;
  const ok = await copyText(email);
  showToast(ok ? "Email copied — speak soon!" : email);
});

// ---------- Testimonials carousel ----------
const carousel = document.querySelector(".carousel");
document.querySelectorAll(".carousel-controls [data-dir]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const card = carousel.querySelector(".quote");
    const step = card.getBoundingClientRect().width + 24;
    const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;
    const atStart = carousel.scrollLeft <= 4;
    const dir = Number(btn.dataset.dir);

    // Wrap around at either end
    if (dir > 0 && atEnd) carousel.scrollTo({ left: 0 });
    else if (dir < 0 && atStart) carousel.scrollTo({ left: carousel.scrollWidth });
    else carousel.scrollBy({ left: dir * step });
  })
);

// ---------- Desktop-only flourishes: custom cursor + magnetic buttons ----------
if (finePointer && !reducedMotion) {
  const cursor = document.querySelector(".cursor");
  let mouseX = -100, mouseY = -100, curX = -100, curY = -100;

  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add("is-visible");

    const target = e.target.closest?.("a, button, [data-cursor], .sticker");
    const isView = Boolean(target?.closest("[data-cursor='view']"));
    cursor.classList.toggle("is-view", isView);
    cursor.classList.toggle("is-link", Boolean(target) && !isView);
  });
  document.addEventListener("pointerleave", () => cursor.classList.remove("is-visible"));

  const follow = () => {
    curX += (mouseX - curX) * 0.2;
    curY += (mouseY - curY) * 0.2;
    cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  };
  follow();

  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });
}
