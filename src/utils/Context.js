import { createContext, useReducer } from "react";

export const Context = createContext({});

export default function ContextProvider({ children }) {
  const reducer = (prevState, action) => {
    switch (action.type) {
      case "reset":
        return {
          ...prevState,
          winner: null,
          player: "X",
          board: [null, null, null, null, null, null, null, null, null],
          moves: [],
        };

      case "goTo":
        console.log(action.move.winner);
        prevState.moves.length = action.idx + 1;
        return {
          ...prevState,
          board: action.move.board,
          player: action.move.prevPlayer == "X" ? "O" : "X",
          winner: action.move.winner
        };
      case "clicked":
        if(prevState.winner || prevState.board[action.number])
          return prevState;
        prevState.board[action.number] = prevState.player;
        prevState.moves.push({
          prevPlayer: prevState.player,
          board: [...prevState.board],
          winner: prevState.getWinner(),
        });
        prevState .winner = prevState.getWinner();
        // continue game
        return { ...prevState, player: prevState.nextPlayer() };
      default:
        break;
    }
    return prevState;
  };

  const [state, dispatch] = useReducer(reducer, {
    winner: null,
    player: "X",
    board: [null, null, null,
            null, null, null,
            null, null, null],
    moves: [],
    nextPlayer: function () {
      return this.player == "X" ? "O" : "X";
    },
    checkWin: function (aBoard) {
      if (aBoard.filter((letter) => letter !== null).length < 3) return false;
      if (
        (aBoard[0] !== null &&
          aBoard[0] === aBoard[1] &&
          aBoard[0] === aBoard[1] &&
          aBoard[1] === aBoard[2]) ||
        (aBoard[3] !== null &&
          aBoard[3] === aBoard[4] &&
          aBoard[4] == aBoard[5]) ||
        (aBoard[6] !== null &&
          aBoard[6] == aBoard[7] &&
          aBoard[7] === aBoard[8]) ||
        (aBoard[0] !== null &&
          aBoard[0] == aBoard[3] &&
          aBoard[3] === aBoard[6]) ||
        (aBoard[1] !== null &&
          aBoard[1] == aBoard[4] &&
          aBoard[4] === aBoard[7]) ||
        (aBoard[2] !== null &&
          aBoard[2] == aBoard[5] &&
          aBoard[5] === aBoard[8]) ||
        (aBoard[0] !== null &&
          aBoard[0] == aBoard[4] &&
          aBoard[4] === aBoard[8]) ||
        (aBoard[2] !== null &&
          aBoard[2] == aBoard[4] &&
          aBoard[4] === aBoard[6])
      )
        return state.player;
      else return false;
    },
    getWinner(){
      return this.checkWin(this.board) ? this.player : ((this.board.filter(sq=>sq===null)).length === 0 ? 'no one' : null)
    }
  });

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

// By Rami Al-Saadi in Nov 3 2022 &copy;