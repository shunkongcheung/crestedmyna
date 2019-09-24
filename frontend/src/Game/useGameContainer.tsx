import useGameMenu from "./useGameMenu";

function useGameContainer() {
  const menuState = useGameMenu();
  return { menuState };
}

export default useGameContainer;
