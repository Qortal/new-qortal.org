# NuQloud Website

Landing site for NuQloud, built as a Qortal-publishable React app (via `create-qortal-app`) and designed to work cleanly in both:

- Qortal native context
- Gateway-accessed context (for example `nuqloud.com`)

## What This Build Includes

- Two distinct scroller routes:
  - `/` MSP-primary service page (managed provider focus)
  - `/self-hosting` plugin/self-hosting page
  - `/feature-details/:storyId` preserved in-depth feature pages sourced from the archived MSP content model
- Root landing page now uses a private-cloud-first marketing structure:
  - direct hero messaging for normal buyers
  - plain-language explanation of what NuQloud is
  - a scroll-driven feature-story section with animated workflows, readable big-tech replacement groups, and `Read More` links into preserved detail pages
  - differentiation, service-model split, stack summary, and plan preview sections
- Self-hosting route remains available for the plugin-first audience with separate messaging and navigation, and now clearly notes that the plugin package is being finalized for near-term release.
- Previous dense MSP homepage content is preserved in:
  - `src/content/mspLegacyArchive.ts`
- Branding refresh:
  - MSP route: `NuQloud`
  - Plugin route: `NuQloud for Nextcloud - powered by Qortal`
- MSP page keeps right-side animated geometry and square-grid atmosphere.
- Self-hosting page uses left-side animated geometry with circular-grid black-background styling.
- Dual-theme design (dark + light blue systems).
- Access-context detection uses:
  - authenticated QDN detection via `GET_USER_ACCOUNT` (takes priority)
  - trusted gateway host detection only for `*.crowetic.com`
  - internet fallback context
- On-page theme toggle plus iframe theme compatibility.
- Percent-based content width (intentionally narrower than full viewport to expose animated side objects).
- Active-section navigation (sticky top nav + side progress rail on wide viewports).
- Scroll choreography includes side-slide reveal cards for deeper replacement details.
- Responsive layout for desktop/tablet/mobile.
- Reveal-on-scroll section animation with staggered choreography, parallax background response, and scroll-reactive geometric objects.
- Cross-functional internet-link actions:
  - Authenticated QDN context copies internet-only links to clipboard.
  - Trusted gateway/internet contexts open links in a new tab.

## Content Sources

Primary product messaging is derived from:

- `DOCS/Initial-Concept-Overview.md`
- `DOCS/Initial-Platform-Packages.md`

Legacy MSP homepage content from the earlier detailed landing build is preserved for reuse in:

- `src/content/mspLegacyArchive.ts`

## Assets

Logo/hero graphics are loaded from:

- `public/NuQloud-Nucleus-logoOnly-favicon.png`
- `public/NuQloud-Block-logo-noBG-2.png`

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- Router basename remains `_qdnBase` aware for QDN compatibility.
- GlobalProvider auth auto-login is disabled for public landing-page access.
- `index.html` metadata/title now emphasizes the private-cloud offer instead of the previous abstract tagline.
- A routed Terms page is available at `/terms`, and a global footer now shows `© 2026 CHD` plus a Terms link.
