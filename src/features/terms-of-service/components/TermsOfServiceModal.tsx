import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({
  isOpen,
  onClose,
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
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Header */}
            <div className="bg-surface-muted text-ink p-4 sm:p-6 md:p-8 border-b border-border flex-shrink-0">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                  <h2
                    id="modal-title"
                    className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-ink mb-1 sm:mb-2"
                  >
                    Morningful Terms of Service
                  </h2>
                  <p
                    id="modal-description"
                    className="text-ink-soft text-sm sm:text-base"
                  >
                    Terms and conditions for using our services
                  </p>
                </div>
                <button
                  ref={firstFocusableRef}
                  onClick={onClose}
                  className="p-2 sm:p-3 text-ink-soft hover:bg-ink/5 hover:text-ink rounded-full transition-colors duration-200 flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand"
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
                <div className="mb-6">
                  <p className="font-mono text-ink-soft text-sm mb-4">July 9 2025</p>

                  <p className="mb-4">
                    These Morningful Terms of Service (this "
                    <strong>Agreement</strong>") is entered into by and between
                    Morningful Inc ("<strong>Morningful</strong>") and the
                    entity or person placing an order for or accessing the
                    Platform ("<strong>Customer</strong>" or "
                    <strong>you</strong>"). This Agreement consists of the terms
                    and conditions set forth below, any exhibits or addenda
                    identified below and any ordering documents, online
                    registration, order descriptions or order confirmations
                    referencing this Agreement ("<strong>Order Forms</strong>").
                    If you are accessing or using the Platform on behalf of your
                    company, you represent that you are authorized to accept
                    this Agreement on behalf of your company, and all references
                    to "you" or "Customer" reference your company.
                  </p>

                  <p className="mb-4">
                    The "<strong>Effective Date</strong>" of this Agreement is
                    the date which is the earlier of (a) Customer's initial
                    access to the Platform (as defined below) through any online
                    provisioning, registration or order process or (b) the
                    effective date of the first Order Form referencing this
                    Agreement. This Agreement will govern Customer's initial
                    purchase on the Effective Date as well as any future
                    purchases made by Customer that reference this Agreement.
                  </p>

                  <p className="mb-4">
                    <strong>Modifications</strong>: You acknowledge and agree
                    that Morningful may modify the terms and conditions of this
                    Agreement in accordance with Section 12 (Modifications).
                  </p>

                  <div className="bg-surface-muted p-4 rounded-lg border-l-4 border-brand my-6">
                    <p className="font-semibold text-ink">
                      BY INDICATING YOUR ACCEPTANCE OF THIS AGREEMENT OR
                      ACCESSING OR USING THE PLATFORM, YOU ARE AGREEING TO BE
                      BOUND BY ALL TERMS, CONDITIONS AND NOTICES CONTAINED OR
                      REFERENCED IN THIS AGREEMENT. IF YOU DO NOT AGREE TO THIS
                      AGREEMENT, PLEASE DO NOT USE THE PLATFORM. FOR CLARITY,
                      EACH PARTY EXPRESSLY AGREES THAT THIS AGREEMENT IS LEGALLY
                      BINDING UPON IT.
                    </p>
                  </div>
                </div>

                <hr className="my-6" />

                <h2 className="text-xl font-bold text-ink mb-4">
                  1. MORNINGFUL PLATFORM
                </h2>

                <p className="mb-4">
                  Morningful offers a Platform for tracking the customer bank
                  accounts, as further described below and in the Documentation.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  1.1. Overview
                </h3>
                <p className="mb-4">
                  Morningful's Platform acts as a central hub for Financial
                  Data, allowing Customer to collect Financial Data from its
                  selected sources ("<strong>Sources</strong>"), such as banks
                  of applications, and send the Financial Data to Customer's
                  chosen destinations ("<strong>Destinations</strong>"), such as
                  Customer's databases or its accounts with third-party
                  applications or services, for Customer's further use. The
                  supported Sources and Destinations are identified in the
                  Documentation. For Sources owned or controlled by Customers ("
                  <strong>Customer Properties</strong>"), Customer enables the
                  collection of Financial Data by implementing Morningful's
                  JavaScript, or other code ("<strong>Morningful Code</strong>")
                  on such Customer Properties. As further described below and in
                  the Documentation, Customer maintains control over which
                  Sources and Destinations it uses with the Platform, as well as
                  the types and content of Customer Data it shares between its
                  Sources and Destinations.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  1.2. Definitions
                </h3>

                <div className="mb-4">
                  <p className="mb-2">
                    "<strong>Customer Data</strong>" means any data that
                    Customer submits to the Platform, including data that it
                    collects from Customer Properties or retrieves from other
                    Sources through the Platform, including as may be
                    incorporated in any Customer reports or output generated by
                    the Platform. Customer Data does not, however, include any
                    Morningful or third-party templates, technology or data.
                  </p>
                </div>

                <div className="mb-4">
                  <p className="mb-2">
                    "<strong>Documentation</strong>" means the end user
                    technical documentation provided with the Platform, as may
                    be modified from time to time.
                  </p>
                </div>

                <div className="mb-4">
                  <p className="mb-2">
                    "<strong>Laws</strong>" means all applicable local, state,
                    federal and international laws, regulations and conventions,
                    including those related to data privacy and data transfer,
                    international communications, and the exportation of
                    technical or personal data.
                  </p>
                </div>

                <div className="mb-4">
                  <p className="mb-2">
                    "<strong>Sensitive Personal Information</strong>" means any
                    of the following: (i) credit, debit or other payment card
                    data subject to the Payment Card Industry Data Security
                    Standards ("<strong>PCI DSS</strong>"), or other financial
                    account numbers or credentials; (ii) patient, medical or
                    other protected health information regulated by the Health
                    Insurance Portability and Accountability Act ("
                    <strong>HIPAA</strong>"); (iii) social security numbers,
                    driver's license numbers or other government ID numbers;
                    (iv) any information deemed to be "special categories of
                    data" of an EU resident (as defined in European Union
                    Regulation 2016/679); or (v) other personal or sensitive
                    information subject to regulation or protection under the
                    Gramm-Leach-Bliley Act, Children's Online Privacy Protection
                    Act or similar foreign or domestic Laws.
                  </p>
                </div>

                <div className="mb-4">
                  <p className="mb-2">
                    "<strong>Platform</strong>" means the proprietary hosted
                    service(s) specified on an Order Form, including any related
                    Morningful dashboards, APIs and Morningful Code.
                  </p>
                </div>

                <div className="mb-4">
                  <p className="mb-2">
                    "<strong>Usage Data</strong>" means Morningful's technical
                    logs, account and login data, data and learnings about
                    Customer's use of the Platform (e.g., frequency of logins,
                    volume of Customer Data collected or sent to Destinations).
                    For clarity, Usage Data does not include Customer Data.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  1.3. Provision of the Platform
                </h3>
                <p className="mb-4">
                  The Platform is provided on a subscription basis for a set
                  term designated on the Order Form (each, a "
                  <strong>Subscription Term</strong>") unless otherwise
                  specified in Section 2 (Platform Plans and Beta Releases).
                  Customers shall purchase and Morningful shall provide the
                  Platform as specified in the applicable Order Form.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  1.4. Access to the Platform
                </h3>
                <p className="mb-4">
                  During the Subscription Term (as defined below), Customer may
                  access and use the Platform for its internal business
                  operations, subject to this Agreement, the Documentation, and
                  any scope of use restrictions on the applicable Order Form.
                  This includes the right to implement Morningful Code in order
                  to collect Financial Data for use with the Platform. Access to
                  the Platform is limited to Customer's employees and
                  contractors acting for the sole benefit of Customer ("
                  <strong>Permitted Users</strong>"). Customers and its
                  Permitted Users may need to register for a Morningful account
                  in order to access or use the Platform. Account registration
                  information must be accurate, current and complete, and will
                  be governed by Morningful Privacy Policy (currently available
                  at{' '}
                  <a
                    href="https://Morningful.ai/privacy-policy"
                    className="text-brand hover:text-brand-secondary underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://Morningful.ai/privacy-policy
                  </a>
                  ). Customer is responsible for any use of the Platform by its
                  Permitted Users and their compliance with this Agreement.
                  Customers shall keep confidential its user IDs and passwords
                  for the Platform and remain responsible for any actions taken
                  through its accounts.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  1.5. Use Restrictions
                </h3>
                <p className="mb-4">
                  Customer shall not (and shall not permit any third party to):
                  (a) rent, lease, provide access to or sublicense the Platform
                  to a third party; (b) use the Platform to provide, or
                  incorporate the Platform into, any product or service provided
                  to a third party; (c) use the Platform to develop a similar or
                  competing product or service; (d) reverse engineer, decompile,
                  disassemble, or otherwise seek to obtain the source code or
                  non-public APIs to the Platform, except to the extent
                  expressly permitted by applicable law (and then only upon
                  advance notice to Morningful); (e) copy, modify or create any
                  derivative work of the Platform or any Documentation; (f)
                  remove or obscure any proprietary or other notices contained
                  in the Platform (including any reports or data printed from
                  the Platform); or (g) publicly disseminate performance
                  information regarding the Platform.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  1.6. Storage and Processing of Customer Data
                </h3>
                <p className="mb-4">
                  During each Subscription Term, Morningful may store certain
                  Customer Data submitted from Sources to enable various
                  features and functionality of the Platform, including for
                  "replay" and re-sending of Customer Data to Destinations at
                  Customer's direction. Customer acknowledges that Customer Data
                  transmitted through the Platform may be stored and processed
                  by Morningful in the United States or in other countries as
                  approved or directed by Customer (e.g., through Customer's
                  selection of a regional option through the Platform). For
                  clarity, nothing in this Section 1.6 prohibits Morningful from
                  transmitting Customer Data to Customer's designated
                  Destinations as part of the Platform.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  1.7. Data Protection Addendum
                </h3>
                <p className="mb-4">
                  The parties agree to comply with the terms of the Data
                  Protection Addendum attached as Exhibit B.
                </p>

                <h2 className="text-xl font-bold text-ink mb-4 mt-8">
                  2. SERVICE PLANS AND BETA RELEASES
                </h2>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  2.1. Platform Plans
                </h3>
                <p className="mb-4">
                  Morningful makes available the Platform through paid plans ("
                  <strong>Paid Plans</strong>") and Customer's specific plan
                  will be identified in the Order Form presented when Customer
                  registers, orders or pays for the Platform. Customer's
                  permitted scope of use (such as features available, permitted
                  number of monthly tracked users (MTUs) and other usage limits)
                  depends on the plan that Customer selects and will be
                  specified on the applicable Order Form.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  2.2. Paid Plans
                </h3>
                <p className="mb-4">
                  Paid Plans are provided for the Subscription Term designated
                  on the applicable Order Form and, unless otherwise specified
                  on the Order Form, each Subscription Term shall automatically
                  renew for the same period as the then-current Subscription
                  Term unless either party gives the other written notice of
                  termination at least thirty (30) days prior to expiration of
                  the then-current Subscription Term (e.g., monthly Paid Plans
                  will automatically roll over month-to-month and annual Paid
                  Plans will automatically renew for additional 12-month
                  periods).
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  2.3. Beta Releases
                </h3>
                <p className="mb-4">
                  Customers may receive access to a Platform feature/s as an
                  alpha, beta or early access offering ("
                  <strong>Beta Releases</strong>"). Morningful identifies all
                  Beta Releases as such and any usage by Customer is optional.
                  Use of a Beta Release is permitted only for Customer's
                  internal evaluation during the period designated by Morningful
                  (or if not designated, 30 days) and may be subject to
                  additional terms provided by Morningful and agreed by
                  Customer. Morningful may suspend or terminate Customer's
                  access to Beta Releases at any time for any reason. Beta
                  Releases may be inoperable, incomplete or include features
                  that Morningful may never release, and their features and
                  performance information are Morningful's Confidential
                  Information.{' '}
                  <strong>
                    Notwithstanding anything else in this Agreement,
                    Morningful's liability for Beta Releases will not exceed
                    US$50.
                  </strong>
                </p>

                <h2 className="text-xl font-bold text-ink mb-4 mt-8">
                  3. CUSTOMER OBLIGATIONS
                </h2>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  3.1. Data Collection
                </h3>
                <p className="mb-4">
                  Subject to this Agreement and as further described in the
                  Documentation, Customers may configure the Financial Data
                  elements to be collected from Sources and shared with
                  different Destinations. In some instances, as referenced in
                  the Platform dashboard and Documentation, enabling a
                  third-party Destination involves implementing the third-party
                  provider's own SDK or code on Customer Properties. As a
                  result, in these cases, certain default data designated by
                  that Destination's provider may be sent directly to Customer's
                  accounts with that Destination, rather than passing through
                  the Platform.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  3.2. Rights in Customer Data
                </h3>
                <p className="mb-4">
                  Customer is solely responsible for the accuracy, content and
                  legality of all Customer Data. Customer represents and
                  warrants to Morningful that (1) Customer will comply with all
                  applicable Laws in its use of the Platform (including, if
                  applicable, the Israeli Privacy Protection Regulations (Data
                  Security), California Online Privacy Protection Act, European
                  Union Regulation 2016/679 and similar Laws governing
                  cross-site tracking or automated decision-making) and (2)
                  Customer has provided all disclosures and obtained all
                  necessary rights, consents and permissions to collect, share
                  and use Customer Data as contemplated in this Agreement
                  (including granting Morningful the rights in Section 5.1 and
                  Customer's building, tracking, using or sharing of any user
                  profiles, traits or audiences), without violation or
                  infringement of (i) any third party intellectual property,
                  publicity, privacy or other rights, (ii) any Laws, or (iii)
                  any terms of service, privacy policies or other agreement
                  governing the Customer Properties or Customer's accounts with
                  third-party Sources or Destinations. By enabling use of the
                  Platform with any Source or Destination, Customer authorizes
                  Morningful to access Customer's accounts with such Source or
                  Destination for the purposes described in this Agreement. In
                  addition, in order to provide the Platform to Customer and
                  improve Morningful's integrations with Sources and
                  Destinations, Morningful may also disclose Customer's status
                  as a Morningful customer and related technical Platform data
                  to the providers of Customer's Sources and Destinations.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  3.3. No Sensitive Personal Information
                </h3>
                <p className="mb-4">
                  Customers specifically agree not to use the Platform to
                  collect, store, process or transmit any Sensitive Personal
                  Information. Customer acknowledges that Morningful is not a
                  Business Associate or subcontractor (as those terms are
                  defined in HIPAA) or a payment card processor and that the
                  Platform is neither HIPAA nor PCI DSS compliant. Morningful
                  shall have no liability under this Agreement for Sensitive
                  Personal Information, notwithstanding anything to the contrary
                  herein.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  3.4. Indemnification by Customer
                </h3>
                <p className="mb-4">
                  Customer shall indemnify, defend and hold harmless Morningful
                  from and against any and all third-party claims, costs,
                  damages, losses, liabilities and expenses (including
                  reasonable attorneys' fees and costs) arising out of or in
                  connection with any Customer Data or breach or alleged breach
                  by Customer of Sections 3.2 (Rights in Customer Data) or 3.3
                  (No Sensitive Personal Information). This indemnification
                  obligation is subject to Customer receiving (i) prompt written
                  notice of such claim (but in any event notice in sufficient
                  time for Customer to respond without prejudice); (ii) the
                  exclusive right to control and direct the investigation,
                  defense, or settlement of such claim; and (iii) all reasonably
                  necessary cooperation of Morningful (at Customer's expense for
                  reasonable out-of-pocket costs).
                </p>

                <h2 className="text-xl font-bold text-ink mb-4 mt-8">
                  4. SECURITY
                </h2>
                <p className="mb-4">
                  Morningful agrees to use commercially reasonable technical and
                  organizational measures designed to prevent unauthorized
                  access, use, alteration or disclosure of the Platform or
                  Customer Data, as further described in Morningful's
                  Information Security Policy attached as Exhibit A. However,
                  Morningful shall have no responsibility for errors in
                  transmission, unauthorized third-party access or other causes
                  beyond Morningful's control.
                </p>

                <h2 className="text-xl font-bold text-ink mb-4 mt-8">
                  5. OWNERSHIP
                </h2>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  5.1. Customer Data
                </h3>
                <p className="mb-4">
                  As between the parties, Customer shall retain all right, title
                  and interest (including any and all intellectual property
                  rights) in and to the Customer Data as provided to Morningful.
                  Subject to the terms of this Agreement, Customer hereby grants
                  to Morningful a non-exclusive, worldwide, royalty-free right
                  to use, copy, store, transmit, modify, create derivative works
                  of and display the Customer Data solely to the extent
                  necessary to provide the Platform to Customer during the
                  Subscription Term.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  5.2. Morningful Technology
                </h3>
                <p className="mb-4">
                  This is a subscription agreement for access to and use of the
                  Platform. Customer agrees that Morningful or its suppliers
                  retain all right, title and interest (including all patent,
                  copyright, trademark, trade secret and other intellectual
                  property rights) in and to the Platform, all Documentation and
                  any and all related and underlying technology and
                  documentation and any derivative works, modifications or
                  improvements of any of the foregoing, including as may
                  incorporate Feedback (as defined below). Morningful may
                  generate Usage Data to operate, improve, analyze and support
                  the Platform, for benchmarking and reporting and for
                  Morningful's other lawful business purposes. Except as
                  expressly set forth in this Agreement, no rights in the
                  Platform or any Morningful technology are granted to Customer.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  5.3. Feedback
                </h3>
                <p className="mb-4">
                  Customers, from time to time, may submit comments, questions,
                  suggestions or other feedback relating to any Morningful
                  product or service to Morningful (collectively, "
                  <strong>Feedback</strong>"). Customer hereby grants to
                  Morningful a non-exclusive, perpetual, irrevocable,
                  royalty-free, transferable, worldwide license to use, copy,
                  create derivative works of, publicly display, publicly
                  perform, and distribute such Feedback and to incorporate such
                  Feedback into Morningful products and services.
                </p>

                <h2 className="text-xl font-bold text-ink mb-4 mt-8">
                  6. FEES & PAYMENT
                </h2>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  6.1. Fees and Payment
                </h3>
                <p className="mb-4">
                  All fees for Paid Plans are as set forth in the applicable
                  Order Form and shall be paid by Customer in accordance with
                  the payment terms set forth in the Order Form. If no payment
                  terms are specified in the Order Form, then the following
                  default terms apply: (i) for monthly Subscription Terms,
                  Customer will pay all fees at the end of the month and (ii)
                  for annual Subscription Terms, Customer will pay all fees
                  within thirty (30) days of invoice. Except as expressly set
                  forth in Section 12.1 (Modifications to this Agreement), all
                  fees are non-refundable. Morningful reserves the right to
                  increase the rates specified in the Order Form upon any
                  renewal of a Subscription Term. Any late payments shall be
                  subject to a service charge equal to 1.5% per month of the
                  amount due or the maximum amount allowed by law, whichever is
                  less.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  6.2. Taxes
                </h3>
                <p className="mb-4">
                  Morningful's fees are exclusive of all taxes, levies, or
                  duties imposed by taxing authorities, including for example,
                  value-added, sales, use or withholding taxes, assessable by
                  any jurisdiction whatsoever (collectively, "
                  <strong>Taxes</strong>") and Customer shall be responsible for
                  payment of all Taxes associated with this Agreement and all
                  Order Forms, except that Morningful is solely responsible for
                  taxes assessable against Morningful based on Morningful's net
                  income, property, and employees. If any deduction or
                  withholding is required by law, Customer shall notify
                  Morningful and shall pay Morningful any additional amounts
                  necessary to ensure that the net amount that Morningful
                  receives, after any deduction and withholding, equals the
                  amount Morningful would have received if no deduction or
                  withholding had been required.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  6.3. Overages
                </h3>
                <p className="mb-4">
                  If Customer exceeds its permitted usage in any month of a
                  Subscription Term as specified in an Order Form, Morningful
                  reserves the right to charge overage fees in respect of such
                  excess usage at the applicable overage rates set forth in the
                  Order Form. Customers will pay any overage fees monthly in
                  arrears.
                </p>

                <h2 className="text-xl font-bold text-ink mb-4 mt-8">
                  7. TERM AND TERMINATION
                </h2>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  7.1. Term
                </h3>
                <p className="mb-4">
                  This Agreement is effective as of the Effective Date and
                  expires on the date of expiration or termination of all
                  Subscription Terms.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  7.2. Termination for Cause
                </h3>
                <p className="mb-4">
                  Either party may terminate this Agreement (including all
                  related Order Forms) if the other party (a) fails to cure any
                  material breach of this Agreement (including a failure to pay
                  fees or comply with applicable scope of use restrictions)
                  within thirty (30) days after written notice; (b) ceases
                  operation without a successor; or (c) seeks protection under
                  any bankruptcy, receivership, trust deed, creditors'
                  arrangement, composition, or comparable proceeding, or if any
                  such proceeding is instituted against that party (and not
                  dismissed within sixty (60) days thereafter).
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  7.3. Suspension of Platform
                </h3>
                <p className="mb-4">
                  Without limiting Morningful's termination or other rights
                  hereunder, Morningful reserves the right to suspend Customer's
                  access to the Platform (and any related services) in whole or
                  in part, without liability to Customer: (i) if Customer's
                  account is thirty (30) days or more overdue; (ii) for
                  Customer's breach of Sections 1.5 (Use Restrictions) or 3
                  (Customer Obligations); or (iii) to prevent harm to other
                  customers or third parties or to preserve the security,
                  availability or integrity of the Platform. When practicable,
                  Morningful will use reasonable efforts to provide Customers
                  with advance notice of the suspension (email sufficing).
                  Unless this Agreement has been terminated, Morningful will
                  cooperate to restore Customer's access to the Platform
                  promptly after Morningful verifies that Customer has resolved
                  the issue requiring suspension.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  7.4. Effect of Termination
                </h3>
                <p className="mb-4">
                  Upon any expiration or termination of this Agreement, Customer
                  shall immediately cease any and all use of and access to the
                  Platform (including any and all related Morningful
                  technology), cease distributing any Morningful Code installed
                  on Customer Properties, and delete (or, at Morningful's
                  request, return) any and all copies of the Documentation, any
                  Morningful passwords or access codes and any other Morningful
                  Confidential Information in its possession. Customer
                  acknowledges that following termination it shall have no
                  further access to any Customer Data in the Platform, and that
                  Morningful may delete any such data as may have been stored by
                  Morningful at any time. Upon any expiration or termination of
                  this Agreement, Morningful shall delete all Customer Data
                  within sixty (60) days after receipt of Customer's written
                  request. Notwithstanding the foregoing, Customer understands
                  that Morningful may retain copies of Customer Data in regular
                  backups or as required by Laws, which will remain subject to
                  the security standards in Section 4 (Security). Except where
                  an exclusive remedy is specified, the exercise of either party
                  of any remedy under this Agreement, including termination,
                  will be without prejudice to any other remedies it may have
                  under this Agreement, by law or otherwise.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  7.5. Survival
                </h3>
                <p className="mb-4">
                  The following Sections shall survive any expiration or
                  termination of this Agreement: 1.5 (Use Restrictions), the
                  disclaimers in Section 2.4 (Beta Releases), 3.4
                  (Indemnification by Customer), 5 (Ownership), 6.1 (Fees and
                  Payment), 7 (Term and Termination), 8 (Warranty Disclaimer), 9
                  (Limitation of Remedies and Damages), 10 (Confidential
                  Information), 12 (Modifications) and 13 (General Terms).
                </p>

                <h2 className="text-xl font-bold text-ink mb-4 mt-8">
                  8. WARRANTY DISCLAIMER
                </h2>
                <p className="mb-4">
                  <span className="font-bold uppercase">THE PLATFORM</span> and{' '}
                  <span className="font-bold uppercase">
                    ALL RELATED SERVICES ARE PROVIDED "AS IS". NEITHER
                    MORNINGFUL NOR ITS SUPPLIERS MAKES ANY OTHER WARRANTIES,
                    EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT
                    NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, TITLE, FITNESS
                    FOR A PARTICULAR PURPOSE OR NONINFRINGEMENT.
                  </span>{' '}
                  Morningful does not warrant that Customer's use of{' '}
                  <span className="font-bold uppercase">THE PLATFORM</span> will
                  be uninterrupted or error-free, nor does Morningful warrant
                  that it will review the Customer Data for accuracy or that it
                  will preserve or maintain the Customer Data without loss.{' '}
                  <span className="font-bold uppercase">
                    CUSTOMER UNDERSTANDS THAT CUSTOMER DATA IS SHARED WITH
                    DESTINATIONS AT CUSTOMER'S ELECTION AND MORNINGFUL TAKES NO
                    RESPONSIBILITY FOR ANY DESTINATION'S USE OR PROTECTION OF
                    CUSTOMER DATA ONCE IT HAS BEEN SHARED. CUSTOMER UNDERSTANDS
                    THAT IT IS RESPONSIBLE FOR PUTTING IN PLACE ANY CONTRACTUAL
                    ARRANGEMENTS WITH DESTINATIONS REQUIRED BY LAWS.
                  </span>{' '}
                  Morningful{' '}
                  <span className="font-bold uppercase">
                    SHALL NOT BE LIABLE FOR DELAYS, INTERRUPTIONS, SERVICE
                    FAILURES OR OTHER PROBLEMS INHERENT IN USE OF THE INTERNET
                    AND ELECTRONIC COMMUNICATIONS OR OTHER SYSTEMS OUTSIDE THE
                    REASONABLE CONTROL OF
                  </span>{' '}
                  Morningful.{' '}
                  <span className="font-bold uppercase">
                    CUSTOMER MAY HAVE OTHER STATUTORY RIGHTS, BUT THE DURATION
                    OF STATUTORILY REQUIRED WARRANTIES, IF ANY, SHALL BE LIMITED
                    TO THE SHORTEST PERIOD PERMITTED BY LAW.
                  </span>
                </p>

                <h2 className="text-xl font-bold text-ink mb-4 mt-8">
                  9. Limitation of Remedies and Damages
                </h2>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  9.1. Consequential Damages Waiver
                </h3>
                <p className="mb-4">
                  <span className="font-bold uppercase">
                    EXCEPT FOR EXCLUDED CLAIMS (DEFINED BELOW), NEITHER PARTY
                    (NOR ITS SUPPLIERS) SHALL HAVE ANY LIABILITY ARISING OUT OF
                    OR RELATED TO THIS AGREEMENT FOR ANY LOSS OF USE, LOST DATA,
                    LOST PROFITS, FAILURE OF SECURITY MECHANISMS, INTERRUPTION
                    OF BUSINESS, OR ANY INDIRECT, SPECIAL, INCIDENTAL, RELIANCE,
                    OR CONSEQUENTIAL DAMAGES OF ANY KIND, EVEN IF INFORMED OF
                    THE POSSIBILITY OF SUCH DAMAGES IN ADVANCE.
                  </span>
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  9.2. Liability Cap
                </h3>
                <p className="mb-4">
                  <span className="font-bold uppercase">
                    MORNINGFUL'S (AND ITS SUPPLIERS') ENTIRE LIABILITY TO
                    CUSTOMER ARISING OUT OF OR RELATED TO THIS AGREEMENT SHALL
                    NOT EXCEED THE AMOUNT ACTUALLY PAID OR PAYABLE BY CUSTOMER
                    TO MORNINGFUL DURING THE PRIOR TWELVE (12) MONTHS UNDER THIS
                    AGREEMENT.
                  </span>
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  9.3. Excluded Claims
                </h3>
                <p className="mb-4">
                  "<strong>Excluded Claims</strong>" means (a) any claim arising
                  from Customer's breach of Sections 1.5 (Use Restrictions), 3.2
                  (Rights in Customer Data) or 3.3 (No Sensitive Personal
                  Information); or (b) any amounts payable to third parties
                  pursuant to Customer's indemnification obligations under
                  Section 3.4 (Indemnification by Customer).
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  9.4. Nature of Claims and Failure of Essential Purpose
                </h3>
                <p className="mb-4">
                  The parties agree that the waivers and limitations specified
                  in this Section 9 apply regardless of the form of action,
                  whether in contract, tort (including negligence), strict
                  liability or otherwise and will survive and apply even if any
                  limited remedy specified in this Agreement is found to have
                  failed of its essential purpose.
                </p>

                <h2 className="text-xl font-bold text-ink mb-4 mt-8">
                  10. CONFIDENTIAL INFORMATION
                </h2>
                <p className="mb-4">
                  Each party (as "<strong>Receiving Party</strong>") agrees that
                  all code, inventions, know-how, business, technical and
                  financial information it obtains from the disclosing party ("
                  <strong>Disclosing Party</strong>") constitute the
                  confidential property of the Disclosing Party ("
                  <strong>Confidential Information</strong>"), provided that it
                  is identified as confidential at the time of disclosure or
                  should be reasonably known by the Receiving Party to be
                  confidential or proprietary due to the nature of the
                  information disclosed and the circumstances surrounding the
                  disclosure. Any Morningful technology, performance information
                  relating to the Platform, and the terms and conditions of this
                  Agreement shall be deemed Confidential Information of Platform
                  without any marking or further designation. Except as
                  expressly authorized herein, the Receiving Party shall (1)
                  hold in confidence and not disclose any confidential
                  information to third parties and (2) not use confidential
                  information for any purpose other than fulfilling its
                  obligations and exercising its rights under this Agreement.
                  The Receiving Party may disclose Confidential Information to
                  its employees, agents, contractors and other representatives
                  having a legitimate need to know (including, for Morningful,
                  the subcontractors referenced in Section 13.10), provided that
                  such representatives are bound to confidentiality obligations
                  no less protective of the Disclosing Party than this Section
                  10 and that the Receiving Party remains responsible for
                  compliance by any such representative with the terms of this
                  Section 10. The Receiving Party's confidentiality obligations
                  shall not apply to information that the Receiving Party can
                  document: (i) was rightfully in its possession or known to it
                  prior to receipt of the Confidential Information; (ii) is or
                  has become public knowledge through no fault of the Receiving
                  Party; (iii) is rightfully obtained by the Receiving Party
                  from a third party without breach of any confidentiality
                  obligation; or (iv) is independently developed by employees of
                  the Receiving Party who had no access to such information. The
                  Receiving Party may make disclosures to the extent required by
                  law or court order, provided the Receiving Party notifies the
                  Disclosing Party in advance and cooperates in any effort to
                  obtain confidential treatment. The Receiving Party
                  acknowledges that disclosure of Confidential Information would
                  cause substantial harm for which damages alone would not be a
                  sufficient remedy, and therefore that upon any such disclosure
                  by the Receiving Party the Disclosing Party shall be entitled
                  to seek appropriate equitable relief in addition to whatever
                  other remedies it might have at law.
                </p>

                <h2 className="text-xl font-bold text-ink mb-4 mt-8">
                  11. CO-MARKETING
                </h2>
                <p className="mb-4">
                  Customer agrees to participate in reasonable marketing
                  activities that promote the benefits of the Platform to other
                  potential customers and the use of Customer's name and logo on
                  Morningful's web site and in Morningful promotional materials.
                  Customer agrees that Morningful may disclose Customer as a
                  customer of Morningful.
                </p>

                <h2 className="text-xl font-bold text-ink mb-4 mt-8">
                  12. MODIFICATIONS
                </h2>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  12.1. Modifications to this Agreement
                </h3>
                <p className="mb-4">
                  Morningful may modify the terms and conditions of this
                  Agreement (which may include changes to Platform pricing and
                  plans) from time to time with notice to Customer in accordance
                  with Section 13.5 (Notice).
                </p>
                <div className="mb-4 ml-4">
                  <p className="mb-3">
                    <strong>a. Paid Plans.</strong> If Customer has a Paid Plan,
                    the following terms apply: Unless a shorter period is
                    specified by Morningful (e.g., due to changes in the law or
                    exigent circumstances), the modifications become effective
                    upon renewal of Customer's current Subscription Term or
                    entry into a new Order Form. If Morningful specifies that
                    the modifications to the Agreement will take effect prior to
                    Customer's next renewal or order and Customer notifies
                    Morningful in writing of its objection to the modifications
                    within thirty (30) days after the date of such notice,
                    Morningful (at its option and as Customer's exclusive
                    remedy) will either: (a) permit Customer to continue under
                    the existing version of this Agreement until expiration of
                    the then-current Subscription Term (after which time the
                    modified Agreement will go into effect) or (b) allow
                    Customer to terminate this Agreement and receive a pro-rated
                    refund of any fees Customer has pre-paid for use of the
                    Platform for the terminated portion of the applicable
                    Subscription Term. Customers may be required to click to
                    accept or otherwise agree to the modified Agreement in order
                    to continue using the Platform, and, in any event, continued
                    use of the Platform after the updated version of this
                    Agreement goes into effect will constitute Customer's
                    acceptance of such updated version.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  12.2. Changes to Policies
                </h3>
                <p className="mb-4">
                  In addition, Morningful may modify the security terms
                  described in Exhibit A (Information Security Policy) from time
                  to time to reflect process improvements or changing practices
                  (but the modifications will not materially decrease
                  Morningful's obligations as compared to those in such policies
                  as of the Effective Date). Policy modifications will apply
                  automatically on the effective date specified by Morningful
                  and the Customer objection procedures in Section 12.1
                  (Modifications to this Agreement) will not apply.
                </p>

                <h2 className="text-xl font-bold text-ink mb-4 mt-8">
                  13. GENERAL TERMS
                </h2>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.1. Assignment
                </h3>
                <p className="mb-4">
                  This Agreement will bind and ensure to the benefit of each
                  party's permitted successors and assigns. Neither party may
                  assign this Agreement without the advance written consent of
                  the other party, except that Morningful may assign this
                  Agreement in connection with a merger, reorganization,
                  acquisition or other transfer of all or substantially all of
                  Morningful's assets or voting securities. Any attempt to
                  transfer or assign this Agreement except as expressly
                  authorized under this Section 13.1 will be null and void.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.2. Severability
                </h3>
                <p className="mb-4">
                  If any provision of this Agreement shall be adjudged by any
                  court of competent jurisdiction to be unenforceable or
                  invalid, that provision shall be limited to the minimum extent
                  necessary so that this Agreement shall otherwise remain in
                  effect.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.3. Governing Law; Jurisdiction and Venue
                </h3>
                <p className="mb-4">
                  This Agreement shall be governed by the laws of the State of
                  Israel without regard to conflicts of laws provisions thereof,
                  and without regard to the United Nations Convention on the
                  International Sale of Goods. The jurisdiction and venue for
                  actions related to the subject matter hereof shall be the
                  state and Israel federal courts and both parties hereby submit
                  to the personal jurisdiction of such courts.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.4. Attorneys' Fees and Costs
                </h3>
                <p className="mb-4">
                  The prevailing party in any action to enforce this Agreement
                  will be entitled to recover its attorneys' fees and costs in
                  connection with such action.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.5. Notice
                </h3>
                <p className="mb-4">
                  Any notice or communication required or permitted under this
                  Agreement shall be in writing. If to Morningful, notices must
                  be provided to the address set forth in Section 13.6
                  (Morningful Contact Information), and shall be deemed to have
                  been received (i) if given by hand, immediately upon receipt;
                  (ii) if given by overnight courier service, the first business
                  day following dispatch or (iii) if given by registered or
                  certified mail, postage prepaid and return receipt requested,
                  the second business day after such notice is deposited in the
                  mail. If to Customer, Morningful may provide notice to
                  Customer's email address on file or through the Platform and
                  such notices shall be deemed to have been received upon
                  delivery. Either party may update its address with notice to
                  the other party.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.6. Morningful Contact Information
                </h3>
                <p className="mb-4">
                  Any Customer notices, questions or complaints regarding the
                  Platform should be sent to the following address:
                </p>
                <p className="mb-4 ml-4 font-medium">
                  Trl Tsur 33 Even Yehuda, Israel
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.7. Waivers
                </h3>
                <p className="mb-4">
                  No waiver will be implied from conduct or failure to enforce
                  or exercise rights under this Agreement, nor will any waiver
                  be effective unless in a writing signed by a duly authorized
                  representative on behalf of the party claimed to have waived.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.8. Entire Agreement; Interpretation
                </h3>
                <p className="mb-4">
                  This Agreement is the complete and exclusive statement of the
                  mutual understanding of the parties and supersedes and cancels
                  all previous written and oral agreements and communications
                  relating to the subject matter of this Agreement. No provision
                  of any purchase order or other business form employed by
                  Customer will supersede the terms and conditions of this
                  Agreement, and any such document relating to this Agreement
                  shall be for administrative purposes only and shall have no
                  legal effect. In this Agreement, headings are for convenience
                  only and "including", "e.g.", and similar terms will be
                  construed without limitation. Customer acknowledges that the
                  Platform are on-line, subscription-based products, and that in
                  order to provide improved customer experience Morningful may
                  make changes to the Platform, and Morningful will update the
                  applicable Documentation accordingly.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.9. Force Majeure
                </h3>
                <p className="mb-4">
                  Neither party shall be liable to the other for any delay or
                  failure to perform any obligation under this Agreement (except
                  for a failure to pay fees) if the delay or failure is due to
                  unforeseen events that occur after the signing of this
                  Agreement and that are beyond the reasonable control of such
                  party, such as a strike, blockade, war, act of terrorism,
                  riot, natural disaster, failure or diminishment of power or
                  telecommunications or data networks or services, or refusal of
                  a license by a government agency.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.10. Subcontractors
                </h3>
                <p className="mb-4">
                  Morningful may use the services of subcontractors and permit
                  them to exercise the rights granted to Morningful in order to
                  provide the Platform under this Agreement. These
                  subcontractors may include, for example, Morningful's hosting,
                  infrastructure and APIs providers. Morningful remains
                  responsible for compliance of any such subcontractor with the
                  terms of this Agreement and the overall performance of the
                  Platform as required under this Agreement.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.11. Subpoenas
                </h3>
                <p className="mb-4">
                  Nothing in this Agreement prevents Morningful from disclosing
                  Customer Data to the extent required by law, subpoenas, or
                  court orders, but Morningful shall use commercially reasonable
                  efforts to notify Customer where permitted to do so.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.12. Independent Contractors
                </h3>
                <p className="mb-4">
                  The parties to this Agreement are independent contractors.
                  There is no relationship of partnership, joint venture,
                  employment, franchise or agency created hereby between the
                  parties. Neither party will have the power to bind the other
                  or incur obligations on the other party's behalf without the
                  other party's prior written consent.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.13. Export Control
                </h3>
                <p className="mb-4">
                  In its use of the Platform, Customer agrees to comply with all
                  export and import laws and regulations of the State of Israel
                  and other applicable jurisdictions. Without limiting the
                  foregoing, (i) Customer represents and warrants that it is not
                  listed on any Israel government list of prohibited or
                  restricted parties or located in (or a national of) a country
                  that is subject to an Israel government embargo or that has
                  been designated by the Israel government as a "terrorist
                  supporting" country, and (ii) Customer shall not (and shall
                  not permit any of its users to) access or use the Platform in
                  violation of any Israel export embargo, prohibition or
                  restriction.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  13.14. Government End-Users
                </h3>
                <p className="mb-4">
                  Elements of the Platform are commercial computer software. If
                  the user or licensee of the Platform is an agency, department,
                  or other entity of the Israel Government, the use,
                  duplication, reproduction, release, modification, disclosure,
                  or transfer of the Platform, or any related documentation of
                  any kind, including technical data and manuals, is restricted
                  by a license agreement or by the terms of this Agreement. The
                  Platform were developed fully at private expense. All other
                  use is prohibited.
                </p>

                <hr className="my-8 border-border" />

                <h2 className="font-display text-xl font-bold text-ink mb-6 text-center">
                  Exhibit A – INFORMATION SECURITY POLICY
                </h2>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  Introduction
                </h3>
                <p className="mb-6">
                  Morningful considers protection of Customer Data a top
                  priority. As further described in this Morningful Information
                  Security Policy, Morningful uses commercially reasonable
                  organizational and technical measures designed to prevent
                  unauthorized access, use, alteration or disclosure of Customer
                  Data stored on systems under Morningful's control. Morningful
                  maintains these security measures in accordance with ISO
                  27001, 27017 and 27018.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  1. Customer Data and Management
                </h3>
                <p className="mb-4">
                  Morningful limits its personnel's access to Customer Data as
                  follows:
                </p>
                <div className="mb-6 ml-4 space-y-3">
                  <p>
                    <strong>1.1.</strong> Requires unique user access
                    authorization through secure logins and passwords, including
                    multi-factor authentication for Cloud Hosting administrator
                    access and individually-assigned Secure Socket Shell (SSH)
                    keys for external engineer access;
                  </p>
                  <p>
                    <strong>1.2.</strong> Limits the Customer Data available to
                    Morningful personnel on a "need to know" basis;
                  </p>
                  <p>
                    <strong>1.3.</strong> Restricts access to Morningful's
                    production environment by Morningful personnel on the basis
                    of business need;
                  </p>
                  <p>
                    <strong>1.4.</strong> Encrypts user security credentials for
                    production access; and
                  </p>
                  <p>
                    <strong>1.5.</strong> Prohibits Morningful personnel from
                    storing Customer Data on electronic portable storage devices
                    such as computer laptops, portable drives and other similar
                    devices.
                  </p>
                  <p>
                    <strong>1.6.</strong> Morningful logically separates each of
                    its customers' data and maintains measures designed to
                    prevent Customer Data from being exposed to or accessed by
                    other customers.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  2. Data Encryption
                </h3>
                <p className="mb-4">
                  Morningful provides industry-standard encryption for Customer
                  Data as follows:
                </p>
                <div className="mb-6 ml-4 space-y-3">
                  <p>
                    <strong>2.1.</strong> Implements encryption in transport and
                    at rest;
                  </p>
                  <p>
                    <strong>2.2.</strong> Uses strong encryption methodologies
                    to protect Customer Data, including AES 256-bit encryption
                    for Customer Data stored in Morningful's production
                    environment; and
                  </p>
                  <p>
                    <strong>2.3.</strong> Encrypts all Customer Data located in
                    cloud storage while at rest.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  3. Network Security, Physical Security and Environmental
                  Controls
                </h3>
                <div className="mb-6 ml-4 space-y-3">
                  <p>
                    <strong>3.1.</strong> Morningful uses firewalls, network
                    access controls and other techniques designed to prevent
                    unauthorized access to systems processing Customer Data.
                  </p>
                  <p>
                    <strong>3.2.</strong> Morningful maintains measures designed
                    to assess, test and apply security patches to all relevant
                    systems and applications used to provide the Platform.
                  </p>
                  <p>
                    <strong>3.3.</strong> Morningful monitors privileged access
                    to applications that process Customer Data, including cloud
                    services.
                  </p>
                  <p>
                    <strong>3.4.</strong> The Platform operates on Amazon Web
                    Services ("<strong>AWS</strong>") and Google Cloud ("
                    <strong>GCS</strong>") and are protected by the security and
                    environmental controls of Amazon and Google, respectively.
                    Detailed information about AWS security is available at{' '}
                    <a
                      href="https://aws.amazon.com/security/"
                      className="text-brand hover:text-brand-secondary underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://aws.amazon.com/security/
                    </a>{' '}
                    and{' '}
                    <a
                      href="http://aws.amazon.com/security/sharing-the-security-responsibility/"
                      className="text-brand hover:text-brand-secondary underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      http://aws.amazon.com/security/sharing-the-security-responsibility/
                    </a>
                    . For AWS SOC Reports, please see{' '}
                    <a
                      href="https://aws.amazon.com/compliance/soc-faqs/"
                      className="text-brand hover:text-brand-secondary underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://aws.amazon.com/compliance/soc-faqs/
                    </a>
                    . Detailed information about GCS security is available at{' '}
                    <a
                      href="https://cloud.google.com/docs/tutorials#security"
                      className="text-brand hover:text-brand-secondary underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://cloud.google.com/docs/tutorials#security
                    </a>
                    .
                  </p>
                  <p>
                    <strong>3.5.</strong> Customer Data stored within AWS or GCS
                    is encrypted at all times. AWS and GCS do not have access to
                    unencrypted Customer Data.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  4. Independent Security Assessments
                </h3>
                <p className="mb-4">
                  Morningful periodically assesses the security of its systems
                  and the Platform as follows:
                </p>
                <div className="mb-6 ml-4 space-y-3">
                  <p>
                    <strong>4.1.</strong> Annual detailed security and
                    vulnerability assessments of the Platform conducted by
                    independent third-party security experts that include a code
                    analysis and a comprehensive security review. Morningful
                    shall attest to Customer the date of the most recent
                    security and vulnerability assessment at Customer's
                    reasonable request.
                  </p>
                  <p>
                    <strong>4.2.</strong> Bi-annual penetration testing of
                    Morningful systems and applications to test for exploits
                    including, but not limited to, XSS, SQL injection, access
                    controls, and CSRF.
                  </p>
                  <p>
                    <strong>4.3.</strong> Monthly vulnerability scanning.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  5. Incident Response
                </h3>
                <p className="mb-4">
                  If Morningful becomes aware of unauthorized access or
                  disclosure of Customer Data under its control (a "
                  <strong>Breach</strong>"), Morningful will:
                </p>
                <div className="mb-6 ml-4 space-y-3">
                  <p>
                    <strong>5.1.</strong> Take reasonable measures to mitigate
                    the harmful effects of the Breach and prevent further
                    unauthorized access or disclosure.
                  </p>
                  <p>
                    <strong>5.2.</strong> Upon confirmation of the Breach,
                    notify Customer in writing of the Breach without undue
                    delay. Notwithstanding the foregoing, Morningful is not
                    required to make such notice to the extent prohibited by
                    Laws, and Morningful may delay such notice as requested by
                    law enforcement and/or in light of Morningful's legitimate
                    needs to investigate or remediate the matter before
                    providing notice.
                  </p>
                  <p>
                    <strong>5.3.</strong> Each notice of a Breach will include:
                  </p>
                  <div className="ml-4 space-y-2">
                    <p>
                      <strong>5.3.1.</strong> The extent to which Customer Data
                      has been, or is reasonably believed to have been, used,
                      accessed, acquired or disclosed during the Breach;
                    </p>
                    <p>
                      <strong>5.3.2.</strong> A description of what happened,
                      including the date of the Breach and the date of discovery
                      of the Breach, if known;
                    </p>
                    <p>
                      <strong>5.3.3.</strong> The scope of the Breach, to the
                      extent known; and
                    </p>
                    <p>
                      <strong>5.3.4.</strong> A description of Morningful's
                      response to the Breach, including steps Morningful has
                      taken to mitigate the harm caused by the Breach.
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  6. Business Continuity Management
                </h3>
                <div className="mb-6 ml-4 space-y-3">
                  <p>
                    <strong>6.1.</strong> Morningful maintains an appropriate
                    business continuity and disaster recovery plan.
                  </p>
                  <p>
                    <strong>6.2.</strong> Morningful maintains processes to
                    ensure failover redundancy with its systems, networks and
                    data storage.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  7. Personnel Management
                </h3>
                <div className="mb-6 ml-4 space-y-3">
                  <p>
                    <strong>7.1.</strong> Morningful performs employment
                    verification, including proof of identity validation and
                    criminal background checks for all new hires, including
                    contract employees, in accordance with applicable law.
                  </p>
                  <p>
                    <strong>7.2.</strong> Morningful provides training for its
                    personnel who are involved in the processing of the Customer
                    Data to ensure they do not collect, process or use Customer
                    Data without authorization and that they keep Customer Data
                    confidential, including following the termination of any
                    role involving the Customer Data.
                  </p>
                  <p>
                    <strong>7.3.</strong> Morningful conducts routine and random
                    monitoring of employee systems activity.
                  </p>
                  <p>
                    <strong>7.4.</strong> Upon employee termination, whether
                    voluntary or involuntary, Morningful immediately disables
                    all access to Morningful systems, including Morningful's
                    physical facilities.
                  </p>
                </div>

                <hr className="my-8 border-border" />

                <h2 className="font-display text-xl font-bold text-ink mb-6 text-center">
                  Exhibit B – Data Protection Addendum
                </h2>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  1. Introduction
                </h3>
                <p className="mb-6">
                  This Data Protection Addendum ("<strong>Addendum</strong>") is
                  entered into by and between Morningful.com, an Israel
                  corporation ("<strong>Morningful</strong>"), and Customer
                  effective as of the later date of each party's signature
                  below. This Addendum applies to Morningful's Processing of
                  Customer Personal Data under the agreement executed between
                  Morningful and Customer for Morningful's provision of the
                  Platform (the "<strong>Agreement</strong>").
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  2. Definitions
                </h3>
                <p className="mb-4">
                  For purposes of this Addendum, the terms below have the
                  meanings set forth below. Capitalized terms that are used but
                  not defined in this Addendum have the meanings given in the
                  Agreement.
                </p>
                <div className="mb-6 space-y-4">
                  <p>
                    "<strong>Affiliate</strong>" means any entity that directly
                    or indirectly controls, is controlled by or is under common
                    control with the subject entity, where "control" refers to
                    the power to direct or cause the direction of the subject
                    entity, whether through ownership of voting securities, by
                    contract or otherwise.
                  </p>
                  <p>
                    "<strong>Customer Personal Data</strong>" means any Customer
                    Data (as defined in the Agreement) that is Personal Data.
                    For purposes of this Addendum, Customer Personal Data does
                    not include personal information of employees or other
                    representatives of Customer with whom Morningful has a
                    direct business relationship.
                  </p>
                  <p>
                    "<strong>Data Protection Laws</strong>" means, with respect
                    to a party, all privacy, data protection and information
                    security-related laws and regulations applicable to such
                    party's Processing of Personal Data, including, where
                    applicable, EU Data Protection Law.
                  </p>
                  <p>
                    "<strong>Data Subject</strong>" means the identified or
                    identifiable natural person who is the subject of Personal
                    Data.
                  </p>
                  <p>
                    "<strong>EU Data Protection Law</strong>" means European
                    Union Regulation 2016/679 ("<strong>GDPR</strong>") and any
                    national legislation implementing GDPR, as amended from time
                    to time.
                  </p>
                  <p>
                    "<strong>Processing</strong>" means any operation or set of
                    operations which is performed on Personal Data or on sets of
                    Personal Data, whether or not by automated means, such as
                    collection, recording, organization, structuring, storage,
                    adaptation or alteration, retrieval, consultation, use,
                    disclosure by transmission, dissemination or otherwise
                    making available, alignment or combination, restriction,
                    erasure or destruction.
                  </p>
                  <p>
                    "<strong>Personal Data</strong>" means "personal data",
                    "personal information", "personally identifiable
                    information" or similar information defined in and governed
                    by Data Protection Laws.
                  </p>
                  <p>
                    "<strong>Security Incident</strong>" means any confirmed
                    unauthorized or unlawful breach of security that leads to
                    the accidental or unlawful destruction, loss, alteration,
                    unauthorized disclosure of or access to Personal Data being
                    Processed by Morningful. Security Incidents do not include
                    unsuccessful attempts or activities that do not compromise
                    the security of Personal Data, including unsuccessful log-in
                    attempts, pings, port scans, denial of service attacks or
                    other network attacks on firewalls or networked systems.
                  </p>
                  <p>
                    "<strong>Subprocessor</strong>" means any third party
                    authorized by Morningful or its affiliates to process any
                    Customer Personal Data.
                  </p>
                  <p>
                    "<strong>Third Party Subprocessor</strong>" means any
                    Subprocessor who is not an Affiliate of Morningful.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  3. General; Termination
                </h3>
                <p className="mb-4">
                  This Addendum forms part of the Agreement and except as
                  expressly set forth in this Addendum, the Agreement remains
                  unchanged and in full force and effect. If there is any
                  conflict between this Addendum and the Agreement, this
                  Addendum shall govern.
                </p>
                <p className="mb-4">
                  Any liabilities arising under this Addendum are subject to the
                  limitations of liability in the Agreement.
                </p>
                <p className="mb-4">
                  This Addendum will be governed by and construed in accordance
                  with governing law and jurisdiction provisions in the
                  Agreement, unless required otherwise by applicable Data
                  Protection Laws.
                </p>
                <p className="mb-6">
                  This Addendum will automatically terminate upon expiration or
                  termination of the Agreement.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  4. Scope of this Addendum
                </h3>
                <p className="mb-6">
                  This Addendum applies to Morningful's Processing of Customer
                  Personal Data under the Agreement, except that Annex A (EU
                  Annex) to this Addendum applies only to such Processing of
                  Customer Personal Data governed by EU Data Protection Law.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  5. Role and Scope of the Processing
                </h3>
                <p className="mb-4">
                  Morningful will process Customer Data only in accordance with
                  Customer's instructions. By entering into the Agreement,
                  Customer instructs Morningful to Process Customer Data to
                  provide the Services and pursuant to any other written
                  instructions given by Customer and acknowledged in writing by
                  Morningful as constituting instructions for purposes of this
                  Addendum. Customer acknowledges and agrees that such
                  instruction authorizes Morningful to Process Customer Data (a)
                  to perform its obligations and exercise its rights under the
                  Agreement; and (b) to perform its legal obligations and to
                  establish, exercise or defend legal claims in respect of the
                  Agreement.
                </p>
                <p className="mb-6">
                  For clarity, nothing in this Addendum limits Morningful from
                  transmitting Customer Data to and among Sources and
                  Destinations as directed by Customer through the Platform. The
                  parties agree that neither Sources nor Destinations are
                  Subprocessors of Morningful and that, between the parties,
                  Customer is solely responsible for the Processing of Customer
                  Personal Data by, and other acts and omissions of, Sources and
                  Destinations or parties associated therewith.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  6. Subprocessing
                </h3>
                <p className="mb-4">
                  Customer specifically authorizes Morningful to use its
                  Affiliates as Subprocessors, and generally authorizes
                  Morningful to engage Third Party Subprocessors to Process
                  Customer Personal Data. Morningful:
                </p>
                <div className="mb-4 ml-4 space-y-3">
                  <p>
                    shall enter into a written agreement with each Subprocessor,
                    imposing data protection obligations substantially similar
                    to those set out in this Addendum; and
                  </p>
                  <p>
                    remains liable for compliance with the obligations of this
                    Addendum and for any acts or omissions of the Subprocessor
                    that cause Morningful to breach any of its obligations under
                    this Addendum.
                  </p>
                </div>
                <p className="mb-6">
                  When any new Third Party Subprocessor is engaged, Morningful
                  will notify the customer of the engagement. Morningful will
                  give such notice at least ten (10) calendar days before the
                  new Subprocessor Processes any Customer Personal Data, except
                  that if Morningful reasonably believes engaging a new
                  Subprocessor on an expedited basis is necessary to protect the
                  confidentiality, integrity or availability of the Customer
                  Personal Data or avoid material disruption to the Platform,
                  Morningful will give such notice as soon as reasonably
                  practicable. If, within five (5) calendar days after such
                  notice, Customer notifies Morningful in writing that Customer
                  objects to Morningful's appointment of a new Third Party
                  Subprocessor based on reasonable data protection concerns, the
                  parties will discuss such concerns in good faith and whether
                  they can be resolved. If the parties are not able to mutually
                  agree to a resolution of such concerns, Customer, as its sole
                  and exclusive remedy, may terminate the Agreement for
                  convenience.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  7. Security
                </h3>
                <p className="mb-4">
                  Morningful shall implement and maintain technical and
                  organizational security measures designed to protect Customer
                  Personal Data from Security Incidents and to preserve the
                  security and confidentiality of the Customer Personal Data, in
                  accordance with Morningful's security standards referenced in
                  the Agreement ("<strong>Security Measures</strong>").
                </p>
                <p className="mb-4">
                  Customer is responsible for reviewing the information made
                  available by Morningful relating to data security and making
                  an independent determination as to whether the Platform meets
                  Customer's requirements and legal obligations under Data
                  Protection Laws. Customer acknowledges that the Security
                  Measures may be updated from time to time upon reasonable
                  notice to Customer to reflect process improvements or changing
                  practices (but the modifications will not materially decrease
                  Morningful's obligations as compared to those reflected in
                  such terms as of the Effective Date).
                </p>
                <p className="mb-4">
                  Upon becoming aware of a confirmed Security Incident,
                  Morningful shall notify Customer without undue delay unless
                  prohibited by applicable law. A delay in giving such notice
                  requested by law enforcement and/or in light of Morningful's
                  legitimate needs to investigate or remediate the matter before
                  providing notice shall not constitute an undue delay. Such
                  notices will describe, to the extent possible, details of the
                  Security Incident, including steps taken to mitigate the
                  potential risks and steps Morningful recommends Customer take
                  to address the Security Incident. Without prejudice to
                  Morningful's obligations under this Section 7.c., Customer is
                  solely responsible for complying with Security Incident
                  notification laws applicable to Customer and fulfilling any
                  third party notification obligations related to any Security
                  Incidents. Morningful's notification of or response to a
                  Security Incident under this Section 7.c. will not be
                  construed as an acknowledgement by Morningful of any fault or
                  liability with respect to the Security Incident.
                </p>
                <p className="mb-6">
                  Customer agrees that, without limitation of Morningful's
                  obligations under this Section 7, Customer is solely
                  responsible for its use of the Platform, including (a) making
                  appropriate use of the Platform to ensure a level of security
                  appropriate to the risk in respect of the Customer Data; (b)
                  securing the account authentication credentials, systems and
                  devices Customer uses to access the Platform; (c) securing
                  Customer's systems and devices that it uses with the Platform;
                  and (d) maintaining its own backups of Customer Data.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  8. Data Subject Requests
                </h3>
                <p className="mb-6">
                  Morningful shall upon Customer's request (and at Customer's
                  expense) provide Customer with such assistance as it may
                  reasonably require to comply with its obligations under Data
                  Protection Laws to respond to requests from individuals to
                  exercise their rights under Data Protection Laws (e.g., rights
                  of data access, rectification, erasure, restriction,
                  portability and objection) in cases where Customer cannot
                  reasonably fulfill such requests independently by using the
                  self-service functionality of the Platform. If Morningful
                  receives a request from a Data Subject in relation to their
                  Customer Personal Data, Morningful will advise the Data
                  Subject to submit their request to Customer, and Customer will
                  be responsible for responding to any such request.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  9. Return or Deletion of Data
                </h3>
                <p className="mb-4">
                  Morningful shall, within sixty (60) days after request by
                  Customer following the termination or expiration of the
                  Agreement, delete all of the Customer Personal Data from
                  Morningful's systems.
                </p>
                <p className="mb-6">
                  Notwithstanding the foregoing, Customer understands that
                  Morningful may retain Customer Personal Data if required by
                  law, which data will remain subject to the requirements of
                  this Addendum.
                </p>

                <hr className="my-8 border-border" />

                <h2 className="font-display text-xl font-bold text-ink mb-6 text-center">
                  Annex A – EU Annex
                </h2>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  1. Definitions; Processing of Data
                </h3>

                <h4 className="text-base font-semibold text-ink mb-3">
                  Definitions
                </h4>
                <p className="mb-6">
                  For purposes of this Annex A, the terms "
                  <strong>controller</strong>", "<strong>processor</strong>" and
                  "<strong>supervisory authority</strong>" have the meanings
                  given in EU Data Protection Law; "
                  <strong>Standard Contractual Clauses</strong>" means the
                  Standard Contractual Clauses for Processors as approved by the
                  European Commission under Decision 2010/87/EU; and "
                  <strong>data importer</strong>" and "
                  <strong>data exporter</strong>" have the meanings given in the
                  Standard Contractual Clauses.
                </p>

                <h4 className="text-base font-semibold text-ink mb-3">
                  Subject Matter and Details of Processing
                </h4>
                <p className="mb-6">
                  The parties acknowledge and agree that (a) the subject matter
                  of the Processing under the Agreement is Morningful's
                  provision of the Platform; (b) the duration of the Processing
                  is from Platform's receipt of Customer Personal Data until
                  deletion of all Customer Personal Data by Morningful in
                  accordance with the Agreement; (c) the nature and purpose of
                  the Processing is to provide the Platform; (d) the Data
                  Subjects to whom the Processing pertains are Customer's
                  customers, end users or other individuals to whom Customer
                  Personal Data pertains; and (e) the categories of Customer
                  Personal Data are such categories as Customer is authorized to
                  ingest into the Platform under the Agreement.
                </p>

                <h4 className="text-base font-semibold text-ink mb-3">
                  Roles and Regulatory Compliance; Authorization
                </h4>
                <p className="mb-6">
                  The parties acknowledge and agree that (a) Morningful is a
                  processor of the Customer Personal Data under EU Data
                  Protection Law; (b) Customer is a controller of the Customer
                  Personal Data under EU Data Protection Law; and (c) each party
                  will comply with the obligations applicable to it in such role
                  under EU Data Protection Law with respect to the Processing of
                  Customer Personal Data. To the extent that any Usage Data (as
                  defined in the Agreement) is considered Personal Data,
                  Morningful is the controller with respect to such data and
                  shall Process such data in accordance with its Privacy Policy,
                  which can be found at Morningful.com/privacy-policy.
                </p>

                <h4 className="text-base font-semibold text-ink mb-3">
                  Morningful's Compliance with Instructions
                </h4>
                <p className="mb-6">
                  Morningful will only process Customer Personal Data in
                  accordance with Customer's instructions in this Addendum
                  unless EU Data Protection Law requires otherwise, in which
                  case Morningful will notify Customer (unless that law
                  prohibits Morningful from doing so).
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  2. Data Security
                </h3>

                <h4 className="text-base font-semibold text-ink mb-3">
                  Morningful Security Measures, Controls and Assistance
                </h4>
                <p className="mb-4">
                  Morningful will (taking into account the nature of the
                  Processing of Customer Personal Data and the information
                  available to Morningful) provide Customer with reasonable
                  assistance necessary for Customer to comply with its
                  obligations in respect of Customer Personal Data under EU Data
                  Protection Law, including Articles 32 to 34 (inclusive) of the
                  GDPR, by (a) implementing and maintaining the Security
                  Measures; (b) complying with the terms of Section 7 of this
                  Addendum; and (c) complying with this Annex A.
                </p>
                <p className="mb-6">
                  Morningful will grant access to Customer Personal Data only to
                  personnel who need such access for the scope of their job
                  duties, and are subject to appropriate confidentiality
                  obligations. Should an employee of a Customer seek to exercise
                  their rights under EU Data Protection Laws (e.g., rights of
                  data access, rectification, erasure, restriction, portability
                  and objection) in respect of any Usage Data that constitutes
                  Personal Data then the Customer undertakes to inform
                  Morningful without delay and instruct their employee to
                  contact Morningful directly via Morningful.com/contact or such
                  other way as directed at the time.
                </p>

                <h4 className="text-base font-semibold text-ink mb-3">
                  Audits and Reviews of Compliance
                </h4>
                <p className="mb-4">
                  To the extent applicable Data Protection Laws include a right
                  for Customer to audit Morningful's Processing of Customer
                  Personal Data, Customer will exercise such audit right, and
                  Morningful will fulfill its corresponding obligations, as
                  follows:
                </p>
                <div className="mb-6 ml-4 space-y-4">
                  <p>
                    Morningful shall make available to Customer relevant
                    information regarding Morningful's Processing of Customer
                    Personal Data under this Addendum in the form of
                    Morningful's most recent ISO 27001, ISO 27017 or ISO 27018
                    certifications or similar audit reports ("
                    <strong>Third Party Reports</strong>").
                  </p>
                  <p>
                    Not more than once per calendar year and at Customer's
                    expense, Customer may audit Morningful's Processing of
                    Customer Personal Data for compliance with its obligations
                    under this Addendum by submitting reasonable requests for
                    information, including security and audit questionnaires.
                    Morningful will provide written responses to the extent the
                    requested information is necessary to confirm Morningful's
                    compliance with this Addendum. However, if the requested
                    information is addressed in a Third Party Report issued
                    within the 12-month period prior to Customer's request and
                    Morningful confirms there have been no material changes in
                    the interim relevant to Customer's request, Customer agrees
                    to accept such Third Party Report in lieu of a written
                    response. Any information provided by Morningful under this
                    Section 2.b. constitutes Morningful's Confidential
                    Information under the Agreement.
                  </p>
                  <p>
                    If a third party is to conduct an audit under this Section
                    2.b., Morningful may object to the auditor if the auditor
                    is, in Morningful's reasonable opinion, not independent, a
                    competitor of Morningful or otherwise unqualified. Such an
                    objection by Morningful will require Customer to appoint
                    another auditor or conduct the audit itself.
                  </p>
                  <p>
                    Customers will promptly notify Morningful of any
                    non-compliance discovered during the course of an audit and
                    provide Morningful any audit reports generated in connection
                    with any audit under this Section 2.b., unless prohibited by
                    EU Data Protection Law or otherwise instructed by a
                    supervisory authority. Customer may use the audit reports
                    only for the purposes of meeting Customer's regulatory audit
                    requirements and confirming that Morningful's Processing of
                    Customer Personal Data complies with this Addendum.
                  </p>
                  <p>
                    Customer shall reimburse Morningful for any time expended by
                    Morningful or its Subprocessors in connection with any
                    audits under this Section 2.b. at Morningful's then-current
                    professional services rates, which shall be made available
                    to Customer upon request. Customer will be responsible for
                    any fees charged by any auditor appointed by Customer to
                    execute any such audit. Nothing in this Addendum shall be
                    construed to require Morningful to furnish more information
                    about its Third Party Subprocessors in connection with such
                    audits than such Third Party Subprocessors make generally
                    available to their customers. Nothing in this Section 2.b.
                    shall require Morningful to breach any duties of
                    confidentiality.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  3. Impact Assessments and Consultations
                </h3>
                <p className="mb-6">
                  Morningful may (taking into account the nature of the
                  Processing and the information available to Morningful)
                  reasonably assist Customer in complying with Customer's
                  obligations under Articles 35 and 36 of the GDPR, by (a)
                  making available documentation describing relevant aspects of
                  Morningful's information security program and the security
                  measures applied in connection therewith; and (b) providing
                  the other information contained in the Agreement, including
                  this Addendum.
                </p>

                <h3 className="text-lg font-semibold text-ink mb-3">
                  4. Data Transfers
                </h3>

                <h4 className="text-base font-semibold text-ink mb-3">
                  Data Processing Facilities
                </h4>
                <p className="mb-6">
                  Morningful may, subject to Section 4.b., store and Process
                  Customer Personal Data in the United States or anywhere
                  Morningful or its Subprocessors maintain facilities. Subject
                  to Morningful's obligations in this Section 4, Customer is
                  responsible for ensuring that its use of the Platform complies
                  with any cross-border data transfer restrictions of EU Data
                  Protection Law.
                </p>

                <h4 className="text-base font-semibold text-ink mb-3">
                  Privacy Shield
                </h4>
                <p className="mb-6">
                  To the extent that Morningful Processes any Customer Personal
                  Data of individuals in the EU or Switzerland in the United
                  States, then Morningful shall protect such Customer Personal
                  Data in accordance with the Privacy Shield Principles and
                  Supplemental Principles of the EU-U.S. and Swiss Privacy
                  Shield Frameworks ("<strong>Privacy Shield</strong>"). If
                  Morningful is unable to comply with this requirement,
                  Morningful shall inform the Customer.
                </p>

                <h4 className="text-base font-semibold text-ink mb-3">
                  Standard Contractual Clauses
                </h4>
                <p className="mb-4">
                  If Customer is established in the EU and transfers Customer
                  Personal Data out of the EU to Morningful in a country not
                  deemed by the European Commission to have adequate data
                  protection, and the Privacy Shield ceases to be a basis by
                  which Customer may lawfully make such transfer to Morningful
                  under Chapter V of the GDPR, and no lawful alternative basis
                  for such transfer applies, such transfer will be governed by
                  the Standard Contractual Clauses, the terms of which are
                  hereby incorporated into this DPA. In furtherance of the
                  foregoing, the parties agree that:
                </p>
                <div className="mb-6 ml-4 space-y-3">
                  <p>
                    for purposes of the Standard Contractual Clauses, (a)
                    Customer will act as the data exporter and (b) Morningful
                    will act as the data importer;
                  </p>
                  <p>
                    for purposes of Appendix 1 to the Standard Contractual
                    Clauses, the Data Subjects, categories of data, and the
                    processing operations shall be as set out in Section 1.b. to
                    this Annex A;
                  </p>
                  <p>
                    for purposes of Appendix 2 to the Standard Contractual
                    Clauses, the technical and organizational measures shall be
                    the Security Measures;
                  </p>
                  <p>
                    upon data exporter's request under the Standard Contractual
                    Clauses, data importer will provide the copies of the
                    Subprocessor agreements that must be sent by the data
                    importer to the data exporter pursuant to Clause 5(j) of the
                    Standard Contractual Clauses, and data importer may remove
                    or redact all commercial information or clauses unrelated to
                    the Standard Contractual Clauses or their equivalent
                    beforehand;
                  </p>
                  <p>
                    the audits described in Clause 5(f) and Clause 12(2) of the
                    Standard Contractual Clauses shall be performed in
                    accordance with Section 2.b. of this Annex A;
                  </p>
                  <p>
                    Customer's authorizations in Section 6 of this Addendum
                    (Subprocessing) will constitute Customer's prior written
                    consent to the subcontracting by Morningful of the
                    Processing of Customer Personal Data if such consent is
                    required under Clause 5(h) of the Standard Contractual
                    Clauses;
                  </p>
                  <p>
                    certification of deletion of Customer Personal Data as
                    described in Clause 12(1) of the Standard Contractual
                    Clauses shall be provided only upon Customer's request; and
                  </p>
                  <p>
                    the Standard Contractual Clauses shall automatically
                    terminate once the Customer Personal Data transfer governed
                    thereby becomes lawful under Chapter V of the GDPR in the
                    absence of such Standard Contractual Clauses on any other
                    basis.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TermsOfServiceModal;
