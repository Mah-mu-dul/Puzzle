import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";

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

          const headerText =
            "Course Course Title Type Grade Course Credit Credit Earned Credit for GPA Grade Point";
          fullText = fullText.concat(
            pageText
              .split(headerText)
              .join("")
              .split("\n")
              .filter((line) => line.trim() !== "")
          );
        }

        // Extract and set name
        const name = fullText[2].split("   ")[1];
        if (!name) throw new Error("Unable to extract name");
        setName(name);

        // Extract and set previous CGPA
        const previousCGPA = fullText[fullText.length - 1].split("   ").pop();
        if (isNaN(parseFloat(previousCGPA))) throw new Error("Invalid CGPA");
        setPreviousCGPA(previousCGPA);

        // Extract and set total earned credit
        const totalEarnedCredit = fullText[fullText.length - 3]
          .split("   ")
          .pop();
        const parsedCredit = parseInt(totalEarnedCredit, 10);
        if (isNaN(parsedCredit)) throw new Error("Invalid total earned credit");
        setPreviousEarnedCredit(parsedCredit);

        const courseInfoRaw = fullText.slice(6, -4);
        let nestedCourseInfo = [];
        let currentSemester = [];

        for (const line of courseInfoRaw) {
          if (line.includes("GPA :")) {
            if (currentSemester.length > 0) {
              currentSemester.push(
                line.split("   ").filter((item) => item.trim() !== "")
              );
              nestedCourseInfo.push(currentSemester);
            }
            currentSemester = [];
          } else if (!line.startsWith("Course")) {
            currentSemester.push(
              line.split("   ").filter((item) => item.trim() !== "")
            );
          }
        }

        if (currentSemester.length > 0) {
          nestedCourseInfo.push(currentSemester);
        }

        for (let i = 0; i < nestedCourseInfo.length; i++) {
          for (let j = 0; j < nestedCourseInfo[i].length - 1; j++) {
            if (
              nestedCourseInfo[i][j].length === 2 &&
              nestedCourseInfo[i][j + 1]
            ) {
              nestedCourseInfo[i][j] = [
                nestedCourseInfo[i][j][0],
                nestedCourseInfo[i][j][1] + " " + nestedCourseInfo[i][j + 1][0],
                ...nestedCourseInfo[i][j + 1].slice(1),
              ];
              nestedCourseInfo[i].splice(j + 1, 1);
              j--;
            }
          }
        }

        const lastSemester = nestedCourseInfo[nestedCourseInfo.length - 1];
        const retakeCourses = lastSemester.filter(
          (course) => course.length === 8
        );
        const nonRetakeCourses = lastSemester.filter(
          (course) =>
            course.length === 7 && course[3] !== "W" && course[2] !== "W"
        );
        console.log(nonRetakeCourses);

        // Process retaken courses
        const processedRetakeCourses = retakeCourses.map((retakeCourse) => {
          const courseCode = retakeCourse[0];
          let lastGrade = retakeCourse[3]; // Initialize with the current grade

          // Search all semesters for the same course
          for (let i = nestedCourseInfo.length - 1; i >= 0; i--) {
            const semester = nestedCourseInfo[i];
            for (let j = semester.length - 1; j >= 0; j--) {
              const course = semester[j];
              if (course[0] === courseCode) {
                lastGrade = course[3];
                break;
              }
            }
          }

          // Return the retake course with the last grade
          return [
            ...retakeCourse.slice(0, 3),
            lastGrade,
            ...retakeCourse.slice(4),
          ];
        });

        setNormalCourses(nonRetakeCourses);
        setRetakeCourses(processedRetakeCourses);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
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
