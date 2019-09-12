import { useCallback } from "react";
import { FormikProps } from "formik";

import useFetchState from "./useFetchState";
import useErrorState from "./useErrorState";

function useEditState<IRetDataType, IFetchDataType = IRetDataType>(
  isAuthenticated: boolean,
  method: "PUT" | "POST",
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
      const { ok, payload } = ret;
      if (!ok && formApis) {
        formApis.setErrors(payload);
        setErrorMsg( payload as any, data as any);
      }
      return ret;
    },
    [isAuthenticated, makeRestfulFetch, method, setErrorMsg]
  );

  return { fetchEdit };
}

export default useEditState;
