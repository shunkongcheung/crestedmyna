import { createContext } from "react";

type TFunction = "JOURNAL" | "STOCK";
interface IMenuContext {
  menu: Array<TFunction>;
}
const MenuContext = createContext<IMenuContext>({
  menu: []
});

export default MenuContext;
