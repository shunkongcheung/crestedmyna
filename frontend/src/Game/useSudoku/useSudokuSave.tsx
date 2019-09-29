import { useCallback, useEffect, useRef } from "react";
import { useEditState } from "../../Base/Fetches";
import useSudokuBase from "./useSudokuBase";

type TDifficulity = "easy" | "medium" | "difficult";
type TInitializeState = "loading" | "empty" | "loaded";
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
interface IRecordMasterRet {
  current_board: string;
  difficulty: TDifficulity;
  solution_board: string;
  start_board: string;
  used_second: number;
}

function useSudokuSave(recordMaster: IRecordMaster) {
  const recordMasterRef = useRef<IRecordMaster | undefined>();
  const { getHashFromBoard } = useSudokuBase();
  const { fetchEdit } = useEditState<IRecordMasterRet>();

  const handleSave = useCallback(
    () => {
      const recordMaster = recordMasterRef.current;
      if (!recordMaster) return;

      const data = {
        current_board: getHashFromBoard(recordMaster.currentBoard),
        start_board: getHashFromBoard(recordMaster.startBoard),
        solution_board: getHashFromBoard(recordMaster.solutionBoard),
        difficulty: recordMaster.difficulty,
        used_second: recordMaster.usedSecond
      };
      fetchEdit("game/gme_sudoku/game_record/", data, { method: "PUT" });
    },
    [fetchEdit, getHashFromBoard]
  );

  useEffect(
    () => {
      const task = setInterval(handleSave, 10 * 1000);
      return () => clearInterval(task);
    },
    [handleSave]
  );

  useEffect(() => handleSave, [handleSave]);

  useEffect(
    () => {
      recordMasterRef.current = recordMaster;
    },
    [recordMaster]
  );
}

export default useSudokuSave;
