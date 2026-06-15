import React from 'react';

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  /** Render light text for use on dark / brand-colored backgrounds */
  onDark?: boolean;
};

/**
 * Small uppercase mono kicker that replaces the old rounded-full "AI" pill badges.
 * No background, no pulsing dot, no emoji — just a typographic label with a short rule.
 */
const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  className = '',
  onDark = false,
}) => {
  return (
    <span
      className={`inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-eyebrow ${
        onDark ? 'text-white/70' : 'text-brand'
      } ${className}`}
    >
      <span
        className={`h-px w-6 ${onDark ? 'bg-white/40' : 'bg-brand/40'}`}
        aria-hidden="true"
      />
      {children}
    </span>
  );
};

export default Eyebrow;
export { Eyebrow };
