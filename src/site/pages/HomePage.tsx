import { Link } from 'react-router-dom';
import { siteLinks } from '../../config/siteLinks';
import { ecosystemProjects } from '../../data/ecosystem';
import { Icon } from '../Icons';
import { NetworkVisual } from '../NetworkVisual';
import {
  CtaBand,
  ExternalLink,
  FeatureCard,
  SectionIntro,
  TextLink,
} from '../Shared';
import { Seo } from '../Seo';

const capabilities = [
  {
    icon: 'data' as const,
    title: 'Publish to QDN',
    copy: 'Share websites, applications, media, and other resources through a distributed data network secured by on-chain references.',
  },
  {
    icon: 'blocks' as const,
    title: 'Use Q-Apps',
    copy: 'Open static web applications that can request approved interaction with your account and Qortal data.',
  },
  {
    icon: 'chat' as const,
    title: 'Communicate',
    copy: 'Use Q-Chat for messages and Hub’s evolving Reticulum-backed voice and file-transfer capabilities.',
  },
  {
    icon: 'identity' as const,
    title: 'Own a name',
    copy: 'Use a registered Qortal name as a human-readable identity and publishing namespace controlled by its account.',
  },
  {
    icon: 'wallet' as const,
    title: 'Transact',
    copy: 'Keep account keys in the interface, sign transactions locally, and submit signed data to Core for processing.',
  },
  {
    icon: 'trade' as const,
    title: 'Trade directly',
    copy: 'Access Qortal’s cross-chain trade functionality without making the broader network story about a coin.',
  },
];

export default function HomePage() {
  return (
    <>
      <Seo
        title="Qortal"
        description="Qortal is an open, community-built network for decentralized applications, publishing, communication, identity, and locally operated digital infrastructure."
      />
      <section className="home-hero">
        <div className="shell home-hero__grid">
          <div className="home-hero__copy reveal">
            <span className="eyebrow">
              <i /> Community-owned digital infrastructure
            </span>
            <h1>
              Build a digital life <em>you can actually own.</em>
            </h1>
            <p>
              Qortal is an open network for applications, communication,
              publishing, identity, wallets, and trade—built around local
              control instead of a platform in the middle.
            </p>
            <div className="button-row">
              <Link className="button button--primary" to="/explore">
                Explore Qortal <Icon name="arrow" />
              </Link>
              <Link className="button button--secondary" to="/get-started">
                Start using Qortal <Icon name="download" />
              </Link>
            </div>
            <div className="hero-proof" aria-label="Qortal characteristics">
              <span>
                <Icon name="community" /> Community built
              </span>
              <span>
                <Icon name="core" /> Locally operable
              </span>
              <span>
                <Icon name="code" /> Open source
              </span>
            </div>
          </div>
          <div className="home-hero__visual reveal reveal--delay">
            <NetworkVisual />
          </div>
        </div>
        <div className="hero-scroll">
          <span>See how it connects</span>
          <i />
        </div>
      </section>

      <section className="section section--statement">
        <div className="shell statement-grid">
          <span className="statement-index">01 / A different foundation</span>
          <div>
            <h2>The network is the service.</h2>
            <p className="large-copy">
              Most digital tools begin with an organization that owns the
              servers, identity system, and rules. Qortal begins with
              independently operated nodes, locally controlled accounts, signed
              transactions, and a shared protocol.
            </p>
            <TextLink to="/explore">Why that difference matters</TextLink>
          </div>
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="shell">
          <SectionIntro
            eyebrow="One network, many uses"
            title="More than a cryptocurrency"
          >
            <p>
              QORT is part of the network’s economic system. Qortal itself is
              the infrastructure that people use to publish, build, communicate,
              coordinate, and exchange value.
            </p>
          </SectionIntro>
          <div className="feature-grid feature-grid--three">
            {capabilities.map((capability) => (
              <FeatureCard
                key={capability.title}
                icon={capability.icon}
                title={capability.title}
              >
                <p>{capability.copy}</p>
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="shell architecture-story">
          <div>
            <SectionIntro
              eyebrow="Local first by design"
              title="Your interface. Your Core. A shared network."
            >
              <p>
                Qortal Hub keeps encrypted private-key material and creates
                signed transactions. Qortal Core processes those signed
                transactions, exposes the local API, and connects your node to
                the wider network.
              </p>
            </SectionIntro>
            <ol className="flow-list">
              <li>
                <span>01</span>
                <div>
                  <strong>You use Qortal Hub</strong>
                  <p>
                    Access Q-Chat, Q-Apps, publishing, wallets, and network
                    tools through the primary interface.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Hub signs locally</strong>
                  <p>
                    Your interface prepares and signs actions before sending
                    only the signed transaction to Core.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Core connects the network</strong>
                  <p>
                    Your local node validates, processes, retrieves, and shares
                    network state and QDN resources.
                  </p>
                </div>
              </li>
            </ol>
            <TextLink to="/technology">See the architecture</TextLink>
          </div>
          <div
            className="stack-visual"
            aria-label="User to network architecture"
          >
            <div className="stack-layer stack-layer--person">
              <Icon name="identity" />
              <span>You</span>
              <small>keys + intent</small>
            </div>
            <i />
            <div className="stack-layer stack-layer--hub">
              <Icon name="hub" />
              <span>Qortal Hub</span>
              <small>interface + signing</small>
            </div>
            <i />
            <div className="stack-layer stack-layer--core">
              <Icon name="core" />
              <span>Qortal Core</span>
              <small>node + API</small>
            </div>
            <i />
            <div className="stack-network">
              <span>QDN</span>
              <span>Blockchain</span>
              <span>Peers</span>
              <span>Communication</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionIntro
            eyebrow="Built on Qortal"
            title="A living ecosystem"
            align="center"
          >
            <p>
              Real interfaces and Q-Apps are already being built across
              communication, media, wallets, community coordination, and
              developer tooling.
            </p>
          </SectionIntro>
          <div className="project-strip">
            {ecosystemProjects.slice(0, 4).map((project, index) => (
              <article className="project-card" key={project.name}>
                <span className="project-number">0{index + 1}</span>
                <span className="card-tag">{project.category}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <ExternalLink href={project.href} className="text-link">
                  {project.action}
                </ExternalLink>
              </article>
            ))}
          </div>
          <div className="center-action">
            <TextLink to="/ecosystem">Explore the ecosystem</TextLink>
          </div>
        </div>
      </section>

      <section className="section section--split-choice">
        <div className="shell">
          <SectionIntro
            eyebrow="Choose your starting point"
            title="Try it now. Run it locally when you’re ready."
            align="center"
          >
            <p>
              Hosted access lowers the first step. A local Core and Hub provide
              the architecture Qortal is designed around.
            </p>
          </SectionIntro>
          <div className="choice-grid">
            <article className="choice-card">
              <span className="choice-label">Fastest path</span>
              <Icon name="globe" />
              <h3>Explore through hosted Hub</h3>
              <p>
                Open Qortal Hub through a public node without installing
                software. Useful for discovery; dependent on infrastructure
                operated by someone else.
              </p>
              <p className="hosted-warning">
                <strong>Older hosted version:</strong> Hub and Q-Chat are being
                rebuilt rapidly around Reticulum. Hosted access remains on an
                earlier version until a new hosted build is ready.
              </p>
              <ExternalLink
                href={siteLinks.hostedHub}
                className="button button--secondary"
              >
                Try hosted access
              </ExternalLink>
            </article>
            <article className="choice-card choice-card--primary">
              <span className="choice-label">Preferred architecture</span>
              <Icon name="core" />
              <h3>Run Core + Hub locally</h3>
              <p>
                Operate your own network connection and use Hub against your
                local Core for the full node-backed experience.
              </p>
              <Link className="button button--primary" to="/get-started">
                See installation paths <Icon name="arrow" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Built by Qortians"
        title="There is no company above the network."
        actions={
          <>
            <Link className="button button--primary" to="/community">
              Join the community <Icon name="arrow" />
            </Link>
            <ExternalLink href={siteLinks.githubOrganization}>
              Contribute on GitHub
            </ExternalLink>
          </>
        }
      >
        Development, infrastructure, applications, support, and community spaces
        exist because participants choose to build and operate them.
      </CtaBand>
    </>
  );
}
