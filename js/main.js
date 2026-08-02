/* ============================================================
   GIMS — Main entry point
   This file only orchestrates initialization. Actual feature
   code lives in the focused module files below (loaded first,
   in dependency order, as classic scripts — not ES modules, so
   the site still works when opened directly from disk and needs
   no build step).

   Load order (see the <script> tags at the bottom of every page):
     js/data/programs.js              → PROGRAMS data
     js/admission/formSubmit.js       → shared AJAX submit + popups
     js/admission/medicalAdmission.js → initAdmissionForm
     js/admission/computerAdmission.js→ initComputerAdmissionForm
     js/pages/contactForm.js          → initContactForm
     js/pages/programsPage.js         → initTrackTabs, initProgramsPage
     js/ui/nav.js                     → initNav
     js/ui/faq.js                     → initFaqAccordion, initFaqLikeButtons
     js/ui/theme.js                   → initThemeToggle
     js/ui/mobileNav.js               → initMobileNav
     js/ui/animations.js              → initHeroHeadline, initHeroSpotlight,
                                         initMagneticButtons, initScrollReveal
     js/ui/flipCards.js               → initFlipCards
     js/ui/preloader.js               → preloader fade-out (self-running)
     js/main.js (this file)           → runs all of the above on DOMContentLoaded
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFaqAccordion();
  initFaqLikeButtons();
  initThemeToggle();
  initMobileNav();
  initTrackTabs();
  initProgramsPage();
  initAdmissionForm();
  initComputerAdmissionForm();
  initContactForm();
  initScrollReveal();
  initMagneticButtons();
  initHeroSpotlight();
  initHeroHeadline();
  initFlipCards();
});
