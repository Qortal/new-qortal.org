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
  - updated hero/about positioning around NuQloud as a private digital world and gateway to decentralized data/apps
  - plain-language explanation of what NuQloud is
  - a scroll-driven feature-story section with animated workflows, larger bundled color replacement-provider logos, and `Read More` links into preserved detail pages
  - a curated real screenshot gallery for the NuQloud dashboard, network identity/publishing flow, decentralized apps, files, conversations, and collaborative editing, with mobile-friendly bottom tabs below the active screenshot and arrow-based navigation in the enlarged lightbox view
  - managed account plan cards now surface the team variant as a smaller outlined `team - up to 5 users` button so the alternate package path is easier to notice
  - communications replacement logos now avoid duplicate entries and include additional real bundled service marks for messaging apps like Telegram and WhatsApp
  - plans now render as two coordinated lanes, with the `NuQloud Accounts` and `Dedicated Branded NuQloud Instances` summary cards centered above their matching plan groups and accent styling carried through to the plan cards and buy buttons
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
- The sticky header navigation now includes a direct `Screenshots` jump link for the interface gallery section.
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

Replacement-provider icons and the `Powered by Qortal` badge are bundled locally in `src/assets/` so they continue to work in QDN-hosted builds without remote asset dependencies.

The website and Nextcloud integration now both use the smaller bundled `Powered by Qortal` logo variants where that badge is shown, reducing the visual footprint while keeping theme-specific light/dark assets.

The interface gallery screenshots are also bundled locally under `src/assets/interface-gallery/` with stable renamed filenames so the gallery works the same in both standard hosting and QDN-published deployments.

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
- Public-facing metadata now includes canonical URL, robots directives, expanded Open Graph/Twitter card fields, absolute social-preview image URLs, and JSON-LD structured data for stronger SEO and link-preview behavior on internet-hosted deployments.
- A routed Terms page is available at `/terms`, and a global footer now shows `© 2026 CHD` plus a Terms link.
- The Terms page now explicitly distinguishes on-instance data from QDN-published data, including CHD’s lack of access/control over private QDN-published data and the limits of CHD redundancy guarantees once an account is no longer in good standing.
- The Terms page also now clarifies present hardware-policy scope, nominative/comparative use of third-party logos and service marks, and that `NuQloud for Nextcloud` is a Qortal-powered plugin layer extending the separate Nextcloud platform.
