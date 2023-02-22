import { useState, useEffect } from "react";
import "./App.css";

import { replace, computePlayer } from "./utils/common";
import { playGame } from "./api/play";

const currentPlayer = computePlayer();

const App = () => {
  const [board, setBoard] = useState("+++++++++");
  const formattedBoard = board.split("");

  const handlePlay = async () => {
    try {
      const result = await playGame(board);
      // console.log("==>>>result", result);
    } catch (error) {}
  };

  useEffect(() => {
    handlePlay();
  }, []);

  return (
    <div className="App">
      <header className="App-header">Tic-Tac-Toe Game</header>
      <div className="board-wrapper">
        <div className="board-container">
          {formattedBoard.map((el, i) => (
            <button className="board-button" key={i}>
              x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
