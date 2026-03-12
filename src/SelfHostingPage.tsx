import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
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
import { useAccessContext } from './hooks/useAccessContext';
import { EnumTheme, themeAtom } from './state/global/system';
import './App.css';

const PLUGIN_DOCS_URL = 'https://nuqloud.com/nextcloud';
const REPO_FEATURE_SCOPE_URL = 'https://nuqloud.com/features';
const REPO_CONNECTOR_URL = 'https://nuqloud.com/integrations';

const sectionNav = [
  { id: 'plugin-overview', label: 'Overview' },
  { id: 'plugin-features', label: 'Included' },
  { id: 'plugin-mappings', label: 'Bridge + Files' },
  { id: 'plugin-integrations', label: 'References' },
  { id: 'plugin-next', label: 'Start' },
];

const MOBILE_COMPACT_BREAKPOINT = 720;

const pluginFeatures = [
  'Simple account linking with decentralized identity support.',
  'Dashboard behavior that adapts to gateway and QDN access modes.',
  'Qortal Talk bridge mapping with relay and duplicate-protection controls.',
  'Files publish bridge for direct folder and file publishing workflows.',
  'Admin and user settings for mappings, relay diagnostics, and controls.',
  'Catalog and package hooks for billing and service-tier visibility.',
];

function SelfHostingPage() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(sectionNav[0].id);
  const [isCompactMobile, setIsCompactMobile] = useState(() => window.innerWidth <= MOBILE_COMPACT_BREAKPOINT);
  const [showFeatures, setShowFeatures] = useState(() => window.innerWidth > MOBILE_COMPACT_BREAKPOINT);
  const [showMappings, setShowMappings] = useState(() => window.innerWidth > MOBILE_COMPACT_BREAKPOINT);
  const [showReferences, setShowReferences] = useState(() => window.innerWidth > MOBILE_COMPACT_BREAKPOINT);
  const { accessContext, contextActionFeedback, openOrCopyInternetLink } = useAccessContext();
  const isDark = theme === EnumTheme.DARK;

  const pageMotionStyles = useMemo(
    () =>
      ({
        ['--sc-parallax-y' as string]: `${Math.round(scrollY * 0.11)}px`,
        ['--sc-parallax-soft' as string]: `${Math.round(scrollY * 0.05)}px`,
        ['--sc-spin-a' as string]: `${Math.round((scrollY * -0.08) % 360)}deg`,
        ['--sc-spin-b' as string]: `${Math.round((scrollY * 0.05) % 360)}deg`,
        ['--sc-spin-c' as string]: `${Math.round((scrollY * -0.12) % 360)}deg`,
        ['--sc-depth' as string]: `${(1 + Math.sin(scrollY / 180) * 0.06).toFixed(3)}`,
      }) as CSSProperties,
    [scrollY]
  );

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.sc-reveal'));
    if (!items.length) {
      return;
    }

    items.forEach((item, index) => {
      item.style.setProperty('--sc-delay', `${Math.min(index * 48, 320)}ms`);
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
  }, [showFeatures, showMappings, showReferences]);

  useEffect(() => {
    const handleScroll = () => {
      const nextY = window.scrollY || window.pageYOffset || 0;
      setScrollY(nextY);

      const maxScrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(nextY / maxScrollable, 1));

      const probe = window.innerHeight * 0.34;
      let nextActive = sectionNav[0].id;
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
        setShowFeatures(true);
        setShowMappings(true);
        setShowReferences(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <Box
      className={`sc-page sc-page--plugin ${isDark ? 'sc-theme-dark' : 'sc-theme-light'}`}
      style={pageMotionStyles}
    >
      <Box className="sc-scroll-progress" aria-hidden style={{ transform: `scaleX(${scrollProgress})` }} />
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
              <img src="/logo-test.png" alt="NuQloud" className="sc-top-logo" />
              <Typography variant="subtitle1" className="sc-top-title">
                NuQloud for Nextcloud
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
              <Button component={Link} to="/" size="small" className="sc-nav-link">
                NuQloud MSP <HomeRoundedIcon fontSize="small" />
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

          <section className="sc-hero sc-reveal" id="plugin-overview">
            <Box className="sc-hero-copy">
              <Typography variant="overline" className="sc-kicker">
                Self-Managed • Plugin Edition • Powered by Qortal
              </Typography>
              <Typography variant="h1" className="sc-headline">
                NuQloud for Nextcloud, powered by Qortal.
              </Typography>
              <Typography variant="body1" className="sc-subline">
                This path is for teams that self-host and want Qortal integration, file publishing workflows,
                and Talk bridge controls while keeping full infrastructure ownership.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} className="sc-hero-actions">
                <Button className="sc-btn-primary" onClick={() => openOrCopyInternetLink(PLUGIN_DOCS_URL)}>
                  Open / Copy Plugin Guide
                </Button>
                <Button className="sc-btn-ghost" component={Link} to="/">
                  Back To NuQloud MSP
                </Button>
              </Stack>
              <Box className="sc-runtime-panel">
                <Typography className="sc-runtime-title">How links behave in this context</Typography>
                <Typography variant="caption" className="sc-runtime-note">
                  Authenticated QDN context copies internet-only links; gateway/internet opens them directly.
                </Typography>
                {contextActionFeedback ? (
                  <Typography variant="caption" className="sc-runtime-action-note">
                    {contextActionFeedback}
                  </Typography>
                ) : null}
              </Box>
            </Box>
            <Box className="sc-hero-art">
              <img
                src={isDark ? '/advertising-dark.webp' : '/advertising-white.webp'}
                alt="NuQloud plugin overview"
                className="sc-hero-image"
              />
            </Box>
          </section>

          <section className="sc-section sc-reveal" id="plugin-features">
            <Typography variant="h2" className="sc-section-title">
              What You Get
            </Typography>
            {isCompactMobile ? (
              <Box className="sc-toggle-wrap">
                <Button className="sc-btn-ghost sc-btn-toggle" onClick={() => setShowFeatures((prev) => !prev)}>
                  {showFeatures ? 'Hide Included Features' : 'Show Included Features'}
                  {showFeatures ? <ExpandLessRoundedIcon fontSize="small" /> : <ExpandMoreRoundedIcon fontSize="small" />}
                </Button>
              </Box>
            ) : null}
            {showFeatures ? (
              <Box className="sc-card-grid">
                {pluginFeatures.map((item) => (
                  <Card className="sc-card" key={item}>
                    <CardContent>
                      <Typography className="sc-feature-copy">{item}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : null}
          </section>

          <section className="sc-section sc-reveal" id="plugin-mappings">
            <Typography variant="h2" className="sc-section-title">
              Bridge + Files Focus
            </Typography>
            {isCompactMobile ? (
              <Box className="sc-toggle-wrap">
                <Button className="sc-btn-ghost sc-btn-toggle" onClick={() => setShowMappings((prev) => !prev)}>
                  {showMappings ? 'Hide Workflow Details' : 'Show Workflow Details'}
                  {showMappings ? <ExpandLessRoundedIcon fontSize="small" /> : <ExpandMoreRoundedIcon fontSize="small" />}
                </Button>
              </Box>
            ) : null}
            {showMappings ? (
              <Box className="sc-two-col">
                <Card className="sc-card">
                  <CardContent>
                    <Typography className="sc-card-label">Talk Bridge</Typography>
                    <Typography className="sc-feature-copy">
                      Conversation mapping, relay direction controls, server relay diagnostics, and bridge-account
                      handling for Qortal ↔ Talk workflows.
                    </Typography>
                  </CardContent>
                </Card>
                <Card className="sc-card">
                  <CardContent>
                    <Typography className="sc-card-label">Files Bridge</Typography>
                    <Typography className="sc-feature-copy">
                      Publish file and folder flows tied to distributed storage and activity-based visibility.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ) : null}
          </section>

          <section className="sc-section sc-reveal" id="plugin-integrations">
            <Typography variant="h2" className="sc-section-title">
              Integration References
            </Typography>
            {isCompactMobile ? (
              <Box className="sc-toggle-wrap">
                <Button className="sc-btn-ghost sc-btn-toggle" onClick={() => setShowReferences((prev) => !prev)}>
                  {showReferences ? 'Hide Reference Links' : 'Show Reference Links'}
                  {showReferences ? <ExpandLessRoundedIcon fontSize="small" /> : <ExpandMoreRoundedIcon fontSize="small" />}
                </Button>
              </Box>
            ) : null}
            {showReferences ? (
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} className="sc-inline-actions">
                <Button className="sc-btn-ghost" onClick={() => openOrCopyInternetLink(REPO_FEATURE_SCOPE_URL)}>
                  Feature Scope Notes <OpenInNewRoundedIcon fontSize="small" />
                </Button>
                <Button className="sc-btn-ghost" onClick={() => openOrCopyInternetLink(REPO_CONNECTOR_URL)}>
                  Connector Contract Notes <OpenInNewRoundedIcon fontSize="small" />
                </Button>
              </Stack>
            ) : null}
          </section>

          <section className="sc-cta sc-reveal" id="plugin-next">
            <Typography variant="h3" className="sc-cta-title">
              Self-host now, keep the MSP path available.
            </Typography>
            <Typography className="sc-cta-copy">
              You can adopt plugin-first, then transition to managed deployment if your operational profile changes.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} justifyContent="center">
              <Button className="sc-btn-primary" onClick={() => openOrCopyInternetLink(PLUGIN_DOCS_URL)}>
                Open / Copy Plugin Guide
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
