import { Link } from 'react-router-dom';
import { Icon } from '../Icons';
import { NetworkVisual } from '../NetworkVisual';
import { CtaBand, FeatureCard, PageHero, SectionIntro } from '../Shared';
import { Seo } from '../Seo';

export default function ExplorePage() {
  return (
    <>
      <Seo
        title="Why Qortal"
        path="/explore"
        description="Understand why Qortal takes a local-first, community-operated approach to identity, publishing, communication, applications, and digital infrastructure."
      />
      <PageHero
        eyebrow="Why Qortal"
        title={
          <>
            Digital infrastructure without a permanent <em>middle layer.</em>
          </>
        }
        visual={<NetworkVisual compact />}
      >
        <p>
          Qortal explores a practical alternative to online systems where one
          provider owns the accounts, servers, namespace, and permission to
          participate.
        </p>
      </PageHero>
      <section className="section">
        <div className="shell">
          <SectionIntro
            eyebrow="The common pattern"
            title="Convenience can create dependency."
          >
            <p>
              Centralized platforms are easy to start with, but identity, reach,
              data access, and continuity remain attached to the operator’s
              infrastructure and policies.
            </p>
          </SectionIntro>
          <div className="problem-grid">
            {[
              [
                'identity',
                'Rented identity',
                'An account can remain inseparable from the provider that issued it.',
              ],
              [
                'data',
                'Platform-bound data',
                'Publishing and collaboration often depend on one company’s storage and availability.',
              ],
              [
                'chat',
                'Mediated communication',
                'Messages and community access can rely on centrally operated communication systems.',
              ],
              [
                'globe',
                'Hosted by default',
                'Using a service commonly means trusting infrastructure you do not operate.',
              ],
            ].map(([icon, title, copy]) => (
              <FeatureCard key={title} icon={icon as 'identity'} title={title}>
                <p>{copy}</p>
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--ink">
        <div className="shell">
          <SectionIntro
            eyebrow="The Qortal approach"
            title="Move control closer to the participant."
          >
            <p>
              Qortal does not promise that risk disappears. It changes where
              authority and infrastructure live.
            </p>
          </SectionIntro>
          <div className="principle-list">
            <article>
              <span>01</span>
              <div>
                <h3>Local keys and signed actions</h3>
                <p>
                  Hub holds encrypted wallet material and signs transactions;
                  Core receives signed transactions rather than private keys.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Participant-operated nodes</h3>
                <p>
                  The primary model is to run Core locally and connect directly
                  to the network, rather than require a single application
                  backend.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Names as owned namespaces</h3>
                <p>
                  A registered name can identify an account and control updates
                  to QDN resources published beneath it.
                </p>
              </div>
            </article>
            <article>
              <span>04</span>
              <div>
                <h3>Distributed resources</h3>
                <p>
                  QDN data is stored outside the blockchain payload while its
                  integrity is tied to hashes referenced by on-chain
                  transactions.
                </p>
              </div>
            </article>
            <article>
              <span>05</span>
              <div>
                <h3>Open participation</h3>
                <p>
                  The code is open source and the ecosystem is built, operated,
                  and supported by community participants.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell belief-grid">
          <SectionIntro
            eyebrow="A digital commons"
            title="Infrastructure is healthiest when people can participate in it."
          >
            <p>
              Qortal’s direction is not a finished claim about replacing
              everything. It is a functioning foundation that communities can
              keep extending.
            </p>
          </SectionIntro>
          <blockquote>
            “Community-owned” is an operating model: people run nodes, publish
            resources, maintain interfaces, write applications, support
            newcomers, and shape the work together.
          </blockquote>
        </div>
      </section>
      <CtaBand
        eyebrow="See the system"
        title="Understand the layers behind the experience."
        actions={
          <Link className="button button--primary" to="/technology">
            Explore the technology <Icon name="arrow" />
          </Link>
        }
      >
        Start with a clear map of Hub, Core, QDN, names, Q-Apps, communication,
        and transactions.
      </CtaBand>
    </>
  );
}
