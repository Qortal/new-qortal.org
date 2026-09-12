import Layout from './styles/Layout';
import { AccessContextProvider } from './hooks/useAccessContext';

export const AppWrapper = () => {
  return (
    <AccessContextProvider>
      <Layout />
    </AccessContextProvider>
  );
};
