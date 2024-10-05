import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const active = "bg-[#7777] hover:bg-[#6666]  py-1 px-2 rounded ";
  return (
    <div className="w-fit mx-auto mb-5 ">
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

              {/* <li>
                                <NavLink className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? active : ""
                                }
                                    to="docs">Docs</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? active : ""
                                }
                                    to="/convert/morsecode">Morse Code  </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? active : ""
                                }
                                    to="about">About</NavLink>
                            </li> */}
            </ul>
          </div>
        </div>
        <div className="navbar-center text-3xl text-bold">
          <NavLink className={" font-serif"} to="/">
            <h1 id="sitename">Easy Puzzle</h1>
          </NavLink>
        </div>
        <div className="navbar-end">
          {/* <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button> */}
        </div>
      </div>

      <ul className="flex justify-evenly items-center w-full flex-wrap gap-5 sticky bg-transparent rounded  p-2 click:bg-none">
        {/* <li >
                    <span>Solvers</span>
                    <ul className="rounded bg-white p-2">
                        <li><Link>Sudoku</Link></li>
                        <li><Link>Submenu 2</Link></li>
                        <li><Link>Submenu 3</Link></li>
                    </ul>
                </li> */}
        {/* <li>
                    <NavLink
                        className={({ isActive, isPending }) => isPending ? "pending" : isActive ? active : ""}
                        to="/">Home
                    </NavLink>
                </li> */}

        {/* <li>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? active : ""
                }
                    to="/yt">Youtube watch </NavLink>
                </li> */}
      </ul>
    </div>
  );
};

export default Navbar;
