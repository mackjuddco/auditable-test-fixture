# Criteria manifest — 50 WCAG 2.1 Level A + AA criteria (49 failing, 1 fixed)

This fixture intentionally violates 49 of the 50 WCAG 2.1 Level A and AA
success criteria (30 Level A + 19 Level AA = 49). Each failing element in the
HTML is tagged inline with a `<!-- WCAG-FAIL x.x.x -->` comment; this file is
the index.

> **1.4.10 Reflow was fixed on 2026-10-24** (fluid `.shell` + wrapping
> masthead) to exercise AuditAble's developer-handoff flow end-to-end. It
> remains in the table below, marked **FIXED**, for the historical record.

## Important: automated detection only covers a fraction of WCAG

The site genuinely fails 49 of the 50 criteria (1.4.10 Reflow is fixed — see
above). But **an automated engine (axe-core,
which AuditAble's Layer 1 runs) can only detect a minority of WCAG** — most
criteria require human judgment (does the alt text make sense? is the title
descriptive? is the reading order logical?) and have no machine test at all.
This is not a flaw in the fixture; it is the central fact a scanner fixture
should demonstrate.

The **Axe** column below was *measured*, not guessed — verified by running
**axe-core 4.14** (tags `wcag2a, wcag2aa, wcag21a, wcag21aa`) against all five
pages. Legend:

- **fails** — axe reports a violation (the scanner should mark this *failing*). **11 criteria.**
- **review** — axe returns *needs-review / incomplete* (media checks it can't decide). **2 criteria.**
- **blind** — axe runs a rule and reports **pass**, even though the criterion is
  genuinely violated. These are axe's structural blind spots — a scanner may
  show them as "passing." **2 criteria.**
- **manual** — axe has no applicable rule; a correct scanner reports *Not
  Evaluated* (never a pass). **35 criteria.**

> So a well-behaved axe-based scanner should show **11 failing, 2 needs-review,
> and the remaining 37 as Not Evaluated** — with the caveat that 2 of those 37
> (2.4.1, 3.3.2) are "blind" criteria axe will falsely pass. If your scanner
> reports *more* than a couple as "passing," it is likely counting
> not-evaluated/incomplete criteria as passes — worth checking against
> scenarios.md's rule that *"criteria not evaluated are reported as Not
> Evaluated, never counted as passes."*

---

## Principle 1 — Perceivable (20)

| SC | Lvl | Page(s) | Where | How it fails | Axe |
|----|-----|---------|-------|--------------|-----|
| 1.1.1 Non-text Content | A | news, index | `.gallery img`, linked image, share icon `🔗`, banner | Informative images / icon control have no `alt` or accessible name | **fails** |
| 1.2.1 Audio-only and Video-only (Prerecorded) | A | news | `<audio controls>` public notice | Audio-only recording with no transcript | manual |
| 1.2.2 Captions (Prerecorded) | A | news | `<video>` mayor-briefing | No `<track kind="captions">` | review |
| 1.2.3 Audio Description or Media Alternative | A | news | mayor-briefing video | No descriptive track and no text alternative | manual |
| 1.2.4 Captions (Live) | AA | news | video marked `data-live` | "Live" stream with no captions | manual |
| 1.2.5 Audio Description (Prerecorded) | AA | news | mayor-briefing video | No audio-description track | manual |
| 1.3.1 Info and Relationships | A | services | `<ul>` with `<div>` children; `.fakehead`; header-less/layout tables | Broken list structure (axe), plus visual-only headings and header-less data tables | **fails** |
| 1.3.2 Meaningful Sequence | A | services | "Current wait times" `flex-direction:row-reverse` | DOM/reading order differs from visual order | manual |
| 1.3.3 Sensory Characteristics | A | services | intro paragraph | Instructions rely on shape/color/position | manual |
| 1.3.4 Orientation | AA | services | `.orientation-lock` | Content rotated/locked in landscape | manual |
| 1.3.5 Identify Input Purpose | AA | contact | `#name autocomplete="full-name-here"` (+ others have none) | Invalid autocomplete token (axe); missing tokens elsewhere | **fails** |
| 1.4.1 Use of Color | A | contact, services | `.req-label`, status dots, content links | Required state / status / links by color alone (links: axe `link-in-text-block`) | **fails** |
| 1.4.2 Audio Control | A | news | `<audio autoplay loop>` | Auto-playing audio with no control | review |
| 1.4.3 Contrast (Minimum) | AA | all | body `#8a8a8a`, nav, footer | Text contrast below 4.5:1 | **fails** |
| 1.4.4 Resize Text | AA | all | viewport `user-scalable=no, maximum-scale=1` | Zoom disabled | **fails** |
| 1.4.5 Images of Text | AA | index | `assets/welcome-banner.png` | Headline text baked into an image | manual |
| 1.4.10 Reflow | AA | all | `.shell { max-width:1180px }` | **FIXED 2026-10-24** — shell is now fluid and the masthead row wraps instead of forcing horizontal scroll at 320px (axe has no reflow rule, so this never showed as a scanner "fail") | n/a (fixed) |
| 1.4.11 Non-text Contrast | AA | all (forms), index | input borders, `.btn-secondary` | UI boundaries below 3:1 (axe has no non-text-contrast rule) | manual |
| 1.4.12 Text Spacing | AA | index | `.announcement` inline `!important` spacing | Spacing locked with inline `!important` (axe `avoid-inline-spacing`) | **fails** |
| 1.4.13 Content on Hover or Focus | AA | services | `.tooltip` | Hover-only, not dismissable, disappears on approach | manual |

## Principle 2 — Operable (17)

| SC | Lvl | Page(s) | Where | How it fails | Axe |
|----|-----|---------|-------|--------------|-----|
| 2.1.1 Keyboard | A | index, services | `.divbtn`, `.divcheck` | `<span>` click handlers not keyboard-operable | manual |
| 2.1.2 No Keyboard Trap | A | index | newsletter dialog (shared.js) | Tab cycles inside, Esc ignored, Close is mouse-only | manual |
| 2.1.4 Character Key Shortcuts | A | all | `"s"` key (shared.js) | Single-key shortcut, no way to disable | manual |
| 2.2.1 Timing Adjustable | A | contact | `#countdown` | 60s timeout, no extend/adjust | manual |
| 2.2.2 Pause, Stop, Hide | A | index | `.carousel` | Auto-advances with no pause/stop/hide | manual |
| 2.3.1 Three Flashes | A | news | `.flasher` | Flashing banner (mitigated; honors `prefers-reduced-motion`) | manual |
| 2.4.1 Bypass Blocks | A | all | no skip link, div-only structure | No skip link / landmarks — **but axe `bypass` passes because the pages have headings** | **blind** |
| 2.4.2 Page Titled | A | services | empty `<title>` | Page has no title text (axe `document-title`) | **fails** |
| 2.4.3 Focus Order | A | contact | `tabindex="3/1/4/2/5"` | Illogical tab order (axe `tabindex` is best-practice, not WCAG-tagged) | manual |
| 2.4.4 Link Purpose (In Context) | A | news | linked image w/ no name; "click here" links | Link with no discernible name (axe `link-name`); plus vague link text | **fails** |
| 2.4.5 Multiple Ways | AA | all | decorative search, no sitemap | Nav is the only way to locate pages | manual |
| 2.4.6 Headings and Labels | AA | services, contact | `<h2>More</h2>`, unlabeled inputs | Non-descriptive headings / missing labels (no WCAG-tagged rule) | manual |
| 2.4.7 Focus Visible | AA | all | `*:focus { outline:none }` | No visible focus indicator (axe has no focus-visible rule) | manual |
| 2.5.1 Pointer Gestures | A | index | `.carousel` swipe | Swipe-only, no single-pointer alternative | manual |
| 2.5.2 Pointer Cancellation | A | services | `onpointerdown` | Fires on down-event, no abort | manual |
| 2.5.3 Label in Name | A | contact | submit `aria-label="Send"` / text "Submit Request" | Accessible name omits visible label (axe rule is experimental, off by default) | manual |
| 2.5.4 Motion Actuation | A | news | `devicemotion` shake | Motion-only, no alternative/disable | manual |

## Principle 3 — Understandable (10)

| SC | Lvl | Page(s) | Where | How it fails | Axe |
|----|-----|---------|-------|--------------|-----|
| 3.1.1 Language of Page | A | all | `<html>` (no `lang`) | Default language not set (axe `html-has-lang`) | **fails** |
| 3.1.2 Language of Parts | AA | about | French motto | Foreign passage has no `lang` | manual |
| 3.2.1 On Focus | A | contact | `#topic onfocus` | Focus triggers a context change | manual |
| 3.2.2 On Input | A | contact | `#topic onchange` | Selection auto-navigates | manual |
| 3.2.3 Consistent Navigation | AA | about vs. others | `.topnav` order | Nav reordered on about.html | manual |
| 3.2.4 Consistent Identification | AA | about vs. others | search label | "Find It" here vs "Search" elsewhere | manual |
| 3.3.1 Error Identification | A | contact | `.has-error` | Errors shown by red border only | manual |
| 3.3.2 Labels or Instructions | A | contact | all inputs | No labels/instructions — real failure shows under **4.1.2**; axe's only 3.3.2 rule (`form-field-multiple-labels`) can't express "missing label", so it passes | **blind** |
| 3.3.3 Error Suggestion | AA | contact | `#result` "Invalid." | No correction suggestion | manual |
| 3.3.4 Error Prevention (Legal, Financial, Data) | AA | contact | pay-bill submit | Financial submit with no review/confirm/undo | manual |

## Principle 4 — Robust (3)

| SC | Lvl | Page(s) | Where | How it fails | Axe |
|----|-----|---------|-------|--------------|-----|
| 4.1.1 Parsing | A | about | duplicate `id="col"`, misnested tags, unclosed `<li>` | Invalid markup (axe only flags duplicate IDs referenced by ARIA; obsolete in WCAG 2.2) | manual |
| 4.1.2 Name, Role, Value | A | contact, services, news | unlabeled `<input>`s, `<select>`, linked image, `.divbtn`/`.divcheck` | Controls with no accessible name/role/state (axe `label`, `select-name`, `link-name`) | **fails** |
| 4.1.3 Status Messages | AA | contact, services | `#result`, `#svccount` | Dynamic status with no `aria-live`/`role=status` | manual |

---

### Summary (measured with axe-core 4.14)

- **fails (11):** 1.1.1, 1.3.1, 1.3.5, 1.4.1, 1.4.3, 1.4.4, 1.4.12, 2.4.2, 2.4.4, 3.1.1, 4.1.2
- **review (2):** 1.2.2, 1.4.2
- **blind — axe falsely passes (2):** 2.4.1, 3.3.2
- **manual — Not Evaluated (35):** everything else

### Cross-page criteria (why the site needs ≥2 pages)

- **2.4.5**, **3.2.3**, **3.2.4** can only be demonstrated across pages.
  `about.html` is the deliberate odd-one-out for 3.2.3 / 3.2.4.

### Re-running the check

The axe harness used to verify this lives outside the repo; to reproduce:
`npm i playwright @axe-core/playwright`, serve the folder
(`python3 -m http.server`), and run axe with the four WCAG A/AA tags against
each page.
