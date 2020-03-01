import { useCallback } from "react";

import { useEditState, useListState } from "../../Base/Fetches";
import useSudokuBase from "./useSudokuBase";

type Difficulity = "easy" | "medium" | "difficult";
type InitializeState = "loading" | "empty" | "loaded";
type SudokuBoard = Array<Array<string>>;

interface FetchInitBoardSubmit {
  difficulty: Difficulity;
}
interface FetchInitBoardRet {
  id: number;
  startBoard: string;
}
interface BoardMaster {
  id: number;
  currentBoard: SudokuBoard;
  difficulty: Difficulity;
  isFetching: boolean;
  initializeState: InitializeState;
  startBoard: SudokuBoard;
  usedSecond: number;
}
type GameStage = "playing" | "paused";

function useSudokuInitBoard(
  setBoardMaster: (f: (r: BoardMaster) => BoardMaster) => any,
  setGameStage: (g: GameStage) => any
) {
  const { fetchEdit: fetchInitialBoard } = useEditState<
    FetchInitBoardRet,
    FetchInitBoardSubmit
  >();
  const { getBoardFromHash } = useSudokuBase();

  const handleDifficultyChosen = useCallback(
    async (difficulty: Difficulity) => {
      setBoardMaster(oMaster => ({ ...oMaster, isFetching: true }));
      const { ok, payload } = await fetchInitialBoard("game/sudoku", {
        difficulty
      });
      if (!ok) return;
      const startBoard = getBoardFromHash(payload.startBoard);
      setBoardMaster(oMaster => ({
        ...oMaster,
        id: payload.id,
        currentBoard: startBoard,
        difficulty,
        initializeState: "loaded",
        startBoard,
        usedSecond: 0,
        isFetching: false
      }));
      setGameStage("playing");
    },
    [fetchInitialBoard, getBoardFromHash, setGameStage, setBoardMaster]
  );

  return { handleDifficultyChosen };
}

export default useSudokuInitBoard;
