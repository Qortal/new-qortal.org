import { Outlet } from 'react-router-dom';
import { useIframe } from '../hooks/useIframeListener';

const Layout = () => {
  useIframe();
  return (
    <>
      {/* Add Header here */}
      <main>
        <Outlet /> {/* This is where page content will be rendered */}
      </main>
      {/* Add Footer here */}
    </>
  );
};

export default Layout;
