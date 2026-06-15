import React from 'react';
import { Layout, ErrorBoundary } from './shared/components';
import {
  HeroSection,
  DemoSection,
  HowItWorksSection,
  StatsSection,
  FeaturesSection,
  PlaidSecuritySection,
  HowWeUseAISection,
  SolutionsSection,
  ChatbotDemoSection,
  TestimonialsSection,
  MeetTheTeamSection,
  PricingSection,
  FAQSection,
  CTASection,
} from './features/landing';
import { ContactModal } from './features/contact';
import { Chatbot } from './features/chatbot';
import { PromoPopup } from './features/promo/PromoPopup';
import {
  useApolloTracker,
  useAnalytics,
  useScrollTracking,
  useGlobalClickTracking,
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
  useApolloTracker();
  useAnalytics();
  useScrollTracking();
  useGlobalClickTracking();

  return (
    <ErrorBoundary>
      <Layout
        onContactClick={contactHook.openModal}
        onPrivacyPolicyClick={privacyPolicyHook.openModal}
        onTermsOfServiceClick={termsOfServiceHook.openModal}
      >
        <HeroSection onContactClick={contactHook.openModal} />
        <DemoSection />
        <HowItWorksSection />
        <StatsSection />
        <FeaturesSection />
        <PlaidSecuritySection />
        <HowWeUseAISection />
        <SolutionsSection />
        <ChatbotDemoSection />
        <TestimonialsSection />
        <MeetTheTeamSection />
        <PricingSection onContactClick={contactHook.openModal} />
        <FAQSection onContactClick={contactHook.openModal} />
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
        <PromoPopup onBookDemo={contactHook.openModal} />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;

