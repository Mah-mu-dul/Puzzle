import React, { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const gradePoints = {
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  F: 0.0,
};

const RetakeAssistant = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [currentCGPA, setCurrentCGPA] = useState("");
  const [targetCGPA, setTargetCGPA] = useState("");
  const [earnedCredits, setEarnedCredits] = useState("");
  const [courses, setCourses] = useState([]);
  const [retakeSuggestions, setRetakeSuggestions] = useState([]);
  const modalRef = useRef(null);

  const calculateRetakeSuggestions = () => {
    if (!targetCGPA || !currentCGPA || !earnedCredits || courses.length === 0)
      return;

    // Sort courses by potential GPA improvement (current grade vs possible A grade)
    const sortedCourses = courses
      .map((course) => {
        const currentGradePoint = parseFloat(course.gradePoint);
        const potentialImprovement = 4.0 - currentGradePoint;
        return {
          ...course,
          potentialImprovement,
          weightedImprovement: potentialImprovement * course.credit,
        };
      })
      .sort((a, b) => b.weightedImprovement - a.weightedImprovement);

    // Calculate how much GPA points need to be improved
    const currentPoints = parseFloat(currentCGPA) * parseFloat(earnedCredits);
    const targetPoints = parseFloat(targetCGPA) * parseFloat(earnedCredits);
    const pointsNeeded = targetPoints - currentPoints;

    let suggestions = [];
    let runningImprovement = 0;

    // Add courses to suggestions until we reach the target CGPA
    for (const course of sortedCourses) {
      if (runningImprovement >= pointsNeeded) break;
      if (course.potentialImprovement > 0) {
        suggestions.push({
          ...course,
          suggestedGrade: "A",
          potentialImprovement: course.potentialImprovement.toFixed(2),
        });
        runningImprovement += course.weightedImprovement;
      }
    }

    setRetakeSuggestions(suggestions);
  };

  // ... rest of the parsing logic similar to TranscriptAnalyzer ...

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Retake Assistant</h1>

      <div className="mb-6">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input file-input-bordered w-full max-w-xs"
        />

        <div className="mt-4">
          <label htmlFor="targetCGPA" className="label">Target CGPA:</label>
          <input
            id="targetCGPA"
            type="number"
            step="0.01"
            min="0"
            max="4.00"
            value={targetCGPA}
            onChange={(e) => setTargetCGPA(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <button
          onClick={calculateRetakeSuggestions}
          className="btn btn-primary mt-4"
          disabled={!targetCGPA || !courses.length}
        >
          Calculate Suggestions
        </button>
      </div>

      {retakeSuggestions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Retake Suggestions</h2>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Current Grade</th>
                <th>Credits</th>
                <th>Potential Improvement</th>
              </tr>
            </thead>
            <tbody>
              {retakeSuggestions.map((course, index) => (
                <tr key={index} className="border-b">
                  <td>{course.courseCode}</td>
                  <td>{course.courseTitle}</td>
                  <td>{course.grade}</td>
                  <td>{course.credit}</td>
                  <td>{course.potentialImprovement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Error Modal */}
      <input
        type="checkbox"
        id="error-modal"
        className="modal-toggle"
        ref={modalRef}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">Error</h3>
          <p className="py-4 text-gray-700">{error}</p>
          <div className="modal-action">
            <label htmlFor="error-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetakeAssistant;
