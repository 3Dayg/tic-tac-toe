import { useState } from 'react';
import './App.css'
import { GameBoard } from './components/GameBoard'
import Player from './components/Player'
import { Log } from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import { GameOver } from './components/GameOver';

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length && gameTurns[0].player === "X")
    currentPlayer = "O";

  return currentPlayer;
};


function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = INITIAL_GAME_BOARD;

  for (const turn of gameTurns) {
    const { row, col } = turn.square;
    gameBoard[row][col] = turn.player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].col];
    const secondSquare = gameBoard[combination[1].row][combination[1].col];
    const thirdSquare = gameBoard[combination[2].row][combination[2].col];

    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = firstSquare;
    }
  };

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(gameTurns);

      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex
          },
          player: currentPlayer

        },
        ...prevTurns
      ];

      return updatedTurns
    });
  };

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} />
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
      </ol>
      {winner && <GameOver winner={winner} />}
      <GameBoard
        board={gameBoard}
        onSelectSquare={handleSelectSquare}
        turns={gameTurns}
      />
    </div>
    <Log turns={gameTurns} />
  </main>
};

export default App
