/* ============================================================
   GIMS UI — FAQ accordion & feedback
   Accordion open/close (click + keyboard + ARIA) and the
   local-only "Was this helpful?" reaction on each answer.
   ============================================================ */
function initFaqAccordion() {
  document.querySelectorAll(".faq-item").forEach((item, i) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    if (q && a) {
      const id = a.id || `faqAnswer${i}`;
      a.id = id;
      q.setAttribute("aria-expanded", "false");
      q.setAttribute("aria-controls", id);
      q.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach((el) => {
          el.classList.remove("open");
          const elA = el.querySelector(".faq-a");
          const elQ = el.querySelector(".faq-q");
          if (elA) elA.style.maxHeight = null;
          if (elQ) elQ.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
          q.setAttribute("aria-expanded", "true");
        }
      });
    }
  });
}

/* FAQ "Was this helpful?" reaction — a local, per-visit toggle
   only. It is not wired to any backend and does not display or
   imply an aggregate count, so it never claims to be real usage
   data. */
function initFaqLikeButtons() {
  document.querySelectorAll(".faq-a-inner").forEach((body) => {
    if (body.querySelector(".gims-like-btn")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gims-like-btn";
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML = `<span class="heart" aria-hidden="true">♡</span><span class="label">Was this helpful?</span>`;
    btn.addEventListener("click", () => {
      const pressed = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", pressed ? "false" : "true");
      btn.querySelector(".heart").textContent = pressed ? "♡" : "♥";
      btn.querySelector(".label").textContent = pressed
        ? "Was this helpful?"
        : "Thanks for the feedback!";
    });
    body.appendChild(btn);
  });
}
