import { useCallback, useEffect, useState } from 'react';

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

type QortalRequestLike = (payload: { action: string }) => Promise<unknown>;

const TRUSTED_GATEWAY_HOST_SUFFIXES = ['crowetic.com'];

const DEFAULT_INTERNET_CONTEXT: AccessContext = {
  mode: 'internet',
  isGateway: false,
  isQdn: false,
  label: 'Internet Context',
  detail: 'Detected standard browser context outside trusted gateway hosts.',
  primaryAction: 'Choose Deployment Path',
  primaryTarget: 'paths',
};

function isTrustedGatewayHost(hostname: string): boolean {
  const normalized = hostname.toLowerCase().trim();
  return TRUSTED_GATEWAY_HOST_SUFFIXES.some(
    (domain) => normalized === domain || normalized.endsWith(`.${domain}`)
  );
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

export function useAccessContext() {
  const [accessContext, setAccessContext] = useState<AccessContext>(DEFAULT_INTERNET_CONTEXT);
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
      if (hostname && isTrustedGatewayHost(hostname)) {
        setSafeContext({
          mode: 'gateway',
          isGateway: true,
          isQdn: false,
          label: 'Trusted Gateway Context',
          detail: `Gateway host detected: ${hostname}`,
          primaryAction: 'Choose Deployment Path',
          primaryTarget: 'paths',
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
              detail: 'Authenticated Qortal account detected via GET_USER_ACCOUNT.',
              primaryAction: 'See Decentralized Roadmap',
              primaryTarget: 'evolution',
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

  const openOrCopyInternetLink = useCallback(async (url: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (accessContext.mode === 'qdn') {
      try {
        await navigator.clipboard.writeText(url);
        setContextActionFeedback('Copied internet-only link to clipboard for external browser use.');
      } catch {
        setContextActionFeedback(`Copy failed. Use this link manually: ${url}`);
      }
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
    setContextActionFeedback('Opened link in a new browser tab.');
  }, [accessContext.mode]);

  return {
    accessContext,
    contextActionFeedback,
    openOrCopyInternetLink,
  };
}
