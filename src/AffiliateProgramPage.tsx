import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
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
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import { useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_HEADER_LOGO } from './brandAssets';
import { AffiliateSpaceScene } from './components/AffiliateSpaceScene';
import { useAccessContext } from './hooks/useAccessContext';
import { EnumTheme, themeAtom } from './state/global/system';
import './App.css';

const PAYMENT_LOGIN_URL = 'https://payment.crowetic.com/login';
const PAYMENT_REGISTER_URL = 'https://payment.crowetic.com/register';
const QORTAL_CHDC_URL = 'qortal://CHDC';
const heroHighlights = [
  'Recurring commissions',
  'NuQloud + CHD eligible offers',
  'Dashboard-based code tracking',
];

const heroMetrics = [
  {
    label: 'Early adopter tier',
    value: '7-10%',
    detail: 'First 100 affiliates and existing CHD customers.',
    Icon: RocketLaunchRoundedIcon,
  },
  {
    label: 'Standard tier',
    value: '5%',
    detail: 'Base recurring commission for all other affiliates.',
    Icon: CampaignRoundedIcon,
  },
  {
    label: 'Minimum payout',
    value: '$50',
    detail: 'Monthly by default, with weekly options for qualifying partners.',
    Icon: CurrencyExchangeRoundedIcon,
  },
];

const commissionTiers = [
  {
    title: 'Early Adopter',
    rate: '7-10%',
    eligibility: 'First 100 affiliates plus existing CHD customers.',
    bullets: [
      'Recurring commissions on active referrals',
      'Higher starting rate from day one',
      'Ideal for early launch partners and customer advocates',
    ],
  },
  {
    title: 'Standard',
    rate: '5%',
    eligibility: 'All approved affiliates outside the early-adopter pool.',
    bullets: [
      'Recurring commissions while referrals remain active',
      'Can scale through multiple ongoing referrals',
      'Default entry tier for new affiliates',
    ],
  },
  {
    title: 'Premium',
    rate: 'Negotiated',
    eligibility: 'High-volume referrers evaluated case by case.',
    bullets: [
      'Custom commission discussions',
      'Weekly payout eligibility for larger partners',
      'Direct relationship and support path',
    ],
  },
];

const payoutCards = [
  {
    label: 'Threshold',
    title: '$50 minimum payout',
    points: [
      'Payouts begin once the balance reaches $50 USD or equivalent.',
      'Threshold applies across active earned commissions.',
    ],
  },
  {
    label: 'Frequency',
    title: 'Monthly by default',
    points: [
      'Standard affiliates are paid monthly.',
      'High-volume partners may qualify for weekly payouts.',
    ],
  },
  {
    label: 'Methods',
    title: 'Fiat or QORT',
    points: [
      'Fiat options may include bank transfer, PayPal, and similar methods depending on region.',
      'QORT payouts are available globally.',
      'A QORT payout bonus is planned but still TBD.',
    ],
  },
  {
    label: 'Restrictions',
    title: 'Location-aware payouts',
    points: [
      'Some payout methods may be restricted by geography.',
      'Payment method availability is reviewed case by case.',
    ],
  },
];

const trackingCards = [
  {
    label: 'Codes',
    title: 'Auto-generated or custom',
    points: [
      'NuQloud and CHD can generate affiliate codes automatically.',
      'Affiliates can also create their own custom code in the dashboard.',
    ],
  },
  {
    label: 'Dashboard',
    title: 'Managed in the payment portal',
    points: [
      'Visit payment.crowetic.com and open Account -> Affiliates.',
      'Track code activity and commission reporting from your account.',
    ],
  },
  {
    label: 'Attribution Window',
    title: 'Tracking duration TBD',
    points: [
      'Final cookie/window settings are still being finalized.',
      'Current recommendation is a minimum 30-90 day referral window.',
    ],
  },
];

const promotionCards = [
  {
    title: 'Primary focus: NuQloud products',
    body: 'All offers in the NuQloud section are intended to be core affiliate targets.',
  },
  {
    title: 'Secondary eligible offers: CHD services',
    body: 'Crowetic Holdings services are also eligible where approved under the program.',
  },
];

const gettingStartedSteps = [
  {
    step: '01',
    title: 'Create your account',
    points: [
      'Visit payment.crowetic.com.',
      'Register a new account and complete your basic profile.',
    ],
  },
  {
    step: '02',
    title: 'Generate your affiliate code',
    points: [
      'Open Dashboard -> Account -> Affiliates.',
      'Create the affiliate code you want to share.',
    ],
  },
  {
    step: '03',
    title: 'Start promoting and tracking',
    points: [
      'Share your referral link or code.',
      'Monitor referrals and commissions from the dashboard.',
    ],
  },
];

const specialPrograms = [
  {
    title: 'Early Adopter Bonus',
    points: [
      'The first 100 affiliates are elevated automatically.',
      'Those affiliates begin at the 7-10% tier instead of the 5% base rate.',
    ],
  },
  {
    title: 'Existing CHD Customers',
    points: [
      'Existing CHD customers receive priority notification.',
      'They also start in the elevated 7-10% range.',
    ],
  },
  {
    title: 'High-Volume Partners',
    points: [
      'Custom commission structures are available for large referrers.',
      'Weekly payouts and direct support can be offered when qualified.',
    ],
  },
];

const marketingSupport = [
  {
    title: 'Currently available',
    points: [
      'Affiliate tracking dashboard',
      'Unique referral codes',
      'Commission reporting',
    ],
  },
  {
    title: 'Coming soon',
    points: [
      'Marketing materials such as banners and email templates',
      'Tiered bonus structures',
      'Coordinated promotional campaigns',
    ],
  },
];

const termsCards = [
  {
    title: 'Eligibility',
    points: [
      'An active account at payment.crowetic.com is required.',
      'Affiliates must comply with applicable laws and regulations.',
      'Fraudulent activity results in disqualification.',
    ],
  },
  {
    title: 'Commission protection',
    points: [
      'Commissions continue while the referred user remains active.',
      'Chargebacks, abuse, or fraud can void payouts.',
    ],
  },
  {
    title: 'Program modifications',
    points: [
      'NuQloud may modify rates and terms with reasonable notice.',
      'Existing referrals retain their commission rate.',
    ],
  },
];

function AffiliateProgramPage() {
  const [theme, setTheme] = useAtom(themeAtom);
  const isDark = theme === EnumTheme.DARK;
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [isQortalAffiliateDialogOpen, setIsQortalAffiliateDialogOpen] =
    useState(false);
  const { accessContext, openOrCopyInternetLink, openQortalLink } =
    useAccessContext();
  const isQdnMode = accessContext.mode === 'qdn';

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
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleAffiliatePortalAction = useCallback(
    (url: string) => {
      if (isQdnMode) {
        setIsQortalAffiliateDialogOpen(true);
        return;
      }

      void openOrCopyInternetLink(url);
    },
    [isQdnMode, openOrCopyInternetLink]
  );

  const closeQortalAffiliateDialog = useCallback(() => {
    setIsQortalAffiliateDialogOpen(false);
  }, []);

  return (
    <Box
      className={`sc-page sc-page--msp sc-page--affiliate ${isDark ? 'sc-theme-dark' : 'sc-theme-light'}`}
    >
      <AffiliateSpaceScene
        isDark={isDark}
        reducedMotion={prefersReducedMotion}
      />

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
                NuQloud Affiliate Program
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
                Home
              </Button>
              <Button
                component={Link}
                to="/self-hosting"
                size="small"
                className="sc-nav-link"
              >
                Self-Hosting
              </Button>
              <Button
                component={Link}
                to="/terms"
                size="small"
                className="sc-nav-link"
              >
                Terms
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

          <section className="sc-hero sc-reveal" id="affiliate-overview">
            <Box className="sc-hero-copy">
              <Typography variant="overline" className="sc-kicker">
                NuQloud Affiliate Program
              </Typography>
              <Typography variant="h1" className="sc-headline">
                Earn recurring commissions by referring NuQloud and CHD
                services.
              </Typography>
              <Typography variant="body1" className="sc-subline">
                The NuQloud Affiliate Program is built for partners who want
                ongoing commission revenue from active customer referrals across
                NuQloud cloud offers and related Crowetic Holdings products.
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                className="sc-affiliate-chip-row"
              >
                {heroHighlights.map((item) => (
                  <Chip
                    key={item}
                    className="sc-chip sc-home-chip"
                    label={item}
                  />
                ))}
              </Stack>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.2}
                className="sc-hero-actions sc-affiliate-hero-actions"
              >
                <Button
                  className="sc-btn-primary"
                  onClick={() => handleAffiliatePortalAction(PAYMENT_LOGIN_URL)}
                >
                  Login
                </Button>
                <Typography className="sc-affiliate-auth-divider">
                  or
                </Typography>
                <Button
                  className="sc-btn-ghost"
                  onClick={() =>
                    handleAffiliatePortalAction(PAYMENT_REGISTER_URL)
                  }
                >
                  Register
                </Button>
                <Button className="sc-btn-ghost" component={Link} to="/">
                  View NuQloud Plans
                </Button>
              </Stack>
            </Box>

            <Box className="sc-hero-art">
              <Card className="sc-card sc-affiliate-hero-panel">
                <CardContent>
                  <Typography className="sc-runtime-title">
                    Program Snapshot
                  </Typography>
                  <Stack spacing={1} className="sc-affiliate-metric-list">
                    {heroMetrics.map((metric) => {
                      const Icon = metric.Icon;

                      return (
                        <Box
                          className="sc-affiliate-metric-row"
                          key={metric.label}
                        >
                          <Box className="sc-home-icon-wrap sc-home-icon-wrap--section">
                            <Icon fontSize="small" />
                          </Box>
                          <Box className="sc-affiliate-metric-copy">
                            <Typography className="sc-affiliate-metric-label">
                              {metric.label}
                            </Typography>
                            <Typography className="sc-affiliate-metric-value">
                              {metric.value}
                            </Typography>
                            <Typography className="sc-mini-tease">
                              {metric.detail}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </section>

          <section className="sc-section">
            <Typography className="sc-section-title sc-reveal">
              Commission Structure
            </Typography>
            <Typography className="sc-section-subtitle sc-reveal">
              Earn recurring commissions for as long as referred users remain
              active, with higher launch tiers for early supporters and existing
              CHD customers.
            </Typography>
            <Box className="sc-card-grid">
              {commissionTiers.map((tier) => (
                <Card className="sc-card sc-reveal" key={tier.title}>
                  <CardContent>
                    <Typography className="sc-card-label">
                      {tier.title}
                    </Typography>
                    <Typography className="sc-home-card-title">
                      {tier.rate}
                    </Typography>
                    <Typography className="sc-affiliate-card-copy">
                      {tier.eligibility}
                    </Typography>
                    <Box component="ul" className="sc-detail-list">
                      {tier.bullets.map((point) => (
                        <Box
                          component="li"
                          className="sc-detail-item"
                          key={point}
                        >
                          {point}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>

          <section className="sc-section">
            <Typography className="sc-section-title sc-reveal">
              Payout Terms
            </Typography>
            <Box className="sc-two-col">
              {payoutCards.map((card) => (
                <Card className="sc-card sc-reveal" key={card.title}>
                  <CardContent>
                    <Typography className="sc-card-label">
                      {card.label}
                    </Typography>
                    <Typography className="sc-home-card-title">
                      {card.title}
                    </Typography>
                    <Box component="ul" className="sc-detail-list">
                      {card.points.map((point) => (
                        <Box
                          component="li"
                          className="sc-detail-item"
                          key={point}
                        >
                          {point}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>

          <section className="sc-section">
            <Typography className="sc-section-title sc-reveal">
              Tracking and Attribution
            </Typography>
            <Box className="sc-card-grid">
              {trackingCards.map((card, index) => {
                const sectionIcons = [
                  TravelExploreRoundedIcon,
                  GroupsRoundedIcon,
                  VerifiedUserRoundedIcon,
                ];
                const Icon = sectionIcons[index] || VerifiedUserRoundedIcon;

                return (
                  <Card className="sc-card sc-reveal" key={card.title}>
                    <CardContent>
                      <Box className="sc-capability-head">
                        <Box className="sc-home-icon-wrap sc-home-icon-wrap--section">
                          <Icon fontSize="small" />
                        </Box>
                        <Box>
                          <Typography className="sc-card-label">
                            {card.label}
                          </Typography>
                          <Typography className="sc-home-card-title">
                            {card.title}
                          </Typography>
                        </Box>
                      </Box>
                      <Box component="ul" className="sc-detail-list">
                        {card.points.map((point) => (
                          <Box
                            component="li"
                            className="sc-detail-item"
                            key={point}
                          >
                            {point}
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </section>

          <section className="sc-section">
            <Typography className="sc-section-title sc-reveal">
              What Affiliates Can Promote
            </Typography>
            <Box className="sc-two-col">
              {promotionCards.map((card) => (
                <Card className="sc-card sc-reveal" key={card.title}>
                  <CardContent>
                    <Typography className="sc-card-label">
                      Eligible Products
                    </Typography>
                    <Typography className="sc-home-card-title">
                      {card.title}
                    </Typography>
                    <Typography className="sc-affiliate-card-copy">
                      {card.body}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>

          <section className="sc-section">
            <Typography className="sc-section-title sc-reveal">
              Getting Started
            </Typography>
            <Box className="sc-card-grid">
              {gettingStartedSteps.map((step) => (
                <Card className="sc-card sc-reveal" key={step.step}>
                  <CardContent>
                    <Box className="sc-affiliate-step-number">{step.step}</Box>
                    <Typography className="sc-home-card-title">
                      {step.title}
                    </Typography>
                    <Box component="ul" className="sc-detail-list">
                      {step.points.map((point) => (
                        <Box
                          component="li"
                          className="sc-detail-item"
                          key={point}
                        >
                          {point}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>

          <section className="sc-section">
            <Typography className="sc-section-title sc-reveal">
              Special Programs
            </Typography>
            <Box className="sc-card-grid">
              {specialPrograms.map((program) => (
                <Card className="sc-card sc-reveal" key={program.title}>
                  <CardContent>
                    <Typography className="sc-card-label">
                      Program Track
                    </Typography>
                    <Typography className="sc-home-card-title">
                      {program.title}
                    </Typography>
                    <Box component="ul" className="sc-detail-list">
                      {program.points.map((point) => (
                        <Box
                          component="li"
                          className="sc-detail-item"
                          key={point}
                        >
                          {point}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>

          <section className="sc-section">
            <Typography className="sc-section-title sc-reveal">
              Marketing Support
            </Typography>
            <Box className="sc-two-col">
              {marketingSupport.map((section) => (
                <Card className="sc-card sc-reveal" key={section.title}>
                  <CardContent>
                    <Typography className="sc-card-label">
                      Support Assets
                    </Typography>
                    <Typography className="sc-home-card-title">
                      {section.title}
                    </Typography>
                    <Box component="ul" className="sc-detail-list">
                      {section.points.map((point) => (
                        <Box
                          component="li"
                          className="sc-detail-item"
                          key={point}
                        >
                          {point}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>

          <section className="sc-section">
            <Typography className="sc-section-title sc-reveal">
              Terms and Conditions
            </Typography>
            <Box className="sc-card-grid">
              {termsCards.map((card) => (
                <Card className="sc-card sc-reveal" key={card.title}>
                  <CardContent>
                    <Typography className="sc-card-label">Policy</Typography>
                    <Typography className="sc-home-card-title">
                      {card.title}
                    </Typography>
                    <Box component="ul" className="sc-detail-list">
                      {card.points.map((point) => (
                        <Box
                          component="li"
                          className="sc-detail-item"
                          key={point}
                        >
                          {point}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>

          <section className="sc-cta sc-reveal">
            <Typography variant="h3" className="sc-cta-title">
              Ready to start referring NuQloud?
            </Typography>
            <Typography className="sc-cta-copy">
              Log in or register to manage your affiliate code and track
              referrals. In Qortal mode, direct affiliate and subscription
              tooling is still on the way, so CHDC remains the best place to
              follow updates for now.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.2}
              className="sc-affiliate-hero-actions"
            >
              <Button
                className="sc-btn-primary"
                onClick={() => handleAffiliatePortalAction(PAYMENT_LOGIN_URL)}
              >
                Login
              </Button>
              <Typography className="sc-affiliate-auth-divider">or</Typography>
              <Button
                className="sc-btn-ghost"
                onClick={() =>
                  handleAffiliatePortalAction(PAYMENT_REGISTER_URL)
                }
              >
                Register
              </Button>
              <Button className="sc-btn-ghost" component={Link} to="/">
                Back to NuQloud Plans
              </Button>
            </Stack>
            <Typography className="sc-affiliate-fineprint">
              Last Updated: March 30, 2026 • Version 1.0
            </Typography>
          </section>

          <Dialog
            open={isQortalAffiliateDialogOpen}
            onClose={closeQortalAffiliateDialog}
            maxWidth="sm"
            fullWidth
          >
            <DialogContent className="sc-qortal-purchase-dialog-content">
              <Typography className="sc-qortal-purchase-dialog-title">
                Qortal-native affiliate tools coming soon
              </Typography>
              <Typography className="sc-qortal-purchase-dialog-copy">
                Qortal-specific affiliate, subscription, and related account
                services are still being prepared. For now, open CHDC in Qortal
                to follow updates and future rollout details.
              </Typography>
              <Box className="sc-qortal-purchase-dialog-links">
                <Button
                  className="sc-btn-primary"
                  onClick={() => void openQortalLink(QORTAL_CHDC_URL)}
                >
                  Open CHDC
                </Button>
                <Button
                  className="sc-btn-link"
                  onClick={closeQortalAffiliateDialog}
                >
                  Close
                </Button>
              </Box>
              <Box className="sc-qortal-purchase-dialog-meta">
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
            </DialogContent>
          </Dialog>
        </Box>
      </Container>
    </Box>
  );
}

export default AffiliateProgramPage;
