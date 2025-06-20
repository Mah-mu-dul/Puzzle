import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calculator,
  Calendar,
  GamepadIcon,
  Grid3X3,
  Youtube,
  QrCode,
  Brain,
  School,
  MessageSquare,
  Wallet,
  Layout,
  GraduationCap,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  Upload,
} from "lucide-react";
import { FaHandsClapping } from "react-icons/fa6";

const tools = [
  {
    title: "CGPA Calculator",
    description: "Calculate your academic performance",
    icon: <Calculator className="w-6 h-6" />,
    path: "/calculate-cg",
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Class Routine",
    description: "Organize your class schedule",
    icon: <Calendar className="w-6 h-6" />,
    path: "/routine",
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },

  {
    title: "Automata Course Material",
    description: "Explore course materials for Automata",
    icon: <Brain className="w-6 h-6" />,
    path: "/courses/automata",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Cost Calculator",
    description: "Calculate your credit cost",
    icon: <Calculator className="w-6 h-6" />,
    path: "/cost-calculator",
    color: "bg-rose-50 hover:bg-rose-100",
    iconColor: "text-rose-600",
  },

  {
    title: "Course Project Circuits",
    description: "Explore electronics and robotics projects",
    icon: <Layout className="w-6 h-6" />,
    path: "/courses",
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Money Manager",
    description: "Track your expenses",
    icon: <Wallet className="w-6 h-6" />,
    path: "/money-management",
    color: "bg-cyan-50 hover:bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    title: "Previous Semester Questions",
    description: "Browse and download past exam questions",
    icon: <BookOpen className="w-6 h-6" />,
    path: "/previous-sem-questions",
    color: "bg-cyan-50 hover:bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    title: "Contribute a Question",
    description: "Share your own previous questions with others",
    icon: <Upload className="w-6 h-6" />,
    path: "/contribute",
    color: "bg-lime-50 hover:bg-lime-100",
    iconColor: "text-lime-600",
  },
];

const StudentsTools = () => {
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
            Student's Essential Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            All-in-one platform for academic planning, calculations, and
            resource management designed specifically for university students
          </p>
          <p className="text-lg text-gray-500">
            Boost your productivity and academic performance with our carefully
            crafted tools
          </p>
        </motion.div>
      </section>

      {/* Tools Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-center text-gray-800 mb-10"
          >
            Explore Our Tools Collection
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={tool.path}>
                  <div
                    className={`p-6 rounded-xl ${tool.color} transition-all duration-300 transform hover:scale-105`}
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

      {/* Testimonial/CTA Section */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl shadow-sm"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Join Thousands of Successful Students
            </h3>
            <p className="text-gray-700 mb-6">
              Our tools have helped students improve their GPA, manage their
              time more effectively, and reduce academic stress. Start using our
              free tools today and take control of your academic journey.
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-600 font-medium">
              <GraduationCap className="w-5 h-5" />
              <span>Created by students, for students</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default StudentsTools;
