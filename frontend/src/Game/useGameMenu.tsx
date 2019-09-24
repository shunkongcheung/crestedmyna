import { useCallback, useMemo, useRef, useState } from "react";

type TGame = "chess" | "sudoku" | "2048";

function useGameMenu() {
  const games: Array<TGame> = useMemo(() => ["chess", "sudoku", "2048"], []);
  const [selectedGameIdx, setSelectedGame] = useState(0);
  const prevScroll = useRef(0);

  const handleMenuScroll = useCallback(
    e => {
      const { scrollLeft } = e.target;
      if (prevScroll.current > scrollLeft)
        setSelectedGame(oIdx => {
          return oIdx > 0 ? oIdx - 1 : oIdx;
        });
      if (prevScroll.current < scrollLeft)
        setSelectedGame(oIdx => {
          return oIdx < games.length - 1 ? oIdx + 1 : oIdx;
        });
    },
    [games]
  );
  return {
    handleMenuScroll,
    selectedGame: games[selectedGameIdx]
  };
}

export default useGameMenu;
