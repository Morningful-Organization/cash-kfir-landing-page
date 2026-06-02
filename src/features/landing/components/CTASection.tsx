import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';
import { useAnalytics } from '../../../shared/hooks';

interface CTASectionProps {
  onContactClick?: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onContactClick }) => {
  const { ref, isInView } = useScrollAnimation();
  const { trackCTAClick, trackRegisterClick } = useAnalytics();

  const handleRegisterClick = () => {
    trackCTAClick('Start free trial', 'cta_section');
    trackRegisterClick('cta_section', 'https://app.morningful.ai');
    window.open('https://app.morningful.ai', '_blank');
  };

  const handleContactSalesClick = () => {
    trackCTAClick('Contact Sales', 'cta_section');
    onContactClick?.();
  };

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-[#00d4ff] to-[#1a2332] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-l from-[#1a2332] to-[#00d4ff] rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00d4ff]/10 to-[#1a2332]/10 border border-[#00d4ff]/20 rounded-full text-[#1a2332] font-medium mb-8"
          >
            <Sparkles className="w-5 h-5 mr-2 text-[#00d4ff]" />
            Ready to Master Your Financial Operations?
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-[#1a2332] mb-8 leading-tight">
            Gain Financial Clarity
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#0099cc]">
              Today
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Stop guessing. Start knowing. See how our platform can give your
            finance team the visibility and control it needs to drive growth.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={handleRegisterClick}
              className="bg-[#00d4ff] hover:bg-[#00b8e6] text-[#1a2332] font-bold px-12 py-6 h-auto text-xl rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#00d4ff]/25 group"
            >
              Start free trial
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleContactSalesClick}
              className="border-2 border-[#1a2332] text-[#1a2332] hover:bg-[#1a2332] hover:text-white px-12 py-6 h-auto text-xl rounded-2xl transition-all duration-300 hover:scale-105"
            >
              Contact Sales
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 text-gray-500"
          >
            <p className="mb-4">
              No credit card required • 14 days free trial • Full access
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                SOC2 In Progress
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                GDPR Ready
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                99.9% Uptime SLA
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
