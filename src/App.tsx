import * as React from 'react'
import {getTiles, validTiles} from './utils/letters-game'
import Board from './components/board'



export default function App() {
  const [tiles, setTiles] = React.useState<Array<string>>(
    () => getTiles()
  )
  const [lastSelected, setLastSelected] = React.useState<number | undefined>(undefined)
  const [word, setWord] = React.useState('')

  function selectTile(letter: string, position: number) {
    if (lastSelected !== undefined) {
      if (word.includes(letter)) {
        alert('esta letra ya fue seleccionada')
        return
      }
      if (!validTiles(lastSelected).includes(position)) {
        alert('tile no valida, porfavor seleccione una casilla vecina')
        return;
      }
    }
    setWord(word + letter)
    setLastSelected(position)
  }

  return (
    <div>
      Letters Game!
      <Board tiles={tiles} onClick={selectTile} />
      {word}
    </div>
  );
}
