import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SiteShell } from '../site/SiteShell';

const Layout = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) {
        return false;
      }

      window.requestAnimationFrame(() => {
        const header = document.querySelector<HTMLElement>('.site-header');
        const headerOffset = (header?.offsetHeight ?? 76) + 12;
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(targetTop - headerOffset, 0),
          behavior: 'auto',
        });
      });
      return true;
    };

    if (scrollToTarget()) {
      return;
    }

    const observer = new MutationObserver(() => {
      if (scrollToTarget()) {
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [hash, pathname]);

  return <SiteShell />;
};

export default Layout;
