import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';
import { useAnalytics } from '../../../shared/hooks';

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

const PricingSection: React.FC = () => {
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
    window.open('https://app.morningful.ai', '_blank');
  };

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-[#00d4ff] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#1a2332] rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-5 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-full text-[#1a2332] font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-[#00d4ff]" />
            Simple, transparent pricing
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a2332] mb-6">
            Choose the plan that
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#0099cc]">
              {' '}
              fits your team
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with a 14-day free trial. No credit card required. Switch or
            cancel anytime.
          </p>
        </motion.div>

        {/* Billing cycle toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-14"
        >
          <div className="relative inline-flex items-center p-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
            <motion.div
              animate={{ left: indicator.left, width: indicator.width }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="absolute inset-y-1.5 bg-[#1a2332] rounded-full shadow-md"
            />
            <button
              ref={monthlyBtnRef}
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                billingCycle === 'monthly'
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              ref={annualBtnRef}
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Annual
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full transition-colors duration-300 ${
                  billingCycle === 'annual'
                    ? 'bg-[#00d4ff] text-[#1a2332]'
                    : 'bg-[#00d4ff]/15 text-[#0099cc]'
                }`}
              >
                Save 25%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan, index) => {
            const displayPrice =
              billingCycle === 'annual'
                ? plan.annualMonthlyPrice
                : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ delay: 0.3 + index * 0.15, duration: 0.7 }}
                className={`relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-[#1a2332] to-[#0f1419] text-white shadow-2xl shadow-[#00d4ff]/20 border border-[#00d4ff]/40'
                    : 'bg-white text-[#1a2332] shadow-xl hover:shadow-2xl border border-gray-100'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0 left-0 flex justify-center">
                    <div className="bg-[#00d4ff] text-[#1a2332] text-xs font-bold tracking-wider uppercase px-5 py-1.5 rounded-b-xl shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`p-8 lg:p-10 ${
                    plan.highlighted ? 'pt-14' : 'pt-10'
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p
                      className={`text-sm ${
                        plan.highlighted ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-semibold mr-1">$</span>
                      <motion.span
                        key={`${plan.name}-${billingCycle}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-5xl lg:text-6xl font-bold tracking-tight"
                      >
                        {formatPrice(displayPrice)}
                      </motion.span>
                      <span
                        className={`ml-2 text-lg ${
                          plan.highlighted ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        /mo
                      </span>
                    </div>
                    <div className="h-6 mt-2 flex items-center text-sm">
                      {billingCycle === 'annual' ? (
                        <span
                          className={
                            plan.highlighted ? 'text-gray-300' : 'text-gray-600'
                          }
                        >
                          ${formatPrice(plan.annualTotal)} billed annually{' '}
                          <span className="font-semibold text-[#00d4ff] ml-1">
                            Save 25%
                          </span>
                        </span>
                      ) : (
                        <span
                          className={
                            plan.highlighted ? 'text-gray-400' : 'text-gray-500'
                          }
                        >
                          Billed monthly
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full mb-8 ${
                      plan.highlighted
                        ? 'bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/30'
                        : 'bg-[#00d4ff]/10 text-[#0099cc] border border-[#00d4ff]/20'
                    }`}
                  >
                    14-day free trial
                  </div>

                  <Button
                    size="lg"
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full h-auto py-4 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] group ${
                      plan.highlighted
                        ? 'bg-[#00d4ff] hover:bg-[#00b8e6] text-[#1a2332] hover:shadow-xl hover:shadow-[#00d4ff]/30'
                        : 'bg-[#1a2332] hover:bg-[#0f1419] text-white'
                    }`}
                  >
                    {plan.ctaLabel}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>

                  <div
                    className={`mt-8 pt-8 border-t ${
                      plan.highlighted ? 'border-white/10' : 'border-gray-100'
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
                        plan.highlighted ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      What's included
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map(feature => (
                        <li
                          key={feature}
                          className="flex items-start text-sm leading-relaxed"
                        >
                          <span
                            className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                              plan.highlighted
                                ? 'bg-[#00d4ff]/20'
                                : 'bg-[#00d4ff]/15'
                            }`}
                          >
                            <Check className="w-3 h-3 text-[#00d4ff]" />
                          </span>
                          <span
                            className={
                              plan.highlighted
                                ? 'text-gray-200'
                                : 'text-gray-700'
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-sm text-gray-500 mt-12"
        >
          Need a custom plan for your enterprise?{' '}
          <a
            href="#contact"
            className="text-[#00d4ff] font-semibold hover:underline"
          >
            Contact our sales team
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
