import { createContext } from "react";

interface ISnackBarInfo {
  message?: string;
  type: "info" | "warning" | "error";
}
interface ISnackBarContext {
  handleSnackBarChange: (a: ISnackBarInfo) => void;
}

const SnackBarContext = createContext<ISnackBarContext>({
  handleSnackBarChange: a => {}
});
export default SnackBarContext;
