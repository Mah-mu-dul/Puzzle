import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Calculator, Calendar } from "lucide-react";

const features = [
  {
    title: "Previous Semester Questions Portal",
    icon: <FileText className="w-8 h-8 text-blue-500" />,
    border: "border-blue-200",
    path: "/previous-sem-questions",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "CGPA Calculator",
    icon: <Calculator className="w-8 h-8 text-green-500" />,
    border: "border-green-200",
    path: "/calculate-cg",
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
  },

  {
    title: "Routine Maker",
    icon: <Calendar className="w-8 h-8 text-blue-500" />,
    border: "border-blue-200",
    path: "/routine",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
];

const container = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.7,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

export default function LatestFeatures() {
  return (
    <section className="py-16 px-10 bg-white">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-lg">
            Latest Features
          </h2>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={feature.path}>
              <div
                className={`p-6 rounded-xl ${feature.color} transition-all duration-300 transform hover:scale-105 shadow-sm`}
              >
                <div className={`${feature.iconColor} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
