import { useCallback } from "react";

import useErrorState from "./useErrorState";
import useFetchState from "./useFetchState";

function useDetailState<IDetail>(
  isAuthenticated: boolean,
  snackLvl: "none" | "info" | "warning" | "error" = "error"
) {
  interface IDetailRet {
    ok: boolean;
    status: number;
    payload: IDetail;
  }
  const { makeRestfulFetch } = useFetchState<IDetail>();
  const { setErrorMsg } = useErrorState(snackLvl);

  interface IQueryParams {
    [x: string]: any;
  }
  const fetchDetail = useCallback(
    async (url: string, queryParams?: IQueryParams): Promise<IDetailRet> => {
      const ret = await makeRestfulFetch(url, {
        isAuthenticated,
        method: "GET",
        queryParams
      });
      const { ok, status, payload } = ret;
      if (!ok) setErrorMsg(payload as any, status);
      return ret;
    },
    [isAuthenticated, makeRestfulFetch, setErrorMsg]
  );

  return { fetchDetail };
}

export default useDetailState;
