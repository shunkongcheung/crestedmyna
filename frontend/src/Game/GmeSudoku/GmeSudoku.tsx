import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

import GameHeader from "./GameHeader";
import SudokuBoard from "./SudokuBoard";
import PauseCoverScreen from "./PauseCoverScreen";

import classNames from "./GmeSudoku.module.scss";

type TInitializeState = "loading" | "empty" | "loaded";
type TDifficulity = "easy" | "medium" | "difficult";
type TGameStage = "playing" | "paused";
type TSudokuBoard = Array<Array<string>>;

interface IRecordMaster {
  startBoard: TSudokuBoard;
  difficulty: TDifficulity;
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
  handleDifficultyChosen,
  handleSudokuBoardChange,
  setGameStage
}: IGmeSudokuProps) {
  const {
    currentBoard,
    difficulty,
    initializeState,
    isFetching,
    startBoard,
    usedSecond
  } = recordMaster;
  const renderedHeader = useMemo(
    () => {
      return (
        <GameHeader
          difficulty={difficulty}
          handleSubmit={() => {}}
          setGameStage={setGameStage}
          usedSecond={usedSecond}
        />
      );
    },
    [difficulty, setGameStage, usedSecond]
  );
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
  const renderedPauseCoverScreen = useMemo(
    () => {
      return (
        <PauseCoverScreen
          handleDifficultyChosen={handleDifficultyChosen}
          gameStage={gameStage}
          initializeState={initializeState}
          isFetching={isFetching}
          setGameStage={setGameStage}
        />
      );
    },
    [
      gameStage,
      handleDifficultyChosen,
      isFetching,
      initializeState,
      setGameStage
    ]
  );
  return (
    <div className={classNames.container}>
      <div className={classNames.title}>SUDOKU</div>
      {renderedHeader}
      <div className={classNames.boardContainer}>
        {renderedPauseCoverScreen}
        {renderedBoard}
      </div>
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
