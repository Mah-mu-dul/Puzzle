import React, { useState } from "react";
import PreviousSemQuestionsFilters from "../components/previousSemQuestions/PreviousSemQuestionsFilters";
import PreviousSemQuestionsGrid from "../components/previousSemQuestions/PreviousSemQuestionsGrid";
import { FaRegSadTear, FaPlusCircle, FaGraduationCap } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const groupByYearSemester = (questions) => {
  const grouped = {};
  questions.forEach((q) => {
    if (!grouped[q.year]) grouped[q.year] = {};
    if (!grouped[q.year][q.semester]) grouped[q.year][q.semester] = [];
    grouped[q.year][q.semester].push(q);
  });
  return grouped;
};

const PreviousSemQuestions = () => {
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  // Dummy data for demonstration
  const questions = [
    {
      id: 1,
      courseCode: "CSE101",
      courseName: "Introduction to Programming",
      images: ["/sample1.png", "/sample2.png"],
      semester: "Spring",
      year: "2023",
      contributor: "Alice",
    },
    {
      id: 2,
      courseCode: "EEE201",
      courseName: "Circuits",
      images: [
        "https://i.pinimg.com/736x/6a/f9/6c/6af96c6098bbe82c0af7f2e2fb7b9412.jpg",
      ],
      semester: "Autumn",
      year: "2022",
      contributor: "Bob",
    },
    {
      id: 3,
      courseCode: "MTH203",
      courseName: "Advanced Calculus and Mathematical Methods",
      images: [
        "https://www.splashlearn.com/teaching/website/pages/teach-calculus-to-your-kids.jpg",
      ],
      semester: "Spring",
      year: "2023",
      contributor: "Charlie",
    },
    {
      id: 4,
      courseCode: "BIO101",
      courseName: "Introduction to Biology",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0R-Hmhdr-QF_CW2pTRTblWsVbHHMjOR5zSA&s",
      ],
      semester: "Summer",
      year: "2023",
      contributor: "Dana",
    },
    {
      id: 5,
      courseCode: "ENG105",
      courseName: "Technical Writing and Communication",
      images: [
        "https://i.pinimg.com/originals/72/2e/3b/722e3b0bfa85b34079008b3969f7056c.jpg",
      ],
      semester: "Autumn",
      year: "2023",
      contributor: "Eve",
    },
    {
      id: 6,
      courseCode: "PHY301",
      courseName: "Modern Physics and Quantum Mechanics",
      images: [
        "https://www.physicsoffun.com/wp-content/uploads/2020/07/Quantum-Mechanics.jpg",
      ],
      semester: "Spring",
      year: "2024",
      contributor: "Frank",
    },
    {
      id: 7,
      courseCode: "CHEM202",
      courseName: "Organic Chemistry and Lab Techniques",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0R-Hmhdr-QF_CW2pTRTblWsVbHHMjOR5zSA&s",
      ],
      semester: "Autumn",
      year: "2023",
      contributor: "Grace",
    },
    {
      id: 8,
      courseCode: "CSE302",
      courseName: "Data Structures and Algorithms",
      images: [
        "https://i.pinimg.com/originals/0e/99/c6/0e99c6a57e8fae9fa249ce04a9b7f940.jpg",
      ],
      semester: "Spring",
      year: "2024",
      contributor: "Hannah",
    },
    {
      id: 9,
      courseCode: "ART101",
      courseName: "Introduction to Fine Arts",
      images: [
        "https://www.floridaschoolofthearts.edu/wp-content/uploads/2017/07/fine-art-class.jpg",
      ],
      semester: "Summer",
      year: "2024",
      contributor: "Ian",
    },
    {
      id: 10,
      courseCode: "HIST200",
      courseName: "World History and Civilization",
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Audiencia_Royal_Tone.jpg/1200px-Audiencia_Royal_Tone.jpg",
      ],
      semester: "Autumn",
      year: "2023",
      contributor: "Jenna",
    },
    // ... more data
  ];

  // Filter logic
  const filteredQuestions = questions.filter((q) => {
    const searchLower = search.toLowerCase();
    return (
      (!search ||
        q.courseName.toLowerCase().includes(searchLower) ||
        q.courseCode.toLowerCase().includes(searchLower) ||
        q.contributor.toLowerCase().includes(searchLower)) &&
      (!semester || q.semester === semester) &&
      (!year || q.year === year)
    );
  });

  // Group by year and semester
  const grouped = groupByYearSemester(filteredQuestions);
  const availableYears = Object.keys(grouped).sort((a, b) => b - a);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span className="text-blue-600">
          <FaPlusCircle className="inline-block mr-2 text-3xl" />
        </span>
        Previous Semester Questions
      </h1>
      <PreviousSemQuestionsFilters
        search={search}
        setSearch={setSearch}
        semester={semester}
        setSemester={setSemester}
        year={year}
        setYear={setYear}
      />
      {filteredQuestions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16"
        >
          <FaRegSadTear className="text-6xl text-blue-300 mb-4 animate-bounce" />
          <div className="text-xl font-semibold mb-2 text-gray-700">
            No questions found!
          </div>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
            onClick={() => navigate("/contribute")}
          >
            <FaPlusCircle className="text-lg" />
            Contribute a Question
          </button>
        </motion.div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {availableYears.map((yr, idx) => (
            <div key={yr} className="w-fit min-w-96 max-w-full border-b-2 pb-4">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold text-blue-700 mb-2 flex flex-col items-center justify-center text-center"
              >
                <span className="flex items-center justify-center text-3xl mb-1">
                  <span className="mr-2">
                    <FaPlusCircle className="inline-block text-blue-400" />
                  </span>
                  {yr}
                </span>
              </motion.h2>
              <div className="flex flex-wrap gap-8 justify-center">
                {Object.keys(grouped[yr]).map((sem) => (
                  <div key={sem} className="mb-6 border-l-2 pl-4">
                    <motion.h3
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-lg font-semibold text-purple-700 mb-2 flex items-center gap-2"
                    >
                      <span className="text-xl">
                        <FaGraduationCap className="inline-block text-purple-400" />
                      </span>{" "}
                      {sem}
                    </motion.h3>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PreviousSemQuestionsGrid
                          questions={grouped[yr][sem]}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousSemQuestions;
