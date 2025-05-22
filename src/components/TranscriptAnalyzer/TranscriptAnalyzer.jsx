import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { formatTranscriptData } from "./transcriptDataFormatter";
import { toast } from "react-hot-toast";

const TranscriptAnalyzer = ({
  setNormalCourses,
  setRetakeCourses,
  setName,
  setPreviousCGPA,
  setPreviousEarnedCredit,
}) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file", {
          duration: 2000,
          position: "top-right",
          style: {
            background: "#f44336",
            color: "white",
            cursor: "pointer",
          },
        });
        return;
      }
      extractTextFromPDF(selectedFile);
      toast.success("Transcript uploaded successfully", {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#4CAF50",
          color: "white",
          cursor: "pointer",
        },
      });
    }
  };

  const findPreviousGrade = (courseCode, semesters, currentSemesterIndex) => {
    // Search from the semester before the current one
    for (let i = currentSemesterIndex - 1; i >= 0; i--) {
      const semester = semesters[i];
      const course = semester.courses.find((c) => c.courseCode === courseCode);
      if (course) {
        return course.grade;
      }
    }
    return null;
  };

  const convertGradeToNumeric = (grade) => {
    if (grade === "A") return "4.00";
    if (grade === "A-") return "3.7";
    if (grade === "B+") return "3.3";
    if (grade === "B") return "3.0";
    if (grade === "B-") return "2.7";
    if (grade === "C+") return "2.3";
    if (grade === "C") return "2.0";
    if (grade === "C-") return "1.7";
    if (grade === "D+") return "1.3";
    if (grade === "D") return "1.0";
    if (grade === "F") return "0.0";
    // Keep I and Z as is
    return grade;
  };

  // Helper function to check if a course is a retake
  const isRetake = (course, allSemesters, currentSemesterIndex) => {
    // Check if this course appears in any previous semester
    for (let i = 0; i < currentSemesterIndex; i++) {
      const previousSemester = allSemesters[i];
      const previousCourse = previousSemester.courses.find(
        (c) => c.courseCode === course.courseCode
      );
      if (previousCourse) {
        return true;
      }
    }
    return false;
  };

  // Process courses from the last semester and Z grade courses from previous semesters
  const processCourses = (allSemesters) => {
    if (!allSemesters.length) return { normalCourses: [], retakeCourses: [] };

    const lastSemester = allSemesters[allSemesters.length - 1];
    const lastSemesterIndex = allSemesters.length - 1;

    // Collect Z grade courses from previous semesters
    const previousZGradeCourses = allSemesters
      .slice(0, -1) // Exclude last semester
      .flatMap((semester, semesterIndex) =>
        semester.courses
          .filter((course) => course.grade === "Z")
          .map((course) => {
            const isRetakeCourse = isRetake(
              course,
              allSemesters,
              semesterIndex
            );
            const previousGrade = isRetakeCourse
              ? findPreviousGrade(
                  course.courseCode,
                  allSemesters,
                  semesterIndex
                )
              : null;

            return {
              courseCode: course.courseCode,
              courseName: course.courseTitle,
              credits: course.creditHours.toString(),
              previousGrade: previousGrade
                ? convertGradeToNumeric(previousGrade)
                : "3.70",
              grade: "Z",
              isRetake: isRetakeCourse,
            };
          })
      );

    // Process last semester courses - only include Z grades
    const lastSemesterCourses = lastSemester.courses
      .filter((course) => course.grade === "Z")
      .map((course) => {
        const isRetakeCourse = isRetake(
          course,
          allSemesters,
          lastSemesterIndex
        );
        const previousGrade = isRetakeCourse
          ? findPreviousGrade(
              course.courseCode,
              allSemesters,
              lastSemesterIndex
            )
          : null;

        return {
          courseCode: course.courseCode,
          courseName: course.courseTitle,
          credits: course.creditHours.toString(),
          previousGrade: previousGrade
            ? convertGradeToNumeric(previousGrade)
            : "3.70",
          grade: "Z",
          isRetake: isRetakeCourse,
        };
      });

    // Combine and categorize all courses
    const allCourses = [...lastSemesterCourses, ...previousZGradeCourses];

    return {
      normalCourses: allCourses
        .filter((course) => !course.isRetake && course.grade === "Z")
        .map(({ courseCode, courseName, credits, grade }) => ({
          courseCode,
          courseName,
          credits,
          grade,
        })),
      retakeCourses: allCourses
        .filter((course) => course.isRetake && course.grade === "Z")
        .map(({ courseCode, courseName, credits, previousGrade, grade }) => ({
          courseCode,
          courseName,
          credits,
          previousGrade,
          grade,
        })),
    };
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
        console.log("Formatted Transcript Data:", formattedData);

        // Set student information
        setName(formattedData.studentName || "");

        // Set previous CGPA and credits from the academic record
        const academicRecord = formattedData.academicRecord;
        if (academicRecord) {
          // Set previous CGPA (excluding current semester)
          const previousSemesters = academicRecord.semesters.slice(0, -1);
          if (previousSemesters.length > 0) {
            const previousCGPA = academicRecord.cumulativeGPA;
            const previousCredits = academicRecord.totalCreditsEarned;

            setPreviousCGPA(previousCGPA?.toString() || "");
            setPreviousEarnedCredit(previousCredits?.toString() || "");
          } else {
            // If no previous semesters, clear the fields
            setPreviousCGPA("");
            setPreviousEarnedCredit("");
          }
        }

        // Process the courses
        const { normalCourses, retakeCourses } = processCourses(
          formattedData.academicRecord.semesters
        );

        // Update the parent component with courses
        setNormalCourses(
          normalCourses.length
            ? normalCourses
            : [{ courseCode: "", courseName: "", credits: "3", grade: "4.00" }]
        );
        setRetakeCourses(retakeCourses.length ? retakeCourses : []);

        setLoading(false);
        toast.success("Transcript processed successfully", {
          duration: 2000,
          position: "top-right",
          style: {
            background: "#4CAF50",
            color: "white",
            cursor: "pointer",
          },
          onClick: () => toast.dismiss(),
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error processing PDF:", err);
        toast.error("Error processing transcript. Please try again.", {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#f44336",
            color: "white",
            cursor: "pointer",
          },
        });
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
      {!loading && !error && file && (
        <p className="mt-2 text-sm text-gray-600">File uploaded: {file.name}</p>
      )}
    </div>
  );
};

export default TranscriptAnalyzer;
