import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, GitBranch, Code, Brain, Database } from "lucide-react";

const csTools = [
  {
    title: "Minimize DFA",
    description: "DFA minimization algorithms",
    icon: <GitBranch className="w-6 h-6" />,
    path: "/courses/automata/minimizeDFA",
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Schema Normalization",
    description: "Understand database schema normalization",
    icon: <Database className="w-6 h-6" />,
    path: "/courses/dbms-normalization",
    color: "bg-indigo-50 hover:bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Automata Theory",
    description: "Explore automata theory concepts",
    icon: <Brain className="w-6 h-6" />,
    path: "/courses/automata",
    color: "bg-indigo-50 hover:bg-indigo-100",
    iconColor: "text-indigo-600",
  },
];

const CSCourses = () => {
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
            Computer Science Resources
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Theoretical computer science concepts and practical tools
          </p>
        </motion.div>
      </section>

      {/* CS Tools Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {csTools.map((tool, index) => (
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
            Theoretical Computer Science
          </h2>
          <div className="bg-indigo-50 p-8 rounded-xl shadow-sm">
            <div className="text-indigo-600 mb-4">
              <Cpu className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Core CS Concepts</h3>
            <p className="text-lg text-gray-700 mb-6">
              Our computer science section focuses on theoretical foundations
              that are essential for understanding how computers work and how
              algorithms are designed.
            </p>
            <div className="text-left text-gray-700 max-w-lg mx-auto">
              <h4 className="font-semibold mb-2 flex items-center">
                <Code className="w-5 h-5 mr-2 text-indigo-600" />
                Automata Theory
              </h4>
              <p className="ml-7 mb-4">
                Study finite automata, regular expressions, context-free
                grammars, and Turing machines to understand the theoretical
                limits of computation.
              </p>

              <h4 className="font-semibold mb-2 flex items-center">
                <GitBranch className="w-5 h-5 mr-2 text-indigo-600" />
                Algorithm Design
              </h4>
              <p className="ml-7">
                Learn how to design efficient algorithms and understand
                computational complexity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CSCourses;
