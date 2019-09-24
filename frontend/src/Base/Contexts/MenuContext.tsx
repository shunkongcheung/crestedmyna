import { createContext } from "react";

type TFunction = "JOURNAL" | "GAME" | "STOCK";
interface IMenuContext {
  menu: Array<TFunction>;
}
const MenuContext = createContext<IMenuContext>({
  menu: []
});

export default MenuContext;
