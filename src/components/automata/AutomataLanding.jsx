import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minimize2, Binary, GitCompare } from "lucide-react";

const tools = [
  {
    title: "DFA Minimization",
    description:
      "Minimize Deterministic Finite Automata using partition refinement",
    icon: <Minimize2 className="w-6 h-6" />,
    path: "/courses/automata/minimizeDFA",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
  // Add more automata tools here as needed
  {
    title: "Regular Expression",
    description: "Convert Regular Expressions to Finite Automata",
    icon: <Binary className="w-6 h-6" />,
    path: "/courses/automata/regex",
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
    comingSoon: true,
  },
  {
    title: "NFA to DFA",
    description: "Convert Non-deterministic FA to Deterministic FA",
    icon: <GitCompare className="w-6 h-6" />,
    path: "/courses/automata/nfa-to-dfa",
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
    comingSoon: true,
  },
];

function AutomataLanding() {
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
            Automata Theory Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Interactive tools for learning and working with Finite Automata
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
                {tool.comingSoon ? (
                  <div
                    className={`p-6 rounded-xl ${tool.color} transition-all duration-300 relative`}
                  >
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 text-xs font-semibold text-white bg-gray-500 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <div className={`${tool.iconColor} mb-4 opacity-50`}>
                      {tool.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 opacity-50">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 opacity-50">
                      {tool.description}
                    </p>
                  </div>
                ) : (
                  <Link to={tool.path}>
                    <div
                      className={`p-6 rounded-xl ${tool.color} transition-all duration-300 transform hover:scale-105`}
                    >
                      <div className={`${tool.iconColor} mb-4`}>
                        {tool.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-gray-600">{tool.description}</p>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AutomataLanding;
