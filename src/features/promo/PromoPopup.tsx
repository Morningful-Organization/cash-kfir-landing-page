import React, { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '../../shared/components/ui/Button';
import { Eyebrow } from '../../shared/components/ui/Eyebrow';
import { useAnalytics } from '../../shared/hooks';
import { APP_CONFIG } from '../../shared/config/environment';

interface PromoPopupProps {
  /** Opens the Contact / "Book a demo" modal */
  onBookDemo?: () => void;
  /** Delay before the popup appears, in ms (default 18s) */
  delayMs?: number;
}

const SESSION_KEY = 'mf_promo_seen';

const PromoPopup: React.FC<PromoPopupProps> = ({
  onBookDemo,
  delayMs = 18000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { trackCTAClick, trackRegisterClick, logEvent } = useAnalytics();

  useEffect(() => {
    // Show at most once per browser session.
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem(SESSION_KEY, '1');
      logEvent('promo_popup_shown', { trigger: 'timed', delay_ms: delayMs });
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [delayMs, logEvent]);

  const close = useCallback(() => setIsOpen(false), []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  const handleTryFree = () => {
    trackCTAClick('Start free trial', 'timed_popup');
    trackRegisterClick('timed_popup', APP_CONFIG.APP_URL);
    window.open(APP_CONFIG.APP_URL, '_blank');
    close();
  };

  const handleBookDemo = () => {
    trackCTAClick('Book a demo', 'timed_popup');
    onBookDemo?.();
    close();
  };

  const handleDismiss = () => {
    trackCTAClick('Dismiss', 'timed_popup');
    close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <button
            aria-label="Close"
            onClick={handleDismiss}
            className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-popup-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface shadow-card-lg"
          >
            {/* Brand accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-secondary via-brand to-brand-accent" />

            <button
              onClick={handleDismiss}
              aria-label="Close"
              className="absolute right-4 top-5 flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-surface-muted hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-8">
              <Eyebrow>14-day free trial</Eyebrow>

              <h2
                id="promo-popup-title"
                className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-ink"
              >
                See your full cash position by tomorrow morning.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                Connect your bank accounts in minutes and let Morningful turn
                them into one live view with daily AI insights. No credit card
                required.
              </p>

              <div className="mt-7 flex flex-col gap-3">
                <Button size="lg" onClick={handleTryFree} className="group w-full">
                  Start free trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleBookDemo}
                  className="w-full"
                >
                  Book a demo
                </Button>
              </div>

              <button
                onClick={handleDismiss}
                className="mt-5 w-full text-center text-sm text-ink-soft transition-colors hover:text-ink"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;
export { PromoPopup };
