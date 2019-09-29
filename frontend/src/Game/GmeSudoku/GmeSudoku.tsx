import React, { memo, useCallback, useMemo, useState } from "react";
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
  solutionBoard: TSudokuBoard;
  difficulty: TDifficulity;
  currentBoard: TSudokuBoard;
  usedSecond: number;
  isFetching: boolean;
  initializeState: TInitializeState;
}

interface IGmeSudokuProps {
  gameStage: TGameStage;
  handleDifficultyChosen: (d: TDifficulity) => any;
  handleSubmit: (r: IRecordMaster) => any;
  handleSudokuBoardChange: (f: (b: TSudokuBoard) => TSudokuBoard) => any;
  recordMaster: IRecordMaster;
  setGameStage: (s: TGameStage) => any;
}

function GmeSudoku({
  gameStage,
  recordMaster,
  handleDifficultyChosen,
  handleSubmit,
  handleSudokuBoardChange,
  setGameStage
}: IGmeSudokuProps) {
  const {
    currentBoard,
    difficulty,
    initializeState,
    isFetching,
    startBoard,
    solutionBoard,
    usedSecond
  } = recordMaster;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitI = useCallback(
    () => {
      handleSubmit(recordMaster);
      setIsSubmitted(true);
    },
    [handleSubmit, recordMaster]
  );

  const renderedHeader = useMemo(
    () => {
      return (
        <GameHeader
          difficulty={difficulty}
          handleSubmit={handleSubmitI}
          setGameStage={setGameStage}
          usedSecond={usedSecond}
        />
      );
    },
    [difficulty, handleSubmitI, setGameStage, usedSecond]
  );
  const renderedBoard = useMemo(
    () => (
      <SudokuBoard
        currentBoard={currentBoard}
        handleSudokuBoardChange={handleSudokuBoardChange}
        isSubmitted={isSubmitted}
        startBoard={startBoard}
        solutionBoard={solutionBoard}
      />
    ),
    [
      currentBoard,
      handleSudokuBoardChange,
      isSubmitted,
      startBoard,
      solutionBoard
    ]
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
  handleSubmit: PropTypes.func.isRequired,
  handleSudokuBoardChange: PropTypes.func.isRequired,
  recordMaster: PropTypes.object.isRequired,
  setGameStage: PropTypes.func.isRequired
};
export default memo(GmeSudoku);
