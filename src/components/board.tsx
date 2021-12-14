import styled from 'styled-components'

type BoardProps = {
  tiles: Array<string>,
  onClick: (letter: string, position: number) => void,
  board: number,
  word: string,
}

export default function Board({tiles, onClick, board, word}: BoardProps) {
  function renderTile(letter: string, index: number) {
    return (
      <TileStyled 
        key={index} 
        onClick={() => onClick(letter, index)}
        isSelected={word.includes(letter)}
      >
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

const BoardStyled = styled.div<{ board: number }>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.board}, 80px)`};
  grid-auto-rows: 80px;
  grid-gap: 15px;
`
const TileStyled = styled.div<{ isSelected: boolean }>`
  position: relative;
  border: 2px solid transparent;
  border-radius: 8px;
  background: linear-gradient(#FAD15C, #F77120);
  background-clip: padding-box;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 30px;
  text-shadow: -2px -1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &::after {
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    background: linear-gradient(#F4505F, #A2071E);
    content: '';
    z-index: -1;
    border-radius: 8px;
  }

  ${props => props.isSelected && `
    background: linear-gradient(#F4505F, #A2071E);
    background-clip: padding-box;
  `}
`