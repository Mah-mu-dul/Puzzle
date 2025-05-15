import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, BarChart } from "lucide-react";

const planners = [
  {
    title: "Class Routine",
    description: "Organize your class schedule",
    icon: <Calendar className="w-6 h-6" />,
    path: "/routine",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Retake Assistant",
    description: "Plan your course retakes",
    icon: <Clock className="w-6 h-6" />,
    path: "/retake-assistant",
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Credit Cost Calculator",
    description: "Calculate your semester costs",
    icon: <BarChart className="w-6 h-6" />,
    path: "/cost-calculator",
    color: "bg-amber-50 hover:bg-amber-100",
    iconColor: "text-amber-600",
  },
];

const Planners = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Planners & Organizers
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Tools to help you plan your academic schedule and organize your
            courses
          </p>
        </motion.div>
      </section>

      {/* Planners Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planners.map((planner, index) => (
              <motion.div
                key={planner.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={planner.path}>
                  <div
                    className={`p-6 rounded-xl ${planner.color} transition-all duration-300 transform hover:scale-105 shadow-sm`}
                  >
                    <div className={`${planner.iconColor} mb-4`}>
                      {planner.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {planner.title}
                    </h3>
                    <p className="text-gray-600">{planner.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Stay Organized
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Effective planning is key to academic success. Our planning tools
            help you organize your class schedule, plan course retakes, and
            calculate costs to make informed decisions about your academic
            journey.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Planners;
