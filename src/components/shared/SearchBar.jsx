import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { Search, ArrowRight, X } from "lucide-react";

const searchableRoutes = [
  // Games Category
  { path: "/solver/sudoku", title: "Sudoku Solver", category: "Games" },
  { path: "/Connect4", title: "Connect 4", category: "Games" },
  { path: "/game2048", title: "2048 Game", category: "Games" },
  { path: "/tictactoe", title: "Tic Tac Toe", category: "Games" },
  { path: "/clap369", title: "Clap 369", category: "Games" },

  // Tools Category
  {
    path: "/convert/morsecode",
    title: "Morse Code Converter",
    category: "Tools",
  },
  { path: "/qr", title: "QR Code Generator", category: "Tools" },
  { path: "/word-count", title: "Word Counter", category: "Tools" },
  { path: "/calculate-cg", title: "CGPA Calculator", category: "Tools" },
  {
    path: "/stickCalculator",
    title: "Stick Calculator",
    category: "Tools",
  },

  // Planners Category
  { path: "/routine", title: "Routine Planner", category: "Planners" },
  { path: "/cost-calculator", title: "Cost Calculator", category: "Planners" },

  // Finance Category
  { path: "/money-management", title: "Money Management", category: "Finance" },

  // Courses Category
  { path: "/courses", title: "All Courses", category: "Courses" },
  {
    path: "/courses/dld",
    title: "Digital Logic Design (DLD)",
    category: "Courses",
  },
  {
    path: "/courses/dbms-normalization",
    title: "DBMS Normalization",
    category: "Courses",
  },
  {
    path: "/chat",
    title: "Easy AI",
    category: "chat bot",
  },
  {
    path: "/courses/circuit-analysis",
    title: "Circuit Analysis",
    category: "Courses",
  },
  {
    path: "/courses/electronics-1",
    title: "Electronics I",
    category: "Courses",
  },
  {
    path: "/courses/electronics-2",
    title: "Electronics II",
    category: "Courses",
  },

  // CS Courses Category
  {
    path: "/cs-courses",
    title: "Computer Science Courses",
    category: "CS Courses",
  },
  {
    path: "/courses/automata",
    title: "Automata Theory",
    category: "CS Courses",
  },
  {
    path: "/courses/automata/minimizeDFA",
    title: "Minimize DFA",
    category: "CS Courses",
  },

  // Academic Analysis Category
  {
    path: "/academic-analysis",
    title: "Academic Analysis",
    category: "Academic Analysis",
  },
  //   {
  //     path: "/transcript-analyzer",
  //     title: "Transcript Analyzer",
  //     category: "Academic Analysis",
  //   },

  // Category Pages
  {
    path: "/student-tools",
    title: "Student Tools",
    category: "Main Categories",
  },
  { path: "/games", title: "Games Collection", category: "Main Categories" },
  { path: "/tools", title: "Tools Collection", category: "Main Categories" },
  {
    path: "/planners",
    title: "Planners Collection",
    category: "Main Categories",
  },
  { path: "/finance", title: "Finance Tools", category: "Main Categories" },

  // Other Pages
  { path: "/blogs", title: "Blogs", category: "Content" },
  {
    path: "/blog/stick-calculator",
    title: "Stick Calculator Guide",
    category: "Content",
  },
  { path: "/docs", title: "Documentation", category: "Content" },
  { path: "/about", title: "About Us", category: "Content" },
];

const fuseOptions = {
  keys: ["title", "category"],
  threshold: 0.3,
  includeScore: true,
};

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const fuse = new Fuse(searchableRoutes, fuseOptions);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const searchResults = fuse.search(value);
      setResults(searchResults.slice(0, 7)); // Show top 7 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (path) => {
    setIsOpen(false);
    setSearchTerm("");
    navigate(path);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search tools and features..."
          className="w-full bg-white pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onFocus={() => setIsOpen(true)}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {results.map(({ item, score }, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item.path)}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center justify-between group"
            >
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500">{item.category}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
            </div>
          ))}
        </div>
      )}

      {isOpen && searchTerm && results.length === 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
