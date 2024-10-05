import React, { useEffect, useState } from 'react';

const Test = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        checkWinner();
    }, [board]);
    const handleClick = (i) => {
        if (winner || board[i]) return;
        setBoard([...board.slice(0, i), currentPlayer, ...board.slice(i + 1)]);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        setWinner(checkWinner());
    };

    const checkWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const renderSquare = (i) => {
        return (
            <button
                className={`h-16 w-16 border-2 border-gray-500 flex items-center justify-center ${winner && winner === board[i] ? 'bg-green-500' : ''
                    }`}
                onClick={() => handleClick(i)}
            >
                {board[i]}
            </button>
        );
    };

    return (
        <div className="flex flex-col items-center">
            <div className="mb-4 text-2xl">
                {winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`}
            </div>
            <div className="grid grid-cols-3 gap-4">
                {board.map((_, i) => renderSquare(i))}
            </div>
        </div>
    );
};

export default Test;