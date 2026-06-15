import React from 'react';
import Eyebrow from './Eyebrow';

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  onDark?: boolean;
  className?: string;
};

/**
 * Consistent section header: eyebrow kicker + serif display title + optional subhead.
 * Used across every landing section so vertical rhythm and hierarchy stay uniform.
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  onDark = false,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`${isCenter ? 'mx-auto text-center' : 'text-left'} ${
        isCenter ? 'max-w-2xl' : 'max-w-2xl'
      } ${className}`}
    >
      {eyebrow && (
        <div className={isCenter ? 'flex justify-center' : ''}>
          <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={`mt-5 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.08] tracking-tight ${
          onDark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            onDark ? 'text-white/70' : 'text-ink-soft'
          } ${isCenter ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
export { SectionHeading };
