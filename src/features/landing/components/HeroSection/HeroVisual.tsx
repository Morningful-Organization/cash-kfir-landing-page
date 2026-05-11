import React from 'react';
import { motion } from 'framer-motion';

const HeroVisual = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay: 0.3, duration: 1 }}
      className="relative"
    >
      <div className="relative">
        {/* Main card */}
        <motion.div
          whileHover={{ y: -8, rotateX: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">
                  Financial Command Center
                </span>
              </div>
              <div className="text-2xl font-bold text-[#00d4ff]">99.98%</div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#00d4ff]/20 to-transparent p-4 rounded-xl border border-[#00d4ff]/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">
                    Cash Management
                  </span>
                  <span className="text-[#00d4ff] font-semibold">
                    $12.4M / month
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ delay: 1, duration: 2 }}
                    className="bg-gradient-to-r from-[#00d4ff] to-[#0099cc] h-2 rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-white">14</div>
                  <div className="text-xs text-gray-400">
                    Connected Accounts
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-[#00d4ff]">~5min</div>
                  <div className="text-xs text-gray-400">Data Sync</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-[#00d4ff] to-[#0099cc] rounded-2xl shadow-lg flex items-center justify-center"
        >
          <div className="text-2xl">⚡</div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0], rotate: [0, 5, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute -bottom-2 -left-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroVisual;
