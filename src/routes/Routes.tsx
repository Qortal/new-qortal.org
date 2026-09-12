import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppWrapper } from '../AppWrapper';
import HomePage from '../site/pages/HomePage';

const ExplorePage = lazy(() => import('../site/pages/ExplorePage'));
const TechnologyPage = lazy(() => import('../site/pages/TechnologyPage'));
const EcosystemPage = lazy(() => import('../site/pages/EcosystemPage'));
const GetStartedPage = lazy(() => import('../site/pages/GetStartedPage'));
const BuildPage = lazy(() => import('../site/pages/BuildPage'));
const CommunityPage = lazy(() => import('../site/pages/CommunityPage'));
const AboutPage = lazy(() => import('../site/pages/AboutPage'));
const NotFoundPage = lazy(() => import('../site/pages/NotFoundPage'));

function RouteLoader({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="route-loader" role="status">
          Loading Qortal…
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

interface CustomWindow extends Window {
  _qdnBase: string;
}
const customWindow = window as unknown as CustomWindow;
const baseUrl = customWindow?._qdnBase || '';

export function Routes() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <AppWrapper />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'explore',
            element: (
              <RouteLoader>
                <ExplorePage />
              </RouteLoader>
            ),
          },
          {
            path: 'technology',
            element: (
              <RouteLoader>
                <TechnologyPage />
              </RouteLoader>
            ),
          },
          {
            path: 'ecosystem',
            element: (
              <RouteLoader>
                <EcosystemPage />
              </RouteLoader>
            ),
          },
          {
            path: 'get-started',
            element: (
              <RouteLoader>
                <GetStartedPage />
              </RouteLoader>
            ),
          },
          {
            path: 'build',
            element: (
              <RouteLoader>
                <BuildPage />
              </RouteLoader>
            ),
          },
          {
            path: 'community',
            element: (
              <RouteLoader>
                <CommunityPage />
              </RouteLoader>
            ),
          },
          {
            path: 'about',
            element: (
              <RouteLoader>
                <AboutPage />
              </RouteLoader>
            ),
          },
          {
            path: '*',
            element: (
              <RouteLoader>
                <NotFoundPage />
              </RouteLoader>
            ),
          },
        ],
      },
    ],
    {
      basename: baseUrl,
    }
  );

  return <RouterProvider router={router} />;
}
