import React from 'react';
import { APP_CONFIG } from '../../config/environment';
import { useAnalytics } from '../../hooks';

interface FooterProps {
  onContactClick?: () => void;
  onPrivacyPolicyClick?: () => void;
  onTermsOfServiceClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({
  onContactClick,
  onPrivacyPolicyClick,
  onTermsOfServiceClick,
}) => {
  const { trackNavigation } = useAnalytics();

  const socialLinks = [
    { label: 'Facebook', href: APP_CONFIG.SOCIAL_LINKS.FACEBOOK, icon: 'f' },
    { label: 'Twitter', href: APP_CONFIG.SOCIAL_LINKS.TWITTER, icon: 't' },
    { label: 'LinkedIn', href: APP_CONFIG.SOCIAL_LINKS.LINKEDIN, icon: 'in' },
  ];

  const handlePrivacyPolicyClick = () => {
    trackNavigation('Privacy Policy');
    onPrivacyPolicyClick?.();
  };

  const handleTermsOfServiceClick = () => {
    trackNavigation('Terms of Service');
    onTermsOfServiceClick?.();
  };

  const handleAboutUsClick = () => {
    trackNavigation('About Us');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    trackNavigation('Contact Us');
    onContactClick?.();
  };

  const handleSocialClick = (platform: string) => {
    trackNavigation(`Social - ${platform}`);
  };

  return (
    <footer className="bg-[#1a2332] text-white py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left side - Logo, Description, and Social Media */}
          <div className="flex flex-col items-start max-w-md">
            <div className="mb-6">
              <img
                src="/images/logos/transparent.png"
                alt="Morningful AI logo"
                className="h-20 sm:h-24 md:h-28 w-auto block"
              />
            </div>
            <p className="text-gray-300 text-base mb-6 leading-relaxed">
              Empowering finance teams with intelligent money management and
              real-time cash flow visibility.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  onClick={() => handleSocialClick(social.label)}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00d4ff] transition-colors cursor-pointer"
                  aria-label={social.label}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Navigation Links */}
          <div className="flex flex-col md:flex-row gap-8 text-base items-center justify-center">
            <button
              onClick={handlePrivacyPolicyClick}
              className="text-gray-300 hover:text-[#00d4ff] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={handleTermsOfServiceClick}
              className="text-gray-300 hover:text-[#00d4ff] transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={handleAboutUsClick}
              className="text-gray-300 hover:text-[#00d4ff] transition-colors"
            >
              About Us
            </button>
            <button
              onClick={handleContactClick}
              className="text-gray-300 hover:text-[#00d4ff] transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <p className="text-gray-400 text-sm">
            © {APP_CONFIG.COPYRIGHT_YEAR} {APP_CONFIG.COMPANY_NAME}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
