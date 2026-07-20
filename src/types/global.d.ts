declare module '*.css';

type TurnstileApi = {
  render: (
    container: HTMLElement | string,
    options: {
      sitekey: string;
      callback?: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
      theme?: 'auto' | 'light' | 'dark';
      size?: 'normal' | 'compact' | 'flexible';
      appearance?: 'always' | 'execute' | 'interaction-only';
    },
  ) => string | undefined;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

interface Window {
  turnstile?: TurnstileApi;

  newsletterTurnstileSuccess?: (token: string) => void;
  newsletterTurnstileExpired?: () => void;
  newsletterTurnstileError?: () => void;

  contactTurnstileSuccess?: (token: string) => void;
  contactTurnstileExpired?: () => void;
  contactTurnstileError?: () => void;
}
