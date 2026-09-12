# Changelog

## Unreleased

- **Changed:** Rebuilt the former NuQloud website into the official Qortal.org public experience, with a Qortal-specific information architecture, visual system, content, and navigation focused on community-owned digital infrastructure (migration/notes: former product, pricing, affiliate, storage, and enterprise routes are removed).
- **Added:** Added Why Qortal, Technology, Ecosystem, Get Started, Build, Community, and About routes with responsive layouts and current-source-backed copy (how to use: begin at `/` or navigate directly from the shared header).
- **Added:** Added centralized official links, a complete cached Qortal GitHub organization inventory, and a maintainer update script that does not create a production runtime dependency on GitHub (how to use: run `npm run update:sources`).
- **Added:** Added `CONTENT_SOURCES.md`, `REDIRECTS.md`, `SITE_ARCHITECTURE.md`, and `REBUILD_NOTES.md` for provenance, migration, structure, uncertainty, and follow-up work (how to use: review before changing technical copy or destinations).
- **Changed:** Preserved and renamed dual web/Qortal runtime handling, including `_qdnBase`, SPA deep-link restoration, iframe theme/language events, authenticated QDN detection, gateway detection, and context-aware external actions (migration/notes: theme and redirect storage keys now use the Qortal.org namespace).
- **Changed:** Replaced old site metadata with unique route titles/descriptions, canonical and social metadata, structured data, a sitemap, robots policy, semantic page structure, keyboard focus states, and reduced-motion behavior (migration/notes: canonical production origin is `https://qortal.org`).
- **Perf:** Replaced heavyweight legacy showcase scenes with CSS/SVG network and architecture visuals while retaining route-level lazy loading (why: keep initial rendering lightweight across web, gateway, and QDN access).
- **Perf:** Removed inherited MUI, Three.js, animation-library, and application-provider runtime dependencies from the public entry path while retaining the global Qortal bridge and QDN-aware router (why: the information site does not need private application state or a component framework).
