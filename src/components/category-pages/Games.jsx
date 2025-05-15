import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GamepadIcon, Grid3X3, Dices } from "lucide-react";
import { FaHandsClapping, FaChessBoard } from "react-icons/fa6";

const games = [
  {
    title: "Tic Tac Toe",
    description: "Classic game of X's and O's",
    icon: <Grid3X3 className="w-6 h-6" />,
    path: "/tictactoe",
    color: "bg-indigo-50 hover:bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    title: "Connect 4",
    description: "Strategic four-in-a-row game",
    icon: <FaChessBoard className="w-6 h-6" />,
    path: "/connect4",
    color: "bg-purple-50 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Game 2048",
    description: "Addictive number combining puzzle",
    icon: <Dices className="w-6 h-6" />,
    path: "/game2048",
    color: "bg-rose-50 hover:bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    title: "3-6-9 Clap Game",
    description: "A fun number game where you clap for 3, 6, and 9!",
    icon: <FaHandsClapping className="w-6 h-6" />,
    path: "/clap369",
    color: "bg-blue-50 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
];

const Games = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Games & Entertainment
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Fun, educational games to exercise your brain and pass the time
          </p>
        </motion.div>
      </section>

      {/* Games Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={game.path}>
                  <div
                    className={`p-6 rounded-xl ${game.color} transition-all duration-300 transform hover:scale-105 shadow-sm`}
                  >
                    <div className={`${game.iconColor} mb-4`}>{game.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {game.title}
                    </h3>
                    <p className="text-gray-600">{game.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Games Matter
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Educational games help develop problem-solving skills, strategic
            thinking, and provide a fun way to learn mathematical concepts. Our
            selection of games offers entertainment while also exercising your
            brain.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Games;
