import { createContext, useEffect, useReducer } from "react";
export const Context = createContext({});

export default function ContextProvider({ children }) {
  // const url='https://api.jsonbin.io/v3/b/6367fc9f2b3499323bf78c50';
  const url='http://localhost:5000/record';
  const squares = document.getElementsByClassName("square");

  useEffect(() => {
    dispatch({type: 'update'});

    // return ()=>    dispatch({type: 'update'});

  }, [])
  
  async function updateSquaresUI(){
    // console.log(squares);
    const stateResolved = await state;
    try {
          for (const sq of squares) {
        sq.classList?.remove("winner", "disabled","clicked");
        if (
          stateResolved.board[Array.from(stateResolved.squares)?.indexOf(sq)] !==
          null)
        sq.classList?.add("clicked");
          sq.innerText = stateResolved.board[Array.from(stateResolved.squares).indexOf(sq)];
      }
    } catch (error) {
      console.log(error);
    }
    console.log(stateResolved);
    }
  async function fetchData(){
  const response =  await fetch(url);
  const data = (await response.json())
  // .record;
   updateSquaresUI();
  return data;
}

async function putData(data){
  const dataSquares = data.squares;
  delete data.squares;
  console.log('20', data = JSON.stringify(data));
 let response = await fetch(url, (
  {
    "method": "PUT", 
    "body":  data, 
    "headers" : 
    {
      "Content-Type" : "application/json"
    }
  }
  )
  );
  response = (await response.json())
  //.record;
  console.log('put response', response);
  response.dataSquares = data.squares;
  return response;
}
  let data = {};
  const reducer = async (prevState, action) => {
    switch (action.type) {
      case "update":
        data = await fetchData();
        console.log('30: ', data);
        return  {...prevState, ...data};
      case "reset":
        prevState = await prevState;
        for (const sq of prevState?.squares) {
          sq.classList.remove("winner", "disabled", "clicked");
          sq.innerText = null;
        }
        data = {
          ...prevState,
          winner: null,
          player: "X",
          board: [null, null, null, null, null, null, null, null, null],
          moves: [],
        };
        await putData(data);
        return {...prevState, ...data };
      case "goTo":
        prevState.moves.length = action.idx + 1;
        const moveWinner = action.move.winner;
        if (!moveWinner)
          for (const sq of prevState?.squares) {
            sq.classList.remove("winner", "disabled");
            sq.classList.add("clicked");
            if (
              action.move.board[Array.from(prevState?.squares).indexOf(sq)] ==
              null
            )
              sq.classList.remove("clicked");
          }
        data = {
          ...prevState,
          board: action.move.board,
          player: action.move.prevPlayer == "X" ? "O" : "X",
          winner: action.move.winner,
        };
        await putData(data);
        return {...prevState, ...data};
      case "clicked":
        prevState = await prevState;
        console.log('60', prevState);
        if (prevState?.winner || prevState?.board[action.number])
          return prevState;
        prevState && prevState?.board && (prevState.board[action.number] = prevState?.player);
        prevState?.moves.push({
          prevPlayer: prevState?.player,
          board: [...prevState?.board],
          winner: prevState?.getWinner(),
        });
        prevState.winner = prevState?.getWinner();
        const thisSquare = prevState?.squares[action.number];
        if (prevState?.winner) {
          for (const element of prevState?.squares)
            element.classList.add("disabled", "clicked");
          let checkWin = null;
          if ((checkWin = prevState?.checkWin(prevState?.board)))
            for (const i of checkWin)
              prevState?.squares[i].classList.add("winner");
        }
        thisSquare.classList.add("clicked");
        thisSquare.innerText = prevState.player;
        data = { ...prevState, player: prevState?.nextPlayer() };
        await putData(data);
        prevState = {...prevState, ...data};
        // dispatch({type: 'update'});
        return {...prevState};
      default:
        break;
    }
    // return prevState;
  };

  const [state, dispatch] = useReducer(reducer, {
    squares: squares,
    winner: null,
    player: "X",
    board: [null, null, null, null, null, null, null, null, null],
    moves: [],
    nextPlayer: function () {
      return this.player == "X" ? "O" : "X";
    },
    checkWin: function (aBoard) {
      if (aBoard.filter((letter) => letter !== null).length < 3) return false;
      let win = [];
      if (
        aBoard[0] &&
        aBoard[0] === aBoard[1] &&
        aBoard[0] === aBoard[1] &&
        aBoard[1] === aBoard[2]
      )
        win = win.concat([0, 1, 2]);
      if (aBoard[3] && aBoard[3] === aBoard[4] && aBoard[4] == aBoard[5])
        win = win.concat([3, 4, 5]);
      if (aBoard[6] && aBoard[6] == aBoard[7] && aBoard[7] === aBoard[8])
        win = win.concat([6, 7, 8]);
      if (
        aBoard[0] !== null &&
        aBoard[0] == aBoard[3] &&
        aBoard[3] === aBoard[6]
      )
        win = win.concat([0, 3, 6]);
      if (aBoard[1] && aBoard[1] == aBoard[4] && aBoard[4] === aBoard[7])
        win = win.concat([1, 4, 7]);
      if (aBoard[2] && aBoard[2] == aBoard[5] && aBoard[5] === aBoard[8])
        win = win.concat([2, 5, 8]);
      if (aBoard[0] && aBoard[0] == aBoard[4] && aBoard[4] === aBoard[8])
        win = win.concat([0, 4, 8]);
      if (aBoard[2] && aBoard[2] == aBoard[4] && aBoard[4] === aBoard[6])
        win = win.concat([2, 4, 6]);
      if (win.length > 2) {
        console.log(win);
        return win;
      } else return false;
    },
    getWinner() {
      return this.checkWin(this.board)
        ? this.player
        : this.board.filter((sq) => sq === null).length === 0
        ? "no one"
        : null;
    },
    updtUI: updateSquaresUI
  });
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}
// By Rami Al-Saadi in Nov 3 2022 &copy;
