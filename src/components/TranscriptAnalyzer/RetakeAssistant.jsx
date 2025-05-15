import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { formatTranscriptData } from "../../components/TranscriptAnalyzer/transcriptDataFormatter.js";

function RetakeAssistant() {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transcriptData, setTranscriptData] = useState({
    studentName: "MAHMUDUL HASAN",
    studentId: "2220622",
    address: "MAIN ROAD, DHAKBANGLA BAZARPOST: 4450 THANA",
    majors: ["Computer Science and Engineering"],
    minors: ["Robotics and Intelligent Machine"],
    academicRecord: {
      totalCreditsAttempted: 137,
      totalCreditsEarned: 109,
      totalGradePoints: 326.8,
      cumulativeGPA: 3,
      semesters: [
        {
          semesterName: "SPRING 2022",
          semesterGPA: 3.31,
          courses: [
            {
              courseCode: "ENG101",
              courseTitle: "English Listening & Speaking Skills",
              courseType: "",
              grade: "B",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 9,
            },
            {
              courseCode: "CSC101L",
              courseTitle: "Lab for CSC101",
              courseType: "",
              grade: "A",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 4,
            },
            {
              courseCode: "CSC101",
              courseTitle: "Introduction to Computer Programming",
              courseType: "",
              grade: "A",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 12,
            },
            {
              courseCode: "CMN201",
              courseTitle: "Introduction to Communication",
              courseType: "",
              grade: "B-",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 8.1,
            },
          ],
          semesterSummary: {
            totalCredits: 10,
            earnedCredits: 10,
            gpaCredits: 10,
            totalGradePoints: 33.1,
          },
        },
        {
          semesterName: "SUMMER 1 2022",
          semesterGPA: 2.59,
          courses: [
            {
              courseCode: "PHY101",
              courseTitle: "University Physics-I",
              courseType: "",
              grade: "C+",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 6.9,
            },
            {
              courseCode: "PHY101L",
              courseTitle: "University Physics-I Lab",
              courseType: "",
              grade: "A-",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 3.7,
            },
            {
              courseCode: "MAT104",
              courseTitle: "Calculus and analytical geometry",
              courseType: "",
              grade: "C",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 6,
            },
            {
              courseCode: "ENG102",
              courseTitle: "English Reading Skills",
              courseType: "",
              grade: "B",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 9,
            },
            {
              courseCode: "CSE201",
              courseTitle: "Discrete Mathematics",
              courseType: "",
              grade: "B-",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 8.1,
            },
          ],
          semesterSummary: {
            totalCredits: 13,
            earnedCredits: 13,
            gpaCredits: 13,
            totalGradePoints: 33.7,
          },
        },
        {
          semesterName: "AUTUMN 2022",
          semesterGPA: 2.8,
          courses: [
            {
              courseCode: "BDS109",
              courseTitle: "Bangladesh 1971 through the Lenses",
              courseType: "",
              grade: "C",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 6,
            },
            {
              courseCode: "CSE203",
              courseTitle: "Data Structure",
              courseType: "",
              grade: "A",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 12,
            },
            {
              courseCode: "CSE203L",
              courseTitle: "Data Structure Lab",
              courseType: "",
              grade: "A",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 4,
            },
            {
              courseCode: "MAT212",
              courseTitle: "Probability & Statistics for Science & Engineering",
              courseType: "",
              grade: "C",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 6,
            },
            {
              courseCode: "PHY102L",
              courseTitle: "University Physics-II Lab",
              courseType: "T",
              grade: "B-",
              creditHours: 1,
              earnedCredits: 0,
              gpaCredits: 0,
              gradePoints: 0,
            },
            {
              courseCode: "PHY102",
              courseTitle: "University Physics-II",
              courseType: "T",
              grade: "C",
              creditHours: 3,
              earnedCredits: 0,
              gpaCredits: 0,
              gradePoints: 0,
            },
          ],
          semesterSummary: {
            totalCredits: 14,
            earnedCredits: 10,
            gpaCredits: 10,
            totalGradePoints: 28,
          },
        },
        {
          semesterName: "SPRING 2023",
          semesterGPA: 3.3,
          courses: [
            {
              courseCode: "HEA101",
              courseTitle: "Health and Society",
              courseType: "",
              grade: "A-",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 11.1,
            },
            {
              courseCode: "CSE211L",
              courseTitle: "Labwork based on CSE 211",
              courseType: "",
              grade: "B",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 3,
            },
            {
              courseCode: "CSE211",
              courseTitle: "Algorithms",
              courseType: "",
              grade: "B",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 9,
            },
            {
              courseCode: "CSE104L",
              courseTitle: "Lab work based on CSE 104",
              courseType: "",
              grade: "B+",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 3.3,
            },
            {
              courseCode: "CSE104",
              courseTitle: "Electrical Circuit Analysis",
              courseType: "",
              grade: "B+",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 9.9,
            },
          ],
          semesterSummary: {
            totalCredits: 11,
            earnedCredits: 11,
            gpaCredits: 11,
            totalGradePoints: 36.3,
          },
        },
        {
          semesterName: "SUMMER 1 2023",
          semesterGPA: 3.45,
          courses: [
            {
              courseCode: "CSE204",
              courseTitle: "Digital Logic Design",
              courseType: "",
              grade: "B-",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 8.1,
            },
            {
              courseCode: "CSE204L",
              courseTitle: "Labwork based on CSE 204",
              courseType: "",
              grade: "B-",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 2.7,
            },
            {
              courseCode: "MUS101",
              courseTitle: "Music Appreciation",
              courseType: "",
              grade: "W",
              creditHours: 3,
              earnedCredits: 0,
              gpaCredits: 0,
              gradePoints: 0,
            },
            {
              courseCode: "ENG105",
              courseTitle: "Business English",
              courseType: "",
              grade: "A-",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 11.1,
            },
            {
              courseCode: "CSE213L",
              courseTitle: "Labwork based on CSE 213",
              courseType: "",
              grade: "A",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 4,
            },
            {
              courseCode: "CSE213",
              courseTitle: "Object Oriented Programming",
              courseType: "",
              grade: "A",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 12,
            },
          ],
          semesterSummary: {
            totalCredits: 14,
            earnedCredits: 11,
            gpaCredits: 11,
            totalGradePoints: 37.9,
          },
        },
        {
          semesterName: "AUTUMN 2023",
          semesterGPA: 2.47,
          courses: [
            {
              courseCode: "CSE210",
              courseTitle: "Electronics I",
              courseType: "",
              grade: "B-",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 8.1,
            },
            {
              courseCode: "CSE316L",
              courseTitle: "Labwork based on CSE 316",
              courseType: "",
              grade: "C-",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 1.7,
            },
            {
              courseCode: "MAT203",
              courseTitle: "Linear Algebra- vectors and matrices",
              courseType: "T",
              grade: "F",
              creditHours: 3,
              earnedCredits: 0,
              gpaCredits: 0,
              gradePoints: 0,
            },
            {
              courseCode: "CSE210L",
              courseTitle: "Labwork based on CSE 210",
              courseType: "",
              grade: "B-",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 2.7,
            },
            {
              courseCode: "CSE303",
              courseTitle: "Database Management",
              courseType: "",
              grade: "B",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 9,
            },
            {
              courseCode: "CSE303L",
              courseTitle: "Labwork based on CSE303",
              courseType: "",
              grade: "B",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 3,
            },
            {
              courseCode: "CSE316",
              courseTitle: "Data Communication & Computer Networks",
              courseType: "",
              grade: "C-",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 5.1,
            },
          ],
          semesterSummary: {
            totalCredits: 15,
            earnedCredits: 12,
            gpaCredits: 12,
            totalGradePoints: 29.6,
          },
        },
        {
          semesterName: "SPRING 2024",
          semesterGPA: 3.01,
          courses: [
            {
              courseCode: "PHY102L",
              courseTitle: "University Physics-II Lab",
              courseType: "R",
              grade: "A",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 4,
            },
            {
              courseCode: "MAT203",
              courseTitle: "Linear Algebra- vectors and matrices",
              courseType: "T",
              grade: "D+",
              creditHours: 3,
              earnedCredits: 0,
              gpaCredits: 0,
              gradePoints: 0,
            },
            {
              courseCode: "CSE416",
              courseTitle: "Distributed Database Systems",
              courseType: "",
              grade: "B+",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 9.9,
            },
            {
              courseCode: "CSE214",
              courseTitle: "Computer Organization & Architecture",
              courseType: "",
              grade: "B-",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 8.1,
            },
            {
              courseCode: "PHY102",
              courseTitle: "University Physics-II",
              courseType: "R",
              grade: "B-",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 8.1,
            },
          ],
          semesterSummary: {
            totalCredits: 13,
            earnedCredits: 10,
            gpaCredits: 10,
            totalGradePoints: 30.1,
          },
        },
        {
          semesterName: "SUMMER 1 2024",
          semesterGPA: 3.39,
          courses: [
            {
              courseCode: "MAT301",
              courseTitle: "Ordinary Diff Equations",
              courseType: "",
              grade: "B+",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 9.9,
            },
            {
              courseCode: "CSC420",
              courseTitle: "Image Processing and Pattern Recognition",
              courseType: "",
              grade: "A",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 12,
            },
            {
              courseCode: "CSE310",
              courseTitle: "Electronics II",
              courseType: "",
              grade: "B+",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 9.9,
            },
            {
              courseCode: "CSE310L",
              courseTitle: "Labwork based on CSE 310",
              courseType: "",
              grade: "B+",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 3.3,
            },
            {
              courseCode: "CSE406",
              courseTitle: "Cryptography and Network Security",
              courseType: "",
              grade: "B",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 9,
            },
          ],
          semesterSummary: {
            totalCredits: 13,
            earnedCredits: 13,
            gpaCredits: 13,
            totalGradePoints: 44.1,
          },
        },
        {
          semesterName: "AUTUMN 2024",
          semesterGPA: 2.54,
          courses: [
            {
              courseCode: "LFE201",
              courseTitle: "Live-in-Field Experience (Inter-Term Course)",
              courseType: "",
              grade: "Z",
              creditHours: 3,
              earnedCredits: 0,
              gpaCredits: 0,
              gradePoints: 0,
            },
            {
              courseCode: "CSE309",
              courseTitle: "Web Application & Internet",
              courseType: "",
              grade: "B+",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 9.9,
            },
            {
              courseCode: "CSE307",
              courseTitle: "System Analysis and Design",
              courseType: "",
              grade: "C",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 6,
            },
            {
              courseCode: "CSE216L",
              courseTitle: "Labwork based on CSE 216",
              courseType: "",
              grade: "B",
              creditHours: 1,
              earnedCredits: 1,
              gpaCredits: 1,
              gradePoints: 3,
            },
            {
              courseCode: "CSC425",
              courseTitle: "Artificial Intelligence",
              courseType: "",
              grade: "C-",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 5.1,
            },
            {
              courseCode: "CSE216",
              courseTitle: "Microprocessor Interfacing & Assembly Language",
              courseType: "",
              grade: "B",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 9,
            },
          ],
          semesterSummary: {
            totalCredits: 16,
            earnedCredits: 13,
            gpaCredits: 13,
            totalGradePoints: 33,
          },
        },
        {
          semesterName: "SPRING 2025",
          semesterGPA: 3.5,
          courses: [
            {
              courseCode: "CSC441",
              courseTitle: "Instrumentation & measurements",
              courseType: "",
              grade: "Z",
              creditHours: 3,
              earnedCredits: 0,
              gpaCredits: 0,
              gradePoints: 0,
            },
            {
              courseCode: "CSE437",
              courseTitle: "Theory of Computation & Automata",
              courseType: "",
              grade: "A",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 12,
            },
            {
              courseCode: "CSE464",
              courseTitle: "Mobile Application Development",
              courseType: "",
              grade: "Z",
              creditHours: 3,
              earnedCredits: 0,
              gpaCredits: 0,
              gradePoints: 0,
            },
            {
              courseCode: "CSE498",
              courseTitle: "Senior Project",
              courseType: "",
              grade: "Z",
              creditHours: 6,
              earnedCredits: 0,
              gpaCredits: 0,
              gradePoints: 0,
            },
            {
              courseCode: "MAT203",
              courseTitle: "Linear Algebra- vectors and matrices",
              courseType: "R",
              grade: "B",
              creditHours: 3,
              earnedCredits: 3,
              gpaCredits: 3,
              gradePoints: 9,
            },
          ],
          semesterSummary: {
            totalCredits: 18,
            earnedCredits: 6,
            gpaCredits: 6,
            totalGradePoints: 21,
          },
        },
      ],
    },
  });
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Grade options for retake
  const gradeOptions = [
    { value: "4.00", label: "A" },
    { value: "3.70", label: "A-" },
    { value: "3.30", label: "B+" },
    { value: "3.00", label: "B" },
    { value: "2.70", label: "B-" },
    { value: "2.30", label: "C+" },
    { value: "2.00", label: "C" },
  ];

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

        const formattedData = formatTranscriptData(fullText);

        setTranscriptData(formattedData);

        // Get available courses (grade not A and type not T)
        const availableCoursesList = [];
        formattedData.academicRecord.semesters.forEach((semester) => {
          semester.courses.forEach((course) => {
            if (
              course.grade !== "A" &&
              course.courseType !== "T" &&
              course.grade !== "W"
            ) {
              availableCoursesList.push({
                courseCode: course.courseCode,
                courseTitle: course.courseTitle,
                currentGrade: course.grade,
                creditHours: course.creditHours,
                expectedGrade: "4.00", // Default to A
                gradePoints: course.gradePoints,
              });
            }
          });
        });
        setAvailableCourses(availableCoursesList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCourseSelection = (course) => {
    const isSelected = selectedCourses.some(
      (selected) => selected.courseCode === course.courseCode
    );

    if (isSelected) {
      setSelectedCourses(
        selectedCourses.filter(
          (selected) => selected.courseCode !== course.courseCode
        )
      );
    } else {
      setSelectedCourses([...selectedCourses, { ...course }]);
    }
  };

  const handleGradeChange = (courseCode, newGrade) => {
    setSelectedCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.courseCode === courseCode
          ? { ...course, expectedGrade: newGrade }
          : course
      )
    );
  };

  const calculateNewCGPA = () => {
    if (!transcriptData || !transcriptData.academicRecord) return "0.00";

    const totalCredits = transcriptData.academicRecord.totalCreditsEarned;
    const currentCGPA = transcriptData.academicRecord.cumulativeGPA;

    if (!currentCGPA || !totalCredits) return "0.00";

    let totalGradePoints = currentCGPA * totalCredits;

    // Handle retake calculations
    selectedCourses.forEach((course) => {
      if (course.creditHours && course.currentGrade && course.expectedGrade) {
        const credits = parseFloat(course.creditHours);
        const previousGrade = parseFloat(course.currentGrade);
        const newGrade = parseFloat(course.expectedGrade);

        if (!isNaN(credits) && !isNaN(previousGrade) && !isNaN(newGrade)) {
          // Subtract previous grade points
          totalGradePoints -= previousGrade * credits;
          // Add new grade points
          totalGradePoints += newGrade * credits;
        }
      }
    });

    const newCGPA = totalGradePoints / totalCredits;
    return isNaN(newCGPA) ? "0.00" : newCGPA.toFixed(2);
  };

  const calculateGPAImprovement = () => {
    if (!transcriptData || !transcriptData.academicRecord) return "0.00";
    if (selectedCourses.length === 0) return "0.00";

    const currentCGPA = transcriptData.academicRecord.cumulativeGPA;
    const newCGPA = parseFloat(calculateNewCGPA());

    if (isNaN(currentCGPA) || isNaN(newCGPA)) return "0.00";

    const improvement = newCGPA - currentCGPA;
    return improvement >= 0 ? improvement.toFixed(2) : "0.00";
  };

  return (
    <div className="p-4">
      {/* Summary Section */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          CGPA Summary (Under Development)
        </h2>
        <p className="text-lg text-rose-600">
          This feature is currently under development. Please check back later
          for updates.
        </p>
        {transcriptData && transcriptData.academicRecord && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 rounded">
              <p className="text-sm text-gray-600">Current CGPA</p>
              <p className="text-2xl font-bold text-blue-600">
                {transcriptData.academicRecord.cumulativeGPA.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded">
              <p className="text-sm text-gray-600">Possible CGPA</p>
              <p className="text-2xl font-bold text-green-600">
                {calculateNewCGPA()}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded">
              <p className="text-sm text-gray-600">Improvement</p>
              <p className="text-2xl font-bold text-purple-600">
                {calculateGPAImprovement()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* File Upload Section */}
      <div className="mb-6">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mb-4 p-2 border rounded"
        />
        {loading && <div className="text-gray-600">Loading...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
      </div>

      {/* Main Content */}
      <div className="lg:flex lg:gap-6">
        {/* Available Courses (Left column on PC, Bottom on mobile) */}
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <h3 className="text-lg font-semibold mb-3">Available Courses</h3>
          <div className="space-y-2">
            {availableCourses.map((course) => (
              <div
                key={course.courseCode}
                className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedCourses.some(
                    (selected) => selected.courseCode === course.courseCode
                  )}
                  onChange={() => handleCourseSelection(course)}
                  className="w-4 h-4"
                />
                <div className="grid grid-cols-3 flex-1 gap-2">
                  <span className="font-medium">{course.courseCode}</span>
                  <span className="truncate">{course.courseTitle}</span>
                  <span className="text-right">{course.currentGrade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Courses (Right column on PC, Top on mobile) */}
        <div className="lg:w-1/2">
          <h3 className="text-lg font-semibold mb-3">Selected Courses</h3>
          {selectedCourses.length > 0 ? (
            <div className="space-y-3">
              {selectedCourses.map((course) => (
                <div
                  key={course.courseCode}
                  className="p-3 border rounded bg-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{course.courseCode}</span>
                    <select
                      value={course.expectedGrade}
                      onChange={(e) =>
                        handleGradeChange(course.courseCode, e.target.value)
                      }
                      className="p-1 border rounded"
                    >
                      {gradeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} ({option.value})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{course.courseTitle}</p>
                    <p>Current Grade: {course.currentGrade}</p>
                    <p>Credit Hours: {course.creditHours}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No courses selected for retake</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RetakeAssistant;
