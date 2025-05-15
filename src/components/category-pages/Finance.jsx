import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wallet, Calculator, PiggyBank } from "lucide-react";

const financeTools = [
  {
    title: "Money Manager",
    description: "Track your expenses and budget",
    icon: <Wallet className="w-6 h-6" />,
    path: "/money-management",
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Credit Cost Calculator",
    description: "Calculate academic credit costs",
    icon: <Calculator className="w-6 h-6" />,
    path: "/cost-calculator",
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
];

const Finance = () => {
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
            Financial Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your personal finances and academic expenses
          </p>
        </motion.div>
      </section>

      {/* Finance Tools Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financeTools.map((tool, index) => (
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
            Financial Wellness
          </h2>
          <div className="bg-emerald-50 p-8 rounded-xl shadow-sm">
            <div className="text-emerald-600 mb-4">
              <PiggyBank className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              Why Managing Finances Matters
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Financial management is a crucial skill for students. Our
              financial tools help you:
            </p>
            <ul className="text-left text-gray-700 max-w-lg mx-auto space-y-2">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>Track your daily expenses and stay within budget</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>
                  Calculate the cost of academic credits and plan financially
                  for each semester
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span>
                  Make informed financial decisions throughout your academic
                  journey
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Finance;
