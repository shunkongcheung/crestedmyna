import { useState } from "react";

function useSnackBarContextState() {
  interface ISnackBarContext {
    message?: string;
    type: "info" | "warning" | "error";
  }
  const [msgInfo, handleSnackBarChange] = useState<ISnackBarContext>({
    message: "",
    type: "info"
  });
  return { msgInfo, handleSnackBarChange };
}

export default useSnackBarContextState;
