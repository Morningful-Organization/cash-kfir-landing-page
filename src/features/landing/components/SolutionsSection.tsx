import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, PiggyBank, Check } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { SectionHeading } from '../../../shared/components/ui/SectionHeading';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';
import { APP_CONFIG } from '../../../shared/config/environment';

const SOLUTIONS_DATA = [
  {
    icon: Activity,
    eyebrow: 'Cash management',
    title: 'Cash Management',
    description:
      'Monitor inflows and outflows in real time. Understand your cash conversion cycle and optimize working capital with a single live view.',
    image: '/images/solutions/cash-flow-management.jpg',
    features: [
      'Real-time balance monitoring',
      'Cash conversion cycle',
      'Working capital optimization',
    ],
  },
  {
    icon: PiggyBank,
    eyebrow: 'Spend control',
    title: 'Expense & Spend Control',
    description:
      'Categorize spending automatically and surface where to cut costs, with detailed expense analytics and budget controls built for finance teams.',
    image: '/images/solutions/expense-control.jpg',
    features: [
      'Automated categorization',
      'Budget vs. actuals',
      'Identify savings',
    ],
  },
];

interface SolutionData {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

interface SolutionRowProps {
  solution: SolutionData;
  index: number;
  onSignIn: () => void;
}

const SolutionRow: React.FC<SolutionRowProps> = ({
  solution,
  index,
  onSignIn,
}) => {
  const imageFirst = index % 2 === 0;
  const Icon = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {/* Image */}
      <div className={imageFirst ? 'lg:order-1' : 'lg:order-2'}>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
          <img
            src={solution.image}
            alt={`${solution.title} dashboard view`}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Text */}
      <div
        className={`${imageFirst ? 'lg:order-2' : 'lg:order-1'} max-w-xl`}
      >
        <span className="inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-eyebrow text-brand">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md bg-brand/10 text-brand"
            aria-hidden="true"
          >
            <Icon className="h-4 w-4" />
          </span>
          {solution.eyebrow}
        </span>

        <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
          {solution.title}
        </h3>

        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {solution.description}
        </p>

        <ul className="mt-7 space-y-3">
          {solution.features.map((feature: string) => (
            <li key={feature} className="flex items-center gap-3 text-ink">
              <span
                className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand/10 text-brand"
                aria-hidden="true"
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-base">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button variant="outline" onClick={onSignIn} className="group">
            Sign in to explore
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const SolutionsSection: React.FC = () => {
  const { ref } = useScrollAnimation();

  const handleSignIn = () => {
    window.open(APP_CONFIG.APP_URL, '_blank');
  };

  return (
    <section
      id="solutions"
      ref={ref}
      className="bg-surface-muted py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Solutions"
          title="Designed for key financial operations"
          description="Whether you're managing daily liquidity or planning for the next quarter, Morningful gives finance teams the clarity to act with confidence."
          align="left"
        />

        <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-28">
          {SOLUTIONS_DATA.map((solution, index) => (
            <SolutionRow
              key={solution.title}
              solution={solution}
              index={index}
              onSignIn={handleSignIn}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
