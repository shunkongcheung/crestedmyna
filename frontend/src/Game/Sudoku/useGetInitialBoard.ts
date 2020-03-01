import { useEffect, useMemo } from "react";
import { useFetchList } from "react-accessories";

type Difficulty = "easy" | "medium" | "difficult";
type GameStage = "playing" | "paused";

interface BoardItem {
  startBoard: string;
  currentBoard: string;
  usedSecond: number;
  difficulty: Difficulty;
  id: number;
}

interface GameState extends BoardItem {
  gameStage: GameStage;
  loading: boolean;
}

type SetCurState<T extends GameState> = (s: (o: T) => T) => any;

function useGetInitialBoard<T extends GameState>(setCurState: SetCurState<T>) {
  const { loading, fetchList, results } = useFetchList<BoardItem>();

  useEffect(() => {
    fetchList("/game/sudoku", { queryParams: { completed: false } });
  }, [fetchList]);

  const initialBoard = useMemo(() => {
    if (results.length && false) return results[0];
    return null;
  }, [results]);

  useEffect(() => {
    if (initialBoard)
      setCurState(oVal => ({
        ...oVal,
        ...initialBoard,
        gameStage: "playing",
        loading: false
      }));
    else if (!loading)
      setCurState(oVal => ({
        ...oVal,
        loading: false
      }));
  }, [initialBoard, loading, setCurState]);
}

export default useGetInitialBoard;
