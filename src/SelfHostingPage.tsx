import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
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
  type ElementType,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import dashboardOverviewImage from "./assets/interface-gallery/nuqloud-dashboard-overview.png";
import filesPublishApprovalImage from "./assets/interface-gallery/nuqloud-files-publish-approval.png";
import filesPublishStatusImage from "./assets/interface-gallery/nuqloud-files-publish-status.png";
import liveDocumentCollaborationImage from "./assets/interface-gallery/nuqloud-live-document-collaboration.png";
import qdeckAccessImage from "./assets/interface-gallery/nuqloud-qdeck-access.png";
import qmailAccessImage from "./assets/interface-gallery/nuqloud-qmail-access.png";
import sharedFileInConversationImage from "./assets/interface-gallery/nuqloud-shared-file-in-conversation.png";
import { BRAND_HEADER_LOGO } from "./brandAssets";
import { useAccessContext } from "./hooks/useAccessContext";
import { EnumTheme, themeAtom } from "./state/global/system";
import "./App.css";

const sectionNav = [
  { id: "plugin-overview", label: "Home", shortLabel: "Hm" },
  { id: "plugin-about", label: "About", shortLabel: "Abt" },
  { id: "plugin-features", label: "Features", shortLabel: "Feat" },
  { id: "plugin-addons", label: "Add-ons", shortLabel: "Adds" },
  { id: "plugin-architecture", label: "Architecture", shortLabel: "Arch" },
  { id: "plugin-screenshots", label: "Screenshots", shortLabel: "Shots" },
  { id: "plugin-launch", label: "Launch", shortLabel: "Launch" },
] as const;

const MOBILE_COMPACT_BREAKPOINT = 720;

const heroHighlights = [
  "Core plugin package plus add-ons",
  "Qortal-native workflows inside Nextcloud",
  "Pre-launch documentation and screenshots available now",
];

type PluginFeature = {
  title: string;
  body: string;
  Icon: ElementType;
};

const pluginQuickWins: readonly PluginFeature[] = [
  {
    title: "Qortal Account Dashboard",
    body: "Live account status, purchases, decentralized app notifications, send flows, and decentralized-auth-file backup handling.",
    Icon: HubRoundedIcon,
  },
  {
    title: "Q-Apps + QDN Access",
    body: "Embedded Q-Apps browser, gateway-aware routing, theme passthrough, and in-view browser controls for Qortal apps and websites.",
    Icon: AppsRoundedIcon,
  },
  {
    title: "Publishing + Bridge Workflows",
    body: "QDN file publishing, Q-Manager-compatible filesystem updates, and Talk bridge controls from inside Nextcloud.",
    Icon: PublicRoundedIcon,
  },
];

const pluginCoreFeatures: readonly PluginFeature[] = [
  {
    title: "Identity Linking + Auth",
    body: "Link existing Qortal identities or import backup/seed-based credentials directly into the authenticated Nextcloud experience.",
    Icon: LockRoundedIcon,
  },
  {
    title: "Dashboard + Purchases",
    body: "One dashboard for linked-account state, publish credits, add-ons, announcements, and live account actions.",
    Icon: InsightsRoundedIcon,
  },
  {
    title: "Q-Apps Launcher",
    body: "Open Qortal apps and websites inside Nextcloud with mobile-aware controls, browser actions, and wallet-auth integration.",
    Icon: WebRoundedIcon,
  },
  {
    title: "Files Publishing",
    body: "Publish files and folders to QDN with Q-Manager-compatible filesystem updates, publish-state tracking, and activity visibility.",
    Icon: StorageRoundedIcon,
  },
  {
    title: "Talk Bridge",
    body: "Map Nextcloud Talk conversations to Qortal groups with relay, diagnostics, and in-context mapping controls.",
    Icon: ForumRoundedIcon,
  },
  {
    title: "Operational Controls",
    body: "Admin and personal settings for bridge behavior, Q-Apps approvals, purchases, app visibility, branding, and diagnostics.",
    Icon: SettingsSuggestRoundedIcon,
  },
];

type AddonCard = {
  name: string;
  type: string;
  body: string;
  routes: readonly string[];
};

const addonCards: readonly AddonCard[] = [
  {
    name: "qortal_files_bridge",
    type: "Add-on app",
    body: "Adds Files UI publish/delete actions, status indicators, QDN activity hooks, and Q-Manager-compatible filesystem publishing behavior.",
    routes: ["/apps/files", "/apps/qortal_files_bridge"],
  },
  {
    name: "qortal_talk_bridge",
    type: "Add-on app",
    body: "Adds Talk conversation mapping, relay controls, admin diagnostics, and moderator-scoped bridge management.",
    routes: ["/apps/qortal_talk_bridge/admin", "Talk sidebar integration"],
  },
  {
    name: "custom_pwa",
    type: "Add-on app",
    body: "Provides a branded instance-wide PWA install page, manifest, service worker, and device registration hooks for the cloud experience.",
    routes: ["/apps/custom_pwa/install", "/apps/custom_pwa/manifest.json"],
  },
];

type DiagramNode = {
  title: string;
  body: string;
  Icon: ElementType;
};

const architectureNodes: readonly DiagramNode[] = [
  {
    title: "Nextcloud Interface",
    body: "Users stay inside normal Nextcloud pages, files, Talk, settings, and dashboard surfaces.",
    Icon: ApartmentRoundedIcon,
  },
  {
    title: "NuQloud for Nextcloud",
    body: "The core plugin handles identity linking, Q-Apps, dashboard actions, and Qortal-aware UX.",
    Icon: HubRoundedIcon,
  },
  {
    title: "Optional Add-ons",
    body: "Files bridge, Talk bridge, and branded PWA install extend the core package without exposing CHD-only tooling.",
    Icon: AutoAwesomeRoundedIcon,
  },
  {
    title: "Broker + External Auth",
    body: "Authenticated calls route through the broker and External Auth layer for wallet, permissions, and publish operations.",
    Icon: AccountTreeRoundedIcon,
  },
  {
    title: "Qortal Node + QDN",
    body: "Publishing, Q-Apps, and distributed data access land on Qortal-native infrastructure and QDN services.",
    Icon: LanRoundedIcon,
  },
];

const pluginDataPoints = [
  { label: "Core plugin packages", value: "1" },
  { label: "User-facing add-on apps", value: "3" },
  { label: "Primary user surfaces", value: "Dashboard • Q-Apps • Files • Talk" },
  { label: "Launch state", value: "Pre-launch / near-term release" },
];

type PluginScreenshot = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  highlights: readonly string[];
  image: string;
  imageAlt: string;
  Icon: ElementType;
};

const pluginScreenshots: readonly PluginScreenshot[] = [
  {
    id: "dashboard",
    eyebrow: "Core Surface",
    title: "Qortal-aware Dashboard",
    body: "The main dashboard blends normal cloud account workflows with Qortal account status, purchases, publish credits, and distributed-app access.",
    highlights: [
      "Linked-account visibility",
      "Purchases and subscriptions",
      "Publish credits",
      "Decentralized auth file actions",
    ],
    image: dashboardOverviewImage,
    imageAlt: "NuQloud dashboard overview showing app actions and account sections.",
    Icon: HubRoundedIcon,
  },
  {
    id: "publish",
    eyebrow: "Files Bridge",
    title: "Publish Files With QDN Status Tracking",
    body: "Files can be published to QDN directly from the Files experience, while status indicators stay visible in the same workflow.",
    highlights: [
      "Publish file/folder actions",
      "QDN state indicators",
      "Q-Manager-compatible filesystem publish",
      "Activity visibility",
    ],
    image: filesPublishStatusImage,
    imageAlt: "Files list showing QDN publish status icons.",
    Icon: PublicRoundedIcon,
  },
  {
    id: "approval",
    eyebrow: "Controlled Publishing",
    title: "Approve Publish With Qortal Nomenclature",
    body: "Publishing uses Qortal-native naming, publish-credit expectations, and approval flows without hiding what is happening.",
    highlights: [
      "Publish credits",
      "QDN publish dialog",
      "Qortal terminology",
      "Pre-publish transparency",
    ],
    image: filesPublishApprovalImage,
    imageAlt: "Publish approval dialog for a QDN file publish.",
    Icon: DataObjectRoundedIcon,
  },
  {
    id: "talk",
    eyebrow: "Talk Bridge",
    title: "Talk + Shared File Context",
    body: "Files and collaboration stay tied to live conversation context, which is exactly where the Talk bridge layer becomes useful.",
    highlights: [
      "Conversation-attached files",
      "Shared discussion context",
      "Talk bridge support",
      "Cross-surface collaboration",
    ],
    image: sharedFileInConversationImage,
    imageAlt: "Shared file inside an active conversation.",
    Icon: ForumRoundedIcon,
  },
  {
    id: "qapps",
    eyebrow: "Q-Apps",
    title: "Launch Qortal Apps Without Leaving The Cloud",
    body: "Q-Apps and Qortal websites remain accessible from inside the plugin, so decentralized tools feel like first-class cloud surfaces.",
    highlights: [
      "In-view browser controls",
      "Gateway-aware loading",
      "QDN app access",
      "Unified cloud workflow",
    ],
    image: qdeckAccessImage,
    imageAlt: "Q-Deck Q-App opened from the cloud environment.",
    Icon: AppsRoundedIcon,
  },
  {
    id: "mail",
    eyebrow: "Q-Mail",
    title: "Access Native Qortal Communication Surfaces",
    body: "The plugin is not limited to files and Talk. It also acts as a launch surface for additional Qortal-native communication tools.",
    highlights: [
      "Q-Mail access",
      "Decentralized communication",
      "Unified access point",
      "Plugin-driven launch surface",
    ],
    image: qmailAccessImage,
    imageAlt: "Q-Mail opened inside the cloud experience.",
    Icon: ImageRoundedIcon,
  },
  {
    id: "collaboration",
    eyebrow: "Collaboration",
    title: "Keep Normal Cloud Collaboration Intact",
    body: "The plugin upgrades Nextcloud instead of replacing it, so normal shared editing and collaboration still remain part of the story.",
    highlights: [
      "Live document collaboration",
      "Nextcloud-native editing",
      "Bridge-compatible workflows",
      "No forced platform switch",
    ],
    image: liveDocumentCollaborationImage,
    imageAlt: "Live document collaboration inside the cloud interface.",
    Icon: ApartmentRoundedIcon,
  },
];

const launchChecklist = [
  "Plugin package is not launched yet; this page exists to document capabilities ahead of release.",
  "Current screenshots and descriptions are pulled from implemented repo functionality, not speculative feature copy.",
  "Core package focus is qortal_integration, with user-facing add-ons for Files, Talk, and branded PWA install.",
  "CHD admin functionality is intentionally excluded from the product-facing plugin presentation.",
];

function SelfHostingPage() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>(sectionNav[0].id);
  const [activeScreenshotId, setActiveScreenshotId] = useState(
    pluginScreenshots[0].id,
  );
  const [isCompactMobile, setIsCompactMobile] = useState(
    () => window.innerWidth <= MOBILE_COMPACT_BREAKPOINT,
  );
  const { accessContext, contextActionFeedback } = useAccessContext();
  const isDark = theme === EnumTheme.DARK;

  const pageMotionStyles = useMemo(
    () =>
      ({
        ["--sc-parallax-y" as string]: `${Math.round(scrollY * 0.11)}px`,
        ["--sc-parallax-soft" as string]: `${Math.round(scrollY * 0.05)}px`,
        ["--sc-spin-a" as string]: `${Math.round((scrollY * -0.08) % 360)}deg`,
        ["--sc-spin-b" as string]: `${Math.round((scrollY * 0.05) % 360)}deg`,
        ["--sc-spin-c" as string]: `${Math.round((scrollY * -0.12) % 360)}deg`,
        ["--sc-depth" as string]: `${(1 + Math.sin(scrollY / 180) * 0.06).toFixed(3)}`,
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
      item.style.setProperty("--sc-delay", `${Math.min(index * 48, 320)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -12% 0px" },
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

      const probe = window.innerHeight * 0.34;
      let nextActive: string = sectionNav[0].id;
      for (const section of sectionNav) {
        const sectionEl = document.getElementById(section.id);
        if (!sectionEl) {
          continue;
        }
        const rect = sectionEl.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom >= probe) {
          nextActive = section.id;
          break;
        }
      }
      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsCompactMobile(window.innerWidth <= MOBILE_COMPACT_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const activeScreenshot =
    pluginScreenshots.find((item) => item.id === activeScreenshotId) ??
    pluginScreenshots[0];

  return (
    <Box
      className={`sc-page sc-page--plugin ${isDark ? "sc-theme-dark" : "sc-theme-light"}`}
      style={pageMotionStyles}
    >
      <Box
        className="sc-scroll-progress"
        aria-hidden
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <Box className="sc-bg-orb sc-bg-orb-a" />
      <Box className="sc-bg-orb sc-bg-orb-b" />
      <Box className="sc-bg-grid sc-bg-grid--circle" />
      <Box className="sc-bg-vignette" />
      <Box className="sc-geo-layer is-left" aria-hidden>
        <Box className="sc-geo sc-geo-ring" />
        <Box className="sc-geo sc-geo-cube" />
        <Box className="sc-geo sc-geo-diamond" />
        <Box className="sc-geo sc-geo-trail" />
      </Box>

      <Box className="sc-progress-rail sc-progress-rail--left" aria-hidden>
        {sectionNav.map((section) => (
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
          <Box
            className={`sc-topbar sc-reveal ${isCompactMobile ? "is-mobile-compact" : ""}`}
          >
            <Stack direction="row" spacing={1.2} alignItems="center">
              <img
                src={BRAND_HEADER_LOGO}
                alt="NuQloud"
                className="sc-top-logo"
              />
              <Typography variant="subtitle1" className="sc-top-title">
                NuQloud for Nextcloud
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={0.8}
              alignItems="center"
              className="sc-nav-actions"
            >
              <Stack direction="row" spacing={0.6} className="sc-nav-mini">
                {sectionNav.map((section) => (
                  <Button
                    key={section.id}
                    className={`sc-nav-btn ${activeSection === section.id ? "is-active" : ""}`}
                    onClick={() => scrollToId(section.id)}
                    size="small"
                  >
                    {isCompactMobile ? section.shortLabel : section.label}
                  </Button>
                ))}
              </Stack>
              <Button
                component={Link}
                to="/"
                size="small"
                className="sc-nav-link"
              >
                {isCompactMobile ? "MSP" : <>NuQloud MSP <HomeRoundedIcon fontSize="small" /></>}
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

          <Box
            className={`sc-context-bar ${accessContext.mode === "gateway" ? "is-gateway" : ""} sc-reveal`}
          >
            <Chip size="small" label="Access Context" className="sc-chip" />
            <Typography className="sc-context-copy">
              {accessContext.label}: {accessContext.detail}
            </Typography>
          </Box>

          <section className="sc-hero sc-reveal" id="plugin-overview">
            <Box className="sc-hero-copy">
              <Typography variant="overline" className="sc-kicker">
                Pre-Launch • NuQloud for Nextcloud • Powered by Qortal
              </Typography>
              <Typography variant="h1" className="sc-headline">
                A major Nextcloud upgrade layer for Qortal-native workflows.
              </Typography>
              <Typography variant="body1" className="sc-subline">
                NuQloud for Nextcloud brings Qortal identity, Q-Apps, QDN file
                publishing, and Talk bridge capabilities into the standard
                Nextcloud experience. The plugin package is not launched yet,
                but this page documents the implemented functionality and
                release direction ahead of launch.
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" className="sc-home-chip-row">
                {heroHighlights.map((item) => (
                  <Chip key={item} className="sc-chip sc-home-chip" label={item} />
                ))}
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.2}
                className="sc-hero-actions"
              >
                <Button
                  className="sc-btn-primary"
                  onClick={() => scrollToId("plugin-features")}
                >
                  Review Feature Map
                </Button>
                <Button
                  className="sc-btn-ghost"
                  onClick={() => scrollToId("plugin-launch")}
                >
                  Launch Status
                </Button>
              </Stack>
              <Box className="sc-runtime-panel sc-plugin-status-banner">
                <Typography className="sc-runtime-title">
                  Launch Status
                </Typography>
                <Typography variant="caption" className="sc-runtime-note">
                  Pre-launch site only: screenshots and capability notes are
                  here now so adopters can evaluate the plugin before release.
                </Typography>
                {contextActionFeedback ? (
                  <Typography
                    variant="caption"
                    className="sc-runtime-action-note"
                  >
                    {contextActionFeedback}
                  </Typography>
                ) : null}
              </Box>
            </Box>

            <Box className="sc-hero-art">
              <Box className="sc-home-hero-panel">
                <Card className="sc-card sc-home-model-card sc-home-model-card--accounts">
                  <CardContent>
                    <Box className="sc-capability-head">
                      <Box className="sc-home-icon-wrap sc-home-icon-wrap--section">
                        <HubRoundedIcon fontSize="small" />
                      </Box>
                      <Typography className="sc-home-model-title">
                        Core plugin package
                      </Typography>
                    </Box>
                    <Typography className="sc-home-support-copy">
                      `qortal_integration` provides the dashboard, Q-Apps,
                      account linking, approvals, launch surfaces, and product
                      controls. User-facing add-ons extend it rather than
                      replacing it.
                    </Typography>
                    <Stack className="sc-home-foundation-stack">
                      {pluginQuickWins.map((item) => (
                        <Box key={item.title} className="sc-home-highlight-row">
                          <Box className="sc-home-icon-wrap">
                            <item.Icon fontSize="small" />
                          </Box>
                          <Box>
                            <Typography className="sc-home-card-title">
                              {item.title}
                            </Typography>
                            <Typography className="sc-mini-tease">
                              {item.body}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </section>

          <section className="sc-section sc-reveal" id="plugin-about">
            <Typography variant="h2" className="sc-section-title">
              What this plugin changes
            </Typography>
            <Typography className="sc-section-subtitle">
              This is not a generic branding layer. It adds Qortal-aware
              surfaces, auth flows, dashboard behavior, QDN publishing, and
              bridge functionality directly into Nextcloud while preserving the
              normal cloud workflows users already understand.
            </Typography>
            <Box className="sc-card-grid sc-home-intro-grid">
              {pluginDataPoints.map((item) => (
                <Card className="sc-card sc-plugin-metric-card" key={item.label}>
                  <CardContent>
                    <Typography className="sc-card-label">
                      {item.label}
                    </Typography>
                    <Typography className="sc-plugin-metric-value">
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>

          <section className="sc-section sc-reveal" id="plugin-features">
            <Typography variant="h2" className="sc-section-title">
              Core functionality
            </Typography>
            <Typography className="sc-section-subtitle">
              The naming here intentionally follows Qortal terminology. The
              plugin is for Nextcloud, but the decentralized functionality is
              Qortal-native and should be described clearly.
            </Typography>
            <Box className="sc-card-grid">
              {pluginCoreFeatures.map((item) => (
                <Card className="sc-card" key={item.title}>
                  <CardContent>
                    <Box className="sc-capability-head">
                      <Box className="sc-home-icon-wrap sc-home-icon-wrap--section">
                        <item.Icon fontSize="small" />
                      </Box>
                      <Typography className="sc-home-card-title">
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography className="sc-feature-copy">
                      {item.body}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>

          <section className="sc-section sc-reveal" id="plugin-addons">
            <Typography variant="h2" className="sc-section-title">
              User-facing add-ons
            </Typography>
            <Typography className="sc-section-subtitle">
              These add-ons extend the core package. CHD admin tooling is
              intentionally excluded here because it is not part of the
              customer-facing product.
            </Typography>
            <Box className="sc-card-grid">
              {addonCards.map((addon) => (
                <Card className="sc-card sc-plugin-addon-card" key={addon.name}>
                  <CardContent>
                    <Typography className="sc-card-label">
                      {addon.type}
                    </Typography>
                    <Box className="sc-capability-head">
                      <Box className="sc-home-icon-wrap sc-home-icon-wrap--section">
                        <AutoAwesomeRoundedIcon fontSize="small" />
                      </Box>
                      <Typography className="sc-home-card-title">
                        {addon.name}
                      </Typography>
                    </Box>
                    <Typography className="sc-feature-copy">
                      {addon.body}
                    </Typography>
                    <Box className="sc-showcase-chip-grid sc-plugin-route-row">
                      {addon.routes.map((route) => (
                        <span className="sc-showcase-chip" key={route}>
                          {route}
                        </span>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>

          <section className="sc-section sc-reveal" id="plugin-architecture">
            <Typography variant="h2" className="sc-section-title">
              Architecture and flow
            </Typography>
            <Typography className="sc-section-subtitle">
              The core upgrade path is straightforward: users stay in
              Nextcloud, the plugin and add-ons handle Qortal-aware workflows,
              brokered auth resolves wallet and permissions, and Qortal
              services handle QDN, Q-Apps, and decentralized data.
            </Typography>
            <Box className="sc-plugin-diagram-grid">
              {architectureNodes.map((node, index) => (
                <Box className="sc-plugin-diagram-step" key={node.title}>
                  <Card className="sc-card sc-plugin-diagram-node">
                    <CardContent>
                      <Box className="sc-capability-head">
                        <Box className="sc-home-icon-wrap sc-home-icon-wrap--section">
                          <node.Icon fontSize="small" />
                        </Box>
                        <Typography className="sc-home-card-title">
                          {node.title}
                        </Typography>
                      </Box>
                      <Typography className="sc-feature-copy">
                        {node.body}
                      </Typography>
                    </CardContent>
                  </Card>
                  {index < architectureNodes.length - 1 ? (
                    <Box className="sc-plugin-diagram-arrow" aria-hidden>
                      <span />
                    </Box>
                  ) : null}
                </Box>
              ))}
            </Box>
            <Box className="sc-two-col sc-plugin-diagram-notes">
              <Card className="sc-card">
                <CardContent>
                  <Typography className="sc-card-label">
                    QDN publishing path
                  </Typography>
                  <Typography className="sc-feature-copy">
                    Files publish workflows target QDN, use Qortal auth,
                    support Q-Manager-compatible filesystem updates, and keep
                    publish-state visibility in the Files UI.
                  </Typography>
                </CardContent>
              </Card>
              <Card className="sc-card">
                <CardContent>
                  <Typography className="sc-card-label">
                    Talk bridge path
                  </Typography>
                  <Typography className="sc-feature-copy">
                    Talk mappings and relay controls stay inside Nextcloud while
                    the bridge layer handles the Qortal-side connection logic
                    and operational diagnostics.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </section>

          <section className="sc-section sc-reveal" id="plugin-screenshots">
            <Typography variant="h2" className="sc-section-title">
              Screenshots and implemented surfaces
            </Typography>
            <Typography className="sc-section-subtitle">
              These screenshots come from implemented areas in the repo and are
              included here to show how the plugin upgrades the existing
              Nextcloud experience in practice.
            </Typography>
            <Box className="sc-showcase-grid">
              <Box className="sc-showcase-list">
                {pluginScreenshots.map((slide) => (
                  <button
                    key={slide.id}
                    type="button"
                    className={`sc-showcase-tab ${activeScreenshot.id === slide.id ? "is-active" : ""}`}
                    onClick={() => setActiveScreenshotId(slide.id)}
                  >
                    <Box className="sc-showcase-frame-icon">
                      <slide.Icon fontSize="small" />
                    </Box>
                    <Box className="sc-showcase-tab-copy">
                      <Typography className="sc-card-label">
                        {slide.eyebrow}
                      </Typography>
                      <Typography className="sc-home-card-title">
                        {slide.title}
                      </Typography>
                      <Typography className="sc-mini-tease">
                        {slide.body}
                      </Typography>
                    </Box>
                  </button>
                ))}
              </Box>

              <Card className="sc-card sc-showcase-preview">
                <CardContent>
                  <Typography className="sc-card-label">
                    {activeScreenshot.eyebrow}
                  </Typography>
                  <Typography className="sc-showcase-preview-title">
                    {activeScreenshot.title}
                  </Typography>
                  <Typography className="sc-feature-copy">
                    {activeScreenshot.body}
                  </Typography>
                  <Box className="sc-showcase-frame">
                    <Box className="sc-showcase-frame-bar">
                      <span className="sc-showcase-dot" />
                      <span className="sc-showcase-dot" />
                      <span className="sc-showcase-dot" />
                    </Box>
                    <Box className="sc-showcase-frame-body">
                      <Box className="sc-showcase-screenshot-shell">
                        <img
                          className="sc-showcase-screenshot"
                          src={activeScreenshot.image}
                          alt={activeScreenshot.imageAlt}
                        />
                        <span className="sc-showcase-screenshot-hint">
                          Implemented Surface
                        </span>
                      </Box>
                      <Box className="sc-showcase-chip-grid">
                        {activeScreenshot.highlights.map((highlight) => (
                          <span className="sc-showcase-chip" key={highlight}>
                            {highlight}
                          </span>
                        ))}
                      </Box>
                    </Box>
                  </Box>

                  {isCompactMobile ? (
                    <Box className="sc-showcase-mobile-tabs">
                      {pluginScreenshots.map((slide) => (
                        <button
                          key={`${slide.id}-mobile`}
                          type="button"
                          className={`sc-showcase-tab sc-showcase-tab--mobile ${activeScreenshot.id === slide.id ? "is-active" : ""}`}
                          onClick={() => setActiveScreenshotId(slide.id)}
                        >
                          <Box className="sc-showcase-frame-icon sc-home-icon-wrap--mobile-tab">
                            <slide.Icon fontSize="small" />
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
                      ))}
                    </Box>
                  ) : null}
                </CardContent>
              </Card>
            </Box>
          </section>

          <section className="sc-cta sc-reveal" id="plugin-launch">
            <Typography variant="h3" className="sc-cta-title">
              Pre-launch now, release soon.
            </Typography>
            <Typography className="sc-cta-copy">
              NuQloud for Nextcloud is not launched yet. This page exists so
              teams can understand the product, review implemented add-ons, and
              prepare for release without waiting for the launch day announcement.
            </Typography>
            <Box className="sc-plugin-launch-list">
              {launchChecklist.map((item) => (
                <Box className="sc-plugin-launch-item" key={item}>
                  <RocketLaunchRoundedIcon fontSize="small" />
                  <Typography>{item}</Typography>
                </Box>
              ))}
            </Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.2}
              justifyContent="center"
              className="sc-inline-actions"
            >
              <Button
                className="sc-btn-primary"
                onClick={() => scrollToId("plugin-addons")}
              >
                Review Add-ons
              </Button>
              <Button className="sc-btn-ghost" component={Link} to="/">
                Return To NuQloud MSP
              </Button>
            </Stack>
          </section>
        </Box>
      </Container>
    </Box>
  );
}

export default SelfHostingPage;
