import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { siteLinks } from '../config/siteLinks';
import { useAccessContext } from '../hooks/useAccessContext';
import { EnumTheme, themeAtom } from '../state/global/system';
import { useIframe } from '../hooks/useIframeListener';
import { QortalLogo } from './Brand';
import { Icon } from './Icons';
import { ExternalLink } from './Shared';

const navItems = [
  { label: 'Explore', to: '/explore' },
  { label: 'Technology', to: '/technology' },
  { label: 'Ecosystem', to: '/ecosystem' },
  { label: 'Get Started', to: '/get-started' },
  { label: 'Build', to: '/build' },
  { label: 'Community', to: '/community' },
] as const;

export function SiteShell() {
  useIframe();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useAtom(themeAtom);
  const { accessContext, contextActionFeedback } = useAccessContext();

  useEffect(() => {
    setMenuOpen(false);
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      window.requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView()
      );
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="q-site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell site-header__inner">
          <QortalLogo />
          <nav
            id="site-navigation"
            className={`site-nav${menuOpen ? ' is-open' : ''}`}
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
            <ExternalLink href={siteLinks.docs} className="nav-docs">
              Docs
            </ExternalLink>
          </nav>
          <div className="header-actions">
            <span
              className={`access-badge access-badge--${accessContext.mode}`}
              title={accessContext.detail}
            >
              <i />
              {accessContext.mode === 'qdn'
                ? 'Inside Qortal'
                : accessContext.mode === 'gateway'
                  ? 'Qortal gateway'
                  : 'Open web'}
            </span>
            <button
              className="icon-button"
              type="button"
              aria-label={`Use ${theme === EnumTheme.DARK ? 'light' : 'dark'} theme`}
              onClick={() =>
                setTheme(
                  theme === EnumTheme.DARK ? EnumTheme.LIGHT : EnumTheme.DARK
                )
              }
            >
              <Icon name={theme === EnumTheme.DARK ? 'sun' : 'moon'} />
            </button>
            <button
              className="icon-button menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Icon name={menuOpen ? 'x' : 'menu'} />
            </button>
          </div>
        </div>
      </header>
      <main id="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="shell site-footer__grid">
          <div className="footer-brand">
            <QortalLogo />
            <p>Open infrastructure, built and operated by its community.</p>
            <span
              className={`access-detail access-detail--${accessContext.mode}`}
            >
              <i />
              {accessContext.label}
            </span>
          </div>
          <div>
            <strong>Discover</strong>
            <Link to="/explore">Why Qortal</Link>
            <Link to="/technology">Technology</Link>
            <Link to="/ecosystem">Ecosystem</Link>
            <Link to="/about">About</Link>
          </div>
          <div>
            <strong>Participate</strong>
            <Link to="/get-started">Get started</Link>
            <Link to="/build">Build a Q-App</Link>
            <Link to="/community">Community</Link>
            <ExternalLink href={siteLinks.docs} className="footer-link">
              Documentation
            </ExternalLink>
          </div>
          <div>
            <strong>Open source</strong>
            <ExternalLink
              href={siteLinks.coreRepository}
              className="footer-link"
            >
              Qortal Core
            </ExternalLink>
            <ExternalLink
              href={siteLinks.hubRepository}
              className="footer-link"
            >
              Qortal Hub
            </ExternalLink>
            <ExternalLink
              href={siteLinks.githubOrganization}
              className="footer-link"
            >
              All repositories
            </ExternalLink>
          </div>
        </div>
        <div className="shell site-footer__bottom">
          <span>© {new Date().getFullYear()} Qortal community</span>
          <span>No company. No token sale. Open source.</span>
        </div>
      </footer>
      {contextActionFeedback && (
        <div className="context-toast" role="status">
          {contextActionFeedback}
        </div>
      )}
    </div>
  );
}
