# Qortal.org rebuild notes

## Major changes

- Replaced the former NuQloud product site with a purpose-built Qortal information architecture, visual identity, copy system, routes, and SEO metadata.
- Added a dark-first responsive system inspired by a digital commons and independently operated network, with lightweight CSS/SVG visuals rather than Three.js or stock crypto imagery.
- Added first-class Technology, Ecosystem, Get Started, Build, Community, About, and Why Qortal pages.
- Centralized official external destinations and added a cached official-repository inventory/update script.
- Added provenance, redirect, architecture, and rebuild documentation.

## Foundation engineering retained

- Vite, React, TypeScript, lazy route loading, and local font bundling.
- The global `qortalRequest` bridge, used only for context detection and Qortal-native navigation without forced authentication.
- `_qdnBase` router support, iframe theme/language handling, SPA redirect restoration, and runtime awareness for normal web, gateway, and authenticated QDN access.
- Persistent dark/light theme behavior.

## Removed from the product experience

- NuQloud pricing, checkout, affiliate, MSP, storage-plan, terms, private-cloud, enterprise, and provider-comparison content.
- NuQloud logos, screenshots, business assets, Three.js showcase scenes, and old product routes.
- Old qortal-ui instructions and unsupported claims copied from the historical Qortal website.

## Claims intentionally omitted

- Absolute security, censorship-resistance, permanence, uptime, cost, throughput, or scalability guarantees.
- Detailed current minting/sponsorship/reward rules.
- A fixed cross-chain coin list.
- A claim that beta Reticulum/Q-Call work has replaced conventional connectivity.
- Community links that could not be verified from current sources.

## Remaining TODOs

- Keep the package at `0.3.3` until this rebuild has a commit beyond the last version commit; then apply the appropriate release bump and move the changelog out of Unreleased.
- Replace `siteLinks.docs` when the new Docusaurus production URL is provided.
- Decide how historical qortal.org news posts will be archived before retiring WordPress.
- Obtain a purpose-built 1200×630 Qortal social card if richer social previews are desired; the current metadata uses the official square mark.
- Have current maintainers review the conservative Q-Manager description and the curated ecosystem list.
