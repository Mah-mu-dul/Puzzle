import React from "react";
import img1 from "./stick calculator 1.png";
import img2 from "./stick calculator 2.png";
import { Link } from "react-router-dom";
const StickCalculator = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-10">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">
        Stick Length Calculator
      </h1>
      <p className="text-gray-800 mb-4">
        The Stick Length Calculator is an essential tool for optimizing material
        usage in various projects. By inputting the lengths of the parts you
        need to cut and the total length of the stick, the calculator
        efficiently determines the minimum number of sticks required while
        minimizing waste.
      </p>

      <h2 className="text-2xl font-semibold text-teal-500 mb-2">
        How It Works
      </h2>
      <p className="text-gray-800 mb-4">
        Users can input the lengths of the parts and the stick length. The
        calculator will then provide a summary of the total used and wasted
        material, along with the minimum number of sticks needed. This tool is
        particularly useful for professionals and DIY enthusiasts alike.
      </p>
      <Link to="/stickCalculator" className="flex justify-center mb-4">
        <img
          src={img2}
          alt="Input section of the Stick Length Calculator"
          className=" w-full md:max-w-[70%] lg:max-w-[60%] h-auto rounded-lg shadow-md"
        />
      </Link>
      <p className="text-gray-800 mb-4">
        For instance, if a user inputs various part lengths along with a stick
        length of 100 units, the calculator will determine the minimum number of
        sticks required, the total length used, and the amount wasted.
      </p>

      <h2 className="text-2xl font-semibold text-teal-500 mb-2">
        Cutting Breakdown
      </h2>
      <p className="text-gray-800 mb-4">
        The calculator also provides a detailed cutting breakdown, illustrating
        how each stick is utilized. This feature allows users to visualize the
        cutting plan and understand the remaining material after each cut.
      </p>
      <Link to="/stickCalculator" className="flex justify-center mb-4">
        <img
          src={img1}
          alt="Cutting breakdown of the Stick Length Calculator"
          className=" w-full md:max-w-[70%] lg:max-w-[60%] h-auto rounded-lg shadow-md"
        />
      </Link>
      <p className="text-gray-800 mb-4">
        The cutting breakdown displays the parts allocated to each stick, along
        with the remaining lengths, which is crucial for effective planning and
        material management.
      </p>

      <h2 className="text-2xl font-semibold text-teal-500 mb-2">
        Downloadable Reports
      </h2>
      <p className="text-gray-800 mb-4">
        After calculating the cutting breakdown, users can download a PDF report
        of the results, making it easy to share with team members or keep for
        future reference.
      </p>

      <h2 className="text-2xl font-semibold text-teal-500 mb-2">Use Cases</h2>
      <p className="text-gray-800 mb-4">
        The Stick Length Calculator is an invaluable tool for anyone involved in
        cutting materials, whether for professional or personal projects. Here
        are some highlighted use cases:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li className="text-gray-800 mb-2">
          <strong>Carpentry and Woodworking:</strong> Optimize wood usage for
          furniture making, cabinetry, and other woodworking projects.
        </li>
        <li className="text-gray-800 mb-2">
          <strong>Construction and Building:</strong> Calculate the minimum
          number of sticks needed for framing, roofing, and other construction
          projects.
        </li>
        <li className="text-gray-800 mb-2">
          <strong>DIY and Home Improvement:</strong> Plan and execute DIY
          projects efficiently, minimizing waste and saving materials.
        </li>
        <li className="text-gray-800 mb-2">
          <strong>Manufacturing and Production:</strong> Streamline production
          processes by optimizing material usage and reducing waste.
        </li>
      </ul>

      <p className="text-gray-800 mb-4">
        Start optimizing your material usage today!
      </p>

      <h2 className="text-2xl font-semibold text-teal-500 mb-2">
        Algorithm Explanation
      </h2>
      <p className="text-gray-800 mb-4">
        The Stick Length Calculator employs a bin packing algorithm to
        efficiently allocate part lengths into the minimum number of sticks.
        Here’s how it works:
      </p>
      <div className="mockup-code">
        <pre>
          <code>
            {`function binPacking(weights, stickLength) {
      let bins = []; // Array to hold the bins

      // Make a copy of weights and sort it in descending order for better packing
      const sortedWeights = [...weights].sort((a, b) => b - a);

      for (let weight of sortedWeights) {
          let placed = false;

          // Try to place the weight in an existing bin
          for (let bin of bins) {
              if (bin.remaining >= weight) {
                  bin.parts.push(weight);
                  bin.remaining -= weight;
                  placed = true;
                  break;
              }
          }

          // If the weight couldn't be placed, create a new bin
          if (!placed) {
              bins.push({ parts: [weight], remaining: stickLength - weight });
          }
      }

      // Output the breakdown
      const sticks = bins.map((bin) => bin.parts);

      setCutBreakdown(sticks);
      setResult(
          <>
              Minimum sticks needed:{" "}
              <span className="text-rose-600 text-xl ">
                  {bins.length} {bins.length > 1 ? "units" : "unit"}
              </span>
          </>
      );
  }`}
          </code>
        </pre>
      </div>
      <p className="text-gray-800 mb-4">
        The algorithm initiates by arranging the part lengths in descending
        order, thereby facilitating a more efficient packing process.
        Subsequently, it endeavors to allocate each part into existing sticks,
        ensuring optimal utilization of the material. In the event that a part
        cannot be accommodated within an existing stick, a new stick is
        generated. This approach guarantees that the material usage is
        optimized, rendering it an indispensable tool for individuals engaged in
        material cutting activities.
      </p>

      <h2 className="text-2xl font-semibold text-teal-500 mb-2">
        Useful Links
      </h2>
      <p className="text-gray-800 mb-4">
        For more information, check out our{" "}
        <Link to="/about" className="text-teal-600 underline">
          About Page
        </Link>{" "}
        or visit our{" "}
        <Link to="/docs" className="text-teal-600 underline">
          Documentation
        </Link>{" "}
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
        <Link
          to="/stickCalculator"
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Interactive Calculator
        </Link>
      </div>
    </div>
  );
};

export default StickCalculator;
