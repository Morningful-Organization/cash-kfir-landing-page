import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Shield,
  PieChart,
  Bot,
  Building2,
  Link2,
  Check,
} from 'lucide-react';
import { SectionHeading } from '../../../shared/components/ui/SectionHeading';
import {
  useScrollAnimation,
  useStaggerAnimation,
} from '../../../shared/hooks/useAnimation';

const FEATURES_DATA = [
  {
    icon: BarChart3,
    title: 'Cash Visibility & Control',
    description:
      'Track liquidity across all linked accounts in one place, with instant visibility into balances, inflows, and outflows.',
    bulletPoints: [
      'Real-time multi-account monitoring',
      'Cash optimizer for daily decisions',
      'Smart alerts for unusual activity',
    ],
  },
  {
    icon: Bot,
    title: 'AI Finance Assistant',
    description:
      'Turn raw transaction data into daily, actionable recommendations your team can execute quickly.',
    bulletPoints: [
      'Daily AI-generated CFO insights',
      'AI agent for finance questions',
      'Deposit and cash-flow recommendations',
    ],
  },
  {
    icon: PieChart,
    title: 'Analytics & Reporting',
    description:
      'Analyze trends, compare performance, and identify risk areas with reporting designed for finance teams.',
    bulletPoints: [
      'Category-level spend breakdowns',
      'Revenue and runway trend analysis',
      'Sharable management-ready reports',
    ],
  },
  {
    icon: Building2,
    title: 'Corporate Team Workflows',
    description:
      'Support client and multi-entity operations with centralized oversight and approval flows.',
    bulletPoints: [
      'Corporate dashboard and client views',
      'Centralized alerts and snapshots',
      'Role-based collaboration controls',
    ],
  },
  {
    icon: Shield,
    title: 'Security & Reliability',
    description:
      'Built for secure financial operations with controlled access, encryption, and resilient integrations.',
    bulletPoints: [
      'End-to-end encrypted integrations',
      'Granular access and account controls',
      'Production-ready monitoring and tracing',
    ],
  },
  {
    icon: Link2,
    title: 'Connected Banking Infrastructure',
    description:
      'Unify account connections and keep your financial data pipeline healthy with guided reconnect and sync workflows.',
    bulletPoints: [
      'Secure multi-bank aggregation',
      'Automatic sync and status monitoring',
      'Guided reconnect for login-required items',
    ],
  },
];

interface FeatureData {
  icon: React.ElementType;
  title: string;
  description: string;
  bulletPoints: string[];
}

interface FeatureCardProps {
  feature: FeatureData;
  /** Lead card spans the full first row and shows an expanded layout */
  featured?: boolean;
  /** Tailwind col-span utility for the bento grid */
  spanClassName: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  featured = false,
  spanClassName,
}) => {
  const stagger = useStaggerAnimation(0.1);
  const Icon = feature.icon;

  return (
    <motion.div
      variants={stagger.item}
      className={`group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-card sm:p-8 ${spanClassName}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icon className="h-5 w-5" />
      </span>

      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
        {feature.title}
      </h3>

      <p className="mt-3 leading-relaxed text-ink-soft">
        {feature.description}
      </p>

      <ul
        className={`mt-5 space-y-2.5 border-t border-border pt-5 ${
          featured ? 'sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2.5 sm:space-y-0' : ''
        }`}
      >
        {feature.bulletPoints.map(point => (
          <li
            key={point}
            className="flex items-start gap-2.5 text-sm text-ink-soft"
          >
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const stagger = useStaggerAnimation(0.1);

  // Asymmetric bento layout: lead feature spans 8/12, the rest fill in around it.
  const spans = [
    'lg:col-span-8',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-4',
    'lg:col-span-8',
  ];

  return (
    <section id="features" ref={ref} className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Platform"
          title="Your financial command center"
          description="Morningful combines real-time cash visibility, AI recommendations, analytics, and corporate collaboration in one finance operating layer."
          align="left"
        />

        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12"
        >
          {FEATURES_DATA.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              featured={index === 0 || index === FEATURES_DATA.length - 1}
              spanClassName={spans[index]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
