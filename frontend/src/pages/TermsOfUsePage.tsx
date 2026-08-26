import { Helmet } from "react-helmet-async";

const TermsOfUsePage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Use | Teksoft Community</title>
        <meta
          name="description"
          content="Read the Terms of Use governing access to and use of Teksoft Community."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Terms <span className="text-yellow-400">of Use</span>
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
              Welcome to <span className="text-white font-semibold">Teksoft Community</span>.
              By accessing or using this website, platform, or any related services
              (collectively, the "Service"), you agree to be bound by these Terms of Use.
              If you do not agree, please do not use the Service. These terms constitute
              a legally binding agreement between you and Teksoft Community.
            </p>

            {/* Section 1 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                1. Ownership & Intellectual Property
              </h2>
              <p>
                All content, source code, designs, graphics, logos, text, software,
                and materials available on Teksoft Community are the exclusive property
                of Teksoft Community and are protected by copyright, trademark,
                and intellectual property laws.
              </p>
              <p className="mt-2">
                You may not copy, reproduce, modify, distribute, publish, transmit,
                sell, license, or exploit any part of the Service without prior written
                permission from Teksoft Community.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                2. Permitted Use
              </h2>
              <p className="mb-2">
                Subject to these Terms, you are granted a limited, non-exclusive,
                non-transferable license to use the Service for:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Personal and educational use</li>
                <li>Internal and non-commercial purposes</li>
                <li>Participation in community discussions and events</li>
                <li>Accessing educational resources and tutorials</li>
                <li>Networking with other community members</li>
              </ul>
              <p className="mt-2">
                Any commercial use, resale, redistribution, or derivative work
                is strictly prohibited unless expressly authorized.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                3. User Accounts
              </h2>
              <p className="mb-2">
                When you create an account with us, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your password and account</li>
                <li>Promptly notify us of any unauthorized account access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
              <p className="mt-2">
                Teksoft Community reserves the right to suspend or terminate accounts
                that violate these Terms or engage in harmful behavior.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                4. User-Generated Content
              </h2>
              <p className="mb-2">
                By submitting content to our platform, you:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Grant us a worldwide, royalty-free license to use, display, and distribute your content</li>
                <li>Represent that you own or have rights to share the content</li>
                <li>Agree that your content does not infringe on third-party rights</li>
                <li>Acknowledge that we may remove content that violates our policies</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                5. Prohibited Activities
              </h2>
              <p className="mb-2">
                You agree not to engage in:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Unauthorized access, data scraping, or automated data collection</li>
                <li>Uploading malicious code, viruses, or harmful content</li>
                <li>Impersonation, misrepresentation, or fraudulent activities</li>
                <li>Harassment, bullying, or abusive behavior toward other users</li>
                <li>Spamming or unsolicited commercial communications</li>
                <li>Violation of applicable laws, regulations, or third-party rights</li>
                <li>Circumventing security measures or access controls</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                6. Third-Party Services
              </h2>
              <p>
                Our Service may contain links to third-party websites or integrate
                with third-party services. We are not responsible for the content,
                privacy practices, or terms of these external services. Your use of
                third-party services is at your own risk and subject to their terms.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                7. Disclaimer of Warranties
              </h2>
              <p>
                The Service is provided on an "as is" and "as available" basis
                without warranties of any kind, either express or implied.
                Teksoft Community makes no warranties regarding reliability,
                availability, accuracy, or fitness for a particular purpose.
                We do not guarantee uninterrupted or error-free service.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                8. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Teksoft Community shall not be
                liable for any indirect, incidental, special, consequential, or punitive
                damages arising from your use of the Service. Our total liability
                shall not exceed the amount paid by you, if any, in the twelve months
                preceding the claim.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                9. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless Teksoft Community, its
                affiliates, officers, directors, and employees from any claims,
                damages, losses, or expenses arising from your use of the Service,
                violation of these Terms, or infringement of third-party rights.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                10. Termination
              </h2>
              <p>
                We may terminate or suspend your access to the Service immediately,
                without prior notice, for conduct that we believe violates these Terms
                or is harmful to other users, us, or third parties. Upon termination,
                your right to use the Service will cease immediately.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                11. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with
                the laws of the jurisdiction in which Teksoft Community operates,
                without regard to conflict of law principles. Any disputes shall be
                resolved through binding arbitration or in the courts of that jurisdiction.
              </p>
            </div>

            {/* Section 12 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                12. Changes to These Terms
              </h2>
              <p>
                We may update these Terms of Use at any time. Changes will be
                effective when posted on this page with an updated revision date.
                Continued use of the Service after changes are posted constitutes
                acceptance of the revised terms. We encourage you to review these
                Terms periodically.
              </p>
            </div>

            {/* Section 13 */}
            <div>
              <h2 className="text-lg font-bold text-white mb-3">
                13. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms of Use, please contact us at{" "}
                <span className="text-yellow-400 font-medium">
                  legal@teksoft.co.ke
                </span>. We will respond to your inquiry within a reasonable timeframe.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfUsePage;
