import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./components/game/Game";
import ContextProvider from "./utils/Context";

import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <Game />
  </ContextProvider>
);
