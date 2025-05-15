import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { formatTranscriptData } from "./transcriptDataFormatter";

const TranscriptAnalyzer3 = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [extractedData, setExtractedData] = useState(null);

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
        setExtractedData(formattedData);

        // Console logs for different sections of the data
        console.log("Raw Extracted Text:", fullText);
        console.log("Formatted Transcript Data:", formattedData);
        console.log("Student Information:", {
          name: formattedData.studentName,
          id: formattedData.studentId,
          majors: formattedData.majors,
          minors: formattedData.minors,
          address: formattedData.address,
        });
        console.log("Academic Summary:", {
          totalCredits: formattedData.academicRecord.totalCreditsAttempted,
          earnedCredits: formattedData.academicRecord.totalCreditsEarned,
          gpa: formattedData.academicRecord.cumulativeGPA,
          totalGradePoints: formattedData.academicRecord.totalGradePoints,
        });
        console.log(
          "Semester Details:",
          formattedData.academicRecord.semesters
        );

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error extracting PDF:", err);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded"
      />
      {loading && (
        <div className="mt-4">
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
      {extractedData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Extracted Data Preview:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(extractedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TranscriptAnalyzer3;
