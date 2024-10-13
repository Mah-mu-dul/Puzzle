import React, { useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import {
  Calculator,
  Calendar,
  GamepadIcon,
  Grid3X3,
  Youtube,
  QrCode,
  Brain,
  School,
  MessageSquare,
  Wallet,
  Layout,
  GraduationCap,
} from "lucide-react";
function CostCalculate() {
  const [totalCredit, setTotalCredit] = useState(0);
  const [tuitionFeePerCredit, setTuitionFeePerCredit] = useState(6000);
  const [semesterFee, setSemesterFee] = useState(7000);
  const [additionalCost, setAdditionalCost] = useState(0);
  const [waiverPercentage, setWaiverPercentage] = useState(0);

  const calculateCost = () => {
    const totalCost =
      totalCredit * tuitionFeePerCredit * ((100 - waiverPercentage) / 100) +
      additionalCost +
      semesterFee;
    return totalCost;
  };

  return (
    <div className="">
      <h2 className="text-center text-xl mt-10 text-rose-600">
        Course Cost Calculator
      </h2>

      <div className="lg:w-1/2 md:w-3/4 sm:w-full mx-auto flex flex-wrap justify-between">
        <span className="lg:w-1/2 md:w-1/2 sm:w-full">
          <label htmlFor="totalCredit">Total Credit:</label>
          <input
            type="number"
            id="totalCredit"
            value={totalCredit}
            onChange={(e) => setTotalCredit(Number(e.target.value))}
            className="border p-1 m-2 w-20 rounded-lg bg-transparent text-black border-gray-400"
          />
        </span>

        <span className="lg:w-1/2 md:w-1/2 sm:w-full">
          <label htmlFor="tuitionFeePerCredit">Tuition Fee per Credit:</label>
          <input
            type="number"
            id="tuitionFeePerCredit"
            value={tuitionFeePerCredit}
            onChange={(e) => setTuitionFeePerCredit(Number(e.target.value))}
            className="border p-1 m-2 w-20 rounded-lg bg-transparent text-black border-gray-400"
          />
        </span>
        <span className="lg:w-1/2 md:w-1/2 sm:w-full">
          <label htmlFor="waiverPercentage">Waiver Percentage:</label>
          <input
            type="number"
            id="waiverPercentage"
            value={waiverPercentage}
            onChange={(e) => setWaiverPercentage(Number(e.target.value))}
            className="border p-1 m-2 w-20 rounded-lg bg-transparent text-[#000000] border-gray-400"
          />
        </span>
        <span className="lg:w-1/2 md:w-1/2 sm:w-full">
          <label htmlFor="semesterFee">Semester Fee:</label>
          <input
            type="number"
            id="semesterFee"
            value={semesterFee}
            onChange={(e) => setSemesterFee(Number(e.target.value))}
            className="border p-1 m-2 w-20 rounded-lg bg-transparent text-black border-gray-400"
          />
        </span>

        <span className="w-full">
          <label htmlFor="additionalCost">Additional Cost (Optional):</label>
          <input
            type="number"
            id="additionalCost"
            value={additionalCost}
            onChange={(e) => setAdditionalCost(Number(e.target.value))}
            className="border p-1 m-2 w-20 rounded-lg bg-transparent text-black border-gray-400"
          />
        </span>
      </div>
      <h3 className="text-center text-xl mt-5">
        Total Cost:{" "}
        <span className="font-bold text-rose-600">{calculateCost()} tk.</span>
      </h3>

      <h3 className="text-center ">approx per installment</h3>
      <h3 className="text-center ">
        <span className="font-bold text-rose-600">
          {Math.round(calculateCost() / 3)} tk.
        </span>
      </h3>
      <div className="max-w-4xl mx-auto px-4 mb-20 google_adscene">
        <div className="w-full h-[50px] rounded-lg flex items-center justify-center"></div>
      </div>
      <div className="max-w-7xl mx-auto z-0">
        <h2 className="text-2xl text-center font-semibold text-gray-900 mb-4">
          Explore More Tools
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="w-full lg:w-1/5  md:w-1/3 sm:w-full">
            <Link to="/calculate-cg">
              <div className="p-4 rounded-xl h-full bg-green-50 hover:bg-green-100 transition-all duration-300 transform hover:scale-105">
                <div className="text-green-600 mb-2">
                  <Calculator className="w-4 h-4" />
                </div>
                <h3 className="text-md font-semibold text-gray-900 mb-1">
                  CGPA Calculator
                </h3>
                <p className="text-gray-600">
                  Calculate your academic performance
                </p>
              </div>
            </Link>
          </div>
          <div className="w-full lg:w-1/5  md:w-1/3 sm:w-full">
            <Link to="/cost-calculator">
              <div className="p-4 rounded-xl h-full bg-rose-50 hover:bg-rose-100 transition-all duration-300 transform hover:scale-105">
                <div className="text-rose-600 mb-2">
                  <Calculator className="w-4 h-4" />
                </div>
                <h3 className="text-md font-semibold text-gray-900 mb-1">
                  Cost Calculator
                </h3>
                <p className="text-gray-600">Calculate your credit cost</p>
              </div>
            </Link>
          </div>
          <div className="w-full lg:w-1/5  md:w-1/3 sm:w-full">
            <Link to="/money-management">
              <div className="p-4 rounded-xl h-full bg-cyan-50 hover:bg-cyan-100 transition-all duration-300 transform hover:scale-105">
                <div className="text-cyan-600 mb-2">
                  <Wallet className="w-4 h-4" />
                </div>
                <h3 className="text-md font-semibold text-gray-900 mb-1">
                  Money Manager
                </h3>
                <p className="text-gray-600">Track your expenses</p>
              </div>
            </Link>
          </div>
          <div className="w-full lg:w-1/5  md:w-1/3 sm:w-full">
            <Link to="/retake-assistant">
              <div className="p-4 rounded-xl h-full bg-purple-50 hover:bg-purple-100 transition-all duration-300 transform hover:scale-105">
                <div className="text-purple-600 mb-2">
                  <Brain className="w-4 h-4" />
                </div>
                <h3 className="text-md font-semibold text-gray-900 mb-1">
                  Retake Assistant
                </h3>
                <p className="text-gray-600">Plan your retakes strategically</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 mb-20 google_adscene">
        <div className="w-full h-[50px] rounded-lg flex items-center justify-center"></div>
      </div>
    </div>
  );
}

export default CostCalculate;
