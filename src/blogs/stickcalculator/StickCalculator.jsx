  import React from "react";
import img1 from "./stick calculator 1.png";
import img2 from "./stick calculator 2.png";
const StickCalculator = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-10">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">
        Stick Length Calculator
      </h1>
      <p className="text-gray-800 mb-4">
        The Stick Length Calculator is a powerful tool designed to optimize
        material usage in your projects. By inputting the lengths of the parts
        you need to cut and the length of the stick, the calculator determines
        the minimum number of sticks required while minimizing waste.
      </p>

      <h2 className="text-2xl font-semibold text-teal-500 mb-2">
        How It Works
      </h2>
      <p className="text-gray-800 mb-4">
        Users can enter part lengths and a stick length, as shown in the image
        below. The calculator will then provide a summary of the total used and
        wasted material, along with the minimum number of sticks needed.
      </p>
      <a href="/stickCalculator" className="flex justify-center mb-4">
        <img
          src={img2}
          alt="Input section of the Stick Length Calculator"
          className="max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] h-auto rounded-lg shadow-md"
        />
      </a>
      <p className="text-gray-800 mb-4">
        In this example, the user has entered various part lengths and a stick
        length of 100 units. The calculator determines that a minimum of 3
        sticks are needed, with a total of 250 units used and 50 units wasted.
      </p>

      <h2 className="text-2xl font-semibold text-teal-500 mb-2">
        Cutting Breakdown
      </h2>
      <p className="text-gray-800 mb-4">
        The calculator also provides a detailed cutting breakdown, showing how
        each stick is utilized. This feature allows users to visualize the
        cutting plan and understand the remaining material after each cut.
      </p>
      <a href="/stickCalculator" className="flex justify-center mb-4">
        <img
          src={img1}
          alt="Cutting breakdown of the Stick Length Calculator"
          className="max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] h-auto rounded-lg shadow-md"
        />
      </a>
      <p className="text-gray-800 mb-4">
        As illustrated, the cutting breakdown shows the parts allocated to each
        stick, along with the remaining lengths. This information is crucial for
        effective planning and material management.
      </p>

      <h2 className="text-2xl font-semibold text-teal-500 mb-2">
        Downloadable Reports
      </h2>
      <p className="text-gray-800 mb-4">
        After calculating the cutting breakdown, users can download a PDF report
        of the results, making it easy to share with team members or keep for
        future reference.
      </p>

      <h2 className="text-2xl font-semibold text-teal-500 mb-2">
        Use Cases
      </h2>
      <p className="text-gray-800 mb-4">
        The Stick Length Calculator is an essential tool for anyone involved in
        cutting materials, whether for professional or personal projects. Here are some highlighted use cases:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li className="text-gray-800 mb-2">
          <strong>Carpentry and Woodworking:</strong> Optimize wood usage for furniture making, cabinetry, and other woodworking projects.
        </li>
        <li className="text-gray-800 mb-2">
          <strong>Construction and Building:</strong> Calculate the minimum number of sticks needed for framing, roofing, and other construction projects.
        </li>
        <li className="text-gray-800 mb-2">
          <strong>DIY and Home Improvement:</strong> Plan and execute DIY projects efficiently, minimizing waste and saving materials.
        </li>
        <li className="text-gray-800 mb-2">
          <strong>Manufacturing and Production:</strong> Streamline production processes by optimizing material usage and reducing waste.
        </li>
      </ul>

      <p className="text-gray-800 mb-4">
        Start optimizing your material usage today!
      </p>

      <h2 className="text-2xl font-semibold text-teal-500 mb-2">
        Useful Links
      </h2>
      <p className="text-gray-800 mb-4">
        For more information, check out our{" "}
        <a href="/about" className="text-teal-600 underline">
          About Page
        </a>{" "}
        or visit our{" "}
        <a href="/docs" className="text-teal-600 underline">
          Documentation
        </a>{" "}
        section to explore other tools we offer.
      </p>

      <h2 className="text-2xl font-semibold text-teal-500 mb-2">Tags</h2>
      <p className="text-gray-800 mb-4">
        #Calculator #MaterialOptimization #CuttingTools #StickLengthCalculator
        #PDFReports
      </p>

      {/* Google Ad Section */}
      <div className="my-6">
        <div className="w-full h-[70px] rounded-lg flex items-center justify-center bg-gray-200">
          {/* Google Ad Placeholder */}
        </div>
      </div>

      <div className="mt-6">
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => (window.location.href = "/stick-calculator")}
        >
          Go to Interactive Calculator
        </button>
      </div>
    </div>
  );
};

export default StickCalculator;
