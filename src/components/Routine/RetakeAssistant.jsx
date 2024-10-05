import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";

const RetakeAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [courses, setCourses] = useState([]); // Changed to store all courses
  const [name, setName] = useState("");
  const [previousCGPA, setPreviousCGPA] = useState("");
  const [previousEarnedCredit, setPreviousEarnedCredit] = useState("");
  const [targetCGPA, setTargetCGPA] = useState(""); // Added state for target CGPA

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const typedarray = new Uint8Array(event.target.result);
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

        // Log the extracted text for debugging
        console.log("Extracted Text:", fullText);

        // Extract and set name
        const extractedName = fullText[2].split("   ")[1];
        if (extractedName) setName(extractedName);

        // Extract and set previous CGPA
        const extractedCGPA = fullText[fullText.length - 1].split("   ").pop();
        if (!isNaN(parseFloat(extractedCGPA))) setPreviousCGPA(extractedCGPA);

        // Extract and set total earned credit
        const totalEarnedCredit = fullText[fullText.length - 3]
          .split("   ")
          .pop();
        const parsedCredit = parseInt(totalEarnedCredit, 10);
        if (!isNaN(parsedCredit)) setPreviousEarnedCredit(parsedCredit);

        // Process course information
        const courseInfoRaw = fullText.slice(6, -4);
        let allCourses = {}; // Use an object to store courses by course code

        for (const line of courseInfoRaw) {
          if (!line.startsWith("Course") && line.trim() !== "") {
            const courseDetails = line
              .split("   ")
              .filter((item) => item.trim() !== "");
            const courseCode = courseDetails[0]; // Assuming the first item is the course code
            // Store the last occurrence of the course details
            allCourses[courseCode] = courseDetails;
          }
        }

        // Convert the object back to an array
        const uniqueCourses = Object.values(allCourses);

        console.log("Unique Courses:", uniqueCourses); // Log unique courses

        setCourses(uniqueCourses); // Set unique courses
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <>
      <button
        className="bg-transparent px-3 lg:mb-10 md:mb-10 py-1 mt-3 hover:bg-amber-200 border-2 border-rose-400 rounded"
        onClick={() => setIsOpen(true)}
      >
        Retake Assistant
      </button>
      {isOpen && (
        <dialog className="modal" open>
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">Upload Transcript</h3>
            <p className="py-4">Please upload your transcript file:</p>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            <br />
            <label htmlFor="targetcg">Target CGPA:</label>
            <input
              type="number"
              min="0.00"
              max="4.00"
              step="0.01"
              id="targetcg"
              placeholder="Target CGPA"
              onChange={(e) => setTargetCGPA(e.target.value)} // Updated to use targetCGPA state
              className="bg-transparent px-2 w-28 ml-2 rounded border-2 border-rose-400 "
            />
            <br />
            <button className="btn mt-4" onClick={handleUpload}>
              Submit
            </button>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default RetakeAssistant;
