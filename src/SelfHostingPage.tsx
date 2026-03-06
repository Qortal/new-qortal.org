import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
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

const PLUGIN_DOCS_URL = 'https://sovcloud.crowetic.com/#self-hosting';
const REPO_FEATURE_SCOPE_URL = 'https://sovcloud.crowetic.com/docs/v1-feature-scope';
const REPO_CONNECTOR_URL = 'https://sovcloud.crowetic.com/docs/connector-catalog-contract-v1';

const sectionNav = [
  { id: 'plugin-overview', label: 'Overview' },
  { id: 'plugin-features', label: 'Features' },
  { id: 'plugin-mappings', label: 'Bridge + Files' },
  { id: 'plugin-integrations', label: 'Integrations' },
  { id: 'plugin-next', label: 'Next Steps' },
];

const pluginFeatures = [
  'Decentralized account linking and sovereign identity entry points.',
  'Q-Apps dashboard and runtime-aware UX for gateway and QDN contexts.',
  'Qortal Talk bridge mapping with server relay and dedupe protections.',
  'Files publish bridge for direct folder/file publishing workflows.',
  'Admin/user settings paths for mappings, relay diagnostics, and controls.',
  'Catalog/package hooks for billing and service-tier visibility.',
];

function SelfHostingPage() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(sectionNav[0].id);
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
  }, []);

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
              <img src="/logo-test.png" alt="Sovereign Cloud" className="sc-top-logo" />
              <Typography variant="subtitle1" className="sc-top-title">
                Sovereign Plugin (Self-Hosting)
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
                MSP Primary <HomeRoundedIcon fontSize="small" />
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
                Self-Managed • Sovereign Plugins • Operator-Controlled
              </Typography>
              <Typography variant="h1" className="sc-headline">
                Deploy sovereign cloud functionality directly into your own Nextcloud stack.
              </Typography>
              <Typography variant="body1" className="sc-subline">
                This path is for operators who self-host and want Qortal integration features, file publish
                workflows, and Talk bridge controls while maintaining full infrastructure ownership.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} className="sc-hero-actions">
                <Button className="sc-btn-primary" onClick={() => openOrCopyInternetLink(PLUGIN_DOCS_URL)}>
                  Open / Copy Plugin Docs
                </Button>
                <Button className="sc-btn-ghost" component={Link} to="/">
                  Back To MSP Primary
                </Button>
              </Stack>
              <Box className="sc-runtime-panel">
                <Typography className="sc-runtime-title">Context-aware external links</Typography>
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
                alt="Sovereign plugin overview"
                className="sc-hero-image"
              />
            </Box>
          </section>

          <section className="sc-section sc-reveal" id="plugin-features">
            <Typography variant="h2" className="sc-section-title">
              Plugin Feature Coverage
            </Typography>
            <Box className="sc-card-grid">
              {pluginFeatures.map((item) => (
                <Card className="sc-card" key={item}>
                  <CardContent>
                    <Typography className="sc-feature-copy">{item}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>

          <section className="sc-section sc-reveal" id="plugin-mappings">
            <Typography variant="h2" className="sc-section-title">
              Bridge + Files Workflow Focus
            </Typography>
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
                    Publish file/folder flows tied to sovereign storage and activity-based user visibility.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </section>

          <section className="sc-section sc-reveal" id="plugin-integrations">
            <Typography variant="h2" className="sc-section-title">
              In-Depth Integration References
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} className="sc-inline-actions">
              <Button className="sc-btn-ghost" onClick={() => openOrCopyInternetLink(REPO_FEATURE_SCOPE_URL)}>
                Feature Scope Notes <OpenInNewRoundedIcon fontSize="small" />
              </Button>
              <Button className="sc-btn-ghost" onClick={() => openOrCopyInternetLink(REPO_CONNECTOR_URL)}>
                Connector Contract Notes <OpenInNewRoundedIcon fontSize="small" />
              </Button>
            </Stack>
          </section>

          <section className="sc-cta sc-reveal" id="plugin-next">
            <Typography variant="h3" className="sc-cta-title">
              Run self-hosted now, keep MSP path available.
            </Typography>
            <Typography className="sc-cta-copy">
              You can adopt plugin-first, then transition to managed deployment if your operational profile
              changes.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} justifyContent="center">
              <Button className="sc-btn-primary" onClick={() => openOrCopyInternetLink(PLUGIN_DOCS_URL)}>
                Open / Copy Plugin Docs
              </Button>
              <Button className="sc-btn-ghost" component={Link} to="/">
                Return To MSP Service Page
              </Button>
            </Stack>
          </section>
        </Box>
      </Container>
    </Box>
  );
}

export default SelfHostingPage;
