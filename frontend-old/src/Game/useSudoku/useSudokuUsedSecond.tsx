import { useCallback, useEffect } from "react";

type TGameStage = "playing" | "paused";
type TInitializeState = "loading" | "empty" | "loaded";

interface BoardMaster {
  isFetching: boolean;
  initializeState: TInitializeState;
  usedSecond: number;
}

function useSudokuUsedSecond(
  gameStage: TGameStage,
  setRecordMaster: (f: <T extends BoardMaster>(r: T) => T) => any
) {
  const updateUsedSecond = useCallback(() => {
    if (gameStage === "paused") return;
    setRecordMaster(oMaster => {
      if (oMaster.initializeState === "loading") return oMaster;
      if (oMaster.isFetching) return oMaster;
      return { ...oMaster, usedSecond: oMaster.usedSecond + 1 };
    });
  }, [gameStage, setRecordMaster]);
  useEffect(() => {
    const task = setInterval(updateUsedSecond, 1000);
    return () => {
      clearInterval(task);
    };
  });
}

export default useSudokuUsedSecond;
