import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { SectionHeading } from '../../../shared/components/ui/SectionHeading';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';

// Real customers only. Add more here (with photo, role, company, and an
// outcome metric where possible) to strengthen this section over time.
const TESTIMONIALS_DATA = [
  {
    name: 'Ido Genosar',
    role: 'CEO',
    company: 'Verobotics',
    avatar: '/images/avatars/ido.jpg',
    content:
      "Morningful more than pays for itself. We've streamlined cash management and earned 9X more in interest.",
    metric: { value: '9X', label: 'more interest earned' },
    rating: 5,
  },
  {
    name: 'Shachar Kaufman',
    role: 'Founder',
    company: 'Zoma',
    avatar: '/images/avatars/shachar.jpg',
    content:
      'Every morning I open Morningful first, and it tells me exactly where the business stands in seconds.',
    rating: 5,
  },
];

// Companies whose finance teams use Morningful (real customers).
const CUSTOMER_NAMES = ['Verobotics', 'Zoma'];

const TestimonialsSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="testimonials" ref={ref} className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Customers"
            title="Finance leaders who run their day on Morningful"
            description="From treasury to the founder's desk, teams rely on Morningful for a clear read on cash every morning."
            align="left"
          />
        </motion.div>

        {/* Trusted-by names */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          <span className="font-mono text-xs uppercase tracking-eyebrow text-ink-soft">
            Trusted by finance teams at
          </span>
          {CUSTOMER_NAMES.map(name => (
            <span
              key={name}
              className="font-display text-xl font-semibold text-ink"
            >
              {name}
            </span>
          ))}
        </motion.div>

        {/* Both testimonials, visible at once */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS_DATA.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="flex flex-col rounded-2xl border border-border bg-surface p-7 shadow-card sm:p-8"
            >
              <Quote className="h-8 w-8 text-brand/30" aria-hidden="true" />

              <blockquote className="mt-5 font-display text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl">
                {t.content}
              </blockquote>

              {t.metric && (
                <div className="mt-6 inline-flex w-fit items-baseline gap-2 rounded-lg bg-brand/5 px-4 py-2.5">
                  <span className="font-display text-3xl font-semibold text-brand tabular-figures">
                    {t.metric.value}
                  </span>
                  <span className="text-sm text-ink-soft">{t.metric.label}</span>
                </div>
              )}

              <figcaption className="mt-auto flex items-center gap-4 border-t border-border pt-6">
                <img
                  src={t.avatar}
                  alt={`${t.name}, ${t.role} at ${t.company}`}
                  className="h-12 w-12 rounded-full object-cover ring-1 ring-border"
                  loading="lazy"
                />
                <div>
                  <div className="font-medium text-ink">{t.name}</div>
                  <div className="text-sm text-ink-soft">
                    {t.role}, {t.company}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star
                      key={`${t.name}-star-${s}`}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
