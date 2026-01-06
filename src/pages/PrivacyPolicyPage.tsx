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
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Privacy <span className="text-yellow-400">Policy</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-[#0b0f1a] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-12 text-gray-300 text-lg leading-relaxed">

            {/* Intro */}
            <p>
              Teksoft Community (“we”, “our”, or “us”) respects your privacy and
              is committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our website and services.
            </p>

            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Personal information such as name, email address, and profile
                  details
                </li>
                <li>Account authentication and login information</li>
                <li>Usage data, device information, and interaction logs</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Improve user experience and platform performance</li>
                <li>Communicate updates, events, and important notices</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. Sharing of Information
              </h2>
              <p>
                We do not sell your personal data. Information may be shared only
                with trusted service providers or when required by law.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal data from unauthorized access, loss, or
                misuse.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Your Rights
              </h2>
              <p>
                You have the right to access, update, or delete your personal
                information. You may also request clarification on how your data
                is processed.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated revision date.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <span className="text-yellow-400 font-medium">
                  support@teksoftllc.jonzjohn.com
                </span>
                .
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
