import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalculator, FaMicrochip, FaPowerOff, FaCogs } from 'react-icons/fa';

const courses = [
  {
    title: "DLD (CSE204)",
    description: "Delve into the world of digital logic design.",
    path: "/courses/dld",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
    icon: FaMicrochip,
  },
  {
    title: "Circuit Analysis (CSE104)",
    description: "Master the art of circuit analysis.",
    path: "/courses/circuit-analysis",
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
    icon: FaCalculator,
  },
  {
    title: "Electronics 1 (CSE210)",
    description: "Explore the fundamentals of electronics.",
    path: "/courses/electronics-1",
    color: "bg-yellow-50 hover:bg-yellow-100",
    iconColor: "text-yellow-600",
    icon: FaPowerOff,
  },
  {
    title: "Electronics 2 (CSE310)",
    description: "Advance your knowledge of electronics.",
    path: "/courses/electronics-2",
    color: "bg-red-50 hover:bg-red-100",
    iconColor: "text-red-600",
    icon: FaCogs,
  },
];

const Circuit = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Courses Section */}
      <section className="pt-20 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Circuit Design Courses
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore our courses to enhance your circuit design skills.
          </p>
        </motion.div>
      </section>

      {/* Courses Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={course.path}>
                  <div
                    className={`p-6 rounded-xl ${course.color} transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className={`${course.iconColor} mb-4`}>
                      <course.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600">{course.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Circuit;
