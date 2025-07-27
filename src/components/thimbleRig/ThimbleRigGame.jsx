import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaRandom,
  FaHandPointer,
  FaTrophy,
  FaTimes,
} from "react-icons/fa";

const ThimbleRigGame = () => {
  const [gameState, setGameState] = useState("initial"); // initial, shuffling, guessing, revealed
  const [ballPosition, setBallPosition] = useState(0); // 0, 1, or 2
  const [currentPosition, setCurrentPosition] = useState(0);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [userGuess, setUserGuess] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  const totalShuffles = 7;

  // Start the game
  const startGame = useCallback(() => {
    const randomPosition = Math.floor(Math.random() * 3);
    setBallPosition(randomPosition);
    setCurrentPosition(randomPosition);
    setGameState("initial");
    setUserGuess(null);
    setIsCorrect(null);

    // Show ball briefly, then start shuffling
    setTimeout(() => {
      setGameState("shuffling");
      setShuffleCount(0);
    }, 1500);
  }, []);

  // Shuffle animation
  useEffect(() => {
    if (gameState === "shuffling" && shuffleCount < totalShuffles) {
      const shuffleTimer = setTimeout(() => {
        const newPosition = Math.floor(Math.random() * 3);
        setCurrentPosition(newPosition);
        setShuffleCount((prev) => prev + 1);

        if (shuffleCount + 1 >= totalShuffles) {
          setGameState("guessing");
        }
      }, 1000);

      return () => clearTimeout(shuffleTimer);
    }
  }, [gameState, shuffleCount, totalShuffles]);

  // Handle cup click
  const handleCupClick = (cupIndex) => {
    if (gameState !== "guessing") return;

    setUserGuess(cupIndex);
    const correct = cupIndex === currentPosition;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }
    setTotalGames((prev) => prev + 1);
    setGameState("revealed");

    // Reset after showing result
    setTimeout(() => {
      startGame();
    }, 2000);
  };

  // Start game on mount
  useEffect(() => {
    startGame();
  }, [startGame]);

  const cupVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const ballVariants = {
    initial: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hidden: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const statusVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="w-64 mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl border border-slate-200"
      variants={containerVariants}
      initial="initial"
      animate="visible"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Thimble Rig</h2>
        <p className="text-sm text-slate-600 mb-4">
          Find the ball under the cups!
        </p>

        {/* Score */}
        <div className="flex justify-center gap-3 text-sm">
          <motion.span
            className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <FaTrophy className="text-green-600" />
            {score}
          </motion.span>
          <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
            {totalGames}
          </span>
        </div>
      </div>

      {/* Game Status */}
      <div className="text-center mb-6 h-8">
        <AnimatePresence mode="wait">
          {gameState === "initial" && (
            <motion.div
              key="initial"
              variants={statusVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-blue-600 font-medium flex items-center justify-center gap-2"
            >
              <FaEye className="text-blue-500" />
              Watch carefully...
            </motion.div>
          )}

          {gameState === "shuffling" && (
            <motion.div
              key="shuffling"
              variants={statusVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-orange-600 font-medium flex items-center justify-center gap-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FaRandom className="text-orange-500" />
              </motion.div>
              Shuffling... ({shuffleCount + 1}/{totalShuffles})
            </motion.div>
          )}

          {gameState === "guessing" && (
            <motion.div
              key="guessing"
              variants={statusVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-green-600 font-medium flex items-center justify-center gap-2"
            >
              <FaHandPointer className="text-green-500" />
              Click a cup to guess!
            </motion.div>
          )}

          {gameState === "revealed" && (
            <motion.div
              key="revealed"
              variants={statusVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`font-bold text-lg flex items-center justify-center gap-2 ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect ? (
                <>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    🎉
                  </motion.div>
                  Correct!
                </>
              ) : (
                <>
                  <FaTimes className="text-red-500" />
                  Wrong!
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cups Container */}
      <div className="flex justify-center gap-4 mb-6">
        {[0, 1, 2].map((cupIndex) => (
          <motion.div
            key={cupIndex}
            className="relative cursor-pointer"
            variants={cupVariants}
            initial="initial"
            whileHover={gameState === "guessing" ? "hover" : "initial"}
            whileTap={gameState === "guessing" ? "tap" : "initial"}
            onClick={() => handleCupClick(cupIndex)}
          >
            {/* Cup */}
            <motion.div
              className={`
                w-16 h-16 rounded-full border-4 border-slate-300 
                ${
                  gameState === "guessing"
                    ? "bg-gradient-to-b from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400"
                    : "bg-gradient-to-b from-slate-200 to-slate-300"
                }
                ${
                  gameState === "revealed" && userGuess === cupIndex
                    ? "border-blue-500 shadow-lg"
                    : ""
                }
                ${
                  gameState === "revealed" && cupIndex === currentPosition
                    ? "border-green-500 shadow-lg"
                    : ""
                }
                transition-all duration-200 shadow-md
              `}
              animate={
                gameState === "shuffling"
                  ? {
                      x: [0, -10, 10, -8, 8, -5, 5, -2, 2, 0],
                      y: [0, -3, 3, -2, 2, -1, 1, 0],
                      rotate: [0, -2, 2, -1, 1, -0.5, 0.5, 0],
                      transition: {
                        duration: 0.8,
                        ease: "easeInOut",
                        repeat: 0,
                      },
                    }
                  : {}
              }
            >
              {/* Ball */}
              <AnimatePresence>
                {((gameState === "initial" && cupIndex === ballPosition) ||
                  (gameState === "shuffling" && cupIndex === currentPosition) ||
                  (gameState === "revealed" &&
                    cupIndex === currentPosition)) && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    variants={ballVariants}
                    initial="initial"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.div
                      className="w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg"
                      animate={
                        gameState === "shuffling"
                          ? {
                              scale: [1, 1.1, 1],
                              rotate: [0, 180, 360],
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.8,
                        repeat: gameState === "shuffling" ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Cup number */}
            <div className="text-center mt-2 text-sm font-medium text-slate-600">
              {cupIndex + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ThimbleRigGame;
