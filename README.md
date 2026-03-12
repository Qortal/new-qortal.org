# NuQloud Website

Landing site for NuQloud, built as a Qortal-publishable React app (via `create-qortal-app`) and designed to work cleanly in both:
- Qortal native context
- Gateway-accessed context (for example `nuqloud.com`)

## What This Build Includes

- Two distinct scroller routes:
  - `/` MSP-primary service page (managed provider focus)
  - `/self-hosting` plugin/self-hosting page
- Branding refresh:
  - MSP route: `NuQloud MSP`
  - Plugin route: `NuQloud for Nextcloud - powered by Qortal`
- Mobile-first content-density controls:
  - Core heavy sections now support tap-to-expand / tap-to-collapse behavior on smaller screens.
  - `More Details` in plans now includes additional nested toggles for Included, Expansion Modules, and Roadmap.
- MSP narrative flow is now marketing-first:
  - `What You Can Replace`
  - `What Is Included`
  - `Compare By Need` cards
  - `Choose Your Starting Plan` (per-user on existing cloud vs fully private branded cloud)
- Replacements section now includes provider icon references and staged reveal timing for stronger scroll storytelling.
- Replacements section now maps a broader set of big-tech equivalents (workspace, comms, storage, workflow, docs/knowledge, groupware, identity, operations, and lifecycle funnels).
- Provider icons are now bundled as local SVG assets (no external CDN dependency), improving reliability in QDN/gateway contexts.
- Deep-dive buttons now expand in-page panels directly below the section where they are triggered.
- `Two Starting Points` now stacks vertically and each starting point includes 3 starter package cards with USD/QORT payment actions.
- Included feature matrix content plus `Expansion Modules` and `Roadmap` now live under `Two Starting Points` via the `Full Details` expander.
- Package messaging is pricing-agnostic in-page: package differences are communicated as deployment model/capacity/operations scope rather than feature gating.
- `Unify Your Cloud Life` now uses titled staggered sequence cards for cleaner scan/read flow while scrolling.
- Checkout actions are now access-aware: QDN mode shows QORT-only actions, gateway/internet mode shows USD-only actions.
- Hero CTAs now use section navigation labels (`See Packages`, `Details`) and jump to the matching sections.
- Right-side scroll tracking now uses section-center proximity for tighter active-dot alignment with visible content.
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

## Assets

Logo/hero graphics are loaded from:
- `public/logo-test.png`
- `public/advertising-dark.webp`
- `public/advertising-white.webp`

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
- `index.html` metadata/title now uses NuQloud branding for internet-hosted previews and social cards.
- A routed Terms page is available at `/terms`, and a global footer now shows `© 2026 CHD` plus a Terms link.
