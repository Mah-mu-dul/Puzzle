import React, { useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import TranscriptAnalyzer from "../TranscriptAnalyzer/TranscriptAnalyzer";
import { toast } from "react-hot-toast";
import UndoRedoManager from "./UndoRedoManager";

const CalculateCg2 = () => {
  // State declarations
  const [name, setName] = useState("");
  const [previousCGPA, setPreviousCGPA] = useState("");
  const [previousEarnedCredit, setPreviousEarnedCredit] = useState("");
  const [normalCourses, setNormalCourses] = useState([
    { courseCode: "", courseName: "", credits: "3", grade: "4.00" },
  ]);
  const [retakeCourses, setRetakeCourses] = useState([
    {
      courseCode: "",
      courseName: "",
      credits: "",
      previousGrade: "4.00",
      grade: "4.00",
    },
  ]);

  // after calculation
  const [currentCGPA, setCurrentCGPA] = useState(0);
  const [totalEarnedCredit, setTotalEarnedCredit] = useState(0);

  // Add state for tracking problematic retake rows
  const [problematicRetakeRows, setProblematicRetakeRows] = useState([]);

  console.log("output", {
    normalCourses,
    retakeCourses,
    name,
    previousCGPA,
    previousEarnedCredit,
  });

  const gradeOptions = [
    { value: "4.00", label: "A" },
    { value: "3.7", label: "A-" },
    { value: "3.3", label: "B+" },
    { value: "3.0", label: "B" },
    { value: "2.7", label: "B-" },
    { value: "2.3", label: "C+" },
    { value: "2.0", label: "C" },
    { value: "1.7", label: "C-" },
    { value: "1.3", label: "D+" },
    { value: "1.0", label: "D" },
    { value: "0.0", label: "F" },
    { value: "I", label: "I" },
    { value: "Z", label: "Z" },
  ];
  const retakeGradeOptions = [
    { value: "3.7", label: "A-" },
    { value: "3.3", label: "B+" },
    { value: "3.0", label: "B" },
    { value: "2.7", label: "B-" },
    { value: "2.3", label: "C+" },
    { value: "2.0", label: "C" },
    { value: "1.7", label: "C-" },
    { value: "1.3", label: "D+" },
    { value: "1.0", label: "D" },
    { value: "0.0", label: "F" },
  ];

  // Calculate total points for normal courses
  const calculateTotalPoints = () => {
    return normalCourses.reduce((total, row) => {
      // Ignore courses with I or Z grades
      if (row.credits && row.grade && row.grade !== "I" && row.grade !== "Z") {
        return total + parseFloat(row.credits) * parseFloat(row.grade);
      }
      return total;
    }, 0);
  };

  // Calculate total credits for normal courses
  const calculateTotalCredits = () => {
    return normalCourses.reduce((total, row) => {
      // Ignore courses with I or Z grades
      if (row.credits && row.grade && row.grade !== "I" && row.grade !== "Z") {
        return total + parseFloat(row.credits);
      }
      return total;
    }, 0);
  };

  // Calculate total retake credits (for validation only)
  const calculateTotalRetakeCredits = () => {
    return retakeCourses.reduce((total, row) => {
      // Count credits only if current grade is valid (not I or Z)
      // Previous grade doesn't matter for credit counting
      if (row.credits && row.grade && row.grade !== "I" && row.grade !== "Z") {
        return total + parseFloat(row.credits);
      }
      return total;
    }, 0);
  };

  // Calculate retake points (only affects CGPA, not credits)
  const calculateRetakePoints = () => {
    return retakeCourses.reduce((total, row) => {
      if (!row.credits || !row.grade || !row.previousGrade) {
        return total;
      }

      // If current grade is I or Z, don't count this retake at all
      if (row.grade === "I" || row.grade === "Z") {
        return total;
      }

      // If previous grade was I or Z, treat as new course (add credits and points)
      if (row.previousGrade === "I" || row.previousGrade === "Z") {
        return total + parseFloat(row.credits) * parseFloat(row.grade);
      }

      // Normal retake calculation (only affects CGPA, not credits)
      const newPoints = parseFloat(row.credits) * parseFloat(row.grade);
      const oldPoints = parseFloat(row.credits) * parseFloat(row.previousGrade);
      return total + (newPoints - oldPoints);
    }, 0);
  };

  const addRow = () => {
    setNormalCourses([
      ...normalCourses,
      { courseCode: "", courseName: "", credits: "3", grade: "4.00" },
    ]);
  };

  const addRetakeRow = () => {
    setRetakeCourses([
      ...retakeCourses,
      {
        courseCode: "",
        courseName: "",
        credits: "",
        previousGrade: "3.70",
        grade: "4.00",
      },
    ]);
  };

  const deleteRow = (index) => {
    const updatedNormalCourses = normalCourses.filter((_, i) => i !== index);
    setNormalCourses(updatedNormalCourses);
    toast.success("Course deleted successfully", {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#4CAF50",
        color: "white",
        cursor: "pointer",
      },
      onClick: () => toast.dismiss(),
    });
  };

  const deleteRetakeRow = (index) => {
    const updatedRetakeCourses = retakeCourses.filter((_, i) => i !== index);
    setRetakeCourses(updatedRetakeCourses);
    toast.success("Retake course deleted successfully", {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#4CAF50",
        color: "white",
        cursor: "pointer",
      },
      onClick: () => toast.dismiss(),
    });
  };

  const handleNormalCourseInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCourses = [...normalCourses];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [name]: value,
    };
    setNormalCourses(updatedCourses);
  };

  const handleRetakeInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCourses = [...retakeCourses];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [name]: value,
    };
    setRetakeCourses(updatedCourses);
  };

  // Function to identify problematic retake rows
  const identifyProblematicRetakes = (currentEarnedCredits) => {
    const problematicRows = [];
    let retakeTotal = 0;
    let isImbalanced = false;

    // First pass: calculate total retake credits
    retakeCourses.forEach((row, index) => {
      if (row.credits && row.grade && row.grade !== "I" && row.grade !== "Z") {
        retakeTotal += parseFloat(row.credits);
      }
    });

    // If total retake credits exceed current earned credits
    if (retakeTotal > currentEarnedCredits) {
      // Second pass: mark all rows that contribute to the imbalance
      let runningTotal = 0;
      retakeCourses.forEach((row, index) => {
        if (
          row.credits &&
          row.grade &&
          row.grade !== "I" &&
          row.grade !== "Z"
        ) {
          runningTotal += parseFloat(row.credits);
          // Mark this row if it contributes to exceeding the limit
          if (runningTotal > currentEarnedCredits) {
            problematicRows.push(index);
          }
        }
      });
    }

    setProblematicRetakeRows(problematicRows);
    return problematicRows.length > 0;
  };

  // Add handler for state changes from UndoRedoManager
  const handleStateChange = (newState) => {
    setName(newState.name || "");
    setPreviousCGPA(newState.previousCGPA || "");
    setPreviousEarnedCredit(newState.previousEarnedCredit || "");
    setNormalCourses(
      newState.normalCourses || [
        { courseCode: "", courseName: "", credits: "3", grade: "4.00" },
      ]
    );
    setRetakeCourses(
      newState.retakeCourses || [
        {
          courseCode: "",
          courseName: "",
          credits: "3",
          previousGrade: "4.00",
          grade: "4.00",
        },
      ]
    );
  };

  useEffect(() => {
    const calculateCGPA = () => {
      // Calculate points and credits for normal courses
      const normalPoints = calculateTotalPoints();
      const normalCredits = calculateTotalCredits();

      // Calculate points for retake courses
      const retakePoints = calculateRetakePoints();

      // Calculate total credits including retakes with previous I/Z grades
      let totalCredits = normalCredits;
      retakeCourses.forEach((row) => {
        // Only add credits if current grade is valid (not I or Z)
        // and previous grade was I or Z
        if (
          row.credits &&
          row.grade &&
          row.grade !== "I" &&
          row.grade !== "Z" &&
          (row.previousGrade === "I" || row.previousGrade === "Z")
        ) {
          totalCredits += parseFloat(row.credits);
        }
      });

      // Calculate current earned credits (only include previous credits if CGPA is valid)
      const prevCredits = parseFloat(previousEarnedCredit) || 0;
      const prevCGPA = parseFloat(previousCGPA);
      const hasValidPreviousCGPA =
        !isNaN(prevCGPA) && prevCGPA >= 0 && prevCGPA <= 4.0 && prevCredits > 0;

      // Only include previous credits in current earned credits if CGPA is valid
      const currentEarnedCredits =
        normalCredits + (hasValidPreviousCGPA ? prevCredits : 0);
      const totalRetakeCredits = calculateTotalRetakeCredits();

      // Check for problematic retakes and update UI
      const hasProblems = identifyProblematicRetakes(currentEarnedCredits);
      if (hasProblems) {
        toast.error(
          `Total retake credits (${totalRetakeCredits}) cannot be greater than current earned credits (${currentEarnedCredits})`,
          {
            duration: 4000,
            position: "top-right",
            style: {
              background: "#f44336",
              color: "white",
              cursor: "pointer",
            },
            onClick: () => toast.dismiss(),
          }
        );
        return;
      }

      // Calculate total points
      let totalPoints = normalPoints + retakePoints;

      // Add previous CGPA and credits if both are provided and valid
      if (hasValidPreviousCGPA) {
        // Add previous points and credits to total
        totalPoints += prevCGPA * prevCredits;
        totalCredits += prevCredits;
      }

      // Calculate final CGPA
      const finalCGPA =
        totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
      setCurrentCGPA(parseFloat(finalCGPA));
      setTotalEarnedCredit(totalCredits);
    };

    calculateCGPA();
  }, [normalCourses, retakeCourses, previousCGPA, previousEarnedCredit]);

  return (
    <>
      <div className="mx-2 max-w-full bg-[#eee] py-5">
        <p className="text-gray-600 font-bold text-xs px-3 text-center w-fit mx-auto ">
          Disclaimer: This is not the official calculator. The CGPA calculated
          may vary from the official transcript. Use at your own risk.
        </p>
        <p className={`font-bold text-lg w-fit mx-auto mb-5`}>
          IUB CGPA Calculator
        </p>
        <div className="w-fit max-w-full overflow-hidden lg:mx-auto md:mx-3 relative">
          <div className="flex justify-between items-center flex-wrap gap-5 w-full  ">
            <span>
              {name && (
                <strong>
                  Hello <span className="text-green-700 text-xl">{name}</span>
                </strong>
              )}
              <br />
              <strong>
                CGPA:{" "}
                <span className="text-green-700 text-xl">{currentCGPA}</span>
              </strong>{" "}
              <br />
              <strong>
                Total Earned Credit:{" "}
                <span className="text-green-700 text-xl">
                  {totalEarnedCredit}
                </span>
              </strong>
            </span>
            <UndoRedoManager
              normalCourses={normalCourses}
              retakeCourses={retakeCourses}
              previousCGPA={previousCGPA}
              previousEarnedCredit={previousEarnedCredit}
              name={name}
              onStateChange={handleStateChange}
            />
            <div className="flex items-center gap-4">
              <TranscriptAnalyzer
                setNormalCourses={setNormalCourses}
                setRetakeCourses={setRetakeCourses}
                setName={setName}
                setPreviousCGPA={setPreviousCGPA}
                setPreviousEarnedCredit={setPreviousEarnedCredit}
              />
            </div>
          </div>

          <br />
          <div>
            <div>
              <label htmlFor="previousCGPA">Previous CGPA:</label>
              <input
                className="bg-white px-2 w-28 ml-2 rounded border border-gray-200 focus:outline-none focus:border-green-500 hover:border-green-500"
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
                className="bg-white px-2 w-28 ml-2 my-1 rounded border border-gray-200 focus:outline-none focus:border-green-500 hover:border-green-500"
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
                    <th className="text-sm">Course Name</th>
                    <th className="text-sm">No. of Credits</th>
                    <th className="text-sm">Grade</th>
                    <th className="text-sm">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {normalCourses.map((row, index) => (
                    <tr key={index * index}>
                      <td>
                        <input
                          className={`bg-white px-2 md:w-48 w-[135px] rounded border  focus:outline-none focus:border-green-500 hover:border-green-500`}
                          type="text"
                          placeholder="Course Name"
                          name="courseName"
                          value={row.courseName}
                          onChange={(e) =>
                            handleNormalCourseInputChange(e, index)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="bg-white rounded mx-5 border border-gray-200 focus:outline-none focus:border-green-500 hover:border-green-500 w-20 px-2"
                          type="number"
                          placeholder="Credits"
                          name="credits"
                          value={row.credits}
                          onChange={(e) =>
                            handleNormalCourseInputChange(e, index)
                          }
                        />
                      </td>
                      <td>
                        <select
                          className="bg-white px-2 mr-2 lg:mr-5 rounded border border-gray-200 focus:outline-none focus:border-green-500 hover:border-green-500"
                          name="grade"
                          value={row.grade}
                          onChange={(e) =>
                            handleNormalCourseInputChange(e, index)
                          }
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
                          className="bg-white px-2 py-1 ml-2 hover:bg-red-100 border border-gray-200 rounded text-gray-600 hover:border-red-500"
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
                className="bg-white px-3 lg:mb-10 md:mb-10 py-1 mt-3 hover:bg-green-100 border border-gray-200 rounded hover:border-green-500"
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
                  {retakeCourses.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          className={`bg-white px-2 md:w-48 w-[90px] rounded border ${
                            problematicRetakeRows.includes(index)
                              ? "border-red-500"
                              : "border-gray-200"
                          } focus:outline-none focus:border-green-500 hover:border-green-500`}
                          type="text"
                          placeholder="Course Name"
                          name="courseName"
                          value={row.courseName}
                          onChange={(e) => handleRetakeInputChange(e, index)}
                        />
                      </td>
                      <td>
                        <input
                          className={`bg-white rounded mx-2 lg:mx-5 border ${
                            problematicRetakeRows.includes(index)
                              ? "border-red-500"
                              : "border-gray-200"
                          } focus:outline-none focus:border-green-500 hover:border-green-500 w-20 px-2`}
                          type="number"
                          placeholder="Credits"
                          name="credits"
                          value={row.credits}
                          onChange={(e) => handleRetakeInputChange(e, index)}
                        />
                      </td>
                      <td>
                        <select
                          className={`bg-white px-2 mr-2 lg:mr-5 rounded border ${
                            problematicRetakeRows.includes(index)
                              ? "border-red-500"
                              : "border-gray-200"
                          } focus:outline-none focus:border-green-500 hover:border-green-500`}
                          name="previousGrade"
                          value={row.previousGrade}
                          onChange={(e) => handleRetakeInputChange(e, index)}
                        >
                          {retakeGradeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className={`bg-white px-2 mr-2 lg:mr-5 rounded border ${
                            problematicRetakeRows.includes(index)
                              ? "border-red-500"
                              : "border-gray-200"
                          } focus:outline-none focus:border-green-500 hover:border-green-500`}
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
                          className={`px-2 py-1 ml-2 hover:bg-red-100 border ${
                            problematicRetakeRows.includes(index)
                              ? "border-red-500 bg-red-100"
                              : "border-gray-200"
                          } rounded text-gray-600 hover:border-red-500`}
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
                className="bg-white px-3 lg:mb-10 md:mb-10 py-1 mt-3 hover:bg-green-100 border border-gray-200 rounded hover:border-green-500"
                onClick={addRetakeRow}
              >
                Add Row
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculateCg2;
