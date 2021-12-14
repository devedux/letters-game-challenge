import {add, subs, shuffle} from './helper'
import dataBoard from '../data/test-board-1.json'
// import board2 from '../data/test-board-2.json'
const sumBy4 = add(4)
const sumBy1 = add(1)
const subsBy4 = subs(4)
const subsBy1 = subs(1)

function getTiles(): Array<string> {
  return shuffle(dataBoard.board)
}

function rangeOfTiles(tile: number | undefined) {
  return tile !== undefined && tile >= 0 && tile <= 15
}

type ArrayNumber = Array<number> 
type ReturnPrevTiles = Array<undefined> | ArrayNumber

function getPreviousTiles(leftTiles: number[], rightTiles: number[], lastSelected: number): ReturnPrevTiles {
  if (leftTiles.includes(lastSelected) && rightTiles.includes(lastSelected)) {
    return []
  }

  const prevTile = subsBy1(lastSelected)
  const topPrevTile = subsBy4(prevTile)
  const bottomPrevTile = sumBy4(prevTile)
  return [prevTile, topPrevTile, bottomPrevTile]
}

function getRemainingTiles(
  rightTiles: number[],
  lastSelected: number
): ArrayNumber {
  const nextTile = rightTiles.includes(lastSelected) ? subsBy1(lastSelected) : sumBy1(lastSelected)
  const topTile = subsBy4(lastSelected)
  const topNextTile = subsBy4(nextTile)
  const bottomTile = sumBy4(lastSelected)
  const bottomNextTile = sumBy4(nextTile)
  return [topTile, topNextTile, nextTile, bottomTile, bottomNextTile]
}

function validTiles(lastSelected: number) {
  const leftTiles = [0, 4, 8, 12]
  const rightTiles = [3, 7, 11, 15]

  const previousTiles = getPreviousTiles(leftTiles, rightTiles, lastSelected)
  const remainingTiles = getRemainingTiles(rightTiles, lastSelected)
  return [...remainingTiles,...previousTiles].filter(rangeOfTiles)
}



export {getTiles, shuffle, validTiles}
