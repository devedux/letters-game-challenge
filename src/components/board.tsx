import styled from 'styled-components'
import {shuffle} from '../utils/letters-game'

export default function Board({tiles}: {tiles: Array<string>}) {
  console.log(tiles,'tiles')
  return (
    <BoardStyled>
      {shuffle(tiles).map((tile, index) => (
        <TileStyled key={tile}>
          {tile}
        </TileStyled>
      ))}
    </BoardStyled>
  )
}

const BoardStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 40px);
  grid-auto-rows: 40px;
`
const TileStyled = styled.div`

`