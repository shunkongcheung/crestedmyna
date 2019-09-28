import { useCallback } from "react";
import { useEditState, useErrorState } from "../../Base/Fetches";
import useSudokuBase from "./useSudokuBase";

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
  setRecordMaster: (r: IRecordMaster) => any,
  setGameStage: (g: TGameStage) => any
) {
  const { getInitBoard } = useSudokuBase();
  const { fetchEdit } = useEditState<IRecordMasterRet>();
  const { setErrorMsg } = useErrorState();
  const { setErrorMsg: setSuccessMsg } = useErrorState("info");

  const getInitBoardHash = useCallback(() => {
    return Array.from({ length: 81 })
      .map(() => "_")
      .join("");
  }, []);

  const handleSubmit = useCallback(
    (recordMaster: IRecordMaster) => {
      if (
        JSON.stringify(recordMaster.currentBoard) !==
        JSON.stringify(recordMaster.solutionBoard)
      )
        return setErrorMsg({ error: "Invalid. Try again." }, 400);

      // reset record master
      setRecordMaster({
        currentBoard: getInitBoard(),
        difficulty: "easy",
        isFetching: false,
        initializeState: "empty",
        solutionBoard: getInitBoard(),
        startBoard: getInitBoard(),
        usedSecond: 0
      });

      fetchEdit(
        "game/gme_sudoku/game_record/",
        {
          start_board: getInitBoardHash(),
          current_board: getInitBoardHash(),
          solution_board: getInitBoardHash(),
          used_second: 0,
          difficulty: "easy"
        },
        { method: "PUT" }
      );
      setSuccessMsg({ info: "Good game." }, 200);

      // reset game stage
      setGameStage("paused");
    },
    [
      fetchEdit,
      getInitBoard,
      getInitBoardHash,
      setErrorMsg,
      setSuccessMsg,
      setRecordMaster,
      setGameStage
    ]
  );

  return { handleSubmit };
}

export default useSudokuSubmit;
