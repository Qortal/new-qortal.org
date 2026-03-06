import { Link, Outlet } from 'react-router-dom';
import { useIframe } from '../hooks/useIframeListener';

const Layout = () => {
  useIframe();
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
