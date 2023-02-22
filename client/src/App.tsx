import { useState, useEffect } from "react";
import "./App.css";

import { replace, computePlayer } from "./utils/common";
import { playGame } from "./api/play";

const currentPlayer = computePlayer();

const App = () => {
  const [board, setBoard] = useState("+++++++++");
  const [winner, setWinner] = useState(null);
  const [tie, setTie] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [player, setPlayer] = useState(currentPlayer);

  const formattedBoard = board.split("");

  const handlePlay = async () => {
    try {
      setIsLoading(true);
      const result = await playGame(board);
      console.log("==>>>result", result);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlePlay();
  }, []);

  return (
    <div className="App">
      <header className="App-header">Tic-Tac-Toe Game</header>
      <div className="player-container">
        <span>The current player is: </span>
        <span>{player}</span>
      </div>
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
