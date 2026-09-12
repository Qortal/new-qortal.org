export const siteLinks = {
  site: 'https://qortal.org',
  docs: 'https://qortal.dev/wiki',
  developerDocs: 'https://qortal.dev/docs/q-apps',
  qortalDev: 'https://qortal.dev',
  onboarding: 'https://qortal.dev/onboarding',
  downloads: 'https://qortal.dev/downloads',
  hostedHub: 'https://hub.qortal.link/',
  coreRepository: 'https://github.com/Qortal/qortal',
  coreRelease: 'https://github.com/Qortal/qortal/releases/latest',
  hubRepository: 'https://github.com/Qortal/Qortal-Hub',
  hubRelease: 'https://github.com/Qortal/Qortal-Hub/releases/latest',
  githubOrganization: 'https://github.com/Qortal',
  mobileRepository: 'https://github.com/Qortal/qortal-mobile',
  mobileRelease: 'https://github.com/Qortal/qortal-mobile/releases/latest',
  extensionRepository: 'https://github.com/Qortal/chrome-extension',
  extensionRelease:
    'https://github.com/Qortal/chrome-extension/releases/latest',
  qappCore: 'https://github.com/Qortal/qapp-core',
  createQortalApp: 'https://github.com/Qortal/create-qortal-app',
  discord: 'https://discord.com/invite/qortal-project-348175815822802946',
  support: 'https://cloud.qortal.org/call/iiip9ufk',
  youtube: 'https://www.youtube.com/channel/UC2dm2DxTM6JRdtmxP4RABBQ/',
  qortalSchemeHome: 'qortal://APP/Qortal-Hub',
} as const;

// The new Docusaurus documentation URL was not present in this repository at
// research time. `docs` intentionally remains the verified current wiki entry
// until maintainers replace this single value with the production docs URL.

export type SiteLinkKey = keyof typeof siteLinks;
