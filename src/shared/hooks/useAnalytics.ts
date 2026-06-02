import { useEffect, useCallback } from 'react';
import { analyticsService } from '../services/analytics';

/**
 * Hook for Google Analytics integration
 * Automatically tracks page views and provides event logging functions
 */
export const useAnalytics = () => {
  // Track page view on mount
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentTitle = document.title;
    analyticsService.logPageView(currentPath, currentTitle);
  }, []);

  // Memoized event logging functions
  const logEvent = useCallback((eventName: string, params?: { [key: string]: any }) => {
    analyticsService.logEvent(eventName, params);
  }, []);

  const logPageView = useCallback((path: string, title?: string) => {
    analyticsService.logPageView(path, title);
  }, []);

  const trackDemoRequest = useCallback((formData: any) => {
    analyticsService.trackDemoRequest(formData);
  }, []);

  const trackCTAClick = useCallback((buttonText: string, section: string) => {
    analyticsService.trackCTAClick(buttonText, section);
  }, []);

  const trackNavigation = useCallback((item: string) => {
    analyticsService.trackNavigation(item);
  }, []);

  const trackScrollDepth = useCallback((percentage: number) => {
    analyticsService.trackScrollDepth(percentage);
  }, []);

  const trackFeatureInteraction = useCallback((feature: string, action: string) => {
    analyticsService.trackFeatureInteraction(feature, action);
  }, []);

  const trackRegisterClick = useCallback((location: string, destination: string) => {
    analyticsService.trackRegisterClick(location, destination);
  }, []);

  const trackOutboundLink = useCallback((url: string, label: string, location: string) => {
    analyticsService.trackOutboundLink(url, label, location);
  }, []);

  return {
    logEvent,
    logPageView,
    trackDemoRequest,
    trackCTAClick,
    trackNavigation,
    trackScrollDepth,
    trackFeatureInteraction,
    trackRegisterClick,
    trackOutboundLink,
  };
};

/**
 * Resolve a short, human-readable label for a clicked element.
 * Prefers explicit data-track / aria-label, then trimmed text content.
 */
const getClickLabel = (el: HTMLElement): string => {
  const explicit =
    el.getAttribute('data-track') ||
    el.getAttribute('aria-label') ||
    el.getAttribute('title');
  if (explicit) return explicit.trim();

  const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
  if (text) return text.slice(0, 80);

  // Fall back to an icon-only button's alt text or its tag name.
  const img = el.querySelector('img');
  if (img?.alt) return img.alt.trim();

  return el.tagName.toLowerCase();
};

/**
 * Find the nearest ancestor section identifier so we know where on the
 * page the click happened (e.g. "features", "pricing").
 */
const getSection = (el: HTMLElement): string => {
  const section = el.closest('section[id], [data-section], [id]') as HTMLElement | null;
  if (!section) return 'unknown';
  return section.getAttribute('data-section') || section.id || 'unknown';
};

/**
 * Global click tracking. Attaches a single document-level listener that
 * captures every click on an interactive element (button, link, role=button,
 * or anything marked with data-track) and forwards it to GA + Mixpanel.
 *
 * This gives full click coverage automatically; the existing named events
 * (CTA, navigation, etc.) continue to fire alongside it for richer context.
 */
export const useGlobalClickTracking = () => {
  useEffect(() => {
    const INTERACTIVE = 'a, button, [role="button"], [data-track], input[type="submit"], input[type="button"]';

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest(INTERACTIVE) as HTMLElement | null;
      if (!el) return;

      const anchor = el.closest('a') as HTMLAnchorElement | null;
      const href = anchor?.href || undefined;
      const label = getClickLabel(el);
      const section = getSection(el);
      const elementType = el.tagName.toLowerCase();

      analyticsService.trackAutoClick({ label, elementType, section, href });

      // Separately flag links that navigate away from the page.
      if (href && anchor && anchor.host !== window.location.host) {
        analyticsService.trackOutboundLink(href, label, section);
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);
};

/**
 * Hook for tracking scroll depth
 * Automatically tracks when user scrolls to 25%, 50%, 75%, and 100% of the page
 */
export const useScrollTracking = () => {
  const { trackScrollDepth } = useAnalytics();

  useEffect(() => {
    const trackedDepths = new Set<number>();
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
      
      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100];
      
      for (const milestone of milestones) {
        if (scrollPercentage >= milestone && !trackedDepths.has(milestone)) {
          trackedDepths.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [trackScrollDepth]);
};
