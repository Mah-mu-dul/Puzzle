import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/shared/Footer';
import SudokuSolver from './Components/sudoku/SudokuSolver';
import Navbar from './Components/shared/Navbar';
import TicTacToe from './Components/ticTacToe/TicTacToe';
import MorseCodeConverter from './Components/MorseCodeConverter';
import Docs from './Components/Docs';
import CalculateCg from './Components/CGCalculator/CalculateCg';
import { useState } from 'react';
import Game2048 from './Components/Game2048/Game2048';
import Routine from './Components/Routine/Routine';

function App() {
  const [ThemeColor, setThemeColor] = useState("#f4cccc");

  return (
    <div className={`bg-[#f4cccc] flex flex-col justify-between text-black  w-full pb-10 min-h-screen`} >
      <Navbar />
      <div className="h-full">
        <Routes>
          <Route path="/" element={<SudokuSolver />} />
          <Route path="/solver/sudoku" element={<SudokuSolver />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/convert/morsecode" element={<MorseCodeConverter />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/game2048" element={<Game2048 />} />
          <Route path="/calculate-cg" element={<CalculateCg changeThemeColor={() => setThemeColor} />} />
          <Route path="/routine" element={<Routine />} />
        </Routes>

      </div>


      {/* <SudokuSolver /> */}
      <Footer />
    </div>
  );
}

export default App;
