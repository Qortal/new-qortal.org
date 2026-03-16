import authIdentityIcon from "../assets/provider-icons/auth-identity.svg";
import billingPaymentsIcon from "../assets/provider-icons/billing-payments.svg";
import docsProjectIcon from "../assets/provider-icons/docs-project.svg";
import dropboxStorageIcon from "../assets/provider-icons/dropbox-storage.svg";
import googleWorkspaceIcon from "../assets/provider-icons/google-workspace.svg";
import slackTeamsZoomIcon from "../assets/provider-icons/slack-teams-zoom.svg";

const PAYMENT_URL = "https://nuqloud.com/get-started";
const FEATURE_DOCS_URL = "https://nuqloud.com/features";

// Preserved copy of the previous MSP homepage content model for future reuse.
export const legacyMspHomepageArchive = {
  sectionNav: [
    { id: "overview", label: "Overview" },
    { id: "replaces", label: "Why Switch" },
    { id: "capabilities", label: "Included" },
    { id: "details", label: "Details" },
    { id: "starting-points", label: "Plans" },
    { id: "next", label: "Start" },
  ],
  replacementPairs: [
    {
      from: "Google Workspace / Microsoft 365",
      to: "NuQloud all-in-one workspace",
      tease: "Mail, files, office, calendars, contacts, tasks, identity",
      icon: googleWorkspaceIcon,
    },
    {
      from: "Slack / Teams / Zoom / Discord",
      to: "NuQloud communication stack",
      tease: "Chat, calls, screen sharing, meeting links, sovereign relay",
      icon: slackTeamsZoomIcon,
    },
    {
      from: "Dropbox / OneDrive / Box / iCloud Drive",
      to: "NuQloud data + controlled publishing",
      tease: "Encrypted chunked off-network archives",
      icon: dropboxStorageIcon,
    },
    {
      from: "Trello / Asana / Jira / Monday",
      to: "Operational workflow workspace",
      tease: "Deck boards, task pipelines, activity traceability",
      icon: docsProjectIcon,
    },
    {
      from: "Notion / Confluence / Airtable",
      to: "One NuQloud work layer",
      tease: "Deck, notes, announcements, activity, tables in one experience",
      icon: docsProjectIcon,
    },
    {
      from: "Google Calendar / Outlook / Calendly",
      to: "NuQloud scheduling and groupware",
      tease: "Calendars, contacts, tasks, invites, team schedules",
      icon: googleWorkspaceIcon,
    },
    {
      from: "Google Docs / Office Online silos",
      to: "NuQloud office collaboration",
      tease: "Docs, sheets, presentations, browser previews",
      icon: googleWorkspaceIcon,
    },
    {
      from: "Okta / Auth0 / Duo + identity lock-in",
      to: "NuQloud identity + integration",
      tease: "MFA, audit logging, SSO options, LDAP/SAML/OIDC expansion",
      icon: authIdentityIcon,
    },
    {
      from: "Datadog / Splunk / backup tooling patchwork",
      to: "NuQloud managed operations",
      tease: "Monitoring, updates, backup operations, incident response",
      icon: billingPaymentsIcon,
    },
    {
      from: "Disconnected billing + provisioning funnels",
      to: "NuQloud package-aware upgrade lifecycle",
      tease: "Per-user onboarding to fully branded managed-cloud upgrades",
      icon: billingPaymentsIcon,
    },
  ],
  unifyHighlights: [
    {
      id: "all-included",
      title: "Everything Important Is Included",
      body: "Collaboration, groupware, communication, office, admin controls, and platform operations are included across package paths.",
    },
    {
      id: "distributed-apps",
      title: "Distributed Off-Network Applications",
      body: "Access decentralized applications with or without the cloud through a sovereign network model.",
    },
    {
      id: "encrypted-backup",
      title: "Encrypted Chunked Off-Network Backups",
      body: "Backups remain retrievable beyond any single server instance and are designed for durable recovery.",
    },
    {
      id: "redundancy",
      title: "Redundancy Guarantees",
      body: "CHD service guarantees can layer resilient replication expectations into production operations.",
    },
    {
      id: "private-comms",
      title: "Private Communications Options",
      body: "Encrypted private communication pathways can grow from managed relay defaults into deeper sovereign modes.",
    },
    {
      id: "publishing",
      title: "Distributed Publishing Status + Verification",
      body: "File publishing includes status visibility and verification checks for operational confidence.",
    },
    {
      id: "upgrade-paths",
      title: "In-Cloud Upgrade Paths",
      body: "Start with simple onboarding and scale users, capacity, and private branding without resetting workflows.",
    },
  ],
  replacementDetails: [
    {
      id: "workspace-core",
      app: "NuQloud Workspace Core",
      replaces: "Google Workspace / Microsoft 365",
      details: [
        "Private branded cloud accounts for organizations plus per-user entry options on existing cloud.",
        "Mail, file collaboration, office docs, calendars, and providerless identity foundations.",
        "Upgrade paths from demo/trial account models to full private branded deployment.",
      ],
      deepDive: [
        "Providerless authentication mode allows identity continuity as deployment models change.",
        "Distributed off-network application access keeps workflows resilient to single-provider failures.",
        "Operational simplicity remains while sovereignty controls expand underneath.",
        "User lifecycle can begin on shared cloud accounts and transition into branded dedicated deployments.",
        "Identity and access controls are aligned to long-term sovereign ownership rather than vendor lock-in.",
      ],
      url: FEATURE_DOCS_URL,
    },
    {
      id: "groupware-layer",
      app: "NuQloud Groupware Layer",
      replaces: "Google Calendar / Outlook / Calendly + contact silos",
      details: [
        "Shared calendars, tasks, contacts, and scheduling run in one managed workspace.",
        "Invite flows and team scheduling are integrated without switching providers.",
        "Groupware identity remains aligned to your cloud rather than third-party lock-in.",
      ],
      deepDive: [
        "Calendar, task, and contact data remain under one organizational control plane.",
        "Scheduling workflows fit both per-user trial environments and branded private deployments.",
        "Groupware data participates in the same backup and governance lifecycle as files and chat.",
        "Migration from fragmented scheduling stacks is simplified by unified account structure.",
        "Operational users get one workflow language across communication and coordination surfaces.",
      ],
      url: FEATURE_DOCS_URL,
    },
    {
      id: "comms-layer",
      app: "NuQloud Communications Layer",
      replaces: "Slack / Teams / Zoom style stack",
      details: [
        "Conversation relay architecture bridges cloud communication with sovereign message channels.",
        "Moderation-safe mapping and server relay diagnostics are available for managed operation.",
        "Encrypted off-network private communication options are roadmap-aligned and protocol-native.",
      ],
      deepDive: [
        "NuQloud relay mode supports growth from cloud-first collaboration into deeper decentralization.",
        "Users keep familiar communication UX while gaining durable sovereign channel options.",
        "Cross-context delivery supports both gateway users and authenticated QDN users.",
        "Mapped conversations keep operational clarity between managed cloud workflows and sovereign channels.",
        "Private communication options can evolve from managed defaults into stronger decentralized modes.",
      ],
      url: FEATURE_DOCS_URL,
    },
    {
      id: "office-layer",
      app: "NuQloud Office Collaboration",
      replaces: "Google Docs / Office 365 doc silos",
      details: [
        "Real-time document collaboration runs in-browser through a private managed stack.",
        "Word, sheet, and presentation workflows are integrated with storage and communications.",
        "Office previews and edits stay in the same security and governance domain.",
      ],
      deepDive: [
        "Office collaboration no longer depends on separate external suites with different controls.",
        "Document workflows inherit the same backup, sharing, and retention policies as the wider workspace.",
        "Cross-team editing ties directly into chat, tasks, and operational tracking surfaces.",
        "Branded private environments keep organizational context throughout document lifecycle.",
        "Per-user onboarding paths can still use the same doc collaboration model before full private rollout.",
      ],
      url: FEATURE_DOCS_URL,
    },
    {
      id: "workflow-layer",
      app: "NuQloud Workflow + Knowledge Layer",
      replaces: "Trello / Asana / Jira / Notion / Confluence / Airtable",
      details: [
        "Deck boards, notes, announcements, activity, and tables align into one operational model.",
        "Work tracking and collaboration context are attached to the same account and access layer.",
        "Structured and unstructured work data no longer lives in disconnected products.",
      ],
      deepDive: [
        "Teams can track tasks, communicate, and manage structured data without jumping platforms.",
        "Knowledge and workflow artifacts share one governance boundary for retention and control.",
        "Activity trails improve operational observability for audits and handoffs.",
        "Tables and notes enable lightweight operational systems before custom app expansion.",
        "Unified workflow surfaces lower tool sprawl and reduce context switching costs.",
      ],
      url: FEATURE_DOCS_URL,
    },
    {
      id: "security-ops-layer",
      app: "NuQloud Security + Operations Layer",
      replaces:
        "Identity and ops tool patchworks (Okta/Auth0/Duo/Datadog/Splunk + backup silos)",
      details: [
        "RBAC, MFA, TLS, audit logging, and encrypted storage are managed in one platform.",
        "Monitoring, update lifecycle, backup operations, and incident response are included operationally.",
        "Identity integrations can expand via LDAP, SAML, and OIDC for larger organizations.",
      ],
      deepDive: [
        "Security and operations no longer require separate subscription stacks to remain controlled.",
        "Auditability improves when identity, comms, files, and operations are centrally visible.",
        "Managed operations keep platform hygiene aligned with sovereignty goals.",
        "Backup operations and incident response are part of the same service model, not a bolt-on.",
        "Identity integration paths exist for phased enterprise rollout complexity.",
      ],
      url: FEATURE_DOCS_URL,
    },
    {
      id: "publish-layer",
      app: "NuQloud Publish + Backup Layer",
      replaces: "Dropbox add-ons + ad hoc public links",
      details: [
        "Encrypted and chunked off-network backups for long-term resilient access.",
        "Distributed file publishing with verifiable status and sovereign lifecycle visibility.",
        "Controlled publishing workflows from familiar file UX while reducing platform lock-in.",
      ],
      deepDive: [
        "Backups are designed for off-network retrievability independent of a single cloud host.",
        "CHD redundancy guarantees can be layered by package level for stronger assurance.",
        "Publishing status is surfaced for operational confidence and auditability.",
        "Encrypted chunking reduces exposure while improving resilience across decentralized storage models.",
        "Distributed file publishing status helps teams verify delivery and retention outcomes.",
      ],
      url: FEATURE_DOCS_URL,
    },
    {
      id: "upgrade-model",
      app: "NuQloud Upgrade + Packaging Model",
      replaces: "Vendor lock-in growth funnels",
      details: [
        "Two starting points: per-user existing-cloud access or full branded private cloud launch.",
        "All core platform features are included across package paths.",
        "Package paths are designed to support simple onboarding now and larger managed rollouts later.",
      ],
      deepDive: [
        "Package architecture supports organization-first rollouts and individual-first trial adoption.",
        "In-cloud upgrade paths keep onboarding simple while preserving sovereignty trajectory.",
        "Growth paths can be tuned for multi-user expansion without feature fragmentation.",
        "Package structure is designed to support both hosted-account growth and fully branded private deployments.",
      ],
      url: PAYMENT_URL,
    },
  ],
  fullFeatureMatrix: [
    {
      id: "core-collaboration",
      title: "Core Collaboration",
      items: [
        "Secure file storage and sync",
        "Versioning and trash recovery",
        "Desktop and mobile sync clients",
        "Public sharing and file drops",
        "External storage mounts",
      ],
    },
    {
      id: "groupware",
      title: "Groupware",
      items: [
        "Calendar (CalDAV)",
        "Contacts (CardDAV)",
        "Tasks and shared team calendars",
        "Scheduling and invites",
      ],
    },
    {
      id: "communications",
      title: "Communications",
      items: [
        "Team chat (Talk)",
        "Audio/video calls and screen sharing",
        "Meeting links on your domain",
        "Chat file sharing",
      ],
    },
    {
      id: "office",
      title: "Office",
      items: [
        "Real-time document editing (Collabora)",
        "Word/sheet/presentation support",
        "In-browser office previews",
      ],
    },
    {
      id: "collaboration-tools",
      title: "Collaboration Tools",
      items: [
        "Deck (Kanban boards)",
        "Notes",
        "Announcements",
        "Activity tracking",
        "Structured data tables",
      ],
    },
    {
      id: "security-admin",
      title: "Security + Admin",
      items: [
        "Role-based access control",
        "MFA support",
        "Audit logging",
        "Encryption at rest (server-side)",
        "TLS for all services",
        "Backup monitoring",
      ],
    },
    {
      id: "platform-ops",
      title: "Platform Management",
      items: [
        "Software updates",
        "Monitoring",
        "Backup operations (PBS)",
        "Incident response",
      ],
    },
  ],
  expansionModules: [
    "Branded client applications",
    "Enterprise federation extension",
    "SaaS onboarding and migration services",
    "Custom distributed applications",
  ],
  roadmapModules: [
    "CommOps module",
    "Workspace CRM",
    "Expanded sovereign communications options",
  ],
  capabilityDiveContent: {
    distributed_apps: {
      title: "Deep Dive: Distributed Off-Network Applications",
      points: [
        "Accessible with or without your cloud server via the decentralized application network layer.",
        "Identity and runtime context adapt between gateway access and authenticated QDN access.",
        "Application continuity remains available even when infrastructure topology changes.",
        "Teams can keep daily workflows stable while progressively adopting sovereign runtime modes.",
        "Decentralized application access reduces dependence on centralized platform availability.",
      ],
    },
    redundancy: {
      title: "Deep Dive: Redundancy + NuQloud Backups",
      points: [
        "Encrypted chunked off-network backups provide durable recovery routes.",
        "Redundancy guarantees can be purchased through CHD package tiers.",
        "Publishing and backup status tracking help teams operate with confidence.",
        "Backup paths are designed to remain accessible even if primary cloud nodes are offline.",
        "Operational visibility is built around verifiable status and recoverability checkpoints.",
      ],
    },
  },
  startingPoints: [
    {
      id: "existing-cloud",
      title: "Starting Point A: Account on Existing Cloud",
      subtitle:
        "Ideal for individuals testing the platform and organizations running guided pilots before full branded deployment.",
      poweredModes: [
        "Providerless Authentication Mode",
        "Distributed Off-Network Apps",
        "In-Cloud Upgrade Path",
      ],
      packages: [
        {
          slug: "individual-starter",
          name: "Individual Starter",
          note: "Single-user onboarding with full feature access.",
        },
        {
          slug: "individual-pro",
          name: "Individual Pro",
          note: "Higher-capacity individual usage with full feature access.",
        },
        {
          slug: "team-demo",
          name: "Team Demo Bundle",
          note: "Small-team pilot with managed onboarding and full feature access.",
        },
      ],
    },
    {
      id: "private-branded",
      title: "Starting Point B: Fully Private, Branded Cloud",
      subtitle:
        "Best for organizations ready for a dedicated managed private cloud with branded identity and sovereignty-first controls.",
      poweredModes: [
        "NuQloud Relay Mode",
        "Encrypted Off-Network Publishing",
        "Redundancy Guarantees (CHD)",
      ],
      packages: [
        {
          slug: "org-foundation",
          name: "Branded Foundation",
          note: "Private branded environment for foundational organizational rollout.",
        },
        {
          slug: "org-enhanced",
          name: "Branded Enhanced",
          note: "Higher-capacity environment for expanding teams and workflow load.",
        },
        {
          slug: "org-enterprise",
          name: "Branded Enterprise",
          note: "Advanced scaling profile for complex multi-team organizational operations.",
        },
      ],
    },
  ],
} as const;
