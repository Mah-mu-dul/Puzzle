import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Calculator, BarChart2 } from "lucide-react";

const academicTools = [
  {
    title: "CGPA Calculator",
    description: "Calculate your academic performance",
    icon: <Calculator className="w-6 h-6" />,
    path: "/calculate-cg",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Transcript Analyzer",
    description: "Analyze your academic transcript",
    icon: <GraduationCap className="w-6 h-6" />,
    path: "/transcript-analyzer",
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
  },
];

const AcademicAnalysis = () => {
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
            Academic Analysis Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Analyze and track your academic performance
          </p>
        </motion.div>
      </section>

      {/* Academic Tools Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicTools.map((tool, index) => (
              <motion.div
                key={tool.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={tool.path}>
                  <div
                    className={`p-6 rounded-xl ${tool.color} transition-all duration-300 transform hover:scale-105 shadow-sm`}
                  >
                    <div className={`${tool.iconColor} mb-4`}>{tool.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600">{tool.description}</p>
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
            Track Your Academic Progress
          </h2>
          <div className="bg-cyan-50 p-8 rounded-xl shadow-sm">
            <div className="text-cyan-600 mb-4">
              <BarChart2 className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              Academic Performance Tracking
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Our academic analysis tools help you track your performance
              throughout your educational journey. With these tools, you can:
            </p>
            <ul className="text-left text-gray-700 max-w-lg mx-auto space-y-2">
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2">✓</span>
                <span>Calculate your current and projected CGPA</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2">✓</span>
                <span>
                  Analyze your transcript data to identify strengths and areas
                  for improvement
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2">✓</span>
                <span>Make data-driven decisions about your academic path</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicAnalysis;
