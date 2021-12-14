import * as React from 'react'
import {getTiles} from './utils/letters-game'
import Board from './components/board'

export default function App() {
  const [tiles, setTiles] = React.useState<Array<string>>(getTiles())
  
  return (
    <div>
      Letters Game!
      <Board tiles={tiles} />
    </div>
  );
}
