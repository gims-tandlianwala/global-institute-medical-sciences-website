/* ============================================================
   GIMS UI — Preloader
   Fades out once the page has finished loading.
   ============================================================ */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  preloader.classList.add("done");
  setTimeout(() => preloader.remove(), 700);
});
