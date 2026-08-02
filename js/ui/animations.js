/* ============================================================
   GIMS UI — Motion & micro-interactions
   Hero headline word-reveal, hero mouse-spotlight, magnetic button hover, and IntersectionObserver-based scroll reveal. All respect prefers-reduced-motion.
   ============================================================ */

function initHeroHeadline() {
  const h1 = document.querySelector("[data-split-words]");
  if (!h1) return;
  const text = h1.textContent.trim();
  const words = text.split(" ");
  h1.innerHTML = words
    .map(
      (w, i) =>
        `<span class="word" style="animation-delay:${0.35 + i * 0.06}s">${w}</span>`,
    )
    .join(" ");
}

/* ============================================================
   Flip cards — click/tap to flip on touch devices, in addition
   to the CSS-only :hover/:focus-within flip on desktop. Each
   card's front/back toggle buttons also work independently for
   keyboard and screen-reader users.
   ============================================================ */

function initHeroSpotlight() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  if (prefersReduced || !isFinePointer) return;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    hero.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  });
}

/* ============================================================
   Contact form
   ============================================================ */

function initMagneticButtons() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  if (prefersReduced || !isFinePointer) return;

  document.querySelectorAll(".btn-primary, .btn-outline").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3 - 2}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

/* ============================================================
   Preloader — fades out once the page has finished loading.
   ============================================================ */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  preloader.classList.add("done");
  setTimeout(() => preloader.remove(), 700);
});

function initScrollReveal() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const targets = document.querySelectorAll(
    ".section-head, .trust-card, .track-tab, .program-card, .program-detail, " +
      ".faq-item, .form-card, .step, .stat-card, .value-card, .contact-card, " +
      ".hero-badge, .doc-item, .gims-glow-card, .gims-flip-card, " +
      ".gims-director-card, .director-quote, .mv-card",
  );
  if (!targets.length) return;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  targets.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  targets.forEach((el) => io.observe(el));
}

/* ============================================================
   Magnetic hover — primary buttons drift gently toward the
   cursor on desktop pointers only. No-op on touch devices or
   when reduced motion is requested.
   ============================================================ */
