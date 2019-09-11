import { useCallback, useContext } from "react";
import { FormikProps } from "formik";

import useFetchState from "./useFetchState";
import SnackBarContext from "../Utils/SnackBarContext";

function useEditState<IRetDataType, IFetchDataType = IRetDataType>(
  isAuthenticated: boolean,
  method: "PUT" | "POST",
  snackLvl: "none" | "info" | "warning" | "error" = "error"
) {
  type TFetchEditRet = IRetDataType & { error?: string };
  const { makeRestfulFetch } = useFetchState<IRetDataType, IFetchDataType>();
  const { handleSnackBarChange } = useContext(SnackBarContext);

  interface IEditRet {
    ok: boolean;
    payload: TFetchEditRet;
  }

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
    (data: object, payload: object) => {
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

  const fetchEdit = useCallback(
    async (
      url: string,
      data: IFetchDataType,
      formApis?: FormikProps<IRetDataType>
    ): Promise<IEditRet> => {
      const ret = await makeRestfulFetch(url, {
        data,
        isAuthenticated,
        method
      });
      const { ok, payload } = ret;
      if (!ok && formApis) {
        formApis.setErrors(payload);
        setErrorMsg(data as any, payload as any);
      }
      return ret;
    },
    [isAuthenticated, makeRestfulFetch, method, setErrorMsg]
  );

  return { fetchEdit };
}

export default useEditState;
