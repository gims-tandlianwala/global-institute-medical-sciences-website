/* ============================================================
   GIMS UI — Primary navigation (mobile toggle)
   Open/close, Escape to close, click-outside to close, and
   auto-close on link navigation.
   ============================================================ */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeNav();
      toggle.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("open") &&
      !nav.contains(e.target) &&
      e.target !== toggle
    ) {
      closeNav();
    }
  });

  // Closing on link click keeps the mobile menu from staying open
  // after navigating to an in-page anchor (e.g. Programs > #nursing).
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });
}
