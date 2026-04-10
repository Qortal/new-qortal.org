import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BRAND_FAVICON } from './brandAssets.ts';
import ThemeProviderWrapper from './styles/theme/theme-provider.tsx';
import './index.css';
import { Routes } from './routes/Routes.tsx';

const SPA_REDIRECT_STORAGE_KEY = 'nuqloud.spa.redirect';

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

function restoreRedirectedSpaPath() {
  if (typeof window === 'undefined') {
    return;
  }

  let redirectedPath = '';

  try {
    redirectedPath = window.sessionStorage.getItem(SPA_REDIRECT_STORAGE_KEY) || '';
    if (redirectedPath) {
      window.sessionStorage.removeItem(SPA_REDIRECT_STORAGE_KEY);
    }
  } catch {
    redirectedPath = '';
  }

  if (!redirectedPath) {
    return;
  }

  const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (redirectedPath === currentPath) {
    return;
  }

  window.history.replaceState(null, '', redirectedPath);
}

syncFavicon(BRAND_FAVICON);
restoreRedirectedSpaPath();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <Routes />
    </ThemeProviderWrapper>
  </StrictMode>
);
