import { Helmet } from "react-helmet-async";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Teksoft Community</title>
        <meta
          name="description"
          content="Privacy Policy describing how Teksoft Community collects, uses, and protects user data."
        />
      </Helmet>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <p className="text-gray-600 mb-6">
          Last updated: January 2026
        </p>

        <p className="text-gray-700 mb-8">
          Teksoft Community (“we”, “our”, or “us”) respects your privacy and is
          committed to protecting your personal information. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your
          information when you use our website and services.
        </p>

        {/* 1 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Personal information such as name, email address, and profile details</li>
          <li>Account authentication and login information</li>
          <li>Usage data, device information, and interaction logs</li>
        </ul>

        {/* 2 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 mb-4">
          We use your information to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Provide and maintain our services</li>
          <li>Authenticate users and manage accounts</li>
          <li>Improve platform functionality and user experience</li>
          <li>Communicate updates, announcements, and support responses</li>
        </ul>

        {/* 3 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          3. Data Sharing & Disclosure
        </h2>
        <p className="text-gray-700 mb-4">
          We do not sell or rent your personal data. Information may only be
          shared with trusted service providers or when required by law.
        </p>

        {/* 4 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          4. Data Security
        </h2>
        <p className="text-gray-700 mb-4">
          Teksoft Community implements reasonable technical and organizational
          measures to protect your data. However, no system is completely
          secure, and we cannot guarantee absolute security.
        </p>

        {/* 5 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          5. Cookies & Tracking
        </h2>
        <p className="text-gray-700 mb-4">
          We may use cookies and similar technologies to enhance functionality,
          analyze usage, and improve user experience. You may control cookies
          through your browser settings.
        </p>

        {/* 6 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          6. Your Rights
        </h2>
        <p className="text-gray-700 mb-4">
          Depending on your jurisdiction, you may have rights to access,
          correct, or delete your personal information. Requests can be made by
          contacting us directly.
        </p>

        {/* 7 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          7. Changes to This Policy
        </h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy from time to time. Continued use of
          the Service after updates constitutes acceptance of the revised
          policy.
        </p>

        {/* 8 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          8. Contact Us
        </h2>
        <p className="text-gray-700 mb-4">
          If you have questions or concerns about this Privacy Policy, contact:
        </p>
        <p className="font-medium text-gray-700">
          Email: contact@teksoftllc.jonzjohn.com
        </p>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
