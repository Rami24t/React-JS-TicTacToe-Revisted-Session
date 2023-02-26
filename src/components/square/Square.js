import React from "react";
import { Context } from "../../utils/Context";
import { useContext } from "react";

export default function Square({ number }) {
  const { state, dispatch } = useContext(Context);

  const playerLetter = state.board ? state?.board[number] : 'l';

  return (
    <button className='square '
      onClick={() => {
        dispatch({ type: "clicked", number: number })
        }
        }
    >
      {playerLetter}
    </button>
  );
}
