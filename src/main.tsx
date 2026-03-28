import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BRAND_FAVICON } from './brandAssets.ts';
import ThemeProviderWrapper from './styles/theme/theme-provider.tsx';
import './index.css';
import { Routes } from './routes/Routes.tsx';

function syncFavicon(href: string) {
  if (!href || typeof document === "undefined") {
    return;
  }
  let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    document.head.appendChild(favicon);
  }
  favicon.type = "image/png";
  favicon.href = href;
}

syncFavicon(BRAND_FAVICON);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <Routes />
    </ThemeProviderWrapper>
  </StrictMode>
);
