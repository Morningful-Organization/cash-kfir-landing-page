import React from 'react';
import { Layout, ErrorBoundary } from './shared/components';
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  SolutionsSection,
  TestimonialsSection,
  PricingSection,
  CTASection,
} from './features/landing';
import { ContactModal } from './features/contact';
import { Chatbot } from './features/chatbot';
import {
  useAnalytics,
  useScrollTracking,
  useContact,
  usePrivacyPolicy,
  useTermsOfService,
} from './shared/hooks';
import { PrivacyPolicyModal } from './features/privacy-policy';
import { TermsOfServiceModal } from './features/terms-of-service';

function App() {
  const contactHook = useContact();
  const privacyPolicyHook = usePrivacyPolicy();
  const termsOfServiceHook = useTermsOfService();

  // Initialize analytics tracking
  useAnalytics();
  useScrollTracking();

  return (
    <ErrorBoundary>
      <Layout
        onContactClick={contactHook.openModal}
        onPrivacyPolicyClick={privacyPolicyHook.openModal}
        onTermsOfServiceClick={termsOfServiceHook.openModal}
      >
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <SolutionsSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection onContactClick={contactHook.openModal} />
        <ContactModal
          isOpen={contactHook.isModalOpen}
          onClose={contactHook.closeModal}
          contactHook={contactHook}
        />
        <PrivacyPolicyModal
          isOpen={privacyPolicyHook.isModalOpen}
          onClose={privacyPolicyHook.closeModal}
          onTermsOfServiceClick={termsOfServiceHook.openModal}
        />
        <TermsOfServiceModal
          isOpen={termsOfServiceHook.isModalOpen}
          onClose={termsOfServiceHook.closeModal}
        />
        <Chatbot />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;

