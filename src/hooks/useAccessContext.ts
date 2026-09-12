import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type AccessMode = 'gateway' | 'qdn' | 'internet';

export type AccessContext = {
  mode: AccessMode;
  isGateway: boolean;
  isQdn: boolean;
  label: string;
  detail: string;
  primaryAction: string;
  primaryTarget: string;
};

type QortalRequestLike = (payload: {
  action: string;
  qortalLink?: string;
}) => Promise<unknown>;

const TRUSTED_GATEWAY_HOST_SUFFIXES = ['qortal.link', 'qortal.name'];

const DEFAULT_INTERNET_CONTEXT: AccessContext = {
  mode: 'internet',
  isGateway: false,
  isQdn: false,
  label: 'Open Web Context',
  detail: 'This copy is being viewed through the ordinary internet.',
  primaryAction: 'Choose a Starting Point',
  primaryTarget: 'get-started',
};

function isTrustedGatewayHost(hostname: string): boolean {
  const normalized = hostname.toLowerCase().trim();
  return TRUSTED_GATEWAY_HOST_SUFFIXES.some(
    (domain) => normalized === domain || normalized.endsWith(`.${domain}`)
  );
}

function hasQortalGatewayMarker(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const runtimeBase = String(window._qdnBase || '').trim();
  const path = String(window.location.pathname || '');

  return Boolean(runtimeBase) || /\/render\/(?:APP|WEBSITE)\//i.test(path);
}

function hasAuthenticatedAccount(response: unknown): boolean {
  if (!response || typeof response !== 'object') {
    return false;
  }

  const account = response as {
    address?: unknown;
    selectedAddress?: unknown;
    error?: unknown;
  };

  if (account.error) {
    return false;
  }

  return (
    typeof account.address === 'string' ||
    typeof account.selectedAddress === 'string'
  );
}

function resolveQortalRequest(): QortalRequestLike | null {
  if (typeof qortalRequest === 'function') {
    return qortalRequest as QortalRequestLike;
  }

  const globalCandidate = (globalThis as { qortalRequest?: unknown })
    .qortalRequest;
  if (typeof globalCandidate === 'function') {
    return globalCandidate as QortalRequestLike;
  }

  if (typeof window !== 'undefined') {
    const windowCandidate = (window as { qortalRequest?: unknown })
      .qortalRequest;
    if (typeof windowCandidate === 'function') {
      return windowCandidate as QortalRequestLike;
    }

    const parentCandidate = (
      window.parent as { qortalRequest?: unknown } | null
    )?.qortalRequest;
    if (typeof parentCandidate === 'function') {
      return parentCandidate as QortalRequestLike;
    }
  }

  return null;
}

function useAccessContextState() {
  const [accessContext, setAccessContext] = useState<AccessContext>(
    DEFAULT_INTERNET_CONTEXT
  );
  const [contextActionFeedback, setContextActionFeedback] = useState('');

  useEffect(() => {
    let cancelled = false;

    const setSafeContext = (next: AccessContext) => {
      if (!cancelled) {
        setAccessContext(next);
      }
    };

    const detectRuntimeContext = async () => {
      if (typeof window === 'undefined') {
        setSafeContext(DEFAULT_INTERNET_CONTEXT);
        return;
      }

      const hostname = String(window.location.hostname || '').toLowerCase();
      if (
        (hostname && isTrustedGatewayHost(hostname)) ||
        hasQortalGatewayMarker()
      ) {
        setSafeContext({
          mode: 'gateway',
          isGateway: true,
          isQdn: false,
          label: 'Qortal Gateway Context',
          detail: hostname
            ? `Gateway-hosted Q-App detected at ${hostname}. Internet checkout and contact links remain available.`
            : 'Gateway-hosted Q-App detected. Internet checkout and contact links remain available.',
          primaryAction: 'Choose a Starting Point',
          primaryTarget: 'get-started',
        });
      } else {
        setSafeContext(DEFAULT_INTERNET_CONTEXT);
      }

      // In Hub/dev contexts the qortalRequest bridge can appear after mount.
      const maxAttempts = 14;
      for (let attempt = 0; attempt < maxAttempts && !cancelled; attempt += 1) {
        const requester = resolveQortalRequest();
        if (!requester) {
          await new Promise((resolve) => window.setTimeout(resolve, 350));
          continue;
        }

        try {
          const response = await requester({ action: 'GET_USER_ACCOUNT' });
          if (hasAuthenticatedAccount(response)) {
            setSafeContext({
              mode: 'qdn',
              isGateway: false,
              isQdn: true,
              label: 'Authenticated QDN Context',
              detail:
                'Authenticated Qortal account detected via GET_USER_ACCOUNT.',
              primaryAction: 'Explore the Ecosystem',
              primaryTarget: 'ecosystem',
            });
            return;
          }
        } catch {
          // Keep polling briefly; bridge/auth may still be initializing.
        }

        await new Promise((resolve) => window.setTimeout(resolve, 350));
      }
    };

    void detectRuntimeContext();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!contextActionFeedback) {
      return;
    }
    const timer = window.setTimeout(() => setContextActionFeedback(''), 3200);
    return () => window.clearTimeout(timer);
  }, [contextActionFeedback]);

  const openOrCopyInternetLink = useCallback(
    async (url: string) => {
      if (typeof window === 'undefined') {
        return;
      }

      if (accessContext.mode === 'qdn') {
        try {
          await navigator.clipboard.writeText(url);
          setContextActionFeedback(
            'Copied internet-only link to clipboard for external browser use.'
          );
        } catch {
          setContextActionFeedback(
            `Copy failed. Use this link manually: ${url}`
          );
        }
        return;
      }

      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (opened) {
        setContextActionFeedback(
          accessContext.mode === 'gateway'
            ? 'Opened internet link from the Qortal gateway in a new tab.'
            : 'Opened link in a new browser tab.'
        );
      } else {
        window.location.assign(url);
      }
    },
    [accessContext.mode]
  );

  const openQortalLink = useCallback(
    async (qortalLink: string) => {
      if (typeof window === 'undefined' || !qortalLink) {
        return;
      }

      if (accessContext.mode === 'qdn') {
        const requester = resolveQortalRequest();
        if (requester) {
          try {
            await requester({
              action: 'OPEN_NEW_TAB',
              qortalLink,
            });
            setContextActionFeedback('Opened Qortal link in a new tab.');
            return;
          } catch {
            // Fall through to direct navigation if the bridge rejects the call.
          }
        }
      }

      window.location.assign(qortalLink);
    },
    [accessContext.mode]
  );

  return {
    accessContext,
    contextActionFeedback,
    openQortalLink,
    openOrCopyInternetLink,
  };
}

type AccessContextValue = ReturnType<typeof useAccessContextState>;

const AccessContextReactContext = createContext<AccessContextValue | null>(
  null
);

export function AccessContextProvider({ children }: { children: ReactNode }) {
  const value = useAccessContextState();
  return createElement(AccessContextReactContext.Provider, { value }, children);
}

export function useAccessContext() {
  const value = useContext(AccessContextReactContext);
  if (!value) {
    throw new Error(
      'useAccessContext must be used within AccessContextProvider'
    );
  }
  return value;
}
