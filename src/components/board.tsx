import styled from 'styled-components'

type BoardProps = {
  tiles: Array<string>,
  onClick: (letter: string, position: number) => void
}

export default function Board({tiles, onClick}: BoardProps) {
  function renderTile(letter: string, index: number) {
    return (
      <TileStyled key={index} onClick={() => onClick(letter, index)}>
        {letter}
      </TileStyled>
    )
  }
  return (
    <BoardStyled>
      {tiles.map(renderTile)}
    </BoardStyled>
  )
}

const BoardStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 40px);
  grid-auto-rows: 40px;
  grid-gap: 5px;
`
const TileStyled = styled.div`
  cursor: pointer;
  border: 1px solid;
`