type Board = Array<Array<string>>;

const EMPTY_ITEM = "_";

function getIsAreaUnique(
  board: Board,
  startColumn: number,
  startRow: number,
  ignoreEmpty: boolean
) {
  const areaValues = [];
  for (let columnIdx = startColumn; columnIdx < startColumn + 3; columnIdx++) {
    for (let rowIdx = startRow; rowIdx < startRow + 3; rowIdx++) {
      const curItem = board[rowIdx][columnIdx];
      if (curItem == EMPTY_ITEM && ignoreEmpty) continue;
      if (areaValues.includes(curItem)) return false;
      areaValues.push(curItem);
    }
  }
  return true;
}

function getIsRowUnique(board: Board, rowIdx: number, ignoreEmpty: boolean) {
  const areaValues = [];
  for (let columnIdx = 0; columnIdx < 9; columnIdx++) {
    const curItem = board[rowIdx][columnIdx];
    if (curItem == EMPTY_ITEM && ignoreEmpty) continue;
    if (areaValues.includes(curItem)) return false;
    areaValues.push(curItem);
  }
  return true;
}

function getIsColumnUnique(
  board: Board,
  columnIdx: number,
  ignoreEmpty: boolean
) {
  const areaValues = [];
  for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
    const curItem = board[rowIdx][columnIdx];
    if (curItem == EMPTY_ITEM && ignoreEmpty) continue;
    if (areaValues.includes(curItem)) return false;
    areaValues.push(curItem);
  }
  return true;
}

function getIsBoardValid(board: Board, ignoreEmpty = false) {
  for (let rowIdx = 0; rowIdx < 9; rowIdx += 3) {
    for (let columnIdx = 0; columnIdx < 9; columnIdx += 3)
      if (!getIsAreaUnique(board, rowIdx, columnIdx, ignoreEmpty)) return false;
  }
  for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
    if (!getIsRowUnique(board, rowIdx, ignoreEmpty)) return false;
  }

  for (let columnIdx = 0; columnIdx < 9; columnIdx++) {
    if (!getIsColumnUnique(board, columnIdx, ignoreEmpty)) return false;
  }
  return true;
}

export default getIsBoardValid;
