import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About IUB CGPA Calculator</h1>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p>
            The IUB CGPA Calculator is designed to help Independent University,
            Bangladesh (IUB) students easily calculate and track their academic
            performance. Our goal is to provide a user-friendly, accurate, and
            efficient tool that helps students make informed decisions about
            their academic journey.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Easy Input:</strong> Simple interface for entering course
              information, grades, and credits
            </li>
            <li>
              <strong>Transcript Analysis:</strong> Upload your transcript PDF
              for automatic data extraction
            </li>
            <li>
              <strong>Retake Calculation:</strong> Special handling for retake
              courses with proper CGPA impact
            </li>
            <li>
              <strong>Grade Management:</strong> Support for all IUB grades
              including I and Z grades
            </li>
            <li>
              <strong>Real-time Updates:</strong> Instant CGPA calculation as
              you input or modify data
            </li>
            <li>
              <strong>Privacy Focused:</strong> All calculations are done
              locally in your browser
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <div className="space-y-4">
            <p>
              Our calculator follows IUB's official grading system and
              calculation methods:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Supports all standard grades (A to F) with their corresponding
                grade points
              </li>
              <li>
                Handles special grades (I and Z) according to IUB policies
              </li>
              <li>Properly calculates retake courses' impact on CGPA</li>
              <li>Validates retake credits against earned credits</li>
              <li>Considers previous CGPA and credits in calculations</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Disclaimer</h2>
          <p className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            This calculator is not the official IUB calculator. While we strive
            for accuracy, the calculated CGPA may vary from the official
            transcript. Please use this tool as a guide and verify your results
            with official sources.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact & Support</h2>
          <p>
            For any questions, suggestions, or technical support, please contact
            us at{" "}
            <a
              href="mailto:work.mahmudulhasan@gmail.com"
              className="text-blue-600 hover:underline"
            >
              work.mahmudulhasan@gmail.com
            </a>{" "}
            or call us at{" "}
            <a
              href="tel:+8801571382855"
              className="text-blue-600 hover:underline"
            >
              +880 1571-382855
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Development</h2>
          <p>
            This calculator is developed and maintained by Mahmudul Hasan, with
            the aim of helping IUB students better understand and track their
            academic progress. We continuously work to improve the calculator's
            features and accuracy.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
