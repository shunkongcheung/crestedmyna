import { useCallback } from "react";

import { useEditState } from "../Base/Fetches";
import useSudokuBase from "./useSudokuBase";

type TDifficulity = "easy" | "medium" | "difficult";
type TInitializeState = "loading" | "empty" | "loaded";
type TSudokuBoard = Array<Array<string>>;

interface IFetchInitBoardSubmit {
  difficulty: TDifficulity;
}
interface IFetchInitBoardRet {
  start_board: string;
  solution_board: string;
}
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

function useSudokuInitBoard(
  setRecordMaster: (f: (r: IRecordMaster) => IRecordMaster) => any,
  setGameStage: (g: TGameStage) => any
) {
  const { fetchEdit: fetchInitialBoard } = useEditState<
    IFetchInitBoardRet,
    IFetchInitBoardSubmit
  >();
  const { getBoardFromHash } = useSudokuBase();

  const handleDifficultyChosen = useCallback(
    async (difficulty: TDifficulity) => {
      setRecordMaster(oMaster => ({ ...oMaster, isFetching: true }));
      const { ok, payload } = await fetchInitialBoard(
        "game/gme_sudoku/initial_board/",
        { difficulty }
      );
      if (!ok) return;
      const startBoard = getBoardFromHash(payload.start_board);
      const solutionBoard = getBoardFromHash(payload.solution_board);
      setRecordMaster(oMaster => ({
        ...oMaster,
        currentBoard: startBoard,
        difficulty,
        startBoard,
        solutionBoard,
        usedSecond: 0,
        isFetching: false
      }));
      setGameStage("playing");
    },
    [fetchInitialBoard, getBoardFromHash, setGameStage, setRecordMaster]
  );

  return { handleDifficultyChosen };
}

export default useSudokuInitBoard;
