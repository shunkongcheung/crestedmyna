import { useCallback, useState } from "react";

import useSudokuBase from "./useSudokuBase";
import useSudokuInitBoard from "./useSudokuInitBoard";
// import useSudokuInitGameRecord from "./useSudokuInitGameRecord";
import useSudokuUsedSecond from "./useSudokuUsedSecond";
import useSudokuSave from "./useSudokuSave";
import useSudokuSubmit from "./useSudokuSubmit";

type TInitializeState = "loading" | "empty" | "loaded";
type TDifficulity = "easy" | "medium" | "difficult";

type TSudokuBoard = Array<Array<string>>;

interface IRecordMaster {
  id: number;
  currentBoard: TSudokuBoard;
  difficulty: TDifficulity;
  isFetching: boolean;
  initializeState: TInitializeState;
  startBoard: TSudokuBoard;
  usedSecond: number;
}

type TGameStage = "playing" | "paused";

function useSudoku() {
  // state --------------------------------------------------------
  const { getInitBoard } = useSudokuBase();
  const [gameStage, setGameStage] = useState<TGameStage>("paused");
  const [recordMaster, setRecordMaster] = useState<IRecordMaster>({
    id: -1,
    startBoard: getInitBoard(),
    difficulty: "easy",
    currentBoard: getInitBoard(),
    usedSecond: 0,
    initializeState: "loading",
    isFetching: true
  });

  const { handleDifficultyChosen } = useSudokuInitBoard(
    setRecordMaster,
    setGameStage
  );
  const { handleSubmit } = useSudokuSubmit(setRecordMaster, setGameStage);
  // useSudokuInitGameRecord(setRecordMaster);
  useSudokuUsedSecond(gameStage, setRecordMaster);
  useSudokuSave(recordMaster);

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
    handleSubmit,
    handleSudokuBoardChange,
    recordMaster,
    setGameStage
  };
}

export default useSudoku;
