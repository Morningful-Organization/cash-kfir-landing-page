import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Building2, CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '../../../shared/hooks/useAnimation';

const TRUST_POINTS = [
  {
    icon: Lock,
    title: 'Read-only, encrypted',
    description:
      'Plaid uses bank-grade AES-256 encryption. Morningful only ever reads transactions, we cannot move money.',
  },
  {
    icon: Building2,
    title: '12,000+ supported institutions',
    description:
      'Chase, Bank of America, Wells Fargo, Citi, Capital One, PNC, USAA, Amex, TD, and thousands more.',
  },
  {
    icon: Shield,
    title: 'Your credentials never touch us',
    description:
      'You authenticate directly with your bank inside Plaid. We never see, store, or transmit your login.',
  },
];

const PlaidSecuritySection: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="security"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
    >
      {/* Soft accent glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#00d4ff]/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#0099cc]/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-full text-sm text-[#0099cc] font-semibold mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Bank-grade security
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a2332] mb-6 leading-tight">
              Powered by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#0099cc]">
                Plaid
              </span>
              ,
              <br />
              the standard{' '}
              <span className="text-[#1a2332]">trusted by 8,000+ apps</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Morningful connects to your bank through Plaid, the same secure
              infrastructure used by Venmo, Robinhood, Wise, and Coinbase. Your
              credentials stay between you and your bank.
            </p>

            <ul className="space-y-5 mb-8">
              {TRUST_POINTS.map((point, idx) => (
                <motion.li
                  key={point.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#0099cc] p-2.5 mr-4 shadow-md">
                    <point.icon className="w-full h-full text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a2332] mb-1">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#00d4ff] mr-1.5" />
                SOC 2 Type II infrastructure
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#00d4ff] mr-1.5" />
                GDPR & CCPA aligned
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-[#00d4ff] mr-1.5" />
                Tokenized access
              </span>
            </div>
          </motion.div>

          {/* Right: Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 30, scale: 0.95 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            {/* Glow halo */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#00d4ff]/30 via-[#0099cc]/30 to-[#00d4ff]/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <img
                src="/images/plaid/plaid3.png"
                alt="Plaid secure bank selection modal inside Morningful dashboard"
                className="block w-full h-auto"
                loading="lazy"
              />
            </div>

            {/* Floating trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 lg:-left-10 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-4 flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1a2332]">
                  256-bit encryption
                </div>
                <div className="text-xs text-gray-500">
                  Same as your bank's app
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlaidSecuritySection;
