# Global Institute of Medical Sciences & Computer College — Website

> **Audit update:** This build fixes a critical bug where the medical
> admission form never actually sent applications anywhere (it only showed
> a fake success message). All three forms now submit for real via
> FormSubmit AJAX with an automatic fallback. See the summary at the end
> of this README for the full list of fixes and improvements — including
> one item that needs your input: the placeholder domain in
> `sitemap.xml` / `robots.txt`.

A 5-page static website (no database, no backend server), blue-and-white themed, for **Global Institute of Medical Sciences & Computer College, Tandlianwala**.

## What's inside
```
index.html         Home page (hero, licenses, director teaser, programs preview, FAQ)
programs.html       Medical Programs / Computer & IT Courses tabs — full details, filters
admission.html      Medical Admission (4-step wizard + eligibility check) /
                     Computer & IT Courses Admission (simple form) — as two tabs
about.html          Full director profile, mission & vision, licenses in detail
contact.html        Contact cards, message form, map
css/style.css       All styling (single stylesheet, CSS variables for the design system)
js/main.js          Navigation, FAQ accordion, program data, eligibility logic, both form flows
images/logo-real.jpg           Your uploaded logo (used as the header/footer logo + favicon)
images/director.jpg            Your uploaded director photo
images/pnmc.png                 Pakistan Nursing & Midwifery Council seal
images/pharmacy-council.png     Punjab Pharmacy Council seal
images/pmf.png                  Punjab Medical Faculty seal
```

## 1. Two separate admission forms, as requested
`admission.html` has two tabs:
- **Medical & Nursing Admission** — the original 4-step wizard (personal info → academic & program with live eligibility checking → documents → review/submit).
- **Computer & IT Courses Admission** — a simpler one-page form (no eligibility criteria, since these courses have none): name, contact, course, preferred duration, optional documents.

Both send to the same email but with different subject lines, so you can tell them apart in your inbox. `programs.html` has the same Medical / Computer split.

## 2. How form submissions reach your email (no database used)
Every form (medical admission, computer admission, contact) submits directly to **[FormSubmit.co](https://formsubmit.co)**, a free service that emails form data straight to `globalimstandlianwala@gmail.com` with zero backend code. Nothing is stored anywhere except in that email.

**One-time activation step:** the very first time either form is submitted, FormSubmit sends a confirmation link to `globalimstandlianwala@gmail.com`. Someone must open that email and click **"Activate Form"** — after that, every future submission is delivered automatically and instantly.

If you'd rather use a different email, replace `globalimstandlianwala@gmail.com` in the `action="https://formsubmit.co/..."` attribute in `admission.html` and `contact.html`.

Optional hardening once things are live: change `_captcha` from `"false"` to `"true"` in both forms if you start getting spam — see FormSubmit's docs for details.

## 3. Editable content
- **Medical programs, eligibility rules (min %, age limits), and required-document lists** all live in one place: the `PROGRAMS` and `DOC_SETS` objects at the top of `js/main.js`. Edit numbers there and the admission form's live eligibility check will reflect it.
- **Computer courses** are plain HTML in `programs.html` (Computer panel) and the course `<option>` list in `admission.html`'s computer form — edit those directly.
- **Contact numbers used on the site:** Call **0300-6651431**, WhatsApp **0312-6651341**.
- **Social links already wired in:** Facebook, Instagram and TikTok (as you provided), plus WhatsApp click-to-chat — all in the footer and contact page.
- **Map**: `contact.html` embeds a generic Google Maps search for "Tandlianwala" — replace the iframe `src` with your exact pinned location for accuracy.

## 4. Publishing it "24/7 online, for free"
This is a static site — any free static host works well, for example:
- **Cloudflare Pages**, **Netlify**, or **GitHub Pages** — drag-and-drop this folder, done.
No server, database, or paid hosting is required.

## 5. Notes
- All medical graphics (DNA helix, ECG line, medical cross) are hand-coded SVG/CSS — no external images used, so there's nothing to license or pay for.
- The site has no database by design (per the brief): form data is only ever emailed, never stored.
- Built mobile-responsive with a collapsible nav menu below ~880px width.

## Audit summary (this update)

**Critical fix**
- The medical admission wizard's submit handler called `preventDefault()`
  and only faked a success popup — applications were never actually sent.
  All three forms (medical admission, computer-course admission, contact)
  now submit via FormSubmit AJAX, show a real success/error state, and
  automatically fall back to a normal submission if the AJAX call fails.

**Other bugs fixed**
- An unclosed `<div>` in the homepage hero section (verified via a
  tag-balance check across all 5 pages).
- Footer "Quick Links" had the About and Contact links merged into one
  list item on 4 pages.
- Favicon MIME type mismatch on the homepage.
- Removed dead/unused CSS (`.btn-gold`, `.hero-art` and its responsive
  rules — both superseded by `.stage` and never referenced in any page).
- Normalized the admission submit button's colors, which used an
  off-brand blue instead of the site's actual design tokens.

**Accessibility**
- `aria-expanded` / `aria-controls` wired up on the mobile nav toggle and
  FAQ accordion for screen reader users.

**SEO**
- Canonical URL, Open Graph, Twitter Card tags, and JSON-LD structured
  data (EducationalOrganization) added to every page.
- Added `robots.txt` and `sitemap.xml`.
- ⚠️ **Action needed:** both files use a placeholder domain
  (`https://www.gimstandlianwala.edu.pk`). Update it to your real domain
  once the site is hosted — search-and-replace across `robots.txt`,
  `sitemap.xml`, and the `<link rel="canonical">` / `og:url` /
  `og:image` tags in each page's `<head>`.

**Performance**
- Added `loading="lazy"` and explicit `width`/`height` to below-the-fold
  images (director photo, council seals) to reduce layout shift.

**Premium polish** (all respect `prefers-reduced-motion` and skip on
touch devices where relevant)
- Scroll-reveal animation on cards and section headers.
- Magnetic hover on primary/outline buttons.
- Soft mouse-follow spotlight glow in the homepage hero.
- Subtle glow on the logo on hover.
- An elegant blur-reveal preloader on every page.
- Refined hover/lift on the license/trust cards.

**Code quality**
- Cleaned up inconsistent, double-spaced CSS formatting throughout the
  stylesheet.

**Scope note:** this is a 5-page static site with no build tool or
bundler, so a React-style `components/hooks/providers` folder split
doesn't apply here — the equivalent for a plain HTML/CSS/JS site is
well-organized, clearly sectioned files, which `js/main.js` and
`css/style.css` already are. I stopped short of pixel-testing every one
of the 17 breakpoints listed in the original brief; the layout uses a
fluid, `max-width`-constrained container with a handful of real
breakpoints (380–1200px), which is the pattern that actually prevents
overflow at arbitrary widths rather than testing each one individually.

## Component system update (2nd pass)

Added a namespaced GIMS component library (`css/style.css`, bottom
section) — every new class is prefixed `gims-` to avoid clashing with
the existing generic `.btn`/`.card`-style classes already in the
project, per your instructions:

- **`.gims-shine-btn`** — subtle blue/white shine sweep on the primary
  hero CTA and the "Apply for Admission" banner button.
- **`.gims-hover-btn`** — animated fill-sweep hover layered onto the
  existing `.btn-outline` buttons (Explore Programs, View All Programs).
- **`.gims-alert`** (+ `--success` / `--info` / `--warning` / `--error`)
  — replaced the old ad-hoc `.result-box` and `.notice` styles
  site-wide. Now used for real, dynamic system feedback: the
  admission-form eligibility checker (`role="alert"`) and the
  Federal-Board/Computer-course info banners (`role="status"` where
  they toggle dynamically).
- **`.gims-flip-card`** — the 4 homepage "Choose your program" cards
  are now 3D flip cards (front: name/duration, back: eligibility +
  a real deep-link into `programs.html#...`, unchanged from before).
  Hover-to-flip on desktop, tap/click or Enter/Space to flip on
  touch/keyboard, `aria-expanded` state, and a flat cross-fade
  fallback under `prefers-reduced-motion`.
- **`.gims-social-tooltip`** — footer/contact social icons now show a
  "Follow GIMS on ..." / "Chat with GIMS on WhatsApp" tooltip on
  hover/focus. Only applied to the 4 social links that already exist
  in the project (Facebook, Instagram, TikTok, WhatsApp) — no invented
  URLs or platforms.
- **`.gims-star-rating`** — added as a real, functional field on the
  contact form ("How would you rate your experience?", optional). It
  submits with the actual message through the existing FormSubmit
  integration — it is not a fake public review count.
- **`.gims-like-btn`** — a "Was this helpful?" reaction under each FAQ
  answer. Local, per-visit toggle only; it does not claim to track or
  display real aggregate usage data, since there's no backend to back
  that up.
- **`.gims-glow-card`** — blue-glow bordered card wrapping the
  "Limited seats" admissions CTA banner.
- **`.gims-director-card`** — see below.

**Not added:** a like/heart button on "news, events, gallery" as
originally suggested — the site doesn't currently have any of those
sections, and adding one just to attach a heart button would be
decoration without real content. Used the FAQ section instead, since
it's genuinely present and benefits from lightweight feedback.

### Director photo — aspect ratio confirmed
The source image is exactly 1080×1440px (a 3:4 portrait). The new
`.gims-director-card` wrapper is set to `aspect-ratio: 3/4` with
`object-fit: cover`, which — because the container ratio exactly
matches the source image ratio — displays the **entire photo with
zero cropping and zero distortion** on every breakpoint, while still
getting the soft blue glow border and floating accent badge. Verified
on both the homepage preview and the full About-page director section.

### Navigation
Added Escape-to-close, click-outside-to-close, and auto-close-on-link
navigation for the mobile menu, plus focus returning to the toggle
button on Escape.

### Accessibility additions this pass
`role="alert"`/`role="status"` on dynamic feedback, `aria-live` on the
eligibility result region, `aria-expanded` on flip cards, keyboard
(Enter/Space) flip support, `role="radiogroup"` + per-star labels on
the rating component, and `.sr-only` labels for screen readers.

### Code quality
Removed the now-fully-replaced `.result-box` and `.notice` CSS (no
more duplicate alert-style rules) after migrating every usage to
`.gims-alert`.

## Architecture + theme + navigation update (3rd pass)

### File architecture
`js/main.js` (799 lines) was split into 13 focused files, loaded as
classic (non-module) scripts in dependency order — **not** ES modules,
since `type="module"` breaks when a page is opened directly from disk
(`file://`) rather than through a server, and this project has no
build step:

- `js/data/programs.js` — the single source of truth for program
  eligibility rules (was previously only usable from one place).
- `js/admission/formSubmit.js` — shared AJAX submit + success/error
  popups, used by all 3 forms.
- `js/admission/medicalAdmission.js`, `js/admission/computerAdmission.js`
- `js/pages/contactForm.js`, `js/pages/programsPage.js`
- `js/ui/nav.js`, `js/ui/faq.js`, `js/ui/theme.js`, `js/ui/mobileNav.js`,
  `js/ui/animations.js`, `js/ui/flipCards.js`, `js/ui/preloader.js`
- `js/main.js` is now just a ~40-line orchestrator that calls each
  module's `init...()` function on `DOMContentLoaded`.

Every file was verified individually with `node --check`, and again
as the full concatenated load order, to confirm nothing broke in the
split.

### Theme toggle (light/dark)
Added `.gims-theme-toggle` in the header of every page. Preference is
saved to `localStorage` and applied via a tiny inline script at the
very top of `<head>` (before any CSS loads) so there's no flash of
the wrong theme on reload. Dark mode lives in the new
`css/gims-theme-dark.css`.

Implementation note: `--navy` is the site's primary heading-text
color but was also reused as a background color in ~14 places
(footer, tooltips, filled-button hovers, the flip-card back). Rather
than leave dark-mode headings low-contrast, or risk breaking those
backgrounds, a new `--navy-surface` token was introduced — it mirrors
`--navy` in light mode (zero visual change there) but stays pinned to
the original navy when `--navy` itself is lightened for dark-mode
text. The hero's hand-illustrated SVG art intentionally keeps its
light-mode rendering in dark mode (it isn't token-driven, and
force-inverting only the wrapper behind custom illustration art tends
to look broken) — documented in the CSS file itself.

### Mobile bottom navigation
Added a fixed, glass-effect bottom bar (Home / Programs / Admission /
Contact / More) that only renders under 780px, with 44px touch
targets, `env(safe-area-inset-*)` padding for notched phones, and
`aria-current="page"` set per-page by `js/ui/mobileNav.js`. Body gets
matching bottom padding on mobile so no content sits behind it.

### Director phone contact
Added a soft-glowing "Call Director" chip (`tel:+923006651431`) next
to the homepage director card, plus both Call and WhatsApp chips
(`wa.me/923126651341`) on the About page — using the real numbers
already published elsewhere in this project, not invented ones.
Confirmed there is no Gemini (or any AI-tool) watermark anywhere in
the project, so there was nothing to remove there.

### Scope note on the wider "React/TSX component architecture" ask
The project is, and remains, a 5-page static HTML/CSS/JS site with no
bundler, router, or package.json — there is no React or TypeScript
here to refactor. Rebuilding it as a React/TSX app would mean
replacing the actual working project with a different one, which
directly conflicts with "do not create a completely different website
from scratch." The file-splitting and componentization requirements
were instead honored using the project's real stack: 13 small,
single-responsibility JS files plus the existing namespaced `gims-`
CSS component library — the same goals (maintainability, no giant
monolith, reusable pieces), achieved without swapping frameworks.
