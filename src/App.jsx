import { useState } from 'react';
import './App.css'
import { GameBoard } from './components/GameBoard'
import Player from './components/Player'
import { Log } from './components/Log';
import { GameOver } from './components/GameOver';
import { deriveWinner } from './utils/deriveWinner';
import { deriveActivePlayer } from './utils/deriveActivePlayer';
import { deriveGameBoard } from './utils/deriveGameBoard';
import { PLAYERS } from './utils/costants';

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRestart() {
    setGameTurns([]);
  };

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  };

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChange={handlePlayerNameChange} />
        <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChange={handlePlayerNameChange} />
      </ol>
      {
        (winner || hasDraw) &&
        <GameOver
          winner={winner}
          handleRestart={handleRestart}
        />
      }
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
