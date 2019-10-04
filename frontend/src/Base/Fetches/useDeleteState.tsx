import { useCallback } from "react";

import useFetchState from "./useFetchState";
import useErrorState from "./useErrorState";

function useDeleteState(
  snackLvl: "none" | "info" | "warning" | "error" = "error"
) {
  const { makeRestfulFetch } = useFetchState<{}>();
  const { setErrorMsg } = useErrorState(snackLvl);

  const fetchDelete = useCallback(
    async (url: string) => {
      const isAuthenticated = true;
      const method = "DELETE";
      const ret = await makeRestfulFetch(url, {
        isAuthenticated,
        method
      });
      const { ok, status, payload } = ret;
      if (!ok) setErrorMsg(payload as any, status);
      return ret;
    },
    [makeRestfulFetch, setErrorMsg]
  );

  return { fetchDelete };
}

export default useDeleteState;
