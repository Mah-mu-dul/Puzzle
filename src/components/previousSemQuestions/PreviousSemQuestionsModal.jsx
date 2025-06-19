import React, { useState } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
} from "react-icons/fa";

const PreviousSemQuestionsModal = ({
  question,
  initialImgIdx = 0,
  onClose,
}) => {
  const [imgIdx, setImgIdx] = useState(initialImgIdx);
  const { courseCode, courseName, images, semester, year, contributor } =
    question;

  const handlePrev = () =>
    setImgIdx((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  const handleNext = () =>
    setImgIdx((idx) => (idx === images.length - 1 ? 0 : idx + 1));

  const handleDownload = () => {
    // Placeholder: implement download logic
    alert("Download not implemented");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <div className="flex flex-col items-center">
          <div className="relative w-full h-72 flex items-center justify-center mb-4">
            <img
              src={images[imgIdx]}
              alt={courseName}
              className="max-h-64 max-w-full rounded object-contain mx-auto"
            />
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 text-lg"
                  onClick={handlePrev}
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 text-lg"
                  onClick={handleNext}
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
          <div className="w-full flex flex-col gap-2 mb-2">
            <div className="font-semibold text-xl">{courseCode}</div>
            <div className="text-gray-700 text-base">{courseName}</div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                {semester} {year}
              </span>
              <span>By {contributor}</span>
            </div>
            <div className="text-xs text-gray-500">
              {images.length} image{images.length > 1 ? "s" : ""}
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
            onClick={handleDownload}
          >
            <FaDownload /> Download All
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviousSemQuestionsModal;
