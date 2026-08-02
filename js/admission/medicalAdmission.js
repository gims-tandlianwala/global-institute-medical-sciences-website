/* ============================================================
   GIMS ADMISSION — Medical admission wizard
   Multi-step form: personal/academic info, live eligibility checker (uses data/programs.js), document checklist, review, submit (uses admission/formSubmit.js).
   ============================================================ */

function initAdmissionForm() {
  const form = document.getElementById("admissionForm");
  if (!form) return;

  const steps = Array.from(document.querySelectorAll(".form-step"));
  const stepIndicators = Array.from(document.querySelectorAll(".step"));
  let current = 0;

  const dobInput = document.getElementById("dob");
  const ageOutput = document.getElementById("ageOutput");
  const basisRadios = document.querySelectorAll('input[name="basis"]');
  const obtainedInput = document.getElementById("marksObtained");
  const totalInput = document.getElementById("marksTotal");
  const percentOutput = document.getElementById("percentOutput");
  const programSelect = document.getElementById("programSelect");
  const eligibilityBox = document.getElementById("eligibilityResult");
  const docChecklist = document.getElementById("docChecklist");
  const faNotice = document.getElementById("faNotice");
  const reviewTable = document.getElementById("reviewTable");
  const nextBtns = document.querySelectorAll("[data-next]");
  const prevBtns = document.querySelectorAll("[data-prev]");
  const submitBtn = document.getElementById("submitBtn");

  function showStep(i) {
    steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
    stepIndicators.forEach((s, idx) => {
      s.classList.toggle("active", idx === i);
      s.classList.toggle("done", idx < i);
    });
    window.scrollTo({ top: form.offsetTop - 110, behavior: "smooth" });
  }

  function calcAge() {
    if (!dobInput || !dobInput.value) {
      if (ageOutput) ageOutput.textContent = "—";
      return null;
    }
    const dob = new Date(dobInput.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    if (ageOutput) ageOutput.textContent = age >= 0 ? age + " years" : "—";
    return age;
  }
  if (dobInput) dobInput.addEventListener("input", calcAge);

  function calcPercent() {
    if (!obtainedInput || !totalInput) return null;
    const o = parseFloat(obtainedInput.value);
    const t = parseFloat(totalInput.value);
    if (!o || !t) {
      if (percentOutput) percentOutput.textContent = "—";
      return null;
    }
    const pct = (o / t) * 100;
    if (percentOutput) percentOutput.textContent = pct.toFixed(1) + "%";
    return pct;
  }
  [obtainedInput, totalInput].forEach((el) => {
    if (el) el.addEventListener("input", calcPercent);
  });

  function currentBasis() {
    const checked = document.querySelector('input[name="basis"]:checked');
    return checked ? checked.value : null;
  }

  basisRadios.forEach((r) =>
    r.addEventListener("change", () => {
      document
        .querySelectorAll(".radio-card")
        .forEach((c) => c.classList.remove("selected"));
      r.closest(".radio-card").classList.add("selected");
      if (faNotice)
        faNotice.style.display = currentBasis() === "fa" ? "flex" : "none";
      populateProgramOptions();
      renderDocChecklist();
      evaluateEligibility();
    }),
  );

  function populateProgramOptions() {
    if (!programSelect) return;
    const basis = currentBasis();
    programSelect.innerHTML = '<option value="">Select a program</option>';
    Object.entries(PROGRAMS).forEach(([key, p]) => {
      if (!basis || p.basis.includes(basis)) {
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = `${p.name} (${p.code}) — ${p.categoryLabel}`;
        programSelect.appendChild(opt);
      }
    });
  }

  function renderDocChecklist() {
    if (!docChecklist) return;
    const basis = currentBasis() || "matric";
    const docs = DOC_SETS[basis] || DOC_SETS.matric;
    docChecklist.innerHTML = "";
    docs.forEach((doc, idx) => {
      const row = document.createElement("div");
      row.className = "doc-item";
      row.innerHTML = `
        <span class="doc-name">${idx + 1}. ${doc}</span>
        <input type="file" name="doc_${idx}" aria-label="Upload ${doc}">
      `;
      docChecklist.appendChild(row);
    });
  }

  function evaluateEligibility() {
    if (!programSelect || !eligibilityBox) return;
    const key = programSelect.value;
    const basis = currentBasis();
    const age = calcAge();
    const pct = calcPercent();
    if (!key || !basis || age === null || pct === null) {
      eligibilityBox.innerHTML = "";
      return;
    }
    const p = PROGRAMS[key];
    const reasons = [];
    if (!p.basis.includes(basis)) {
      reasons.push(
        `${p.name} does not accept applications on the basis of ${basis.toUpperCase()}.`,
      );
    }
    const minReq =
      basis === "fa" && p.minPercentFA ? p.minPercentFA : p.minPercent;
    if (pct < minReq) {
      reasons.push(
        `Your marks (${pct.toFixed(1)}%) are below the required ${minReq}%.`,
      );
    }
    if (age > p.ageLimit) {
      reasons.push(
        `Your age (${age}) exceeds the age limit of ${p.ageLimit} years for this program.`,
      );
    }
    if (reasons.length === 0) {
      eligibilityBox.innerHTML = `
        <div class="gims-alert gims-alert--success" role="alert">
          <span class="gims-alert-ic" aria-hidden="true">✓</span>
          <div class="gims-alert-body">
            <strong>You appear eligible for ${p.name} (${p.code})</strong>
            Requirement: ${p.eligibilityText}. Final confirmation is subject to document verification.
          </div>
        </div>`;
    } else {
      eligibilityBox.innerHTML = `
        <div class="gims-alert gims-alert--error" role="alert">
          <span class="gims-alert-ic" aria-hidden="true">!</span>
          <div class="gims-alert-body">
            <strong>You do not currently meet the criteria for ${p.name} (${p.code})</strong>
            ${reasons.join(" ")}
          </div>
        </div>`;
    }
  }

  [programSelect, obtainedInput, totalInput, dobInput].forEach((el) => {
    if (el) el.addEventListener("input", evaluateEligibility);
  });
  if (programSelect)
    programSelect.addEventListener("change", evaluateEligibility);

  function buildReview() {
    if (!reviewTable) return;
    const val = (id) => document.getElementById(id)?.value || "—";
    const basis = currentBasis();
    const key = programSelect ? programSelect.value : "";
    const p = PROGRAMS[key];
    const rows = [
      ["Full Name", val("fullName")],
      ["Father's Name", val("fatherName")],
      [
        "Date of Birth",
        val("dob") +
          (ageOutput && ageOutput.textContent !== "—"
            ? ` (${ageOutput.textContent})`
            : ""),
      ],
      ["Gender", val("gender")],
      ["Email", val("email")],
      ["Phone / WhatsApp", val("phone")],
      ["CNIC Number", val("cnic")],
      ["Home Address", `${val("address")}, ${val("city")}, ${val("district")}`],
      ["Applying On Basis Of", basis ? basis.toUpperCase() : "—"],
      [
        "Marks Obtained / Total",
        `${val("marksObtained")} / ${val("marksTotal")} (${percentOutput ? percentOutput.textContent : ""})`,
      ],
      ["Program Applied For", p ? `${p.name} (${p.code})` : "—"],
    ];
    reviewTable.innerHTML = rows
      .map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`)
      .join("");
  }

  function validateStep(i) {
    const step = steps[i];
    if (!step) return true;
    const inputs = step.querySelectorAll("input[required], select[required]");
    for (const el of inputs) {
      if (!el.value) {
        el.reportValidity();
        return false;
      }
    }
    return true;
  }

  nextBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      if (!validateStep(current)) return;
      if (current === 1 && programSelect && !programSelect.value) {
        alert("Please select a program before continuing.");
        return;
      }
      if (current === 2) buildReview();
      current = Math.min(current + 1, steps.length - 1);
      showStep(current);
    }),
  );
  prevBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      current = Math.max(current - 1, 0);
      showStep(current);
    }),
  );

  populateProgramOptions();
  renderDocChecklist();

  form.addEventListener("submit", function (e) {
    // Submit the real application data via AJAX instead of a full page
    // navigation, so we can show a premium success state without ever
    // losing the submission (this previously called preventDefault()
    // and never actually sent the form to FormSubmit — fixed here).
    e.preventDefault();
    submitAdmissionForm(form, submitBtn);
  });
}

/* ============================================================
   Real form submission (AJAX) + success/error UI
   FormSubmit.co supports posting FormData — including files — to
   its /ajax/ endpoint and returns JSON instead of redirecting.
   ============================================================ */
