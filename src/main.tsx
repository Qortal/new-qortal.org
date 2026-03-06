import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ThemeProviderWrapper from './styles/theme/theme-provider.tsx';
import './index.css';
import { Routes } from './routes/Routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <Routes />
    </ThemeProviderWrapper>
  </StrictMode>
);
