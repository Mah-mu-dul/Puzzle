import React from "react";
import PreviousSemQuestionsCard from "./PreviousSemQuestionsCard";
import { motion } from "framer-motion";
import {
  FaBook,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaClipboardList,
} from "react-icons/fa";

const PreviousSemQuestionsGrid = ({ questions }) => {
  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {questions.map((q, i) => {
        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 80 }}
            className="flex flex-col items-center"
          >
            <PreviousSemQuestionsCard question={q} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default PreviousSemQuestionsGrid;
