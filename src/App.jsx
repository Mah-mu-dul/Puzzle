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
import HomeClap369 from "./components/Clap369/Clap369Home.jsx";
import Clap369 from "./components/Clap369/Clap369.jsx";

import Routine from "./Components/Routine/Routine.jsx";
import YoutubeApi1 from "./Components/Youtube/YoutubeApi1";
import Test from "./Components/TestFiles/Test";
import QRCodeGenerator from "./components/QRCodeGenerator.jsx";
import About from "./Components/About";
import Error from "./Components/Error";
import MoneyManagement from "./components/MoneyManagement/MoneyManagement.jsx";
import Connect4Game from "./components/Connect4/Connect4Game.jsx";
import TranscriptAnalyzer from "./Components/TranscriptAnalyzer/TranscriptAnalyzer2.jsx";
import AluminumProfileLengthCalculator from "./components/calculators/StickLengthCalculator.jsx";
import CalculateCg from "./components/CGCalculator/CalculateCg.jsx";
import Home from "./components/Home.jsx";
import CostCalculate from "./components/Routine/CostCalculate.jsx";
import RetakeAssistant from "./Components/Routine/RetakeAssistant.jsx";
import StickCalculator from "./blogs/stickcalculator/StickCalculatorBlog.jsx";
import Blogs from "./blogs/Blogs.jsx";
import Circuit from "./components/Circuits/Circuit.jsx";
import DLD from "./components/Circuits/courses/DLD.jsx";
import CircuitAnalysis from "./components/Circuits/courses/CircuitAnalysis.jsx";
import Electronics1 from "./components/Circuits/courses/Electronics1.jsx";
import Electronics2 from "./components/Circuits/courses/Electronics2.jsx";
import AutomataLanding from "./components/automata/AutomataLanding.jsx";
import MinimizeDFA from "./components/automata/MinimizeDFA.jsx";
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
    <div className="bg-[#FAFBFC] max-w-[1800px] mx-auto overflow-hidden">
      <div
        className={` flex flex-col justify-between text-black  w-full pb-10 min-h-screen transition-background duration-1000`}
        style={{ backgroundColor, transition: "background 2s" }}
      >
        <Navbar />
        <div className="h-full ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solver/sudoku" element={<SudokuSolver />} />
            <Route path="/Connect4" element={<Connect4Game />} />
            <Route path="/game2048" element={<Game2048 />} />
            <Route path="/clap369/start" element={<Clap369 />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/clap369" element={<HomeClap369 />} />
            <Route path="/convert/morsecode" element={<MorseCodeConverter />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/calculate-cg" element={<CalculateCg />} />
            <Route path="/routine" element={<Routine />} />
            <Route path="/youtube-api" element={<YoutubeApi1 />} />
            <Route path="/test" element={<Test />} />
            <Route path="/qr" element={<QRCodeGenerator />} />
            <Route path="/about" element={<About />} />
            <Route path="/money-management" element={<MoneyManagement />} />
            <Route path="/cost-calculator" element={<CostCalculate />} />
            <Route path="/retake-assistant" element={<RetakeAssistant />} />
            <Route path="/courses" element={<Circuit />} />
            <Route path="/courses/dld" element={<DLD />} />
            <Route path="/courses/automata" element={<AutomataLanding />} />
            <Route
              path="/courses/automata/minimizeDFA"
              element={<MinimizeDFA />}
            />
            <Route
              path="/courses/circuit-analysis"
              element={<CircuitAnalysis />}
            />
            <Route path="/courses/electronics-1" element={<Electronics1 />} />
            <Route path="/courses/electronics-2" element={<Electronics2 />} />
            app
            <Route
              path="/stickCalculator"
              element={<AluminumProfileLengthCalculator />}
            />
            <Route
              path="/transcript-analyzer"
              element={<TranscriptAnalyzer />}
            />
            <Route path="/blogs" element={<Blogs />} />
            <Route
              path="/blog/stick-calculator"
              element={<StickCalculator />}
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
