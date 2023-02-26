import React, { useContext, useEffect } from "react";
import Square from "../square/Square";
import { Context } from "../../utils/Context";

export default function Board() {
  const { state } = useContext(Context);

  useEffect(()=>{
    console.log(state.updtUI);
    state.updtUI();
  },[])

  const renderSquare = (i) => {
    return <Square number={i} playerLetter={state.board && state?.board[i]} />;
  };
  const status = state?.winner === 'no one'? 'No winners' : state?.winner ? "Player " + state?.winner + " won!!!" : "Next player: " + state?.player;

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
