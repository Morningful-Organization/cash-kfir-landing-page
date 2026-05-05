import { useEffect } from 'react';

const APOLLO_APP_ID = '69f1f64418110800116a18ab';
const APOLLO_SCRIPT_SRC = 'https://assets.apollo.io/micro/website-tracker/tracker.iife.js';
const APOLLO_SCRIPT_SELECTOR = 'script[data-apollo-tracker="true"]';

declare global {
  interface Window {
    trackingFunctions?: {
      onLoad: (config: { appId: string }) => void;
    };
    __apolloTrackerInitialized?: boolean;
  }
}

export const useApolloTracker = () => {
  useEffect(() => {
    const initializeApollo = () => {
      if (window.__apolloTrackerInitialized || !window.trackingFunctions?.onLoad) {
        return;
      }

      window.trackingFunctions.onLoad({ appId: APOLLO_APP_ID });
      window.__apolloTrackerInitialized = true;
    };

    const existingScript = document.querySelector<HTMLScriptElement>(APOLLO_SCRIPT_SELECTOR);

    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        initializeApollo();
      } else {
        existingScript.addEventListener('load', initializeApollo, { once: true });
      }

      return () => {
        existingScript.removeEventListener('load', initializeApollo);
      };
    }

    const cacheBust = Math.random().toString(36).substring(7);
    const script = document.createElement('script');
    script.src = `${APOLLO_SCRIPT_SRC}?nocache=${cacheBust}`;
    script.async = true;
    script.defer = true;
    script.dataset.apolloTracker = 'true';
    script.onload = () => {
      script.dataset.loaded = 'true';
      initializeApollo();
    };

    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);
};