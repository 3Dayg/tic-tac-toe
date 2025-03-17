import { useState } from "react";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

export function GameBoard({ onSelectSquare, activePlayerSymbol }) {

  const [gameBoard, setGameBoard] = useState(INITIAL_GAME_BOARD);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard(prevGameBoard => {
      const updatedBoard = prevGameBoard.map(row => [...row]);
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    onSelectSquare()
  };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => handleSelectSquare(rowIndex, colIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
};