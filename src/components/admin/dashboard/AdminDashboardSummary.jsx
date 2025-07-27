import React from "react";
import {
  FaQuestionCircle,
  FaBook,
  FaImages,
  FaUserTie,
  FaUserSecret,
  FaHourglassHalf,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

export default function AdminDashboardSummary({ questions }) {
  const totalQuestions = questions.length;
  const uniqueCourses = new Set(questions.map((q) => q.courseCode)).size;
  const totalImages = questions.reduce(
    (sum, q) => sum + (Array.isArray(q.images) ? q.images.length : 0),
    0
  );
  const totalFaculties = new Set(questions.map((q) => q.facultyName)).size;
  const contributorsSet = new Set(
    questions
      .filter((q) => !q.anonymous)
      .map((q) =>
        (
          q.contributor ||
          q.contributorName ||
          q.contributorEmail ||
          q.email ||
          q.userName ||
          q.userEmail ||
          ""
        ).toLowerCase()
      )
      .filter(Boolean)
  );
  const totalContributors = contributorsSet.size;
  const totalPending = questions.filter(
    (q) => q.status?.toLowerCase() === "pending"
  ).length;
  const totalApproved = questions.filter(
    (q) => q.status?.toLowerCase() === "approved"
  ).length;
  const totalAnonymous = questions.filter((q) => q.anonymous).length;

  const cards = [
    {
      label: "Total Questions",
      value: totalQuestions,
      icon: <FaQuestionCircle className="text-blue-500 w-7 h-7" />,
      color: "bg-blue-50",
    },
    {
      label: "Unique Courses",
      value: uniqueCourses,
      icon: <FaBook className="text-green-500 w-7 h-7" />,
      color: "bg-green-50",
    },
    {
      label: "Total Images",
      value: totalImages,
      icon: <FaImages className="text-purple-500 w-7 h-7" />,
      color: "bg-purple-50",
    },
    {
      label: "Total Faculties",
      value: totalFaculties,
      icon: <FaUserTie className="text-yellow-500 w-7 h-7" />,
      color: "bg-yellow-50",
    },
    {
      label: "Contributors",
      value: totalContributors,
      icon: <FaUsers className="text-pink-500 w-7 h-7" />,
      color: "bg-pink-50",
    },
    {
      label: "Pending",
      value: totalPending,
      icon: <FaHourglassHalf className="text-orange-500 w-7 h-7" />,
      color: "bg-orange-50",
    },
    {
      label: "Approved",
      value: totalApproved,
      icon: <FaCheckCircle className="text-green-600 w-7 h-7" />,
      color: "bg-green-100",
    },
    {
      label: "Anonymous",
      value: totalAnonymous,
      icon: <FaUserSecret className="text-gray-500 w-7 h-7" />,
      color: "bg-gray-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl p-6 flex flex-col items-center shadow ${card.color}`}
        >
          {card.icon}
          <div className="text-2xl font-bold mt-2">{card.value}</div>
          <div className="text-gray-600 text-sm mt-1 text-center">
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
}
