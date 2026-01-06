import { Helmet } from "react-helmet-async";

const TermsOfUsePage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Use | Teksoft Community</title>
        <meta
          name="description"
          content="Terms of Use governing access to and use of the Teksoft Community website, platform, services, and content."
        />
      </Helmet>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>

        <p className="text-gray-600 mb-6">
          Last updated: January 2026
        </p>

        <p className="mb-8 text-gray-700">
          Welcome to <strong>Teksoft Community</strong>. By accessing or using
          this website, platform, or any related services (collectively, the
          “Service”), you agree to be bound by these Terms of Use. If you do not
          agree to these terms, please do not use the Service.
        </p>

        {/* 1 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          1. Ownership & Intellectual Property
        </h2>
        <p className="text-gray-700 mb-4">
          All content, source code, designs, graphics, logos, text, software,
          and materials available on Teksoft Community are the exclusive
          property of Teksoft Community and are protected by copyright,
          trademark, and intellectual property laws.
        </p>
        <p className="text-gray-700 mb-4">
          You may not copy, reproduce, modify, distribute, publish, transmit,
          sell, license, or exploit any part of the Service without prior
          written permission from Teksoft Community.
        </p>

        {/* 2 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          2. Permitted Use
        </h2>
        <p className="text-gray-700 mb-4">
          You are granted a limited, non-exclusive, non-transferable right to
          access and use the Service for personal, educational, and internal
          purposes only.
        </p>

        <p className="text-gray-700 mb-4">
          Any commercial use, resale, redistribution, or derivative work is
          strictly prohibited unless expressly authorized by Teksoft Community.
        </p>

        {/* 3 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          3. User Accounts
        </h2>
        <p className="text-gray-700 mb-4">
          When creating an account, you agree to provide accurate and complete
          information and to keep your login credentials secure. You are solely
          responsible for all activities that occur under your account.
        </p>

        <p className="text-gray-700 mb-4">
          Teksoft Community reserves the right to suspend or terminate accounts
          that violate these Terms or engage in unauthorized or harmful
          activities.
        </p>

        {/* 4 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          4. Prohibited Activities
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Copying or scraping site content or source code</li>
          <li>Reverse engineering or attempting to bypass security</li>
          <li>Uploading malicious code or harmful content</li>
          <li>Impersonating Teksoft Community or its representatives</li>
          <li>Using the Service for unlawful or fraudulent purposes</li>
        </ul>

        {/* 5 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          5. Termination
        </h2>
        <p className="text-gray-700 mb-4">
          Teksoft Community may suspend or terminate your access to the Service
          at any time, without notice, if you violate these Terms or applicable
          laws.
        </p>

        {/* 6 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          6. Disclaimer of Warranties
        </h2>
        <p className="text-gray-700 mb-4">
          The Service is provided “as is” and “as available” without warranties
          of any kind, whether express or implied. Teksoft Community does not
          guarantee uninterrupted, error-free, or secure access to the
          platform.
        </p>

        {/* 7 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          7. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-4">
          To the fullest extent permitted by law, Teksoft Community shall not be
          liable for any indirect, incidental, consequential, or punitive
          damages arising from your use of the Service.
        </p>

        {/* 8 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          8. Changes to These Terms
        </h2>
        <p className="text-gray-700 mb-4">
          Teksoft Community reserves the right to modify these Terms at any
          time. Continued use of the Service after changes constitutes
          acceptance of the updated Terms.
        </p>

        {/* 9 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          9. Governing Law
        </h2>
        <p className="text-gray-700 mb-4">
          These Terms shall be governed by and construed in accordance with
          applicable laws, without regard to conflict of law principles.
        </p>

        {/* 10 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          10. Contact Information
        </h2>
        <p className="text-gray-700 mb-4">
          For questions regarding these Terms, please contact:
        </p>
        <p className="text-gray-700 font-medium">
          Email: contact@teksoftcommunity.com
        </p>
      </section>
    </>
  );
};

export default TermsOfUsePage;
