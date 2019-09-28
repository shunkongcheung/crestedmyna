import { useCallback } from "react";

function useSudokuBase() {
  const getInitBoard = useCallback(() => {
    return [
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
  }, []);

  const getBoardFromHash = useCallback(boardHash => {
    const sideLen = Math.pow(boardHash.length, 0.5);
    const characters = boardHash.split("");
    const board: Array<Array<string>> = [];

    for (let rowIdx = 0; rowIdx < sideLen; rowIdx++) {
      const boardRow = characters.slice(
        rowIdx * sideLen,
        (rowIdx + 1) * sideLen
      );
      board.push(boardRow);
    }

    return board;
  }, []);

  return { getBoardFromHash, getInitBoard };
}

export default useSudokuBase;
