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
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Terms <span className="text-yellow-400">of Use</span>
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
              Welcome to <span className="text-white font-semibold">Teksoft Community</span>.
              By accessing or using this website, platform, or any related services
              (collectively, the “Service”), you agree to be bound by these Terms of Use.
              If you do not agree, please do not use the Service.
            </p>

            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Ownership & Intellectual Property
              </h2>
              <p>
                All content, source code, designs, graphics, logos, text, software,
                and materials available on Teksoft Community are the exclusive property
                of Teksoft Community and are protected by copyright, trademark,
                and intellectual property laws.
              </p>
              <p className="mt-4">
                You may not copy, reproduce, modify, distribute, publish, transmit,
                sell, license, or exploit any part of the Service without prior written
                permission from Teksoft Community.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Permitted Use
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal and educational use</li>
                <li>Internal and non-commercial purposes</li>
                <li>Participation in community discussions and events</li>
              </ul>
              <p className="mt-4">
                Any commercial use, resale, redistribution, or derivative work
                is strictly prohibited unless expressly authorized.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. User Accounts
              </h2>
              <p>
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your account.
                Teksoft Community reserves the right to suspend or terminate accounts
                that violate these Terms.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Prohibited Activities
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unauthorized access or data scraping</li>
                <li>Uploading malicious or harmful content</li>
                <li>Impersonation or misrepresentation</li>
                <li>Violation of applicable laws or regulations</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Disclaimer of Warranties
              </h2>
              <p>
                The Service is provided on an “as is” and “as available” basis.
                Teksoft Community makes no warranties, express or implied, regarding
                reliability, availability, or accuracy.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Teksoft Community shall not be
                liable for any indirect, incidental, or consequential damages arising
                from your use of the Service.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Changes to These Terms
              </h2>
              <p>
                We may update these Terms of Use at any time. Continued use of the
                Service after changes are posted constitutes acceptance of the
                revised terms.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms of Use, contact us at{" "}
                <span className="text-yellow-400 font-medium">
                  legal@teksoftllc.jonzjohn.com
                </span>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfUsePage;
