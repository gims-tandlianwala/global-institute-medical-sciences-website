/* ============================================================
   GIMS UI — Mobile bottom navigation
   Marks the current page as active (aria-current="page") based
   on the file name in the URL. Pure progressive enhancement —
   the bar and its links work with plain href navigation even if
   this script fails to run.
   ============================================================ */
function initMobileNav() {
  const nav = document.querySelector(".gims-mobile-nav");
  if (!nav) return;
  let file = location.pathname.split("/").pop();
  if (!file) file = "index.html";
  nav.querySelectorAll("a[data-page]").forEach((link) => {
    const linkFile = link.getAttribute("href");
    if (linkFile === file || (file === "" && linkFile === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });
}
