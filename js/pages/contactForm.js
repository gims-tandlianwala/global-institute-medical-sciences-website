/* ============================================================
   GIMS PAGES — Contact form
   Wires the contact page form into the shared AJAX submit handler (uses admission/formSubmit.js).
   ============================================================ */

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const btn = document.getElementById("contactSubmitBtn");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitAdmissionForm(form, btn);
  });
}

/* ============================================================
   Track tabs — Medical vs Computer & IT (used on programs.html
   and admission.html)
   ============================================================ */
