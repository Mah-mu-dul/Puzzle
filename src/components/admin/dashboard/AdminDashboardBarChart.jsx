import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminDashboardBarChart({ questions }) {
  // Questions per year
  const yearData = Object.values(
    questions.reduce((acc, q) => {
      if (!q.year) return acc;
      acc[q.year] = acc[q.year] || { year: q.year, count: 0 };
      acc[q.year].count++;
      return acc;
    }, {})
  ).sort((a, b) => a.year - b.year);

  // Questions per faculty
  const facultyData = Object.values(
    questions.reduce((acc, q) => {
      if (!q.facultyName) return acc;
      acc[q.facultyName] = acc[q.facultyName] || {
        faculty: q.facultyName,
        count: 0,
      };
      acc[q.facultyName].count++;
      return acc;
    }, {})
  ).sort((a, b) => a.faculty.localeCompare(b.faculty));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold mb-4 text-blue-700">
          Questions per Year
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={yearData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold mb-4 text-green-700">
          Questions per Faculty
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={facultyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} />
            <YAxis dataKey="faculty" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
