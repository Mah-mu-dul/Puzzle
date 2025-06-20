import React from "react";

const semesters = ["Spring", "Autumn", "Summer"];
const years = ["2024", "2023", "2022", "2021", "2020"];
const types = ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Mid", "Final"];

const PreviousSemQuestionsFilters = ({
  search,
  setSearch,
  semester,
  setSemester,
  year,
  setYear,
  type,
  setType,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      <input
        type="text"
        placeholder="Search by course name, code, or contributor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-blue-200 bg-transparent rounded px-3 py-2 w-[14rem] md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400 transition"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border  border-blue-200 bg-transparent rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
      >
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <select
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        className="border border-blue-200 bg-transparent rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
      >
        <option value="">All Semesters</option>
        {semesters.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border border-blue-200 bg-transparent rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
      >
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PreviousSemQuestionsFilters;
