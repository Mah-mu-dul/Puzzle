import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/shared/Footer';
import SudokuSolver from './Components/sudoku/SudokuSolver';
import Navbar from './Components/shared/Navbar';
import TicTacToe from './Components/ticTacToe/TicTacToe';
import MorseCodeConverter from './Components/MorseCodeConverter';
import Docs from './Components/Docs';
import YoutubeWatch from './Components/YoutubeWatch';

function App() {
  return (
    <div className='bg-[#f4cccc] flex flex-col justify-between text-black  w-full pb-10 min-h-screen' >
      <Navbar />
      <div className="h-full">
        <Routes>
          <Route path="/" element={<SudokuSolver />} />
          <Route path="/solver/sudoku" element={<SudokuSolver />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/convert/morsecode" element={<MorseCodeConverter />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/yt" element={<YoutubeWatch />} />
        </Routes>

      </div>

      {/* <SudokuSolver /> */}
      <Footer />
    </div>
  );
}

export default App;
