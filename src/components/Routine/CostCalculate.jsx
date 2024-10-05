import React, { useState } from "react";

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
            className="border p-1 m-2 w-20 rounded-lg bg-transparent text-black border-rose-400"
          />
        </span>

        <span className="lg:w-1/2 md:w-1/2 sm:w-full">
          <label htmlFor="tuitionFeePerCredit">Tuition Fee per Credit:</label>
          <input
            type="number"
            id="tuitionFeePerCredit"
            value={tuitionFeePerCredit}
            onChange={(e) => setTuitionFeePerCredit(Number(e.target.value))}
            className="border p-1 m-2 w-20 rounded-lg bg-transparent text-black border-rose-400"
          />
        </span>
        <span className="lg:w-1/2 md:w-1/2 sm:w-full">
          <label htmlFor="waiverPercentage">Waiver Percentage:</label>
          <input
            type="number"
            id="waiverPercentage"
            value={waiverPercentage}
            onChange={(e) => setWaiverPercentage(Number(e.target.value))}
            className="border p-1 m-2 w-20 rounded-lg bg-transparent text-[#000000] border-rose-400"
          />
        </span>
        <span className="lg:w-1/2 md:w-1/2 sm:w-full">
          <label htmlFor="semesterFee">Semester Fee:</label>
          <input
            type="number"
            id="semesterFee"
            value={semesterFee}
            onChange={(e) => setSemesterFee(Number(e.target.value))}
            className="border p-1 m-2 w-20 rounded-lg bg-transparent text-black border-rose-400"
          />
        </span>

        <span className="w-full">
          <label htmlFor="additionalCost">Additional Cost (Optional):</label>
          <input
            type="number"
            id="additionalCost"
            value={additionalCost}
            onChange={(e) => setAdditionalCost(Number(e.target.value))}
            className="border p-1 m-2 w-20 rounded-lg bg-transparent text-black border-rose-400"
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
    </div>
  );
}

export default CostCalculate;
