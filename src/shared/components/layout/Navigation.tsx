import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAnalytics } from '../../hooks';

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

      // Update on resize
      const resizeObserver = new ResizeObserver(updateWidth);
      resizeObserver.observe(boldImage);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div
      className="relative h-5 sm:h-6 lg:h-7 flex-shrink-0"
      style={{ width: wordmarkWidth ? `${wordmarkWidth}px` : 'auto' }}
    >
      <img
        ref={boldImageRef}
        src="/images/logos/logo-main-bold.png"
        alt="Morningful AI"
        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
      />
      <img
        src="/images/logos/logo-main-cyan.png"
        alt="Morningful AI"
        className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  );
};

const Navigation: React.FC = () => {
  const { trackNavigation } = useAnalytics();

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Resources', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const handleNavClick = (item: { label: string; href: string }) => {
    trackNavigation(item.label);
    // Smooth scroll to section
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
    window.open('https://app.morningful.ai', '_blank');
  };

  const handleRegisterClick = () => {
    trackNavigation('Register for free');
    window.open('https://app.morningful.ai', '_blank');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <button
              className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0"
              onClick={handleLogoClick}
            >
              <div className="relative h-8 sm:h-10 lg:h-12 flex-shrink-0">
                <img
                  src="/images/logos/logo-icon-blue.svg"
                  alt="Morningful AI Logo"
                  className="h-8 sm:h-10 lg:h-12 w-auto block shadow-lg transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src="/images/logos/logo-icon-cyan.svg"
                  alt="Morningful AI Logo"
                  className="absolute inset-0 h-full w-full object-contain shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <LogoWordmark />
            </button>
            <div className="hidden xl:flex space-x-8">
              {navItems.map(item => (
                <button
                  key={item.label}
                  className="relative group text-gray-700 font-medium hover:text-[#00d4ff] transition-colors duration-300"
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                  <span className="w-0 h-0.5 bg-[#00d4ff] absolute -bottom-1 left-0 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSignInClick}
              className="px-2 sm:px-4 text-gray-700 hover:text-[#00d4ff] hover:bg-transparent text-xs sm:text-sm font-medium transition-colors duration-300"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={handleRegisterClick}
              className="group relative px-3 sm:px-6 bg-gradient-to-r from-[#00d4ff] to-[#0099cc] hover:from-[#00b8e6] hover:to-[#0088bb] text-[#1a2332] font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#00d4ff]/40 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Sparkles className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
              <span className="relative">Register for free</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
