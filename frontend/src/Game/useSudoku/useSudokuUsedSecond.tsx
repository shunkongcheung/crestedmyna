import { useCallback, useEffect } from "react";

type TDifficulity = "easy" | "medium" | "difficult";
type TGameStage = "playing" | "paused";
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

function useSudokuUsedSecond(
  gameStage: TGameStage,
  setRecordMaster: (f: (r: IRecordMaster) => IRecordMaster) => any
) {
  const updateUsedSecond = useCallback(
    () => {
      if (gameStage === "paused") return;
      setRecordMaster(oMaster => {
        if (oMaster.initializeState === "loading") return oMaster;
        if (oMaster.isFetching) return oMaster;
        return { ...oMaster, usedSecond: oMaster.usedSecond + 1 };
      });
    },
    [gameStage, setRecordMaster]
  );
  useEffect(() => {
    const task = setInterval(updateUsedSecond, 1000);
    return () => {
      clearInterval(task);
    };
  });
}

export default useSudokuUsedSecond;
