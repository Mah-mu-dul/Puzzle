import React from 'react';

const Docs = () => {
    return (
        <div className="  lg:w-1/2 md:w-[90%] sm:w-[90%] mx-auto ">
            <h2 className="text-3xl font-semibold mb-4 text-center">TicTacToe <a href="https://github.com/wanna-be-pro/Puzzle" className='underline underline-offset-3' target='_blank'>Component</a> Documentation</h2>
            <p className="text-center">(<a href="https://github.com/wanna-be-pro/Puzzle" className='underline mb-8 underline-offset-3' target='_blank'>whole Code link</a>)</p>

            <p>The <code className='bg-[#1114] text-black  px-3 rounded '>`TicTacToe`</code> component is a React functional component that represents a Tic Tac Toe game. It allows players to play against the computer or with a friend. The component is responsible for rendering the game board, making moves, checking for a winner, and handling game reset.</p>
            <h3 className="text-xl font-bold mb-2">Usage</h3>

            <p>To use the <code className='bg-[#1114] text-black  px-3 rounded '>`TicTacToe`</code> component, follow these steps:</p>
            <ol className="list-decimal mx-5 ">
                <li>Import the <code className='bg-[#1114] text-black  px-3 rounded '>`TicTacToe`</code> component into your React application.</li>
                <li>Include the <code className='bg-[#1114] text-black  px-3 rounded '>`TicTacToe`</code> component in your JSX/HTML code.</li>
                <code className='bg-[#1114] text-black  px-3 rounded '>`{`<TicTacToe/>`}`</code>
                <li>Customize the component as needed by modifying the code or passing props.</li>
            </ol>

            <h3 className="text-xl font-bold mb-2">Props</h3>
            <p>The <code className='bg-[#1114] text-black  px-3 rounded '>`TicTacToe`</code> component does not accept any props.</p>

            <h3 className="text-xl font-bold mb-2">Code Explanation</h3>
            <p>
                The code provided is responsible for the logic behind the Tic Tac Toe game. Here's a breakdown of the major parts:
            </p>

            <ol className="list-decimal mx-5 ">
                <li>
                    <strong>State Variables:</strong> The component uses several state variables to keep track of the game state,
                    including <code className='bg-[#1114] text-black  px-3 rounded '>`board`</code>, <code className='bg-[#1114] text-black  px-3 rounded '>`currentPlayer`</code>, <code className='bg-[#1114] text-black  px-3 rounded '>`winner`</code>, <code className='bg-[#1114] text-black  px-3 rounded '>`mode`</code>, and{' '}
                    <code className='bg-[#1114] text-black  px-3 rounded '>`isAgainstComputer`</code>. These variables are managed using the <code className='bg-[#1114] text-black  px-3 rounded '>`useState`</code> hook from React.
                </li>
                <li>
                    <strong>useEffect:</strong> The <code className='bg-[#1114] text-black  px-3 rounded '>`useEffect`</code> hook is used to trigger the computer's move when it's
                    the computer's turn. It listens for changes in the <code className='bg-[#1114] text-black  px-3 rounded '>`currentPlayer`</code> and <code className='bg-[#1114] text-black  px-3 rounded '>`winner`</code> variables
                    and calls the appropriate move function based on the selected game mode (<em>easy</em>, <em>medium</em>, or{' '}
                    <em>hard</em>).
                </li>
                <li>
                    <strong>checkWinner:</strong> The <code className='bg-[#1114] text-black  px-3 rounded '>`checkWinner`</code> function checks the current state of the game board
                    to determine if there is a winner. It compares the values in the <code className='bg-[#1114] text-black  px-3 rounded '>`board`</code> array with the winning combinations
                    and returns the winning player or <code className='bg-[#1114] text-black  px-3 rounded '>`null`</code> if there is no winner.
                </li>
                <li>
                    <strong>makeMove:</strong> The <code className='bg-[#1114] text-black  px-3 rounded '>makeMove</code> function is called when a player makes a move by clicking on a cell
                    on the game board. It updates the game board's state, checks for a winner, and updates the current player. If the clicked
                    cell is already occupied or there is a winner, the function does nothing.
                </li>
                <li>
                    <strong>moveMid:</strong> The <code className='bg-[#1114] text-black  px-3 rounded '>moveMid</code> function implements the medium-level strategy for the computer's move.
                    It analyzes the game board to find potential winning positions for both the computer and the opponent. If it finds a winning
                    position for the computer, it returns the index of that position. Otherwise, it selects a random empty cell if available.
                </li>
                <li>
                    <strong>makeMoveEasy:</strong> The <code className='bg-[#1114] text-black  px-3 rounded '>makeMoveEasy</code> function is called when the computer is playing in easy mode.
                    It selects a random empty cell on the game board and makes a move by calling the <code className='bg-[#1114] text-black  px-3 rounded '>makeMove</code> function.
                </li>
                <li>
                    <strong>makeMoveMedium:</strong> The <code className='bg-[#1114] text-black  px-3 rounded '>makeMoveMedium</code> function is called when the computer is playing in medium mode.
                    It uses the <code className='bg-[#1114] text-black  px-3 rounded '>moveMid</code> function to determine the optimal move for the computer based on the current game state. It
                    delays the move by 200 milliseconds to provide a more natural playing experience.
                </li>
                <li>
                    <strong>makeMoveHard:</strong> The <code className='bg-[#1114] text-black  px-3 rounded '>makeMoveHard</code> function is a placeholder for implementing the hard-level strategy.
                    Currently, it doesn't have any logic implemented and can be customized as per your requirements.
                </li>
                <li>
                    <strong>resetGame:</strong> The <code className='bg-[#1114] text-black  px-3 rounded '>resetGame</code> function resets the game by setting the initial values for the game board,
                    current player, and winner state variables.
                </li>
                <li>
                    <strong>handleToggle:</strong> The <code className='bg-[#1114] text-black  px-3 rounded '>handleToggle</code> function is called when the game mode toggle switch is clicked.
                    It toggles the value of the <code className='bg-[#1114] text-black  px-3 rounded '>isAgainstComputer</code> state variable, resetting the game to the initial state.
                </li>
                <li>
                    <strong>Rendering and Styling:</strong> The Tic Tac Toe game is rendered using React components and styled using Tailwind CSS. The game board is displayed as a grid of cells, with each cell represented by a div element. The state of the game is stored using React's useState hook, allowing for dynamic updates and rendering of the game board. CSS classes from Tailwind CSS are applied to style the elements, providing a visually appealing and responsive user interface.
                </li>

                <li>
                    <strong>Tailwind CSS:</strong> Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined classes to easily style HTML elements. In this code snippet, Tailwind CSS classes are used to style various elements such as the game board cells, buttons, text, and layout. By leveraging Tailwind CSS, you can easily customize the appearance of the Tic Tac Toe game to match your desired design preferences.
                </li>
                {/* ... Other points */}
            </ol>

            <h3 className="text-xl font-bold mb-2">Conclusion</h3>
            <p>
                The <code className='bg-[#1114] text-black  px-3 rounded '>`TicTacToe`</code> component provides the logic and functionality for playing a Tic Tac Toe game. It supports
                playing against the computer with different difficulty modes and playing with a friend. You can customize the component's
                appearance and behavior by modifying the code or passing props. Enjoy playing Tic Tac Toe!
            </p>
        </div>
    );
};

export default Docs;