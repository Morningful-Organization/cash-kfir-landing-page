import React from 'react';
import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import HeroVisual from './HeroVisual';
import ScrollIndicator from './ScrollIndicator';

const BackgroundElements = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      animate={{
        x: [0, 100, 0],
        y: [0, -50, 0],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00d4ff] to-transparent opacity-10 rounded-full blur-xl"
    />
    <motion.div
      animate={{
        x: [0, -80, 0],
        y: [0, 100, 0],
        scale: [1, 1.5, 1],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-l from-[#00d4ff] to-transparent opacity-5 rounded-full blur-2xl"
    />
  </div>
);

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a2332] via-[#1a2332] to-[#0f1419] text-white">
      <BackgroundElements />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <HeroContent />
          <HeroVisual />
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
};

export default HeroSection;
