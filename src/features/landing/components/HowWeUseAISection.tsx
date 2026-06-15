import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, EyeOff, Hash, Check, X } from 'lucide-react';
import { Eyebrow } from '../../../shared/components/ui/Eyebrow';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';

const principles = [
  {
    Icon: Cpu,
    title: 'Models run on AWS Bedrock',
    desc: 'We use leading models like Claude through Amazon Bedrock. Your data is processed inside secure AWS infrastructure and is never used to train any model.',
  },
  {
    Icon: EyeOff,
    title: 'No identifying data is shared',
    desc: 'Account names, account numbers, and transaction IDs never reach the AI. The model never sees who you are or where you bank.',
  },
  {
    Icon: Hash,
    title: 'Anonymized signals only',
    desc: 'Insights are generated from hashed, encrypted transaction amounts with no transaction IDs attached, nothing that points back to you.',
  },
];

const neverSent = ['Account names', 'Account numbers', 'Transaction IDs'];

const HowWeUseAISection: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="how-we-use-ai"
      className="bg-surface-muted py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: heading + principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow>How we use AI</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              Powerful AI insights,
              <br />
              private by design.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Morningful turns your numbers into guidance without ever exposing
              your accounts or identity to the AI.
            </p>

            <div className="mt-9 space-y-6">
              {principles.map(p => (
                <div key={p.title} className="flex gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <p.Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-ink-soft">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: what the AI actually receives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-surface p-7 shadow-card-lg sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-eyebrow text-ink-soft">
              What the AI actually receives
            </p>

            {/* Never sent */}
            <div className="mt-6">
              <p className="text-sm font-medium text-ink">Never sent</p>
              <div className="mt-3 space-y-2">
                {neverSent.map(item => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-border bg-surface-muted px-3.5 py-2.5"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-red-50 text-red-500">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-ink-soft line-through decoration-ink-soft/40">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sent, anonymized */}
            <div className="mt-6">
              <p className="text-sm font-medium text-ink">Sent, anonymized</p>
              <div className="mt-3 flex items-center gap-3 rounded-lg border border-brand/30 bg-brand/5 px-3.5 py-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand/10 text-brand">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-ink">Hashed transaction amounts</span>
                <span className="ml-auto font-mono text-xs text-ink-soft">
                  amt_9f3a··b21
                </span>
              </div>
            </div>

            <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-ink-soft">
              These anonymized signals are processed by Claude on AWS Bedrock to
              produce your insights. The model never receives anything that can
              identify you, your accounts, or individual transactions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowWeUseAISection;
