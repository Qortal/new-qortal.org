import type { SVGProps } from 'react';

export type IconName =
  | 'arrow'
  | 'blocks'
  | 'chat'
  | 'code'
  | 'community'
  | 'core'
  | 'data'
  | 'download'
  | 'external'
  | 'globe'
  | 'hub'
  | 'identity'
  | 'menu'
  | 'moon'
  | 'network'
  | 'shield'
  | 'sun'
  | 'trade'
  | 'wallet'
  | 'x';

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  blocks: (
    <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Zm-8 9 8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" />
  ),
  chat: <path d="M5 5h14v10H9l-4 4V5Zm4 4h6M9 12h4" />,
  code: <path d="m9 7-5 5 5 5m6-10 5 5-5 5m-3-12-2 14" />,
  community: (
    <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-1a2.5 2.5 0 1 0 0-5m-8 9c-3.3 0-6 1.8-6 4v1h12v-1c0-2.2-2.7-4-6-4Zm8-1c3 0 5.5 1.6 5.5 3.7V18H17" />
  ),
  core: <path d="M12 2 4 6v12l8 4 8-4V6l-8-4Zm0 5 4 2v6l-4 2-4-2V9l4-2Z" />,
  data: (
    <path d="M4 6c0-2 3.6-3 8-3s8 1 8 3-3.6 3-8 3-8-1-8-3Zm0 0v6c0 2 3.6 3 8 3s8-1 8-3V6M4 12v6c0 2 3.6 3 8 3s8-1 8-3v-6" />
  ),
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 20h16" />,
  external: <path d="M14 4h6v6m0-6-9 9M18 13v7H4V6h7" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  hub: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="6" r="2" />
      <circle cx="20" cy="6" r="2" />
      <circle cx="12" cy="21" r="2" />
      <path d="m6 7 4 3m8-3-4 3m-2 5v4" />
    </>
  ),
  identity: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c.8-5 3.5-7 8-7s7.2 2 8 7" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  moon: <path d="M20 15.5A8 8 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
  network: (
    <>
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="m6.5 10.5 4-4m3 0 4 4m0 3-4 4m-3 0-4-4" />
    </>
  ),
  shield: (
    <path d="M12 2 20 5v6c0 5.2-3.3 9-8 11-4.7-2-8-5.8-8-11V5l8-3Zm-3 10 2 2 4-5" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M19 5l-1.5 1.5m-11 11L5 19" />
    </>
  ),
  trade: <path d="M4 7h13m0 0-3-3m3 3-3 3M20 17H7m0 0 3 3m-3-3 3-3" />,
  wallet: (
    <>
      <path d="M4 6h14a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12" />
      <path d="M15 11h5v4h-5a2 2 0 0 1 0-4Z" />
    </>
  ),
  x: <path d="m5 5 14 14M19 5 5 19" />,
};

export function Icon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
