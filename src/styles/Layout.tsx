import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useIframe } from '../hooks/useIframeListener';

const Layout = () => {
  useIframe();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer className="sc-site-footer">
        <span>© 2026 CHD</span>
        <Link to="/terms" className="sc-site-footer-link">
          Terms of Service
        </Link>
      </footer>
    </>
  );
};

export default Layout;
