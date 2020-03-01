import { useCallback, useEffect } from "react";

type GameStage = "playing" | "paused";

interface BoardMaster {
  loading: boolean;
  usedSecond: number;
}

type SetGameMasterState = (f: <T extends BoardMaster>(r: T) => T) => any;

function useUsedSecond(
  gameStage: GameStage,
  setGameMasterState: SetGameMasterState
) {
  const updateUsedSecond = useCallback(() => {
    if (gameStage === "paused") return;
    setGameMasterState(oMaster => {
      if (oMaster.loading) return oMaster;
      return { ...oMaster, usedSecond: oMaster.usedSecond + 1 };
    });
  }, [gameStage, setGameMasterState]);

  useEffect(() => {
    const task = setInterval(updateUsedSecond, 1000);
    return () => {
      clearInterval(task);
    };
  });
}

export default useUsedSecond;
