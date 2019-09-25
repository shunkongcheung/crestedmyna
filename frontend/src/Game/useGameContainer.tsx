import useGameMenu from "./useGameMenu";
import { History } from 'history'

function useGameContainer(history:History) {
  const menuState = useGameMenu(history);
  return { menuState };
}

export default useGameContainer;
