import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
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
} from "@mui/material";
import { useAtom } from "jotai";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import docsProjectIcon from "./assets/provider-icons/docs-project.svg";
import dropboxStorageIcon from "./assets/provider-icons/dropbox-storage.svg";
import googleWorkspaceIcon from "./assets/provider-icons/google-workspace.svg";
import slackTeamsZoomIcon from "./assets/provider-icons/slack-teams-zoom.svg";
import { BRAND_HEADER_LOGO, BRAND_HERO_LOGO } from "./brandAssets";
import { useAccessContext } from "./hooks/useAccessContext";
import { EnumTheme, themeAtom } from "./state/global/system";
import "./App.css";

const PLAN_CHECKOUT_URLS: Record<string, string> = {
  "nuqloud-starter":
    "https://payment.crowetic.com/products/nuqloud/nuqloud-starter/checkout",
  "nuqloud-advanced":
    "https://payment.crowetic.com/products/nuqloud/nuqloud-advanced/checkout",
  "nuqloud-pro":
    "https://payment.crowetic.com/products/nuqloud/nuqloud-pro/checkout",
  "nuqloud-team-starter":
    "https://payment.crowetic.com/products/nuqloud/nuqloud-starter-team/checkout",
  "nuqloud-team-advanced":
    "https://payment.crowetic.com/products/nuqloud/nuqloud-advanced-team/checkout",
  "nuqloud-team-pro":
    "https://payment.crowetic.com/products/nuqloud/nuqloud-professional-team/checkout",
  "nuqloud-branded-starter":
    "https://payment.crowetic.com/products/nuqloud-branded/nuqloud-branded-starter/checkout",
  "nuqloud-branded-advanced":
    "https://payment.crowetic.com/products/nuqloud-branded/nuqloud-branded-pro/checkout",
  "nuqloud-branded-enterprise":
    "https://payment.crowetic.com/products/nuqloud-branded/nuqloud-branded-enterprise-default/checkout",
};
const CONTACT_TICKET_URL = "https://payment.crowetic.com/tickets/create";

const pageSections = [
  { id: "overview", label: "Home", topNav: true },
  { id: "about", label: "About", topNav: true },
  { id: "features", label: "Features", topNav: true },
  { id: "why", label: "Why", topNav: false },
  { id: "dedicated-cloud", label: "Dedicated Cloud", topNav: true },
  { id: "foundation", label: "Technology", topNav: false },
  { id: "plans", label: "Plans", topNav: true },
  { id: "contact", label: "Contact", topNav: true },
] as const;

const heroHighlights = [
  "Private cloud",
  "Managed for you",
  "Optional resilient publishing",
];

const heroQuickWins = [
  {
    title: "Files",
    body: "Sync, share, and off-network accessible backups.",
    Icon: CloudRoundedIcon,
  },
  {
    title: "Communication",
    body: "Project management, collaboration, and communication in one place.",
    Icon: WorkspacesRoundedIcon,
  },
  {
    title: "Private Replacements",
    body: "Private replacements for countless services in one place.",
    Icon: ShieldRoundedIcon,
  },
];

const featureStories = [
  {
    id: "store-sync",
    title: "Store & Sync",
    body: "Keep files available across desktop and mobile devices without bouncing between consumer storage silos.",
    detail:
      "One upload becomes one private file pipeline instead of a stack of consumer sync products.",
    actionLabel:
      "Upload once, sync multiple devices, share privately or publicly, collaborate actively.",
    successLabel: "Synchronized",
    scene: "sync",
    Icon: SyncRoundedIcon,
    steps: [
      "Add file",
      "Sync multiple devices",
      "Share and collab publicly or privately",
      "Publish to off-network storage",
    ],
    replacements: [
      {
        label: "Dropbox / OneDrive / Box / iCloud Drive",
        icon: dropboxStorageIcon,
      },
      {
        label: "Google Drive / Workspace Files",
        icon: googleWorkspaceIcon,
      },
    ],
  },
  {
    id: "share-collaborate",
    title: "Share & Collaborate",
    body: "Work with clients, teams, and family in one private cloud space instead of splitting work across separate doc and project tools.",
    detail:
      "A single file becomes a shared workspace instead of another round trip between disconnected tools.",
    actionLabel: "Share once. Collaborate in place.",
    successLabel: "Shared with your team",
    scene: "share",
    Icon: WorkspacesRoundedIcon,
    steps: ["Prepare the file", "Share it", "Collaborate together"],
    replacements: [
      {
        label: "Google Workspace / Microsoft 365",
        icon: googleWorkspaceIcon,
      },
      {
        label: "Notion / Confluence / Airtable",
        icon: docsProjectIcon,
      },
      {
        label: "Trello / Asana / Jira",
        icon: docsProjectIcon,
      },
    ],
  },
  {
    id: "communicate",
    title: "Communicate",
    body: "Use built-in messaging, calls, and collaboration tools without bolting on another vendor stack.",
    detail:
      "Messages, meetings, and team context stay together instead of scattering across separate chat apps.",
    actionLabel: "Message, meet, and move work forward.",
    successLabel: "Conversation connected",
    scene: "communicate",
    Icon: ForumRoundedIcon,
    steps: [
      "Start a conversation",
      "Connect with internal and external parties",
      "Keep everything organized",
      "Encrypted calls and meeting recordings available by default",
    ],
    replacements: [
      {
        label: "Slack / Teams / Zoom",
        icon: slackTeamsZoomIcon,
      },
      {
        label: "Discord / meeting-link sprawl",
        icon: slackTeamsZoomIcon,
      },
    ],
  },
  {
    id: "publish-resilience",
    title: "Publish with Off-Network Resilience",
    body: "Optionally publish content to QDN, access it anywhere with or without the cloud or any server, and get guaranteed audit trails on each file.",
    detail:
      "Content can be published to an off-internet network encrypted and chunked, with a single click.",
    actionLabel: "Publish beyond a single platform.",
    successLabel: "Published + verified",
    scene: "publish",
    Icon: PublicRoundedIcon,
    steps: ["Prepare the content", "Distribute it", "Verify delivery"],
    replacements: [
      {
        label: "Public drive links / expiring shares",
        icon: dropboxStorageIcon,
      },
      {
        label: "Docs portals and static knowledge silos",
        icon: docsProjectIcon,
      },
      {
        label: "Centralized publishing platforms",
        icon: googleWorkspaceIcon,
      },
    ],
  },
] as const;

const differenceCards = [
  {
    title: "Privacy by Default",
    body: "Your cloud should work for you, not turn your data into someone else’s business model.",
    Icon: VerifiedUserRoundedIcon,
  },
  {
    title: "Independent Infrastructure",
    body: "NuQloud is designed to reduce reliance on centralized platforms and single points of failure.",
    Icon: LanRoundedIcon,
  },
  {
    title: "More Than Storage",
    body: "Storage, collaboration, communication, and optional publishing live in one managed system.",
    Icon: HubRoundedIcon,
  },
  {
    title: "Built for Ownership",
    body: "From a personal account to a branded deployment, you keep more control over your environment.",
    Icon: ApartmentRoundedIcon,
  },
];

const serviceModels = [
  {
    id: "managed-cloud-accounts",
    title: "NuQloud Accounts",
    subtitle: "For single users or teams not needing full branded options.",
    bestFor:
      "Start on existing NuQloud-run infrastructure and scale when you need more.",
    bullets: [
      "Fast onboarding without standing up your own infrastructure.",
      "Files, collaboration, messaging, and backups in one managed service.",
      "A clear path into larger team or organization rollouts later.",
    ],
    ctaLabel: "View Account Plans",
    ctaTarget: "plans",
  },
  {
    id: "dedicated-branded-cloud",
    title: "Dedicated Branded Instances",
    subtitle:
      "For those needing a full private instance for their team, community, or organization.",
    bestFor:
      "A fully branded deployment with your own domain, identity, and managed environment.",
    bullets: [
      "Dedicated managed environment with stronger ownership and brand presence.",
      "Built for teams that want a cloud that feels like their own platform.",
      "Managed operations, backups, and growth planning included in the service path.",
    ],
    ctaLabel: "View Branded Plans",
    ctaTarget: "plans",
  },
];

const foundationHighlights = [
  {
    title: "Familiar private cloud experience",
    body: "Usable file, collaboration, and communication tools come first so the platform feels approachable.",
  },
  {
    title: "Managed operations layer",
    body: "Updates, backup planning, and operational support stay in the same service model.",
  },
  {
    title: "Optional resilience layer",
    body: "Decentralized publishing and resilience features support the cloud with stronger independence and durability.",
  },
];

const planGroups = [
  {
    id: "managed",
    title: "NuQloud Accounts",
    intro:
      "All NuQloud account packages include the same core features. Plans control your on-server storage, decentralized encrypted publishing space, and the initial publishing credits included with the account.",
    plans: [
      {
        slug: "nuqloud-starter",
        name: "NuQloud Starter",
        description: "Starting at $12/month.",
        price: "$12",
        cadence: "/month",
        summary: "10GB on-server + 10GB decentralized encrypted publish space.",
        publishingCredits: "500 initial publishing credits included.",
        note: "Team versions available",
        teamSlug: "nuqloud-team-starter",
        teamLabel: "Team version available",
      },
      {
        slug: "nuqloud-advanced",
        name: "NuQloud Advanced",
        description: "$21/month with more storage and initial publishing credits.",
        price: "$21",
        cadence: "/month",
        summary: "25GB on-server + 25GB decentralized encrypted publish space.",
        publishingCredits: "2,000 initial publishing credits included.",
        note: "Team versions available",
        teamSlug: "nuqloud-team-advanced",
        teamLabel: "Team version available",
      },
      {
        slug: "nuqloud-pro",
        name: "NuQloud Professional",
        description: "$36/month with more storage and initial publishing credits.",
        price: "$36",
        cadence: "/month",
        summary: "100GB on-server + 100GB decentralized encrypted publish space.",
        publishingCredits: "5,000 initial publishing credits included.",
        note: "Team versions available",
        teamSlug: "nuqloud-team-pro",
        teamLabel: "Team version available",
      },
    ],
  },
  {
    id: "dedicated",
    title: "Fully Branded Private Instances",
    intro:
      "NuQloud Branded gives you your own fully private instance, control over your own users, and your own branding.",
    plans: [
      {
        slug: "nuqloud-branded-starter",
        name: "NuQloud Branded Starter",
        description:
          "$175/month with a $500 one-time initial setup fee.",
        price: "$175",
        cadence: "/month",
        setupFee: "$500 one-time setup",
        summary: "150GB storage + 150GB decentralized publishing space.",
        publishingCredits: "10,000 initial publishing credits included.",
        bullets: [
          "Expansion options available",
          "Guaranteed functionality for 10+ very active users, or many more less active",
        ],
      },
      {
        slug: "nuqloud-branded-advanced",
        name: "NuQloud Branded Advanced",
        description:
          "$350/month with a $1,000 one-time initial setup fee.",
        price: "$350",
        cadence: "/month",
        setupFee: "$1,000 one-time setup",
        summary: "500GB on-instance storage + 500GB decentralized publishing space.",
        publishingCredits: "25,000 initial publishing credits included.",
        bullets: [
          "Expansion options available",
          "Guaranteed functionality for 25+ very active accounts, or more less-active",
          "Access to early beta options",
        ],
      },
      {
        slug: "nuqloud-branded-enterprise",
        name: "NuQloud Branded Enterprise",
        description:
          "Multi-instance options starting at $1,500/month with a $3,500 one-time setup fee for an initial 3-instance configuration.",
        price: "$1,500",
        cadence: "/month",
        setupFee: "$3,500 one-time setup",
        summary: "1TB per instance + 1TB per instance decentralized publishing space.",
        publishingCredits: "100,000 initial publishing credits per instance.",
        bullets: [
          "Multiple expansion options",
          "Cross-communication, cross-instance sharing, conversations, and meetings between instances",
          "Access to early beta options",
        ],
      },
    ],
  },
];

const topNavSections = pageSections.filter((section) => section.topNav);

const initialFeatureStoryProgress = Object.fromEntries(
  featureStories.map((story) => [story.id, 0]),
) as Record<(typeof featureStories)[number]["id"], number>;

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

function renderFeatureScene(
  scene: (typeof featureStories)[number]["scene"],
  progress: number,
  successLabel: string,
) {
  const sceneStyles = {
    ["--sc-story-progress" as string]: progress.toFixed(3),
  } as CSSProperties;
  const showSuccess = progress > 0.72;

  switch (scene) {
    case "sync":
      return (
        <Box
          className="sc-story-scene sc-story-scene--sync"
          style={sceneStyles}
        >
          <Box className="sc-story-node sc-story-node--file">
            <InsertDriveFileRoundedIcon fontSize="medium" />
          </Box>
          <Box className="sc-story-node sc-story-node--folder">
            <FolderRoundedIcon fontSize="medium" />
          </Box>
          <Box className="sc-story-node sc-story-node--sync-icon">
            <SyncRoundedIcon fontSize="medium" />
          </Box>
          <Box className={`sc-story-badge ${showSuccess ? "is-visible" : ""}`}>
            <CheckCircleRoundedIcon fontSize="small" />
            {successLabel}
          </Box>
        </Box>
      );
    case "share":
      return (
        <Box
          className="sc-story-scene sc-story-scene--share"
          style={sceneStyles}
        >
          <Box className="sc-story-node sc-story-node--document">
            <DescriptionRoundedIcon fontSize="medium" />
          </Box>
          <Box className="sc-story-node sc-story-node--share-icon">
            <ShareRoundedIcon fontSize="medium" />
          </Box>
          <Box className="sc-story-node sc-story-node--team">
            <GroupsRoundedIcon fontSize="medium" />
          </Box>
          <Box className="sc-story-ghost-card sc-story-ghost-card--one" />
          <Box className="sc-story-ghost-card sc-story-ghost-card--two" />
          <Box className={`sc-story-badge ${showSuccess ? "is-visible" : ""}`}>
            <CheckCircleRoundedIcon fontSize="small" />
            {successLabel}
          </Box>
        </Box>
      );
    case "communicate":
      return (
        <Box
          className="sc-story-scene sc-story-scene--communicate"
          style={sceneStyles}
        >
          <Box className="sc-story-node sc-story-node--message">
            <ForumRoundedIcon fontSize="medium" />
          </Box>
          <Box className="sc-story-node sc-story-node--call">
            <CallRoundedIcon fontSize="medium" />
          </Box>
          <Box className="sc-story-node sc-story-node--audience">
            <GroupsRoundedIcon fontSize="medium" />
          </Box>
          <Box className="sc-story-ring sc-story-ring--one" />
          <Box className="sc-story-ring sc-story-ring--two" />
          <Box className={`sc-story-badge ${showSuccess ? "is-visible" : ""}`}>
            <CheckCircleRoundedIcon fontSize="small" />
            {successLabel}
          </Box>
        </Box>
      );
    case "publish":
      return (
        <Box
          className="sc-story-scene sc-story-scene--publish"
          style={sceneStyles}
        >
          <Box className="sc-story-node sc-story-node--publish-file">
            <DescriptionRoundedIcon fontSize="medium" />
          </Box>
          <Box className="sc-story-node sc-story-node--publish-hub">
            <HubRoundedIcon fontSize="medium" />
          </Box>
          <Box className="sc-story-node sc-story-node--publish-node-a">
            <PublicRoundedIcon fontSize="small" />
          </Box>
          <Box className="sc-story-node sc-story-node--publish-node-b">
            <CloudRoundedIcon fontSize="small" />
          </Box>
          <Box className="sc-story-node sc-story-node--publish-node-c">
            <ShieldRoundedIcon fontSize="small" />
          </Box>
          <Box className={`sc-story-badge ${showSuccess ? "is-visible" : ""}`}>
            <CheckCircleRoundedIcon fontSize="small" />
            {successLabel}
          </Box>
        </Box>
      );
  }
}

function App() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>(
    pageSections[0].id,
  );
  const [featureStoryProgress, setFeatureStoryProgress] = useState(
    initialFeatureStoryProgress,
  );
  const { contextActionFeedback, openOrCopyInternetLink } = useAccessContext();
  const isDark = theme === EnumTheme.DARK;

  const pageMotionStyles = useMemo(
    () =>
      ({
        ["--sc-parallax-y" as string]: `${Math.round(scrollY * 0.08)}px`,
        ["--sc-parallax-soft" as string]: `${Math.round(scrollY * 0.04)}px`,
        ["--sc-spin-a" as string]: `${Math.round((scrollY * 0.05) % 360)}deg`,
        ["--sc-spin-b" as string]: `${Math.round((scrollY * -0.03) % 360)}deg`,
        ["--sc-spin-c" as string]: `${Math.round((scrollY * 0.07) % 360)}deg`,
        ["--sc-depth" as string]: `${(1 + Math.sin(scrollY / 260) * 0.04).toFixed(3)}`,
      }) as CSSProperties,
    [scrollY],
  );

  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".sc-reveal"),
    );
    if (!items.length) {
      return;
    }

    items.forEach((item, index) => {
      item.style.setProperty("--sc-delay", `${Math.min(index * 56, 420)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nextY = window.scrollY || window.pageYOffset || 0;
      setScrollY(nextY);

      const maxScrollable = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      setScrollProgress(Math.min(nextY / maxScrollable, 1));

      const viewportMid = window.innerHeight * 0.5;
      let nextActive: string = pageSections[0].id;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const section of pageSections) {
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

      const nextFeatureProgress = { ...initialFeatureStoryProgress };
      const stickyTop = getStoryStickyTop(
        window.innerWidth,
        window.innerHeight,
      );
      const completionTravelFactor = window.innerWidth <= 720 ? 0.8 : 0.84;

      for (const story of featureStories) {
        const stageEl = document.getElementById(`feature-story-${story.id}`);
        if (!stageEl) {
          continue;
        }

        const rect = stageEl.getBoundingClientRect();
        const panelEl = stageEl.querySelector<HTMLElement>(".sc-story-panel");
        const panelHeight = panelEl?.offsetHeight ?? 0;
        const stageHeight = stageEl.offsetHeight;
        const pinnedTravel = Math.max(stageHeight - panelHeight, 1);
        const entryStartTop = window.innerHeight;
        const progressStartTop = entryStartTop;
        const progressEndTop =
          stickyTop - pinnedTravel * completionTravelFactor;
        const progress = clampProgress(
          (progressStartTop - rect.top) / (progressStartTop - progressEndTop),
        );
        nextFeatureProgress[story.id] = progress;
      }
      setFeatureStoryProgress(nextFeatureProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handlePlanCheckout = useCallback(
    (planSlug?: string) => {
      const normalizedSlug = String(planSlug || "").trim();
      const url = normalizedSlug ? PLAN_CHECKOUT_URLS[normalizedSlug] || "" : "";
      if (!url) {
        return;
      }
      void openOrCopyInternetLink(url);
    },
    [openOrCopyInternetLink],
  );

  const handlePlanDetails = useCallback(
    (planSlug?: string) => {
      const normalizedSlug = String(planSlug || "").trim();
      const checkoutUrl = normalizedSlug
        ? PLAN_CHECKOUT_URLS[normalizedSlug] || ""
        : "";
      const detailsUrl = checkoutUrl.replace(/\/checkout\/?$/, "");
      if (!detailsUrl) {
        return;
      }
      void openOrCopyInternetLink(detailsUrl);
    },
    [openOrCopyInternetLink],
  );

  const handleSalesAction = useCallback(() => {
    void openOrCopyInternetLink(CONTACT_TICKET_URL);
  }, [openOrCopyInternetLink]);

  return (
    <Box
      className={`sc-page sc-page--msp ${isDark ? "sc-theme-dark" : "sc-theme-light"}`}
      style={pageMotionStyles}
    >
      <Box
        className="sc-scroll-progress"
        aria-hidden
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
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
        {pageSections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`sc-progress-dot ${activeSection === section.id ? "is-active" : ""}`}
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
                    className={`sc-nav-btn ${activeSection === section.id ? "is-active" : ""}`}
                    onClick={() => scrollToId(section.id)}
                    size="small"
                  >
                    {section.label}
                  </Button>
                ))}
              </Stack>
              <Button
                component={Link}
                to="/self-hosting"
                size="small"
                className="sc-nav-link"
              >
                Self-Hosting
              </Button>
              <Button
                className="sc-btn-primary sc-nav-cta"
                size="small"
                onClick={() => scrollToId("plans")}
              >
                View Plans
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

          <section className="sc-hero sc-home-hero sc-reveal" id="overview">
            <Box className="sc-hero-copy">
              <Typography variant="overline" className="sc-kicker">
                Managed Private Cloud
              </Typography>
              <Typography variant="h1" className="sc-headline">
                Your Private Cloud, Without Big Tech.
              </Typography>
              <Typography variant="body1" className="sc-subline">
                Secure file storage, collaboration, messaging, and backups on
                infrastructure built for privacy, control, and resilience.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.2}
                className="sc-hero-actions"
              >
                <Button
                  className="sc-btn-primary"
                  onClick={() => scrollToId("plans")}
                >
                  View Plans
                </Button>
              </Stack>
              <Typography className="sc-home-support-copy">
                For individuals, teams, and organizations that want a simpler
                private cloud.
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
            </Box>
            <Box className="sc-hero-art">
              <Box className="sc-home-hero-stack">
                <img
                  src={BRAND_HERO_LOGO}
                  alt="NuQloud private cloud platform"
                  className="sc-hero-image"
                />
                <Card className="sc-card sc-home-hero-panel">
                  <CardContent>
                    <Typography className="sc-card-label">
                      What You Get
                    </Typography>
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
            </Box>
          </section>

          <section className="sc-section" id="about">
            <Typography variant="h2" className="sc-section-title sc-reveal">
              What is NuQloud
            </Typography>
            <Typography
              variant="body1"
              className="sc-section-subtitle sc-reveal"
            >
              NuQloud is designed to feel simpler, more private, and more
              unified than the patchwork most people are used to.
            </Typography>
            <Box className="sc-two-col sc-home-intro-grid">
              <Card className="sc-card sc-reveal">
                <CardContent>
                  <Typography className="sc-card-label">
                    What is NuQloud
                  </Typography>
                  <Typography className="sc-feature-copy">
                    NuQloud, for most, will feel like a simpler, more private
                    cloud. You will still have familiar day-to-day features you
                    expect from a cloud provider, but everything in one unified
                    interface and many things not offered by the big tech
                    providers.
                  </Typography>
                </CardContent>
              </Card>
              <Card className="sc-card sc-reveal">
                <CardContent>
                  <Typography className="sc-card-label">
                    Included In The Experience
                  </Typography>
                  <Box
                    component="ul"
                    className="sc-detail-list sc-home-checklist"
                  >
                    <Box component="li" className="sc-detail-item">
                      Secure file storage, sync, and sharing
                    </Box>
                    <Box component="li" className="sc-detail-item">
                      Collaboration, office workflows, and team organization
                    </Box>
                    <Box component="li" className="sc-detail-item">
                      Messaging, calls, and communication tools
                    </Box>
                    <Box component="li" className="sc-detail-item">
                      Managed backups, support, and growth paths
                    </Box>
                    <Box component="li" className="sc-detail-item">
                      Much more beyond the standard cloud checklist
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </section>

          <section className="sc-section" id="features">
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
                const replacementCrossed = progress > 0.74;
                return (
                  <Box
                    className="sc-story-stage"
                    id={`feature-story-${story.id}`}
                    key={story.id}
                  >
                    <Card
                      className={`sc-card sc-story-panel ${replacementExpanded ? "is-open" : ""}`}
                      style={
                        {
                          ["--sc-story-progress" as string]:
                            sceneProgress.toFixed(3),
                        } as CSSProperties
                      }
                    >
                      <CardContent className="sc-story-panel-content">
                        <Box className="sc-story-grid">
                          <Box className="sc-story-copy">
                            <Typography className="sc-card-label">
                              Capability {String(index + 1).padStart(2, "0")}
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
                                  className={`sc-story-bullet ${progress > 0.02 + stepIndex * bulletSpan ? "is-active" : ""}`}
                                  key={step}
                                >
                                  <CheckCircleRoundedIcon fontSize="small" />
                                  {step}
                                </Box>
                              ))}
                            </Box>
                            <Box
                              className={`sc-story-replacements ${replacementExpanded ? "is-expanded" : ""}`}
                            >
                              <Typography className="sc-story-replace-title">
                                REPLACE
                              </Typography>
                              <Box
                                className={`sc-story-replacements-stage ${replacementCardsVisible ? "is-visible" : ""} ${replacementCrossed ? "is-crossed" : ""}`}
                              >
                                <Box className="sc-story-replacements-grid">
                                  {story.replacements.map((replacement) => {
                                    return (
                                      <Box
                                        className="sc-story-replacement-card is-visible"
                                        key={replacement.label}
                                      >
                                        <img
                                          src={replacement.icon}
                                          alt={replacement.label}
                                          className="sc-story-provider-icon"
                                        />
                                        <Typography className="sc-story-provider-name">
                                          {replacement.label}
                                        </Typography>
                                      </Box>
                                    );
                                  })}
                                </Box>
                              </Box>
                              <Box sx={{ mt: 2 }}>
                                <Stack
                                  direction={{ xs: "column", sm: "row" }}
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
                                    onClick={() => scrollToId("plans")}
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
                              story.successLabel,
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          </section>

          <section className="sc-section" id="why">
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
                      <Box className="sc-home-icon-wrap sc-home-icon-wrap--section">
                        <Icon fontSize="small" />
                      </Box>
                      <Typography className="sc-home-card-title">
                        {card.title}
                      </Typography>
                      <Typography className="sc-mini-tease">
                        {card.body}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </section>

          <section className="sc-section" id="dedicated-cloud">
            <Typography variant="h2" className="sc-section-title sc-reveal">
              Choose the Right NuQloud Model
            </Typography>
            <Typography
              variant="body1"
              className="sc-section-subtitle sc-reveal"
            >
              Choose between hosted NuQloud accounts and fully branded private instances.
            </Typography>
            <Box className="sc-two-col">
              {serviceModels.map((model) => (
                <Card
                  className="sc-card sc-home-model-card sc-reveal"
                  key={model.id}
                >
                  <CardContent>
                    <Typography className="sc-card-label">
                      Service Model
                    </Typography>
                    <Typography className="sc-path-title">
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
                    <Button
                      className="sc-btn-ghost"
                      onClick={() => scrollToId("plans")}
                    >
                      {model.ctaLabel}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>

          <section className="sc-section" id="foundation">
            <Typography variant="h2" className="sc-section-title sc-reveal">
              A Simpler Cloud Stack
            </Typography>
            <Typography
              variant="body1"
              className="sc-section-subtitle sc-reveal"
            >
              NuQloud is built on proven private cloud software and enhanced
              with decentralized infrastructure options for resilience and
              publishing. That means you get the usability people expect, with
              more ownership and stronger long-term control.
            </Typography>
            <Box className="sc-two-col sc-home-foundation-grid">
              <Card className="sc-card sc-reveal">
                <CardContent>
                  <Typography className="sc-card-label">
                    Technology Foundation
                  </Typography>
                  <Typography className="sc-feature-copy">
                    Nextcloud provides the familiar private-cloud layer for
                    files, collaboration, and day-to-day workflows. Qortal adds
                    optional infrastructure capabilities for resilience,
                    publishing, and broader independence.
                  </Typography>
                  <Typography className="sc-mini-tease">
                    Need the self-hosted path instead of managed service? The
                    self-hosting plugin path is launching soon for teams running
                    their own infrastructure.
                  </Typography>
                  <Button
                    component={Link}
                    to="/self-hosting"
                    className="sc-btn-ghost"
                  >
                    See Self-Hosting Path
                  </Button>
                </CardContent>
              </Card>
              <Box className="sc-home-foundation-stack">
                {foundationHighlights.map((item) => (
                  <Card className="sc-card sc-reveal" key={item.title}>
                    <CardContent>
                      <Typography className="sc-home-card-title">
                        {item.title}
                      </Typography>
                      <Typography className="sc-mini-tease">
                        {item.body}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </section>

          <section className="sc-section" id="plans">
            <Typography variant="h2" className="sc-section-title sc-reveal">
              Simple Plans
            </Typography>
            <Typography
              variant="body1"
              className="sc-section-subtitle sc-reveal"
            >
              From accounts on existing NuQloud run instances, to your own fully
              branded and managed cloud built specifically for your
              organization, the choice is yours!
            </Typography>
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
              {planGroups.map((group) => (
                <Box key={group.id} className="sc-plan-section sc-reveal">
                  <Box className="sc-plan-section-head">
                    <Typography className="sc-path-title">
                      {group.title}
                    </Typography>
                  </Box>
                  {"intro" in group && group.intro ? (
                    <Typography className="sc-mini-tease sc-plan-group-intro">
                      {group.intro}
                    </Typography>
                  ) : null}
                  <Box className="sc-plan-grid">
                    {group.plans.map((plan) => (
                      <Card className="sc-card sc-plan-card" key={plan.slug}>
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
                            {"price" in plan && plan.price ? (
                              <Box className="sc-plan-price-wrap">
                                <Typography className="sc-plan-price">
                                  {plan.price}
                                  <Box component="span" className="sc-plan-cadence">
                                    {plan.cadence || ""}
                                  </Box>
                                </Typography>
                                {"setupFee" in plan && plan.setupFee ? (
                                  <Typography className="sc-plan-setup">
                                    {plan.setupFee}
                                  </Typography>
                                ) : null}
                              </Box>
                            ) : null}
                          </Box>
                          {"summary" in plan && plan.summary ? (
                            <Typography className="sc-plan-summary">
                              {plan.summary}
                            </Typography>
                          ) : null}
                          {"publishingCredits" in plan && plan.publishingCredits ? (
                            <Typography className="sc-plan-credits">
                              {plan.publishingCredits}
                            </Typography>
                          ) : null}
                          {"bullets" in plan && Array.isArray(plan.bullets) && plan.bullets.length ? (
                            <Box component="ul" className="sc-detail-list sc-plan-detail-list">
                              {plan.bullets.map((item) => (
                                <Box component="li" className="sc-detail-item" key={item}>
                                  {item}
                                </Box>
                              ))}
                            </Box>
                          ) : null}
                          {"note" in plan && plan.note ? (
                            <Typography className="sc-plan-note">
                              {plan.note}
                            </Typography>
                          ) : null}
                          <Box className="sc-plan-actions">
                            <Button
                              className="sc-btn-primary sc-plan-buy-btn"
                              onClick={() => handlePlanCheckout(plan.slug)}
                            >
                              Buy Now
                            </Button>
                            <Button
                              className="sc-btn-link sc-plan-detail-link"
                              onClick={() => handlePlanDetails(plan.slug)}
                            >
                              View Details
                            </Button>
                            {"teamSlug" in plan && plan.teamSlug ? (
                              <Button
                                className="sc-btn-link sc-plan-team-link"
                                onClick={() => handlePlanDetails(plan.teamSlug)}
                              >
                                {plan.teamLabel || "View Team Version"}
                              </Button>
                            ) : null}
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Box>
              ))}
            </Stack>
          </section>

          <section className="sc-cta sc-reveal" id="contact">
            <Typography variant="h3" className="sc-cta-title">
              Have Questions? Need something specific? Reach out.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.2}
              justifyContent="center"
            >
              <Button className="sc-btn-primary" onClick={handleSalesAction}>
                Contact
              </Button>
            </Stack>
          </section>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
