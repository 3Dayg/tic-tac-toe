export function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length && gameTurns[0].player === "X")
    currentPlayer = "O";

  return currentPlayer;
};