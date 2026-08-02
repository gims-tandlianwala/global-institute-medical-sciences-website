/* ============================================================
   GIMS PAGES — Programs page
   Medical/Computer track tabs and any programs.html-only interactions.
   ============================================================ */

function initTrackTabs() {
  const tabs = document.querySelectorAll(".track-tab");
  if (!tabs.length) return;

  function activate(track) {
    document
      .querySelectorAll(".track-tab")
      .forEach((t) => t.classList.toggle("active", t.dataset.track === track));
    document
      .querySelectorAll(".track-panel")
      .forEach((p) => p.classList.toggle("active", p.id === track + "Panel"));
  }

  tabs.forEach((tab) =>
    tab.addEventListener("click", () => activate(tab.dataset.track)),
  );

  const hash = window.location.hash.replace("#", "");
  if (hash === "computer") activate("computer");
}

/* ============================================================
   Programs listing page (filter tabs)
   ============================================================ */

function initProgramsPage() {
  const tabs = document.querySelectorAll(".filter-tab");
  if (!tabs.length) return;
  const cards = document.querySelectorAll(".program-detail");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const cat = tab.dataset.filter;
      cards.forEach((card) => {
        const show = cat === "all" || card.dataset.category === cat;
        card.style.display = show ? "" : "none";
      });
    });
  });
}

/* ============================================================
   Computer & IT courses admission form (simple, non-wizard)
   ============================================================ */
