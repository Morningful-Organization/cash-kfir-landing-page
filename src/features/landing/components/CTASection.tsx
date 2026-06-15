import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Lock, Activity } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { Eyebrow } from '../../../shared/components/ui/Eyebrow';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';
import { useAnalytics } from '../../../shared/hooks';
import { APP_CONFIG } from '../../../shared/config/environment';

interface CTASectionProps {
  onContactClick?: () => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const trustSignals = [
  { icon: ShieldCheck, label: 'SOC 2 audit-ready' },
  { icon: Lock, label: 'GDPR ready' },
  { icon: Activity, label: '99.9% Uptime SLA' },
];

const CTASection: React.FC<CTASectionProps> = ({ onContactClick }) => {
  const { ref, isInView } = useScrollAnimation();
  const { trackCTAClick, trackRegisterClick } = useAnalytics();

  const handleRegisterClick = () => {
    trackCTAClick('Start free trial', 'cta_section');
    trackRegisterClick('cta_section', APP_CONFIG.APP_URL);
    window.open(APP_CONFIG.APP_URL, '_blank');
  };

  const handleContactSalesClick = () => {
    trackCTAClick('Contact Sales', 'cta_section');
    onContactClick?.();
  };

  return (
    <section
      ref={ref}
      className="bg-gradient-to-br from-brand-secondary to-brand py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <Eyebrow onDark>Get started</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
          >
            Give your finance team
            <br />
            real-time clarity.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            Stop guessing and start knowing. See how Morningful gives your team
            the visibility and control it needs to drive growth.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              variant="inverted"
              size="lg"
              onClick={handleRegisterClick}
              className="group"
            >
              Start free trial
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>

            <Button
              variant="inverted-outline"
              size="lg"
              onClick={handleContactSalesClick}
            >
              Book a demo
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-sm text-white/70"
          >
            No credit card required, 14-day free trial, full access.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/20 pt-6"
          >
            {trustSignals.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
