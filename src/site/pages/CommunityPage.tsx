import { Link } from 'react-router-dom';
import { siteLinks } from '../../config/siteLinks';
import { Icon } from '../Icons';
import {
  CtaBand,
  ExternalLink,
  PageHero,
  QortalLink,
  SectionIntro,
} from '../Shared';
import { Seo } from '../Seo';

export default function CommunityPage() {
  return (
    <>
      <Seo
        title="Community"
        path="/community"
        description="Find verified Qortal-native support, community discussion, development repositories, and concrete ways to participate in the Qortal network."
      />
      <PageHero
        eyebrow="Community"
        title={
          <>
            Qortal exists because people <em>show up.</em>
          </>
        }
        visual={
          <div className="people-visual">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <span>
              <Icon name="community" />
            </span>
          </div>
        }
      >
        <p>
          No conventional company operates above Qortal. Community members write
          code, run nodes, publish resources, help newcomers, and maintain the
          places where work happens.
        </p>
      </PageHero>
      <section className="section">
        <div className="shell">
          <SectionIntro
            eyebrow="Find your place"
            title="Participate in a way that fits."
          >
            <p>
              Contribution is broader than writing Core code. Healthy
              infrastructure needs operators, builders, translators, testers,
              documentarians, creators, and thoughtful community members.
            </p>
          </SectionIntro>
          <div className="participation-grid">
            {[
              [
                'core',
                'Run a node',
                'Add an independently operated Core to the network and learn how Qortal behaves from the inside.',
                '/get-started',
              ],
              [
                'code',
                'Build in the open',
                'Contribute to existing repositories, improve qapp-core, or publish a new Q-App.',
                '/build',
              ],
              [
                'chat',
                'Help people connect',
                'Answer questions, document rough edges, translate interfaces, and make onboarding clearer.',
                '/community#channels',
              ],
              [
                'data',
                'Publish something useful',
                'Create an application, website, guide, media project, or other resource on QDN.',
                '/ecosystem',
              ],
            ].map(([icon, title, copy, to]) => (
              <Link key={title} to={to} className="participation-card">
                <Icon name={icon as 'core'} />
                <h3>{title}</h3>
                <p>{copy}</p>
                <span>
                  Learn more <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--ink" id="channels">
        <div className="shell">
          <SectionIntro
            eyebrow="Verified community links"
            title="Begin with Qortal-native spaces."
          >
            <p>
              External services are useful meeting points, but they are not the
              network itself.
            </p>
          </SectionIntro>
          <div className="channel-grid">
            <article>
              <span className="icon-tile">
                <Icon name="chat" />
              </span>
              <span className="card-tag">Qortal-native</span>
              <h3>Community support chat</h3>
              <p>
                Join the currently linked Qortal Cloud chat for support and
                conversation without treating an external social network as the
                source of truth.
              </p>
              <ExternalLink
                href={siteLinks.support}
                className="button button--secondary"
              >
                Open support chat
              </ExternalLink>
            </article>
            <article>
              <span className="icon-tile">
                <Icon name="community" />
              </span>
              <span className="card-tag">External</span>
              <h3>Discord community</h3>
              <p>
                The current official Hub and qortal.dev sources link to this
                Discord for community discussion and help.
              </p>
              <ExternalLink
                href={siteLinks.discord}
                className="button button--secondary"
              >
                Join Discord
              </ExternalLink>
            </article>
            <article>
              <span className="icon-tile">
                <Icon name="code" />
              </span>
              <span className="card-tag">Development</span>
              <h3>Qortal on GitHub</h3>
              <p>
                Follow active source work, issues, releases, and the full
                official-organization repository inventory.
              </p>
              <ExternalLink
                href={siteLinks.githubOrganization}
                className="button button--secondary"
              >
                Open GitHub
              </ExternalLink>
            </article>
            <article>
              <span className="icon-tile">
                <Icon name="blocks" />
              </span>
              <span className="card-tag">Inside Qortal</span>
              <h3>Open a current Q-App</h3>
              <p>
                Q-Tube is one verified example of a current community
                application published for use through Qortal.
              </p>
              <QortalLink
                uri="qortal://APP/Q-Tube"
                className="button button--secondary"
              >
                Open Q-Tube
              </QortalLink>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell community-note">
          <SectionIntro
            eyebrow="Community, not personality"
            title="The project is bigger than any one contributor."
          >
            <p>
              Qortal has a history and recognizable contributors, but its public
              story belongs to the people maintaining, operating, and extending
              the network now.
            </p>
          </SectionIntro>
          <div className="callout-card">
            <Icon name="network" />
            <h3>Coordination lives in many places.</h3>
            <p>
              On-chain groups support membership and approval workflows.
              Qortal-native chat, Q-Apps, source repositories, and external
              channels each serve different parts of community work.
            </p>
          </div>
        </div>
      </section>
      <CtaBand
        eyebrow="Your next contribution"
        title="Use the network, then help make it better."
        actions={
          <>
            <Link className="button button--primary" to="/get-started">
              Start using Qortal <Icon name="arrow" />
            </Link>
            <ExternalLink href={siteLinks.githubOrganization}>
              View open-source work
            </ExternalLink>
          </>
        }
      >
        The most useful perspective begins with direct experience.
      </CtaBand>
    </>
  );
}
