import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const HomeClap369 = () => {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load players from local storage
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    setPlayers(storedPlayers);
  }, []);

  const addPlayer = () => {
    if (playerName && players.length < 10 && !players.includes(playerName)) {
      const updatedPlayers = [...players, playerName];
      setPlayers(updatedPlayers);
      localStorage.setItem("players", JSON.stringify(updatedPlayers));
      setPlayerName("");
    }
  };

  const handleEditPlayer = (index, newName) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = newName;
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addPlayer();
    }
  };

  const deletePlayer = (name) => {
    const updatedPlayers = players.filter((player) => player !== name);
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  const startGame = () => {
    if (players.length >= 2) {
      localStorage.setItem("currentPlayers", JSON.stringify(players));
      navigate("/clap369/start");
    }
  };

  return (
    <div
      style={{ fontFamily: "Comic Sans MS, sans-serif" }}
      className="flex flex-col items-center min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 text-center p-5"
    >
      <div className="flex flex-wrap  justify-evenly gap-5 h-">
        <div className="w-96 text-left">
          <h1 className="text-4xl font-bold mb-5 text-indigo-700">
            Clap 369 Game
          </h1>
          <p className="mb-5 text-lg text-indigo-800 p-5">
            <strong>The rules are simple:</strong> Each player takes turns
            counting up from 1. If the number contains a 3, 6, or 9, the player
            must clap instead of saying the number. If the player says the
            number instead of clapping, or say the wrong number, they are
            eliminated.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-5 text-indigo-700">
            Enter Player Names
          </h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input input-bordered mb-3 bg-white bg-opacity-70 w-full max-w-xs border-2 border-indigo-200 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-400"
            placeholder="Enter player name"
          />
          <button
            onClick={addPlayer}
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 mb-5 transition-colors duration-200 shadow-md"
          >
            Add Player
          </button>
          <ul className="mb-5">
            {players.map((player, index) => (
              <li
                key={index}
                className="flex mx-auto justify-between bg-white bg-opacity-60 rounded-lg py-2 px-5 w-72 items-center mb-2 shadow-sm"
              >
                <input
                  type="text"
                  value={player}
                  onChange={(e) => handleEditPlayer(index, e.target.value)}
                  className="text-lg text-indigo-800 w-full bg-transparent border-none focus:outline-none"
                />
                <button
                  onClick={() => deletePlayer(player)}
                  className="text-rose-400 hover:text-rose-600 ml-3 transition-colors duration-200"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={startGame}
            disabled={players.length < 2}
            className={`${
              players.length >= 2
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-gray-400 cursor-not-allowed"
            } text-white rounded-lg px-6 py-3 font-medium shadow-md transition-colors duration-200`}
          >
            {players.length < 2 ? "Need at least 2 players" : "Start Game"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeClap369;
