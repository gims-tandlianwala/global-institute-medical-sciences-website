/* ============================================================
   GIMS ADMISSION — Shared form submit
   AJAX submit to FormSubmit (with file upload support) + success/error popups, shared by all 3 forms on the site.
   ============================================================ */

function submitAdmissionForm(form, submitBtn, successText) {
  const originalLabel = submitBtn ? submitBtn.textContent : "";
  const message =
    successText ||
    "Your application has been submitted successfully. Our management team will contact you soon.";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
  }

  const action = form.getAttribute("action") || "";
  const ajaxAction = action.replace(
    "https://formsubmit.co/",
    "https://formsubmit.co/ajax/",
  );
  const formData = new FormData(form);

  fetch(ajaxAction, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then(() => {
      showSuccessPopup(message);
      form.reset();
      if (submitBtn) submitBtn.textContent = "Sent ✓";
    })
    .catch(() => {
      // AJAX failed (offline, blocked, etc.) — fall back to a normal
      // form submission so the message still reaches FormSubmit.
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
      showSubmitError(form);
    });
}

function showSubmitError(form) {
  if (typeof Swal !== "undefined") {
    Swal.fire({
      title: "Couldn't send automatically",
      text: "We couldn't confirm your submission went through. Click OK and we'll submit it the normal way instead.",
      icon: "warning",
      confirmButtonText: "OK, submit now",
    }).then(() => form.submit());
  } else {
    alert(
      "We couldn't confirm your submission went through — submitting the normal way now.",
    );
    form.submit();
  }
}

function showSuccessPopup(message) {
  if (typeof Swal !== "undefined") {
    Swal.fire({
      title: "Thank You!",
      text: message,
      icon: "success",
      confirmButtonText: "OK",
      timer: 7000,
      timerProgressBar: true,
    });
  } else {
    alert(message);
  }
}

/* ============================================================
   Scroll reveal — fades/lifts sections and cards into view as
   the user scrolls. Skips everything when the visitor's OS asks
   for reduced motion.
   ============================================================ */
