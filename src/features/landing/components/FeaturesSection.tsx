import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Shield,
  PieChart,
  CheckCircle,
} from 'lucide-react';
import {
  useScrollAnimation,
  useStaggerAnimation,
} from '../../../shared/hooks/useAnimation';

const FEATURES_DATA = [
  {
    icon: BarChart3,
    title: 'Real-Time Cash Management',
    bulletPoints: [
      'Real-Time Monitoring',
      'Multi-Account View', 
      'Instant Alerts'
    ],
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    bulletPoints: [
      'SOC 2 in progress',
      'GDPR ready',
      'End-to-End Encryption'
    ],
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: PieChart,
    title: 'Actionable Insights',
    bulletPoints: [
      'Spending Categories',
      'Revenue Streams',
      'Cost Analytics'
    ],
    color: 'from-indigo-400 to-blue-500',
  },
];

interface FeatureData {
  icon: React.ElementType;
  title: string;
  bulletPoints: string[];
  color: string;
}

interface FeatureCardProps {
  feature: FeatureData;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const stagger = useStaggerAnimation(0.1);

  return (
    <motion.div
      variants={stagger.item}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-3 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <feature.icon className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-[#1a2332] mb-4 group-hover:text-[#00d4ff] transition-colors duration-300">
          {feature.title}
        </h3>

        <ul className="space-y-2">
          {feature.bulletPoints.map((point, idx) => (
            <li key={idx} className="flex items-center text-gray-600">
              <CheckCircle className="w-4 h-4 text-[#00d4ff] mr-2 flex-shrink-0" />
              <span className="font-medium">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const stagger = useStaggerAnimation(0.1);

  return (
    <section id="features" ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a2332] mb-6">
            Your Financial
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#0099cc]">
              {' '}
              Command Center
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolset designed to give finance teams complete
            control and clarity over their company's financial health.
          </p>
        </motion.div>

        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {FEATURES_DATA.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
