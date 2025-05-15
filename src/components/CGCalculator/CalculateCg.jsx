import React, { useState, useEffect } from "react";

import { FiTrash } from "react-icons/fi";
import TranscriptAnalyzer from "../TranscriptAnalyzer/TranscriptAnalyzer2";

const initialRows = [
  { courseName: "", grade: "4.00", credits: "" },
  { courseName: "", grade: "4.00", credits: "" },
  { courseName: "", grade: "4.00", credits: "" },
];

const initialRetakeRows = [
  { courseName: "", previousGrade: "2.00", grade: "4.00", credits: "" },
  { courseName: "", previousGrade: "2.00", grade: "4.00", credits: "" },
];

const CalculateCg = () => {
  const [textColor, setTextColor] = useState("text-[#dc2626]");
  const [previousEarnedColor, setPreviousEarnedColor] = useState("#0f0");

  const [gradeOptions, setGradeOptions] = useState([
    { value: "4.00", label: "A	" },
    { value: "3.7", label: "A-" },
    { value: "3.3", label: "B+" },
    { value: "3.0", label: "B	" },
    { value: "2.7", label: "B-" },
    { value: "2.3", label: "C+" },
    { value: "2.0", label: "C	" },
    { value: "1.7", label: "C-" },
    { value: "1.3", label: "D+" },
    { value: "1", label: "D	" },
    { value: "0.0", label: "F" },
  ]);
  const [rows, setRows] = useState(initialRows);
  const [retakeRows, setRetakeRows] = useState(initialRetakeRows);

  const [previousCGPA, setPreviousCGPA] = useState("");
  const [previousEarnedCredit, setPreviousEarnedCredit] = useState("");

  const [uName, setUName] = useState("Independent University, Bangladesh");

  const [normalCourses, setNormalCourses] = useState([]);
  const [retakeCourses, setRetakeCourses] = useState([]);

  const [showTranscriptAnalyzer, setShowTranscriptAnalyzer] = useState(true);

  const [name, setName] = useState("");

  useEffect(() => {
    calculateTotalEarnedCredit();
    calculateCGPA();
  }, [previousCGPA, previousEarnedCredit, rows, retakeRows]);

  useEffect(() => {
    setRows(initialRows);
    setRetakeRows(initialRetakeRows);

    // console.log("Normal Courses:", normalCourses);
    // console.log("Retake Courses:", retakeCourses);

    // Set normal courses to rows
    if (normalCourses.length > 0) {
      const newRows = normalCourses.map((course) => ({
        courseName: course[0],
        grade: "4.00", // Default grade is A
        credits: parseInt(course[3], 10),
      }));
      setRows(newRows);
    }

    // Set retake courses to retakeRows
    if (retakeCourses.length > 0) {
      const iubGradingSystem = {
        A: "4.00",
        "A-": "3.7",
        "B+": "3.3",
        B: "3.0",
        "B-": "2.7",
        "C+": "2.3",
        C: "2.0",
        "C-": "1.7",
        "D+": "1.3",
        D: "1.0",
        F: "0.0",
      };

      const newRetakeRows = retakeCourses.map((course) => ({
        courseName: course[0],
        previousGrade: iubGradingSystem[course[3]] || course[3],
        grade: "4.00", // Default grade is A
        credits: parseInt(course[4], 10),
      }));
      setRetakeRows(newRetakeRows);
    }
  }, [normalCourses, retakeCourses]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };
  const handleRetakeInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...retakeRows];
    updatedRows[index][name] = value;
    setRetakeRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { courseName: "", grade: "4.00", credits: "" }]);
  };
  const addRetakeRow = () => {
    setRetakeRows([
      ...retakeRows,
      { courseName: "", previousGrade: "2.00", grade: "4.00", credits: "" },
    ]);
  };

  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const deleteRetakeRow = (index) => {
    const updatedRetakeRows = retakeRows.filter((_, i) => i !== index);
    setRetakeRows(updatedRetakeRows);
  };

  const calculateTotalEarnedCredit = () => {
    let totalCredits = 0;

    let totalRetakeCredits = 0;

    rows.forEach((row) => {
      const credits = parseFloat(row.credits);

      if (!isNaN(credits)) {
        totalCredits += credits;
      }
    });
    retakeRows.forEach((row) => {
      const credits = parseFloat(row.credits);

      if (previousEarnedCredit < totalRetakeCredits) {
        console.log("pre credit is smaller then retake");
      } else if (!isNaN(credits)) {
        totalRetakeCredits += credits;
      }
    });

    if (!isNaN(parseFloat(previousEarnedCredit))) {
      totalCredits += parseFloat(previousEarnedCredit);
    }

    return totalCredits;
  };
  const handleUniversity = (e) => {
    if (e.target.value === "iub") {
      setGradeOptions([
        { value: "4.00", label: "A" },
        { value: "3.7", label: "A-" },
        { value: "3.3", label: "B+" },
        { value: "3.0", label: "B   " },
        { value: "2.7", label: "B-" },
        { value: "2.3", label: "C+" },
        { value: "2.0", label: "C" },
        { value: "1.7", label: "C-" },
        { value: "1.3", label: "D+" },
        { value: "1.0", label: "D" },
        { value: "0.0", label: "F" },
      ]);
      setUName("Independent University, Bangladesh.");
      setTextColor("text-[#eb5013]");
      setShowTranscriptAnalyzer(true);
    } else if (e.target.value === "aiub") {
      setGradeOptions([
        { value: "4.00", label: "A+" },
        { value: "3.75", label: "A" },
        { value: "3.50", label: "B+" },
        { value: "3.25", label: "B" },
        { value: "3.00", label: "C+" },
        { value: "2.75", label: "C" },
        { value: "2.50", label: "D+" },
        { value: "2.25", label: "D" },
        { value: "0.00", label: "F" },
        { value: "0", label: "I" },
      ]);

      setUName("American International University - Bangladesh");
      setTextColor("text-[#004ea8]");
      setShowTranscriptAnalyzer(false);
    } else if (e.target.value === "uaar") {
      setGradeOptions([
        { value: "4.00", label: "A" },
        { value: "3.0", label: "B" },
        { value: "2.0", label: "C" },
        { value: "1.0", label: "D" },
        { value: "0.0", label: "F" },
      ]);
      setUName("Arid Agriculture University");
      setTextColor("text-[#0F1A50]");
      setShowTranscriptAnalyzer(false);
    } else if (e.target.value === "nsu") {
      setGradeOptions([
        { value: "4.00", label: "A" },
        { value: "3.7", label: "A-" },
        { value: "3.3", label: "B+" },
        { value: "3.0", label: "B   " },
        { value: "2.7", label: "B-" },
        { value: "2.3", label: "C+" },
        { value: "2.0", label: "C" },
        { value: "1.7", label: "C-" },
        { value: "1.3", label: "D+" },
        { value: "1.0", label: "D" },
        { value: "0.0", label: "F" },
      ]);
      setUName("North South University");
      setTextColor("text-[#0F1A50]");
      setShowTranscriptAnalyzer(false);
    } else if (e.target.value === "diu") {
      setGradeOptions([
        { value: "4.00", label: "A+" },
        { value: "3.75", label: "A" },
        { value: "3.50", label: "A-" },
        { value: "3.25", label: "B+" },
        { value: "3.00", label: "B" },
        { value: "2.75", label: "B-" },
        { value: "2.50", label: "C+" },
        { value: "2.25", label: "C" },
        { value: "2.00", label: "D" },
        { value: "0", label: "F" },
      ]);
      setUName("Daffodil International University");
      setTextColor("text-[#2E3094]");
      setShowTranscriptAnalyzer(false);
    } else if (e.target.value === "ewu") {
      setGradeOptions([
        { value: "4.00", label: "A+" },
        { value: "4.00", label: "A" },
        { value: "3.70", label: "A-" },
        { value: "3.3", label: "B+" },
        { value: "3.00", label: "B" },
        { value: "2.7", label: "B-" },
        { value: "2.3", label: "C+" },
        { value: "2.0", label: "C" },
        { value: "1.7", label: "C-" },
        { value: "1.3", label: "D+" },
        { value: "1", label: "D" },
        { value: "0", label: "F" },
      ]);
      setUName("East West University");
      setTextColor("text-[#192F59]");
      setShowTranscriptAnalyzer(false);
    } else if (e.target.value === "uiu") {
      setGradeOptions([
        { value: "4.00", label: "A" },
        { value: "3.67", label: "A-" },
        { value: "3.33", label: "B+" },
        { value: "3", label: "B" },
        { value: "2.67", label: "B-" },
        { value: "2.33", label: "C+" },
        { value: "2.0", label: "C" },
        { value: "1.67", label: "C-" },
        { value: "1.33", label: "D+" },
        { value: "1", label: "D" },
        { value: "0", label: "F" },
      ]);
      setUName("United International University");
      setTextColor("text-[#f68b1f]");
      setShowTranscriptAnalyzer(false);
    }
  };
  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    rows.forEach((row) => {
      const credits = parseFloat(row.credits);
      const grade = parseFloat(row.grade);

      if (!isNaN(credits) && !isNaN(grade)) {
        totalCredits += credits;
        totalGradePoints += credits * grade;
      }
    });
    retakeRows.forEach((row) => {
      const previousGrade = parseFloat(row.previousGrade); // Assuming previousGrade is the grade of the original attempt
      const retakeGrade = parseFloat(row.grade);
      const credits = parseFloat(row.credits);

      if (!isNaN(previousGrade) && !isNaN(retakeGrade) && !isNaN(credits)) {
        // Subtract previous attempt grade points and credits
        totalCredits -= credits;
        totalGradePoints -= previousGrade * credits;
        // Add retake course grade points and credits
        totalCredits += credits;
        totalGradePoints += retakeGrade * credits;
      }
    });

    if (!isNaN(parseFloat(previousEarnedCredit))) {
      totalCredits += parseFloat(previousEarnedCredit);
    }

    if (!isNaN(parseFloat(previousCGPA))) {
      totalGradePoints +=
        parseFloat(previousCGPA) * parseFloat(previousEarnedCredit);
    }

    if (totalCredits === 0) {
      return "0";
    }
    const cgpa = (totalGradePoints / totalCredits).toFixed(2);
    return cgpa;
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
    const storedPreviousCGPA = localStorage.getItem("previousCGPA");
    if (storedPreviousCGPA) {
      setPreviousCGPA(storedPreviousCGPA);
    }
    const storedPreviousEarnedCredit = localStorage.getItem(
      "previousEarnedCredit"
    );
    if (storedPreviousEarnedCredit) {
      setPreviousEarnedCredit(storedPreviousEarnedCredit);
    }
    const storedNormalCourses = JSON.parse(
      localStorage.getItem("normalCourses")
    );
    if (storedNormalCourses) {
      setNormalCourses(storedNormalCourses);
    }
    const storedRetakeCourses = JSON.parse(
      localStorage.getItem("retakeCourses")
    );
    if (storedRetakeCourses) {
      setRetakeCourses(storedRetakeCourses);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("previousCGPA", previousCGPA);
    localStorage.setItem("previousEarnedCredit", previousEarnedCredit);
    localStorage.setItem("normalCourses", JSON.stringify(normalCourses));
    localStorage.setItem("retakeCourses", JSON.stringify(retakeCourses));
  }, [name, previousCGPA, previousEarnedCredit, normalCourses, retakeCourses]);

  return (
    <div className="mx-2 max-w-full bg-[#eee]">
      <p
        className="text-gray-600 font-bold text-xs px-3 text-center w-fit mx-auto mb-10"
        id="label"
      >
        Disclaimer: This is not the official calculator. The CGPA calculated may
        vary from the official transcript. Use at your own risk.
      </p>
      <p className={`font-bold text-lg w-fit mx-auto mb-10 `} id="label">
        {uName}
      </p>
      <div className="w-fit max-w-full overflow-hidden lg:mx-auto md:mx-3 relative">
        <div className="flex justify-between items-center flex-wrap gap-5">
          <span>
            {name && (
              <strong>
                Hello <span className="text-green-700 text-xl">{name}</span>
              </strong>
            )}
            <br />
            <strong>
              CGPA:{" "}
              <span className="text-green-700 text-xl">{calculateCGPA()}</span>
            </strong>{" "}
            <br />
            <strong>
              Total Earned Credit:{" "}
              <span className="text-green-700 text-xl">
                {calculateTotalEarnedCredit()}
              </span>
            </strong>
          </span>
          {showTranscriptAnalyzer && (
            <TranscriptAnalyzer
              setNormalCourses={setNormalCourses}
              setRetakeCourses={setRetakeCourses}
              setName={setName}
              setPreviousCGPA={setPreviousCGPA}
              setPreviousEarnedCredit={setPreviousEarnedCredit}
            />
          )}
          <span>
            <select
              className="bg-white p-2 rounded border border-gray-200 focus:outline-none focus:border-green-500"
              name=""
              onChange={(e) => handleUniversity(e)}
              id=""
            >
              <option value="iub">IUB</option>
              <option value="aiub">AIUB</option>
              <option value="nsu">NSU</option>
              <option value="diu">DIU</option>
              <option value="ewu">EWU</option>
              <option value="uiu">UIU</option>
              <option value="uaar">UAAR</option>
            </select>
          </span>
        </div>

        <br />
        <div>
          <div>
            <label htmlFor="previousCGPA">Previous CGPA:</label>
            <input
              className="bg-white px-2 w-28 ml-2 rounded border border-gray-200 focus:outline-none focus:border-green-500"
              type="number"
              id="previousCGPA"
              min="0.00"
              max="4.00"
              step="0.01"
              placeholder={previousEarnedCredit ? "Mandatory" : "optional"}
              value={previousCGPA}
              onChange={(e) => setPreviousCGPA(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="previousEarnedCredit">
              Previous Earned Credit:
            </label>
            <input
              className="bg-white px-2 w-28 ml-2 my-1 rounded border border-gray-200 focus:outline-none focus:border-green-500"
              type="number"
              placeholder={previousCGPA ? "Mandatory" : "optional"}
              id="previousEarnedCredit"
              value={previousEarnedCredit}
              onChange={(e) => setPreviousEarnedCredit(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-x-10 flex-wrap">
          <div className="">
            <table>
              <thead>
                <tr>
                  <th className="text-sm">Course Name (optional)</th>
                  <th className="text-sm">No. of Credits</th>
                  <th className="text-sm">Grade</th>
                  <th className="text-sm">Delete</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        className="bg-white px-2 lg:w-48 sm:w-36 rounded border border-gray-200 focus:outline-none focus:border-green-500"
                        type="text"
                        placeholder="Course Name"
                        name="courseName"
                        value={row.courseName}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="bg-white rounded mx-5 border border-gray-200 focus:outline-none focus:border-green-500 w-20 px-2"
                        type="number"
                        placeholder="Credits"
                        name="credits"
                        value={row.credits}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <select
                        className="bg-white px-2 mr-2 lg:mr-5 rounded border border-gray-200 focus:outline-none focus:border-green-500"
                        name="grade"
                        value={row.grade}
                        onChange={(e) => handleInputChange(e, index)}
                      >
                        {gradeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="bg-white px-2 py-1 ml-2 hover:bg-red-100 border border-gray-200 rounded text-gray-600"
                        onClick={() => deleteRow(index)}
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="bg-white px-3 lg:mb-10 md:mb-10 py-1 mt-3 hover:bg-green-100 border border-gray-200 rounded"
              onClick={addRow}
            >
              Add Row
            </button>
          </div>
          <div className="mt-3">
            <p className="text-xl font-semibold lg:mt-[-30px] flex items-center">
              Retake Calculation
              <div
                className="tooltip"
                data-tip="Make sure total earned credit is greater then total retake credit."
              >
                <p className="px-[9px] w-fit ml-3 rounded-full border-black border">
                  ?
                </p>
              </div>
            </p>
            <table>
              <thead>
                <tr>
                  <th className="text-sm text-left">Course Name</th>
                  <th className="text-sm">No. of Credits</th>
                  <th className="text-sm text-left">Pre Grade</th>
                  <th className="text-sm">Grade</th>
                  <th className="text-sm">Delete</th>
                </tr>
              </thead>
              <tbody>
                {retakeRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        className="bg-white px-2 md:w-48 w-[90px] rounded border border-gray-200 focus:outline-none focus:border-green-500"
                        type="text"
                        placeholder="Course Name"
                        name="courseName"
                        value={row.courseName}
                        onChange={(e) => handleRetakeInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="bg-white rounded mx-2 lg:mx-5 border border-gray-200 focus:outline-none focus:border-green-500 w-20 px-2"
                        type="number"
                        placeholder="Credits"
                        name="credits"
                        value={row.credits}
                        onChange={(e) => handleRetakeInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <select
                        className="bg-white px-2 mr-2 lg:mr-5 rounded border border-gray-200 focus:outline-none focus:border-green-500"
                        name="previousGrade"
                        value={row.previousGrade}
                        onChange={(e) => handleRetakeInputChange(e, index)}
                      >
                        {gradeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        className="bg-white px-2 mr-2 lg: mr-5 rounded border border-gray-200 focus:outline-none focus:border-green-500"
                        name="grade"
                        value={row.grade}
                        onChange={(e) => handleRetakeInputChange(e, index)}
                      >
                        {gradeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="bg-white px-2 py-1 ml-2 hover:bg-red-100 border border-gray-200 rounded text-gray-600"
                        onClick={() => deleteRetakeRow(index)}
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="bg-white px-3 lg:mb-10 md:mb-10 py-1 mt-3 hover:bg-green-100 border border-gray-200 rounded"
              onClick={addRetakeRow}
            >
              Add Row
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateCg;
