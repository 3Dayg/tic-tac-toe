export const GameOver = ({ winner, handleRestart }) => {
  return <div id="game-over">
    <h2>Game Over</h2>
    {
      winner ? <p>{winner} won!</p> :
        <p>It's a draw!</p>
    }
    <p><button onClick={handleRestart}>Rematch!</button></p>
  </div>
};