import styled from 'styled-components'

type BoardProps = {
  tiles: Array<string>,
  onClick: (letter: string, position: number) => void,
  board: number
}

export default function Board({tiles, onClick, board}: BoardProps) {
  function renderTile(letter: string, index: number) {
    return (
      <TileStyled key={index} onClick={() => onClick(letter, index)}>
        {letter}
      </TileStyled>
    )
  }
  return (
    <BoardStyled board={board}>
      {tiles.map(renderTile)}
    </BoardStyled>
  )
}

const BoardStyled = styled.div<{board: number}>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.board}, 50px)`};
  grid-auto-rows: 50px;
  grid-gap: 8px;
`
const TileStyled = styled.div`
  cursor: pointer;
  border: 1px solid;
`