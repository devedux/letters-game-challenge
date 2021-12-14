import * as React from 'react'
import Board from './components/board'
import useLettersGame from './hooks/useLettersGame'



export default function App() {
  const lettersGame = useLettersGame()
  const {data: tiles, board, selectTile, word} = lettersGame

  return (
    <div>
      Letters Game!
      <Board 
        tiles={tiles}
        board={board}
        onClick={selectTile}
        word={word}
      />
      {word}
    </div>
  );
}
