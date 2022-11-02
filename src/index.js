import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";

// ==========================
// Components
// ==========================
function Square() {
  return <button className="square">{/* TODO */}</button>;
}

function Board() {
  const renderSquare = (i) => {
    return <Square />;
  };
  const status = "Next player: X";

  return (
    <React.Fragment>
      <div className="status h2 text-center">{status}</div>
      <div className="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </React.Fragment>
  );
}

function Game() {
  return (
    <article className="game container mt-5">
      <section className="row">
        <div className="col-sm-8 game-board">
          <Board />
        </div>
        <div className="col-sm-4 game-info">
          <p className="h2">{/* status */}</p>
          <ul className="nav nav-pills flex-column">{/* TODO */}</ul>
        </div>
      </section>
    </article>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
