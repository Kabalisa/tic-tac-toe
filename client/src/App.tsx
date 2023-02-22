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

  const handlePlay = async (board: string) => {
    try {
      setIsLoading(true);
      const { data } = await playGame(board);
      setBoard(data.board);
      setWinner(data.winner);
      setTie(data.tie);
      setPlayer("x");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const nexMove = (board: string, index: number) => {
    const newBoard = replace(board, index);
    setBoard(newBoard);
    setPlayer("o");
    handlePlay(newBoard);
  };

  const handleRestart = () => {
    setBoard("+++++++++");
    setWinner(null);
    setTie(false);
    const newPlayer = computePlayer();
    setPlayer(newPlayer);
    if (newPlayer === "o") {
      handlePlay("+++++++++");
    }
  };

  useEffect(() => {
    if (player === "o") {
      handlePlay(board);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">Tic-Tac-Toe Game</header>
      {!winner && !tie && (
        <div className="player-container">
          <span>The current player is: </span>
          <span>{player}</span>
        </div>
      )}
      <div
        className={`board-wrapper ${
          winner || tie || isLoading ? "disabled" : ""
        }`}
      >
        <div className="board-container">
          {formattedBoard.map((el, i) => (
            <button
              className="board-button"
              key={i}
              disabled={el !== "+"}
              onClick={() => nexMove(board, i)}
            >
              {el === "+" ? null : el}
            </button>
          ))}
        </div>
      </div>
      {winner || tie ? (
        <div className="game-results">
          <h2>Game Over</h2>
          {winner && <span>Player {winner} Win. Restart to play again</span>}
          {tie && <span>It's a tie. Restart to play again</span>}
          <button className="restart-game" onClick={handleRestart}>
            Restart
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default App;
