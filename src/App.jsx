import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Footer from "./Components/shared/Footer";
import SudokuSolver from "./Components/sudoku/SudokuSolver";
import Navbar from "./Components/shared/Navbar";
import TicTacToe from "./Components/ticTacToe/TicTacToe";
import MorseCodeConverter from "./Components/MorseCodeConverter";
import Docs from "./Components/Docs";
import { useEffect, useState } from "react";
import Layout from "./components/shared/Layout";
import { Toaster } from "react-hot-toast";

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
import CostCalculate from "./Components/Routine/CostCalculate.jsx";
import StickCalculator from "./blogs/stickcalculator/StickCalculatorBlog.jsx";
import Blogs from "./blogs/Blogs.jsx";
import Circuit from "./components/Circuits/Circuit.jsx";
import DLD from "./components/Circuits/courses/DLD.jsx";
import CircuitAnalysis from "./components/Circuits/courses/CircuitAnalysis.jsx";
import Electronics1 from "./components/Circuits/courses/Electronics1.jsx";
import Electronics2 from "./components/Circuits/courses/Electronics2.jsx";
import AutomataLanding from "./components/automata/AutomataLanding.jsx";
import MinimizeDFA from "./components/automata/MinimizeDFA.jsx";
import WordCounter from "./components/writer helper/WordCounter.jsx";
import StudentsTools from "./components/StudentsTools.jsx";
import Games from "./components/category-pages/Games.jsx";
import Tools from "./components/category-pages/Tools.jsx";
import Planners from "./components/category-pages/Planners.jsx";
import Finance from "./components/category-pages/Finance.jsx";
import CSCourses from "./components/category-pages/CSCourses.jsx";
import AcademicAnalysis from "./components/category-pages/AcademicAnalysis.jsx";
import Normalization from "./components/DBMS/Normalization.jsx";
import ChatLanding from "./components/chat/ChatLanding.jsx";
import TranscriptAnalyzer3 from "./components/TranscriptAnalyzer/TranscriptAnalyzer3.jsx";
import RetakeAssistant from "./Components/TranscriptAnalyzer/RetakeAssistant.jsx";
import BuyMeACoffee from "./components/BuyMeCoffee/BuyMeACoffee.jsx";
import CalculateCg2 from "./components/CGCalculator/CalculateCg2.jsx";
import ReactionDot from "./pages/reactionDot/ReactionDot.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import PreviousSemQuestions from "./pages/PreviousSemQuestions";
import Contribute from "./pages/Contribute";
import SuperAdminMahmudul from "./pages/superradminmahmudul.jsx";
import ThimbleRigGame from "./components/thimbleRig/ThimbleRigGame.jsx";
// import TranscriptAnalyzer3 from "./components/TranscriptAnalyzer/TranscriptAnalyzer3.jsx";
const trackingId = "";

// Add this component for protected route
const ProtectedClap369 = () => {
  const players = JSON.parse(localStorage.getItem("currentPlayers")) || [];
  if (players.length < 2) {
    return <Navigate to="/clap369" replace />;
  }
  return <Clap369 />;
};

function App() {
  const getRandomHexColor = () => {
    return "#eee";
  };

  const [backgroundColor, setBackgroundColor] = useState(getRandomHexColor);

  useEffect(() => {
    const changeBackgroundColor = () => {
      setBackgroundColor(getRandomHexColor());
    };

    const interval = setInterval(changeBackgroundColor, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatLanding />} />

          <Route path="/student-tools" element={<StudentsTools />} />
          <Route path="/games" element={<Games />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/planners" element={<Planners />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/cs-courses" element={<CSCourses />} />
          <Route path="/academic-analysis" element={<AcademicAnalysis />} />
          <Route path="/solver/sudoku" element={<SudokuSolver />} />
          <Route path="/Connect4" element={<Connect4Game />} />
          <Route path="/reaction-dot" element={<ReactionDot />} />
          <Route path="/game2048" element={<Game2048 />} />
          <Route path="/thimble-rig" element={<ThimbleRigGame />} />
          <Route path="/clap369" element={<HomeClap369 />} />
          <Route path="/clap369/start" element={<ProtectedClap369 />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/convert/morsecode" element={<MorseCodeConverter />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/calculate-cg" element={<CalculateCg2 />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/youtube-api" element={<YoutubeApi1 />} />
          <Route path="/test" element={<Test />} />
          <Route path="/qr" element={<QRCodeGenerator />} />
          <Route path="/word-count" element={<WordCounter />} />
          <Route path="/about" element={<About />} />
          <Route path="/money-management" element={<MoneyManagement />} />
          <Route path="/cost-calculator" element={<CostCalculate />} />
          <Route path="/retake-assistant" element={<RetakeAssistant />} />
          <Route path="/courses" element={<Circuit />} />
          <Route path="/courses/dld" element={<DLD />} />
          <Route path="/courses/automata" element={<AutomataLanding />} />
          {/* <Route path="/courses/dbms-normalization" element={<Normalization />} /> */}
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
          <Route
            path="/stickCalculator"
            element={<AluminumProfileLengthCalculator />}
          />
          <Route
            path="/transcript-analyzer"
            element={<TranscriptAnalyzer3 />}
          />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/buy-me-a-coffee" element={<BuyMeACoffee />} />

          <Route path="/blog/stick-calculator" element={<StickCalculator />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/previous-sem-questions"
            element={<PreviousSemQuestions />}
          />
          <Route path="/psq" element={<PreviousSemQuestions />} />
          <Route path="/superadminmahmudul" element={<SuperAdminMahmudul />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
