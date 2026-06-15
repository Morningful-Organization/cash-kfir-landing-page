import React from 'react';
import { motion } from 'framer-motion';
import {
  useScrollAnimation,
  useStaggerAnimation,
} from '../../../shared/hooks/useAnimation';

const STATS_DATA = [
  { value: '$20M', label: 'Transactions Analyzed' },
  { value: '99.98%', label: 'Data Accuracy' },
  { value: '14+', label: 'Finance Teams Onboarded' },
  { value: '10,000+', label: 'Banks Supported' },
];

const StatsSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const stagger = useStaggerAnimation(0.1);

  return (
    <section
      ref={ref}
      className="border-b border-border bg-surface-muted py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.dl
          variants={stagger.container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-y-12 sm:gap-x-8 md:grid-cols-4 md:divide-x md:divide-border"
        >
          {STATS_DATA.map(stat => (
            <motion.div
              key={stat.label}
              variants={stagger.item}
              className="px-2 text-left md:px-8 md:first:pl-0"
            >
              <dd className="font-mono text-4xl font-medium tracking-tight text-ink tabular-figures lg:text-5xl">
                {stat.value}
              </dd>
              <dt className="mt-3 font-mono text-xs uppercase tracking-eyebrow text-ink-soft">
                {stat.label}
              </dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};

export default StatsSection;
