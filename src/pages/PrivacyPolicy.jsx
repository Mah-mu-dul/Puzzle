import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
          <p>
            This Privacy Policy explains how we collect, use, and protect your
            information when you use our CGPA Calculator application. We are
            committed to ensuring that your privacy is protected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Information We Collect
          </h2>
          <p>We collect the following information:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Academic information you input (courses, grades, credits)</li>
            <li>Transcript data (if you choose to upload it)</li>
            <li>Basic user information (name)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            How We Use Your Information
          </h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Calculate your CGPA</li>
            <li>Process and analyze your transcript (if uploaded)</li>
            <li>Improve our calculator's accuracy and functionality</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Data Storage and Security
          </h2>
          <p>
            All calculations are performed locally in your browser. We do not
            store your academic data on our servers. Your transcript data is
            processed locally and is not saved after you close the browser.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>PDF.js for transcript processing</li>
            <li>React Hot Toast for notifications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Access your data</li>
            <li>Delete your data (simply close the browser)</li>
            <li>Not provide any personal information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:work.mahmudulhasan@gmail.com"
              className="text-blue-600 hover:underline"
            >
              work.mahmudulhasan@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Updates to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. Any changes
            will be posted on this page. Last updated:{" "}
            {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
