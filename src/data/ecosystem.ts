import { siteLinks } from '../config/siteLinks';

export type EcosystemProject = {
  name: string;
  category: string;
  status: 'Available' | 'Beta' | 'Developer tool';
  description: string;
  href: string;
  action: string;
  qortalUri?: string;
};

export const ecosystemProjects: EcosystemProject[] = [
  {
    name: 'Qortal Hub',
    category: 'Primary interface',
    status: 'Available',
    description:
      'The modern desktop interface for accounts, Q-Chat, wallets, Q-Apps, publishing, and newer communication features.',
    href: siteLinks.hubRepository,
    action: 'View Hub',
  },
  {
    name: 'Qortal Go',
    category: 'Mobile',
    status: 'Available',
    description:
      'The Android interface for accessing Qortal from a mobile device, maintained in the official qortal-mobile repository.',
    href: siteLinks.mobileRepository,
    action: 'View mobile project',
  },
  {
    name: 'Qortal Extension',
    category: 'Browser interface',
    status: 'Available',
    description:
      'A Chromium extension for authenticated Qortal access and interaction with Q-Apps through gateway nodes.',
    href: siteLinks.extensionRepository,
    action: 'View extension',
  },
  {
    name: 'Q-Tube',
    category: 'Media',
    status: 'Available',
    description:
      'A Q-App for discovering, publishing, listening to, and downloading video on Qortal.',
    href: 'https://github.com/Qortal/q-tube',
    action: 'View repository',
    qortalUri: 'qortal://APP/Q-Tube',
  },
  {
    name: 'SubWire',
    category: 'Publishing',
    status: 'Available',
    description:
      'Decentralized articles, episodes, audio and video, author profiles, and private subscriber content.',
    href: 'https://github.com/Qortal/Subwire',
    action: 'View repository',
  },
  {
    name: 'Q-Wallets',
    category: 'Wallets',
    status: 'Available',
    description:
      'A Q-App interface for QORT and supported cross-chain wallets, balances, transfers, and address books.',
    href: 'https://github.com/Qortal/Q-Wallets',
    action: 'View repository',
    qortalUri: 'qortal://APP/Q-Wallets',
  },
  {
    name: 'Q-Manager',
    category: 'Network tools',
    status: 'Available',
    description:
      'A current TypeScript project for Qortal management workflows and network-aware administration.',
    href: 'https://github.com/Qortal/Q-Manager',
    action: 'View repository',
  },
  {
    name: 'Q-Mintership',
    category: 'Community coordination',
    status: 'Available',
    description:
      'Community boards and group-approval workflows used for current minter onboarding and coordination.',
    href: 'https://github.com/Qortal/Q-Mintership-Alpha',
    action: 'View repository',
    qortalUri: 'qortal://APP/Q-Mintership',
  },
  {
    name: 'qapp-core',
    category: 'Q-App development',
    status: 'Developer tool',
    description:
      'Reusable authentication, QDN data, resource-list, and utility building blocks for Q-App developers.',
    href: siteLinks.qappCore,
    action: 'View library',
  },
];

export const architectureLayers = [
  {
    label: 'People & communities',
    detail:
      'Locally controlled accounts, names, keys, groups, and participation.',
  },
  {
    label: 'Qortal Hub & interfaces',
    detail:
      'The human layer for communication, publishing, apps, wallets, and trade.',
  },
  {
    label: 'Qortal Core',
    detail:
      'A local node, API, transaction processor, and connection to the network.',
  },
  {
    label: 'QDN & blockchain',
    detail:
      'Distributed resources with on-chain references, names, and signed state.',
  },
  {
    label: 'Independent nodes',
    detail:
      'Participant-operated infrastructure that discovers, verifies, and shares data.',
  },
] as const;
