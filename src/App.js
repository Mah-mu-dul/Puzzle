import { Route, Routes } from 'react-router-dom';
import './App.css';
import reactGA from 'react-ga'
import Footer from './Components/shared/Footer';
import SudokuSolver from './Components/sudoku/SudokuSolver';
import Navbar from './Components/shared/Navbar';
import TicTacToe from './Components/ticTacToe/TicTacToe';
import MorseCodeConverter from './Components/MorseCodeConverter';
import Docs from './Components/Docs';
import CalculateCg from './Components/CGCalculator/CalculateCg';
import { useEffect, useState } from 'react';
import Game2048 from './Components/Game2048/Game2048';
import Routine from './Components/Routine/Routine';
import YoutubeApi1 from './Components/Youtube/YoutubeApi1';
import Test from './Components/TestFiles/Test';
import BackgroundColorChanger from './Components/TestFiles/BackgroundColorChanger ';
import QRCodeGenerator from './Components/QRCodeGenerator';
import About from './Components/About';
import Error from './Components/Error';
import MoneyManagement from './Components/MoneyManagement/MoneyManagement';
import Connect4Game from './Components/Connect4/Connect4Game';
import Courses from './Components/Courses/Courses';

const trackingId = ""
function App() {
  const getRandomHexColor = () => {
    const letters = '3456789abcdef';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 13)];
    }
    color += "22"
    return color;
  };

  const [backgroundColor, setBackgroundColor] = useState(getRandomHexColor);

  useEffect(() => {
    const changeBackgroundColor = () => {
      setBackgroundColor(getRandomHexColor());
    };

    const interval = setInterval(changeBackgroundColor, 7000); // Change color every 3 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-white max-w-[1500px] mx-auto ">
      <div
        className={` flex flex-col justify-between text-black  w-full pb-10 min-h-screen transition-background duration-1000`}
        style={{ backgroundColor, transition: 'background 2s' }}
      >

        <Navbar />
        <div className="h-full ">
          <Routes>
            <Route path="/" element={<CalculateCg />} />
            <Route path="/solver/sudoku" element={<SudokuSolver />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/convert/morsecode" element={<MorseCodeConverter />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/game2048" element={<Game2048 />} />
            <Route path="/calculate-cg" element={<CalculateCg />} />
            <Route path="/routine" element={<Routine />} />
            <Route path="/youtube-api" element={<YoutubeApi1 />} />
            <Route path="/test" element={<Test />} />
            <Route path="/qr" element={<QRCodeGenerator />} />
            <Route path="/about" element={<About />} />
            <Route path="/money-management" element={<MoneyManagement />} />
            <Route path="/Connect4" element={<Connect4Game />} />
            <Route path="/courses" element={<Courses />} />


            <Route path="/*" element={<Error />} />
          </Routes>

        </div>


        {/* <SudokuSolver /> */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
