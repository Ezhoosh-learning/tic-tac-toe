import React, { useState } from "react";
import Square from "../components/square";
import { calculateWinner } from "../utils";

export default function Board() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isXNext = currentMove % 2 === 0;

  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  const handleClick = (index) => {
    if (currentSquares[index] || winner) return;

    const nextSquares = currentSquares.slice();
    nextSquares[index] = isXNext ? "X" : "O";

    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  };

  const handleReset = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!currentSquares.includes(null)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="board">
        <div className="status">{status}</div>
        <div className="row">
          <Square value={currentSquares[0]} onClick={() => handleClick(0)} />
          <Square value={currentSquares[1]} onClick={() => handleClick(1)} />
          <Square value={currentSquares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="row">
          <Square value={currentSquares[3]} onClick={() => handleClick(3)} />
          <Square value={currentSquares[4]} onClick={() => handleClick(4)} />
          <Square value={currentSquares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="row">
          <Square value={currentSquares[6]} onClick={() => handleClick(6)} />
          <Square value={currentSquares[7]} onClick={() => handleClick(7)} />
          <Square value={currentSquares[8]} onClick={() => handleClick(8)} />
        </div>

        <button className="reset-button" onClick={handleReset}>
          Restart Game
        </button>
      </div>

      <div className="history">
        <h3>Move History</h3>
        <ul className="moves">
          {history.map((_, move) => {
            const player = move === 0 ? null : (move % 2 === 0 ? "O" : "X");
            return (
              <li key={move}>
                <button onClick={() => jumpTo(move)}>
                  {move === 0
                    ? "Go to game start"
                    : `Go to move #${move} - ${player}`}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
