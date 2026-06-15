import React from 'react';
import { motion } from 'framer-motion';
import {
  Link2,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { SectionHeading } from '../../../shared/components/ui/SectionHeading';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';
import { useAnalytics } from '../../../shared/hooks';
import { APP_CONFIG } from '../../../shared/config/environment';

const steps = [
  {
    num: '01',
    Icon: Link2,
    title: 'Connect your banks',
    desc: 'Securely link every account in minutes through Plaid. Access is read-only, so Morningful can never move your money.',
  },
  {
    num: '02',
    Icon: LayoutDashboard,
    title: 'See everything in one view',
    desc: 'Every balance, across every bank and entity, flows into one live dashboard your whole finance team can trust.',
  },
  {
    num: '03',
    Icon: Sparkles,
    title: 'Act on daily AI insights',
    desc: 'Start each morning with your cash position, smart alerts, and clear next steps from your AI finance assistant.',
  },
];

const HowItWorksSection: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();
  const { trackCTAClick, trackRegisterClick } = useAnalytics();

  const handleRegister = () => {
    trackCTAClick('Start for free', 'how_it_works');
    trackRegisterClick('how_it_works', APP_CONFIG.APP_URL);
    window.open(APP_CONFIG.APP_URL, '_blank');
  };

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="bg-surface py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Live cash visibility in three steps"
          description="From signup to your first insight in under five minutes. No credit card, no finance ops project."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3 lg:gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-2xl border border-border bg-surface p-7 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <step.Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-3xl font-semibold text-brand-tertiary tabular-figures">
                  {step.num}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <Button size="lg" onClick={handleRegister} className="group">
            Start for free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
          <p className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand" />
              Read-only bank access
            </span>
            <span>No credit card</span>
            <span>Bank-grade encryption</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
