import React, { useState } from 'react';
import HeroContent from './HeroContent';
import HeroCarousel from './HeroCarousel';
import { useAnalytics } from '../../../../shared/hooks';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export type Audience = 'personal' | 'corporate';

const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const [audience, setAudience] = useState<Audience>('personal');
  const { trackFeatureInteraction } = useAnalytics();

  const handleSelect = (opt: Audience) => {
    setAudience(opt);
    trackFeatureInteraction('hero_audience', opt);
  };

  return (
    <section className="relative overflow-hidden bg-surface">
      {/* Static atmospheric wash — no animated blobs */}
      <div
        className="pointer-events-none absolute inset-0 bg-hero-wash"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-4 pb-20 lg:pt-5 lg:pb-28">
        {/* Audience toggle */}
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="Choose your use case"
            className="inline-flex items-center rounded-full border border-border bg-surface p-1 shadow-card"
          >
            {(['personal', 'corporate'] as Audience[]).map(opt => (
              <button
                key={opt}
                role="tab"
                aria-selected={audience === opt}
                onClick={() => handleSelect(opt)}
                className={`rounded-full px-6 py-2 text-sm font-medium capitalize transition-colors duration-200 ${
                  audience === opt
                    ? 'bg-brand text-white shadow-sm'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid items-center gap-12 lg:mt-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <HeroContent audience={audience} onContactClick={onContactClick} />
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
