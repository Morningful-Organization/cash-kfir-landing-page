import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, PiggyBank } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';

const SOLUTIONS_DATA = [
  {
    icon: Activity,
    title: 'Cash Management',
    description:
      'Monitor inflows and outflows in real-time. Understand your cash conversion cycle and optimize working capital.',
    image: '/images/solutions/cash-flow-management.jpg',
    features: [
      'Real-time Balance Monitoring',
      'Cash Conversion Cycle',
      'Working Capital Optimization',
    ],
  },
  {
    icon: PiggyBank,
    title: 'Expense & Spend Control',
    description:
      'Categorize spending automatically and identify areas for cost savings with detailed expense analytics and controls.',
    image: '/images/solutions/expense-control.jpg',
    features: [
      'Automated Categorization',
      'Budget vs. Actuals',
      'Identify Savings',
    ],
  },
];

interface SolutionData {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  features: string[];
}

interface SolutionCardProps {
  solution: SolutionData;
  index: number;
  onSignIn: () => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  solution,
  index,
  onSignIn,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className="group"
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
        <div className="relative h-64 overflow-hidden">
          <img
            src={solution.image}
            alt={`${solution.title} - Financial management illustration`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <solution.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-[#1a2332] mb-4">
            {solution.title}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {solution.description}
          </p>

          <ul className="space-y-3 mb-8">
            {solution.features.map((feature: string, featureIndex: number) => (
              <li
                key={featureIndex}
                className="flex items-center text-gray-600"
              >
                <div className="w-2 h-2 bg-[#00d4ff] rounded-full mr-3" />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            variant="outline"
            className="group/btn border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-white"
            onClick={onSignIn}
          >
            Sign In
            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const SolutionsSection: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();

  const handleSignIn = () => {
    window.open('https://app.morningful.ai', '_blank');
  };

  return (
    <section
      id="solutions"
      ref={ref}
      className="py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a2332] mb-6">
            Designed for Key
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#0099cc]">
              {' '}
              Financial Operations
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're managing daily liquidity or planning for the next
            quarter, our platform provides the clarity you need.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {SOLUTIONS_DATA.map((solution, index) => (
            <SolutionCard
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
