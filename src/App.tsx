import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import LanRoundedIcon from '@mui/icons-material/LanRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import WorkspacesRoundedIcon from '@mui/icons-material/WorkspacesRounded';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import {
  type ChangeEvent,
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import poweredByQortalDark from './assets/brand/powered-by-qortal-dark-small.png';
import poweredByQortalLight from './assets/brand/powered-by-qortal-light-small.png';
import collaborativeDocSharingImage from './assets/interface-gallery/nuqloud-collaborative-doc-sharing.png';
import createGroupConversationImage from './assets/interface-gallery/nuqloud-create-group-conversation.png';
import dashboardOverviewImage from './assets/interface-gallery/nuqloud-dashboard-overview.png';
import filesPublishApprovalImage from './assets/interface-gallery/nuqloud-files-publish-approval.png';
import filesPublishStatusImage from './assets/interface-gallery/nuqloud-files-publish-status.png';
import liveDocumentCollaborationImage from './assets/interface-gallery/nuqloud-live-document-collaboration.png';
import networkTransactionsImage from './assets/interface-gallery/nuqloud-network-transactions.png';
import qdeckAccessImage from './assets/interface-gallery/nuqloud-qdeck-access.png';
import qmailAccessImage from './assets/interface-gallery/nuqloud-qmail-access.png';
import sharedFileInConversationImage from './assets/interface-gallery/nuqloud-shared-file-in-conversation.png';
import airtableIcon from './assets/provider-icons/real/airtable.svg';
import asanaIcon from './assets/provider-icons/real/asana.svg';
import boxIcon from './assets/provider-icons/real/box.svg';
import confluenceIcon from './assets/provider-icons/real/confluence.svg';
import discordIcon from './assets/provider-icons/real/discord.svg';
import dropboxIcon from './assets/provider-icons/real/dropbox.svg';
import googleChatIcon from './assets/provider-icons/real/googlechat.svg';
import googleDocsIcon from './assets/provider-icons/real/googledocs.svg';
import googleDriveIcon from './assets/provider-icons/real/googledrive.svg';
import googleMeetIcon from './assets/provider-icons/real/googlemeet.svg';
import icloudIcon from './assets/provider-icons/real/icloud.svg';
import jiraIcon from './assets/provider-icons/real/jira.svg';
import notionIcon from './assets/provider-icons/real/notion.svg';
import telegramIcon from './assets/provider-icons/real/telegram.svg';
import trelloIcon from './assets/provider-icons/real/trello.svg';
import whatsappIcon from './assets/provider-icons/real/whatsapp.svg';
import zoomIcon from './assets/provider-icons/real/zoom.svg';
import { BRAND_HEADER_LOGO, BRAND_HERO_LOGO } from './brandAssets';
import { BlackHoleScene } from './components/BlackHoleScene';
import { useAccessContext } from './hooks/useAccessContext';
import { EnumTheme, themeAtom } from './state/global/system';
import './App.css';

const PLAN_CHECKOUT_URLS: Record<string, string> = {
  'nuqloud-starter':
    'https://payment.crowetic.com/products/nuqloud/nuqloud-starter/checkout',
  'nuqloud-advanced':
    'https://payment.crowetic.com/products/nuqloud/nuqloud-advanced/checkout',
  'nuqloud-pro':
    'https://payment.crowetic.com/products/nuqloud/nuqloud-pro/checkout',
  'nuqloud-team-starter':
    'https://payment.crowetic.com/products/nuqloud/nuqloud-starter-team/checkout',
  'nuqloud-team-advanced':
    'https://payment.crowetic.com/products/nuqloud/nuqloud-advanced-team/checkout',
  'nuqloud-team-pro':
    'https://payment.crowetic.com/products/nuqloud/nuqloud-professional-team/checkout',
  'nuqloud-branded-starter':
    'https://payment.crowetic.com/products/nuqloud/nuqloud-branded-starter/checkout',
  'nuqloud-branded-pro':
    'https://payment.crowetic.com/products/nuqloud/nuqloud-branded-pro/checkout',
  'nuqloud-branded-enterprise':
    'https://payment.crowetic.com/products/nuqloud/nuqloud-branded-enterprise-default/checkout',
};
const CONTACT_TICKET_URL = 'https://payment.crowetic.com/tickets/create';
const AI_SUPPORT_EMAIL_URL = 'mailto:info@nuqloud.com';
const QORTAL_QMAIL_CONTACT_URL = 'qortal://APP/Q-Mail/to/crowetic';
const QORTAL_CHDC_URL = 'qortal://CHDC';
const AFFILIATE_CODE_STORAGE_KEY = 'nuqloud-affiliate-code';
const AFFILIATE_CODE_MAX_LENGTH = 64;

const pageSections = [
  { id: 'overview', label: 'Home', shortLabel: 'Hm', topNav: true },
  { id: 'about', label: 'About', shortLabel: 'Abt', topNav: true },
  { id: 'features', label: 'Features', shortLabel: 'Feat', topNav: true },
  { id: 'foundation', label: 'Screenshots', shortLabel: 'Shots', topNav: true },
  { id: 'plans', label: 'Plans', shortLabel: 'Plan', topNav: false },
  { id: 'contact', label: 'Contact', shortLabel: 'Info', topNav: true },
] as const;

type PageSectionId = (typeof pageSections)[number]['id'];

const desktopTopNavSectionIds = new Set<PageSectionId>([
  'overview',
  'about',
  'features',
  'foundation',
  'contact',
]);

const mobileTopNavSectionIds = new Set<PageSectionId>(['overview', 'contact']);

const heroHighlights = [
  'Private cloud',
  'Managed for you',
  'Optional resilient publishing',
];

const MOBILE_COMPACT_BREAKPOINT = 720;
const NAV_COMPACT_BREAKPOINT = 1180;

function getTopbarOffset(): number {
  const topbar = document.querySelector<HTMLElement>('.sc-topbar');
  const topbarHeight = topbar?.offsetHeight ?? 0;
  return topbarHeight + 18;
}

function normalizeAffiliateCode(value: string): string {
  return String(value || '')
    .trim()
    .replace(/\s+/g, '')
    .replace(/[^A-Za-z0-9._-]/g, '')
    .slice(0, AFFILIATE_CODE_MAX_LENGTH);
}

function appendAffiliateCode(url: string, affiliateCode: string): string {
  if (!url) {
    return '';
  }

  const normalizedAffiliateCode = normalizeAffiliateCode(affiliateCode);
  if (!normalizedAffiliateCode) {
    return url;
  }

  try {
    const nextUrl = new URL(url);
    nextUrl.searchParams.set('ref', normalizedAffiliateCode);
    return nextUrl.toString();
  } catch {
    return url;
  }
}

function getOrderedSectionAnchors(
  scrollY: number
): Array<{ id: PageSectionId; top: number; bottom: number; center: number }> {
  return pageSections
    .map((section) => {
      const element = document.getElementById(section.id);
      if (!element) {
        return null;
      }
      const top = element.getBoundingClientRect().top + scrollY;
      const height = element.offsetHeight;
      return {
        id: section.id,
        top,
        bottom: top + height,
        center: top + height / 2,
      };
    })
    .filter(
      (item): item is {
        id: PageSectionId;
        top: number;
        bottom: number;
        center: number;
      } => item !== null
    )
    .sort((a, b) => a.top - b.top);
}

const heroQuickWins = [
  {
    title: 'Files + Collaboration',
    body: 'Sync, share, and publish to a decentralized network',
    Icon: CloudRoundedIcon,
  },
  {
    title: 'Secure Communications',
    body: 'Encrypted, Private video/voice/meetings and project management',
    Icon: WorkspacesRoundedIcon,
  },
  {
    title: 'Private and Next-Gen',
    body: 'Fully Private + off-server decentralized files + apps',
    Icon: ShieldRoundedIcon,
  },
];

type ProviderLogo = {
  name: string;
  icon: string;
};

type ReplacementGroup = {
  label: string;
  providers: ProviderLogo[];
};

type IconComponent = typeof CloudRoundedIcon;

type FeatureSceneId = 'sync' | 'share' | 'communicate' | 'publish';

type FeatureStory = {
  id: string;
  title: string;
  body: string;
  detail: string;
  actionLabel: string;
  successLabel: string;
  scene: FeatureSceneId;
  Icon: IconComponent;
  steps: readonly string[];
  replacements: readonly ReplacementGroup[];
  badgeImageLight?: string;
  badgeImageDark?: string;
  badgeAlt?: string;
};

const featureStories = [
  {
    id: 'store-sync',
    title: 'Store & Sync',
    body: 'Keep files available across multiple devices and easily publish selected files to an encrypted decentralized data network.',
    detail:
      'Keep files on any device, sync all files or only what you choose, share publicly or privately, and publish selected files to a decentralized network that stays available without a server.',
    actionLabel:
      'One private file workflow from sync to optional decentralized publishing.',
    successLabel: 'Files ready everywhere',
    scene: 'sync',
    Icon: SyncRoundedIcon,
    steps: [
      'Files on any device',
      'Sync all files or only what you choose',
      'Share publicly or privately',
      'Publish to a decentralized network and access without a server',
    ],
    replacements: [
      {
        label: 'Consumer file storage silos',
        providers: [
          { name: 'Dropbox', icon: dropboxIcon },
          { name: 'Google Drive', icon: googleDriveIcon },
          { name: 'Box', icon: boxIcon },
          { name: 'iCloud', icon: icloudIcon },
        ],
      },
      {
        label: 'Separate office-file stacks',
        providers: [
          { name: 'Google Docs', icon: googleDocsIcon },
          { name: 'Notion', icon: notionIcon },
          { name: 'Airtable', icon: airtableIcon },
        ],
      },
    ],
  },
  {
    id: 'share-collaborate',
    title: 'Share & Collaborate',
    body: 'Work with internal and external clients, teams, and family members in one private cloud without worrying about your data.',
    detail:
      'A single file can be edited in place by multiple parties, then optionally published to the decentralized data network for stronger security and wider availability.',
    actionLabel:
      'Collaborate in place, then publish selected work when needed.',
    successLabel: 'Shared and active',
    scene: 'share',
    Icon: WorkspacesRoundedIcon,
    steps: [
      'Share with internal or external people',
      'Edit one file in place with multiple parties',
      'Keep work organized with permissions',
      'Optionally publish finalized work to the decentralized network',
    ],
    replacements: [
      {
        label: 'Document and knowledge stacks',
        providers: [
          { name: 'Google Docs', icon: googleDocsIcon },
          { name: 'Notion', icon: notionIcon },
          { name: 'Confluence', icon: confluenceIcon },
        ],
      },
      {
        label: 'Project and workflow stacks',
        providers: [
          { name: 'Trello', icon: trelloIcon },
          { name: 'Asana', icon: asanaIcon },
          { name: 'Jira', icon: jiraIcon },
          { name: 'Airtable', icon: airtableIcon },
        ],
      },
    ],
  },
  {
    id: 'communicate',
    title: 'Communicate Securely & Privately',
    body: 'Built-in messaging, calling, meetings, and collaboration tools in one place.',
    detail:
      'Messages, meetings, and teams stay in one place, with encrypted and private communications by default.',
    actionLabel:
      'Create conversations, schedule meetings, and launch voice, video, and screenshare without another app stack.',
    successLabel: 'Conversation secured',
    scene: 'communicate',
    Icon: ForumRoundedIcon,
    steps: [
      'Create conversations, schedule meetings, and launch voice, video, and screenshare sessions',
      'Keep teams organized and separated with permissions',
      'Encrypted and private communications in one place',
      'Optional private recording for meetings and calls',
    ],
    replacements: [
      {
        label: 'Chat and meeting stacks',
        providers: [
          { name: 'Google Chat', icon: googleChatIcon },
          { name: 'Google Meet', icon: googleMeetIcon },
          { name: 'Zoom', icon: zoomIcon },
        ],
      },
      {
        label: 'Extra communication silos',
        providers: [
          { name: 'Telegram', icon: telegramIcon },
          { name: 'WhatsApp', icon: whatsappIcon },
          { name: 'Discord', icon: discordIcon },
        ],
      },
    ],
  },
  {
    id: 'publish-resilience',
    title: 'Publish to Decentralized Data Network',
    body: 'Optional fully off-internet publishing, powered by Qortal, lets selected files stay accessible anywhere with a single private key instead of depending on a server.',
    detail:
      'That same private key can authenticate you to NuQloud and the Qortal Network, while your files are published as encrypted, chunked data with a single click from the NuQloud files interface.',
    actionLabel:
      'Choose what to publish for extreme security and access without any server at all.',
    successLabel: 'Published off-network',
    scene: 'publish',
    Icon: PublicRoundedIcon,
    badgeImageLight: poweredByQortalLight,
    badgeImageDark: poweredByQortalDark,
    badgeAlt: 'Powered by Qortal',
    steps: [
      'Upload files to NuQloud',
      'Choose what to publish for extreme security and accessibility',
      'Publish with one click',
      'Access files without any server at all',
    ],
    replacements: [
      {
        label: 'Server-dependent shared links',
        providers: [
          { name: 'Dropbox', icon: dropboxIcon },
          { name: 'Google Drive', icon: googleDriveIcon },
          { name: 'Box', icon: boxIcon },
          { name: 'iCloud', icon: icloudIcon },
        ],
      },
      {
        label: 'Centralized document portals',
        providers: [
          { name: 'Google Docs', icon: googleDocsIcon },
          { name: 'Notion', icon: notionIcon },
          { name: 'Confluence', icon: confluenceIcon },
        ],
      },
    ],
  },
] as const satisfies readonly FeatureStory[];

const differenceCards = [
  {
    title: 'Privacy by Default',
    body: 'Your cloud should work for you, not turn your data into someone else’s business model.',
    Icon: VerifiedUserRoundedIcon,
  },
  {
    title: 'Independent Infrastructure',
    body: 'NuQloud is designed to reduce reliance on centralized platforms and single points of failure.',
    Icon: LanRoundedIcon,
  },
  {
    title: 'More Than Storage',
    body: 'Storage, collaboration, communication, and optional publishing live in one managed system.',
    Icon: HubRoundedIcon,
  },
  {
    title: 'Built for Ownership',
    body: 'From a personal account to a branded deployment, you keep more control over your environment.',
    Icon: ApartmentRoundedIcon,
  },
];

const serviceModels = [
  {
    id: 'managed-cloud-accounts',
    tone: 'accounts',
    title: 'NuQloud Accounts',
    subtitle:
      'For single users, families, and teams that want fast access to a managed private cloud.',
    bestFor:
      'Start on an existing NuQloud instance and expand when you need more space, users, or branded deployment.',
    bullets: [
      'Fast onboarding to an existing NuQloud instance.',
      'All NuQloud features provided for all accounts.',
      'Clear upgrade options directly in the NuQloud Dashboard.',
    ],
  },
  {
    id: 'dedicated-branded-cloud',
    tone: 'dedicated',
    title: 'Dedicated Branded NuQloud Instances',
    subtitle:
      'For organizations that would like their own private instance, or multiple linked instances, branded for their team or community.',
    bestFor:
      'A private NuQloud environment with your own domain, identity, branding, and managed environment.',
    bullets: [
      'Dedicated branded private environment for your organization.',
      'Optional multiple linked instances for teams or communities.',
      'Managed operations, backups, and growth planning included in the service path.',
    ],
  },
];

const interfaceShowcaseSlides = [
  {
    id: 'dashboard',
    eyebrow: 'Account Hub',
    title: 'NuQloud Dashboard',
    body: 'Access decentralized network tools, launch NuQloud apps, and purchase NuQloud services directly from one dashboard.',
    highlights: [
      'Apps and services in one place',
      'Publish credits on the dashboard',
      'Backup and settings tools',
      'Private account hub',
    ],
    image: dashboardOverviewImage,
    imageAlt: 'NuQloud dashboard showing apps, publish credits, and purchases.',
    Icon: HubRoundedIcon,
  },
  {
    id: 'register-name',
    eyebrow: 'Publishing Identity',
    title: 'Register Your Network Name',
    body: 'A distributed name unlocks decentralized publishing and gives you a portable identity across NuQloud and the broader network.',
    highlights: [
      '150 publish credits to register',
      'Admins can provide initial credits',
      'One identity for publishing',
      'Confirmation shown in the dashboard',
    ],
    image: filesPublishApprovalImage,
    imageAlt:
      'NuQloud register name dialog with decentralized identity registration details.',
    Icon: VerifiedUserRoundedIcon,
  },
  {
    id: 'transactions',
    eyebrow: 'Activity History',
    title: 'See Network Transactions Clearly',
    body: 'Publishing and other decentralized network activity stays visible in one transaction history so status is easy to verify.',
    highlights: [
      'Publishing activity',
      'Incoming and outgoing records',
      'Account actions in one view',
      'Clear confirmation history',
    ],
    image: networkTransactionsImage,
    imageAlt:
      'NuQloud transactions section showing publishing and account activity.',
    Icon: LanRoundedIcon,
  },
  {
    id: 'publish-status',
    eyebrow: 'Files Status',
    title: 'Publish Files and Track Status',
    body: 'Publish files to the decentralized network and see decentralized availability directly from the NuQloud files experience.',
    highlights: [
      'Publish from the files workflow',
      'Decentralized status visibility',
      'Access with or without NuQloud',
      'No server-only dependency',
    ],
    image: filesPublishStatusImage,
    imageAlt: 'NuQloud files list showing decentralized publish status icons.',
    Icon: PublicRoundedIcon,
  },
  {
    id: 'qmail',
    eyebrow: 'Decentralized Mail',
    title: 'Q-Mail Inside NuQloud',
    body: 'Open fully off-internet encrypted mail directly from within NuQloud instead of switching to a separate platform.',
    highlights: [
      'Encrypted mail access',
      'Runs on decentralized infrastructure',
      'Direct access inside NuQloud',
      'Private messaging continuity',
    ],
    image: qmailAccessImage,
    imageAlt: 'Q-Mail opened inside the NuQloud interface.',
    Icon: ForumRoundedIcon,
  },
  {
    id: 'qdeck',
    eyebrow: 'More Decentralized Apps',
    title: 'Access More Decentralized Applications',
    body: 'NuQloud opens the door to other decentralized applications and data that remain reachable with or without the cloud.',
    highlights: [
      'Project workspaces',
      'Decentralized app access',
      'Off-network data availability',
      'One gateway into more tools',
    ],
    image: qdeckAccessImage,
    imageAlt: 'Q-Deck decentralized application opened from within NuQloud.',
    Icon: HubRoundedIcon,
  },
  {
    id: 'document-sharing',
    eyebrow: 'Documents and Sharing',
    title: 'Collaborative Documents + Sharing',
    body: 'Edit documents in place, share internally or externally, and create public links without duplicating the same file across apps.',
    highlights: [
      'In-place editing',
      'Internal and external shares',
      'Public link support',
      'One file, not copies',
    ],
    image: collaborativeDocSharingImage,
    imageAlt:
      'Collaborative document editing with the NuQloud sharing sidebar open.',
    Icon: DescriptionRoundedIcon,
  },
  {
    id: 'conversation-create',
    eyebrow: 'Meetings and Conversations',
    title: 'Create Group Conversations Fast',
    body: 'Start a private group conversation or meeting in seconds, with options for guests and controlled visibility.',
    highlights: [
      'Private group setup',
      'Guest link options',
      'Permissions controls',
      'Fast meeting creation',
    ],
    image: createGroupConversationImage,
    imageAlt: 'NuQloud Talk interface creating a new group conversation.',
    Icon: GroupsRoundedIcon,
  },
  {
    id: 'conversation-file-share',
    eyebrow: 'Shared Context',
    title: 'Share Files in Active Conversations',
    body: 'Share files directly inside conversations so the same document stays attached to the discussion, participants, and meeting context.',
    highlights: [
      'File sharing in chat',
      'Shared items sidebar',
      'Meeting and file context together',
      'No app switching',
    ],
    image: sharedFileInConversationImage,
    imageAlt:
      'A NuQloud conversation with a shared document attached in the active discussion.',
    Icon: ShareRoundedIcon,
  },
  {
    id: 'live-collaboration',
    eyebrow: 'Live Collaboration',
    title: 'Edit Together Without Duplication',
    body: 'Collaborative editing can happen right inside an active conversation, so everyone works on the same file instead of passing copies around.',
    highlights: [
      'Edit from the conversation view',
      'Meeting-friendly collaboration',
      'Same file for all participants',
      'Private cloud workflow',
    ],
    image: liveDocumentCollaborationImage,
    imageAlt:
      'Collaborative document editing while a NuQloud conversation remains visible beside it.',
    Icon: WorkspacesRoundedIcon,
  },
];

const planGroups = [
  {
    id: 'managed',
    tone: 'accounts',
    modelId: 'managed-cloud-accounts',
    title: 'NuQloud Account Plans',
    intro:
      'All NuQloud account packages include the same core features. Plans control your on-server storage, decentralized encrypted publishing space, and the initial publishing credits included with the account.',
    plans: [
      {
        slug: 'nuqloud-starter',
        name: 'NuQloud Starter',
        description:
          'The base NuQloud package for individuals getting started.',
        price: '$12',
        cadence: '/month',
        summary: '10GB on-server + 10GB decentralized encrypted publish space.',
        publishingCredits: '500 initial publishing credits included.',
        note: 'Team versions available',
        teamSlug: 'nuqloud-team-starter',
        teamLabel: 'team - up to 5 users',
      },
      {
        slug: 'nuqloud-advanced',
        name: 'NuQloud Advanced',
        description:
          'More storage and initial publishing credits for heavier day-to-day use.',
        price: '$21',
        cadence: '/month',
        summary: '25GB on-server + 25GB decentralized encrypted publish space.',
        publishingCredits: '2,000 initial publishing credits included.',
        note: 'Team versions available',
        teamSlug: 'nuqloud-team-advanced',
        teamLabel: 'team - up to 5 users',
      },
      {
        slug: 'nuqloud-pro',
        name: 'NuQloud Professional',
        description:
          'Larger personal or small-team capacity with stronger publishing headroom.',
        price: '$36',
        cadence: '/month',
        summary:
          '100GB on-server + 100GB decentralized encrypted publish space.',
        publishingCredits: '5,000 initial publishing credits included.',
        note: 'Team versions available',
        teamSlug: 'nuqloud-team-pro',
        teamLabel: 'team - up to 5 users',
      },
    ],
  },
  {
    id: 'dedicated',
    tone: 'dedicated',
    modelId: 'dedicated-branded-cloud',
    title: 'Branded Private NuQloud Servers',
    intro:
      'NuQloud Branded gives you your own fully private instance, control over your own users, and your own branding.',
    plans: [
      {
        slug: 'nuqloud-branded-starter',
        name: 'NuQloud Branded Starter',
        description:
          'Entry branded private cloud option for smaller organizations.',
        price: '$175',
        cadence: '/month',
        setupFee: '$500 one-time setup',
        summary: '150GB storage + 150GB decentralized publishing space.',
        publishingCredits: '10,000 initial publishing credits included.',
        bullets: [
          'Expansion options available',
          'Guaranteed functionality for 10+ very active users, or many more less active',
        ],
      },
      {
        slug: 'nuqloud-branded-pro',
        name: 'NuQloud Branded Pro',
        description:
          'Expanded branded deployment for more active organizations and teams.',
        price: '$350',
        cadence: '/month',
        setupFee: '$1,000 one-time setup',
        summary:
          '500GB on-instance storage + 500GB decentralized publishing space.',
        publishingCredits: '25,000 initial publishing credits included.',
        bullets: [
          'Expansion options available',
          'Guaranteed functionality for 25+ very active accounts, or more less-active',
          'Access to early beta options',
        ],
      },
      {
        slug: 'nuqloud-branded-enterprise',
        name: 'NuQloud Branded Enterprise',
        description:
          'Customized larger instances, or multi-instance enterprise options starting at $1,500/month with a $3,500 one-time setup fee for base enterprise configurations.',
        price: '$1,500',
        cadence: '/month',
        setupFee: '$3,500 one-time setup',
        summary:
          '1TB per instance + 1TB per instance decentralized publishing space.',
        publishingCredits: '100,000 initial publishing credits per instance.',
        bullets: [
          'Multiple expansion options',
          '100+ active users and optional multi-instance',
          'Access to early beta options',
        ],
      },
    ],
  },
];

const initialFeatureStoryProgress = Object.fromEntries(
  featureStories.map((story) => [story.id, 0])
) as Record<(typeof featureStories)[number]['id'], number>;

function clampProgress(value: number) {
  return Math.max(0, Math.min(value, 1));
}

function rangeProgress(progress: number, start: number, end: number) {
  if (end <= start) {
    return progress >= end ? 1 : 0;
  }

  return clampProgress((progress - start) / (end - start));
}

function getStoryStickyTop(viewportWidth: number, viewportHeight: number) {
  if (viewportWidth <= 720) {
    return 92;
  }

  if (viewportWidth <= 1040) {
    return Math.min(Math.max(88, viewportHeight * 0.09), 112);
  }

  return Math.min(Math.max(78, viewportHeight * 0.085), 118);
}

const featureSceneIconSequence: Record<FeatureSceneId, IconComponent[]> = {
  sync: [InsertDriveFileRoundedIcon, FolderRoundedIcon, SyncRoundedIcon],
  share: [DescriptionRoundedIcon, ShareRoundedIcon, GroupsRoundedIcon],
  communicate: [ForumRoundedIcon, CallRoundedIcon, GroupsRoundedIcon],
  publish: [DescriptionRoundedIcon, HubRoundedIcon, PublicRoundedIcon],
};

function renderFeatureScene(
  scene: FeatureSceneId,
  progress: number,
  successLabel: string
) {
  const sceneStyles = {
    ['--sc-story-progress' as string]: progress.toFixed(3),
  } as CSSProperties;
  const showSuccess = progress > 0.72;
  const iconSequence = featureSceneIconSequence[scene];
  const stageProgress = Math.min(progress / 0.72, 0.999);
  const activeIndex = Math.min(
    iconSequence.length - 1,
    Math.floor(stageProgress * iconSequence.length)
  );

  return (
    <Box
      className={`sc-story-scene sc-story-scene--${scene} ${showSuccess ? 'is-success' : ''}`}
      style={sceneStyles}
    >
      <Box className="sc-story-scene-core">
        <Box className="sc-story-icon-shell">
          <Box className="sc-story-icon-swap">
            {iconSequence.map((Icon, index) => (
              <Box
                className={`sc-story-icon-swap-item ${!showSuccess && index === activeIndex ? 'is-active' : ''} ${!showSuccess && index < activeIndex ? 'is-past' : ''}`}
                key={`${scene}-${index}`}
              >
                <Icon fontSize="inherit" />
              </Box>
            ))}
          </Box>
          <Box className="sc-story-progress-pips">
            {iconSequence.map((_, index) => (
              <Box
                className={`sc-story-progress-pip ${showSuccess || index <= activeIndex ? 'is-active' : ''}`}
                key={`${scene}-pip-${index}`}
              />
            ))}
          </Box>
        </Box>
        <Box className={`sc-story-status ${showSuccess ? 'is-visible' : ''}`}>
          <Box className="sc-story-status-check">
            <CheckCircleRoundedIcon fontSize="inherit" />
          </Box>
          <Typography className="sc-story-status-label">
            {successLabel}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeSection, setActiveSection] = useState<string>(
    pageSections[0].id
  );
  const [isCondensedNav, setIsCondensedNav] = useState(
    () => window.innerWidth <= NAV_COMPACT_BREAKPOINT
  );
  const [isCompactMobile, setIsCompactMobile] = useState(
    () => window.innerWidth <= MOBILE_COMPACT_BREAKPOINT
  );
  const [featureStoryProgress, setFeatureStoryProgress] = useState(
    initialFeatureStoryProgress
  );
  const [activeShowcaseSlideId, setActiveShowcaseSlideId] = useState(
    interfaceShowcaseSlides[0].id
  );
  const [isShowcaseLightboxOpen, setIsShowcaseLightboxOpen] = useState(false);
  const [qortalPurchasePlanName, setQortalPurchasePlanName] = useState('');
  const [affiliateCode, setAffiliateCode] = useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return normalizeAffiliateCode(
      window.localStorage.getItem(AFFILIATE_CODE_STORAGE_KEY) || ''
    );
  });
  const [isAffiliateInputOpen, setIsAffiliateInputOpen] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return Boolean(
      normalizeAffiliateCode(
        window.localStorage.getItem(AFFILIATE_CODE_STORAGE_KEY) || ''
      )
    );
  });
  const {
    accessContext,
    contextActionFeedback,
    openOrCopyInternetLink,
    openQortalLink,
  } = useAccessContext();
  const isDark = theme === EnumTheme.DARK;
  const isQortalEnvironment = accessContext.mode !== 'internet';
  const hasAffiliateCode = Boolean(affiliateCode);
  const isLiteSpaceMode = isCompactMobile || prefersReducedMotion;
  const topNavSections = useMemo(() => {
    const allowedIds = isCompactMobile
      ? mobileTopNavSectionIds
      : desktopTopNavSectionIds;
    return pageSections.filter(
      (section) => section.topNav && allowedIds.has(section.id)
    );
  }, [isCompactMobile]);
  const activeShowcaseSlide =
    interfaceShowcaseSlides.find(
      (slide) => slide.id === activeShowcaseSlideId
    ) ?? interfaceShowcaseSlides[0];
  const activeShowcaseSlideIndex = Math.max(
    0,
    interfaceShowcaseSlides.findIndex(
      (slide) => slide.id === activeShowcaseSlide.id
    )
  );

  const pageMotionStyles = useMemo(
    () =>
      ({
        ['--sc-parallax-y' as string]: `${Math.round(scrollY * (isCompactMobile ? 0.02 : 0.08))}px`,
        ['--sc-parallax-soft' as string]: `${Math.round(scrollY * (isCompactMobile ? 0.01 : 0.04))}px`,
        ['--sc-spin-a' as string]: `${Math.round((scrollY * (isCompactMobile ? 0.012 : 0.05)) % 360)}deg`,
        ['--sc-spin-b' as string]: `${Math.round((scrollY * (isCompactMobile ? -0.008 : -0.03)) % 360)}deg`,
        ['--sc-spin-c' as string]: `${Math.round((scrollY * (isCompactMobile ? 0.016 : 0.07)) % 360)}deg`,
        ['--sc-depth' as string]: `${(1 + Math.sin(scrollY / 260) * (isCompactMobile ? 0.012 : 0.04)).toFixed(3)}`,
        ['--sc-scroll-progress' as string]: scrollProgress.toFixed(3),
        ['--sc-singularity-scale' as string]: `${(1 + scrollProgress * (isCompactMobile ? 0.58 : 1.45)).toFixed(3)}`,
        ['--sc-singularity-drift' as string]: `${Math.round(scrollY * (isCompactMobile ? 0.008 : 0.02))}px`,
        ['--sc-singularity-visibility' as string]: `${Math.max(
          0,
          Math.min(
            (scrollProgress - (isCompactMobile ? 0.12 : 0.05)) /
              (isCompactMobile ? 0.78 : 0.68),
            1
          )
        ).toFixed(3)}`,
      }) as CSSProperties,
    [isCompactMobile, scrollProgress, scrollY]
  );

  const getRevealMotion = useCallback(
    (delay = 0, y = 56, x = 0, amount = 0.2) => {
      if (prefersReducedMotion) {
        return {};
      }

      return {
        initial: { opacity: 0, x, y, scale: 0.985 },
        whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
        viewport: { once: true, amount },
        transition: {
          duration: 0.95,
          delay,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      };
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>('.sc-reveal')
    );
    if (!items.length) {
      return;
    }

    items.forEach((item, index) => {
      item.style.setProperty('--sc-delay', `${Math.min(index * 56, 420)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: isCompactMobile ? 0.06 : 0.16,
        rootMargin: isCompactMobile ? '0px 0px 14% 0px' : '0px 0px -8% 0px',
      }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [isCompactMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsCondensedNav(window.innerWidth <= NAV_COMPACT_BREAKPOINT);
      setIsCompactMobile(window.innerWidth <= MOBILE_COMPACT_BREAKPOINT);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (affiliateCode) {
      window.localStorage.setItem(AFFILIATE_CODE_STORAGE_KEY, affiliateCode);
      return;
    }

    window.localStorage.removeItem(AFFILIATE_CODE_STORAGE_KEY);
  }, [affiliateCode]);

  useEffect(() => {
    const handleScroll = () => {
      const nextY = window.scrollY || window.pageYOffset || 0;
      setScrollY(nextY);

      const maxScrollable = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      setScrollProgress(Math.min(nextY / maxScrollable, 1));

      const orderedAnchors = getOrderedSectionAnchors(nextY);
      let nextActive: string = orderedAnchors[0]?.id ?? pageSections[0].id;

      const activationLine =
        nextY +
        getTopbarOffset() +
        (isCompactMobile ? window.innerHeight * 0.2 : window.innerHeight * 0.26);

      const containingAnchor = orderedAnchors.find(
        (anchor) => activationLine >= anchor.top && activationLine <= anchor.bottom
      );

      if (containingAnchor) {
        nextActive = containingAnchor.id;
      } else if (orderedAnchors.length) {
        nextActive = orderedAnchors.reduce((closest, anchor) => {
          const anchorDistance = Math.abs(anchor.center - activationLine);
          const closestDistance = Math.abs(closest.center - activationLine);
          return anchorDistance < closestDistance ? anchor : closest;
        }).id;
      }

      if (
        nextY + window.innerHeight >=
        document.documentElement.scrollHeight - 6
      ) {
        nextActive =
          orderedAnchors[orderedAnchors.length - 1]?.id ?? nextActive;
      }

      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));

      const nextFeatureProgress = { ...initialFeatureStoryProgress };
      const isMobileViewport = window.innerWidth <= 720;
      const stickyTop = getStoryStickyTop(
        window.innerWidth,
        window.innerHeight
      );
      const completionTravelFactor = isMobileViewport ? 0.96 : 0.9;
      const progressLead = isMobileViewport
        ? window.innerHeight * 0.02
        : window.innerHeight * -0.12;

      for (const story of featureStories) {
        const stageEl = document.getElementById(`feature-story-${story.id}`);
        if (!stageEl) {
          continue;
        }

        const rect = stageEl.getBoundingClientRect();
        const panelEl = stageEl.querySelector<HTMLElement>('.sc-story-panel');
        const panelHeight = panelEl?.offsetHeight ?? 0;
        const stageHeight = stageEl.offsetHeight;
        const pinnedTravel = Math.max(stageHeight - panelHeight, 1);
        const progress = isMobileViewport
          ? clampProgress(
              (window.innerHeight * 0.72 - rect.top + progressLead) /
                Math.max(rect.height + window.innerHeight * 0.18, 1)
            )
          : clampProgress(
              (window.innerHeight + progressLead - rect.top) /
                (window.innerHeight -
                  (stickyTop - pinnedTravel * completionTravelFactor))
            );
        nextFeatureProgress[story.id] = progress;
      }
      setFeatureStoryProgress(nextFeatureProgress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    const absoluteTop = el.getBoundingClientRect().top + window.scrollY;
    const targetTop = Math.max(absoluteTop - getTopbarOffset(), 0);
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  }, []);

  const getPlanCheckoutUrl = useCallback(
    (planSlug?: string) => {
      const normalizedSlug = String(planSlug || '').trim();
      const checkoutUrl = normalizedSlug
        ? PLAN_CHECKOUT_URLS[normalizedSlug] || ''
        : '';

      return appendAffiliateCode(checkoutUrl, affiliateCode);
    },
    [affiliateCode]
  );

  const getPlanDetailsUrl = useCallback(
    (planSlug?: string) => {
      const checkoutUrl = getPlanCheckoutUrl(planSlug);
      if (!checkoutUrl) {
        return '';
      }

      return checkoutUrl.replace(/\/checkout\/?(\?.*)?$/, '$1');
    },
    [getPlanCheckoutUrl]
  );

  const handleAffiliateCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAffiliateCode(normalizeAffiliateCode(event.target.value));
    },
    []
  );

  const clearAffiliateCode = useCallback(() => {
    setAffiliateCode('');
    setIsAffiliateInputOpen(false);
  }, []);

  const handlePlanCheckout = useCallback(
    (planSlug?: string, planName?: string) => {
      if (isQortalEnvironment) {
        setQortalPurchasePlanName(String(planName || 'this plan').trim());
        return;
      }
      const url = getPlanCheckoutUrl(planSlug);
      if (!url) {
        return;
      }
      void openOrCopyInternetLink(url);
    },
    [getPlanCheckoutUrl, isQortalEnvironment, openOrCopyInternetLink]
  );

  const handlePlanDetails = useCallback(
    (planSlug?: string, planName?: string) => {
      if (isQortalEnvironment) {
        setQortalPurchasePlanName(String(planName || 'this plan').trim());
        return;
      }
      const detailsUrl = getPlanDetailsUrl(planSlug);
      if (!detailsUrl) {
        return;
      }
      void openOrCopyInternetLink(detailsUrl);
    },
    [getPlanDetailsUrl, isQortalEnvironment, openOrCopyInternetLink]
  );

  const closeQortalPurchaseModal = useCallback(() => {
    setQortalPurchasePlanName('');
  }, []);

  const handleSalesAction = useCallback(() => {
    void openOrCopyInternetLink(CONTACT_TICKET_URL);
  }, [openOrCopyInternetLink]);

  const openShowcaseLightbox = useCallback(() => {
    setIsShowcaseLightboxOpen(true);
  }, []);

  const closeShowcaseLightbox = useCallback(() => {
    setIsShowcaseLightboxOpen(false);
  }, []);

  const showPreviousShowcaseSlide = useCallback(() => {
    setActiveShowcaseSlideId((currentId) => {
      const currentIndex = interfaceShowcaseSlides.findIndex(
        (slide) => slide.id === currentId
      );
      const safeIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex =
        (safeIndex - 1 + interfaceShowcaseSlides.length) %
        interfaceShowcaseSlides.length;
      return interfaceShowcaseSlides[nextIndex].id;
    });
  }, []);

  const showNextShowcaseSlide = useCallback(() => {
    setActiveShowcaseSlideId((currentId) => {
      const currentIndex = interfaceShowcaseSlides.findIndex(
        (slide) => slide.id === currentId
      );
      const safeIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex = (safeIndex + 1) % interfaceShowcaseSlides.length;
      return interfaceShowcaseSlides[nextIndex].id;
    });
  }, []);

  return (
    <Box
      className={`sc-page sc-page--msp ${isDark ? 'sc-theme-dark' : 'sc-theme-light'}`}
      style={pageMotionStyles}
    >
      <BlackHoleScene
        isDark={isDark}
        progress={scrollProgress}
        liteMode={isLiteSpaceMode}
        reducedMotion={prefersReducedMotion}
      />
      <Box
        className="sc-scroll-progress"
        aria-hidden
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <Box className="sc-bg-grid sc-bg-grid--circle" />
      <Box className="sc-bg-vignette" />

      <Box className="sc-progress-rail" aria-hidden>
        {pageSections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`sc-progress-dot ${activeSection === section.id ? 'is-active' : ''}`}
            onClick={() => scrollToId(section.id)}
            title={section.label}
            aria-label={`Jump to ${section.label}`}
          />
        ))}
      </Box>

      <Container maxWidth={false} disableGutters className="sc-shell">
        <Box className="sc-shell-inner">
          <Box
            className={`sc-topbar sc-reveal ${isCondensedNav ? 'is-condensed' : ''} ${isCompactMobile ? 'is-mobile-compact' : ''}`}
          >
            <Stack direction="row" spacing={1.2} alignItems="center">
              <img
                src={BRAND_HEADER_LOGO}
                alt="NuQloud"
                className="sc-top-logo"
              />
              <Typography variant="subtitle1" className="sc-top-title">
                NuQloud
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={0.8}
              alignItems="center"
              className="sc-nav-actions"
            >
              <Stack direction="row" spacing={0.6} className="sc-nav-mini">
                {topNavSections.map((section) => (
                  <Button
                    key={section.id}
                    className={`sc-nav-btn ${activeSection === section.id ? 'is-active' : ''}`}
                    onClick={() => scrollToId(section.id)}
                    size="small"
                  >
                    {isCompactMobile
                      ? section.label
                      : isCondensedNav
                        ? section.shortLabel
                        : section.label}
                  </Button>
                ))}
              </Stack>
              <Button
                component={Link}
                to="/affiliate-program"
                size="small"
                className="sc-nav-link"
              >
                {isCompactMobile ? 'Affiliates' : isCondensedNav ? 'Aff' : 'Affiliates'}
              </Button>
              <Button
                component={Link}
                to="/self-hosting"
                size="small"
                className="sc-nav-link"
              >
                {isCompactMobile ? 'NQSH' : isCondensedNav ? 'Self' : 'Self-Hosting'}
              </Button>
              <Button
                className="sc-btn-primary sc-nav-cta"
                size="small"
                onClick={() => scrollToId('plans')}
              >
                {isCompactMobile
                  ? 'View Plans'
                  : isCondensedNav
                    ? 'Plans'
                    : 'View Plans'}
              </Button>
              <IconButton
                className="sc-theme-toggle"
                onClick={() =>
                  setTheme(isDark ? EnumTheme.LIGHT : EnumTheme.DARK)
                }
                aria-label="Toggle theme"
              >
                {isDark ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
              </IconButton>
            </Stack>
          </Box>

          <motion.section
            className="sc-hero sc-home-hero sc-reveal"
            id="overview"
            {...getRevealMotion(0, 44)}
          >
            <motion.div
              className="sc-hero-copy"
              {...getRevealMotion(0.08, 34, -26)}
            >
              <Typography variant="overline" className="sc-kicker">
                Managed Private Cloud
              </Typography>
              <Typography variant="h1" className="sc-headline">
                Your Private Cloud, Without Big Tech.
              </Typography>
              <Typography variant="body1" className="sc-subline">
                Secure, private options to run your digital world
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.2}
                className="sc-hero-actions"
              >
                <Button
                  className="sc-btn-primary"
                  onClick={() => scrollToId('plans')}
                >
                  View Plans
                </Button>
              </Stack>
              <Typography className="sc-home-support-copy">
                From ENCRYPTED voice/video calls, meetings, and real-time
                collaboration, to DECENTRALIZED DATA and apps, NuQloud is your
                PRIVATE digital world. The features you need today (without
                harvesting your data), and a gateway to a post-quantum
                decentralized tomorrow.
              </Typography>
              <Stack
                direction="row"
                spacing={0.7}
                flexWrap="wrap"
                className="sc-home-chip-row"
              >
                {heroHighlights.map((item) => (
                  <Chip
                    key={item}
                    size="small"
                    label={item}
                    className="sc-chip sc-home-chip"
                  />
                ))}
              </Stack>
              {contextActionFeedback ? (
                <Typography
                  variant="caption"
                  className="sc-runtime-action-note sc-home-feedback"
                >
                  {contextActionFeedback}
                </Typography>
              ) : null}
            </motion.div>
            <motion.div
              className="sc-hero-art"
              {...getRevealMotion(0.18, 34, 26)}
            >
              <Box className="sc-home-hero-stack">
                <img
                  src={BRAND_HERO_LOGO}
                  alt="NuQloud private cloud platform"
                  className="sc-hero-image"
                />
                <Card className="sc-card sc-home-hero-panel">
                  <CardContent>
                    <Stack spacing={1.1}>
                      {heroQuickWins.map((item) => {
                        const Icon = item.Icon;
                        return (
                          <Box
                            className="sc-home-highlight-row"
                            key={item.title}
                          >
                            <Box className="sc-home-icon-wrap">
                              <Icon fontSize="small" />
                            </Box>
                            <Box>
                              <Typography className="sc-path-title">
                                {item.title}
                              </Typography>
                              <Typography className="sc-mini-tease">
                                {item.body}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </motion.div>
          </motion.section>

          <motion.section
            className="sc-section sc-section--cinematic"
            id="about"
            {...getRevealMotion(0.02, 64)}
          >
            <Typography variant="h2" className="sc-section-title sc-reveal">
              What Is NuQloud
            </Typography>
            <Typography
              variant="body1"
              className="sc-section-subtitle sc-reveal"
            >
              Your future-proof private upgrade for the services you use today,
              and access to the services you'll need tomorrow. The cloud
              re-thought for user privacy, and easy access to a next-generation
              decentralized data network
            </Typography>
            <Box className="sc-two-col sc-home-intro-grid">
              <Card className="sc-card sc-reveal">
                <CardContent>
                  <Typography className="sc-card-label">
                    More on NuQloud
                  </Typography>
                  <Typography className="sc-feature-copy">
                    For most users NuQloud will be a private cloud service that
                    doesn't harvest your metadata to use against you. A unified
                    platform that replaces a huge number of services with a
                    single platform. But NuQloud offers much more than that, it
                    is simultaneously a gateway to the future of content
                    distribution that does not suffer from the same security
                    issues of the internet. NuQloud helps you transition to a
                    decentralized future, while ensuring you keep the
                    functionality you need today.
                  </Typography>
                </CardContent>
              </Card>
              <Card className="sc-card sc-reveal">
                <CardContent>
                  <Typography className="sc-card-label">
                    Included in Every NuQloud
                  </Typography>
                  <Box
                    component="ul"
                    className="sc-detail-list sc-home-checklist"
                  >
                    <Box component="li" className="sc-detail-item">
                      Private file sync/storage across multiple devices (mobile
                      and desktop)
                    </Box>
                    <Box component="li" className="sc-detail-item">
                      Private collaboration for teams, communities,
                      organizations and families
                    </Box>
                    <Box component="li" className="sc-detail-item">
                      Encrypted and private voice, video, screensharing and
                      meetings with easy scheduling and E-Mail notifications.
                    </Box>
                    <Box component="li" className="sc-detail-item">
                      Off-internet decentralized data backups and decentralized
                      applications access.
                    </Box>
                    <Box component="li" className="sc-detail-item">
                      A feature set no other cloud can provide.
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </motion.section>

          <motion.section
            className="sc-section sc-section--cinematic"
            id="features"
            {...getRevealMotion(0.04, 72, 0, 0.01)}
          >
            <Typography variant="h2" className="sc-section-title sc-reveal">
              What NuQloud Does
            </Typography>
            <Typography
              variant="body1"
              className="sc-section-subtitle sc-reveal"
            >
              Replace countless big tech apps with more private options.
            </Typography>
            <Box className="sc-story-stack">
              {featureStories.map((story, index) => {
                const Icon = story.Icon;
                const progress = featureStoryProgress[story.id] ?? 0;
                const sceneProgress = rangeProgress(progress, 0.01, 0.88);
                const replacementExpanded = progress > 0.015;
                const bulletSpan =
                  story.steps.length > 1 ? 0.58 / (story.steps.length - 1) : 0;
                const replacementCardsVisible = progress > 0.08;
                const replacementResolved = progress > 0.74;
                const totalReplacementProviders = story.replacements.reduce(
                  (total, replacement) => total + replacement.providers.length,
                  0
                );
                const providerSpan =
                  totalReplacementProviders > 1
                    ? 0.54 / (totalReplacementProviders - 1)
                    : 0;
                let providerSequence = 0;
                return (
                  <Box
                    className="sc-story-stage"
                    id={`feature-story-${story.id}`}
                    key={story.id}
                  >
                    <Card
                      className={`sc-card sc-story-panel ${replacementExpanded ? 'is-open' : ''}`}
                      style={
                        {
                          ['--sc-story-progress' as string]:
                            sceneProgress.toFixed(3),
                        } as CSSProperties
                      }
                    >
                      <CardContent className="sc-story-panel-content">
                        <Box className="sc-story-grid">
                          {'badgeImageLight' in story &&
                          story.badgeImageLight &&
                          story.badgeImageDark ? (
                            <Box className="sc-story-badge">
                              <img
                                src={
                                  isDark
                                    ? story.badgeImageDark
                                    : story.badgeImageLight
                                }
                                alt={story.badgeAlt}
                                className="sc-story-badge-image"
                              />
                            </Box>
                          ) : null}
                          <Box className="sc-story-copy">
                            <Typography className="sc-card-label">
                              Capability {String(index + 1).padStart(2, '0')}
                            </Typography>
                            <Box className="sc-home-icon-wrap sc-home-icon-wrap--section">
                              <Icon fontSize="small" />
                            </Box>
                            <Typography className="sc-story-title">
                              {story.title}
                            </Typography>
                            <Typography className="sc-feature-copy">
                              {story.body}
                            </Typography>
                            <Typography className="sc-mini-tease">
                              {story.detail}
                            </Typography>
                            <Typography className="sc-story-action">
                              {story.actionLabel}
                            </Typography>
                            <Box className="sc-story-bullets">
                              {story.steps.map((step, stepIndex) => (
                                <Box
                                  className={`sc-story-bullet ${progress > 0.02 + stepIndex * bulletSpan ? 'is-active' : ''}`}
                                  key={step}
                                >
                                  <CheckCircleRoundedIcon fontSize="small" />
                                  {step}
                                </Box>
                              ))}
                            </Box>
                            <Box
                              className={`sc-story-replacements ${replacementExpanded ? 'is-expanded' : ''}`}
                            >
                              <Typography className="sc-story-replace-title">
                                NUCLOUD COVERS
                              </Typography>
                              <Box
                                className={`sc-story-replacements-stage ${replacementCardsVisible ? 'is-visible' : ''} ${replacementResolved ? 'is-resolved' : ''}`}
                              >
                                <Box className="sc-story-replacements-grid">
                                  {story.replacements.map((replacement) => {
                                    return (
                                      <Box
                                        className="sc-story-replacement-card is-visible"
                                        key={replacement.label}
                                        aria-label={replacement.label}
                                        title={replacement.label}
                                      >
                                        <Typography className="sc-story-replacement-label">
                                          {replacement.label}
                                        </Typography>
                                        <Box className="sc-story-provider-strip">
                                          {replacement.providers.map(
                                            (provider) => {
                                              const activationPoint =
                                                0.12 +
                                                providerSequence * providerSpan;
                                              const isProviderRetired =
                                                progress > activationPoint;
                                              const isProviderImpacting =
                                                progress >
                                                  activationPoint - 0.04 &&
                                                progress <
                                                  activationPoint + 0.055;
                                              providerSequence += 1;

                                              return (
                                                <Box
                                                  className={`sc-story-provider-pill ${isProviderRetired ? 'is-retired' : ''} ${isProviderImpacting ? 'is-impacting' : ''}`}
                                                  key={provider.name}
                                                  title={provider.name}
                                                >
                                                  <Box
                                                    className="sc-story-provider-impact"
                                                    aria-hidden
                                                  />
                                                  <img
                                                    src={provider.icon}
                                                    alt={provider.name}
                                                    className="sc-story-provider-icon"
                                                  />
                                                  <Box
                                                    className="sc-story-provider-check"
                                                    aria-hidden
                                                  >
                                                    <CheckCircleRoundedIcon fontSize="inherit" />
                                                  </Box>
                                                </Box>
                                              );
                                            }
                                          )}
                                        </Box>
                                      </Box>
                                    );
                                  })}
                                </Box>
                              </Box>
                              <Box sx={{ mt: 2 }}>
                                <Stack
                                  direction={{ xs: 'column', sm: 'row' }}
                                  spacing={1}
                                  className="sc-story-detail-actions"
                                >
                                  <Button
                                    component={Link}
                                    to={`/feature-details/${story.id}`}
                                    className="sc-btn-ghost"
                                  >
                                    Read More
                                  </Button>
                                  <Button
                                    className="sc-btn-link"
                                    onClick={() => scrollToId('plans')}
                                  >
                                    View Plans
                                  </Button>
                                </Stack>
                              </Box>
                            </Box>
                          </Box>
                          <Box className="sc-story-visual">
                            {renderFeatureScene(
                              story.scene,
                              sceneProgress,
                              story.successLabel
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          </motion.section>

          <motion.section
            className="sc-section sc-section--cinematic"
            id="why"
            {...getRevealMotion(0.05, 68)}
          >
            <Typography variant="h2" className="sc-section-title sc-reveal">
              Why Choose NuQloud
            </Typography>
            <Typography
              variant="body1"
              className="sc-section-subtitle sc-reveal"
            >
              Private, practical, stable, premium, and independent.
            </Typography>
            <Box className="sc-four-grid">
              {differenceCards.map((card) => {
                const Icon = card.Icon;
                return (
                  <Card className="sc-card sc-reveal" key={card.title}>
                    <CardContent>
                      <Box className="sc-capability-head">
                        <Box className="sc-home-icon-wrap sc-home-icon-wrap--section">
                          <Icon fontSize="small" />
                        </Box>
                        <Typography className="sc-home-card-title">
                          {card.title}
                        </Typography>
                      </Box>
                      <Typography className="sc-mini-tease">
                        {card.body}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </motion.section>

          <motion.section
            className="sc-section sc-section--cinematic"
            id="foundation"
            {...getRevealMotion(0.06, 72)}
          >
            <Typography variant="h2" className="sc-section-title sc-reveal">
              NuQloud Interface and Features
            </Typography>
            <Typography
              variant="body1"
              className="sc-section-subtitle sc-reveal"
            >
              Real NuQloud interface screenshots, organized from account setup
              and decentralized publishing through apps, files, conversations,
              and live collaboration.
            </Typography>
            <Box className="sc-showcase-grid">
              <Card className="sc-card sc-showcase-preview sc-reveal">
                <CardContent>
                  <Box className="sc-showcase-preview-nav">
                    <IconButton
                      className="sc-showcase-preview-arrow"
                      onClick={showPreviousShowcaseSlide}
                      aria-label="Show previous screenshot"
                    >
                      <ChevronLeftRoundedIcon />
                    </IconButton>
                    <Typography className="sc-showcase-preview-position">
                      {activeShowcaseSlideIndex + 1} /{' '}
                      {interfaceShowcaseSlides.length}
                    </Typography>
                    <IconButton
                      className="sc-showcase-preview-arrow"
                      onClick={showNextShowcaseSlide}
                      aria-label="Show next screenshot"
                    >
                      <ChevronRightRoundedIcon />
                    </IconButton>
                  </Box>
                  <Box className="sc-showcase-frame">
                    <Box className="sc-showcase-frame-bar">
                      <Box className="sc-showcase-dot" />
                      <Box className="sc-showcase-dot" />
                      <Box className="sc-showcase-dot" />
                    </Box>
                    <Box className="sc-showcase-frame-body">
                      <button
                        type="button"
                        className="sc-showcase-screenshot-shell sc-showcase-screenshot-button"
                        onClick={openShowcaseLightbox}
                        aria-label={`Open enlarged screenshot for ${activeShowcaseSlide.title}`}
                      >
                        <img
                          src={activeShowcaseSlide.image}
                          alt={activeShowcaseSlide.imageAlt}
                          className="sc-showcase-screenshot"
                        />
                        <Box className="sc-showcase-screenshot-hint">
                          Click to enlarge
                        </Box>
                      </button>
                    </Box>
                  </Box>
                  <Box className="sc-showcase-preview-nav sc-showcase-preview-nav--bottom">
                    <IconButton
                      className="sc-showcase-preview-arrow"
                      onClick={showPreviousShowcaseSlide}
                      aria-label="Show previous screenshot"
                    >
                      <ChevronLeftRoundedIcon />
                    </IconButton>
                    <Typography className="sc-showcase-preview-position">
                      {activeShowcaseSlideIndex + 1} /{' '}
                      {interfaceShowcaseSlides.length}
                    </Typography>
                    <IconButton
                      className="sc-showcase-preview-arrow"
                      onClick={showNextShowcaseSlide}
                      aria-label="Show next screenshot"
                    >
                      <ChevronRightRoundedIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
              <Box className="sc-showcase-list sc-reveal">
                {interfaceShowcaseSlides.map((slide) => {
                  const SlideIcon = slide.Icon;
                  const isActive = slide.id === activeShowcaseSlide.id;
                  return (
                    <button
                      type="button"
                      className={`sc-showcase-tab ${isActive ? 'is-active' : ''}`}
                      key={slide.id}
                      onClick={() => setActiveShowcaseSlideId(slide.id)}
                    >
                      <Box className="sc-home-icon-wrap">
                        <SlideIcon fontSize="small" />
                      </Box>
                      <Box className="sc-showcase-tab-copy">
                        <Typography className="sc-card-label">
                          {slide.eyebrow}
                        </Typography>
                        <Typography className="sc-home-card-title">
                          {slide.title}
                        </Typography>
                      </Box>
                    </button>
                  );
                })}
              </Box>
            </Box>
            <Dialog
              open={isShowcaseLightboxOpen}
              onClose={closeShowcaseLightbox}
              maxWidth="xl"
              fullWidth
              className="sc-showcase-lightbox"
            >
              <DialogContent className="sc-showcase-lightbox-content">
                <Box className="sc-showcase-lightbox-head">
                  <Box className="sc-showcase-lightbox-copy">
                    <Typography className="sc-card-label">
                      {activeShowcaseSlide.eyebrow}
                    </Typography>
                    <Typography className="sc-showcase-lightbox-title">
                      {activeShowcaseSlide.title}
                    </Typography>
                    <Typography className="sc-mini-tease sc-showcase-lightbox-summary">
                      {activeShowcaseSlide.body}
                    </Typography>
                  </Box>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    className="sc-showcase-lightbox-head-actions"
                  >
                    <Typography className="sc-showcase-lightbox-position">
                      {activeShowcaseSlideIndex + 1} /{' '}
                      {interfaceShowcaseSlides.length}
                    </Typography>
                    <Button
                      className="sc-btn-ghost"
                      onClick={closeShowcaseLightbox}
                    >
                      Close
                    </Button>
                  </Stack>
                </Box>
                <Box className="sc-showcase-lightbox-stage">
                  <Box className="sc-showcase-lightbox-image-shell">
                    <Button
                      className="sc-showcase-lightbox-nav sc-showcase-lightbox-nav--prev"
                      onClick={showPreviousShowcaseSlide}
                      aria-label="Show previous screenshot"
                    >
                      <ChevronLeftRoundedIcon />
                    </Button>
                    <img
                      src={activeShowcaseSlide.image}
                      alt={activeShowcaseSlide.imageAlt}
                      className="sc-showcase-lightbox-image"
                    />
                    <Button
                      className="sc-showcase-lightbox-nav sc-showcase-lightbox-nav--next"
                      onClick={showNextShowcaseSlide}
                      aria-label="Show next screenshot"
                    >
                      <ChevronRightRoundedIcon />
                    </Button>
                  </Box>
                </Box>
              </DialogContent>
            </Dialog>
          </motion.section>

          <motion.section
            className="sc-section sc-section--cinematic"
            id="plans"
            {...getRevealMotion(0.08, 74, 0, 0.01)}
          >
            <Card className="sc-card sc-plan-overview sc-reveal">
              <CardContent>
                <Typography className="sc-card-label">
                  Included Across All Packages
                </Typography>
                <Typography className="sc-feature-copy">
                  All packages include the same core NuQloud features. What
                  changes between plans is your available on-server storage,
                  decentralized encrypted publishing space, and the initial
                  publishing credits included.
                </Typography>
                <Typography className="sc-mini-tease">
                  Publishing credits are required for publishing to the
                  decentralized encrypted and chunked off-internet data network.
                </Typography>
              </CardContent>
            </Card>
            <Stack spacing={2.1} className="sc-plan-stack">
              {planGroups.map((group) => {
                const model = serviceModels.find(
                  (entry) => entry.id === group.modelId
                );

                return (
                  <Box
                    key={group.id}
                    className={`sc-plan-section sc-plan-section--${group.tone} sc-reveal`}
                    id={
                      group.id === 'dedicated' ? 'dedicated-cloud' : undefined
                    }
                  >
                    {model ? (
                      <Box className="sc-plan-model-card-wrap">
                        <Card
                          className={`sc-card sc-home-model-card sc-home-model-card--${model.tone} sc-plan-model-card`}
                        >
                          <CardContent>
                            <Typography className="sc-path-title sc-home-model-title">
                              {model.title}
                            </Typography>
                            <Typography className="sc-path-copy">
                              {model.subtitle}
                            </Typography>
                            <Typography className="sc-home-model-best-for">
                              {model.bestFor}
                            </Typography>
                            <Box component="ul" className="sc-detail-list">
                              {model.bullets.map((item) => (
                                <Box
                                  component="li"
                                  className="sc-detail-item"
                                  key={item}
                                >
                                  {item}
                                </Box>
                              ))}
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    ) : null}
                    <Box className={`sc-plan-grid sc-plan-grid--${group.tone}`}>
                      {group.plans.map((plan) => (
                        <Card
                          className={`sc-card sc-plan-card sc-plan-card--${group.tone}`}
                          key={plan.slug}
                        >
                          <CardContent>
                            <Typography className="sc-card-label">
                              Plan
                            </Typography>
                            <Box className="sc-plan-card-head">
                              <Box className="sc-plan-card-copy">
                                <Typography className="sc-home-card-title">
                                  {plan.name}
                                </Typography>
                                <Typography className="sc-mini-tease">
                                  {plan.description}
                                </Typography>
                              </Box>
                              {'price' in plan && plan.price ? (
                                <Box className="sc-plan-price-wrap">
                                  <Typography className="sc-plan-price-kicker">
                                    Starting at
                                  </Typography>
                                  <Typography className="sc-plan-price">
                                    {plan.price}
                                    <Box
                                      component="span"
                                      className="sc-plan-cadence"
                                    >
                                      {plan.cadence || ''}
                                    </Box>
                                  </Typography>
                                  {'setupFee' in plan && plan.setupFee ? (
                                    <Typography className="sc-plan-setup">
                                      {plan.setupFee}
                                    </Typography>
                                  ) : null}
                                </Box>
                              ) : null}
                            </Box>
                            {'summary' in plan && plan.summary ? (
                              <Typography className="sc-plan-summary">
                                {plan.summary}
                              </Typography>
                            ) : null}
                            {'publishingCredits' in plan &&
                            plan.publishingCredits ? (
                              <Typography className="sc-plan-credits">
                                {plan.publishingCredits}
                              </Typography>
                            ) : null}
                            <Typography className="sc-plan-addon-note">
                              Data add-on packages available.
                            </Typography>
                            {'bullets' in plan &&
                            Array.isArray(plan.bullets) &&
                            plan.bullets.length ? (
                              <Box
                                component="ul"
                                className="sc-detail-list sc-plan-detail-list"
                              >
                                {plan.bullets.map((item) => (
                                  <Box
                                    component="li"
                                    className="sc-detail-item"
                                    key={item}
                                  >
                                    {item}
                                  </Box>
                                ))}
                              </Box>
                            ) : null}
                            {'note' in plan && plan.note ? (
                              <Typography className="sc-plan-note">
                                {plan.note}
                              </Typography>
                            ) : null}
                            <Box className="sc-plan-actions">
                              <Button
                                className={`sc-btn-primary sc-plan-buy-btn sc-plan-buy-btn--${group.tone}`}
                                onClick={() =>
                                  handlePlanCheckout(plan.slug, plan.name)
                                }
                              >
                                Buy Now
                              </Button>
                              <Button
                                className="sc-btn-link sc-affiliate-toggle"
                                onClick={() => setIsAffiliateInputOpen(true)}
                              >
                                {hasAffiliateCode
                                  ? 'Update affiliate code'
                                  : 'Have an affiliate code?'}
                              </Button>
                              {isAffiliateInputOpen || hasAffiliateCode ? (
                                <Box className="sc-affiliate-inline-panel">
                                  <TextField
                                    className="sc-affiliate-field"
                                    label="Affiliate code"
                                    placeholder="Enter affiliate code"
                                    size="small"
                                    fullWidth
                                    value={affiliateCode}
                                    onChange={handleAffiliateCodeChange}
                                    helperText="Letters, numbers, dashes, underscores, and periods only."
                                    inputProps={{
                                      autoCapitalize: 'none',
                                      autoCorrect: 'off',
                                      maxLength: AFFILIATE_CODE_MAX_LENGTH,
                                      pattern: '[A-Za-z0-9._-]*',
                                      spellCheck: 'false',
                                    }}
                                  />
                                  <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={1}
                                    alignItems={{
                                      xs: 'flex-start',
                                      sm: 'center',
                                    }}
                                    className="sc-affiliate-inline-actions"
                                  >
                                    <Typography className="sc-mini-tease">
                                      Checkout links to{' '}
                                      <Box
                                        component="span"
                                        className="sc-affiliate-inline-url"
                                      >
                                        payment.crowetic.com
                                      </Box>{' '}
                                      will automatically include your referral
                                      code.
                                    </Typography>
                                    {hasAffiliateCode ? (
                                      <Chip
                                        className="sc-chip sc-affiliate-active-chip"
                                        label={`Using code: ${affiliateCode}`}
                                      />
                                    ) : null}
                                    {hasAffiliateCode ? (
                                      <Button
                                        className="sc-btn-link sc-affiliate-clear"
                                        onClick={clearAffiliateCode}
                                      >
                                        Clear code
                                      </Button>
                                    ) : null}
                                  </Stack>
                                </Box>
                              ) : null}
                              <Button
                                className="sc-btn-link sc-plan-detail-link"
                                onClick={() =>
                                  handlePlanDetails(plan.slug, plan.name)
                                }
                              >
                                View Details
                              </Button>
                              {'teamSlug' in plan && plan.teamSlug ? (
                                <Button
                                  className="sc-btn-link sc-plan-team-link"
                                  onClick={() =>
                                    handlePlanDetails(
                                      plan.teamSlug,
                                      plan.teamLabel || `${plan.name} Team`
                                    )
                                  }
                                >
                                  {plan.teamLabel || 'View Team Version'}
                                </Button>
                              ) : null}
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </motion.section>

          <motion.section
            className="sc-cta sc-reveal"
            id="contact"
            {...getRevealMotion(0.04, 58)}
          >
            <Typography variant="h3" className="sc-cta-title">
              Have Questions? Need something specific? Reach out.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.2}
              justifyContent="center"
            >
              <Button className="sc-btn-primary" onClick={handleSalesAction}>
                Contact
              </Button>
            </Stack>
          </motion.section>
          <Box className="sc-footer-support">
            <Typography className="sc-footer-support-copy">
              ...or{' '}
              <Box
                component="a"
                className="sc-footer-support-link"
                href={AI_SUPPORT_EMAIL_URL}
              >
                AI-powered Support
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
      <Dialog
        open={Boolean(qortalPurchasePlanName)}
        onClose={closeQortalPurchaseModal}
        className="sc-qortal-purchase-dialog"
      >
        <DialogContent className="sc-qortal-purchase-dialog-content">
          <Typography className="sc-showcase-lightbox-title">
            Qortal-native purchasing options coming soon
          </Typography>
          <Typography className="sc-qortal-purchase-dialog-copy">
            Direct Qortal-native purchasing for{' '}
            <strong>{qortalPurchasePlanName || 'this plan'}</strong> is coming
            soon. For now, contact crowetic in Q-Mail for more information, or
            follow CHDC on QDN for updates.
          </Typography>
          <Box className="sc-qortal-purchase-dialog-links">
            <Button
              className="sc-btn-primary"
              onClick={() => void openQortalLink(QORTAL_QMAIL_CONTACT_URL)}
            >
              Contact via Q-Mail
            </Button>
            <Button
              className="sc-btn-link"
              onClick={() => void openQortalLink(QORTAL_CHDC_URL)}
            >
              Open CHDC
            </Button>
          </Box>
          <Box className="sc-qortal-purchase-dialog-meta">
            <Typography className="sc-qortal-purchase-dialog-hint">
              Q-Mail:{' '}
              <Box
                component="a"
                className="sc-qortal-purchase-dialog-anchor"
                href={QORTAL_QMAIL_CONTACT_URL}
              >
                {QORTAL_QMAIL_CONTACT_URL}
              </Box>
            </Typography>
            <Typography className="sc-qortal-purchase-dialog-hint">
              Updates:{' '}
              <Box
                component="a"
                className="sc-qortal-purchase-dialog-anchor"
                href={QORTAL_CHDC_URL}
              >
                {QORTAL_CHDC_URL}
              </Box>
            </Typography>
          </Box>
          <Box className="sc-qortal-purchase-dialog-actions">
            <Button className="sc-btn-link" onClick={closeQortalPurchaseModal}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default App;
