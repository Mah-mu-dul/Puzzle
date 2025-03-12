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
    title: "3-6-9 Clap Game",
    description: "A fun number game where you clap for 3, 6, and 9!",
    icon: <FaHandsClapping className="w-6 h-6" />,
    path: "/clap369",
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Sudoku Solver",
    description: "Solve any Sudoku puzzle instantly",
    icon: <Grid3X3 className="w-6 h-6" />,
    path: "/solver/sudoku",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },

  {
    title: "QR Generator",
    description: "Create QR codes easily",
    icon: <QrCode className="w-6 h-6" />,
    path: "/qr",
    color: "bg-amber-50 hover:bg-amber-100",
    iconColor: "text-amber-600",
  },

  {
    title: "Morse Code",
    description: "Convert text to morse code",
    icon: <MessageSquare className="w-6 h-6" />,
    path: "/convert/morsecode",
    color: "bg-red-50 hover:bg-red-100",
    iconColor: "text-red-600",
  },

  // {
  //   title: "Games 2048",
  //   description: "2048, TicTacToe, Connect4",
  //   icon: <GamepadIcon className="w-6 h-6" />,
  //   path: "/game2048",
  //   color: "bg-teal-50 hover:bg-teal-100 ",
  //   iconColor: "text-teal-600",
  // },
  {
    title: "Transcript Analyzer",
    description: "Analyze academic transcripts",
    icon: <GraduationCap className="w-6 h-6" />,
    path: "/transcript-analyzer",
    color: "bg-indigo-50 hover:bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];

const Home = () => {
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
            entertainment
          </p>
        </motion.div>
      </section>

      {/* Tools Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
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

      {/* Bottom Ad Space */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        <div className="w-full h-[100px]  rounded-lg flex items-center justify-center"></div>
      </div>
    </div>
  );
};

export default Home;
