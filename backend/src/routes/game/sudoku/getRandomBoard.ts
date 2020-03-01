import getIsBoardValid from "./getIsBoardValid";

type Board = Array<Array<string>>;
type TriedNumberBoard = Array<Array<Array<number>>>;

function setNumberAtPosition(
  board: Board,
  triedBoard: TriedNumberBoard,
  rowIdx: number,
  colIdx: number
) {
  const tryNumber = Math.floor(Math.random() * 9) + 1;
  const isTried = triedBoard[rowIdx][colIdx].includes(tryNumber);
  if (!isTried) {
    triedBoard[rowIdx][colIdx].push(tryNumber);
    board[rowIdx][colIdx] = tryNumber.toString();
  }
  return isTried;
}

function getIsTriedFull(
  triedBoard: TriedNumberBoard,
  rowIdx: number,
  colIdx: number
) {
  return triedBoard[rowIdx][colIdx].length === 9;
}

function resetBoardAtPosition(
  board: Board,
  triedBoard: TriedNumberBoard,
  rowIdx: number,
  colIdx: number
) {
  board[rowIdx][colIdx] = "_";
  triedBoard[rowIdx][colIdx] = [];
}

function getRowColFromIndex(index: number) {
  const rowIdx = Math.floor(index / 9);
  const colIdx = index % 9;
  return [rowIdx, colIdx];
}

function getRandomBoard() {
  const board: Board = [
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_", "_", "_"]
  ];
  const triedBoard: TriedNumberBoard = [
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []]
  ];

  let index = 0;
  let triedTime = 0;
  const MAX_TRY_TIME = Math.pow(2, 20);
  const MAX_INDEX = 9 * 9;

  while (index < MAX_INDEX) {
    const [rowIdx, colIdx] = getRowColFromIndex(index);
    // if all number has been tried at current position
    // reset current position, go back an index
    if (getIsTriedFull(triedBoard, rowIdx, colIdx)) {
      resetBoardAtPosition(board, triedBoard, rowIdx, colIdx);
      if (index > 0) index = index - 1;
      continue;
    }

    // try a number
    setNumberAtPosition(board, triedBoard, rowIdx, colIdx);

    // check if board is valid. if valid, go to next number
    const isValid = getIsBoardValid(board, true);
    if (isValid) index = index + 1;

    // if running too long. restart again
    triedTime++;
    if (triedTime > MAX_TRY_TIME) return getRandomBoard();
  }
  return board;
}

export default getRandomBoard;
