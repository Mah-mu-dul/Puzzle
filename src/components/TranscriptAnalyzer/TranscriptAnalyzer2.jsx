import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { formatTranscriptData } from "./transcriptDataFormatter";

const TranscriptAnalyzer = ({
  setNormalCourses,
  setRetakeCourses,
  setName,
  setPreviousCGPA,
  setPreviousEarnedCredit,
}) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
    if (file) {
      extractTextFromPDF(file);
    }
  };

  const extractTextFromPDF = async (file) => {
    setLoading(true);
    setError(null);
    const reader = new FileReader();
    reader.onload = async function () {
      try {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let fullText = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          let pageText = "";
          let currentLine = "";

          for (const item of textContent.items) {
            currentLine += item.str + " ";
            if (item.hasEOL) {
              pageText += currentLine.trim() + "\n";
              currentLine = "";
            }
          }

          if (currentLine.trim()) {
            pageText += currentLine.trim() + "\n";
          }

          fullText = fullText.concat(
            pageText.split("\n").filter((line) => line.trim() !== "")
          );
        }

        // Process the extracted text using formatTranscriptData
        const formattedData = formatTranscriptData(fullText);

        // Set student name
        setName(formattedData.studentName);

        // Set CGPA
        setPreviousCGPA(formattedData.academicRecord.cumulativeGPA.toString());

        // Set total earned credits
        setPreviousEarnedCredit(
          formattedData.academicRecord.totalCreditsEarned
        );

        // Get the last semester's courses
        const lastSemester =
          formattedData.academicRecord.semesters[
            formattedData.academicRecord.semesters.length - 1
          ];

        // Separate retake and normal courses
        const retakeCourses = lastSemester.courses
          .filter((course) => course.courseType === "R")
          .map((course) => [
            course.courseCode,
            course.courseTitle,
            course.courseType,
            course.grade,
            course.creditHours.toString(),
            course.earnedCredits.toString(),
            course.gpaCredits.toString(),
            course.gradePoints.toString(),
          ]);

        const normalCourses = lastSemester.courses
          .filter(
            (course) =>
              course.courseType !== "R" &&
              course.courseType !== "T" &&
              course.grade !== "W"
          )
          .map((course) => [
            course.courseCode,
            course.courseTitle,
            course.grade,
            course.creditHours.toString(),
            course.earnedCredits.toString(),
            course.gpaCredits.toString(),
            course.gradePoints.toString(),
          ]);

        console.log("Last Semester:", lastSemester.semesterName);
        console.log("Normal Courses:", normalCourses);
        console.log("Retake Courses:", retakeCourses);

        setNormalCourses(normalCourses);
        setRetakeCourses(retakeCourses);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error processing transcript:", err);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="bg-indigo-50 shadow-xl hover:bg-indigo-100 p-8 rounded-xl">
      <h3 className="text-lg font-semibold mb-2">Upload Your Transcript</h3>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="file-input bg-indigo-100 hover:bg-indigo-50 file-input-bordered w-full max-w-xs"
        style={{ backgroundColor: "bg-indigo-100" }}
      />
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">
          Error: {error}. Please try again with a valid transcript.
        </p>
      )}
      {!loading && !error && (
        <p className="mt-2 text-sm text-gray-600">
          After uploading, adjust your grades if needed.
        </p>
      )}
    </div>
  );
};

export default TranscriptAnalyzer;
