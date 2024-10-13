import React, { useState, useEffect } from "react";

const Game2048 = () => {
  const inputBoard = [
    [2, 128, 256, 2],
    [4, null, 32, 2],
    [8, 64, 2048, 16],
    [4, 4, 1024, 512],
  ];

  // const [board, setBoard] = useState(inputBoard);
  const [board, setBoard] = useState(
    Array(4)
      .fill()
      .map(() => Array(4).fill(null))
  );
  useEffect(() => {
    resetGame();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  // Function to generate a random tile (2 or 4)
  const generateRandomTile = (board) => {
    let isempty = false;
    for (const row of board) {
      for (const cell of row) {
        if (cell == null) {
          isempty = true;
        }
      }
    }
    if (isempty) {
      const x = Math.floor(Math.random() * 4);
      const y = Math.floor(Math.random() * 4);

      if (board[x][y] === null) {
        board[x][y] = Math.random() < 0.5 ? 2 : 4;
        return board;
      }
      generateRandomTile(board);
    } else {
      console.log("all tiles are filled");
    }
  };
  function updateBoard(Board) {
    const updatedBoard = [];

    for (const row of Board) {
      const newRow = [];

      // Remove null values and add numbers to a new row
      const nonNullCells = row.filter((cell) => cell !== null);

      for (let i = 0; i < nonNullCells.length; i++) {
        if (
          i < nonNullCells.length - 1 &&
          nonNullCells[i] === nonNullCells[i + 1]
        ) {
          newRow.push(nonNullCells[i] * 2);
          i++; // Skip the next cell since it has been merged
        } else {
          newRow.push(nonNullCells[i]);
        }
      }

      // Fill the rest of the row with null values
      while (newRow.length < 4) {
        newRow.push(null);
      }

      updatedBoard.push(newRow);
    }

    return updatedBoard;
  }

  // Function to move tiles to the left
  const moveLeft = () => {
    console.log(inputBoard);
    const updatedBoard = updateBoard(board);
    setBoard(updatedBoard);
    console.log(updatedBoard);
    console.log(board);
    generateRandomTile(board);

    // generateRandomTile(updatedBoard);
  };

  // Function to handle arrow key events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      moveLeft();
    } else if (event.key === "ArrowRight") {
      // Implement right movement logic here
    } else if (event.key === "ArrowUp") {
      // Implement up movement logic here
    } else if (event.key === "ArrowDown") {
      // Implement down movement logic here
    }
  };

  // function to refreash table

  // Function to reset the game board
  const resetGame = () => {
    const newBoard = Array(4)
      .fill()
      .map(() => Array(4).fill(null));

    generateRandomTile(newBoard);
    generateRandomTile(newBoard);
    setBoard(newBoard);
    console.log(newBoard);
  };

  // Handle initial tile generation and key events on component mount

  return (
    <div className=" w-fit mx-auto my-4">
      <h1 className="text-3xl text-orange-400">Under development</h1>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1 className="text-center text-2xl font-bold mb-4">2048 Game</h1>
      <div className="grid grid-cols-4 gap-2 border-2 border-gray-500 rounded p-1    ">
        {board.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-12 h-12 text-black  p-1 rounded flex justify-center items-center text-lg 
                            font-medium 
                            ${
                              tile === 2
                                ? "bg-amber-50 text-neutral-950"
                                : tile === 4
                                ? "bg-amber-100 text-neutral-900"
                                : tile === 8
                                ? "bg-amber-200 text-neutral-800"
                                : tile === 16
                                ? "bg-amber-300 text-neutral-900"
                                : tile === 32
                                ? "bg-amber-400 text-neutral-900"
                                : tile === 64
                                ? "bg-amber-500 text-neutral-900"
                                : tile === 128
                                ? "bg-amber-600 text-neutral-900"
                                : tile === 256
                                ? "bg-amber-700 text-neutral-50"
                                : tile === 512
                                ? "bg-amber-800 text-neutral-200"
                                : tile === 1024
                                ? "bg-amber-900 text-neutral-100"
                                : tile === 2048
                                ? "bg-amber-950 text-white"
                                : tile === null && "bg-white"
                            }`}
            >
              {tile}
            </div>
          ))
        )}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600"
        onClick={resetGame}
      >
        Reset
      </button>
    </div>
  );
};

export default Game2048;
