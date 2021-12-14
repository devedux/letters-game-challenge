import * as React from 'react'
import {getTiles, validTiles} from './utils/letters-game'
import Board from './components/board'
import useLettersGame from './hooks/useLettersGame'



export default function App() {
  const lettersGame = useLettersGame()
  const {data: tiles, board, selectTile} = lettersGame
  const [lastSelected, setLastSelected] = React.useState<number | undefined>(undefined)
  const [word, setWord] = React.useState('')



  return (
    <div>
      Letters Game!
      <Board tiles={tiles} board={board} onClick={selectTile} />
      {word}
    </div>
  );
}
