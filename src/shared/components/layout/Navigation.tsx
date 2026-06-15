import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { useAnalytics } from '../../hooks';
import { APP_CONFIG } from '../../config/environment';

interface NavigationProps {
  onContactClick?: () => void;
}

const LogoWordmark = () => {
  const [wordmarkWidth, setWordmarkWidth] = useState<number | null>(null);
  const boldImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const boldImage = boldImageRef.current;
    if (boldImage) {
      const updateWidth = () => {
        if (boldImage.naturalWidth && boldImage.naturalHeight) {
          const aspectRatio = boldImage.naturalWidth / boldImage.naturalHeight;
          const currentHeight = boldImage.offsetHeight;
          setWordmarkWidth(currentHeight * aspectRatio);
        }
      };

      if (boldImage.complete) {
        updateWidth();
      } else {
        boldImage.onload = updateWidth;
      }

      const resizeObserver = new ResizeObserver(updateWidth);
      resizeObserver.observe(boldImage);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div
      className="relative h-4 sm:h-5 flex-shrink-0"
      style={{ width: wordmarkWidth ? `${wordmarkWidth}px` : 'auto' }}
    >
      <img
        ref={boldImageRef}
        src="/images/logos/logo-main-bold.png"
        alt="Morningful AI"
        className="absolute inset-0 h-full w-full object-contain"
      />
    </div>
  );
};

const Navigation: React.FC<NavigationProps> = ({ onContactClick }) => {
  const { trackNavigation, trackRegisterClick, trackCTAClick } = useAnalytics();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How we use AI', href: '#how-we-use-ai' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Team', href: '#meet-the-team' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const handleNavClick = (item: { label: string; href: string }) => {
    trackNavigation(item.label);
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    trackNavigation('Logo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignInClick = () => {
    trackNavigation('Sign In');
    window.open(APP_CONFIG.APP_URL, '_blank');
  };

  const handleDemoClick = () => {
    trackCTAClick('Book a demo', 'navigation');
    onContactClick?.();
  };

  const handleRegisterClick = () => {
    trackNavigation('Start free trial');
    trackRegisterClick('navigation', APP_CONFIG.APP_URL);
    window.open(APP_CONFIG.APP_URL, '_blank');
  };

  return (
    <nav className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-border bg-surface/90 py-2 pl-5 pr-2 backdrop-blur-md transition-shadow duration-300 sm:py-2.5 sm:pl-6 sm:pr-2.5 ${
          scrolled ? 'shadow-card-lg' : 'shadow-card'
        }`}
      >
        <div className="flex items-center gap-6 xl:gap-8">
          <button
            className="flex flex-shrink-0 items-center gap-2 sm:gap-2.5"
            onClick={handleLogoClick}
            aria-label="Morningful AI home"
          >
            <img
              src="/images/logos/logo-icon-blue.svg"
              alt="Morningful AI"
              className="h-7 w-auto sm:h-8"
            />
            <LogoWordmark />
          </button>
          <div className="hidden items-center gap-7 xl:flex">
            {navItems.map(item => (
              <button
                key={item.label}
                className="group relative text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-brand"
                onClick={() => handleNavClick(item)}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSignInClick}
            className="hidden rounded-full sm:inline-flex"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDemoClick}
            className="hidden rounded-full lg:inline-flex"
          >
            Book a demo
          </Button>
          <Button
            size="sm"
            onClick={handleRegisterClick}
            className="rounded-full"
          >
            Start free trial
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
