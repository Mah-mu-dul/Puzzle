import React, { useState } from 'react';
import HowToPlayModal from './HowToPlayModal';

const Connect4Game = () => {
    const [board, setBoard] = useState(Array.from({ length: 6 }, () => Array(7).fill(null)));
    const [player, setPlayer] = useState('red');
    const [winner, setWinner] = useState(null);

    const checkWinner = (board, row, col) => {
        const directions = [
            [0, 1], [1, 0], [1, 1], [-1, 1] // right, down, diagonal down-right, diagonal up-right
        ];

        for (let dir of directions) {
            let count = 1;
            const [dx, dy] = dir;
            let i = row + dx;
            let j = col + dy;

            while (i >= 0 && i < 6 && j >= 0 && j < 7 && board[i][j] === board[row][col]) {
                count++;
                i += dx;
                j += dy;
            }

            i = row - dx;
            j = col - dy;

            while (i >= 0 && i < 6 && j >= 0 && j < 7 && board[i][j] === board[row][col]) {
                count++;
                i -= dx;
                j -= dy;
            }

            if (count >= 4) {
                return true;
            }
        }

        return false;
    };

    const handleMove = (col) => {
        if (winner || board[0][col]) return;

        let newBoard = [...board];
        let newRow = 5;

        while (newRow >= 0 && newBoard[newRow][col]) {
            newRow--;
        }

        if (newRow < 0) return;

        newBoard[newRow][col] = player;

        if (checkWinner(newBoard, newRow, col)) {
            setWinner(player);
        } else {
            setPlayer(player === 'red' ? 'yellow' : 'red');
        }

        setBoard(newBoard);
    };

    const resetGame = () => {
        setBoard(Array.from({ length: 6 }, () => Array(7).fill(null)));
        setWinner(null);
        setPlayer('red');
    };

    return (
        <div className="block md:flex mx-auto w-fit ">
            <div className="mx-5">
                <h1 className="text-3xl font-bold mb-4">Connect 4 Game</h1>

                <div className="h-16">
                    {winner && (
                        <div className="mb-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-center">Winner: {winner.toUpperCase()}</h2>
                            <button onClick={resetGame} className="mt-2 btn btn-primary text-white font-bold py-2 px-4 rounded">
                                Restart Game
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {board.map((row, rowIndex) => (
                        row.map((cell, colIndex) => (
                            <div key={`${rowIndex}-${colIndex}`} className="w-12 h-12 border border-gray-500 rounded-full flex items-center justify-center">
                                <div
                                    className={`w-8 h-8 rounded-full ${cell === 'red' ? 'bg-red-500' : cell === 'yellow' ? 'bg-yellow-500' : 'bg-gray-200'}`}
                                    onClick={() => handleMove(colIndex)}
                                ></div>
                            </div>
                        ))
                    ))}
                </div>
            </div>

            <HowToPlayModal />
        </div>
    );
};

export default Connect4Game;
