'use client';

import { useEffect, useRef } from 'react';

export function useTurnstile({
  siteKey,
  onSuccess,
  onExpired,
  onError,
}: {
  siteKey?: string;
  onSuccess: (token: string) => void;
  onExpired: () => void;
  onError: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string>();

  useEffect(() => {
    if (!siteKey) return;

    const checkedSiteKey = siteKey;
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    function renderWidget(): void {
      if (
        cancelled ||
        widgetIdRef.current ||
        !containerRef.current ||
        !window.turnstile
      ) {
        return;
      }

      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: checkedSiteKey,
        callback: onSuccess,
        'expired-callback': onExpired,
        'error-callback': onError,
        theme: 'auto',
        size: 'normal',
        appearance: 'always',
      });

      if (widgetId) {
        widgetIdRef.current = widgetId;

        if (intervalId) {
          clearInterval(intervalId);
          intervalId = undefined;
        }
      }
    }

    renderWidget();

    if (!widgetIdRef.current) {
      intervalId = setInterval(renderWidget, 100);
    }

    return () => {
      cancelled = true;

      if (intervalId) {
        clearInterval(intervalId);
      }

      if (widgetIdRef.current) {
        window.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = undefined;
      }
    };
  }, [siteKey, onSuccess, onExpired, onError]);

  function resetTurnstile(): void {
    if (widgetIdRef.current) {
      window.turnstile?.reset(widgetIdRef.current);
    }
  }

  return {
    containerRef,
    resetTurnstile,
  };
}
