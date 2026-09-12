# Qortal.org

The modern public home for Qortal: community-owned digital infrastructure for decentralized applications, publishing, communication, identity, transactions, and local-first participation.

This repository began from the engineering foundation of a NuQloud website, but the resulting product, content architecture, and visual system are purpose-built for Qortal.

## Routes

- `/` — Qortal overview and primary entry points
- `/explore` — why Qortal takes a different architectural approach
- `/technology` — Core, Hub, QDN, names, Q-Apps, communication, wallets, trade, and groups
- `/ecosystem` — curated current interfaces, Q-Apps, and tools
- `/get-started` — hosted access, local Core + Hub, Android, and browser extension paths
- `/build` — developer entry point
- `/community` — participation and verified community links
- `/about` — philosophy, community ownership, history, and direction

## Dual deployment model

The application supports both ordinary web hosting and direct Qortal/QDN rendering:

- React Router uses `window._qdnBase` as its basename when Qortal supplies it.
- Runtime detection distinguishes ordinary internet, recognized Qortal gateway, and authenticated QDN contexts.
- The current access context is visible in the header and footer.
- Internet destinations open normally on web/gateway copies and are copied for external use in authenticated QDN context.
- Qortal-native URIs use the Qortal interface bridge when available.
- Public access probes only the global Qortal bridge and does not force authentication.

## Content and configuration

- External URLs: `src/config/siteLinks.ts`
- Curated ecosystem data: `src/data/ecosystem.ts`
- Full repository metadata cache: `src/data/qortal-repositories.json`
- Source updater: `scripts/update-qortal-sources.mjs`
- Content provenance: [CONTENT_SOURCES.md](CONTENT_SOURCES.md)
- Route migration: [REDIRECTS.md](REDIRECTS.md)
- Information architecture: [SITE_ARCHITECTURE.md](SITE_ARCHITECTURE.md)
- Implementation decisions and TODOs: [REBUILD_NOTES.md](REBUILD_NOTES.md)

The new Docusaurus documentation URL was not present during the rebuild. `siteLinks.docs` is the only value that needs changing when that URL is available.

## Development

```bash
npm ci
npm run dev
```

Refresh the maintainers' GitHub organization snapshot without adding a runtime dependency:

```bash
npm run update:sources
```

## Validation

```bash
npm run format:check
npm run lint
npm run build
```

There is no separate automated test script. The production build runs the TypeScript project build before Vite bundling.

## Deployment

`public/.htaccess` supports SPA routing and selected legacy qortal.org redirects on Apache-compatible hosts. `public/404.html` restores deep links on static hosts. `public/sitemap.xml`, `public/robots.txt`, per-route metadata, canonical links, OpenGraph/Twitter metadata, and JSON-LD cover public SEO behavior.

The site has no runtime dependency on GitHub, external fonts, or remote visual assets.
