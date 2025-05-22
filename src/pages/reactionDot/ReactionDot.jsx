import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ReactionDot = () => {
  const [gameState, setGameState] = useState("idle"); // idle, playing, finished
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [reactionTimes, setReactionTimes] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const TOTAL_ROUNDS = 100;

  const startGame = () => {
    setGameState("idle");
    setReactionTimes([]);
    setCurrentRound(0);
  };

  const startRound = () => {
    // Calculate position within 95% of screen height and width
    const maxX = window.innerWidth - 100; // 100px for dot width
    const maxY = window.innerHeight * 0.95 - 100; // 95% of height minus dot height

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    setDotPosition({ x, y });
    setGameState("playing");
    setStartTime(Date.now());
  };

  const handleDotClick = () => {
    const reactionTime = Date.now() - startTime;
    setReactionTimes([...reactionTimes, reactionTime]);

    if (currentRound + 1 < TOTAL_ROUNDS) {
      setCurrentRound(currentRound + 1);
      startRound();
    } else {
      setGameState("finished");
    }
  };

  const getStats = () => {
    if (reactionTimes.length === 0)
      return { average: 0, fastest: 0, slowest: 0 };

    const average = Math.round(
      reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length
    );
    const fastest = Math.min(...reactionTimes);
    const slowest = Math.max(...reactionTimes);

    return { average, fastest, slowest };
  };

  return (
    <div className="min-h-[80vh] bg-gray-100 flex items-center justify-center p-4">
      <AnimatePresence>
        {gameState === "idle" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Reaction Dot Game
            </h1>
            <p className="text-gray-600 mb-8">
              Click the dot as fast as you can when it appears!
            </p>
            <button
              onClick={startRound}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
            >
              Start Game
            </button>
          </motion.div>
        )}

        {gameState === "playing" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              position: "absolute",
              left: dotPosition.x,
              top: dotPosition.y,
              cursor: "pointer",
            }}
            onClick={handleDotClick}
            className="w-16 h-16 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          />
        )}

        {gameState === "finished" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Game Over!
            </h2>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Average Time</p>
                <p className="text-2xl font-bold text-blue-500">
                  {getStats().average}ms
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Fastest Click</p>
                <p className="text-2xl font-bold text-green-500">
                  {getStats().fastest}ms
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">Slowest Click</p>
                <p className="text-2xl font-bold text-red-500">
                  {getStats().slowest}ms
                </p>
              </div>
            </div>
            <button
              onClick={startGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {gameState === "playing" && (
        <div className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-lg">
          Round {currentRound + 1}/{TOTAL_ROUNDS}
        </div>
      )}
    </div>
  );
};

export default ReactionDot;
