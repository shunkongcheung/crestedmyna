import { useCallback, useContext } from "react";
import SnackBarContext from "../Contexts/SnackBarContext";

function useErrorState(
  snackLvl: "none" | "info" | "warning" | "error" = "error"
) {
  const { handleSnackBarChange } = useContext(SnackBarContext);

  const getErrorMsgFromArr = useCallback((nonFieldErrors: Array<string>) => {
    if (!nonFieldErrors.length) return "";
    if (nonFieldErrors.length === 1) return nonFieldErrors[0];
    return nonFieldErrors.join(", ");
  }, []);

  const getStringifiedErrorValue = useCallback(
    value => {
      if (typeof value === "string") return value;
      if (Array.isArray(value)) return getErrorMsgFromArr(value);
      if (value === null || value === undefined) return "";
      return JSON.stringify(value);
    },
    [getErrorMsgFromArr]
  );

  const setErrorMsg = useCallback(
    (payload: object, data: object = {}) => {
      const dataKeys = Object.keys(data);
      const nonFieldErrors: Array<string> = Object.entries(payload)
        .map(
          ([key, value]) =>
            key in dataKeys ? "" : getStringifiedErrorValue(value)
        )
        .filter(itm => itm !== "");
      const message = getErrorMsgFromArr(nonFieldErrors);
      if (snackLvl !== "none")
        handleSnackBarChange({ message, type: snackLvl });
    },
    [
      getErrorMsgFromArr,
      getStringifiedErrorValue,
      handleSnackBarChange,
      snackLvl
    ]
  );

  return { setErrorMsg };
}

export default useErrorState;
