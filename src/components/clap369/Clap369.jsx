import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaHandsClapping } from "react-icons/fa6";

const getClapCount = (num) => {
  return (num.toString().match(/[369]/g) || []).length;
};

const getOptions = (num) => {
  let options = new Set(); // Use a Set to avoid duplicates

  // Add the correct answer (current number)
  options.add(num);

  // Generate incorrect answers
  while (options.size < 6) {
    let randomNum = num - 5 + Math.floor(Math.random() * 11); // Range from n-5 to n+5
    // Ensure randomNum is not negative and not equal to the current number
    if (randomNum >= 1 && randomNum !== num) {
      options.add(randomNum);
    }
  }

  // Convert Set to Array and shuffle
  const optionsArray = Array.from(options);
  for (let i = optionsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]]; // Swap
  }

  return optionsArray;
};

const Clap369 = () => {
  const [currentNum, setCurrentNum] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [alivePlayers, setAlivePlayers] = useState([]);
  const [options, setOptions] = useState(getOptions(currentNum));
  const [popupInfo, setPopupInfo] = useState(null); // State for popup information
  const [playerWins, setPlayerWins] = useState({}); // Store player wins
  const [gameEnded, setGameEnded] = useState(false); // State to track if the game has ended
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlayers =
      JSON.parse(localStorage.getItem("currentPlayers")) || [];
    if (storedPlayers.length < 2) {
      navigate("/clap369");
      return;
    }
    setAlivePlayers(storedPlayers);
    setOptions(getOptions(currentNum));
  }, [navigate]);

  useEffect(() => {
    // Update options whenever currentNum changes
    setOptions(getOptions(currentNum));
  }, [currentNum]);

  const handleChoice = (choice) => {
    const correctAnswer = getClapCount(currentNum) > 0 ? "👏" : currentNum;

    if (choice !== correctAnswer) {
      const eliminatedPlayer = alivePlayers[currentPlayerIndex];
      setAlivePlayers((prev) =>
        prev.filter((_, i) => i !== currentPlayerIndex)
      );

      let reason = (
        <p>
          Eliminated for choosing{" "}
          <strong style={{ color: "red" }}>{choice}</strong>.
        </p>
      );
      if (typeof correctAnswer === "string" && typeof choice === "number") {
        reason = (
          <p>
            Eliminated for choosing{" "}
            <strong style={{ color: "red" }}>{choice}</strong>. The correct
            answer was a <strong style={{ color: "red" }}>clap</strong>. Current
            number was <strong style={{ color: "red" }}>{currentNum}</strong>.
          </p>
        );
      } else {
        reason = (
          <p>
            Eliminated for choosing{" "}
            <strong style={{ color: "red" }}>{choice}</strong>. Current number
            was <strong style={{ color: "red" }}>{currentNum}</strong>.
          </p>
        );
      }

      setPopupInfo({
        player: eliminatedPlayer,
        reason: reason,
      });
    }

    let nextPlayer = (currentPlayerIndex + 1) % alivePlayers.length;
    setCurrentNum((prev) => prev + 1);
    setCurrentPlayerIndex(nextPlayer);
  };

  const closePopup = () => {
    setPopupInfo(null); // Close the popup
    if (alivePlayers.length === 1) {
      setGameEnded(true); // Set game ended state to true
    }
  };

  const restartGame = () => {
    // Reset game state
    setCurrentNum(1);
    setCurrentPlayerIndex(0);
    const storedPlayers =
      JSON.parse(localStorage.getItem("currentPlayers")) || [];
    setAlivePlayers(storedPlayers);
    setPlayerWins({}); // Reset player wins in state only
    setOptions(getOptions(1)); // Reset options
    setGameEnded(false); // Reset game ended state
  };

  // Check for a winner after the player choices
  useEffect(() => {
    if (alivePlayers.length === 1 && !gameEnded) {
      const winner = alivePlayers[0];
      // Increment win count for the winner
      setPlayerWins((prevWins) => ({
        ...prevWins,
        [winner]: (prevWins[winner] || 0) + 1,
      }));
    }
  }, [alivePlayers, gameEnded]); // Run this effect when alivePlayers changes

  // If no players are loaded, show loading or redirect
  if (alivePlayers.length === 0) {
    return null; // Component will unmount and redirect via useEffect
  }

  if (alivePlayers.length === 1 && gameEnded) {
    const winner = alivePlayers[0];

    return (
      <div className="text-3xl flex flex-col justify-center mx-auto items-center w-96 mt-10 p-5 bg-emerald-50 rounded-xl shadow-lg">
        <FaCrown className="inline-block mr-2 text-amber-400 text-5xl mb-3" />
        <p className="text-emerald-800 font-bold">
          <span className="text-3xl text-indigo-600">{winner}</span> Wins!{" "}
        </p>
        <div className="text-5xl my-3">🏆</div>
        <button
          onClick={restartGame}
          className="mt-5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-6 py-3 font-medium shadow-md transition-colors duration-200"
        >
          Restart Game
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ fontFamily: "Comic Sans MS, sans-serif" }}
      className="flex p-2 flex-col items-center min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 text-center"
    >
      <div className="flex flex-wrap items-center justify-evenly gap-5">
        <div className="p-4 bg-white bg-opacity-70 rounded-lg shadow-md">
          <button
            onClick={restartGame}
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 mr-2 shadow-sm transition-colors duration-200"
          >
            Reset Game
          </button>
          <Link
            to="/clap369"
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 shadow-sm transition-colors duration-200"
          >
            Go Back
          </Link>

          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold text-indigo-700">
              Remaining Players:
            </h3>
            <ul className="mt-2">
              {alivePlayers.map((p, i) => (
                <li key={i} className="text-indigo-800 fade-out-animation py-1">
                  {i + 1 + ". " + p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="p-4 bg-white bg-opacity-70 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-6 text-indigo-700">
            {alivePlayers[currentPlayerIndex]}'s Turn!
          </h1>

          <div className="mt-4">
            <div className="grid grid-cols-3 gap-4">
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  className="w-24 h-24 flex justify-center items-center rounded-lg bg-white border-2 border-indigo-200 text-indigo-700 shadow-md text-xl font-bold hover:bg-indigo-50 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleChoice(opt)}
                >
                  {opt}
                </div>
              ))}
            </div>
            <div
              className="p-6 bg-indigo-500 w-full text-white rounded-lg mt-4 shadow-md text-3xl font-bold hover:bg-indigo-600 transition-colors duration-200 cursor-pointer"
              onClick={() => handleChoice("👏")}
            >
              👏
            </div>
          </div>
        </div>
      </div>
      {popupInfo && (
        <div className="fixed p-2 inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md">
            <h2 className="text-3xl font-bold text-rose-600 mb-3">
              {popupInfo.player} Eliminated! 💀
            </h2>
            <p className="text-xl font-medium text-indigo-700">
              {popupInfo.reason}
            </p>
            <button
              onClick={closePopup}
              className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-6 py-2 text-lg transition-colors duration-200 shadow-md"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clap369;
