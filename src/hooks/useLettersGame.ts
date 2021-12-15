import dataTest2Board from '../data/test-board-2.json'
import * as React from 'react'
import dictionary from '../data/dictionary.json'

/**
 * @var quantity indicates the maximum position of the table
 * @var board indicates the quantity of tiles to be repeated to generate the table, for example (4 x 4)
 * @var data contains a array of letters
 * @var lastTilePositionSelected contains the last position of the selected tile
 * @var word contains the selected letters
 * @var positions containes the selected positions
 */

const initialState = {
  quantity: 15, // for position of a array
  board: 4,
  data: dataTest2Board.board,
  lastTilePositionSelected: undefined,
  word: '',
  positions: [],
}

interface IState {
  quantity: number,
  board: number,
  data: string[],
  lastTilePositionSelected: undefined | number,
  word: string,
  positions: number[],
}

type ActionType = 
  | { type: 'SELECT_TILE', tilePosition: number }
  | { type: 'ADD_WORD', letter: string }
  | { type: 'RESTART_GAME' }
  | { type: 'ADD_POSITION', position: number }

const letterGameReducer: React.Reducer<IState, ActionType> = (state, action) => {
  switch (action.type) {
    case 'SELECT_TILE':
      return { ...state, lastTilePositionSelected: action.tilePosition }
    case 'ADD_WORD':
      return { ...state, word: state.word + action.letter }
    case 'RESTART_GAME':
      return { ...state, word: '', lastTilePositionSelected: undefined, positions: [] }
    case 'ADD_POSITION':
      return { ...state, positions: [...state.positions, action.position] }
    default:
      throw new Error('Invalid action type')
  }
}

/**
 * get the extreme positions horizontally "left | right"
 * @callback calculatePosition calculate the next position according to the order initialstate
 * @returns a list of positions
 */
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

  // bring the left side positions
  const tilesPositionLeft = React.useMemo(() => {
    return getExtremePositionsOfTheTiles(state.board,
      (lastPosition) => lastPosition + state.board, 
      [0],
    )
  }, [state.board])

  // bring the right side positions
  const tilesPositionRight = React.useMemo(() => {
    return getExtremePositionsOfTheTiles(state.board,
      (lastPosition) => lastPosition - state.board, 
      [state.quantity],
    )
  }, [state.board, state.quantity])

  const words = React.useMemo(() => dictionary.words, [])

  const isValid = React.useMemo(
    () => words.includes(state.word.toLocaleLowerCase(),
  ), [state.word, words]) as boolean

  /**
   * gets the previous positions if it doesn't include in the extreme "left" and "right" positions
   * and if it includes it returns only an empty array
   */
  function getPreviousTilesPosition(lastPositionSelected: number) {
    if (tilesPositionLeft.includes(lastPositionSelected) || 
        tilesPositionRight.includes(lastPositionSelected)) {
      return []
    }
    const prevTilePosition = lastPositionSelected - 1
    const topPrevTilePosition = prevTilePosition - state.board
    const bottomPrevTilePosition = prevTilePosition + state.board
    return [prevTilePosition, topPrevTilePosition, bottomPrevTilePosition]
  }

  /**
   * validates the range according to the maximum number of positions
   */
  function tilesPositionRange(position: number | undefined) {
    if (position === undefined) return false;

    const topTilePosition = state.quantity - state.board
    const prevTilePosition = state.quantity - 1
    const topPrevTilePosition = prevTilePosition - state.board
    const validTilePositionSinceBoardQuantity = [topTilePosition, prevTilePosition, topPrevTilePosition]

    let positionMinusOrEqual = position < state.quantity
    if (validTilePositionSinceBoardQuantity.includes(state.lastTilePositionSelected!)) {
      positionMinusOrEqual = position <= state.quantity
    }
    return position >= 0 && positionMinusOrEqual
  }

  /**
   * get all valid positions excep the previous positions
   */
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

  /**
   * returns all valid positions according to the last selected tile
   */
  function validTiles(lastPositionSelected: number) {
    const previousTilesPosition = getPreviousTilesPosition(lastPositionSelected)
    const remainingTilesPosition = getRemainingTilesPosition(lastPositionSelected)
    return [...remainingTilesPosition, ...previousTilesPosition].filter(tilesPositionRange)
  }

  function selectTile(letter: string, position: number) {
    if (state.lastTilePositionSelected !== undefined) {
      if (state.positions.includes(position)) {
        alert('This tile has already been selected, please select another tile 📛!!!')
        return
      }
      if (!validTiles(state.lastTilePositionSelected).includes(position)) {
         alert('Only can select neighbor tiles to the last tile selected 📛!!!')
         return;
      }
    }
    dispatch({ type: 'ADD_WORD', letter })
    dispatch({ type: 'ADD_POSITION', position })    
    dispatch({ type: 'SELECT_TILE', tilePosition: position })
  }

  function restartGame() {
    dispatch({ type: 'RESTART_GAME' })
  }

  return { ...state, selectTile, restartGame, isValid, words }
}