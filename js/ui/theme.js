/* ============================================================
   GIMS UI — Theme toggle (light/dark)
   Default is the standard GIMS white + blue theme. Preference is
   persisted to localStorage. Applying the saved theme happens as
   early as possible (see the inline snippet in <head> of every
   page) so there's no flash of the wrong theme — this file only
   wires up the toggle button itself.
   ============================================================ */
function initThemeToggle() {
  const btn = document.getElementById("gimsThemeToggle");
  if (!btn) return;
  const icon = btn.querySelector(".gims-theme-toggle-ic");

  const applyState = (isDark) => {
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    btn.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme",
    );
    if (icon) icon.textContent = isDark ? "☀️" : "🌙";
  };

  applyState(document.documentElement.getAttribute("data-theme") === "dark");

  btn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("gims-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("gims-theme", "dark");
    }
    applyState(!isDark);
  });
}
