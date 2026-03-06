import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { AppWrapper } from '../AppWrapper';
import SelfHostingPage from '../SelfHostingPage';
import TermsPage from '../TermsPage';

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
            element: <App />,
          },
          {
            path: 'self-hosting',
            element: <SelfHostingPage />,
          },
          {
            path: 'terms',
            element: <TermsPage />,
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
