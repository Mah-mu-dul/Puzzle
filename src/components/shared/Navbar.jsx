import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const active = "bg-[#7777] hover:bg-[#6666]  py-1 px-2 rounded ";
  return (
    <div className="w-full mx-auto">
      <div className="navbar bg-transparent w-screen max-w-[1200px]">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#eeee] rounded-box w-52"
            >
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? active : ""
                  }
                  to="/solver/sudoku"
                >
                  Sudoku
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? active : ""
                  }
                  to="/tictactoe"
                >
                  Tic Tac Toe
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? active : ""
                  }
                  to="/connect4"
                >
                  Connect 4
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? active : ""
                  }
                  to="calculate-cg"
                >
                  Calcuate CG
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? active : ""
                  }
                  to="money-management"
                >
                  Money Management
                </NavLink>{" "}
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? active : ""
                  }
                  to="routine"
                >
                  Routine
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? active : ""
                  }
                  to="qr"
                >
                  QR
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? active : ""
                  }
                  to="stickCalculator"
                >
                  Stick Calculator
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center text-3xl text-bold">
          <NavLink className={" font-serif"} to="/">
            <h1 id="sitename">Easy Puzzle</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
