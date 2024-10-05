import React, { useEffect, useRef, useState } from 'react';
import Documentation from './Documentation';

const SudokuSolver = () => {
    const [defaultValue, setDefaultValue] = useState(0)
    const [solvedMatrix, setSolvedMatrix] = useState(Array(9).fill(Array(9).fill("")));
    const [error, setError] = useState("")

    const removeError = () => {
        const timer = setTimeout(() => {
            setError("");
        }, 5000);

        return () => clearTimeout(timer);
    }
    function solveSudoku(grid) {

        if (isValidSudoku(grid)) {
            removeError()
            return grid;
        }
        if (checkSize(grid)) {
            removeError()
            return grid;
        }

        const [row, col] = findEmptyCell(grid);

        if (row === null) {
            return grid;
        }

        for (let num = 1; num <= 9; num++) {
            if (isValidMove(grid, row, col, num)) {
                grid[row][col] = num;

                if (solveSudoku(grid) !== null) {
                    return grid;
                }

                grid[row][col] = 0;
            }
        }

        return null;
    }
    // check the number size
    const checkSize = (grid) => {
        for (let i = 0; i < 9; i++) {
            const row = grid[i];
            for (let j = 0; j < 9; j++) {
                if (row[j] < 0 || row[j] > 9) {
                    setError(`invalid number ${row[j]} found in row ${i + 1}, col ${j + 1}`)
                    console.log(`Duplicate value ${row[j]} found in row ${i + 1}, col ${j + 1}`);
                    return true;
                }
            }
        }
    }
    function isValidSudoku(grid) {
        // Check rows for duplicates
        for (let i = 0; i < 9; i++) {
            const row = grid[i];
            for (let j = 0; j < 9; j++) {
                if (row[j] !== 0 && row.slice(j + 1).includes(row[j])) {
                    setError(`Duplicate value ${row[j]} found in row ${i + 1}, col ${j + 1}`)
                    console.log(`Duplicate value ${row[j]} found in row ${i + 1}, col ${j + 1}`);
                    return true;
                }
            }
        }

        // Check columns for duplicates
        for (let j = 0; j < 9; j++) {
            const col = Array.from({ length: 9 }, (_, i) => grid[i][j]);
            for (let i = 0; i < 9; i++) {
                if (col[i] !== 0 && col.slice(i + 1).includes(col[i])) {
                    console.log(`Duplicate value ${col[i]} found in row ${i + 1}, column ${j + 1}`);
                    return true;
                }
            }
        }

        // Check 3x3 squares for duplicates
        for (let i = 0; i < 9; i += 3) {
            for (let j = 0; j < 9; j += 3) {
                const square = [];
                for (let r = i; r < i + 3; r++) {
                    for (let c = j; c < j + 3; c++) {
                        square.push(grid[r][c]);
                    }
                }
                for (let k = 0; k < 9; k++) {
                    if (square[k] !== 0 && square.slice(k + 1).includes(square[k])) {
                        console.log(`Duplicate value ${square[k]} found in square ${Math.floor(i / 3) + 1}, ${Math.floor(j / 3) + 1}`);
                        return true;
                    }
                }
            }
        }

        return false;
    }

    function findEmptyCell(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return [null, null];
    }

    function isValidMove(grid, row, col, num) {
        return (
            isValidInRow(grid, row, num)
            && isValidInCol(grid, col, num)
            && isValidInBox(grid, row, col, num)
        );
    }

    function isValidInRow(grid, row, num) {
        return !grid[row].includes(num);
    }

    function isValidInCol(grid, col, num) {
        for (let row = 0; row < 9; row++) {
            if (grid[row][col] === num) {
                return false;
            }
        }
        return true;
    }

    function isValidInBox(grid, row, col, num) {
        // Check if the number is valid in the current 3x3 box
        let box_row = Math.floor(row / 3) * 3;
        let box_col = Math.floor(col / 3) * 3;
        for (let i = box_row; i < box_row + 3; i++) {
            for (let j = box_col; j < box_col + 3; j++) {
                if (grid[i][j] == num) {
                    return false;
                }
            }
        }
        return true;
    }


    // const solved = solveSudoku([
    //     [0, 0, 9, 0, 0, 2, 8, 0, 0],
    //     [0, 4, 0, 9, 0, 0, 0, 0, 7],
    //     [0, 0, 2, 8, 7, 0, 0, 0, 0],
    //     [0, 6, 0, 0, 0, 0, 9, 0, 0],
    //     [0, 0, 0, 0, 6, 0, 0, 0, 0],
    //     [0, 0, 8, 0, 0, 0, 0, 7, 0],
    //     [0, 0, 0, 0, 4, 5, 3, 0, 0],
    //     [1, 0, 0, 0, 0, 7, 0, 5, 0],
    //     [0, 0, 4, 2, 0, 0, 7, 0, 0]
    // ])
    // console.log(solved)


    const inputRefs = useRef([]);

    function handleInputChange(event, i, j) {
        const value = parseInt(event.target.value);
        // console.log(value)
        // Do something with the value...
    }

    const [value, setValue] = useState('');
    const reset = (e) => {
        setSolvedMatrix(Array(9).fill(Array(9).fill("")))
    }
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleFocus = (e) => {
        e.target.value = ""
        setError("")
        // if (e.target.value === 'Default Value') {
        //     setValue('');
        // }
    }

    const handleBlur = (e) => {
        if (e.target.value === '') {
            setValue('Default Value');
        }
    }
    const [rows, setRows] = useState([]);


    useEffect(() => {
        const newRows = [];
        console.log(solvedMatrix)

        solvedMatrix.map((row, i) => {
            const cols = [];
            row.map((col, j) => {
                const index = i * 9 + j;
                cols.push(
                    <input
                        key={index}
                        type="number"
                        min="1"
                        max="9"
                        placeholder={col}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`sudoku-input border-0 rounded placeholder:text-black focus:border-0 w-9 text-gray-700 m-[0.5px] focus:ring-0 h-9 text-center  ${(Math.floor(i / 3) + Math.floor(j / 3)) % 2 === 0 ? "bg-[#b498bdb5]" : "bg-[#8c8f6ba1]"} `}
                        ref={(el) => (inputRefs.current[index] = el)}
                    />
                );
            })
            newRows.push(<div key={i} className="rounded sudoku-row ">{cols}</div>);

        })
        setRows(newRows);
    }, [solvedMatrix]);


    function getMatrixFromInputs() {
        const matrix = [];
        for (let i = 0; i < 9; i++) {
            const row = [];
            for (let j = 0; j < 9; j++) {
                const index = i * 9 + j;
                const inputValue = inputRefs.current[index].value ? inputRefs.current[index].value : inputRefs.current[index].placeholder;
                const value = inputValue ? parseInt(inputValue, 10) : 0;
                row.push(value);
            }
            matrix.push(row);
        }
        // console.log(matrix)
        const solved = solveSudoku(matrix)
        setSolvedMatrix(solved)
        // console.log(solvedMatrix)
    }
    return (
        <div className="">
            {/* <Documentation/> */}
            <p className="text-3xl text-center font-bold mb-5">Sudoku Solver</p>
            <div className='flex flex-wrap gap-5 justify-around items-start  '>
                <ol class="list-decimal lg:w-[25%] md:w-[40%] sm:w-[80%] mx-3 py-8 static px-8 rounded  bg-green-400">
                    <p className="text-xl underline underline-offset-2">Instructions </p>
                    <li> Input the Sudoku puzzle into the solver.</li>
                    <li> Numbers should be 0 to 9</li>
                    <li> Click the "solve" button to generate a solution.</li>
                    <li> Verify that the solution is correct.</li>
                    <li> If the solution is correct, use it to fill in the puzzle.</li>
                    <li> If the solution is incorrect or the solver fails to find a solution, try again or solving the puzzle manually.</li>
                </ol>

                <div id="sudoku-grid  block ">
                    <table className='mx-auto rounded '>
                        <tbody className='rounded'>
                            <tr className='bg-transparent rounded'>{rows}</tr>
                        </tbody>
                    </table>
                    <div className="mx-auto flex justify-around  w-fit">
                        <button className='btn mx-5 btn-small bg-[#c7d9c9] text-black mt-5 border-0 hover:bg-[#e1ddf5]' onClick={() => { reset() }}>reset</button>
                        <button className='btn mx-5 bg-[#c7d9c9] text-black mt-5 border-0 hover:bg-[#e1ddf5]' onClick={() => { getMatrixFromInputs() }}>Solve</button>
                    </div>
                    <div className="w-1/2 mx-auto mt-2 " />
                    <p className='text-rose-600  text-center p-5 '>{error}</p>
                </div>
                <div className="lg:w-[25%] md:w-[90%] sm:w-[80%] py-8 block px-8 rounded mx-3  bg-rose-400">
                    <p className="text-xl underline underline-offset-2">Warning </p>
                    <p className="text-lg ">
                        Automatic Sudoku solvers can be harmful because they can prevent you from fully engaging with the puzzle and developing your problem-solving skills. Additionally, using a solver may not be allowed in certain Sudoku competitions or challenges. Use with caution and only as a last resort.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SudokuSolver;