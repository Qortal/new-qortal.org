import { ecosystemProjects } from '../../data/ecosystem';
import { siteLinks } from '../../config/siteLinks';
import {
  ExternalLink,
  PageHero,
  QortalLink,
  SectionIntro,
  StatusPill,
} from '../Shared';
import { Seo } from '../Seo';

export default function EcosystemPage() {
  return (
    <>
      <Seo
        title="Ecosystem"
        path="/ecosystem"
        description="Discover current Qortal interfaces, Q-Apps, media, publishing, wallet, network-management, community, and development projects."
      />
      <PageHero
        eyebrow="Ecosystem"
        title={
          <>
            Made by the network’s <em>participants.</em>
          </>
        }
        visual={
          <div className="ecosystem-constellation">
            {['Hub', 'QDN', 'Chat', 'Apps', 'Names', 'Media', 'Wallets'].map(
              (item, index) => (
                <span
                  key={item}
                  style={{ '--i': index } as React.CSSProperties}
                >
                  {item}
                </span>
              )
            )}
            <i>Q</i>
          </div>
        }
      >
        <p>
          Qortal is not a product catalog owned by one vendor. These are current
          open-source interfaces, Q-Apps, and tools maintained across the
          community.
        </p>
      </PageHero>
      <section className="section">
        <div className="shell">
          <SectionIntro
            eyebrow="Current projects"
            title="Useful things you can open, install, or build with."
          >
            <p>
              This is a curated user-facing selection from the full official
              GitHub inventory. Archived and clearly legacy projects are not
              promoted here.
            </p>
          </SectionIntro>
          <div className="ecosystem-grid">
            {ecosystemProjects.map((project, index) => (
              <article className="ecosystem-card" key={project.name}>
                <div className="ecosystem-card__top">
                  <span className="project-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <StatusPill
                    tone={
                      project.status === 'Beta'
                        ? 'beta'
                        : project.status === 'Developer tool'
                          ? 'tool'
                          : 'current'
                    }
                  >
                    {project.status}
                  </StatusPill>
                </div>
                <span className="card-tag">{project.category}</span>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <div className="ecosystem-card__actions">
                  <ExternalLink href={project.href} className="text-link">
                    {project.action}
                  </ExternalLink>
                  {project.qortalUri && (
                    <QortalLink uri={project.qortalUri} className="text-link">
                      Open in Qortal
                    </QortalLink>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--ink">
        <div className="shell inventory-band">
          <div>
            <span className="eyebrow">The wider codebase</span>
            <h2>39 official-organization repositories researched.</h2>
            <p>
              The complete metadata snapshot includes active, experimental,
              forked, and archived work. The public cards above prioritize
              projects that make sense to current users.
            </p>
          </div>
          <ExternalLink
            href={siteLinks.githubOrganization}
            className="button button--primary"
          >
            Browse every repository
          </ExternalLink>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <SectionIntro
            eyebrow="Project status"
            title="Available, beta, and future are not the same thing."
          >
            <p>
              Capabilities are labeled conservatively. Repositories can be
              active without being ready for general users, and roadmap ideas do
              not become product claims simply because code or discussion
              exists.
            </p>
          </SectionIntro>
          <div className="status-key">
            <div>
              <StatusPill>Available</StatusPill>
              <p>Current source or releases support practical use.</p>
            </div>
            <div>
              <StatusPill tone="beta">Beta</StatusPill>
              <p>Implemented and evolving; expect rough edges.</p>
            </div>
            <div>
              <StatusPill tone="tool">Developer tool</StatusPill>
              <p>Primarily intended for builders and maintainers.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
