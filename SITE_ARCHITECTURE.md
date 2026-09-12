# Qortal.org site architecture

## Primary routes

- `/` — fast definition, major capabilities, Core/Hub model, ecosystem preview, and starting paths.
- `/explore` — why a local-first, participant-operated network exists.
- `/technology` — Core, Hub, QDN, names, Q-Apps, communication, wallets, trade, and groups.
- `/ecosystem` — curated current interfaces, Q-Apps, and developer tools.
- `/get-started` — hosted evaluation versus local Core + Hub, with desktop/mobile/browser paths.
- `/build` — developer overview and links into Q-App, QDN, API, qapp-core, and source documentation.
- `/community` — participation paths with explicit distinctions between Qortal-native applications and external community-run locations such as Qortal Cloud.
- `/about` — philosophy, ownership model, history, and current direction.

## Intended user journeys

1. A new visitor learns what Qortal is on the homepage, explores why the architecture differs, then chooses hosted or local access.
2. A technical visitor moves directly from Technology to Core/Hub source or dedicated documentation.
3. A developer moves from Build to Q-App documentation, qapp-core, templates, and repositories.
4. An existing Qortian moves into the Ecosystem or Community pages and can open Qortal-native links when available.

## Configuration strategy

External destinations are centralized in `src/config/siteLinks.ts`. Current ecosystem presentation data lives in `src/data/ecosystem.ts`. The full repository metadata cache is generated into `src/data/qortal-repositories.json` for maintainer review and is not fetched by production browsers.

The React router reads `window._qdnBase`, preserving relative QDN rendering while normal web hosts use root-based paths. Runtime access detection differentiates ordinary web, recognized Qortal gateway, and authenticated QDN contexts. The header exposes that context, and shared external-link behavior adapts without repeatedly probing the Core API.

The visual system uses locally bundled fonts, CSS/SVG network motifs, restrained motion, and no remote font or runtime GitHub dependency. The public site uses the global `qortalRequest` bridge directly and does not load application-state or component frameworks it does not need.
