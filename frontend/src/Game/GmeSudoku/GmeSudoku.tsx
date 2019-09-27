import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

import SudokuBoard from "./SudokuBoard";

import classNames from "./GmeSudoku.module.scss";

type TInitializeState = "loading" | "empty" | "loaded";
type TDifficulity = "easy" | "medium" | "difficult";
type TGameStage = "playing" | "paused";
type TSudokuBoard = Array<Array<string>>;

interface IRecordMaster {
  startBoard: TSudokuBoard;
  currentBoard: TSudokuBoard;
  usedSecond: number;
  isFetching: boolean;
  initializeState: TInitializeState;
}

interface IGmeSudokuProps {
  gameStage: TGameStage;
  handleDifficultyChosen: (d: TDifficulity) => any;
  handleSudokuBoardChange: (f: (b: TSudokuBoard) => TSudokuBoard) => any;
  recordMaster: IRecordMaster;
  setGameStage: (s: TGameStage) => any;
}

function GmeSudoku({
  gameStage,
  recordMaster,
  handleSudokuBoardChange
}: IGmeSudokuProps) {
  const { currentBoard, startBoard } = recordMaster;
  const renderedBoard = useMemo(
    () => (
      <SudokuBoard
        startBoard={startBoard}
        currentBoard={currentBoard}
        handleSudokuBoardChange={handleSudokuBoardChange}
      />
    ),
    [startBoard, currentBoard, handleSudokuBoardChange]
  );
  return (
    <div className={classNames.container}>
      <div className={classNames.title}>SUDOKU</div>
      {renderedBoard}
    </div>
  );
}

GmeSudoku.propTypes = {
  gameStage: PropTypes.oneOf(["paused", "playing"]).isRequired,
  handleDifficultyChosen: PropTypes.func.isRequired,
  handleSudokuBoardChange: PropTypes.func.isRequired,
  recordMaster: PropTypes.object.isRequired,
  setGameStage: PropTypes.func.isRequired
};
export default memo(GmeSudoku);
