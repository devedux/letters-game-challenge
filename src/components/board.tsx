import styled from 'styled-components'

type BoardProps = {
  tiles: Array<string>,
  onClick: (letter: string, position: number) => void,
  board: number,
  positions: number[],
  isValid: boolean,
}

export default function Board({tiles, onClick, board, positions, isValid}: BoardProps) {
  console.log(isValid,'isValid')
  function renderTile(letter: string, index: number) {
    return (
      <TileStyled 
        key={index} 
        onClick={() => onClick(letter, index)}
        isValid={isValid}
        isSelected={positions.includes(index)}
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
const TileStyled = styled.div<{ isSelected: boolean, isValid: boolean }>`
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
  transition: transform 0.5s ease-in-out;

  &::after {
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    background: ${(props) => stylesValidation(props.isSelected && props.isValid)};
    content: '';
    z-index: -1;
    border-radius: 8px;
  }

  &:hover {
    transform: rotate(3deg) scale(1.1);
    transition: transform 0.5s ease-in-out;
  }

  ${({isValid, isSelected}) => isSelected && `    
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.25);
    transition: transform 0.5s ease-in-out;
    background: ${stylesValidation(isValid)};
    background-clip: padding-box;
    &:hover {
      transform: rotate(1.2deg);
    }
  `}
`

function stylesValidation(isValid: boolean) {
  return isValid ? 'linear-gradient(#ADE74D, #439422)' : 'linear-gradient(#F4505F, #A2071E)'
}