import { Link } from 'react-router-dom';
import { architectureLayers } from '../../data/ecosystem';
import { siteLinks } from '../../config/siteLinks';
import { Icon } from '../Icons';
import {
  ExternalLink,
  FeatureCard,
  PageHero,
  SectionIntro,
  StatusPill,
} from '../Shared';
import { Seo } from '../Seo';

export default function TechnologyPage() {
  return (
    <>
      <Seo
        title="Technology"
        path="/technology"
        description="A clear overview of Qortal Core, Qortal Hub, QDN, names, Q-Apps, communication, wallets, trade, groups, and the local-first architecture."
      />
      <PageHero
        eyebrow="Technology / Network"
        title={
          <>
            A stack designed for <em>participation.</em>
          </>
        }
        actions={
          <>
            <ExternalLink
              href={siteLinks.coreRepository}
              className="button button--primary"
            >
              Core repository
            </ExternalLink>
            <ExternalLink href={siteLinks.docs}>Read the docs</ExternalLink>
          </>
        }
        visual={
          <div className="layer-map">
            {architectureLayers.map((layer, index) => (
              <div key={layer.label}>
                <span>0{index + 1}</span>
                <strong>{layer.label}</strong>
                <small>{layer.detail}</small>
              </div>
            ))}
          </div>
        }
      >
        <p>
          Qortal combines a blockchain and node, distributed data,
          human-readable names, applications, interfaces, and communication into
          one locally operable network.
        </p>
      </PageHero>
      <section className="section">
        <div className="shell">
          <SectionIntro
            eyebrow="Core components"
            title="Each layer has a distinct job."
          >
            <p>
              The public site stays at the conceptual level; the linked
              repositories and documentation contain implementation detail.
            </p>
          </SectionIntro>
          <div className="feature-grid feature-grid--two">
            <FeatureCard icon="core" title="Qortal Core">
              <p>
                The Java node and blockchain component. Core connects to peers,
                exposes the API, processes transactions, and retrieves and
                serves QDN resources. It does not need the account’s private
                keys.
              </p>
              <ExternalLink
                href={siteLinks.coreRepository}
                className="text-link"
              >
                Inspect Core
              </ExternalLink>
            </FeatureCard>
            <FeatureCard icon="hub" title="Qortal Hub">
              <p>
                The primary user interface. Hub manages encrypted key material
                and provides accounts, Q-Chat, Q-Apps, publishing, wallets,
                trade, and current communication work.
              </p>
              <ExternalLink
                href={siteLinks.hubRepository}
                className="text-link"
              >
                Inspect Hub
              </ExternalLink>
            </FeatureCard>
            <FeatureCard icon="data" title="Qortal Data Network">
              <p>
                QDN resources can contain sites, applications, media, JSON, and
                other data. Payloads are distributed outside the chain; hashes
                and publishing transactions provide integrity and ownership
                references.
              </p>
            </FeatureCard>
            <FeatureCard icon="identity" title="Names">
              <p>
                A Qortal name is tied to an account and acts as a human-readable
                identity and namespace. Ownership controls updates to resources
                published under that name.
              </p>
            </FeatureCard>
            <FeatureCard icon="blocks" title="Q-Apps">
              <p>
                Static web applications published through QDN can read network
                data and request approved account actions through the Qortal
                interface bridge.
              </p>
              <ExternalLink
                href={siteLinks.developerDocs}
                className="text-link"
              >
                Q-App documentation
              </ExternalLink>
            </FeatureCard>
            <FeatureCard icon="chat" title="Communication">
              <p>
                Q-Chat supports network messaging. Current Hub releases also
                include Reticulum-backed direct and group voice work plus
                encrypted file-transfer capabilities.
              </p>
              <StatusPill tone="beta">Group voice remains beta</StatusPill>
            </FeatureCard>
            <FeatureCard icon="wallet" title="Transactions & wallets">
              <p>
                Hub creates and signs actions with the user’s wallet context.
                Core validates and processes the signed transaction, keeping
                interface-held secrets out of Core.
              </p>
            </FeatureCard>
            <FeatureCard icon="trade" title="Cross-chain trade" id="trade">
              <p>
                Qortal includes direct cross-chain trade workflows and wallets
                for supported external chains. This is one capability in the
                platform—not its defining purpose.
              </p>
            </FeatureCard>
          </div>
        </div>
      </section>
      <section className="section section--ink">
        <div className="shell signed-model">
          <div>
            <SectionIntro
              eyebrow="A deliberate boundary"
              title="Sign here. Process there."
            >
              <p>
                Separating keys from the network node limits what Core needs to
                know and makes the trust boundary easier to understand.
              </p>
            </SectionIntro>
          </div>
          <div className="transaction-flow">
            <div>
              <Icon name="identity" />
              <strong>1. Intent</strong>
              <span>You approve an action in Hub.</span>
            </div>
            <i>
              <Icon name="arrow" />
            </i>
            <div>
              <Icon name="shield" />
              <strong>2. Signature</strong>
              <span>Hub signs with local account context.</span>
            </div>
            <i>
              <Icon name="arrow" />
            </i>
            <div>
              <Icon name="core" />
              <strong>3. Processing</strong>
              <span>Core receives the signed transaction.</span>
            </div>
            <i>
              <Icon name="arrow" />
            </i>
            <div>
              <Icon name="network" />
              <strong>4. Network</strong>
              <span>Peers validate and share network state.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell groups-grid">
          <SectionIntro
            eyebrow="Coordination"
            title="Groups connect participation to on-chain actions."
          >
            <p>
              Current Core and ecosystem sources support group membership,
              invites, joins, approvals, and group-scoped communication.
              Specific governance processes vary by group and should not be
              generalized into a single global voting claim.
            </p>
          </SectionIntro>
          <div className="callout-card">
            <span className="eyebrow">Accuracy note</span>
            <h3>Architecture over absolutes</h3>
            <p>
              Distribution and local control can reduce dependence on a single
              operator. They do not make software invulnerable, eliminate every
              fee, or guarantee availability in every circumstance.
            </p>
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="shell next-links">
          <Link to="/build">
            <span>For developers</span>
            <strong>Build on the stack</strong>
            <Icon name="arrow" />
          </Link>
          <Link to="/get-started">
            <span>For users</span>
            <strong>Run Core + Hub</strong>
            <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
