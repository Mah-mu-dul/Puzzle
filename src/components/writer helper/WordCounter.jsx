import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Type, Hash, AlignLeft, Search, Upload } from "lucide-react";
import { FaRegFileWord } from "react-icons/fa";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const getWordCount = () =>
    text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

  const getCharCountNoSpaces = () => text.replace(/\s/g, "").length;

  const getCharCountWithSpaces = () => text.length;

  const getSentenceCount = () =>
    text.split(/[.!?।]+/).filter((sentence) => sentence.trim().length > 0)
      .length;

  const getParagraphCount = () => {
    // Normalize line breaks: collapse multiple line breaks into one
    const normalizedText = text.replace(/\n\s*\n/g, "\n\n");
    // Split by double newlines and count non-empty paragraphs
    return normalizedText.split("\n").filter((para) => para.trim().length > 0)
      .length;
  };

  const getSearchTermCount = () => {
    if (!searchTerm) return 0;
    const regex = new RegExp(searchTerm, "gi");
    return (text.match(regex) || []).length;
  };

  const stats = [
    {
      title: "Words",
      count: getWordCount(),
      icon: <Type className="w-6 h-6" />,
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Sentences",
      count: getSentenceCount(),
      icon: <AlignLeft className="w-6 h-6" />,
      color: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    {
      title: "Characters (no spaces)",
      count: getCharCountNoSpaces(),
      icon: <Hash className="w-6 h-6" />,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Characters (with spaces)",
      count: getCharCountWithSpaces(),
      icon: <FileText className="w-6 h-6" />,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Paragraphs",
      count: getParagraphCount(),
      icon: <FaRegFileWord className="w-6 h-6" />,
      color: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Search Term Occurrences",
      count: getSearchTermCount(),
      icon: <Search className="w-6 h-6" />,
      color: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center">
          Word Counter & Text Analyzer
        </h1>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            {/* Coming Soon Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-center space-x-2">
              <Upload className="w-5 h-5 text-blue-500" />
              <span className="text-blue-600">
                PDF and DOCX support coming soon!
              </span>
            </div>

            {/* Text Input */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <textarea
                className="w-full h-[calc(100vh-400px)] min-h-[300px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md bg-white"
                placeholder="Type or paste your text here..."
                value={text}
                onChange={handleTextChange}
              />
            </motion.div>
          </div>

          {/* Right Column - Stats */}
          <div className="lg:col-span-5">
            {/* Search Term Input */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search for a word or phrase..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md bg-white"
              />
            </motion.div>
            <br />
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div
                    className={`${stat.color} min-w-fit flex items-center p-4 rounded-xl transition-all duration-300 transform hover:scale-102 shadow-md bg-white`}
                  >
                    <div className={`${stat.iconColor} mr-3`}>{stat.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {stat.title}
                      </h3>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.count}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WordCounter;
