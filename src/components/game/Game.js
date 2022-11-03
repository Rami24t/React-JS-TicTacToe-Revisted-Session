import React from "react";
import Board from "../board/Board";
import { useContext } from "react";
import { Context } from "../../utils/Context";

function Game() {
  const { state, dispatch } = useContext(Context);

  return (
    <article className="game">
      <section className="">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <p className="h2">{/* status */}</p>
          <ul className="buttonList">
            <li>
              <button onClick={() => dispatch({ type: "reset" })}>
                {state.moves.length<=0 ? 'Start the' : 'Restart'} Game
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
