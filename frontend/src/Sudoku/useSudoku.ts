import { useCallback, useMemo, useState } from "react";

import useCreateBoard from "./useCreateBoard";
import useSudokuUtils from "./useSudokuUtils";
import useUsedSecond from "./useUsedSecond";
import useGetInitialBoard from "./useGetInitialBoard";

type Difficulty = "easy" | "medium" | "difficult";
type GameStage = "playing" | "paused";

interface CurState {
  id: number;
  currentBoard: string;
  startBoard: string;
  usedSecond: number;
  difficulty: Difficulty;

  gameStage: GameStage;
  loading: boolean;
}

function useSudoku() {
  const { getBoardFromHash } = useSudokuUtils();
  const [curState, setCurState] = useState<CurState>({
    id: -1,
    currentBoard: "",
    startBoard: "",
    usedSecond: -1,
    difficulty: "easy",
    gameStage: "paused",
    loading: true
  });
  useGetInitialBoard(setCurState);
  const { handleLvlSelect } = useCreateBoard(setCurState);

  const setGameStage = useCallback(
    gameStage => setCurState(oVal => ({ ...oVal, gameStage })),
    []
  );
  const handleSubmit = useCallback(() => {}, []);
  const handleSudokuBoardChange = useCallback(() => {}, []);
  useUsedSecond(curState.gameStage, setCurState);

  const startBoard = useMemo(() => getBoardFromHash(curState.startBoard), [
    curState.startBoard,
    getBoardFromHash
  ]);
  const currentBoard = useMemo(() => getBoardFromHash(curState.currentBoard), [
    curState.currentBoard,
    getBoardFromHash
  ]);

  return {
    startBoard,
    currentBoard,
    setGameStage,
    handleSubmit,
    handleLvlSelect,
    handleSudokuBoardChange,
    gameStage: curState.gameStage,
    loading: curState.loading,
    usedSecond: curState.usedSecond
  };
}

export default useSudoku;
