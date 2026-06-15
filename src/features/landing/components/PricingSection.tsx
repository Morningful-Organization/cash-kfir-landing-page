import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { SectionHeading } from '../../../shared/components/ui/SectionHeading';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';
import { useAnalytics } from '../../../shared/hooks';
import { APP_CONFIG } from '../../../shared/config/environment';

type BillingCycle = 'monthly' | 'annual';

interface Plan {
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  annualTotal: number;
  features: string[];
  highlighted: boolean;
  ctaLabel: string;
}

const PLANS: Plan[] = [
  {
    name: 'Morningful Free',
    tagline: 'Get started with the essentials',
    monthlyPrice: 0,
    annualMonthlyPrice: 0,
    annualTotal: 0,
    features: ['Connect bank accounts', 'Daily AI alerts'],
    highlighted: false,
    ctaLabel: 'Get started free',
  },
  {
    name: 'Morningful Pro',
    tagline: 'For finance teams who want deeper insight',
    monthlyPrice: 29.99,
    annualMonthlyPrice: 22.49,
    annualTotal: 269.91,
    features: [
      'AI Insights & CFO Reports',
      'Advanced Analytics & Reports',
      'Unlimited bank connections',
      'Priority support',
    ],
    highlighted: true,
    ctaLabel: 'Start free trial',
  },
  {
    name: 'Corporate',
    tagline: 'For teams managing multiple clients',
    monthlyPrice: 99.99,
    annualMonthlyPrice: 74.99,
    annualTotal: 899.91,
    features: [
      'Everything in Pro',
      'Corporate dashboard',
      'Multi-client management',
      'Corporate alerts & snapshots',
      'Dedicated account manager',
    ],
    highlighted: false,
    ctaLabel: 'Start free trial',
  },
];

const formatPrice = (value: number) =>
  value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

interface PricingSectionProps {
  onContactClick?: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onContactClick }) => {
  const { ref, isInView } = useScrollAnimation();
  const { trackCTAClick } = useAnalytics();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');

  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const annualBtnRef = useRef<HTMLButtonElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const target =
      billingCycle === 'monthly' ? monthlyBtnRef.current : annualBtnRef.current;
    if (!target) return;
    const parent = target.offsetParent as HTMLElement | null;
    if (!parent) return;
    setIndicator({ left: target.offsetLeft, width: target.offsetWidth });
  }, [billingCycle]);

  const handleSelectPlan = (planName: string) => {
    trackCTAClick(`Select plan: ${planName}`, 'pricing_section');
    window.open(APP_CONFIG.APP_URL, '_blank');
  };

  const handleContactSalesClick = () => {
    trackCTAClick('Contact Sales', 'pricing_section');
    onContactClick?.();
  };

  return (
    <section id="pricing" ref={ref} className="bg-surface-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title="Choose the plan that fits your team"
            description="Start with a 14-day free trial. No credit card required. Switch or cancel anytime."
          />
        </motion.div>

        {/* Billing cycle toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <div className="relative inline-flex items-center rounded-full border border-border bg-surface p-1.5 shadow-card">
            <motion.div
              animate={{ left: indicator.left, width: indicator.width }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="absolute inset-y-1.5 rounded-full bg-ink"
            />
            <button
              ref={monthlyBtnRef}
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`relative z-10 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 ${
                billingCycle === 'monthly'
                  ? 'text-white'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              Monthly
            </button>
            <button
              ref={annualBtnRef}
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300 ${
                billingCycle === 'annual'
                  ? 'text-white'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              Annual
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-xs transition-colors duration-300 ${
                  billingCycle === 'annual'
                    ? 'bg-brand text-white'
                    : 'bg-brand/10 text-brand'
                }`}
              >
                Save 25%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plan cards */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan, index) => {
            const isFree = plan.monthlyPrice === 0;
            const displayPrice =
              billingCycle === 'annual'
                ? plan.annualMonthlyPrice
                : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                }
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className={`relative flex flex-col rounded-2xl border bg-surface p-8 ${
                  plan.highlighted
                    ? 'border-brand ring-2 ring-brand shadow-card-lg'
                    : 'border-border shadow-card'
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute right-8 top-8 font-mono text-xs font-medium uppercase tracking-eyebrow text-brand">
                    Most popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{plan.tagline}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline text-ink">
                    <span className="mr-1 text-2xl font-semibold">$</span>
                    <motion.span
                      key={`${plan.name}-${billingCycle}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-display text-5xl font-semibold tracking-tight tabular-figures lg:text-6xl"
                    >
                      {formatPrice(displayPrice)}
                    </motion.span>
                    <span className="ml-2 text-lg text-ink-soft">/mo</span>
                  </div>
                  <div className="mt-2 flex h-6 items-center text-sm">
                    {isFree ? null : billingCycle === 'annual' ? (
                      <span className="text-ink-soft tabular-figures">
                        ${formatPrice(plan.annualTotal)} billed annually{' '}
                        <span className="ml-1 font-medium text-brand">
                          Save 25%
                        </span>
                      </span>
                    ) : (
                      <span className="text-ink-soft">Billed monthly</span>
                    )}
                  </div>
                </div>

                <p className="mb-8 font-mono text-xs uppercase tracking-eyebrow text-ink-soft">
                  {isFree ? 'No card required' : '14-day free trial'}
                </p>

                <Button
                  size="lg"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  onClick={() => handleSelectPlan(plan.name)}
                  className="group w-full"
                >
                  {plan.ctaLabel}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>

                <div className="mt-8 border-t border-border pt-8">
                  <p className="mb-4 font-mono text-xs uppercase tracking-eyebrow text-ink-soft">
                    What's included
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map(feature => (
                      <li
                        key={feature}
                        className="flex items-start text-sm leading-relaxed text-ink"
                      >
                        <Check className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center text-sm text-ink-soft"
        >
          Need a custom plan for your enterprise?{' '}
          <button
            type="button"
            onClick={handleContactSalesClick}
            className="font-medium text-brand hover:underline"
          >
            Contact our sales team
          </button>
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
