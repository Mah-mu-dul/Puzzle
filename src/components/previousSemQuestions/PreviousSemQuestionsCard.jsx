import React, { useState, useMemo } from "react";
import { FaDownload, FaExpand } from "react-icons/fa";
import PreviousSemQuestionsModal from "./PreviousSemQuestionsModal";

const SOFT_COLORS = [
  "bg-blue-50",
  "bg-purple-50",
  "bg-green-50",
  "bg-amber-50",
  "bg-rose-50",
  "bg-cyan-50",
  "bg-red-50",
  "bg-emerald-50",
  "bg-indigo-50",
  "bg-pink-50",
  "bg-yellow-50",
];

const Card = ({ question }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Assign a random color per card instance
  const cardBg = useMemo(() => {
    // Use courseCode or id for deterministic color, fallback to random
    const key = question.courseCode || question.id || Math.random();
    let hash = 0;
    for (let i = 0; i < key.length; i++)
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    return SOFT_COLORS[Math.abs(hash) % SOFT_COLORS.length];
  }, [question.courseCode, question.id]);

  const { courseCode, courseName, images, semester, year, contributor } =
    question;

  const handleDownload = (e) => {
    e.stopPropagation();
    // Placeholder: implement download logic
    alert("Download not implemented");
  };

  return (
    <div
      className={`w-[22rem] ${cardBg} rounded-xl shadow-lg p-4   relative transition hover:shadow-2xl duration-200`}
      style={{ minHeight: 340 }}
    >
      <div className="relative w-full h-40 mb-3 cursor-pointer group">
        <img
          src={images[imgIdx]}
          alt={courseName}
          className="w-full h-full object-cover rounded transition duration-200"
          onClick={() => setModalOpen(true)}
        />

        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/30 rounded"
          onClick={() => setModalOpen(true)}
        >
          <FaExpand className="text-white text-2xl" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-1">
        <div className="font-semibold text-lg text-gray-800">{courseCode}</div>
        <div className="text-gray-700 text-md mb-1 font-semibold">
          {courseName}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          {semester} {year}
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs">
            {images.length} image{images.length > 1 ? "s" : ""}
          </span>
          <span>By {contributor}</span>
        </div>
        <button
          className="flex items-center gap-1 px-5 py-2 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 justify-center w-fit mx-auto"
          onClick={handleDownload}
        >
          <FaDownload /> Download
        </button>
      </div>
      {modalOpen && (
        <PreviousSemQuestionsModal
          question={question}
          initialImgIdx={imgIdx}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Card;
