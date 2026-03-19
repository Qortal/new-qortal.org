import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { BRAND_HEADER_LOGO } from "./brandAssets";
import { EnumTheme, themeAtom } from "./state/global/system";
import "./App.css";

const sections = [
  {
    title: "1. Acceptance of Terms",
    points: [
      "By purchasing, accessing, or using CHD services, software, websites, or infrastructure, you agree to these Terms.",
      "If you do not agree, do not use CHD services.",
      "These Terms apply to managed cloud services, hosted infrastructure, software operations, and related support channels.",
    ],
  },
  {
    title: "2. Hardware Return Policy",
    points: [
      "At present, NuQloud as a CHD service division does not generally include direct hardware delivery as part of its standard service packages unless hardware is explicitly stated in a separate agreement, package, invoice, or custom engagement.",
      "If CHD later offers hardware directly through NuQloud, or if a customer enters an explicit agreement that includes hardware, the following return and replacement terms apply to that hardware portion of the agreement.",
      "Dead-on-arrival (DOA) claims must be submitted within 7 days of delivery.",
      "Issues reported within 30 days may be resolved by repair or replacement at CHD discretion.",
      "Refunds are limited to verified DOA units when no suitable replacement is available within 30 days.",
    ],
  },
  {
    title: "3. Service Responsibility and Privacy",
    points: [
      "Users are solely responsible for all data, content, and connectivity originating from their accounts/services.",
      "For data stored on CHD-managed infrastructure or on a customer’s active NuQloud instance, CHD may process, store, transfer, and back up that data only as needed to operate, secure, maintain, and support the service.",
      "Diagnostic logs are retained only for operational support windows and are not shared except under valid legal order.",
      "Email and communication scanning, when enabled, is automated for abuse/security controls.",
    ],
  },
  {
    title: "4. On-Instance Data and QDN-Published Data",
    points: [
      "Data kept only on a CHD-managed instance or other CHD-controlled infrastructure is operationally distinct from data published to the Qortal Data Network (QDN).",
      "CHD may administer, migrate, back up, or remove on-instance data as required to operate the managed service, subject to these Terms and any active service commitments.",
      "CHD has zero access to, and no control over, private data published to QDN unless that data is explicitly made accessible by the publishing party outside of the default private-data model.",
      "Data published to QDN is created by, controlled by, and modifiable only by the account and keys that published it. CHD cannot alter, revoke, or remove such published data from QDN on the customer’s behalf.",
      "Private data published to QDN is, by default, accessible only to the publishing party. If that data is later made available to another party and accessed on another Qortal node, additional copies may exist outside CHD infrastructure and control.",
      "Customers are solely responsible for maintaining the keys, credentials, publisher identity, and access pathways required to control or recover their own QDN-published data.",
    ],
  },
  {
    title: "5. Availability, Redundancy, Backups, and Recovery",
    points: [
      "CHD operates managed services with uptime-focused operations and recovery processes.",
      "Backups for on-instance data are maintained for platform continuity; users should also keep independent backups where critical.",
      "Unless a redundancy-related service is explicitly included with a package or separately purchased, CHD does not guarantee ongoing redundant availability of QDN-published data across CHD-operated infrastructure.",
      "Where QDN redundancy is not explicitly provided by CHD, continued redundant availability of private published data depends on external conditions such as other nodes following the publisher name, another party receiving access to the data and loading it on another Qortal node, or nodes intentionally synchronizing broader QDN data sets.",
      "Any CHD redundancy guarantee for customer data or QDN-hosted copies applies only while the customer account remains active, current, and in good standing. If an account is no longer actively paid, CHD may remove redundant copies from CHD-managed infrastructure and the CHD redundancy guarantee immediately ends.",
      "After CHD removes its own redundant copies, any remaining availability of that QDN-published data may persist only on third-party follower nodes, nodes that previously accessed the data, or nodes explicitly configured to synchronize wider QDN content. Such third-party persistence is outside CHD control or responsibility.",
      "Downtime caused by unforeseen infrastructure failures may result in service-payment pause according to active service policy.",
    ],
  },
  {
    title: "6. Account Suspension and Termination",
    points: [
      "CHD may suspend or terminate accounts/services at its sole discretion, with or without cause.",
      "Upon termination, CHD-managed services may be deprovisioned, on-instance data availability may end immediately, and CHD may delete customer data from CHD-managed systems according to operational policy or legal necessity.",
      "If a customer account is not actively paying or otherwise leaves good standing, CHD may stop hosting or retaining redundant copies of that customer’s QDN-published data on CHD infrastructure.",
      "Users are responsible for exporting required on-instance data before termination windows and for maintaining control of any keys, credentials, or account access needed to manage their own QDN-published data.",
    ],
  },
  {
    title: "7. Warranty and Service Disclaimer",
    points: [
      'Services are provided "as-is" and "as-available" except where explicit service guarantees are stated.',
      "CHD disclaims implied warranties including merchantability, fitness for a particular purpose, and non-infringement.",
      "Users are responsible for independent data controls where legally or operationally required, especially for data published to QDN that CHD cannot directly access, revise, or delete.",
    ],
  },
  {
    title: "8. Prohibited Uses",
    points: [
      "Illegal, harmful, malicious, or abusive activities are prohibited.",
      "Spam, malware distribution, unauthorized access attempts, and unlawful hosting are prohibited.",
      "Violations may result in immediate termination without prior notice.",
    ],
  },
  {
    title: "9. Third-Party Platforms, Logos, and Comparative References",
    points: [
      "NuQloud may reference third-party platforms, applications, services, or marks, including logos and brand names, solely to describe compatibility, baseline functionality, integration points, or comparative feature context.",
      "Such references do not imply that CHD or NuQloud is attacking, disparaging, or invalidating those third-party services, nor do they imply sponsorship, endorsement, partnership, or affiliation unless expressly stated in writing.",
      "All third-party trademarks, logos, and service marks remain the property of their respective owners.",
      "Comparative references are provided for user understanding only and do not represent a claim of exact equivalence in implementation, performance, legal status, or service quality across all features or jurisdictions.",
      "NuQloud for Nextcloud is a plugin/add-on offering built to extend the Nextcloud platform with additional functionality powered by Qortal. Nextcloud remains a separate third-party platform and all rights in the Nextcloud name and marks remain with their respective owners.",
    ],
  },
  {
    title: "10. Limitation of Liability",
    points: [
      "To the maximum extent permitted by law, CHD is not liable for indirect, incidental, special, or consequential damages.",
      "Total liability is limited to amounts paid for the relevant service during the preceding 12 months.",
      "CHD is not liable for the persistence, replication, or removal failure of data that has already been published to QDN and is held outside CHD-managed infrastructure.",
    ],
  },
  {
    title: "11. Dispute Resolution",
    points: [
      "CHD encourages direct dispute resolution first.",
      "If unresolved, arbitration is preferred prior to litigation.",
      "Legal proceedings, if required, are governed by Nevada jurisdiction terms below.",
    ],
  },
  {
    title: "12. Governing Law",
    points: [
      "These Terms are governed by the laws of the State of Nevada, United States.",
      "Venue for disputes is Washoe County, Nevada, unless otherwise required by applicable law.",
    ],
  },
  {
    title: "13. Reservation of Rights",
    points: [
      "All rights not expressly granted are reserved by CHD.",
      "Use of CHD services does not transfer ownership of CHD intellectual property.",
    ],
  },
  {
    title: "14. Changes to Terms",
    points: [
      "CHD may update these Terms at any time.",
      "Continued use after updates constitutes acceptance of revised Terms.",
    ],
  },
];

function TermsPage() {
  const [theme, setTheme] = useAtom(themeAtom);
  const isDark = theme === EnumTheme.DARK;

  return (
    <Box
      className={`sc-page sc-page--msp ${isDark ? "sc-theme-dark" : "sc-theme-light"}`}
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
                NuQloud Terms of Service
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

          <section className="sc-hero sc-reveal is-visible" id="terms-overview">
            <Box className="sc-hero-copy">
              <Typography variant="overline" className="sc-kicker">
                Terms of Service
              </Typography>
              <Typography variant="h1" className="sc-headline">
                Terms of Service for NuQloud and CHD services
              </Typography>
              <Typography variant="body1" className="sc-subline">
                Effective Date: October 2025. Provider: Crowetic Hardware
                Development, LLC (CHD), Reno, Nevada, USA.
              </Typography>
              <Typography variant="body1" className="sc-subline">
                Contact: admin@crowetic.com | +1 (775) 442-2234 | Qortal
                Username: crowetic
              </Typography>
            </Box>
            <Box className="sc-hero-art" />
          </section>

          <section className="sc-section">
            <Typography
              variant="h2"
              className="sc-section-title sc-reveal is-visible"
            >
              Full Terms
            </Typography>
            <Box className="sc-card-grid">
              {sections.map((section) => (
                <Card
                  className="sc-card sc-reveal is-visible"
                  key={section.title}
                >
                  <CardContent>
                    <Typography className="sc-detail-title">
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
        </Box>
      </Container>
    </Box>
  );
}

export default TermsPage;
