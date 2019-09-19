import { useCallback } from "react";
import { FormikProps } from "formik";

import useErrorState from "./useErrorState";
import useFetchState from "./useFetchState";

function useEditState<IRetDataType, IFetchDataType = IRetDataType>(
  isAuthenticated: boolean = true,
  method: "PUT" | "POST" = "POST",
  snackLvl: "none" | "info" | "warning" | "error" = "error"
) {
  type TFetchEditRet = IRetDataType & { error?: string };
  const { makeRestfulFetch } = useFetchState<IRetDataType, IFetchDataType>();
  const { setErrorMsg } = useErrorState(snackLvl);

  interface IEditRet {
    ok: boolean;
    payload: TFetchEditRet;
  }

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
      const { ok, status, payload } = ret;
      if (!ok) {
        if (formApis) formApis.setErrors(payload);
        setErrorMsg(payload as any, status, data as any);
      }
      return ret;
    },
    [isAuthenticated, makeRestfulFetch, method, setErrorMsg]
  );

  return { fetchEdit };
}

export default useEditState;
