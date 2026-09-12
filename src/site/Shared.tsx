import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon, type IconName } from './Icons';
import { useAccessContext } from '../hooks/useAccessContext';

export function SectionIntro({
  eyebrow,
  title,
  children,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`section-intro section-intro--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <div className="section-intro__copy">{children}</div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
  actions,
  visual,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="shell page-hero__grid">
        <div className="page-hero__copy reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <div className="page-hero__lede">{children}</div>
          {actions && <div className="button-row">{actions}</div>}
        </div>
        {visual && (
          <div className="page-hero__visual reveal reveal--delay">{visual}</div>
        )}
      </div>
    </section>
  );
}

export function FeatureCard({
  icon,
  title,
  children,
  tag,
  id,
}: {
  icon: IconName;
  title: string;
  children: ReactNode;
  tag?: string;
  id?: string;
}) {
  return (
    <article className="feature-card reveal" id={id}>
      <span className="icon-tile">
        <Icon name={icon} />
      </span>
      {tag && <span className="card-tag">{tag}</span>}
      <h3>{title}</h3>
      <div>{children}</div>
    </article>
  );
}

export function TextLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <Icon name="arrow" />
    </Link>
  );
}

export function ExternalLink({
  href,
  children,
  className = 'button button--secondary',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const { openOrCopyInternetLink } = useAccessContext();
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => {
        event.preventDefault();
        void openOrCopyInternetLink(href);
      }}
    >
      {children}
      <Icon name="external" />
    </a>
  );
}

export function QortalLink({
  uri,
  children,
  className = 'button button--secondary',
}: {
  uri: string;
  children: ReactNode;
  className?: string;
}) {
  const { openQortalLink } = useAccessContext();
  return (
    <a
      className={className}
      href={uri}
      onClick={(event) => {
        event.preventDefault();
        void openQortalLink(uri);
      }}
    >
      {children}
      <Icon name="arrow" />
    </a>
  );
}

export function StatusPill({
  children,
  tone = 'current',
}: {
  children: ReactNode;
  tone?: 'current' | 'beta' | 'tool';
}) {
  return <span className={`status-pill status-pill--${tone}`}>{children}</span>;
}

export function CtaBand({
  eyebrow,
  title,
  children,
  actions,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  actions: ReactNode;
}) {
  return (
    <section className="section section--tight">
      <div className="shell">
        <div className="cta-band">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{children}</p>
          </div>
          <div className="button-row">{actions}</div>
        </div>
      </div>
    </section>
  );
}
