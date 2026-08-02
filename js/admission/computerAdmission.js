/* ============================================================
   GIMS ADMISSION — Computer & IT course application
   Simpler single-step application form for computer courses (uses admission/formSubmit.js).
   ============================================================ */

function initComputerAdmissionForm() {
  const form = document.getElementById("computerAdmissionForm");
  if (!form) return;
  const btn = document.getElementById("computerSubmitBtn");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitAdmissionForm(
      form,
      btn,
      "Thanks for reaching out! We've received your message and will get back to you soon.",
    );
  });
}

/* ============================================================
   Admission form wizard
   ============================================================ */
