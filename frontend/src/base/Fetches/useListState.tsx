import { useCallback } from "react";

import useErrorState from "./useErrorState";
import useFetchState from "./useFetchState";

function useListState<IResult = object>(
  isAuthenticated: boolean,
  snackLvl: "none" | "info" | "warning" | "error" = "error"
) {
  interface IFetchDataType {
    count: number;
    results: Array<IResult>;
  }
  interface IListRet {
    ok: boolean;
    payload: IFetchDataType;
  }
  const { makeRestfulFetch } = useFetchState<IFetchDataType>();
  const { setErrorMsg } = useErrorState(snackLvl);

  interface IQueryParams {
    [x: string]: any;
  }
  const fetchList = useCallback(
    async (url: string, queryParams?: IQueryParams): Promise<IListRet> => {
      const ret = await makeRestfulFetch(url, {
        isAuthenticated,
        method: "GET",
        queryParams
      });
      const { ok, payload } = ret;
      if (!ok) setErrorMsg(payload as any);
      return ret;
    },
    [isAuthenticated, makeRestfulFetch, setErrorMsg]
  );

  return { fetchList };
}

export default useListState;
