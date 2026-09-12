/// <reference types="vite/client" />

declare function qortalRequest(payload: {
  action: string;
  qortalLink?: string;
  [key: string]: unknown;
}): Promise<unknown>;

interface Window {
  _qdnBase?: string;
  _qdnTheme?: 'dark' | 'light';
}
