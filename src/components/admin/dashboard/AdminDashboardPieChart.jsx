import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e42",
  "#a78bfa",
  "#f43f5e",
  "#fbbf24",
  "#6366f1",
];

export default function AdminDashboardPieChart({ questions }) {
  // Question types
  const typeCounts = questions.reduce((acc, q) => {
    if (!q.type) return acc;
    acc[q.type] = (acc[q.type] || 0) + 1;
    return acc;
  }, {});
  const typeData = Object.entries(typeCounts).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  // Questions per semester
  const semesterCounts = questions.reduce((acc, q) => {
    if (!q.semester) return acc;
    acc[q.semester] = (acc[q.semester] || 0) + 1;
    return acc;
  }, {});
  const semesterData = Object.entries(semesterCounts).map(
    ([semester, count]) => ({ name: semester, value: count })
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold mb-4 text-blue-700">Question Types</div>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={typeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {typeData.map((entry, idx) => (
                <Cell
                  key={`cell-type-${idx}`}
                  fill={COLORS[idx % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold mb-4 text-purple-700">
          Questions per Semester
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={semesterData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {semesterData.map((entry, idx) => (
                <Cell
                  key={`cell-semester-${idx}`}
                  fill={COLORS[(idx + 3) % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
