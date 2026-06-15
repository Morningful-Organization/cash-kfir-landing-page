import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
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

  // Only show profiles that have a real URL (skip unset '#' placeholders).
  const socialLinks = [
    {
      label: 'LinkedIn',
      href: APP_CONFIG.SOCIAL_LINKS.LINKEDIN,
      Icon: Linkedin,
    },
    { label: 'Twitter', href: APP_CONFIG.SOCIAL_LINKS.TWITTER, Icon: Twitter },
    {
      label: 'Facebook',
      href: APP_CONFIG.SOCIAL_LINKS.FACEBOOK,
      Icon: Facebook,
    },
  ].filter(s => s.href && s.href !== '#');

  const links = [
    { label: 'Privacy Policy', onClick: onPrivacyPolicyClick },
    { label: 'Terms of Service', onClick: onTermsOfServiceClick },
    {
      label: 'About Us',
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },
    { label: 'Contact Us', onClick: onContactClick },
  ];

  const handleLinkClick = (label: string, onClick?: () => void) => {
    trackNavigation(label);
    onClick?.();
  };

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          {/* Brand + description + social */}
          <div className="max-w-sm">
            <img
              src="/images/logos/transparent.png"
              alt="Morningful AI"
              className="mb-5 h-16 w-auto sm:h-20"
            />
            <p className="text-sm leading-relaxed text-white/60">
              Intelligent treasury management and real-time cash visibility for
              modern finance teams.
            </p>
            <a
              href="mailto:admin@morningful.ai"
              className="mt-4 inline-block text-sm text-white/70 transition-colors hover:text-brand-accent"
            >
              admin@morningful.ai
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              {APP_CONFIG.LEGAL_NAME}
              <br />
              {APP_CONFIG.ADDRESS}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackNavigation(`Social - ${label}`)}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 transition-colors hover:border-brand-accent/40 hover:bg-white/5 hover:text-brand-accent"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-3 text-sm md:items-end">
            {links.map(link => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.label, link.onClick)}
                className="text-white/60 transition-colors hover:text-brand-accent md:text-right"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">
            © {APP_CONFIG.COPYRIGHT_YEAR} {APP_CONFIG.LEGAL_NAME}. All rights
            reserved.
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">
            Bank-grade security · Read-only access · Secured by Plaid
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
