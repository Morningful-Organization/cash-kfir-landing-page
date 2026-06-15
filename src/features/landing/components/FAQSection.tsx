import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { Eyebrow } from '../../../shared/components/ui/Eyebrow';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';
import { useAnalytics } from '../../../shared/hooks';

interface FAQSectionProps {
  onContactClick?: () => void;
}

const faqs = [
  {
    q: 'Is my banking data safe?',
    a: 'Yes. We connect through Plaid with bank-grade encryption and read-only access. Your bank credentials are never stored by Morningful, and it is the same connection technology used by leading fintech apps.',
  },
  {
    q: 'Can Morningful move my money?',
    a: 'No. Access is strictly read-only. Morningful reads balances and transactions to give you insights, but it can never move, send, or touch your funds.',
  },
  {
    q: 'What do I get for free?',
    a: 'The Free plan lets you connect your bank accounts and receive daily AI alerts at no cost, with no expiry and no credit card. Pro and Corporate add advanced analytics, CFO reports, and multi-entity workflows.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most teams are connected and seeing their full cash position in under five minutes. You link your accounts through Plaid and the dashboard populates automatically.',
  },
  {
    q: 'Which banks are supported?',
    a: 'Morningful connects to thousands of banks through Plaid, covering most major institutions. If your bank is supported by Plaid, it works with Morningful.',
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No. You can start on the Free plan or a 14-day Pro trial without entering any payment details.',
  },
];

const FAQSection: React.FC<FAQSectionProps> = ({ onContactClick }) => {
  const { ref, isInView } = useScrollAnimation();
  const { trackCTAClick } = useAnalytics();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleBookDemo = () => {
    trackCTAClick('Book a demo', 'faq');
    onContactClick?.();
  };

  return (
    <section ref={ref} id="faq" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Questions, answered
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Everything finance teams ask before connecting their accounts. If
              something is missing, talk to us.
            </p>
            <div className="mt-7 rounded-2xl border border-border bg-surface-muted p-6">
              <p className="font-medium text-ink">Still have questions?</p>
              <p className="mt-1 text-sm text-ink-soft">
                Get a walkthrough tailored to your team.
              </p>
              <Button
                variant="outline"
                onClick={handleBookDemo}
                className="mt-4"
              >
                Book a demo
              </Button>
            </div>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="divide-y divide-border border-y border-border"
          >
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={faq.q}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base font-medium text-ink sm:text-lg">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-brand transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-8 text-base leading-relaxed text-ink-soft">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
