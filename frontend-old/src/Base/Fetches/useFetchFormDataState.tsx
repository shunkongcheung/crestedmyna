import { useCallback } from "react";
import { FormikProps } from "formik";

import useErrorState from "./useErrorState";
import useFetchBaseState from "./useFetchBaseState";

function useFetchFormDataState<IRetDataType>(
  snackLvl: "none" | "info" | "warning" | "error" = "error"
) {
  // props -------------------------------------------------
  type TConcatRetDataType = IRetDataType & { error?: string };
  const bState = useFetchBaseState<IRetDataType>();
  const { getAuthorization, getJsonParsedPayload } = bState;
  const { setErrorMsg } = useErrorState(snackLvl);

  // method -------------------------------------------------
  interface IData {
    [x: string]: any;
  }
  interface IFiles {
    [x: string]: File;
  }
  const getFormDataBody = useCallback((data: IData, files: IFiles) => {
    const submitData = new FormData();
    for (let [key, val] of Object.entries(data)) {
      submitData.append(key, val);
    }
    for (let [key, val] of Object.entries(files)) {
      submitData.append(key, val);
    }
    return submitData;
  }, []);

  type TMethod = "PUT" | "POST";
  interface IResBase {
    ok: boolean;
    status: number;
    text: () => Promise<string>;
  }
  interface IResPacket {
    ok: boolean;
    status: number;
    payload: TConcatRetDataType;
  }
  const makeFormDataFetch = useCallback(
    async function(
      url: string,
      data: IData,
      files: IFiles,
      method: TMethod = "POST",
      formApis?: FormikProps<IRetDataType>
    ): Promise<IResPacket> {
      const Authorization = getAuthorization(true);
      const body = getFormDataBody(data, files);
      url = "/api/" + url;

      const res: IResBase = await fetch(url, {
        headers: { Authorization },
        body,
        method
      } as RequestInit);
      const payload = await getJsonParsedPayload(res);

      if (!res.ok) {
        if (formApis) formApis.setErrors(payload);
        setErrorMsg(payload as any, res.status, data as any);
      }

      return { ok: res.ok, payload, status: res.status };
    },
    [getAuthorization, getFormDataBody, getJsonParsedPayload, setErrorMsg]
  );

  return { makeFormDataFetch };
}

export default useFetchFormDataState;
