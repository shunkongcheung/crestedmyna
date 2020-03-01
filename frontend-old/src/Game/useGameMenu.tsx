import { useCallback, useEffect, useMemo,  useState } from "react";
import { History } from "history";

type TGame = "chess" | "sudoku" | "2048";

function useGameMenu(history: History) {
  const games: Array<TGame> = useMemo(() => ["chess", "sudoku", "2048"], []);
  const [selectedGameIdx, setSelectedGame] = useState(1);

  const handleMenuChange = useCallback(
    (toSide: 'left'| 'right') => {
      if (toSide === 'left')
        setSelectedGame(oIdx => {
          const ret = oIdx > 0 ? oIdx - 1 : oIdx;
          if (ret !== oIdx) history.push(`/game/${games[ret]}/`);
          return ret;
        });
      if (toSide === 'right')
        setSelectedGame(oIdx => {
          const ret = oIdx < games.length - 1 ? oIdx + 1 : oIdx;
          if (ret !== oIdx) history.push(`/game/${games[ret]}/`);
          return ret;
        });
    },
    [history, games]
  );

  const handleHistoryChange = useCallback(
    location => {
      const { pathname } = location;
      const matching = pathname.match(/game\/(\w+)/);
      if (!Array.isArray(matching) || !matching.length) return;
      const gameName: TGame = matching[1];
      const index = games.indexOf(gameName);
      setSelectedGame(index);
    },
    [games]
  );

  useEffect(
    () => {
      const unlisten = history.listen(handleHistoryChange);
      handleHistoryChange(window.location);
      return () => {
        unlisten();
      };
    },
    [handleHistoryChange, history]
  );

  return {
    handleMenuChange,
    selectedGame: games[selectedGameIdx]
  };
}

export default useGameMenu;
