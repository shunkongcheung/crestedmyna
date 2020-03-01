import { useCallback, useEffect, useRef } from "react";
import { useEditState } from "../../Base/Fetches";
import useSudokuBase from "./useSudokuBase";

type TDifficulity = "easy" | "medium" | "difficult";
type TInitializeState = "loading" | "empty" | "loaded";
type TSudokuBoard = Array<Array<string>>;

interface BoardMaster {
  id: number;
  currentBoard: TSudokuBoard;
  difficulty: TDifficulity;
  isFetching: boolean;
  initializeState: TInitializeState;
  startBoard: TSudokuBoard;
  usedSecond: number;
}
interface BoardMasterRet {
  currentBoard: string;
  difficulty: TDifficulity;
  startBoard: string;
  usedSecond: number;
}

function useSudokuSave(recordMaster: BoardMaster) {
  const recordMasterRef = useRef<BoardMaster | undefined>();
  const { getHashFromBoard } = useSudokuBase();
  const { fetchEdit } = useEditState<BoardMasterRet>();

  const handleSave = useCallback(async () => {
    const recordMaster = recordMasterRef.current;
    if (!recordMaster) return;

    const data = {
      currentBoard: getHashFromBoard(recordMaster.currentBoard),
      startBoard: getHashFromBoard(recordMaster.startBoard),
      difficulty: recordMaster.difficulty,
      usedSecond: recordMaster.usedSecond
    };
    await fetchEdit(`game/gme_sudoku/${recordMaster.id}`, data, {
      method: "PUT"
    });
  }, [fetchEdit, getHashFromBoard]);

  useEffect(() => {
    const task = setInterval(handleSave, 10 * 1000);
    return () => clearInterval(task);
  }, [handleSave]);

  useEffect(() => {
    handleSave();
  }, [handleSave]);

  useEffect(() => {
    recordMasterRef.current = recordMaster;
  }, [recordMaster]);
}

export default useSudokuSave;
