import dataTest1Board from '../data/test-board-1.json'
import * as React from 'react'

const initialState = {
  quantity: 15, // for position of a array
  board: 4,
  data: dataTest1Board.board,
  lastTilePositionSelected: undefined,
  word: ''
}

interface IState {
  quantity: number,
  board: number,
  data: string[],
  lastTilePositionSelected: undefined | number,
  word: string
}

type ActionType = 
  | { type: 'SELECT_TILE', tilePosition: number }
  | { type: 'ADD_WORD', letter: string }

const letterGameReducer: React.Reducer<IState, ActionType> = (state, action) => {
  switch (action.type) {
    case 'SELECT_TILE':
      return { ...state, lastTilePositionSelected: action.tilePosition }
    case 'ADD_WORD':
      return { ...state, word: state.word + action.letter }
    default:
      throw new Error()
  }
}

function getExtremePositionsOfTheTiles(
  board: number, 
  calculatePosition: (lastPosition: number) => number,
  initialState: number[]
) {
  return Array(board - 1).fill(null).reduce((positions, _) => {
    let lastPosition = positions[positions.length - 1]
    let newPosition = calculatePosition(lastPosition)
    return [...positions, newPosition]
  }, initialState)
}

export default function useLettersGame() {
  const [state, dispatch] = React.useReducer(letterGameReducer, initialState)

  const tilesPositionLeft = React.useMemo(() => {
    return getExtremePositionsOfTheTiles(state.board,
      (lastPosition) => lastPosition + state.board, 
      [0],
    )
  }, [state.board])

  const tilesPositionRight = React.useMemo(() => {
    return getExtremePositionsOfTheTiles(state.board,
      (lastPosition) => lastPosition - state.board, 
      [state.quantity],
    )
  }, [state.board, state.quantity])

  function getPreviousTilesPosition(lastPositionSelected: number) {
    if (tilesPositionLeft.includes(lastPositionSelected) && 
        tilesPositionRight.includes(lastPositionSelected)) {
      return []
    }
    const prevTilePosition = lastPositionSelected - 1
    const topPrevTilePosition = prevTilePosition - state.board
    const bottomPrevTilePosition = prevTilePosition + state.board
    return [prevTilePosition, topPrevTilePosition, bottomPrevTilePosition]
  }

  function tilesPositionRange(position: number | undefined) {
    return position !== undefined && position >= 0 && position <= state.quantity
  }

  function getRemainingTilesPosition(lastPositionSelected: number) {
    const nextTilePosition = tilesPositionRight.includes(lastPositionSelected) 
      ? lastPositionSelected - 1
      : lastPositionSelected + 1
    const topTilePosition = lastPositionSelected - state.board
    const topNextTilePosition = nextTilePosition - state.board
    const bottomTilePosition = lastPositionSelected + state.board
    const bottomNextTilePosition = nextTilePosition + state.board
    return [topTilePosition, topNextTilePosition, nextTilePosition, bottomTilePosition, bottomNextTilePosition]
  }

  function validTiles(lastPositionSelected: number) {
    const previousTilesPosition = getPreviousTilesPosition(lastPositionSelected)
    const remainingTilesPosition = getRemainingTilesPosition(lastPositionSelected)
    return [...remainingTilesPosition, ...previousTilesPosition].filter(tilesPositionRange)
  }

  function selectTile(letter: string, position: number) {
    console.log(letter,'-', position)
    if (state.lastTilePositionSelected !== undefined) {
      if (state.word.includes(letter)) {
        alert('esta letra ya fue seleccionada')
        return
      }
      if (!validTiles(state.lastTilePositionSelected).includes(position)) {
         alert('tile no valida, porfavor seleccione una casilla vecina')
         return;
      }
    }
    dispatch({ type: 'ADD_WORD', letter })
    dispatch({ type: 'SELECT_TILE', tilePosition: position })
  }

  return { ...state, selectTile }
}