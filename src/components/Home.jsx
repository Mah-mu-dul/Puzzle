import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  GamepadIcon,
  Wrench,
  BookOpen,
  Code,
  Calculator,
  Binary,
  Cpu,
  CircuitBoard,
  Lightbulb,
  Newspaper,
  MessageSquare,
  Calendar,
  Wallet,
  Sigma,
} from "lucide-react";
import LatestFeatures from "./LatestFeatures";

const categories = [
  {
    title: "Student Tools",
    description: "Essential tools for academic success",
    icon: <GraduationCap className="w-8 h-8" />,
    path: "/student-tools",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Games & Fun",
    description: "Educational games and entertainment",
    icon: <GamepadIcon className="w-8 h-8" />,
    path: "/games",
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Converters & Calculators",
    description: "Useful conversion and calculation tools",
    icon: <Calculator className="w-8 h-8" />,
    path: "/tools",
    color: "bg-green-50 hover:bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Planners & Organizers",
    description: "Schedule and organize your academic life",
    icon: <Calendar className="w-8 h-8" />,
    path: "/planners",
    color: "bg-amber-50 hover:bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Financial Tools",
    description: "Manage your finances and expenses",
    icon: <Wallet className="w-8 h-8" />,
    path: "/finance",
    color: "bg-emerald-50 hover:bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Engineering Courses",
    description: "Electronics and circuit design resources",
    icon: <CircuitBoard className="w-8 h-8" />,
    path: "/courses",
    color: "bg-red-50 hover:bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Computer Science",
    description: "Theoretical computer science concepts",
    icon: <Cpu className="w-8 h-8" />,
    path: "/cs-courses",
    color: "bg-indigo-50 hover:bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Academic Analysis",
    description: "Analyze your academic performance",
    icon: <Sigma className="w-8 h-8" />,
    path: "/academic-analysis",
    color: "bg-cyan-50 hover:bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    title: "Blogs & Tutorials",
    description: "Educational articles and guides",
    icon: <Newspaper className="w-8 h-8" />,
    path: "/blogs",
    color: "bg-rose-50 hover:bg-rose-100",
    iconColor: "text-rose-600",
  },
];

function Home() {
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Academic Tools & Resources
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your comprehensive platform for academic success, featuring tools,
            calculators, course materials, and more
          </p>
        </motion.div>
      </section>

      {/* Latest Features Section */}
      <LatestFeatures />

      {/* Categories Grid */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-lg">
            All Features
          </h2>
        </motion.div>
      </div>
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={category.path}>
                  <div
                    className={`p-6 rounded-xl ${category.color} transition-all duration-300 transform hover:scale-105 shadow-sm`}
                  >
                    <div className={`${category.iconColor} mb-4`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-blue-600 mb-4">
                <Wrench className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">All-in-One Tools</h3>
              <p className="text-gray-600">
                Everything you need for academic success in one place
              </p>
            </div>
            <div className="p-6">
              <div className="text-green-600 mb-4">
                <Code className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Interactive Learning
              </h3>
              <p className="text-gray-600">
                Engage with interactive tools and calculators
              </p>
            </div>
            <div className="p-6">
              <div className="text-purple-600 mb-4">
                <MessageSquare className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Comprehensive Resources
              </h3>
              <p className="text-gray-600">
                Access course materials and educational content
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
