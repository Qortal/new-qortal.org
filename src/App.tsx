import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import SettingsEthernetRoundedIcon from '@mui/icons-material/SettingsEthernetRounded';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import authIdentityIcon from './assets/provider-icons/auth-identity.svg';
import billingPaymentsIcon from './assets/provider-icons/billing-payments.svg';
import docsProjectIcon from './assets/provider-icons/docs-project.svg';
import dropboxStorageIcon from './assets/provider-icons/dropbox-storage.svg';
import googleWorkspaceIcon from './assets/provider-icons/google-workspace.svg';
import slackTeamsZoomIcon from './assets/provider-icons/slack-teams-zoom.svg';
import { BRAND_HEADER_LOGO, BRAND_HERO_LOGO } from './brandAssets';
import { useAccessContext } from './hooks/useAccessContext';
import { EnumTheme, themeAtom } from './state/global/system';
import './App.css';

const PAYMENT_URL = 'https://nuqloud.com/get-started';
const MSP_CONTACT_URL = 'https://nuqloud.com';
const FEATURE_DOCS_URL = 'https://nuqloud.com/features';
const QORT_PAYMENT_QORTAL_LINK_BASE = 'qortal://WEBSITE/nuqloud/qort-payments';

const sectionNav = [
  { id: 'overview', label: 'Overview' },
  { id: 'replaces', label: 'Why Switch' },
  { id: 'capabilities', label: 'Included' },
  { id: 'details', label: 'Details' },
  { id: 'starting-points', label: 'Plans' },
  { id: 'next', label: 'Start' },
];

const MOBILE_COMPACT_BREAKPOINT = 720;

const replacementPairs = [
  {
    from: 'Google Workspace / Microsoft 365',
    to: 'NuQloud all-in-one workspace',
    tease: 'Mail, files, office, calendars, contacts, tasks, identity',
    icon: googleWorkspaceIcon,
  },
  {
    from: 'Slack / Teams / Zoom / Discord',
    to: 'NuQloud communication stack',
    tease: 'Chat, calls, screen sharing, meeting links, sovereign relay',
    icon: slackTeamsZoomIcon,
  },
  {
    from: 'Dropbox / OneDrive / Box / iCloud Drive',
    to: 'NuQloud data + controlled publishing',
    tease: 'Encrypted chunked off-network archives',
    icon: dropboxStorageIcon,
  },
  {
    from: 'Trello / Asana / Jira / Monday',
    to: 'Operational workflow workspace',
    tease: 'Deck boards, task pipelines, activity traceability',
    icon: docsProjectIcon,
  },
  {
    from: 'Notion / Confluence / Airtable',
    to: 'One NuQloud work layer',
    tease: 'Deck, notes, announcements, activity, tables in one experience',
    icon: docsProjectIcon,
  },
  {
    from: 'Google Calendar / Outlook / Calendly',
    to: 'NuQloud scheduling and groupware',
    tease: 'Calendars, contacts, tasks, invites, team schedules',
    icon: googleWorkspaceIcon,
  },
  {
    from: 'Google Docs / Office Online silos',
    to: 'NuQloud office collaboration',
    tease: 'Docs, sheets, presentations, browser previews',
    icon: googleWorkspaceIcon,
  },
  {
    from: 'Okta / Auth0 / Duo + identity lock-in',
    to: 'NuQloud identity + integration',
    tease: 'MFA, audit logging, SSO options, LDAP/SAML/OIDC expansion',
    icon: authIdentityIcon,
  },
  {
    from: 'Datadog / Splunk / backup tooling patchwork',
    to: 'NuQloud managed operations',
    tease: 'Monitoring, updates, backup operations, incident response',
    icon: billingPaymentsIcon,
  },
  {
    from: 'Disconnected billing + provisioning funnels',
    to: 'NuQloud package-aware upgrade lifecycle',
    tease: 'Per-user onboarding to fully branded managed-cloud upgrades',
    icon: billingPaymentsIcon,
  },
];

const unifyHighlights = [
  {
    id: 'all-included',
    title: 'Everything Important Is Included',
    body: 'Collaboration, groupware, communication, office, admin controls, and platform operations are included across package paths.',
  },
  {
    id: 'distributed-apps',
    title: 'Distributed Off-Network Applications',
    body: 'Access decentralized applications with or without the cloud through a sovereign network model.',
  },
  {
    id: 'encrypted-backup',
    title: 'Encrypted Chunked Off-Network Backups',
    body: 'Backups remain retrievable beyond any single server instance and are designed for durable recovery.',
  },
  {
    id: 'redundancy',
    title: 'Redundancy Guarantees',
    body: 'CHD service guarantees can layer resilient replication expectations into production operations.',
  },
  {
    id: 'private-comms',
    title: 'Private Communications Options',
    body: 'Encrypted private communication pathways can grow from managed relay defaults into deeper sovereign modes.',
  },
  {
    id: 'publishing',
    title: 'Distributed Publishing Status + Verification',
    body: 'File publishing includes status visibility and verification checks for operational confidence.',
  },
  {
    id: 'upgrade-paths',
    title: 'In-Cloud Upgrade Paths',
    body: 'Start with simple onboarding and scale users, capacity, and private branding without resetting workflows.',
  },
];

const replacementDetails = [
  {
    id: 'workspace-core',
    app: 'NuQloud Workspace Core',
    replaces: 'Google Workspace / Microsoft 365',
    details: [
      'Private branded cloud accounts for organizations plus per-user entry options on existing cloud.',
      'Mail, file collaboration, office docs, calendars, and providerless identity foundations.',
      'Upgrade paths from demo/trial account models to full private branded deployment.',
    ],
    deepDive: [
      'Providerless authentication mode allows identity continuity as deployment models change.',
      'Distributed off-network application access keeps workflows resilient to single-provider failures.',
      'Operational simplicity remains while sovereignty controls expand underneath.',
      'User lifecycle can begin on shared cloud accounts and transition into branded dedicated deployments.',
      'Identity and access controls are aligned to long-term sovereign ownership rather than vendor lock-in.',
    ],
    url: FEATURE_DOCS_URL,
  },
  {
    id: 'groupware-layer',
    app: 'NuQloud Groupware Layer',
    replaces: 'Google Calendar / Outlook / Calendly + contact silos',
    details: [
      'Shared calendars, tasks, contacts, and scheduling run in one managed workspace.',
      'Invite flows and team scheduling are integrated without switching providers.',
      'Groupware identity remains aligned to your cloud rather than third-party lock-in.',
    ],
    deepDive: [
      'Calendar, task, and contact data remain under one organizational control plane.',
      'Scheduling workflows fit both per-user trial environments and branded private deployments.',
      'Groupware data participates in the same backup and governance lifecycle as files and chat.',
      'Migration from fragmented scheduling stacks is simplified by unified account structure.',
      'Operational users get one workflow language across communication and coordination surfaces.',
    ],
    url: FEATURE_DOCS_URL,
  },
  {
    id: 'comms-layer',
    app: 'NuQloud Communications Layer',
    replaces: 'Slack / Teams / Zoom style stack',
    details: [
      'Conversation relay architecture bridges cloud communication with sovereign message channels.',
      'Moderation-safe mapping and server relay diagnostics are available for managed operation.',
      'Encrypted off-network private communication options are roadmap-aligned and protocol-native.',
    ],
    deepDive: [
      'NuQloud relay mode supports growth from cloud-first collaboration into deeper decentralization.',
      'Users keep familiar communication UX while gaining durable sovereign channel options.',
      'Cross-context delivery supports both gateway users and authenticated QDN users.',
      'Mapped conversations keep operational clarity between managed cloud workflows and sovereign channels.',
      'Private communication options can evolve from managed defaults into stronger decentralized modes.',
    ],
    url: FEATURE_DOCS_URL,
  },
  {
    id: 'office-layer',
    app: 'NuQloud Office Collaboration',
    replaces: 'Google Docs / Office 365 doc silos',
    details: [
      'Real-time document collaboration runs in-browser through a private managed stack.',
      'Word, sheet, and presentation workflows are integrated with storage and communications.',
      'Office previews and edits stay in the same security and governance domain.',
    ],
    deepDive: [
      'Office collaboration no longer depends on separate external suites with different controls.',
      'Document workflows inherit the same backup, sharing, and retention policies as the wider workspace.',
      'Cross-team editing ties directly into chat, tasks, and operational tracking surfaces.',
      'Branded private environments keep organizational context throughout document lifecycle.',
      'Per-user onboarding paths can still use the same doc collaboration model before full private rollout.',
    ],
    url: FEATURE_DOCS_URL,
  },
  {
    id: 'workflow-layer',
    app: 'NuQloud Workflow + Knowledge Layer',
    replaces: 'Trello / Asana / Jira / Notion / Confluence / Airtable',
    details: [
      'Deck boards, notes, announcements, activity, and tables align into one operational model.',
      'Work tracking and collaboration context are attached to the same account and access layer.',
      'Structured and unstructured work data no longer lives in disconnected products.',
    ],
    deepDive: [
      'Teams can track tasks, communicate, and manage structured data without jumping platforms.',
      'Knowledge and workflow artifacts share one governance boundary for retention and control.',
      'Activity trails improve operational observability for audits and handoffs.',
      'Tables and notes enable lightweight operational systems before custom app expansion.',
      'Unified workflow surfaces lower tool sprawl and reduce context switching costs.',
    ],
    url: FEATURE_DOCS_URL,
  },
  {
    id: 'security-ops-layer',
    app: 'NuQloud Security + Operations Layer',
    replaces: 'Identity and ops tool patchworks (Okta/Auth0/Duo/Datadog/Splunk + backup silos)',
    details: [
      'RBAC, MFA, TLS, audit logging, and encrypted storage are managed in one platform.',
      'Monitoring, update lifecycle, backup operations, and incident response are included operationally.',
      'Identity integrations can expand via LDAP, SAML, and OIDC for larger organizations.',
    ],
    deepDive: [
      'Security and operations no longer require separate subscription stacks to remain controlled.',
      'Auditability improves when identity, comms, files, and operations are centrally visible.',
      'Managed operations keep platform hygiene aligned with sovereignty goals.',
      'Backup operations and incident response are part of the same service model, not a bolt-on.',
      'Identity integration paths exist for phased enterprise rollout complexity.',
    ],
    url: FEATURE_DOCS_URL,
  },
  {
    id: 'publish-layer',
    app: 'NuQloud Publish + Backup Layer',
    replaces: 'Dropbox add-ons + ad hoc public links',
    details: [
      'Encrypted and chunked off-network backups for long-term resilient access.',
      'Distributed file publishing with verifiable status and sovereign lifecycle visibility.',
      'Controlled publishing workflows from familiar file UX while reducing platform lock-in.',
    ],
    deepDive: [
      'Backups are designed for off-network retrievability independent of a single cloud host.',
      'CHD redundancy guarantees can be layered by package level for stronger assurance.',
      'Publishing status is surfaced for operational confidence and auditability.',
      'Encrypted chunking reduces exposure while improving resilience across decentralized storage models.',
      'Distributed file publishing status helps teams verify delivery and retention outcomes.',
    ],
    url: FEATURE_DOCS_URL,
  },
  {
    id: 'upgrade-model',
    app: 'NuQloud Upgrade + Packaging Model',
    replaces: 'Vendor lock-in growth funnels',
    details: [
      'Two starting points: per-user existing-cloud access or full branded private cloud launch.',
      'All core platform features are included across package paths.',
      'USD checkout and QORT-oriented checkout paths are both part of service evolution.',
    ],
    deepDive: [
      'Package architecture supports organization-first rollouts and individual-first trial adoption.',
      'In-cloud upgrade paths keep onboarding simple while preserving sovereignty trajectory.',
      'Payment path flexibility aligns with mixed internet + QDN operating environments.',
      'Growth paths can be tuned for multi-user expansion without feature fragmentation.',
      'QORT and USD pathways are designed to support both native and gateway purchasing experiences.',
    ],
    url: PAYMENT_URL,
  },
];

const fullFeatureMatrix = [
  {
    id: 'core-collaboration',
    title: 'Core Collaboration',
    items: [
      'Secure file storage and sync',
      'Versioning and trash recovery',
      'Desktop and mobile sync clients',
      'Public sharing and file drops',
      'External storage mounts',
    ],
  },
  {
    id: 'groupware',
    title: 'Groupware',
    items: [
      'Calendar (CalDAV)',
      'Contacts (CardDAV)',
      'Tasks and shared team calendars',
      'Scheduling and invites',
    ],
  },
  {
    id: 'communications',
    title: 'Communications',
    items: [
      'Team chat (Talk)',
      'Audio/video calls and screen sharing',
      'Meeting links on your domain',
      'Chat file sharing',
    ],
  },
  {
    id: 'office',
    title: 'Office',
    items: [
      'Real-time document editing (Collabora)',
      'Word/sheet/presentation support',
      'In-browser office previews',
    ],
  },
  {
    id: 'collaboration-tools',
    title: 'Collaboration Tools',
    items: [
      'Deck (Kanban boards)',
      'Notes',
      'Announcements',
      'Activity tracking',
      'Structured data tables',
    ],
  },
  {
    id: 'security-admin',
    title: 'Security + Admin',
    items: [
      'Role-based access control',
      'MFA support',
      'Audit logging',
      'Encryption at rest (server-side)',
      'TLS for all services',
      'Backup monitoring',
    ],
  },
  {
    id: 'platform-ops',
    title: 'Platform Management',
    items: [
      'Software updates',
      'Monitoring',
      'Backup operations (PBS)',
      'Incident response',
    ],
  },
];

const expansionModules = [
  'Branded client applications',
  'Enterprise federation extension',
  'SaaS onboarding and migration services',
  'Custom distributed applications',
];

const roadmapModules = [
  'CommOps module',
  'Workspace CRM',
  'Expanded sovereign communications options',
];

const capabilityDiveContent: Record<string, { title: string; points: string[] }> = {
  distributed_apps: {
    title: 'Deep Dive: Distributed Off-Network Applications',
    points: [
      'Accessible with or without your cloud server via the decentralized application network layer.',
      'Identity and runtime context adapt between gateway access and authenticated QDN access.',
      'Application continuity remains available even when infrastructure topology changes.',
      'Teams can keep daily workflows stable while progressively adopting sovereign runtime modes.',
      'Decentralized application access reduces dependence on centralized platform availability.',
    ],
  },
  redundancy: {
    title: 'Deep Dive: Redundancy + NuQloud Backups',
    points: [
      'Encrypted chunked off-network backups provide durable recovery routes.',
      'Redundancy guarantees can be purchased through CHD package tiers.',
      'Publishing and backup status tracking help teams operate with confidence.',
      'Backup paths are designed to remain accessible even if primary cloud nodes are offline.',
      'Operational visibility is built around verifiable status and recoverability checkpoints.',
    ],
  },
};

const startingPoints = [
  {
    id: 'existing-cloud',
    title: 'Starting Point A: Account on Existing Cloud',
    subtitle:
      'Ideal for individuals testing the platform and organizations running guided pilots before full branded deployment.',
    poweredModes: ['Providerless Authentication Mode', 'Distributed Off-Network Apps', 'In-Cloud Upgrade Path'],
    packages: [
      {
        slug: 'individual-starter',
        name: 'Individual Starter',
        note: 'Single-user onboarding with full feature access.',
      },
      {
        slug: 'individual-pro',
        name: 'Individual Pro',
        note: 'Higher-capacity individual usage with full feature access.',
      },
      {
        slug: 'team-demo',
        name: 'Team Demo Bundle',
        note: 'Small-team pilot with managed onboarding and full feature access.',
      },
    ],
  },
  {
    id: 'private-branded',
    title: 'Starting Point B: Fully Private, Branded Cloud',
    subtitle:
      'Best for organizations ready for a dedicated managed private cloud with branded identity and sovereignty-first controls.',
    poweredModes: ['NuQloud Relay Mode', 'Encrypted Off-Network Publishing', 'Redundancy Guarantees (CHD)'],
    packages: [
      {
        slug: 'org-foundation',
        name: 'Branded Foundation',
        note: 'Private branded environment for foundational organizational rollout.',
      },
      {
        slug: 'org-enhanced',
        name: 'Branded Enhanced',
        note: 'Higher-capacity environment for expanding teams and workflow load.',
      },
      {
        slug: 'org-enterprise',
        name: 'Branded Enterprise',
        note: 'Advanced scaling profile for complex multi-team organizational operations.',
      },
    ],
  },
];

function App() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(sectionNav[0].id);
  const [isCompactMobile, setIsCompactMobile] = useState(() => window.innerWidth <= MOBILE_COMPACT_BREAKPOINT);
  const [showReplacements, setShowReplacements] = useState(() => window.innerWidth > MOBILE_COMPACT_BREAKPOINT);
  const [showCapabilities, setShowCapabilities] = useState(() => window.innerWidth > MOBILE_COMPACT_BREAKPOINT);
  const [showDetailsSection, setShowDetailsSection] = useState(() => window.innerWidth > MOBILE_COMPACT_BREAKPOINT);
  const [activeCapabilityDive, setActiveCapabilityDive] = useState<string | null>(null);
  const [activeDetailDive, setActiveDetailDive] = useState<string | null>(null);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [showIncludedMatrix, setShowIncludedMatrix] = useState(false);
  const [showExpansionModules, setShowExpansionModules] = useState(false);
  const [showRoadmapModules, setShowRoadmapModules] = useState(false);
  const [paymentFeedback, setPaymentFeedback] = useState('');
  const { accessContext, contextActionFeedback, openOrCopyInternetLink } = useAccessContext();
  const isDark = theme === EnumTheme.DARK;
  const showUsdActions = accessContext.mode !== 'qdn';
  const showQortActions = accessContext.mode === 'qdn';

  const pageMotionStyles = useMemo(
    () =>
      ({
        ['--sc-parallax-y' as string]: `${Math.round(scrollY * 0.12)}px`,
        ['--sc-parallax-soft' as string]: `${Math.round(scrollY * 0.06)}px`,
        ['--sc-spin-a' as string]: `${Math.round((scrollY * 0.09) % 360)}deg`,
        ['--sc-spin-b' as string]: `${Math.round((scrollY * -0.06) % 360)}deg`,
        ['--sc-spin-c' as string]: `${Math.round((scrollY * 0.13) % 360)}deg`,
        ['--sc-depth' as string]: `${(1 + Math.sin(scrollY / 190) * 0.07).toFixed(3)}`,
      }) as CSSProperties,
    [scrollY]
  );

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.sc-reveal'));
    if (!items.length) {
      return;
    }

    items.forEach((item, index) => {
      item.style.setProperty('--sc-delay', `${Math.min(index * 52, 480)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -12% 0px' }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [
    showReplacements,
    showCapabilities,
    showDetailsSection,
    showFullDetails,
    showIncludedMatrix,
    showExpansionModules,
    showRoadmapModules,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const nextY = window.scrollY || window.pageYOffset || 0;
      setScrollY(nextY);

      const maxScrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(nextY / maxScrollable, 1));

      const viewportMid = window.innerHeight * 0.5;
      let nextActive = sectionNav[0].id;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const section of sectionNav) {
        const sectionEl = document.getElementById(section.id);
        if (!sectionEl) {
          continue;
        }
        const rect = sectionEl.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          continue;
        }

        const sectionMid = rect.top + rect.height / 2;
        const distance = Math.abs(sectionMid - viewportMid);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextActive = section.id;
        }
      }
      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const nextCompact = window.innerWidth <= MOBILE_COMPACT_BREAKPOINT;
      setIsCompactMobile(nextCompact);

      if (!nextCompact) {
        setShowReplacements(true);
        setShowCapabilities(true);
        setShowDetailsSection(true);
        setShowIncludedMatrix(true);
        setShowExpansionModules(true);
        setShowRoadmapModules(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!paymentFeedback) {
      return;
    }
    const timer = window.setTimeout(() => setPaymentFeedback(''), 3400);
    return () => window.clearTimeout(timer);
  }, [paymentFeedback]);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const toggleCapabilityDive = useCallback((diveId: string) => {
    setActiveCapabilityDive((prev) => (prev === diveId ? null : diveId));
  }, []);

  const toggleDetailDive = useCallback((diveId: string) => {
    setActiveDetailDive((prev) => (prev === diveId ? null : diveId));
  }, []);

  const handleUsdPayment = useCallback((packageSlug: string) => {
    void openOrCopyInternetLink(`${PAYMENT_URL}?plan=${encodeURIComponent(packageSlug)}&currency=USD`);
  }, [openOrCopyInternetLink]);

  const handleQortPayment = useCallback(async (packageSlug: string) => {
    const qortalLink = `${QORT_PAYMENT_QORTAL_LINK_BASE}?plan=${encodeURIComponent(packageSlug)}`;

    if (accessContext.mode === 'qdn') {
      try {
        await qortalRequest({ action: 'OPEN_NEW_TAB', qortalLink });
        setPaymentFeedback('Opened QORT checkout in QDN context.');
      } catch {
        await navigator.clipboard.writeText(qortalLink);
        setPaymentFeedback('QORT checkout link copied.');
      }
      return;
    }

    await openOrCopyInternetLink(`${MSP_CONTACT_URL}/qort-payments?plan=${encodeURIComponent(packageSlug)}`);
    setPaymentFeedback('QORT checkout works directly in authenticated QDN; info link opened/copied.');
  }, [accessContext.mode, openOrCopyInternetLink]);

  return (
    <Box className={`sc-page sc-page--msp ${isDark ? 'sc-theme-dark' : 'sc-theme-light'}`} style={pageMotionStyles}>
      <Box className="sc-scroll-progress" aria-hidden style={{ transform: `scaleX(${scrollProgress})` }} />
      <Box className="sc-bg-orb sc-bg-orb-a" />
      <Box className="sc-bg-orb sc-bg-orb-b" />
      <Box className="sc-bg-grid sc-bg-grid--square" />
      <Box className="sc-bg-vignette" />
      <Box className="sc-geo-layer" aria-hidden>
        <Box className="sc-geo sc-geo-ring" />
        <Box className="sc-geo sc-geo-cube" />
        <Box className="sc-geo sc-geo-diamond" />
        <Box className="sc-geo sc-geo-trail" />
      </Box>

      <Box className="sc-progress-rail" aria-hidden>
        {sectionNav.map((section) => (
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
          <Box className="sc-topbar sc-reveal">
            <Stack direction="row" spacing={1.2} alignItems="center">
              <img src={BRAND_HEADER_LOGO} alt="NuQloud" className="sc-top-logo" />
              <Typography variant="subtitle1" className="sc-top-title">
                NuQloud MSP
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.8} alignItems="center" className="sc-nav-actions">
              <Stack direction="row" spacing={0.6} className="sc-nav-mini">
                {sectionNav.map((section) => (
                  <Button
                    key={section.id}
                    className={`sc-nav-btn ${activeSection === section.id ? 'is-active' : ''}`}
                    onClick={() => scrollToId(section.id)}
                    size="small"
                  >
                    {section.label}
                  </Button>
                ))}
              </Stack>
              <Button component={Link} to="/self-hosting" size="small" className="sc-nav-link">
                NuQloud for Nextcloud
              </Button>
              <IconButton
                className="sc-theme-toggle"
                onClick={() => setTheme(isDark ? EnumTheme.LIGHT : EnumTheme.DARK)}
                aria-label="Toggle theme"
              >
                {isDark ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
              </IconButton>
            </Stack>
          </Box>

          <Box className={`sc-context-bar ${accessContext.mode === 'gateway' ? 'is-gateway' : ''} sc-reveal`}>
            <Chip size="small" label="Access Context" className="sc-chip" />
            <Typography className="sc-context-copy">
              {accessContext.label}: {accessContext.detail}
            </Typography>
          </Box>

          <section className="sc-hero sc-reveal" id="overview">
            <Box className="sc-hero-copy">
              <Typography variant="overline" className="sc-kicker">
                NuQloud MSP • Private • Managed
              </Typography>
              <Typography variant="h1" className="sc-headline">
                One private cloud for your team, without the app-sprawl.
              </Typography>
              <Typography variant="body1" className="sc-subline">
                Start with a simple user account for testing, or launch your own branded private cloud for your
                organization. Same platform, same workflows, cleaner path to scale.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} className="sc-hero-actions">
                <Button className="sc-btn-primary" onClick={() => scrollToId('starting-points')}>
                  See Packages
                </Button>
                <Button className="sc-btn-ghost" onClick={() => scrollToId('capabilities')}>
                  Details
                </Button>
              </Stack>
              <Box className="sc-runtime-panel">
                <Typography className="sc-runtime-title">How links behave in this context</Typography>
                <Typography variant="caption" className="sc-runtime-note">
                  QDN mode shows QORT checkout only. Gateway/internet mode shows USD checkout only.
                </Typography>
                {contextActionFeedback ? (
                  <Typography variant="caption" className="sc-runtime-action-note">
                    {contextActionFeedback}
                  </Typography>
                ) : null}
                {paymentFeedback ? (
                  <Typography variant="caption" className="sc-runtime-action-note">
                    {paymentFeedback}
                  </Typography>
                ) : null}
              </Box>
            </Box>
            <Box className="sc-hero-art">
              <img
                src={BRAND_HERO_LOGO}
                alt="NuQloud platform preview"
                className="sc-hero-image"
              />
            </Box>
          </section>

          <section className="sc-section" id="replaces">
            <Typography variant="h2" className="sc-section-title sc-reveal">
              What You Can Replace
            </Typography>
            <Typography variant="body1" className="sc-section-subtitle sc-reveal">
              Move from disconnected apps to one managed NuQloud platform.
            </Typography>
            {isCompactMobile ? (
              <Box className="sc-toggle-wrap">
                <Button className="sc-btn-ghost sc-btn-toggle" onClick={() => setShowReplacements((prev) => !prev)}>
                  {showReplacements ? 'Hide List' : 'Show List'}
                  {showReplacements ? <ExpandLessRoundedIcon fontSize="small" /> : <ExpandMoreRoundedIcon fontSize="small" />}
                </Button>
              </Box>
            ) : null}
            {showReplacements ? (
              <Box className="sc-replacement-grid">
                {replacementPairs.map((pair, index) => (
                  <Card
                    className="sc-card sc-replacement-card sc-reveal"
                    key={pair.from}
                    style={{ ['--sc-delay' as string]: `${Math.min(index * 120, 720)}ms` }}
                  >
                    <CardContent>
                      <Box className="sc-provider-line">
                        <img src={pair.icon} alt={`${pair.from} icon`} className="sc-provider-icon" loading="lazy" />
                        <Typography className="sc-card-label">Current Stack</Typography>
                      </Box>
                      <Typography className="sc-path-title">{pair.from}</Typography>
                      <Typography className="sc-replace-arrow">→</Typography>
                      <Typography className="sc-card-label">NuQloud</Typography>
                      <Typography className="sc-feature-copy">{pair.to}</Typography>
                      <Typography className="sc-mini-tease">{pair.tease}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : null}
          </section>

          <section className="sc-section sc-reveal" id="capabilities">
            <Typography variant="h2" className="sc-section-title">
              What Is Included
            </Typography>
            <Typography variant="body1" className="sc-section-subtitle">
              Everything below is included as one service layer, not disconnected products.
            </Typography>
            {isCompactMobile ? (
              <Box className="sc-toggle-wrap">
                <Button className="sc-btn-ghost sc-btn-toggle" onClick={() => setShowCapabilities((prev) => !prev)}>
                  {showCapabilities ? 'Hide Included List' : 'Show Included List'}
                  {showCapabilities ? <ExpandLessRoundedIcon fontSize="small" /> : <ExpandMoreRoundedIcon fontSize="small" />}
                </Button>
              </Box>
            ) : null}
            {showCapabilities ? (
              <>
                <Box component="ol" className="sc-unify-list">
                  {unifyHighlights.map((item, index) => (
                    <Card
                      component="li"
                      className="sc-card sc-unify-item sc-reveal"
                      key={item.id}
                      style={{ ['--sc-delay' as string]: `${Math.min(index * 130, 780)}ms` }}
                    >
                      <CardContent>
                        <Box className="sc-unify-item-head">
                          <Typography className="sc-unify-step">{String(index + 1).padStart(2, '0')}</Typography>
                          <Typography className="sc-detail-title">{item.title}</Typography>
                        </Box>
                        <Typography className="sc-feature-copy">{item.body}</Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} className="sc-inline-actions">
                  <Button className="sc-btn-ghost" onClick={() => toggleCapabilityDive('distributed_apps')}>
                    {activeCapabilityDive === 'distributed_apps'
                      ? 'Hide More Details: Distributed Apps'
                      : 'More Details: Distributed Apps'}
                  </Button>
                  <Button className="sc-btn-ghost" onClick={() => toggleCapabilityDive('redundancy')}>
                    {activeCapabilityDive === 'redundancy'
                      ? 'Hide More Details: Backups + Redundancy'
                      : 'More Details: Backups + Redundancy'}
                  </Button>
                </Stack>
                {activeCapabilityDive ? (
                  <Card className="sc-card sc-dive-panel sc-inline-dive">
                    <CardContent>
                      <Typography className="sc-path-title">
                        {capabilityDiveContent[activeCapabilityDive].title}
                      </Typography>
                      <Typography className="sc-mini-tease">
                        Extra context if you want a deeper breakdown before choosing a plan.
                      </Typography>
                      <Box component="ul" className="sc-detail-list">
                        {capabilityDiveContent[activeCapabilityDive].points.map((point) => (
                          <Box component="li" className="sc-detail-item" key={point}>
                            {point}
                          </Box>
                        ))}
                      </Box>
                      <Button className="sc-btn-ghost" onClick={() => openOrCopyInternetLink(FEATURE_DOCS_URL)}>
                        In-Depth Feature Notes <OpenInNewRoundedIcon fontSize="small" />
                      </Button>
                    </CardContent>
                  </Card>
                ) : null}
              </>
            ) : null}
          </section>

          <section className="sc-section" id="details">
            <Typography variant="h2" className="sc-section-title sc-reveal">
              Compare By Need
            </Typography>
            <Typography variant="body1" className="sc-section-subtitle sc-reveal">
              Open this section for the full mapping of each familiar toolset to the NuQloud platform.
            </Typography>
            {isCompactMobile ? (
              <Box className="sc-toggle-wrap">
                <Button className="sc-btn-ghost sc-btn-toggle" onClick={() => setShowDetailsSection((prev) => !prev)}>
                  {showDetailsSection ? 'Hide Full Mapping' : 'Show Full Mapping'}
                  {showDetailsSection ? <ExpandLessRoundedIcon fontSize="small" /> : <ExpandMoreRoundedIcon fontSize="small" />}
                </Button>
              </Box>
            ) : null}
            {showDetailsSection ? (
              <Box className="sc-detail-grid">
                {replacementDetails.map((item, index) => (
                  <Card
                    className={`sc-card sc-detail-card sc-reveal ${index % 2 === 0 ? 'sc-reveal-side-l' : 'sc-reveal-side-r'}`}
                    key={item.id}
                  >
                    <CardContent>
                      <Typography className="sc-card-label">Replaces</Typography>
                      <Typography className="sc-path-title">{item.replaces}</Typography>
                      <Typography className="sc-detail-title">{item.app}</Typography>
                      <Box component="ul" className="sc-detail-list">
                        {item.details.map((detail) => (
                          <Box component="li" key={detail} className="sc-detail-item">
                            {detail}
                          </Box>
                        ))}
                      </Box>
                      <Button className="sc-btn-ghost" onClick={() => toggleDetailDive(item.id)}>
                        {activeDetailDive === item.id ? 'Hide Deep Dive' : 'Deep Dive'}
                      </Button>
                      {activeDetailDive === item.id ? (
                        <Box className="sc-inline-dive sc-inline-dive--detail">
                          <Typography className="sc-detail-title">{item.app} - Deep Dive</Typography>
                          <Typography className="sc-mini-tease">
                            Detailed implementation and value breakdown for this replacement path.
                          </Typography>
                          <Box component="ul" className="sc-detail-list">
                            {item.deepDive.map((point) => (
                              <Box component="li" className="sc-detail-item" key={point}>
                                {point}
                              </Box>
                            ))}
                          </Box>
                          <Button className="sc-btn-ghost" onClick={() => openOrCopyInternetLink(item.url)}>
                            In-Depth Reference <OpenInNewRoundedIcon fontSize="small" />
                          </Button>
                        </Box>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : null}
          </section>

          <section className="sc-section sc-reveal" id="starting-points">
            <Typography variant="h2" className="sc-section-title">
              Choose Your Starting Plan
            </Typography>
            <Typography variant="body1" className="sc-section-subtitle">
              Start small or launch fully branded from day one. You can move between paths without resetting your workflow.
            </Typography>
            <Box className="sc-starting-stack">
              {startingPoints.map((point) => (
                <Card className="sc-card sc-starting-card" key={point.id}>
                  <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <SettingsEthernetRoundedIcon className="sc-path-icon" />
                      <Typography className="sc-path-title">{point.title}</Typography>
                    </Stack>
                    <Typography className="sc-path-copy">{point.subtitle}</Typography>
                    <Stack direction="row" spacing={0.7} flexWrap="wrap" className="sc-powered-row">
                      {point.poweredModes.map((mode) => (
                        <Chip size="small" label={mode} className="sc-powered-chip" key={mode} />
                      ))}
                    </Stack>
                    <Box className="sc-package-grid">
                      {point.packages.map((pkg) => (
                        <Card className="sc-card sc-package-card" key={pkg.slug}>
                          <CardContent>
                            <Typography className="sc-card-label">Package</Typography>
                            <Typography className="sc-path-title">{pkg.name}</Typography>
                            <Typography className="sc-card-label">Full Feature Set Included</Typography>
                            <Typography className="sc-mini-tease">{pkg.note}</Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0.7} className="sc-package-actions">
                              {showUsdActions ? (
                                <Button className="sc-btn-ghost" onClick={() => handleUsdPayment(pkg.slug)}>
                                  USD Checkout
                                </Button>
                              ) : null}
                              {showQortActions ? (
                                <Button className="sc-btn-ghost" onClick={() => void handleQortPayment(pkg.slug)}>
                                  QORT Checkout
                                </Button>
                              ) : null}
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
            <Box className="sc-full-details-wrap">
              <Button className="sc-btn-primary" onClick={() => setShowFullDetails((prev) => !prev)}>
                {showFullDetails ? 'Hide More Details' : 'More Details'}
              </Button>
            </Box>
            {showFullDetails ? (
              <Box className="sc-starting-details-panel sc-reveal is-visible">
                <Box className="sc-toggle-wrap">
                  <Button className="sc-btn-ghost sc-btn-toggle" onClick={() => setShowIncludedMatrix((prev) => !prev)}>
                    {showIncludedMatrix ? 'Hide Included Features' : 'Show Included Features'}
                    {showIncludedMatrix ? <ExpandLessRoundedIcon fontSize="small" /> : <ExpandMoreRoundedIcon fontSize="small" />}
                  </Button>
                </Box>
                {showIncludedMatrix ? (
                  <>
                    <Typography variant="h3" className="sc-section-title" sx={{ mt: 2 }}>
                      Included
                    </Typography>
                    <Typography variant="body1" className="sc-section-subtitle">
                      Core capabilities are included across all package paths.
                    </Typography>
                    <Box className="sc-card-grid">
                      {fullFeatureMatrix.map((category) => (
                        <Card className="sc-card" key={category.id}>
                          <CardContent>
                            <Typography className="sc-detail-title">{category.title}</Typography>
                            <Box component="ul" className="sc-detail-list">
                              {category.items.map((item) => (
                                <Box component="li" key={item} className="sc-detail-item">
                                  {item}
                                </Box>
                              ))}
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </>
                ) : null}

                <Box className="sc-toggle-wrap">
                  <Button
                    className="sc-btn-ghost sc-btn-toggle"
                    onClick={() => setShowExpansionModules((prev) => !prev)}
                  >
                    {showExpansionModules ? 'Hide Expansion Modules' : 'Show Expansion Modules'}
                    {showExpansionModules ? <ExpandLessRoundedIcon fontSize="small" /> : <ExpandMoreRoundedIcon fontSize="small" />}
                  </Button>
                </Box>
                {showExpansionModules ? (
                  <>
                    <Typography variant="h3" className="sc-section-title" sx={{ mt: 3 }}>
                      Expansion Modules
                    </Typography>
                    <Card className="sc-card">
                      <CardContent>
                        <Box component="ul" className="sc-detail-list">
                          {expansionModules.map((module) => (
                            <Box component="li" key={module} className="sc-detail-item">
                              {module}
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </>
                ) : null}

                <Box className="sc-toggle-wrap">
                  <Button className="sc-btn-ghost sc-btn-toggle" onClick={() => setShowRoadmapModules((prev) => !prev)}>
                    {showRoadmapModules ? 'Hide Roadmap' : 'Show Roadmap'}
                    {showRoadmapModules ? <ExpandLessRoundedIcon fontSize="small" /> : <ExpandMoreRoundedIcon fontSize="small" />}
                  </Button>
                </Box>
                {showRoadmapModules ? (
                  <>
                    <Typography variant="h3" className="sc-section-title" sx={{ mt: 3 }}>
                      Roadmap
                    </Typography>
                    <Card className="sc-card">
                      <CardContent>
                        <Box component="ul" className="sc-detail-list">
                          {roadmapModules.map((item) => (
                            <Box component="li" key={item} className="sc-detail-item">
                              {item}
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </>
                ) : null}
              </Box>
            ) : null}
          </section>

          <section className="sc-cta sc-reveal" id="next">
            <Typography variant="h3" className="sc-cta-title">
              Start small, scale when you are ready.
            </Typography>
            <Typography className="sc-cta-copy">
              Begin with per-user options or launch full branded private cloud from day one.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} justifyContent="center">
              {showUsdActions ? (
                <Button className="sc-btn-primary" onClick={() => handleUsdPayment('msp-onboarding')}>
                  Open / Copy USD Onboarding
                </Button>
              ) : null}
              {showQortActions ? (
                <Button className="sc-btn-ghost" onClick={() => void handleQortPayment('msp-onboarding')}>
                  Open / Copy QORT Onboarding
                </Button>
              ) : null}
            </Stack>
          </section>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
