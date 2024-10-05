import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import ReactGA from "react-ga4";

ReactGA.initialize("G-D2N4BQZB3N");
ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
