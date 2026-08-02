/* ============================================================
   GIMS UI — Flip cards
   Program flip cards: hover-to-flip on desktop (CSS), click/tap/Enter/Space to flip (JS), aria-expanded state.
   ============================================================ */

function initFlipCards() {
  document.querySelectorAll(".gims-flip-card").forEach((card) => {
    card.setAttribute("role", "group");
    card.setAttribute("aria-expanded", "false");
    const toggleFlip = () => {
      const flipped = card.classList.toggle("is-flipped");
      card.setAttribute("aria-expanded", flipped ? "true" : "false");
    };
    card.querySelectorAll(".gims-flip-toggle").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFlip();
      });
    });
    // Tap anywhere on the card face (touch devices) also flips it,
    // as long as the tap wasn't on a link or the toggle button.
    card.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;
      toggleFlip();
    });
    // Enter/Space flips the card when it (not a child control) has focus.
    card.addEventListener("keydown", (e) => {
      if (e.target !== card) return;
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        toggleFlip();
      }
    });
  });
}

/* ============================================================
   Hero mouse spotlight — a soft glow that follows the cursor
   inside the hero section only. Desktop, fine-pointer only.
   ============================================================ */
