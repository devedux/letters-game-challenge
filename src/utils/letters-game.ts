import dataBoard from '../data/test-board-1.json'
// import board2 from '../data/test-board-2.json'

function getTiles(): Array<string> {
  return dataBoard.board
}

function shuffle<T>(list: Array<T>) {
  return list.sort(() => Math.random() - 0.5)
}

export {getTiles, shuffle}
