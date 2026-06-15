import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../../../../shared/components/ui/Button';
import { Eyebrow } from '../../../../shared/components/ui/Eyebrow';
import { useAnalytics } from '../../../../shared/hooks';
import { APP_CONFIG } from '../../../../shared/config/environment';
import type { Audience } from './index';

interface HeroContentProps {
  audience: Audience;
  onContactClick?: () => void;
}

const COPY: Record<
  Audience,
  { eyebrow: string; headline: string; steps: string[] }
> = {
  personal: {
    eyebrow: 'Personal & business treasury',
    headline: 'Put your idle cash to work.',
    steps: [
      'Connect your banks',
      'Get AI insights & investment options',
      'Earn on idle cash',
    ],
  },
  corporate: {
    eyebrow: 'Multi-client treasury',
    headline: 'Treasury for every client you manage.',
    steps: [
      'Invite clients & connect their banks',
      'AI analysis, insights & investments',
      'Earn on idle cash',
    ],
  },
};

const HeroContent: React.FC<HeroContentProps> = ({
  audience,
  onContactClick,
}) => {
  const { trackCTAClick, trackRegisterClick } = useAnalytics();
  const copy = COPY[audience];

  const handleRegister = () => {
    trackCTAClick('Start free trial', `hero_${audience}`);
    trackRegisterClick(`hero_${audience}`, APP_CONFIG.APP_URL);
    window.open(APP_CONFIG.APP_URL, '_blank');
  };

  const handleBookDemo = () => {
    trackCTAClick('Book a demo', `hero_${audience}`);
    onContactClick?.();
  };

  return (
    <div className="max-w-xl">
      {/* Adaptive block: eyebrow + headline + step flow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={audience}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Eyebrow>{copy.eyebrow}</Eyebrow>

          <h1 className="mt-6 font-display text-[2.5rem] leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            {copy.headline}
          </h1>

          {/* Step flow — numbered vertical timeline */}
          <ol className="mt-8">
            {copy.steps.map((step, i) => {
              const last = i === copy.steps.length - 1;
              return (
                <li
                  key={step}
                  className={`flex gap-4 ${last ? '' : 'min-h-[3.25rem]'}`}
                >
                  <div className="flex flex-col items-center self-stretch">
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                        last ? 'bg-brand text-white' : 'bg-brand/10 text-brand'
                      }`}
                    >
                      {last ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    {!last && (
                      <span
                        className="mt-1.5 w-px flex-1 bg-border"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <span
                    className={`leading-7 ${
                      last
                        ? 'font-semibold text-brand-secondary'
                        : 'font-medium text-ink'
                    }`}
                  >
                    {step}
                  </span>
                </li>
              );
            })}
          </ol>
        </motion.div>
      </AnimatePresence>

      {/* Static block: subhead + CTAs + trust (same for both) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
          Morningful unifies every bank account into one live view and turns
          your cash position into daily, CFO-grade insights, so your finance
          team acts before the day starts.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button size="lg" onClick={handleRegister} className="group">
            Start free trial
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
          <Button variant="outline" size="lg" onClick={handleBookDemo}>
            Book a demo
          </Button>
        </div>

        <p className="mt-5 text-sm text-ink-soft">
          No credit card required · 14-day free trial · Full access.
        </p>

        {/* Plaid + AWS trust strip */}
        <div className="mt-7 inline-flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl border border-border bg-surface px-4 py-2.5 shadow-card">
          <span className="inline-flex items-center gap-2">
            <span className="text-sm font-medium text-ink">Secured by</span>
            <img
              src="/images/plaid/plaid-logo.png"
              alt="Plaid"
              className="h-8 w-auto"
            />
          </span>
          <span
            className="hidden h-8 w-px bg-border sm:block"
            aria-hidden="true"
          />
          <span className="inline-flex items-center gap-2">
            <span className="text-sm font-medium text-ink">Hosted on</span>
            <img
              src="/images/amazon/awslogo.webp"
              alt="Amazon Web Services"
              className="h-6 w-auto"
            />
          </span>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="font-mono text-xs uppercase tracking-eyebrow text-ink-soft">
            Trusted by finance teams at Verobotics, Zoma &amp; 12+ companies
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
