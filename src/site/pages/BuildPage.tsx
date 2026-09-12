import { siteLinks } from '../../config/siteLinks';
import { Icon } from '../Icons';
import {
  CtaBand,
  ExternalLink,
  FeatureCard,
  PageHero,
  SectionIntro,
} from '../Shared';
import { Seo } from '../Seo';

export default function BuildPage() {
  return (
    <>
      <Seo
        title="Build on Qortal"
        path="/build"
        description="Start building Q-Apps with static web technology, QDN publishing, qortalRequest, the Core API, qapp-core, templates, and official developer resources."
      />
      <PageHero
        eyebrow="Build on Qortal"
        title={
          <>
            The web stack, connected to a <em>different backend.</em>
          </>
        }
        actions={
          <>
            <ExternalLink
              href={siteLinks.developerDocs}
              className="button button--primary"
            >
              Developer documentation
            </ExternalLink>
            <ExternalLink href={siteLinks.createQortalApp}>
              Starter tooling
            </ExternalLink>
          </>
        }
        visual={
          <div className="code-window">
            <div>
              <i />
              <i />
              <i />
              <span>q-app / publish.ts</span>
            </div>
            <pre>
              <code>{`const account = await qortalRequest({\n  action: 'GET_USER_ACCOUNT'\n})\n\nawait qortalRequest({\n  action: 'PUBLISH_QDN_RESOURCE',\n  service: 'APP',\n  name: account.name\n})`}</code>
            </pre>
          </div>
        }
      >
        <p>
          Q-Apps use familiar client-side technology, then request approved
          interaction with accounts and network data through Qortal’s interface
          layer.
        </p>
      </PageHero>
      <section className="section">
        <div className="shell">
          <SectionIntro
            eyebrow="Development model"
            title="Static applications, network-native capabilities."
          >
            <p>
              A Q-App can be simple HTML or a modern JavaScript application. QDN
              hosts the built static resources; Qortal provides data access and
              user-approved actions.
            </p>
          </SectionIntro>
          <div className="feature-grid feature-grid--three">
            <FeatureCard icon="blocks" title="Q-Apps">
              <p>
                Publish a static application under a registered Qortal name and
                service. Users access it through a Qortal interface or
                compatible gateway.
              </p>
            </FeatureCard>
            <FeatureCard icon="data" title="QDN publishing">
              <p>
                Resources are addressed by name, service, and optional
                identifier. Updates remain controlled by the account that owns
                the publishing name.
              </p>
            </FeatureCard>
            <FeatureCard icon="code" title="qortalRequest">
              <p>
                Request account details, publish data, send chat or coins, join
                groups, inspect resources, and perform other supported actions
                with interface mediation.
              </p>
            </FeatureCard>
            <FeatureCard icon="core" title="Core API">
              <p>
                Use the local HTTP API for read-only network data and technical
                integrations. Keep full API reference material in the dedicated
                docs.
              </p>
            </FeatureCard>
            <FeatureCard icon="hub" title="qapp-core">
              <p>
                Use the shared library for authentication state, QDN CRUD
                workflows, resource lists, publishing flows, and reusable
                utilities.
              </p>
            </FeatureCard>
            <FeatureCard icon="shield" title="User approval">
              <p>
                Design around explicit user intent. Sensitive actions can
                require confirmation from the interface before anything is
                signed or published.
              </p>
            </FeatureCard>
          </div>
        </div>
      </section>
      <section className="section section--ink">
        <div className="shell build-flow">
          <SectionIntro
            eyebrow="From idea to QDN"
            title="A short development loop."
          >
            <p>
              The exact deployment tooling may evolve; the underlying artifact
              remains a static application bundle.
            </p>
          </SectionIntro>
          <div className="build-flow__steps">
            <div>
              <span>01</span>
              <strong>Scaffold</strong>
              <p>
                Start with your preferred frontend or the official templates.
              </p>
            </div>
            <div>
              <span>02</span>
              <strong>Integrate</strong>
              <p>
                Use qortalRequest and qapp-core where network interaction is
                needed.
              </p>
            </div>
            <div>
              <span>03</span>
              <strong>Test locally</strong>
              <p>
                Exercise both ordinary browser behavior and the Qortal interface
                bridge.
              </p>
            </div>
            <div>
              <span>04</span>
              <strong>Publish</strong>
              <p>
                Build static assets and publish the resource under a registered
                name.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell resource-list">
          <SectionIntro
            eyebrow="Go deeper"
            title="Source is part of the documentation."
          >
            <p>
              These are the primary current entry points for technical work.
            </p>
          </SectionIntro>
          <div>
            <ExternalLink
              href={siteLinks.developerDocs}
              className="resource-link"
            >
              <Icon name="code" />
              <span>
                <strong>Q-App documentation</strong>
                <small>Bridge actions, QDN concepts, and examples</small>
              </span>
            </ExternalLink>
            <ExternalLink href={siteLinks.qappCore} className="resource-link">
              <Icon name="blocks" />
              <span>
                <strong>qapp-core</strong>
                <small>Reusable Q-App utilities and components</small>
              </span>
            </ExternalLink>
            <ExternalLink
              href={siteLinks.coreRepository}
              className="resource-link"
            >
              <Icon name="core" />
              <span>
                <strong>Qortal Core</strong>
                <small>Node, API, transactions, and QDN implementation</small>
              </span>
            </ExternalLink>
            <ExternalLink
              href={siteLinks.hubRepository}
              className="resource-link"
            >
              <Icon name="hub" />
              <span>
                <strong>Qortal Hub</strong>
                <small>Primary interface and modern communication work</small>
              </span>
            </ExternalLink>
          </div>
        </div>
      </section>
      <CtaBand
        eyebrow="Open source"
        title="The network advances when builders participate."
        actions={
          <ExternalLink
            href={siteLinks.githubOrganization}
            className="button button--primary"
          >
            Explore Qortal GitHub
          </ExternalLink>
        }
      >
        Review issues, study current implementations, improve shared libraries,
        or publish something useful to QDN.
      </CtaBand>
    </>
  );
}
