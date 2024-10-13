import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";
const StickLengthCalculator = () => {
  const [partLengths, setPartLengths] = useState([]);
  const [currentPartLength, setCurrentPartLength] = useState("");
  const [stickLength, setStickLength] = useState(100);
  const [result, setResult] = useState("");
  const [cutBreakdown, setCutBreakdown] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    binPacking(partLengths, stickLength);
  }, [partLengths, stickLength]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && currentPartLength) {
      const length = Number(currentPartLength);
      // Check for negative or zero input and ensure part length is not bigger than stick length
      if (length <= 0) {
        setWarningMessage("Part length must be a positive number.");
        return;
      } else if (length > stickLength) {
        setWarningMessage("Part length cannot exceed the stick length.");
        return;
      }
      setPartLengths([...partLengths, length]);
      setCurrentPartLength("");
      setWarningMessage("");
    }
  };

  const handleRemovePart = (index) => {
    setPartLengths(partLengths.filter((_, i) => i !== index));
  };

  const handleStickLengthChange = (e) => {
    const newStickLength = Number(e.target.value);
    // Check for negative or zero input and ensure no part length exceeds the stick length
    if (newStickLength <= 0) {
      setWarningMessage("Stick length must be a positive number.");
      return;
    } else if (partLengths.some((length) => length > newStickLength)) {
      setWarningMessage(
        "Stick length cannot be less than the maximum part length."
      );
    } else {
      setWarningMessage("");
    }
    setStickLength(newStickLength);
  };

  // New bin packing function
  function binPacking(weights, stickLength) {
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
        Minimum number of sticks needed:{" "}
        <span className="text-rose-600 text-xl ">{bins.length} units</span>
      </>
    );
  }

  const downloadCuttingBreakdown = () => {
    var element = document.getElementById("cuttingBreakdown");
    var opt = {
      margin: 1,
      filename: "Stick cutting breakdown.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    // Old monolithic-style usage:
    html2pdf(element, opt);
  };

  const totalUsed = partLengths.reduce((sum, length) => sum + length, 0);
  const totalWaste = stickLength * cutBreakdown.length - totalUsed;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-teal-600">
        Stick Length Calculator
      </h2>
      <p className="mb-4 text-gray-800 text-center">
        This calculator determines the minimum number of sticks needed for your
        project, optimizing material usage.
      </p>
      <div className="p-4 bg-blue-50 flex flex-col md:flex-row gap-10 rounded-lg shadow-md ">
        <div className="mb-4 w-full md:w-1/2 border-2 border-teal-500 rounded p-5">
          {warningMessage && (
            <p className="text-red-500 text-center mt-4">{warningMessage}</p>
          )}
          <div className="flex gap-10">
            <div>
              <label className="block mb-2 font-semibold text-teal-600">
                Enter part length:
              </label>
              <input
                type="number"
                value={currentPartLength}
                onChange={(e) => setCurrentPartLength(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent w-32 rounded border-2 border-teal-500 px-2 py-1"
                placeholder="e.g., 10"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-teal-600">
                Enter stick length:
              </label>
              <input
                type="number"
                value={stickLength}
                onChange={handleStickLengthChange}
                className="bg-transparent rounded border-2 border-teal-500 w-32 px-2 py-1"
                placeholder="e.g., 100"
              />
            </div>
          </div>
          <div className="my-4">
            <div className="flex flex-wrap gap-2">
              {partLengths.map((length, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-800 px-2 py-1 rounded flex items-center"
                >
                  <span>{length}</span>
                  <button
                    onClick={() => handleRemovePart(index)}
                    className="ml-2 text-teal-500 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          {result && <p className="mt-4 font-semibold">{result}</p>}
          <div className="mt-4">
            <h3 className="font-semibold mb-2 text-teal-600">Summary:</h3>
            <p>
              Total Used:{" "}
              <span className="text-teal-500">{totalUsed} units</span>
            </p>
            <p>
              Total Waste:{" "}
              <span className="text-teal-500">{totalWaste} units</span>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="" id="cuttingBreakdown">
            <h3 className="font-semibold mb-2 text-teal-600">
              Cutting Breakdown:
            </h3>
            <ul className="space-y-4 flex flex-wrap justify-between gap-5">
              {cutBreakdown.map((stick, stickIndex) => (
                <li
                  key={stickIndex}
                  className="border-l-4 w-40 h-fit border-teal-500 pl-4"
                >
                  <div className="text-left">
                    <strong>Stick {stickIndex + 1}:</strong>
                    <ul className="list-disc list-inside">
                      {stick.map((part, partIndex) => (
                        <li key={partIndex}>{part} units</li>
                      ))}
                    </ul>
                    <span className="text-sm text-gray-700">
                      (Remaining:{" "}
                      {stickLength - stick.reduce((a, b) => a + b, 0)} units)
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cutBreakdown.length > 0 && (
            <button
              onClick={downloadCuttingBreakdown}
              className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Download Cutting Breakdown
            </button>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 mb-20 google_adscene">
        <div className="w-full h-[70px] rounded-lg flex items-center justify-center"></div>
      </div>
    </div>
  );
};

export default StickLengthCalculator;
