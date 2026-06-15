import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTermsOfServiceClick: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
  onTermsOfServiceClick,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableNode = React.useRef<HTMLElement | null>(null);
  const firstFocusableRef = (node: HTMLElement | null) => {
    if (node) {
      firstFocusableNode.current = node;
    }
  };

  // Keyboard accessibility - ESC key and focus management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      // Tab key focus trapping
      if (e.key === 'Tab') {
        const focusableElements =
          modalRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus close button when modal opens
      setTimeout(() => {
        firstFocusableNode.current?.focus();
      }, 100);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl bg-surface rounded-2xl sm:rounded-3xl shadow-card-lg overflow-hidden max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Header */}
            <div className="bg-surface text-ink p-4 sm:p-6 md:p-8 border-b border-border flex-shrink-0">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                  <h2
                    id="modal-title"
                    className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-ink mb-1 sm:mb-2"
                  >
                    Morningful Privacy Policy
                  </h2>
                  <p
                    id="modal-description"
                    className="text-ink-soft text-sm sm:text-base"
                  >
                    How we collect, use, and protect your information
                  </p>
                </div>
                <button
                  ref={firstFocusableRef}
                  onClick={onClose}
                  className="p-2 sm:p-3 text-ink-soft hover:bg-surface-muted hover:text-ink rounded-full transition-colors duration-200 flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close modal"
                  type="button"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
              <div className="prose prose-sm sm:prose-base max-w-none text-ink-soft leading-relaxed">
                <div className="space-y-6">
                  <div>
                    <p className="font-mono text-ink-soft text-sm">
                      Last Updated: September 5, 2025
                    </p>
                  </div>

                  <div className="prose max-w-none text-ink-soft">
                    <p className="mb-4">
                      Morningful Inc. ("Morningful", "we", "us" or "our") highly
                      values and respects your privacy. This privacy policy
                      ("Policy") outlines which information we collect when you
                      ("you" or "your") access and use the Site as well as the
                      content, products, software and services (which, together,
                      are referred to as the "Services"), and how we protect and
                      use it. The Privacy Policy also wishes to make sure that
                      you are aware of the options available to you when you
                      access and use our Services.
                    </p>

                    <p className="mb-4">
                      Capitalized terms which are not defined herein shall have
                      the meaning ascribed to them in Morningful's Terms of Use,
                      available{' '}
                      <button
                        onClick={onTermsOfServiceClick}
                        className="text-brand hover:text-brand-secondary underline cursor-pointer bg-transparent border-none p-0"
                        type="button"
                      >
                        here
                      </button>
                      , to which this Privacy Policy is incorporated.
                    </p>

                    <p className="mb-4">
                      This Privacy Policy outlines how we collect and use
                      information about you, through the Site or through other
                      means, within our Services. Your privacy is important to
                      us. We will act as described in this Privacy Policy, in
                      accordance with applicable law, including the Privacy
                      Protection Law, 1981.
                    </p>

                    <p className="mb-4">
                      This Privacy Policy applies to identified information or
                      identifiable information by reasonable means. In general,
                      you do not have a legal obligation to provide the
                      information specified below, but failure to do so may
                      prevent us from providing you with certain Services. The
                      information provided by you will be stored in Morningful's
                      database and will be kept for the time required for
                      Morningful to execute the objectives permitted by law and
                      in accordance with this Privacy Policy.
                    </p>

                    <p className="mb-6">
                      We may update this Privacy Policy from time to time,
                      according to necessities and changes in the law. Note
                      these changes, since they apply to you. Our updated
                      Privacy Policy will appear on the Site at all times.
                    </p>

                    <div className="bg-surface-muted p-4 rounded-lg border-l-4 border-brand my-6">
                      <p className="font-semibold text-ink">
                        PLEASE READ THIS PRIVACY POLICY CAREFULLY BEFORE USING
                        THE SITE AND SERVICES. IF YOU DO NOT AGREE TO THIS
                        PRIVACY POLICY YOU MAY NOT ACCESS OR OTHERWISE USE OUR
                        SITE AND SERVICES.
                      </p>
                    </div>

                    <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-4">
                      1. WHAT INFORMATION DO WE COLLECT AND HOW DO WE COLLECT
                      IT?
                    </h2>

                    <div className="space-y-6">
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          <span className="font-semibold">
                            Contact Information
                          </span>{' '}
                          - When you register to the Services, you may be
                          required to submit certain details about yourself.
                          This may include, among others, your name, phone
                          number, email address, name of organization, your
                          position in the organization, passwords, credit card
                          details and other types of data. Such information will
                          be provided by you directly as part of filling out the
                          details on the Site, registering for the Services or
                          by contacting our customer service.
                        </div>
                      </div>

                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          <span className="font-semibold">
                            Financial Information
                          </span>{' '}
                          - We will not share or sell your information for
                          marketing purposes. We will share certain personal
                          information with our partners and providers in order
                          to run our Services and to resolve an incident. We may
                          also share non-personally identifiable information in
                          order to improve our modeling and perform aggregate
                          reporting, including by use of Google Analytics and
                          other related services provided by Google (for more
                          information on how Google Analytics collects and
                          processes data visit:{' '}
                          <a
                            href="https://policies.google.com/privacy/partners"
                            className="text-brand hover:text-brand-secondary underline"
                          >
                            https://policies.google.com/privacy/partners
                          </a>
                          ).
                          <p className="mt-4">
                            We use Cookies for data security needs for proper
                            and ongoing Site operations, Services' optimization,
                            information verification and in order to specify the
                            Services to your personal preferences. For example,
                            the use of Cookies helps identify you when you log
                            back to our Site. Using Cookies, your activity on
                            the Site will be monitored and information will be
                            automatically collected, such as an IP address,
                            duration of your visit to the Site, your operating
                            system's version, browser type, location and more.
                            The Cookies will also serve us for marketing needs,
                            including personalized marketing. In addition, we
                            may use network signals or other monitoring
                            technologies. You can stop the collection of
                            information with Cookies by changing the settings in
                            your browser. If you block Cookies, some Services
                            may not be available to you, or you may need to
                            re-enter details. Changing these settings is under
                            your responsibility.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          <span className="font-semibold">
                            Information about others
                          </span>{' '}
                          - When you provide us with information about others,
                          it is your responsibility to make sure that it is done
                          in accordance with the applicable law, including the
                          Privacy Protection Law, 1981, and Communications Law
                          (Telecommunications and Broadcasts), 1982.
                        </div>
                      </div>

                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          <span className="font-semibold">
                            Aggregated information
                          </span>{' '}
                          - We may also gather statistical and aggregated
                          information originating from our users which may be
                          combined with additional non-identifiable information
                          collected from other sources, regarding the use of the
                          Services. This information will be anonymous and will
                          not allow, by reasonable means, to identify, or to be
                          attributed to, a specific user. We will use this
                          information for the purposes of internal research and
                          development, and we also may share it with our
                          business partners, affiliates or other third parties
                          including advisors, advertisers and investors, for the
                          purpose of conducting a general business analysis. To
                          avoid doubt, any non-personal information connected or
                          linked to any personal information shall be deemed as
                          personal information as long as such connection or
                          linkage exists.
                        </div>
                      </div>
                    </div>

                    <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-4">
                      2. HOW WILL THE INFORMATION BE USED?
                    </h2>
                    <p className="mb-4">
                      We will use, store and process your information for the
                      following purposes:
                    </p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          Ongoing operation and performance of the Services and
                          our internal course of business.
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          Support and communication
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          In order to comply with all applicable laws,
                          regulations and legal processes, protect your privacy,
                          prevent illegal activities, enforce applicable terms
                          of service and protect Morningful's rights, your
                          rights as well as other third-parties' rights.
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          Additional legitimate interests, including: Preventing
                          and responding to fraud, inappropriate use or abuse of
                          the Services; preventing or addressing technical or
                          security issues; fulfilling our commitments to our
                          partners or other third-parties; internal research for
                          the purpose of evaluating the use of the Services,
                          developing new features for the Services and improving
                          user experience; marketing to you or advertising of
                          the Services; ensuring the protection of our rights,
                          security and property (and those of our partners,
                          contractors and users); and various legal purposes,
                          such as the establishment, exercise or defense of a
                          legal claim.
                        </div>
                      </div>
                    </div>

                    <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-4">
                      3. TRANSFER OF INFORMATION TO THIRD PARTIES
                    </h2>
                    <p className="mb-4">
                      Morningful may transfer your information to third parties,
                      whether in Israel or abroad, in the following cases:
                    </p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          For the purposes set out in this Privacy Policy, for
                          the purposes permitted by law, and for the
                          implementation of our legitimate interests, such as
                          preventing fraud and other illegal activities. Such
                          information transfer shall be made subject to the
                          third party's obligations to maintain privacy and data
                          security at the level required according to the type
                          of information transferred.
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          When we engage third parties to process data on our
                          behalf. Such third parties' use will be subject to our
                          explicit instructions and in compliance with this
                          Privacy Policy.
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          As part of the sale of Morningful's business (in whole
                          or in part), provided that such third party complies
                          with the provisions of the law regarding the
                          protection of privacy and information security.
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          If we have received a judicial order instructing us to
                          do so or if there is a requirement to do so by law.
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          So that we can defend ourselves against lawsuits.
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          Enforce this Privacy Policy or the Terms of Use,
                          including in order to investigate potential breaches
                          thereof; protect our rights, property or safety, or
                          those of our users.
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          So that we can defend ourselves against lawsuits.
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg font-bold mr-3 leading-relaxed">
                          •
                        </span>
                        <div className="leading-relaxed">
                          We may also share aggregated or non-personally
                          identifiable information that we collect and share as
                          broadly described above under the "what data we
                          collect" section.
                        </div>
                      </div>
                    </div>

                    <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-4">
                      4. ADVERTISEMENTS AND DIRECT MAIL
                    </h2>
                    <p className="mb-4">
                      The information will also be used for marketing,
                      advertising and direct mail purposes by us or anyone on
                      our behalf, as well as information on products and
                      services of third parties provided in cooperation with us,
                      including personalized advertising.
                    </p>
                    <p className="mb-6">
                      We will be allowed to send you direct mail and
                      advertisements regarding our Services (and subject to your
                      consent, also in connection with other services or
                      products), by any means of communication, including by
                      e-mail, SMS, automated dialing system and social networks.
                      You can request to unsubscribe from the mailing list for
                      advertisements and direct mail mailing list, also by
                      contacting Morningful. Note that even after unsubscribing,
                      you may still receive some Mailings we must and/or be
                      allowed to send to you by applicable law, even without
                      your consent.
                    </p>

                    <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-4">
                      5. YOUR RIGHTS
                    </h2>
                    <p className="mb-6">
                      We value your privacy and control over your information.
                      Subject to applicable law, you may, at any time, request
                      access to your information in order to understand what
                      information is being processed by Morningful. You may ask
                      us to change and update your information. You may also ask
                      us to erase your personal information, if it is inaccurate
                      or processed in violation of this Privacy Policy except
                      for data that we are required to maintain under applicable
                      laws and regulations.
                    </p>

                    <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-4">
                      6. EXTERNAL LINKS AND THIRD-PARTY SERVICES
                    </h2>
                    <p className="mb-4">
                      The Services may contain integration with third-party
                      service providers and links to third party sites or other
                      apps or services that are not owned or operated by
                      Morningful. Similarly, it is possible that you will use
                      other services to interact or interface with the Services
                      (for example, by accessing the Services via your social
                      network account). This Privacy Policy only applies to
                      Morningful's Services and does not apply to any
                      third-party sites, apps, platforms or any other services.
                      The use of these technologies by these third parties is
                      subject to their own privacy policies and is not covered
                      by this Privacy Policy.
                    </p>
                    <p className="mb-6 font-bold">
                      WE ARE NOT RESPONSIBLE FOR THE PRIVACY PRACTICES OR TERMS
                      OF ANY THIRD PARTIES.
                    </p>

                    <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-4">
                      7. INFORMATION SECURITY
                    </h2>
                    <p className="mb-4">
                      Morningful takes appropriate data security measures for
                      the type of information it possesses and in accordance
                      with the provisions of the law. For this purpose,
                      Morningful uses reasonable and acceptable security
                      measures that comply with custom standards in this field.
                      Although we do our best to protect your information,
                      unfortunately, no method of transmitting or storing
                      electronic data is ever completely secure. As long as
                      Morningful takes reasonable security measures, it shall
                      not be liable for any damage caused by such unauthorized
                      penetration and transfer of information to a third party
                      as a result of such penetration. It is also clarified that
                      you are responsible for taking appropriate information
                      security measures such as the use of anti-virus measures,
                      software updates, and the like.
                    </p>
                    <p className="mb-6">
                      If you have reason to believe that your interaction with
                      us is no longer secure (for example, if you feel that the
                      security of any account you might have with us has been
                      compromised), please immediately notify us of the problem
                      by contacting us in accordance with the "Contact" section
                      below.
                    </p>

                    <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-4">
                      8. PROTECTION OF CHILDREN'S PRIVACY
                    </h2>
                    <p className="mb-2">
                      The Services are not directed to individuals under the age
                      of eighteen (18).
                    </p>
                    <p className="mb-4 font-bold">
                      IF YOU ARE UNDER 18 YEARS OF AGE, YOU MAY NOT USE OR
                      ACCESS THE SERVICES AT ANY TIME OR IN ANY MANNER.
                    </p>
                    <p className="mb-6">
                      Protecting the privacy of young children is especially
                      important. We will not knowingly collect or maintain
                      personal information from individuals under the age of
                      sixteen (16). If we learn that personal information of
                      persons under 16 years of age has been collected by us on
                      or through the Services, we may take the appropriate steps
                      to delete such information.
                    </p>

                    <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-4">
                      9. GOVERNING LAW AND JURISDICTION
                    </h2>
                    <p className="mb-6">
                      This Privacy Policy shall be governed by the laws of the
                      State of Israel, without respect to its conflict of laws
                      principles. We each agree to submit to the exclusive
                      jurisdiction of the courts of Tel-Aviv, Israel.
                    </p>

                    <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-4">
                      10. CHANGES TO THE PRIVACY POLICY
                    </h2>
                    <p className="mb-4">
                      We are constantly seeking to improve our privacy
                      practices. Accordingly, we may amend, change, update or
                      modify this Privacy Policy from time to time.
                    </p>
                    <p className="mb-4">
                      Please take a look at the "LAST UPDATED" legend at the top
                      of this page to see when this Privacy Policy was last
                      revised. Any such revision or modification will become
                      effective immediately upon posting of the revised Terms on
                      our website.
                    </p>
                    <p className="mb-6">
                      Your continued use of the Services following the posting
                      of revised Privacy Policy means that you accept and agree
                      to the changes. You are expected to check this page
                      frequently so you are aware of any changes, as they are
                      binding on you.
                    </p>

                    <h2 className="font-display text-xl font-semibold text-ink mt-8 mb-4">
                      11. CONTACT
                    </h2>
                    <p className="mb-4">
                      If you have any questions (or comments) concerning this
                      Privacy Policy, you are welcome to send us an email via{' '}
                      <a
                        href="mailto:admin@morningful.ai"
                        className="text-brand hover:text-brand-secondary underline"
                      >
                        admin@morningful.ai
                      </a>{' '}
                      and we will make an effort to reply within a reasonable
                      timeframe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPolicyModal;
