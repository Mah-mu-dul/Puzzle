import React, { useState, useEffect } from "react";

const AluminumProfileLengthCalculator = () => {
  const [partLengths, setPartLengths] = useState([]);
  const [currentPartLength, setCurrentPartLength] = useState("");
  const [stickLength, setStickLength] = useState(100);
  const [result, setResult] = useState("");
  const [cutBreakdown, setCutBreakdown] = useState([]);

  useEffect(() => {
    cutSticks(partLengths, stickLength);
  }, [partLengths, stickLength]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && currentPartLength) {
      setPartLengths([...partLengths, Number(currentPartLength)]);
      setCurrentPartLength("");
    }
  };

  const handleRemovePart = (index) => {
    setPartLengths(partLengths.filter((_, i) => i !== index));
  };

  //   new one
  function cutSticks(ps, stickLength) {
    let parts = [...ps];

    // Sort the parts in descending order (greedy approach)
    parts.sort((a, b) => b - a);

    // Array to store the breakdown of cuts for each stick
    let sticks = [];

    // While there are parts left to place
    while (parts.length > 0) {
      let currentStick = [];
      let remainingLength = stickLength;

      // Try to fit as many parts as possible into the current stick
      for (let i = 0; i < parts.length; i++) {
        if (parts[i] <= remainingLength) {
          currentStick.push(parts[i]);
          remainingLength -= parts[i];
          // Remove the part from the list
          parts.splice(i, 1);
          i--; // Adjust index after removing the part
        }
      }

      // Add the current stick's breakdown to the list of sticks
      sticks.push(currentStick);
    }

    // Output the breakdown
    setCutBreakdown(sticks);

    // set the total number of sticks used
    setResult(`Minimum number of sticks needed: ${sticks.length}`);
  }

  

  const totalUsed = partLengths.reduce((sum, length) => sum + length, 0);
  const totalWaste = stickLength * cutBreakdown.length - totalUsed;

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Aluminum Profile Length Calculator
      </h2>
      <p className="mb-4 text-gray-700 text-center">
        This calculator determines the minimum number of aluminum profile sticks
        needed for your project, optimizing material usage.
      </p>
      <div className="p-4 bg-gray-100 flex flex-col md:flex-row gap-10 rounded-lg shadow-md">
        <div className="mb-4 w-full md:w-1/2 border-2 border-rose-400 rounded p-5">
          <div className="flex gap-10">
            <div>
              <label className="block mb-2 font-semibold">
                Enter part length:
              </label>
              <input
                type="number"
                value={currentPartLength}
                onChange={(e) => setCurrentPartLength(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent w-32 rounded border-2 border-rose-400 px-2 py-1"
                placeholder="e.g., 10"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                Enter stick length:
              </label>
              <input
                type="number"
                value={stickLength}
                onChange={(e) => setStickLength(Number(e.target.value))}
                className="bg-transparent rounded border-2 border-rose-400 w-32 px-2 py-1"
                placeholder="e.g., 100"
              />
            </div>
          </div>
          <div className="my-4">
            <div className="flex flex-wrap gap-2">
              {partLengths.map((length, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-700 px-2 py-1 rounded flex items-center"
                >
                  <span>{length}</span>
                  <button
                    onClick={() => handleRemovePart(index)}
                    className="ml-2 text-rose-600 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          {result && <p className="mt-4 font-semibold">{result}</p>}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Summary:</h3>
            <p>
              Total Used:{" "}
              <span className="text-rose-600">{totalUsed} units</span>
            </p>
            <p>
              Total Waste:{" "}
              <span className="text-rose-600">{totalWaste} units</span>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="font-semibold mb-2">Cutting Breakdown:</h3>
          <ul className="space-y-4">
            {cutBreakdown.map((stick, stickIndex) => (
              <li key={stickIndex} className="border-l-4 border-blue-500 pl-4">
                <div className="text-left">
                  <strong>Stick {stickIndex + 1}:</strong>
                  <ul className="list-disc list-inside">
                    {stick.map((part, partIndex) => (
                      <li key={partIndex}>{part} units</li>
                    ))}
                  </ul>
                  <span className="text-sm text-gray-600">
                    (Remaining: {stickLength - stick.reduce((a, b) => a + b, 0)}{" "}
                    units)
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AluminumProfileLengthCalculator;
