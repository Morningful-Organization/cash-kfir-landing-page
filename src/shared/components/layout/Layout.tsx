import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onContactClick?: () => void;
  onPrivacyPolicyClick?: () => void;
  onTermsOfServiceClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  onContactClick,
  onPrivacyPolicyClick,
  onTermsOfServiceClick,
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">{children}</main>
      <Footer
        onContactClick={onContactClick}
        onPrivacyPolicyClick={onPrivacyPolicyClick}
        onTermsOfServiceClick={onTermsOfServiceClick}
      />
    </div>
  );
};

export default Layout;
