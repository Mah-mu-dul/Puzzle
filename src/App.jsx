import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/shared/Footer";
import SudokuSolver from "./Components/sudoku/SudokuSolver";
import Navbar from "./Components/shared/Navbar";
import TicTacToe from "./Components/ticTacToe/TicTacToe";
import MorseCodeConverter from "./Components/MorseCodeConverter";
import Docs from "./Components/Docs";
import { useEffect, useState } from "react";
import Game2048 from "./components/Game2048/Game2048.jsx";
import Routine from "./Components/Routine/Routine.jsx";
import YoutubeApi1 from "./Components/Youtube/YoutubeApi1";
import Test from "./Components/TestFiles/Test";
import QRCodeGenerator from "./components/QRCodeGenerator.jsx";
import About from "./Components/About";
import Error from "./Components/Error";
import MoneyManagement from "./components/MoneyManagement/MoneyManagement.jsx";
import Connect4Game from "./components/Connect4/Connect4Game.jsx";
import TranscriptAnalyzer from "./Components/TranscriptAnalyzer/TranscriptAnalyzer2.jsx";
import AluminumProfileLengthCalculator from "./Components/calculators/AluminumProfileLengthCalculator.jsx";
import CalculateCg from "./components/CGCalculator/CalculateCg.jsx";

const trackingId = "";
function App() {
  const getRandomHexColor = () => {
    return "#eee";
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
    <div className="bg-white max-w-[1800px] mx-auto ">
      <div
        className={` flex flex-col justify-between text-black  w-full pb-10 min-h-screen transition-background duration-1000`}
        style={{ backgroundColor, transition: "background 2s" }}
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
            <Route
              path="/stickCalculator"
              element={<AluminumProfileLengthCalculator />}
            />
            <Route
              path="/transcript-analyzer"
              element={<TranscriptAnalyzer />}
            />

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
