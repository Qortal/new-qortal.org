import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { BRAND_HEADER_LOGO } from './brandAssets';
import { EnumTheme, themeAtom } from './state/global/system';
import './App.css';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="h2" className="sc-section-title sc-reveal is-visible">
      {children}
    </Typography>
  );
}

function PricingTable({
  rows,
}: {
  rows: Array<{ label: string; price: string }>;
}) {
  return (
    <Box className="sc-pricing-table sc-reveal is-visible">
      <table>
        <thead>
          <tr>
            <th>Storage</th>
            <th style={{ textAlign: 'right' }}>Monthly Price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td style={{ textAlign: 'right' }}>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

function RedundancyTable() {
  const levels = [
    { level: 'Standard', preservation: '1 NuQloud node', multiplier: '1.0×' },
    {
      level: 'Redundant',
      preservation: '2–3 NuQloud nodes',
      multiplier: '1.75×',
    },
    {
      level: 'High Redundancy',
      preservation: '4–5 NuQloud nodes',
      multiplier: '2.5×',
    },
  ];

  return (
    <Box className="sc-pricing-table sc-reveal is-visible" sx={{ mt: 2 }}>
      <table>
        <thead>
          <tr>
            <th>Redundancy Level</th>
            <th>Preservation</th>
            <th style={{ textAlign: 'right' }}>Multiplier</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => (
            <tr key={level.level}>
              <td>{level.level}</td>
              <td>{level.preservation}</td>
              <td style={{ textAlign: 'right' }}>{level.multiplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

function RedundancyPricingTable() {
  const rows = [
    {
      level: 'Standard',
      calculation: '10GB × $0.35 × 1.0',
      price: '$3.50',
    },
    {
      level: 'Redundant',
      calculation: '10GB × $0.35 × 1.75',
      price: '$6.13',
    },
    {
      level: 'High Redundancy',
      calculation: '10GB × $0.35 × 2.5',
      price: '$8.75',
    },
  ];

  return (
    <Box className="sc-pricing-table sc-reveal is-visible" sx={{ mt: 2 }}>
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Calculation</th>
            <th style={{ textAlign: 'right' }}>Monthly Price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.level}>
              <td>{row.level}</td>
              <td>{row.calculation}</td>
              <td style={{ textAlign: 'right' }}>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

function ExamplePackageTable() {
  const items = [
    { label: '100GB Cloud Storage', price: '$20.00' },
    { label: '50GB Guaranteed QDN Storage', price: '$17.50' },
    {
      label: 'Redundant QDN Preservation, 1.75×',
      price: '$30.63 total QDN cost',
    },
  ];

  return (
    <Box className="sc-pricing-table sc-reveal is-visible" sx={{ mt: 2 }}>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th style={{ textAlign: 'right' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.label}>
              <td>{item.label}</td>
              <td style={{ textAlign: 'right' }}>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box sx={{ mt: 2, fontWeight: 700 }}>
        Total: <span style={{ color: 'primary.main' }}>$50.63 / month</span>
      </Box>
      <Box sx={{ mt: 1, fontSize: '0.9em', color: 'text.secondary' }}>
        Important calculation: 50GB × $0.35 × 1.75 = $30.63
      </Box>
    </Box>
  );
}

function StoragePage() {
  const [theme, setTheme] = useAtom(themeAtom);
  const isDark = theme === EnumTheme.DARK;

  return (
    <Box
      className={`sc-page sc-page--msp ${isDark ? 'sc-theme-dark' : 'sc-theme-light'}`}
    >
      <Box className="sc-bg-orb sc-bg-orb-a" />
      <Box className="sc-bg-orb sc-bg-orb-b" />
      <Box className="sc-bg-grid sc-bg-grid--square" />
      <Box className="sc-bg-vignette" />

      <Container maxWidth={false} disableGutters className="sc-shell">
        <Box className="sc-shell-inner">
          <Box className="sc-topbar sc-reveal is-visible">
            <Stack direction="row" spacing={1.2} alignItems="center">
              <img
                src={BRAND_HEADER_LOGO}
                alt="NuQloud"
                className="sc-top-logo"
              />
              <Typography variant="subtitle1" className="sc-top-title">
                NuQloud Storage & Decentralized Preservation
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
                NuQloud for Nextcloud
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

          <section
            className="sc-hero sc-reveal is-visible"
            id="storage-overview"
          >
            <Box className="sc-hero-copy">
              <Typography variant="overline" className="sc-kicker">
                Storage & Pricing
              </Typography>
              <Typography variant="h1" className="sc-headline">
                NuQloud Storage & Decentralized Preservation
              </Typography>
              <Typography variant="body1" className="sc-subline">
                NuQloud gives you private cloud storage and optional guaranteed
                decentralized QDN preservation — priced separately so users only
                pay for what they actually need.
              </Typography>
            </Box>
            <Box className="sc-hero-art" />
          </section>

          <section className="sc-section">
            <SectionHeading>Two Types of Storage</SectionHeading>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3,
                mt: 2,
              }}
            >
              <Box className="sc-reveal is-visible">
                <Typography
                  variant="h4"
                  className="sc-detail-title"
                  gutterBottom
                >
                  Cloud Storage
                </Typography>
                <Typography
                  variant="body1"
                  className="sc-detail-item"
                  paragraph
                >
                  Cloud Storage is your private NuQloud server-side storage.
                </Typography>
                <Typography
                  variant="body1"
                  className="sc-detail-item"
                  paragraph
                >
                  Use it for:
                </Typography>
                <Box component="ul" className="sc-detail-list">
                  {[
                    'Files',
                    'Sync',
                    'Sharing',
                    'Documents',
                    'Photos',
                    'Collaboration',
                    'Nextcloud apps',
                  ].map((item) => (
                    <Box component="li" className="sc-detail-item" key={item}>
                      {item}
                    </Box>
                  ))}
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, my: 2, color: 'primary.main' }}
                >
                  $0.20 per GB / month
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Example pricing:
                </Typography>
                <PricingTable
                  rows={[
                    { label: '10GB', price: '$2.00' },
                    { label: '25GB', price: '$5.00' },
                    { label: '100GB', price: '$20.00' },
                    { label: '500GB', price: '$100.00' },
                  ]}
                />
              </Box>

              <Box className="sc-reveal is-visible">
                <Typography
                  variant="h4"
                  className="sc-detail-title"
                  gutterBottom
                >
                  Guaranteed QDN Storage
                </Typography>
                <Typography
                  variant="body1"
                  className="sc-detail-item"
                  paragraph
                >
                  QDN Storage is decentralized data preservation for content
                  published to the Qortal Data Network.
                </Typography>
                <Typography
                  variant="body1"
                  className="sc-detail-item"
                  paragraph
                >
                  Publishing data to QDN is not the same as guaranteed storage.
                </Typography>
                <Typography
                  variant="body1"
                  className="sc-detail-item"
                  paragraph
                >
                  NuQloud can actively preserve your published QDN data by
                  following and storing data associated with your Qortal name.
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, my: 2, color: 'primary.main' }}
                >
                  $0.35 per GB / month
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Billing is based on actual utilized QDN storage by name.
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Example pricing:
                </Typography>
                <PricingTable
                  rows={[
                    { label: '10GB', price: '$3.50' },
                    { label: '25GB', price: '$8.75' },
                    { label: '100GB', price: '$35.00' },
                  ]}
                />
              </Box>
            </Box>
          </section>

          <section className="sc-section">
            <SectionHeading>Publishing Credits Are Not Storage</SectionHeading>
            <Box className="sc-reveal is-visible" sx={{ mt: 2 }}>
              <Typography variant="body1" className="sc-detail-item" paragraph>
                Publishing credits are required to publish data to QDN. A
                publish credit covers the publish transaction itself.
              </Typography>
              <Typography variant="body1" className="sc-detail-item" paragraph>
                Guaranteed QDN Storage is different. It means NuQloud actively
                preserves your published data on NuQloud-managed Qortal nodes.
              </Typography>
              <Typography variant="body1" className="sc-detail-item" paragraph>
                Without Guaranteed QDN Storage, published data may still exist
                on QDN, but NuQloud does not guarantee that it will remain
                available from NuQloud infrastructure.
              </Typography>
            </Box>
          </section>

          <section className="sc-section">
            <SectionHeading>Redundancy Guarantees</SectionHeading>
            <Box className="sc-reveal is-visible" sx={{ mt: 2 }}>
              <Typography variant="body1" className="sc-detail-item" paragraph>
                Redundancy determines how many NuQloud-controlled nodes preserve
                your QDN data.
              </Typography>
              <Typography variant="body1" className="sc-detail-item" paragraph>
                Redundancy is billed as a multiplier on actual utilized
                Guaranteed QDN Storage.
              </Typography>
              <RedundancyTable />
            </Box>
          </section>

          <section className="sc-section">
            <SectionHeading>Redundancy Pricing Example</SectionHeading>
            <Box className="sc-reveal is-visible" sx={{ mt: 2 }}>
              <Typography variant="body1" className="sc-detail-item" paragraph>
                For 10GB of Guaranteed QDN Storage:
              </Typography>
              <RedundancyPricingTable />
            </Box>
          </section>

          <section className="sc-section">
            <SectionHeading>Example Configuration</SectionHeading>
            <Box className="sc-reveal is-visible" sx={{ mt: 2 }}>
              <ExamplePackageTable />
            </Box>
          </section>

          <section className="sc-section">
            <SectionHeading>Recommended Terms</SectionHeading>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3,
                mt: 2,
              }}
            >
              <Box className="sc-reveal is-visible">
                <Typography
                  variant="h5"
                  className="sc-detail-title"
                  gutterBottom
                >
                  Use these terms:
                </Typography>
                <Box component="ul" className="sc-detail-list">
                  {[
                    'Cloud Storage',
                    'Guaranteed QDN Storage',
                    'QDN Publishing',
                    'Publishing Credits',
                    'Redundancy Level',
                    'Actual QDN Usage',
                    'Preserved by NuQloud Nodes',
                  ].map((term) => (
                    <Box component="li" className="sc-detail-item" key={term}>
                      {term}
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box className="sc-reveal is-visible">
                <Typography
                  variant="h5"
                  className="sc-detail-title"
                  gutterBottom
                >
                  Avoid these phrases:
                </Typography>
                <Box component="ul" className="sc-detail-list">
                  {[
                    'Unlimited QDN storage',
                    'Permanent storage',
                    'Stored forever',
                    'Free decentralized storage',
                    'Included decentralized storage without qualification',
                  ].map((phrase) => (
                    <Box component="li" className="sc-detail-item" key={phrase}>
                      {phrase}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box className="sc-reveal is-visible" sx={{ mt: 3 }}>
              <Typography
                variant="body1"
                sx={{ fontStyle: 'italic', color: 'text.secondary' }}
              >
                Guaranteed QDN Storage means NuQloud actively preserves your
                published QDN data while your subscription is active and your
                usage remains within your purchased storage limits.
              </Typography>
            </Box>
          </section>
        </Box>
      </Container>
    </Box>
  );
}

export default StoragePage;
