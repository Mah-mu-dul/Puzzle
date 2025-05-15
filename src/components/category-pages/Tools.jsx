import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calculator,
  QrCode,
  MessageSquare,
  FileText,
  Scale,
} from "lucide-react";

const tools = [
  {
    title: "Word Counter",
    description: "Count words, characters, and analyze text",
    icon: <FileText className="w-6 h-6" />,
    path: "/word-count",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "QR Generator",
    description: "Create QR codes easily",
    icon: <QrCode className="w-6 h-6" />,
    path: "/qr",
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Morse Code Converter",
    description: "Convert text to morse code and back",
    icon: <MessageSquare className="w-6 h-6" />,
    path: "/convert/morsecode",
    color: "bg-amber-50 hover:bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Sudoku Solver",
    description: "Solve any Sudoku puzzle instantly",
    icon: <Calculator className="w-6 h-6" />,
    path: "/solver/sudoku",
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Stick Calculator",
    description: "Calculate aluminum profile lengths",
    icon: <Scale className="w-6 h-6" />,
    path: "/stickCalculator",
    color: "bg-rose-50 hover:bg-rose-100",
    iconColor: "text-rose-600",
  },
];

const Tools = () => {
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
            Converters & Calculators
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Powerful tools to convert, calculate, and solve everyday problems
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
            Simplify Your Tasks
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Our tools are designed to make your everyday tasks easier. From
            generating QR codes to solving puzzles, these utilities help you
            save time and get accurate results.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Tools;
