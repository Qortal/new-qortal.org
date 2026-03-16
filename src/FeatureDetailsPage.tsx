import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
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
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BRAND_HEADER_LOGO } from "./brandAssets";
import {
  FeatureStoryId,
  featureStoryDetails,
} from "./content/featureStoryDetails";
import { EnumTheme, themeAtom } from "./state/global/system";
import "./App.css";

function FeatureDetailsPage() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [scrollY, setScrollY] = useState(0);
  const { storyId } = useParams<{ storyId: FeatureStoryId }>();
  const isDark = theme === EnumTheme.DARK;

  const story = storyId ? featureStoryDetails[storyId] : undefined;

  useEffect(() => {
    const handleScroll = () => {
      const nextY = window.scrollY || window.pageYOffset || 0;
      setScrollY(nextY);
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
    window.scrollTo(0, 0);
  }, [storyId]);

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

  if (!story) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      className={`sc-page sc-page--msp ${isDark ? "sc-theme-dark" : "sc-theme-light"}`}
      style={pageMotionStyles}
    >
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

      <Container maxWidth={false} disableGutters className="sc-shell">
        <Box className="sc-shell-inner">
          <Box className="sc-topbar">
            <Stack direction="row" spacing={1.2} alignItems="center">
              <img
                src={BRAND_HEADER_LOGO}
                alt="NuQloud"
                className="sc-top-logo"
              />
              <Typography variant="subtitle1" className="sc-top-title">
                NuQloud Details
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={0.8}
              alignItems="center"
              className="sc-nav-actions"
            >
              <Button
                component={Link}
                to="/"
                size="small"
                className="sc-nav-link"
              >
                Back Home
              </Button>
              <Button
                component={Link}
                to="/self-hosting"
                size="small"
                className="sc-nav-link"
              >
                Self-Hosting
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

          <section className="sc-hero sc-detail-hero">
            <Box className="sc-hero-copy">
              <Typography variant="overline" className="sc-kicker">
                {story.kicker}
              </Typography>
              <Typography variant="h1" className="sc-headline">
                {story.title}
              </Typography>
              <Typography variant="body1" className="sc-subline">
                {story.summary}
              </Typography>
              <Typography className="sc-home-support-copy">
                {story.supportCopy}
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.2}
                className="sc-hero-actions"
              >
                <Button className="sc-btn-primary" component={Link} to="/">
                  <ArrowBackRoundedIcon fontSize="small" />
                  Back To Homepage
                </Button>
              </Stack>
            </Box>

            <Box className="sc-hero-art">
              <Card className="sc-card sc-detail-hero-panel">
                <CardContent>
                  <Typography className="sc-card-label">
                    Replaces Big-Tech Sprawl
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.7}
                    flexWrap="wrap"
                    className="sc-detail-chip-row"
                  >
                    {story.replaceSummary.map((item) => (
                      <Chip
                        key={item}
                        size="small"
                        label={item}
                        className="sc-chip sc-detail-chip"
                      />
                    ))}
                  </Stack>
                  <Typography className="sc-mini-tease">
                    Detailed sections below show the NuQloud layers involved in
                    this workflow and the surrounding platform capabilities that
                    support it.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </section>

          <section className="sc-section">
            <Typography variant="h2" className="sc-section-title">
              NuQloud Layers Involved
            </Typography>
            <Typography variant="body1" className="sc-section-subtitle">
              These are the core NuQloud layers that make this part of the
              platform work end to end.
            </Typography>
            <Box className="sc-two-col">
              {story.archivedSections.map((section) => (
                <Card className="sc-card" key={section.id}>
                  <CardContent>
                    <Typography className="sc-card-label">
                      Archived NuQloud Layer
                    </Typography>
                    <Typography className="sc-home-card-title">
                      {section.app}
                    </Typography>
                    <Typography className="sc-mini-tease">
                      Replaces {section.replaces}
                    </Typography>
                    <Box component="ul" className="sc-detail-list">
                      {section.details.map((item) => (
                        <Box
                          component="li"
                          className="sc-detail-item"
                          key={item}
                        >
                          {item}
                        </Box>
                      ))}
                    </Box>
                    <Typography className="sc-card-label sc-detail-inline-label">
                      Deeper Notes
                    </Typography>
                    <Box component="ul" className="sc-detail-list">
                      {section.deepDive.map((item) => (
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
              ))}
            </Box>
          </section>

          <section className="sc-section">
            <Typography variant="h2" className="sc-section-title">
              Included Capabilities
            </Typography>
            <Typography variant="body1" className="sc-section-subtitle">
              These platform capabilities are part of the wider NuQloud
              environment that supports this workflow.
            </Typography>
            <Box className="sc-card-grid">
              {story.includedCapabilities.map((section) => (
                <Card className="sc-card" key={section.id}>
                  <CardContent>
                    <Typography className="sc-card-label">
                      Capability Group
                    </Typography>
                    <Typography className="sc-home-card-title">
                      {section.title}
                    </Typography>
                    <Box component="ul" className="sc-detail-list">
                      {section.items.map((item) => (
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
              ))}
            </Box>
          </section>

          <section className="sc-section">
            <Typography variant="h2" className="sc-section-title">
              Deeper Infrastructure Context
            </Typography>
            <Typography variant="body1" className="sc-section-subtitle">
              These sections explain the off-network and resilience layers tied
              to this part of NuQloud.
            </Typography>
            <Box className="sc-two-col">
              {story.capabilitySections.map((section) => (
                <Card className="sc-card" key={section.title}>
                  <CardContent>
                    <Typography className="sc-card-label">Deep Dive</Typography>
                    <Typography className="sc-home-card-title">
                      {section.title.replace("Deep Dive: ", "")}
                    </Typography>
                    <Box component="ul" className="sc-detail-list">
                      {section.points.map((item) => (
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
              ))}
            </Box>
          </section>

          <section className="sc-cta" id="next">
            <Typography variant="h3" className="sc-cta-title">
              Need this explained in the context of your workflow?
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.2}
              justifyContent="center"
            >
              <Button className="sc-btn-primary" component={Link} to="/">
                Back To Homepage
              </Button>
              <Button className="sc-btn-ghost" component={Link} to="/self-hosting">
                Self-Hosting Path
              </Button>
            </Stack>
          </section>
        </Box>
      </Container>
    </Box>
  );
}

export default FeatureDetailsPage;
