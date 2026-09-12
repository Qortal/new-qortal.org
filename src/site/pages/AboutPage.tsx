import { Link } from 'react-router-dom';
import { siteLinks } from '../../config/siteLinks';
import { Icon } from '../Icons';
import { ExternalLink, PageHero, SectionIntro } from '../Shared';
import { Seo } from '../Seo';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="Learn about Qortal’s community ownership, open-source philosophy, local-first architecture, history, and ongoing direction."
      />
      <PageHero
        eyebrow="About / Philosophy"
        title={
          <>
            A network with no company <em>at the top.</em>
          </>
        }
        visual={
          <div className="manifesto-mark">
            <span>OPEN</span>
            <span>LOCAL</span>
            <span>SHARED</span>
            <i>Q</i>
          </div>
        }
      >
        <p>
          Qortal is a community-built infrastructure project: open source,
          locally operable, and designed to reduce the number of permanent
          intermediaries between people and their digital lives.
        </p>
      </PageHero>
      <section className="section">
        <div className="shell about-lead">
          <span className="statement-index">The premise</span>
          <h2>
            People should be able to participate in the infrastructure they
            depend on—not only consume access to it.
          </h2>
        </div>
      </section>
      <section className="section section--ink">
        <div className="shell">
          <SectionIntro
            eyebrow="Guiding ideas"
            title="The architecture follows the philosophy."
          >
            <p>
              These are directions expressed by the working software and
              contribution model, not slogans that eliminate technical
              tradeoffs.
            </p>
          </SectionIntro>
          <div className="value-grid">
            <article>
              <span>01</span>
              <h3>Local before remote</h3>
              <p>
                Make a participant-run Core and locally controlled account the
                preferred path, while offering hosted access as an easier
                introduction.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Protocol before platform</h3>
              <p>
                Let shared rules, signed transactions, names, and distributed
                resources do work that normally belongs to a central service.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Community before company</h3>
              <p>
                Development and operation are sustained by contributors and node
                operators rather than conventional corporate ownership.
              </p>
            </article>
            <article>
              <span>04</span>
              <h3>Capability before hype</h3>
              <p>
                Describe what exists now, mark beta work, and leave unverifiable
                absolutes out of the project’s public promise.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell history-grid">
          <SectionIntro
            eyebrow="History and direction"
            title="Launched as a foundation, still being extended."
          >
            <p>
              The Qortal network launched in 2020. Since then, Core, QDN,
              Q-Apps, newer interfaces, community applications, and
              communication work have continued to evolve.
            </p>
            <p>
              Current development centers the modern Qortal Hub rather than the
              deprecated legacy qortal-ui. Reticulum-backed communication is
              active work in Hub and should be understood as an evolving layer,
              not a completed promise to replace every form of connectivity.
            </p>
          </SectionIntro>
          <div className="timeline">
            <div>
              <span>2020</span>
              <strong>Network launch</strong>
              <p>
                Core network, minting, communication, and trade foundations.
              </p>
            </div>
            <div>
              <span>2023</span>
              <strong>QDN in practical use</strong>
              <p>
                Websites and applications published as distributed resources.
              </p>
            </div>
            <div>
              <span>Now</span>
              <strong>Modern interfaces</strong>
              <p>
                Hub, mobile, extension, Q-Apps, and Reticulum communication
                continue forward.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="shell next-links">
          <Link to="/community">
            <span>Meet the community</span>
            <strong>Find a way to contribute</strong>
            <Icon name="arrow" />
          </Link>
          <ExternalLink
            href={siteLinks.githubOrganization}
            className="next-link"
          >
            <span>Read the source</span>
            <strong>Browse Qortal repositories</strong>
            <Icon name="external" />
          </ExternalLink>
        </div>
      </section>
    </>
  );
}
