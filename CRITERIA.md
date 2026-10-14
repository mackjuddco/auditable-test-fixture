# Criteria manifest — all 50 WCAG 2.1 Level A + AA failures

This fixture intentionally violates **every** WCAG 2.1 Level A and AA success
criterion (30 Level A + 20 Level AA = 50). Each failing element in the HTML is
tagged inline with a `<!-- WCAG-FAIL x.x.x -->` comment; this file is the
index.

**"Axe auto-detect" column** is a *guide*, not a guarantee — it reflects what
`axe-core` typically flags with its default ruleset:

- **Yes** — axe reliably reports this.
- **Partial** — axe reports *some* instances / a related rule, but not the
  whole failure (often depends on axe version — e.g. `duplicate-id` and
  `duplicate-id-aria` were deprecated in axe-core 4.9).
- **No** — not machine-detectable; requires manual review (your "Not
  Evaluated" bucket).

Roughly **~28 of 50** are at least partially machine-detectable, which lines up
with AuditAble's stated Layer-1 coverage. The rest exist to exercise the
manual-review / "Not Evaluated" path.

---

## Principle 1 — Perceivable (20)

| SC | Lvl | Page(s) | Where | How it fails | Axe |
|----|-----|---------|-------|--------------|-----|
| 1.1.1 Non-text Content | A | news, index | `.gallery img`, share icon `🔗`, welcome banner | Informative images and icon-only control have no `alt` / accessible name | Yes |
| 1.2.1 Audio-only and Video-only (Prerecorded) | A | news | `<audio controls>` public notice | Audio-only recording with no transcript / text alternative | No |
| 1.2.2 Captions (Prerecorded) | A | news | `<video src="mayor-briefing.mp4">` | No `<track kind="captions">` | No |
| 1.2.3 Audio Description or Media Alternative | A | news | mayor-briefing video | No descriptive track and no text alternative | No |
| 1.2.4 Captions (Live) | AA | news | video marked `data-live` | "Live" stream with no live captions | No |
| 1.2.5 Audio Description (Prerecorded) | AA | news | mayor-briefing video | No audio-description track | No |
| 1.3.1 Info and Relationships | A | services | `.fakehead`, header-less `<table>`, layout `<table>` | Visual-only headings, data table with no `<th>`/scope, tables used for layout | Partial |
| 1.3.2 Meaningful Sequence | A | services | "Current wait times" `flex-direction:row-reverse` | DOM/reading order differs from visual order | No |
| 1.3.3 Sensory Characteristics | A | services | intro paragraph | Instructions rely on shape/color/position ("round green button on the right") | No |
| 1.3.4 Orientation | AA | services | `.orientation-lock` | Content rotated/locked in landscape on small screens | No |
| 1.3.5 Identify Input Purpose | AA | contact | name / email / phone inputs | No `autocomplete` tokens on self-identifying fields | Partial |
| 1.4.1 Use of Color | A | contact, services | `.req-label`, open/closed dots, content links | Required state, status, and links conveyed by color alone | No |
| 1.4.2 Audio Control | A | news | `<audio autoplay loop>` | Audio auto-plays >3s with no in-page pause/stop | No |
| 1.4.3 Contrast (Minimum) | AA | all | body text `#8a8a8a`, nav, footer | Text contrast below 4.5:1 (down to ~1.7:1) | Yes |
| 1.4.4 Resize Text | AA | all | `<meta name="viewport" … user-scalable=no, maximum-scale=1>` | Zoom disabled, blocking 200% text resize | Yes |
| 1.4.5 Images of Text | AA | index | `assets/welcome-banner.png` | Headline text baked into an image | No |
| 1.4.10 Reflow | AA | all | `.shell { width:1180px }` + no-zoom viewport | Fixed-width layout forces horizontal scroll at 320px | Partial |
| 1.4.11 Non-text Contrast | AA | all (forms), index | input borders `#e9edf0`, `.btn-secondary` | UI component boundaries below 3:1 | Partial |
| 1.4.12 Text Spacing | AA | index | `.announcement` | Fixed height + `overflow:hidden` + forced `line-height` clips on spacing override | No |
| 1.4.13 Content on Hover or Focus | AA | services | `.tooltip` | Hover-only tip; not focusable, not dismissable, disappears on approach | No |

## Principle 2 — Operable (17)

| SC | Lvl | Page(s) | Where | How it fails | Axe |
|----|-----|---------|-------|--------------|-----|
| 2.1.1 Keyboard | A | index, services | `.divbtn` "Report a problem", `.divcheck` | `<span>` click handlers not focusable/operable by keyboard | No |
| 2.1.2 No Keyboard Trap | A | index | `[data-modal]` newsletter dialog (shared.js) | Tab cycles inside dialog, Esc ignored, Close is mouse-only | No |
| 2.1.4 Character Key Shortcuts | A | all | `"s"` key handler (shared.js) | Single-key shortcut focuses search; no way to turn off/remap | No |
| 2.2.1 Timing Adjustable | A | contact | `#countdown` | 60s form timeout with no extend/adjust/turn-off | No |
| 2.2.2 Pause, Stop, Hide | A | index | `.carousel` (shared.js) | Auto-advances every 3s with no pause/stop/hide | No |
| 2.3.1 Three Flashes or Below Threshold | A | news | `.flasher` | Flashing banner (mitigated: small area, honors `prefers-reduced-motion`) | No |
| 2.4.1 Bypass Blocks | A | all | no skip link, div-only structure | No skip link, no landmarks, no headings to bypass repeated nav | Partial |
| 2.4.2 Page Titled | A | services | `<title>Untitled Document</title>` | Title present but non-descriptive | Yes |
| 2.4.3 Focus Order | A | contact | `tabindex="3/1/4/2/5"` | Tab order out of logical reading sequence | No |
| 2.4.4 Link Purpose (In Context) | A | news | "Read more" / "Click here" / "More" | Link text does not convey destination/purpose | Partial |
| 2.4.5 Multiple Ways | AA | all | decorative search, no sitemap | Nav is the only way to locate pages (search is non-functional, no sitemap/index) | No |
| 2.4.6 Headings and Labels | AA | services, contact | `<h2>More</h2>`, unlabeled inputs | Non-descriptive headings and missing labels | Partial |
| 2.4.7 Focus Visible | AA | all | `*:focus { outline:none }` (styles.css) | No visible keyboard focus indicator | Partial |
| 2.5.1 Pointer Gestures | A | index | `.carousel` swipe (shared.js) | Manual control is swipe-only; no single-pointer alternative | No |
| 2.5.2 Pointer Cancellation | A | services | "Subscribe" `onpointerdown` | Action fires on down-event; no up-event / no abort | No |
| 2.5.3 Label in Name | A | contact | submit button `aria-label="Send"` / text "Submit Request" | Accessible name doesn't contain the visible label | Partial |
| 2.5.4 Motion Actuation | A | news | `devicemotion` shake-to-refresh | Function triggered only by motion; no UI alternative, no disable | No |

## Principle 3 — Understandable (10)

| SC | Lvl | Page(s) | Where | How it fails | Axe |
|----|-----|---------|-------|--------------|-----|
| 3.1.1 Language of Page | A | all | `<html>` (no `lang`) | Default human language not programmatically set | Yes |
| 3.1.2 Language of Parts | AA | about | French motto `<em>` | Foreign-language passage has no `lang` | No |
| 3.2.1 On Focus | A | contact | `#topic` `onfocus` | Focusing the select triggers a context change (alert) | No |
| 3.2.2 On Input | A | contact | `#topic` `onchange` | Changing the select auto-navigates with no warning | No |
| 3.2.3 Consistent Navigation | AA | about vs. others | `.topnav` order | Nav links reordered on about.html relative to every other page | No |
| 3.2.4 Consistent Identification | AA | about vs. others | search control label | Same control labeled "Find It" here, "Search" elsewhere | No |
| 3.3.1 Error Identification | A | contact | `.has-error` | Errors shown by red border only; no text identifies the error | Partial |
| 3.3.2 Labels or Instructions | A | contact | all inputs | Placeholder-only, no `<label>`, no format instructions | Partial |
| 3.3.3 Error Suggestion | AA | contact | `#result` "Invalid." | Error gives no suggestion for correction | No |
| 3.3.4 Error Prevention (Legal, Financial, Data) | AA | contact | pay-bill submit | Financial submission with no review/confirm/undo step | No |

## Principle 4 — Robust (3)

| SC | Lvl | Page(s) | Where | How it fails | Axe |
|----|-----|---------|-------|--------------|-----|
| 4.1.1 Parsing | A | about | duplicate `id="col"`, misnested `<strong>/<em>`, unclosed `<li>` | Invalid markup (note: obsolete in WCAG 2.2, still in 2.1) | Partial |
| 4.1.2 Name, Role, Value | A | index, services | `.divbtn`, `.divcheck`, icon control | Custom controls expose no role / name / state | Partial |
| 4.1.3 Status Messages | AA | contact, services | `#result`, `#svccount` | Dynamic status text injected with no `aria-live` / `role=status` | No |

---

### Cross-page criteria (why the site needs ≥2 pages)

- **2.4.5 Multiple Ways**, **3.2.3 Consistent Navigation**, **3.2.4 Consistent
  Identification** can only be demonstrated across multiple pages. `about.html`
  is the deliberate odd-one-out for 3.2.3 / 3.2.4.

### Site-wide criteria (present on every page, canonical location noted above)

`3.1.1` (no lang), `1.4.4` (no zoom), `1.4.10` (fixed width), `2.4.7`
(no focus outline), `2.4.1` (no skip link/landmarks), `2.1.4` (`s` shortcut),
`1.4.3` (contrast).
