import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Building2, Check, Trash2 } from 'lucide-react';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';
import { SectionHeading } from '../../../shared/components/ui/SectionHeading';

const TRUST_POINTS = [
  {
    icon: Lock,
    title: 'Read-only, encrypted',
    description:
      'Plaid uses bank-grade AES-256 encryption. Morningful only ever reads transactions, we cannot move money.',
  },
  {
    icon: Building2,
    title: '12,000+ supported institutions',
    description:
      'Chase, Bank of America, Wells Fargo, Citi, Capital One, PNC, USAA, Amex, TD, and thousands more.',
  },
  {
    icon: ShieldCheck,
    title: 'Your credentials never touch us',
    description:
      'You authenticate directly with your bank inside Plaid. We never see, store, or transmit your login.',
  },
  {
    icon: Trash2,
    title: 'Your data, your control',
    description:
      'Disconnect any account and delete your data at any time. You decide what Morningful can see.',
  },
];

const COMPLIANCE = [
  'SOC 2 audit-ready',
  'GDPR ready',
  'Tokenized access',
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const PlaidSecuritySection: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section ref={ref} id="security" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy + trust points */}
          <div>
            <motion.div
              {...fadeUp}
              animate={isInView ? fadeUp.animate : fadeUp.initial}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                eyebrow="Bank-grade security"
                title={
                  <>
                    Powered by <span className="text-brand">Plaid</span>, the
                    standard trusted by 8,000+ apps
                  </>
                }
                description="Morningful connects to your bank through Plaid, the same secure infrastructure used by Venmo, Robinhood, Wise, and Coinbase. Your credentials stay between you and your bank."
                align="left"
              />
            </motion.div>

            <motion.div
              {...fadeUp}
              animate={isInView ? fadeUp.animate : fadeUp.initial}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 rounded-xl border border-brand/20 bg-brand/5 p-5"
            >
              <p className="text-base font-medium text-ink">
                Morningful is strictly read-only. We read your balances to give
                you insights, but we can never move, send, or touch your money.
              </p>
            </motion.div>

            <ul className="mt-8 space-y-6">
              {TRUST_POINTS.map((point, idx) => (
                <motion.li
                  key={point.title}
                  {...fadeUp}
                  animate={isInView ? fadeUp.animate : fadeUp.initial}
                  transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <point.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-ink">
                      {point.title}
                    </h3>
                    <p className="mt-1 leading-relaxed text-ink-soft">
                      {point.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div
              {...fadeUp}
              animate={isInView ? fadeUp.animate : fadeUp.initial}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6"
            >
              {COMPLIANCE.map(item => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <Check className="h-4 w-4 text-brand" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: product screenshot card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
            }
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card-lg">
              <img
                src="/images/plaid/plaid3.png"
                alt="Plaid secure bank selection modal inside Morningful dashboard"
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>

            {/* Static encryption badge, layered for depth, no float loop */}
            <div className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4 shadow-card sm:flex lg:-left-10">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <div className="text-sm font-semibold text-ink tabular-figures">
                  256-bit encryption
                </div>
                <div className="text-xs text-ink-soft">
                  Same as your bank's app
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlaidSecuritySection;
