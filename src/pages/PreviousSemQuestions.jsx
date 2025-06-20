import React, { useState, useEffect } from "react";
import PreviousSemQuestionsFilters from "../components/previousSemQuestions/PreviousSemQuestionsFilters";
import PreviousSemQuestionsGrid from "../components/previousSemQuestions/PreviousSemQuestionsGrid";
import {
  FaRegSadTear,
  FaPlusCircle,
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebase.config";

const QUESTIONS_PER_PAGE = 12;

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
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [pageCursors, setPageCursors] = useState([null]);
  const navigate = useNavigate();

  // Fetch total count for pagination
  useEffect(() => {
    (async () => {
      const snap = await getCountFromServer(collection(db, "questions"));
      const total = snap.data().count;
      setTotalPages(Math.max(1, Math.ceil(total / QUESTIONS_PER_PAGE)));
    })();
  }, []);

  // Fetch questions for current page
  useEffect(() => {
    setLoading(true);
    setError(null);
    (async () => {
      try {
        let q = query(
          collection(db, "questions"),
          orderBy("uploadTime", "desc"),
          limit(QUESTIONS_PER_PAGE)
        );
        if (page > 1 && pageCursors[page - 1]) {
          q = query(
            collection(db, "questions"),
            orderBy("uploadTime", "desc"),
            startAfter(pageCursors[page - 1]),
            limit(QUESTIONS_PER_PAGE)
          );
        }
        const snap = await getDocs(q);
        const docs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setQuestions(docs);
        // Save cursor for next page
        const newCursors = [...pageCursors];
        newCursors[page] = snap.docs[snap.docs.length - 1];
        setPageCursors(newCursors);
        setLastVisible(snap.docs[snap.docs.length - 1]);
      } catch (e) {
        setError("Failed to fetch questions");
        setQuestions([]);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, [page]);

  // Filter logic (client-side for search/filters)
  const filteredQuestions = questions.filter((q) => {
    const searchLower = search.toLowerCase();
    const keywordMatch = Array.isArray(q.keyword)
      ? q.keyword.some((kw) => kw.toLowerCase().includes(searchLower))
      : false;
    return (
      (!search ||
        q.courseName.toLowerCase().includes(searchLower) ||
        q.courseCode.toLowerCase().includes(searchLower) ||
        (q.contributor || "").toLowerCase().includes(searchLower) ||
        keywordMatch) &&
      (!semester || q.semester === semester) &&
      (!year || q.year === year) &&
      (!type || q.type === type)
    );
  });

  // Group by year and semester
  const grouped = groupByYearSemester(filteredQuestions);
  const availableYears = Object.keys(grouped).sort((a, b) => b - a);

  // Pagination controls
  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // Fancy pagination bar logic
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-4xl  font-bold mb-4 text-center">
        Previous Semester Questions
      </h1>
      {/* Caution/Info Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col md:flex-row items-center gap-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl shadow-sm"
      >
        <div className="flex items-center gap-3 text-yellow-600 text-2xl">
          <FaExclamationTriangle className="animate-bounce" />
          <span className="font-bold text-lg">Caution!</span>
        </div>
        <div className="text-yellow-800 text-base flex-1">
          <span className="font-semibold text-blue-700">
            This page showcases previous year questions from various IUB
            courses, contributed by students.
          </span>{" "}
          The collection is growing and covers a range of IUB subjects.{" "}
          <br className="hidden md:block" />
          <span className="block mt-2">
            These questions are{" "}
            <span className="font-semibold">user-contributed</span> and may
            contain errors, outdated information, or unofficial content. Always
            verify with your instructor or official sources before relying on
            them. Use these resources responsibly and ethically!
          </span>
        </div>
        <div className="hidden md:block text-yellow-500 text-3xl">
          <FaInfoCircle className="animate-pulse" />
        </div>
      </motion.div>
      {/* Contribute Button */}
      <motion.button
        className="mb-8 px-6 py-3 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition text-lg font-semibold shadow-lg mx-auto block"
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.04 }}
        onClick={() => navigate("/contribute")}
      >
        <FaPlusCircle className="text-xl" />
        Contribute a New Question
      </motion.button>
      <PreviousSemQuestionsFilters
        search={search}
        setSearch={setSearch}
        semester={semester}
        setSemester={setSemester}
        year={year}
        setYear={setYear}
        type={type}
        setType={setType}
      />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-lg text-blue-600">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="mb-4"
          >
            <FaSpinner className="text-6xl text-blue-400 animate-spin" />
          </motion.div>
          <div className="text-xl font-semibold animate-pulse">
            Loading questions...
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 text-lg text-red-600">
          {error}
        </div>
      ) : filteredQuestions.length === 0 ? (
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
        <>
          <div className="flex flex-wrap gap-8 justify-between">
            {availableYears.map((yr, idx) => (
              <div
                key={yr}
                className="w-fit min-w-[20rem] max-w-full border-b-2 pb-4"
              >
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
                <div className="flex flex-wrap gap-8 justify-between">
                  {Object.keys(grouped[yr]).map((sem) => (
                    <div key={sem} className="mb-6 border-l-2 px-4">
                      <motion.h3
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-lg font-semibold text-purple-700 mb-2 flex items-center gap-2"
                      >
                        <span className="text-xl">
                          <FaGraduationCap className="inline-block text-purple-400" />
                        </span>
                        {sem} '{yr.slice(2)}
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
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              className={`flex items-center px-3 py-2 rounded-full transition-all duration-200 shadow-sm ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-600"
              }`}
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
            >
              <FaChevronLeft />
            </button>
            {getPageNumbers().map((p, idx) =>
              p === "..." ? (
                <span
                  key={"ellipsis-" + idx}
                  className="px-2 text-xl text-gray-400 select-none"
                >
                  …
                </span>
              ) : (
                <motion.button
                  key={p}
                  whileTap={{ scale: 0.9 }}
                  className={`px-3 py-2 rounded-full mx-1 font-semibold transition-all duration-200 shadow-sm ${
                    p === page
                      ? "bg-blue-500 text-white scale-110"
                      : "bg-gray-100 hover:bg-blue-200 text-blue-700"
                  }`}
                  onClick={() => goToPage(p)}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </motion.button>
              )
            )}
            <button
              className={`flex items-center px-3 py-2 rounded-full transition-all duration-200 shadow-sm ${
                page === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-600"
              }`}
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PreviousSemQuestions;
