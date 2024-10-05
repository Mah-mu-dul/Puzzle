import React, { useState, useRef, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";

// Set worker path for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const parseTranscriptPDF = async (file, onProgress) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        onProgress(10); // PDF loaded

        let lines = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          let currentLine = "";
          textContent.items.forEach((item) => {
            if (item.str.trim() !== "") {
              currentLine += item.str + " ";
            }
            if (item.hasEOL) {
              if (currentLine.trim() !== "") {
                lines.push(currentLine.trim());
              }
              currentLine = "";
            }
          });
          // Push the last line if it's not empty
          if (currentLine.trim() !== "") {
            lines.push(currentLine.trim());
          }
          onProgress(10 + (i / pdf.numPages) * 80); // Update progress as pages are processed
        }

        // Split the array into three parts
        const personalInfo = lines.slice(0, 5);
        const conclusionInfo = lines.slice(-4);
        const courseInfo = lines.slice(5, -5);
        // Remove the first item from courseInfo
        courseInfo.shift();

        // Create a 2D array from courseInfo
        const courseInfoArray = [];
        let currentSemester = [];

        courseInfo.forEach((line) => {
          if (line.startsWith("GPA :")) {
            currentSemester.push(line.trim());
            courseInfoArray.push(currentSemester);
            currentSemester = [];
          } else if (line.includes("Semester Total :")) {
            currentSemester.push(line.trim());
          } else if (line.match(/^[A-Z]+ \d{4}$/)) {
            if (currentSemester.length > 0) {
              courseInfoArray.push(currentSemester);
            }
            currentSemester = [line.trim()];
          } else {
            currentSemester.push(line.trim());
          }
        });

        if (currentSemester.length > 0) {
          courseInfoArray.push(currentSemester);
        }

        const lastSemester = courseInfoArray[courseInfoArray.length - 1];
        const extractedCourses = lastSemester.slice(1, -1).map((course) => {
          const parts = course.split(" ");
          const courseCode = parts[0];
          const credit = parseFloat(parts[parts.length - 4]);
          const courseTitle = parts.slice(1, -5).join(" ");
          return { courseCode, courseTitle, credit };
        });
        console.log(courseInfoArray);
        console.log("Extracted Courses:", extractedCourses);

        // Extract credits from conclusionInfo
        const creditsLine = conclusionInfo.find((line) =>
          line.includes("Total Credits Earned :")
        );
        const credits = creditsLine ? creditsLine.split(":")[1].trim() : "N/A";

        onProgress(100); // Parsing complete
        resolve({
          personalInfo,
          courseInfo: extractedCourses,
          conclusionInfo,
          credits,
        });
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const TranscriptAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [transcriptInfo, setTranscriptInfo] = useState(null);
  const [name, setName] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [credits, setCredits] = useState("");
  const [courses, setCourses] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleError = (event) => {
      console.error("Unhandled error:", event.error);
      setError(`An unexpected error occurred: ${event.error.message}`);
      modalRef.current.checked = true;
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please select a valid PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF file first.");
      modalRef.current.checked = true;
      return;
    }
    setLoading(true);
    setProgress(0);
    setError(null);
    try {
      const info = await parseTranscriptPDF(file, setProgress);
      console.log("Extracted Data:", info);
      setTranscriptInfo(info);
      setName(info.personalInfo[0]);
      setCgpa(info.conclusionInfo[1].split(":")[1].trim());
      setCredits(info.credits);
      setCourses(info.courseInfo);
    } catch (err) {
      setError(`Error parsing PDF: ${err.message}`);
      modalRef.current.checked = true;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">PDF Transcript Viewer</h1>
      {transcriptInfo && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Transcript Information:
          </h2>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>GPA:</strong> {cgpa}
          </p>
          <p>
            <strong>Total Credits Earned:</strong> {credits}
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Courses:</h3>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Credit</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseCode}</td>
                  <td>{course.courseTitle}</td>
                  <td>{course.credit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="pdf-upload"
          >
            Upload PDF
          </label>
          <input
            id="pdf-upload"
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
        <button
          type="submit"
          className={`btn ${loading ? "btn-disabled" : "btn-primary"}`}
          disabled={!file || loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {loading && (
        <div className="mb-6">
          <progress
            className="progress progress-primary w-full"
            value={progress}
            max="100"
          ></progress>
          <p className="text-sm mt-2">
            Extracting data: {Math.round(progress)}% complete
          </p>
        </div>
      )}

      {/* DaisyUI Modal for Error Alert */}
      <input
        type="checkbox"
        id="error-modal"
        className="modal-toggle"
        ref={modalRef}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Error</h3>
          <p className="py-4">{error}</p>
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

export default TranscriptAnalyzer;
