import * as React from 'react'
import {getTiles} from './utils/letters-game'
import Board from './components/board'

function validTiles(lastSelected: number) {
  const leftTiles = [0, 4, 8, 12]
  const rightTiles = [3, 7, 11, 15]

  let nextTile = rightTiles.includes(lastSelected) ? lastSelected - 1 : lastSelected + 1
  let topTile = lastSelected - 4
  let topNextTile = nextTile - 4
  let bottomTile = lastSelected + 4
  let bottomNextTile = nextTile + 4

  let prevTile;
  let topPrevTile;
  let bottomPrevTile;
  if (!leftTiles.includes(lastSelected) && !rightTiles.includes(lastSelected)) {
    prevTile = lastSelected - 1
    topPrevTile = prevTile - 4
    bottomPrevTile = prevTile + 4
  }

  return [
    topPrevTile,
    topTile,
    topNextTile,
    prevTile,
    nextTile,
    bottomPrevTile,
    bottomTile,
    bottomNextTile
  ].filter(tile => tile && tile >= 0 && tile <= 15)
}

export default function App() {
  const [tiles, setTiles] = React.useState<Array<string>>(
    () => getTiles()
  )
  const [lastSelected, setLastSelected] = React.useState<number | undefined>(undefined)
  const [word, setWord] = React.useState('')

  function selectTile(letter: string, position: number) {
    console.log(letter,'-', position)
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
    </div>
  );
}
