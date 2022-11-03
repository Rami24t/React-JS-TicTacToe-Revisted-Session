import React from "react";
import { Context } from "../../utils/Context";
import { useContext } from "react";

export default function Square({ playerLetter, number }) {
  const { state, dispatch } = useContext(Context);

  return (
    <button
      onClick={() => dispatch({ type: "clicked", number: number })}
      className="square"
    >
      {playerLetter}
    </button>
  );
}
