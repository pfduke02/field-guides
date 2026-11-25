# Project 9: extend the existing pocket cards

Decision recorded November 24, 2026: fold personal field guides into the existing Marketplace exchange / pickup cards project. Do not create a separate app or put this in project #4's camera/device simulator.

## Verified destination

- Live library: https://field-guides-83z.pages.dev/
- GitHub repository shown in Cloudflare: pfduke02/field-guides
- Cloudflare Pages project: field-guides
- Existing library: six Canon R50 / M50 shooting cards, pickup inspection checklists for 13 item categories, and a 3D-print fit kit.
- Live site says checkbox and numeric entries remain on the user's device. Preserve this behavior.
- Cloudflare deployment description identifies plain HTML in `site`, no build, with `scripts/check.mjs` for phone-width checks. Confirm against the current repository before editing.

## Overnight implementation scope

Scheduled intent: November 25, 2026, 12:30 a.m. America/New_York, as one standalone work session.

1. Locate or clone the existing repository and follow its instructions; preserve existing changes and tooling.
2. Add short, phone-friendly cards for photographing a moving subject and preparing for a photography outing, with starting settings and exact control locations only when verified for the relevant camera model.
3. Add RØDE guides only for equipment models verified from authorized project context. Record missing model information instead of guessing.
4. Use official manuals as sources; distinguish draft guidance from workflows Peter has actually tested. Include source links and a simple way to flag confusing steps locally.
5. Package the existing library for offline use. Explain initial online loading and test actual offline reload, not merely the presence of a service worker.
6. Validate mobile layout, navigation, checkbox persistence, existing-card compatibility, and offline behavior. Keep personal field-test notes local.
7. Leave a reviewable branch/local result or draft PR with verification results. Do not create a new public service or broaden access. Deployment is not required for this overnight pass.

## Current status

Discovery complete. Existing project confirmed through the signed-in Cloudflare dashboard and live library. Implementation is reserved for the overnight run; no application changes or deployment have been made now.

## Version control

Continue on `codex/offline-field-guides`. Make focused conventional commits, push the branch to GitHub, and open or update a draft pull request. Do not merge automatically; main deploys to Cloudflare. Check available disk space before cloning or installing dependencies; preserve at least 100 GB free.
