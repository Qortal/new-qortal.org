# Qortal.org content sources

Research date: **2026-09-12**

The public copy favors current source repositories over legacy marketing pages. Technical claims are intentionally architectural and bounded; release numbers are recorded here for provenance but are not embedded throughout the UI.

## Primary sources

| Source                                                  | Branch / state researched                            | Website areas informed                                  | Relevant material                                                                                                                              |
| ------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [Qortal Core](https://github.com/Qortal/qortal)         | `master`; release `v6.1.9` current during research   | Home, Why Qortal, Technology, Get Started, Build, About | `README.md`, `Q-Apps.md`, `v6.md`, current source tree and release metadata                                                                    |
| [Qortal Hub](https://github.com/Qortal/Qortal-Hub)      | `develop`; release `v3.0.3` current during research  | Home, Technology, Get Started, Community, About         | `README.md`, `docs/reticulum.md`, `docs/group-audio-calls.md`, `docs/i18n_languages.md`, Electron packaging configuration, current source tree |
| [Qortal GitHub organization](https://github.com/Qortal) | All 39 repositories returned by the organization API | Ecosystem, Build, source inventory                      | Repository descriptions, default branches, update timestamps, archived/fork status, language, releases, selected READMEs                       |
| [qortal.dev](https://qortal.dev)                        | Current public pages and sitemap                     | Get Started, Build, Community, centralized links        | `/downloads`, `/onboarding`, `/devs`, `/docs/q-apps`, `/support`, `/wiki`, verified redirect links                                             |
| [Current qortal.org](https://qortal.org)                | Public homepage and WordPress sitemap                | Redirect inventory and historical context only          | `page-sitemap.xml`, `post-sitemap.xml`; old copy was not reused without newer support                                                          |

## Selected ecosystem repositories

The public ecosystem cards were checked against current official-organization metadata and, where present, repository READMEs: `Qortal-Hub`, `qortal-mobile`, `chrome-extension`, `q-tube`, `Subwire`, `Q-Wallets`, `Q-Manager`, `Q-Mintership-Alpha`, and `qapp-core`.

The complete cached organization snapshot is stored in `src/data/qortal-repositories.json`. Refresh it for maintainer review with:

```bash
npm run update:sources
```

Production pages do not query GitHub at runtime.

## Claims deliberately bounded

- Qortal Cloud is identified as an external community cloud server operated by CHD for Qortal community members. It is not presented as a Qortal-native service.
- QDN is described as distributed data with on-chain transaction/hash references. The site does not call it unhackable, impossible to remove, or infinitely scalable.
- Qortal is described as locally operable and participant-run. The site does not guarantee universal uptime or immunity from software, device, network, or user risk.
- Q-Chat is current. Reticulum direct/group voice and file transfer are described as current Hub work; group calling is labeled beta.
- Group membership and approval transactions are current. The site does not claim a complete network-wide governance system.
- Cross-chain trading is described without a hard-coded supported-coin list because support can change by release.
- Minting is acknowledged as network participation but detailed eligibility, sponsorship, reward, and leveling rules are omitted from marketing copy because those rules require dedicated current documentation.

## Unresolved or community verification required

- The new Docusaurus documentation staging URL was not present in this repository or its environment. `src/config/siteLinks.ts` therefore keeps the verified current wiki landing page in `siteLinks.docs` as a temporary single-point value. Replace it when the production documentation URL is supplied.
- `Q-Manager` is active but had no useful README in the researched branch. Its public description is intentionally general.
- Hosted `go.qortal.link` currently resolves to the hosted Hub endpoint. The interface is explicitly labeled as an older version while rapid development continues on the rebuilt Hub and Q-Chat over Reticulum, pending a replacement hosted build. The site links mobile users to official Android releases and does not promise a distinct mobile-hosted experience.
- No Telegram link was promoted because a current authoritative link was not found in the researched sources.
