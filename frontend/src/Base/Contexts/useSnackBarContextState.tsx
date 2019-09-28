import { useCallback, useState } from "react";
import { History } from "history";

interface ISnackBarContext {
  message?: string;
  type: "info" | "warning" | "error";
}
interface ISnackBarInfo extends ISnackBarContext {
  status: number;
}

function useSnackBarContextState(history: History) {
  const [msgInfo, setMsgInfo] = useState<ISnackBarContext>({
    message: "",
    type: "info"
  });

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
