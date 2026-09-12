import { Link } from 'react-router-dom';
import { siteLinks } from '../../config/siteLinks';
import { Icon } from '../Icons';
import { ExternalLink, PageHero, SectionIntro } from '../Shared';
import { Seo } from '../Seo';

export default function GetStartedPage() {
  return (
    <>
      <Seo
        title="Get Started"
        path="/get-started"
        description="Choose the right current path into Qortal: hosted Hub for a quick look, or Qortal Core and Hub locally for the preferred full experience."
      />
      <PageHero
        eyebrow="Get started"
        title={
          <>
            A clear path into <em>Qortal.</em>
          </>
        }
        actions={
          <>
            <Link
              className="button button--secondary"
              to="/get-started#onboarding"
            >
              Account onboarding <Icon name="arrow" />
            </Link>
            <ExternalLink
              href={siteLinks.downloads}
              className="button button--primary"
            >
              Open download guide
            </ExternalLink>
          </>
        }
        visual={
          <div className="start-compass">
            <span>TRY</span>
            <i>
              <Icon name="network" />
            </i>
            <span>RUN</span>
            <small>Choose your level of independence</small>
          </div>
        }
      >
        <p>
          Start in a browser if you are curious. Install Hub and run Core
          locally when you want the network’s intended node-backed architecture.
        </p>
      </PageHero>
      <section className="section">
        <div className="shell">
          <SectionIntro
            eyebrow="Two starting points"
            title="Choose convenience or local operation."
          >
            <p>
              Both routes let you learn. They have different trust and
              availability boundaries.
            </p>
          </SectionIntro>
          <div className="path-grid">
            <article className="path-card">
              <span className="path-card__number">01</span>
              <span className="choice-label">I just want to try Qortal</span>
              <Icon name="globe" />
              <h2>Use hosted Hub</h2>
              <p>
                A public-node-backed Hub lets you explore without installing
                Core. It is the shortest path in, but you depend on the hosted
                operator’s node and availability.
              </p>
              <p className="hosted-warning">
                <strong>Version notice:</strong> Rapid development of the
                rebuilt Hub and Q-Chat over Reticulum has moved ahead of the
                hosted service. This access point is on an older version until a
                new hosted build can be delivered.
              </p>
              <ul>
                <li>No Core installation to begin</li>
                <li>Good for orientation and first use</li>
                <li>Not the same independence as a local node</li>
              </ul>
              <ExternalLink
                href={siteLinks.hostedHub}
                className="button button--secondary"
              >
                Open hosted Hub
              </ExternalLink>
            </article>
            <article className="path-card path-card--primary">
              <span className="path-card__number">02</span>
              <span className="choice-label">I want the full experience</span>
              <Icon name="core" />
              <h2>Run Core + Hub</h2>
              <p>
                Qortal’s preferred model is a local Core connected to the
                network, with Hub as the interface that holds encrypted key
                material and signs actions.
              </p>
              <ul>
                <li>Your own connection to Qortal peers</li>
                <li>Local API and QDN retrieval</li>
                <li>Desktop interface for everyday use</li>
              </ul>
              <div className="button-row">
                <ExternalLink
                  href={siteLinks.coreRelease}
                  className="button button--secondary"
                >
                  Get Core
                </ExternalLink>
                <ExternalLink
                  href={siteLinks.hubRelease}
                  className="button button--primary"
                >
                  Get Hub
                </ExternalLink>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="section" id="onboarding">
        <div className="shell onboarding-panel">
          <div className="onboarding-panel__intro">
            <span className="eyebrow">Guided onboarding</span>
            <h2>Establish your place on the network.</h2>
            <p>
              Qortal onboarding helps a new participant move from having no
              account to having an established Qortal identity. The guided
              process helps you create an account, supplies the initial QORT
              needed to register a name, and walks you through completing your
              network setup.
            </p>
            <ExternalLink
              href={siteLinks.onboarding}
              className="button button--primary"
            >
              Start guided onboarding
            </ExternalLink>
          </div>
          <ol className="onboarding-steps" aria-label="Qortal onboarding steps">
            <li>
              <span>01</span>
              <Icon name="identity" />
              <div>
                <strong>Create your account</strong>
                <p>
                  Generate your Qortal account and learn how to protect the
                  backup and recovery information that controls it.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <Icon name="wallet" />
              <div>
                <strong>Receive starter QORT</strong>
                <p>
                  The onboarding process funds the new account with the initial
                  QORT required for name registration.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <Icon name="network" />
              <div>
                <strong>Register and get established</strong>
                <p>
                  Register your Qortal name and finish setting up an identity
                  ready to participate across the network.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="section section--ink">
        <div className="shell">
          <SectionIntro
            eyebrow="Interfaces"
            title="Desktop, Android, or Chromium."
          >
            <p>
              Release links point to the official projects so the site does not
              hard-code versioned asset URLs.
            </p>
          </SectionIntro>
          <div className="platform-grid">
            <article>
              <Icon name="hub" />
              <div>
                <span className="card-tag">Desktop</span>
                <h3>Qortal Hub</h3>
                <p>
                  Current releases provide Windows, macOS, Linux AppImage and
                  Debian packages, including Linux ARM64.
                </p>
              </div>
              <ExternalLink href={siteLinks.hubRelease} className="text-link">
                Latest Hub release
              </ExternalLink>
            </article>
            <article>
              <Icon name="download" />
              <div>
                <span className="card-tag">Android</span>
                <h3>Qortal Go / Mobile</h3>
                <p>
                  The official mobile project currently targets Android and
                  publishes an APK through GitHub releases.
                </p>
              </div>
              <ExternalLink
                href={siteLinks.mobileRelease}
                className="text-link"
              >
                Latest mobile release
              </ExternalLink>
            </article>
            <article>
              <Icon name="globe" />
              <div>
                <span className="card-tag">Browser</span>
                <h3>Qortal Extension</h3>
                <p>
                  The Chromium extension supports gateway Q-App access and
                  authenticated interaction from compatible browsers.
                </p>
              </div>
              <ExternalLink
                href={siteLinks.extensionRelease}
                className="text-link"
              >
                Latest extension release
              </ExternalLink>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell install-steps">
          <SectionIntro
            eyebrow="Local setup"
            title="The durable route in four steps."
          >
            <p>
              Use the current documentation for platform-specific commands and
              requirements.
            </p>
          </SectionIntro>
          <ol>
            <li>
              <span>1</span>
              <div>
                <strong>Install Qortal Core</strong>
                <p>
                  Download the current Core release and follow the platform
                  instructions.
                </p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <strong>Let Core synchronize</strong>
                <p>
                  Core establishes your local view of network state and connects
                  to peers.
                </p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <strong>Install Qortal Hub</strong>
                <p>Choose the current package for your desktop platform.</p>
              </div>
            </li>
            <li>
              <span>4</span>
              <div>
                <strong>Create or restore carefully</strong>
                <p>
                  Follow Hub onboarding and protect the wallet backup and
                  recovery material it provides.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="section section--tight">
        <div className="shell safety-note">
          <Icon name="shield" />
          <div>
            <strong>Verify downloads at the source.</strong>
            <p>
              Use official Qortal repository releases and follow published
              checksum or update guidance. Never share recovery material or
              private keys.
            </p>
          </div>
          <ExternalLink href={siteLinks.onboarding} className="text-link">
            Onboarding help
          </ExternalLink>
        </div>
      </section>
    </>
  );
}
