const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const escapeHTML = (str = "") =>
  String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Run a callback once, the first time an element scrolls into view
function onFirstView(el, callback, threshold = 0.3) {
  if (!el) return;
  if (!("IntersectionObserver" in window)) return callback(el);
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      callback(el);
    },
    { threshold }
  );
  io.observe(el);
}

// ---------- Footer year + local clock ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

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

// ---------- Toast + clipboard ----------
const toast = document.querySelector(".toast");
let toastTimer;

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}

// ---------- Mobile nav ----------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

function setNavOpen(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navLinks.classList.toggle("open", open);
}
navToggle?.addEventListener("click", () => setNavOpen(navToggle.getAttribute("aria-expanded") !== "true"));
navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setNavOpen(false)));

// ---------- Scroll: progress bar, lap counter, active link, step counter ----------
const progress = document.querySelector(".progress");
const lapNow = document.querySelector(".lap-now");
const sections = [...document.querySelectorAll("main > section[id]")];
const stepsEl = document.querySelector(".steps");
document.querySelector(".lap-total").textContent = sections.length;

let steps = 0;
let lastScrollY = window.scrollY;

function onScroll() {
  const max = root.scrollHeight - window.innerHeight;
  progress?.style.setProperty("--progress", max > 0 ? window.scrollY / max : 0);

  // Which "lap" (section) are we on?
  const line = window.innerHeight * 0.35;
  let current = 0;
  sections.forEach((s, i) => {
    if (s.getBoundingClientRect().top <= line) current = i;
  });
  if (lapNow) lapNow.textContent = current + 1;
  navLinks?.querySelectorAll("a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${sections[current].id}` && !a.classList.contains("nav-cta"));
  });

  // Roughly one step for every 45px scrolled
  steps += Math.abs(window.scrollY - lastScrollY) / 45;
  lastScrollY = window.scrollY;
  if (stepsEl) stepsEl.textContent = Math.floor(steps).toLocaleString();
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ============================================================
// Hero: start lights intro + reaction-time game
// ============================================================
const hero = document.querySelector(".hero");
const pods = [...document.querySelectorAll(".gantry .pod")];
const panel = document.querySelector(".start-panel");
const reactionBtn = document.querySelector(".reaction-btn");
const statusEl = document.querySelector(".reaction-status");
const valueEl = document.querySelector(".reaction-value");
const bestEl = document.querySelector(".reaction-best");

let timers = [];
let state = "idle"; // idle → arming (lights coming on) → go (lights out) → idle
let goTime = 0;
let lastReact = 0;
let best = null;

try {
  best = parseFloat(localStorage.getItem("bestReaction")) || null;
} catch (e) {}
const showBest = () => (bestEl.textContent = best ? `Best: ${best.toFixed(3)}s` : "Best: —");
showBest();

const later = (fn, ms) => timers.push(setTimeout(fn, ms));
const clearTimers = () => {
  timers.forEach(clearTimeout);
  timers = [];
};
const setLights = (n) => pods.forEach((p, i) => p.classList.toggle("on", i < n));

function setStatus(text, tone = "") {
  statusEl.textContent = text;
  statusEl.className = `reaction-status${tone ? ` is-${tone}` : ""}`;
}

// Intro: five lights on, then out — and the name launches
if (reducedMotion) {
  hero.classList.add("is-go");
} else {
  pods.forEach((_, i) => later(() => setLights(i + 1), 250 + i * 200));
  later(() => {
    setLights(0);
    hero.classList.add("is-go");
  }, 1700);
}

function startRace() {
  clearTimers();
  hero.classList.add("is-go");
  state = "arming";
  setLights(0);
  valueEl.textContent = "0.000";
  setStatus("Eyes on the lights…");
  reactionBtn.textContent = "React!";

  pods.forEach((_, i) => later(() => setLights(i + 1), 600 + i * 700));
  // Lights go out after a random hold once all five are on, just like a real start
  const allOn = 600 + (pods.length - 1) * 700;
  later(() => {
    setLights(0);
    state = "go";
    goTime = performance.now();
    setStatus("Go go go!", "good");
    requestAnimationFrame(runClock);
  }, allOn + 600 + Math.random() * 2000);
}

function runClock() {
  if (state !== "go") return;
  const elapsed = (performance.now() - goTime) / 1000;
  valueEl.textContent = elapsed.toFixed(3);
  if (elapsed > 5) {
    state = "idle";
    setStatus("Stalled on the grid…", "bad");
    reactionBtn.textContent = "Try again";
    return;
  }
  requestAnimationFrame(runClock);
}

function react() {
  lastReact = performance.now();
  if (state === "arming") {
    clearTimers();
    setLights(0);
    state = "idle";
    setStatus("Jump start! Drive-through penalty.", "bad");
    reactionBtn.textContent = "Try again";
  } else if (state === "go") {
    state = "idle";
    const t = (performance.now() - goTime) / 1000;
    valueEl.textContent = t.toFixed(3);
    const verdict =
      t < 0.2 ? "Faster than an F1 driver!" : t < 0.3 ? "Podium reactions." : t < 0.45 ? "Solid getaway." : "Bogged down off the line.";
    if (!best || t < best) {
      best = t;
      try {
        localStorage.setItem("bestReaction", String(t));
      } catch (e) {}
      showBest();
      setStatus(`${verdict} New personal best!`, "good");
    } else {
      setStatus(verdict, t < 0.3 ? "good" : "");
    }
    reactionBtn.textContent = "Go again";
  }
}

panel?.addEventListener("pointerdown", (e) => {
  if (state === "idle") return;
  e.preventDefault();
  react();
});
reactionBtn?.addEventListener("click", () => {
  if (performance.now() - lastReact < 400) return; // already handled by pointerdown
  if (state === "idle") startRace();
  else react();
});
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && state !== "idle") {
    e.preventDefault();
    react();
  }
});

// ---------- Telemetry gauges + count-up numbers ----------
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const decimals = (el.dataset.count.split(".")[1] || "").length;
  const start = performance.now();
  const frame = (now) => {
    const t = Math.min(1, (now - start) / 1600);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

document.querySelectorAll(".gauge").forEach((gauge) => {
  gauge.style.setProperty("--g", gauge.dataset.gauge || 0);
  onFirstView(gauge, () => {
    gauge.classList.add("on");
    const value = gauge.querySelector("[data-count]");
    if (value && !reducedMotion) animateCount(value);
  }, 0.5);
});

// ============================================================
// Work: viewfinder gallery, modes and case study lightbox
// ============================================================
const projects = (window.PROJECTS || []).map((p) => ({
  ...p,
  slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}));

const galleryEl = document.getElementById("gallery");
const modesEl = document.querySelector(".modes");
const lightbox = document.getElementById("lightbox");
const lbContent = lightbox?.querySelector(".lightbox-content");
const shutter = document.querySelector(".shutter");
let activeMode = "All";
let openIndex = -1;

const frameNo = (p) => String(projects.indexOf(p) + 1).padStart(2, "0");

function posterHTML(p) {
  if (p.image) {
    return `<div class="poster"><div class="poster-art"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.title)} cover" loading="lazy" /></div></div>`;
  }
  return `
    <div class="poster motif-${escapeHTML(p.motif || "circle")}" style="--p-bg:${escapeHTML(p.bg)};--p-fg:${escapeHTML(p.fg)}">
      <div class="poster-art"><span class="poster-title">${escapeHTML(p.title)}</span></div>
    </div>`;
}

function viewfinderHTML(p, topLeft = "AF-S") {
  return `
    <div class="vf" aria-hidden="true">
      <span class="vf-corner"></span><span class="vf-corner"></span><span class="vf-corner"></span><span class="vf-corner"></span>
      <span class="vf-thirds"></span>
      <span class="vf-focus"></span>
      <span class="vf-top"><span class="vf-rec">${topLeft}</span><span>FR ${frameNo(p)}/${String(projects.length).padStart(2, "0")}</span></span>
      <span class="vf-bottom"><span>${escapeHTML(p.client)}</span><span>${escapeHTML(p.year)}</span></span>
    </div>`;
}

function renderModes() {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  modesEl.innerHTML = categories
    .map((cat) => {
      const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
      return `<button class="mode" aria-pressed="${cat === activeMode}" data-mode="${escapeHTML(cat)}">${escapeHTML(cat)}<sup>${count}</sup></button>`;
    })
    .join("");
}

function renderGallery() {
  const visible = projects.filter((p) => activeMode === "All" || p.category === activeMode);
  galleryEl.innerHTML = visible
    .map(
      (p) => `
      <a class="shot" href="#work-${p.slug}" data-slug="${p.slug}" style="view-transition-name: shot-${p.slug}">
        <div class="frame">${posterHTML(p)}${viewfinderHTML(p)}</div>
        <div class="shot-info">
          <span class="shot-cat">${escapeHTML(p.category)}</span>
          <h3>${escapeHTML(p.title)}</h3>
          <p>${escapeHTML(p.summary)}</p>
        </div>
      </a>`
    )
    .join("");
}

if (galleryEl && modesEl && projects.length) {
  renderModes();
  renderGallery();

  modesEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".mode");
    if (!btn || btn.dataset.mode === activeMode) return;
    activeMode = btn.dataset.mode;
    modesEl.querySelectorAll(".mode").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    if (document.startViewTransition && !reducedMotion) document.startViewTransition(renderGallery);
    else renderGallery();
  });

  galleryEl.addEventListener("click", (e) => {
    const shot = e.target.closest(".shot");
    if (!shot) return;
    e.preventDefault();
    openCase(projects.findIndex((p) => p.slug === shot.dataset.slug));
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
    <div class="lb-top">
      <div class="frame">${posterHTML(p)}${viewfinderHTML(p, "AF · LOCKED")}</div>
      <div class="exif">
        <p class="exif-title">Shot info</p>
        <dl>
          <div><dt>Client</dt><dd>${escapeHTML(p.client)}</dd></div>
          <div><dt>Role</dt><dd>${escapeHTML(p.role)}</dd></div>
          ${p.year ? `<div><dt>Year</dt><dd>${escapeHTML(p.year)}</dd></div>` : ""}
          <div><dt>Category</dt><dd>${escapeHTML(p.category)}</dd></div>
          <div><dt>Delivered</dt><dd>${(p.deliverables || []).map(escapeHTML).join(", ")}</dd></div>
          <div><dt>Frame</dt><dd>${frameNo(p)} of ${String(projects.length).padStart(2, "0")}</dd></div>
        </dl>
      </div>
    </div>
    <div class="lb-body">
      <span class="shot-cat">${escapeHTML(p.category)}</span>
      <h2 id="lb-title">${escapeHTML(p.title)}</h2>
      <p class="lb-summary">${escapeHTML(p.summary)}</p>
      <div class="lb-cols">
        <div><h3>The brief</h3><p>${escapeHTML(p.challenge)}</p></div>
        <div><h3>The approach</h3><p>${escapeHTML(p.approach)}</p></div>
      </div>
      ${results ? `<div class="lb-results"><h3>The result</h3><ul>${results}</ul></div>` : ""}
      ${gallery ? `<div class="lb-gallery">${gallery}</div>` : ""}
      ${p.link ? `<a class="btn btn-red lb-link" href="${escapeHTML(p.link)}" target="_blank" rel="noopener">See it live ↗</a>` : ""}
    </div>`;
}

function openCase(index) {
  if (!lightbox || index < 0) return;
  openIndex = index;
  const p = projects[index];
  lbContent.innerHTML = caseHTML(p);
  lightbox.querySelector(".lightbox-inner").scrollTop = 0;
  if (!reducedMotion) {
    shutter.classList.remove("flash");
    void shutter.offsetWidth; // restart the flash animation
    shutter.classList.add("flash");
  }
  if (!lightbox.open) lightbox.showModal();
  // Shareable link straight to this project
  history.replaceState(null, "", `#work-${p.slug}`);
}

if (lightbox) {
  const step = (n) => openCase((openIndex + n + projects.length) % projects.length);

  lightbox.querySelector(".close-btn").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close(); // click on backdrop
  });
  lightbox.addEventListener("close", () => {
    openIndex = -1;
    history.replaceState(null, "", "#work");
  });
  lightbox.querySelectorAll("[data-step]").forEach((btn) => btn.addEventListener("click", () => step(Number(btn.dataset.step))));
  lightbox.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  // Open a project directly from a shared link like /#work-bloom-co
  const fromHash = location.hash.startsWith("#work-") ? location.hash.slice(6) : null;
  if (fromHash) openCase(projects.findIndex((p) => p.slug === fromHash));

  // Any other link to a project (e.g. from the journey trail) opens its case study too
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#work-"]');
    if (!link || link.closest(".gallery")) return;
    const index = projects.findIndex((p) => `#work-${p.slug}` === link.getAttribute("href"));
    if (index < 0) return;
    e.preventDefault();
    openCase(index);
  });
}

// ============================================================
// Skills: starting XI on the pitch
// ============================================================
const squad = window.SQUAD || [];
const playersEl = document.getElementById("players");
const cardEl = document.getElementById("player-card");

function showPlayer(player) {
  playersEl.querySelectorAll(".player").forEach((btn) => {
    const active = Number(btn.dataset.number) === player.number;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  const stats = Object.entries(player.stats || {})
    .map(([key, v]) => `<div class="pc-stat"><span>${escapeHTML(key)}</span><b>${v}</b><span class="pc-bar"><i style="--v:${Number(v)}"></i></span></div>`)
    .join("");
  cardEl.innerHTML = `
    <span class="pc-watermark" aria-hidden="true">${player.number}</span>
    <div class="pc-top"><span class="pc-rating">${player.rating}</span><span class="pc-pos">${escapeHTML(player.pos)} · #${player.number}</span></div>
    <h3 class="pc-name">${escapeHTML(player.name)}</h3>
    <div class="pc-stats">${stats}</div>
    <p class="pc-note">${escapeHTML(player.note)}</p>`;

  cardEl.classList.remove("swap");
  void cardEl.offsetWidth; // restart the flip animation
  cardEl.classList.add("swap");
}

if (playersEl && cardEl && squad.length) {
  playersEl.innerHTML = squad
    .map(
      (p) => `
      <button class="player" type="button" data-number="${p.number}" data-pos="${escapeHTML(p.pos)}" aria-pressed="false" style="--x:${p.x};--y:${p.y}" aria-label="${escapeHTML(p.name)}, number ${p.number}">
        <span class="player-shirt">${p.number}</span>
        <span class="player-name">${escapeHTML(p.name)}</span>
      </button>`
    )
    .join("");

  playersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".player");
    if (btn) showPlayer(squad.find((p) => p.number === Number(btn.dataset.number)));
  });

  // Start with the number 9 (or whoever is first)
  showPlayer(squad.find((p) => p.number === 9) || squad[0]);
}

// ============================================================
// Journey: a trail that draws itself as you scroll
// ============================================================
const trail = document.getElementById("trail");
const planned = trail?.querySelector(".trail-planned");
const walked = trail?.querySelector(".trail-walked");
const waypoints = [...(trail?.querySelectorAll(".waypoint") || [])];
let trailSamples = [];
let trailLength = 0;
let pinYs = [];

function layoutTrail() {
  if (!trail) return;
  const box = trail.getBoundingClientRect();
  const points = waypoints.map((wp) => {
    const r = wp.querySelector(".pin").getBoundingClientRect();
    return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
  });
  if (!points.length) return;
  pinYs = points.map((p) => p.y);

  // Gentle S-bends between pins; smaller on narrow screens
  const bend = box.width < 760 ? 16 : Math.min(150, box.width * 0.14);
  let d = `M ${points[0].x} 0 L ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i], b = points[i + 1];
    const dy = b.y - a.y;
    const side = i % 2 ? -1 : 1;
    d += ` C ${a.x + bend * side} ${a.y + dy * 0.4}, ${b.x + bend * side} ${b.y - dy * 0.4}, ${b.x} ${b.y}`;
  }
  planned.setAttribute("d", d);
  walked.setAttribute("d", d);

  trailLength = walked.getTotalLength();
  walked.style.strokeDasharray = `${trailLength}`;
  // Sample the path so we can map scroll height → length walked
  trailSamples = [];
  for (let len = 0; len <= trailLength; len += 6) trailSamples.push({ len, y: walked.getPointAtLength(len).y });
  updateTrail();
}

function updateTrail() {
  if (!trail || !trailLength) return;
  const box = trail.getBoundingClientRect();
  const walkedY = window.innerHeight * 0.6 - box.top;
  let len = 0;
  for (const s of trailSamples) {
    if (s.y <= walkedY) len = s.len;
    else break;
  }
  walked.style.strokeDashoffset = `${trailLength - len}`;
  waypoints.forEach((wp, i) => wp.classList.toggle("reached", pinYs[i] <= walkedY));
}

if (trail) {
  layoutTrail();
  window.addEventListener("scroll", updateTrail, { passive: true });
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutTrail, 150);
  });
  document.fonts?.ready.then(layoutTrail);
}

// ============================================================
// Results: timing tower
// ============================================================
const tower = document.getElementById("tower");

if (tower && projects.length) {
  const rows = projects.filter((p) => p.results?.length);
  // Purple "fastest lap" for the biggest percentage result
  const pct = rows.map((p) => (p.results[0].value.includes("%") ? parseFloat(p.results[0].value.replace(/[^\d.]/g, "")) : -1));
  const topPct = Math.max(...pct);
  const fastest = topPct > 0 ? pct.indexOf(topPct) : -1;
  // Team colour stripe: use the poster's text colour when its background is too dark to see
  const isDark = (hex = "") => {
    const n = parseInt(hex.replace("#", ""), 16);
    return ((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114 < 50;
  };

  tower.innerHTML = rows
    .map((p, i) => {
      const r = p.results[0];
      const code = (p.code || p.title.replace(/[^a-z]/gi, "").slice(0, 3)).toUpperCase();
      return `
        <li style="--i:${i}">
          <button class="tower-row${i === fastest ? " fastest" : ""}" type="button" data-slug="${p.slug}" style="--team:${escapeHTML(isDark(p.bg) ? p.fg : p.bg)}">
            <span class="t-pos">P${i + 1}</span>
            <span class="t-team"></span>
            <span class="t-code">${escapeHTML(code)}</span>
            <span class="t-name">${escapeHTML(p.client)}</span>
            <span class="t-value">${escapeHTML(r.value)}</span>
            <span class="t-label">${escapeHTML(r.label)}${i === fastest ? '<span class="t-fastest">Fastest lap</span>' : ""}</span>
          </button>
        </li>`;
    })
    .join("");

  tower.addEventListener("click", (e) => {
    const row = e.target.closest(".tower-row");
    if (row) openCase(projects.findIndex((p) => p.slug === row.dataset.slug));
  });
  onFirstView(tower, () => tower.classList.add("on"), 0.2);
}

// ============================================================
// Contact: team radio typing + copy email
// ============================================================
const radio = document.querySelector(".radio");

if (radio && !reducedMotion) {
  onFirstView(radio, async () => {
    const lines = [...radio.querySelectorAll("[data-type]")];
    lines.forEach((el) => (el.textContent = ""));
    for (const el of lines) {
      el.classList.add("typing");
      const text = el.dataset.type;
      for (let i = 1; i <= text.length; i++) {
        el.textContent = text.slice(0, i);
        await new Promise((r) => setTimeout(r, 24));
      }
      el.classList.remove("typing");
      await new Promise((r) => setTimeout(r, 350));
    }
  }, 0.5);
}

document.querySelector(".copy-email")?.addEventListener("click", async (e) => {
  const email = e.currentTarget.dataset.copy;
  const ok = await copyText(email);
  showToast(ok ? "Copy that — email copied" : email);
});
