import { Helmet } from "react-helmet-async";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Teksoft Community</title>
        <meta
          name="description"
          content="Learn how Teksoft Community collects, uses, and protects your personal information."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Privacy <span className="text-yellow-400">Policy</span>
          </h1>
          <p className="text-gray-300 text-sm">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-[#0b0f1a] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8 text-gray-300 text-sm leading-relaxed">

            {/* Intro */}
            <p>
              Teksoft Community ("we", "our", or "us") respects your privacy and
              is committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our website and services. By using our
              platform, you consent to the data practices described in this policy.
            </p>

            {/* Section 1 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                1. Information We Collect
              </h2>
              <p className="mb-2">
                We collect various types of information to provide and improve our services:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Personal information such as name, email address, phone number, and profile details
                </li>
                <li>Account authentication and login credentials</li>
                <li>Usage data, device information, browser type, and interaction logs</li>
                <li>IP address, location data, and cookies for analytics purposes</li>
                <li>Payment information when processing transactions (handled securely by third-party processors)</li>
                <li>Communication preferences and marketing opt-in status</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                2. How We Use Your Information
              </h2>
              <p className="mb-2">
                Your information helps us deliver better services and personalized experiences:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Personalize user experience and content recommendations</li>
                <li>Process transactions and send related notifications</li>
                <li>Communicate updates, events, newsletters, and important notices</li>
                <li>Ensure platform security and prevent fraudulent activities</li>
                <li>Analyze usage patterns to enhance platform performance</li>
                <li>Respond to customer support inquiries and feedback</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                3. Sharing of Information
              </h2>
              <p className="mb-2">
                We do not sell your personal data. Information may be shared only:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>With trusted service providers who assist in operating our platform</li>
                <li>When required by law, legal process, or government request</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
                <li>With your explicit consent for specific purposes</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                4. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal data from unauthorized access, loss, or
                misuse. This includes encryption, secure servers, regular security
                audits, and access controls. However, no method of transmission
                over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                5. Cookies and Tracking Technologies
              </h2>
              <p className="mb-2">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Remember your preferences and settings</li>
                <li>Authenticate users and prevent fraud</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Deliver personalized content and advertisements</li>
              </ul>
              <p className="mt-2">
                You can manage cookie preferences through your browser settings.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                6. Data Retention
              </h2>
              <p>
                We retain your personal information only for as long as necessary
                to fulfill the purposes outlined in this policy, comply with legal
                obligations, resolve disputes, and enforce our agreements. When
                data is no longer needed, we securely delete or anonymize it.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                7. Your Rights
              </h2>
              <p className="mb-2">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access and obtain a copy of your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Data portability to transfer your data to another service</li>
                <li>Withdraw consent at any time for consent-based processing</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                8. Third-Party Links
              </h2>
              <p>
                Our platform may contain links to third-party websites or services.
                We are not responsible for the privacy practices of these external
                sites. We encourage you to review their privacy policies before
                providing any personal information.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                9. Children's Privacy
              </h2>
              <p>
                Our services are not intended for children under 13 years of age.
                We do not knowingly collect personal information from children.
                If we become aware that we have collected data from a child,
                we will take steps to delete it promptly.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated revision date.
                We encourage you to review this policy periodically to stay
                informed about how we protect your information.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                11. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or wish to
                exercise your rights, please contact us at{" "}
                <span className="text-yellow-400 font-medium">
                  support@teksoft.co.ke
                </span>. We will respond to your inquiry within a reasonable timeframe.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
