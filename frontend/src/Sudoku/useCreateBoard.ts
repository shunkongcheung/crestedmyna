import { useCallback } from "react";
import { useFetchEdit } from "react-accessories";

type Difficulty = "easy" | "medium" | "difficult";
type GameStage = "playing" | "paused";

interface BoardItem {
  id: number;
  currentBoard: string;
  startBoard: string;
  usedSecond: number;
  difficulty: Difficulty;
}

interface CurState extends BoardItem {
  gameStage: GameStage;
  loading: boolean;
}

type SetCurState = (s: CurState) => any;

function useCreateBoard(setCurState: SetCurState) {
  const fetchEdit = useFetchEdit<BoardItem>();
  const handleLvlSelect = useCallback(
    async (difficulty: Difficulty) => {
      const data = await fetchEdit("/sudoku", { data: { difficulty } });
      if (!data) return;
      setCurState({ ...data, gameStage: "playing", loading: false });
    },
    [fetchEdit, setCurState]
  );

  return { handleLvlSelect };
}

export default useCreateBoard;
