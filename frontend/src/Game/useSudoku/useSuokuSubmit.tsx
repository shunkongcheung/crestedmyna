import { useCallback } from "react";
import {  useEditState, useErrorState, } from "../../Base/Fetches";

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

interface IRecordMasterRet {
  current_board: string;
  difficulty: TDifficulity;
  solution_board: string;
  start_board: string;
  used_second: number;
}

function useSudokuSubmit(
  setRecordMaster: (f: (r: IRecordMaster) => IRecordMaster) => any,
  setGameStage: (g: TGameStage) => any
) {
  const { fetchEdit } = useEditState<IRecordMasterRet>();
	const { setErrorMsg } = useErrorState();

  const handleSubmit = useCallback(
    (recordMaster: IRecordMaster) => {
      if (
        JSON.stringify(recordMaster.currentBoard) !==
        JSON.stringify(recordMaster.solutionBoard)
      )
			return setErrorMsg({error:'Invalid. Try again.'}, 400)

			// reset record master


			// reset game stage
			setGameStage('paused');
    },
    [fetchEdit, setRecordMaster, setGameStage]
  );
}

export default useSudokuSubmit;
