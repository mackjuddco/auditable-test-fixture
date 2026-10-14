# City of Muddville — WCAG 2.1 A/AA anti-fixture

A small, deliberately-inaccessible static website for testing accessibility
scanners (built as a fixture for **AuditAble**). It is a fictional municipal
site that **fails every one of the 50 WCAG 2.1 Level A + AA success criteria**
(30 Level A + 20 Level AA).

> ⚠️ This is a test fixture. "City of Muddville" is not a real municipality.
> Do not use it for any real purpose.

## What's here

```
index.html      Home — hero, auto-advancing carousel, keyboard-trap modal
services.html   Services — bad tables, fake headings, hover tooltip, custom controls
news.html       News & media — uncaptioned video, autoplay audio, flashing alert
contact.html    "Pay your water bill" form — the form-related failures
about.html      About — inconsistent nav, foreign-language passage, invalid markup
styles.css      Shared styles (holds the site-wide CSS failures)
shared.js       Shared behavior (modal trap, carousel, single-key shortcut)
assets/         Placeholder media (video, audio, image-of-text)
CRITERIA.md     The manifest: all 50 criteria → page + selector + how it fails + axe coverage
```

**Every failing element is tagged inline** with an HTML/CSS/JS comment like:

```html
<!-- WCAG-FAIL 1.4.3 (AA) Contrast (Minimum): body copy is #8a8a8a on #fff -->
```

So to find or change any single criterion's failure, search the repo for its
number (e.g. `grep -rn "1.4.3" .`) or open [CRITERIA.md](CRITERIA.md).

## Editing

No build step, no dependencies. Open any `.html` file, edit, save. Site-wide
failures live in `styles.css` / `shared.js`; the intentionally *inconsistent*
ones (nav order, control labels) live per-page in the HTML.

To preview locally:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying to GitHub Pages

1. Create a repo and push these files:
   ```sh
   git init && git add -A && git commit -m "WCAG anti-fixture"
   git branch -M main
   git remote add origin git@github.com:<you>/<repo>.git
   git push -u origin main
   ```
2. In the repo on GitHub: **Settings → Pages → Build and deployment → Source:
   GitHub Actions**.
3. The included workflow ([.github/workflows/pages.yml](.github/workflows/pages.yml))
   deploys on every push to `main`. **Redeploy = commit and push.**

### Custom domain

Either:

- **Via GitHub UI:** Settings → Pages → Custom domain → enter your domain (this
  creates/commits the `CNAME` file for you), then add the DNS records GitHub
  shows; **or**
- **Via file:** rename [CNAME.example](CNAME.example) to `CNAME`, put your
  domain in it, and point your DNS at GitHub Pages
  (`CNAME`/`ALIAS` to `<you>.github.io`, or the four A records for an apex
  domain).

`.nojekyll` is included so Pages serves the files as-is (no Jekyll processing).

## A note on the flashing content (2.3.1)

A genuine high-rate, large-area strobe is a real photosensitive-seizure hazard,
so by design the flashing alert on `news.html` is **mitigated**: it's a small
banner and it honors `prefers-reduced-motion: reduce` (visitors who request
reduced motion never see it animate). It is still documented as the 2.3.1
failure for manual review. If you specifically need an unmitigated strobe for a
closed test, edit `.flasher` in `styles.css` — but don't ship that to a public
URL.

## Notes for scanner testing

- Roughly **~28 of 50** criteria are at least partially machine-detectable by
  `axe-core`; the rest require manual review. The "Axe" column in
  [CRITERIA.md](CRITERIA.md) flags each as **Yes / Partial / No** so you can
  assert which your scanner auto-catches versus reports as *Not Evaluated*.
- Several failures (keyboard trap, autoplay audio, device-motion, single-key
  shortcut) are behavioral and may not surface in a static DOM snapshot — they
  exercise the manual/interactive paths.
- Browsers may block the `autoplay` audio (1.4.2) until a user gesture; the
  failure is in the markup regardless.
```
