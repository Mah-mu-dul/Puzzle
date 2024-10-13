import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/solver/sudoku", label: "Sudoku" },
    { to: "/tictactoe", label: "Tic Tac Toe" },
    { to: "/connect4", label: "Connect 4" },
    { to: "/calculate-cg", label: "Calculate CG" },
    { to: "/money-management", label: "Money Management" },
    { to: "/routine", label: "Routine" },
    { to: "/qr", label: "QR" },
    { to: "/stickCalculator", label: "Stick Calculator" },
    { to: "/blogs", label: "Blogs" },
  ];

  const NavItem = ({ to, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group ${
          isActive ? "text-blue-600" : ""
        }`
      }
    >
      {label}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
    </NavLink>
  );

  return (
    <nav className="bg-white shadow-lg mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
              <h1
                id="sitename"
                className="text-2xl font-serif font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
              >
                Easy Puzzle
              </h1>
            </NavLink>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </div>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${
          isOpen ? "block transition-all duration-1000" : "hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                } transition-colors duration-200`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
