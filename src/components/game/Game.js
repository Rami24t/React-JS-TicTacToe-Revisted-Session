import React from "react";
import Board from "../board/Board";
import { useContext, useEffect } from "react";
import { Context } from "../../utils/Context";
import { useRef } from "react";

function Game() {
  
 const { state, dispatch } = useContext(Context);
 const state2 = state.value;
 
console.log('state',state2);
  return (
    <article className="game">
    {state?.toString()}
      <section className="">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <p className="h2">{/* status */}</p>
          <ul className="buttonList">
            <li>
              <button onClick={() => dispatch({ type: "reset" })}>
                {state?.moves?.length<=0 ? 'Start the' : 'Restart'} Game
              </button>
            </li>
            {state?.moves?.map((move, idx) => (
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
