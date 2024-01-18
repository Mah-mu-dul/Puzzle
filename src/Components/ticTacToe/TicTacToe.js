import React, { useEffect, useRef, useState } from 'react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [mode, setMode] = useState('medium');
    const [winnerCombos, setWinnerCombos] = useState([]);
    const [isAgainstComputer, setIsAgainstComputer] = useState(true);
    const [gameCount, setGameCount] = useState({ x: 0, o: 0 })
    const [players, setPlayers] = useState({ first: "Player X", Second: "Player O" })



    useEffect(() => {
        if (currentPlayer === 'O' && !winner) {
            if (mode === 'easy') {
                if (isAgainstComputer) {

                    makeMoveEasy();
                }
            } else if (mode === 'medium') {
                if (isAgainstComputer) {
                    makeMoveMedium();
                }
            } else if (mode === 'hard') {
                makeMoveHard();
            }
        }
    }, [currentPlayer, winner]);

    const checkWinner = (board) => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
                setWinnerCombos(combo)
                return board[a];
            }
        }

        return null;
    };

    const makeMove = (index) => {
        if (board[index] === '' && !winner) {
            const newBoard = [...board];
            newBoard[index] = currentPlayer;
            setBoard(newBoard);

            const gameWinner = checkWinner(newBoard);
            if (gameWinner) {
                setWinner(gameWinner);
                if (gameWinner === "X") {
                    setGameCount({ ...gameCount, x: gameCount.x + 1 });
                } else {
                    setGameCount({ ...gameCount, o: gameCount.o + 1 });
                }
            } else if (newBoard.indexOf('') === -1) {
                setWinner('draw');
            } else {
                setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
            }
        }
    };

    // midium move
    const moveMid = (board) => {
        const winningPositions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        const emptyCells = board.reduce((acc, cell, index) => {
            if (cell === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        const checkWinningPosition = (player) => {
            for (const positions of winningPositions) {
                const [a, b, c] = positions;
                if (board[a] === player && board[b] === player && board[c] === '') {
                    return c;
                } else if (board[a] === player && board[b] === '' && board[c] === player) {
                    return b;
                } else if (board[a] === '' && board[b] === player && board[c] === player) {
                    return a;
                }
            }
            return -1;
        };
        const oWinningPosition = checkWinningPosition('O');
        if (oWinningPosition !== -1) {
            return oWinningPosition;
        }


        const xWinningPosition = checkWinningPosition('X');
        if (xWinningPosition !== -1) {
            return xWinningPosition;
        }



        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            return emptyCells[randomIndex];
        }

        // If no winning positions and no empty cells, return -1 to indicate an invalid move
        return -1;
    };




    const makeMoveEasy = () => {
        const emptyCells = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                emptyCells.push(i);
            }
        }

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomMoveIndex = emptyCells[randomIndex];

        setTimeout(() => {
            makeMove(randomMoveIndex);
        }, 50); // Delay the move by 500 milliseconds (adjust as needed)
    };

    const makeMoveMedium = () => {
        // Implement your medium mode logic here
        // This function should make a move based on a medium-level strategy
        const emptyCells = [];
        const xsCells = []
        const osCells = []
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                emptyCells.push(i);
            }
            else if (board[i] === "X") {
                xsCells.push(i)
            }
            else if (board[i] === "O") {
                osCells.push(i)
            }
        }
        // const randomIndex = Math.floor(Math.random() * emptyCells.length);
        // const randomMoveIndex = emptyCells[randomIndex];
        const moveIndex = moveMid(board)
        setTimeout(() => {
            // makeMove(randomMoveIndex);
            makeMove(moveIndex);
        }, 500); // Delay the move by 500 milliseconds (adjust as needed)
    };

    const makeMoveHard = () => {
        // Implement your hard mode logic here
        // This function should make a move based on a hard-level strategy
    };

    const resetGame = () => {
        setBoard(Array(9).fill(''));
        setCurrentPlayer('X');
        setWinner(null);
        setWinnerCombos([]);
    };

    const handleToggle = () => {
        setIsAgainstComputer(!isAgainstComputer);
        setBoard(Array(9).fill(''));
        setCurrentPlayer('X');
        setWinner(null);
        setGameCount({ x: 0, o: 0 });
        setWinnerCombos([]);

    };
    return (
        <>
            <div className="flex justify-center items-center  mb-8">
                <div className="bg-[#81818565] p-5 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Tic Tac Toe</h1>
                    <div className="flex items-center justify-between">
                        <h1 className="ml-3 text-rose-600">Computer</h1>
                        <input type="checkbox"
                            checked={!isAgainstComputer}
                            onChange={handleToggle}
                            className="toggle toggle-info"
                        />
                        <h1 className="ml-3 text-rose-600">Friend</h1>
                    </div>
                    <div className="">
                        <input className='w-28 mr-2 h-5 rounded-none border-0 input caret-transparent bg-transparent' type="text" value={players.first} onChange={(e) => setPlayers(e.target.value)} /> wins: {gameCount.x} times
                        <br />
                        <input className='w-28 mr-2 h-5 rounded-none border-0 input caret-transparent bg-transparent' type="text" value={players.Second} onChange={(e) => setPlayers(e.target.value)} /> wins: {gameCount.o} times

                    </div>
                    {winner ? (
                        <div className="text-xl font-bold  mb-4">
                            {winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!`}
                        </div>
                    ) : <div className="text-2xl font-bold h-7 mb-4">
                    </div>}

                    <div className="grid grid-cols-3 gap-2 w-fit mx-auto">

                        {board.map((cell, i) => (
                            <div
                                key={i}
                                className={`${winnerCombos.includes(i) ? "bg-[#7777]" : "bg-[#e2eaa477]"} rounded text-gray-700 text-4xl font-bold flex select-none justify-center items-center w-20  h-20 cursor-pointer`}
                                onClick={() => makeMove(i)}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                    <button
                        className="bg-rose-500 mt-5 hover:bg-rose-400 text-white font-bold py-2 px-4 rounded"
                        onClick={resetGame}
                    >
                        Reset Game
                    </button>
                </div>

            </div>

        </>
    );
};

export default TicTacToe;