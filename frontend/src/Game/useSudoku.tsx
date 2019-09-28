import { useCallback, useEffect, useState } from "react";
import { useDetailState, useEditState } from "../Base/Fetches";

import useSudokuInitBoard from "./useSudokuInitBoard";
import useSudokuInitGameRecord from "./useSudokuInitGameRecord";
import useSudokuUsedSecond from "./useSudokuUsedSecond";

type TInitializeState = "loading" | "empty" | "loaded";
type TDifficulity = "easy" | "medium" | "difficult";

type TSudokuBoard = Array<Array<string>>;

interface IRecordMaster {
  currentBoard: TSudokuBoard;
  difficulty: TDifficulity;
  isFetching: boolean;
  initializeState: TInitializeState;
  solutionBoard: TSudokuBoard;
  startBoard: TSudokuBoard;
  usedSecond: number;
}

type TGameStage = "playing" | "paused";

function useSudoku() {
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

  // state --------------------------------------------------------
  const [gameStage, setGameStage] = useState<TGameStage>("paused");
  const [recordMaster, setRecordMaster] = useState<IRecordMaster>({
    startBoard: getInitBoard(),
    difficulty: "easy",
    solutionBoard: getInitBoard(),
    currentBoard: getInitBoard(),
    usedSecond: 0,
    initializeState: "loading",
    isFetching: true
  });

  const { handleDifficultyChosen } = useSudokuInitBoard(
    setRecordMaster,
    setGameStage
  );
  useSudokuInitGameRecord(setRecordMaster);
  useSudokuUsedSecond(gameStage, setRecordMaster);

  // methods --------------------------------------------------------

  const handleSudokuBoardChange = useCallback(func => {
    setRecordMaster(oMaster => {
      const currentBoard = func(oMaster.currentBoard);
      return { ...oMaster, currentBoard };
    });
  }, []);

  return {
    gameStage,
    handleDifficultyChosen,
    handleSudokuBoardChange,
    recordMaster,
    setGameStage
  };
}

export default useSudoku;
