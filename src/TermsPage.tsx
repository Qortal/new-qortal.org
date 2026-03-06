import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { Box, Button, Card, CardContent, Container, IconButton, Stack, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { EnumTheme, themeAtom } from './state/global/system';
import './App.css';

const sections = [
  {
    title: '1. Acceptance of Terms',
    points: [
      'By purchasing, accessing, or using CHD services, software, websites, or infrastructure, you agree to these Terms.',
      'If you do not agree, do not use CHD services.',
      'These Terms apply to managed cloud services, hosted infrastructure, software operations, and related support channels.',
    ],
  },
  {
    title: '2. Hardware Return Policy',
    points: [
      'Dead-on-arrival (DOA) claims must be submitted within 7 days of delivery.',
      'Issues reported within 30 days may be resolved by repair or replacement at CHD discretion.',
      'Refunds are limited to verified DOA units when no suitable replacement is available within 30 days.',
    ],
  },
  {
    title: '3. Service Responsibility and Privacy',
    points: [
      'Users are solely responsible for all data, content, and connectivity originating from their accounts/services.',
      'Diagnostic logs are retained only for operational support windows and are not shared except under valid legal order.',
      'Email and communication scanning, when enabled, is automated for abuse/security controls.',
    ],
  },
  {
    title: '4. Availability, Backups, and Recovery',
    points: [
      'CHD operates managed services with uptime-focused operations and recovery processes.',
      'Backups are maintained for platform continuity; users should also keep independent backups where critical.',
      'Downtime caused by unforeseen infrastructure failures may result in service-payment pause according to active service policy.',
    ],
  },
  {
    title: '5. Account Suspension and Termination',
    points: [
      'CHD may suspend or terminate accounts/services at its sole discretion, with or without cause.',
      'Upon termination, services may be deprovisioned and data availability may end immediately.',
      'Users are responsible for exporting required data before termination windows.',
    ],
  },
  {
    title: '6. Warranty and Service Disclaimer',
    points: [
      'Services are provided "as-is" and "as-available" except where explicit service guarantees are stated.',
      'CHD disclaims implied warranties including merchantability, fitness for a particular purpose, and non-infringement.',
      'Users are responsible for independent data controls where legally or operationally required.',
    ],
  },
  {
    title: '7. Prohibited Uses',
    points: [
      'Illegal, harmful, malicious, or abusive activities are prohibited.',
      'Spam, malware distribution, unauthorized access attempts, and unlawful hosting are prohibited.',
      'Violations may result in immediate termination without prior notice.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    points: [
      'To the maximum extent permitted by law, CHD is not liable for indirect, incidental, special, or consequential damages.',
      'Total liability is limited to amounts paid for the relevant service during the preceding 12 months.',
    ],
  },
  {
    title: '9. Dispute Resolution',
    points: [
      'CHD encourages direct dispute resolution first.',
      'If unresolved, arbitration is preferred prior to litigation.',
      'Legal proceedings, if required, are governed by Nevada jurisdiction terms below.',
    ],
  },
  {
    title: '10. Governing Law',
    points: [
      'These Terms are governed by the laws of the State of Nevada, United States.',
      'Venue for disputes is Washoe County, Nevada, unless otherwise required by applicable law.',
    ],
  },
  {
    title: '11. Reservation of Rights',
    points: [
      'All rights not expressly granted are reserved by CHD.',
      'Use of CHD services does not transfer ownership of CHD intellectual property.',
    ],
  },
  {
    title: '12. Changes to Terms',
    points: [
      'CHD may update these Terms at any time.',
      'Continued use after updates constitutes acceptance of revised Terms.',
    ],
  },
];

function TermsPage() {
  const [theme, setTheme] = useAtom(themeAtom);
  const isDark = theme === EnumTheme.DARK;

  return (
    <Box className={`sc-page sc-page--msp ${isDark ? 'sc-theme-dark' : 'sc-theme-light'}`}>
      <Box className="sc-bg-orb sc-bg-orb-a" />
      <Box className="sc-bg-orb sc-bg-orb-b" />
      <Box className="sc-bg-grid sc-bg-grid--square" />
      <Box className="sc-bg-vignette" />

      <Container maxWidth={false} disableGutters className="sc-shell">
        <Box className="sc-shell-inner">
          <Box className="sc-topbar sc-reveal is-visible">
            <Stack direction="row" spacing={1.2} alignItems="center">
              <img src="/logo-test.png" alt="Sovereign Cloud" className="sc-top-logo" />
              <Typography variant="subtitle1" className="sc-top-title">
                CHD Terms of Service
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.8} alignItems="center" className="sc-nav-actions">
              <Button component={Link} to="/" size="small" className="sc-nav-link">
                MSP
              </Button>
              <Button component={Link} to="/self-hosting" size="small" className="sc-nav-link">
                Self-Hosting
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

          <section className="sc-hero sc-reveal is-visible" id="terms-overview">
            <Box className="sc-hero-copy">
              <Typography variant="overline" className="sc-kicker">
                Terms of Service
              </Typography>
              <Typography variant="h1" className="sc-headline">
                Terms of Service for all CHD services
              </Typography>
              <Typography variant="body1" className="sc-subline">
                Effective Date: October 2025. Provider: Crowetic Hardware Development, LLC (CHD), Reno, Nevada, USA.
              </Typography>
              <Typography variant="body1" className="sc-subline">
                Contact: admin@crowetic.com | +1 (775) 442-2234 | Qortal Username: crowetic
              </Typography>
            </Box>
            <Box className="sc-hero-art" />
          </section>

          <section className="sc-section">
            <Typography variant="h2" className="sc-section-title sc-reveal is-visible">
              Full Terms
            </Typography>
            <Box className="sc-card-grid">
              {sections.map((section) => (
                <Card className="sc-card sc-reveal is-visible" key={section.title}>
                  <CardContent>
                    <Typography className="sc-detail-title">{section.title}</Typography>
                    <Box component="ul" className="sc-detail-list">
                      {section.points.map((point) => (
                        <Box component="li" className="sc-detail-item" key={point}>
                          {point}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </section>
        </Box>
      </Container>
    </Box>
  );
}

export default TermsPage;
