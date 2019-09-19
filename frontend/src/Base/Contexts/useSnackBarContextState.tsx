import { useCallback, useState } from "react";
import { History } from "history";

function useSnackBarContextState(history: History) {
  interface ISnackBarContext {
    message?: string;
    type: "info" | "warning" | "error";
  }
  const [msgInfo, setMsgInfo] = useState<ISnackBarContext>({
    message: "",
    type: "info"
  });

  interface ISnackBarInfo extends ISnackBarContext {
    status: number;
  }
  const handleSnackBarChange = useCallback(
    ({ status, ...msgInfo }: ISnackBarInfo) => {
      if (status === 401) history.push("/uam/login/");
      setMsgInfo(msgInfo);
    },
    [history]
  );
  return { msgInfo, handleSnackBarChange };
}

export default useSnackBarContextState;
