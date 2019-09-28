import { History } from "history";

import useGameMenu from "./useGameMenu";
import useSudoku from "./useSudoku";

function useGameContainer(history: History) {
  const menuState = useGameMenu(history);
  const sudokuState = useSudoku();
  return { menuState, sudokuState };
}

export default useGameContainer;
