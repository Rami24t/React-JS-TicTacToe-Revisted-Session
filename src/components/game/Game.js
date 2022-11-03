import React from "react";
import Board from "../board/Board";
import { useContext } from "react";
import { Context } from "../../utils/Context";

function Game() {
  const { state, dispatch } = useContext(Context);

  return (
    <article className="game container mt-5">
      <section className="row">
        <div className="col-sm-8 game-board">
          <Board />
        </div>
        <div className="col-sm-4 game-info">
          <p className="h2">{/* status */}</p>
          <ul className="nav nav-pills flex-column">
            <li>
              <button onClick={() => dispatch({ type: "reset" })}>
                Start the Game
              </button>
            </li>
            {state.moves.map((move, idx) => (
              <li key={idx + 1}>
                <button
                  onClick={() =>
                    dispatch({ type: "goTo", move: move, idx: idx })
                  }
                >
                  Go to #{idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}

export default Game;
