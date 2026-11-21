# Field guides

Pocket cards Pete uses on a phone: camera settings for the Canon R50/M50, checks for picking up used items from Marketplace, and 3D-print fit notes.

## Layout

- `site/` is the whole website. Plain HTML, no build step.
  - `index.html` lists every guide.
  - `pickup-cards/` Marketplace pickup inspection cards.
  - `camera-cards/` R50 / M50 field cards.
  - `_headers` security headers for Cloudflare Pages. `404.html` not-found page.
- `scripts/check.mjs` checks every page at phone width (no sideways scroll, no script errors, links resolve).

## Deploys

Cloudflare Pages is connected to this repo. Production branch `main`, build command none, output directory `site`.
Every merge to `main` deploys to production; every pull request gets its own preview URL.

## Adding a guide

1. Add `site/<name>/index.html` (self-contained: inline CSS and JS, fonts from Google Fonts only).
2. Add a row for it to `site/index.html`, with a back link to `/` on the guide page.
3. Run `node scripts/check.mjs` (needs Playwright) and open a pull request.

Tick boxes and numbers entered on a guide stay in the visitor's own browser (localStorage). Nothing is sent anywhere.
