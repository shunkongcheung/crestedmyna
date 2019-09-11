import { useCallback, useContext } from "react";
import { History } from "history";

import AuthContext from "./AuthContext";
import useEditState from "../Fetches/useEditState";

function useLoginViewState(history: History) {
  interface IRet {
    token: string;
  }
  interface IFetch {
    username: string;
    password: string;
  }

  const { handleTokenChange } = useContext(AuthContext);

  const isAuthenticated = false;
  const method = "POST";
  const { fetchEdit } = useEditState<IRet, IFetch>(isAuthenticated, method);

  const handleSubmit = useCallback(
    async (values: IFetch, f: any) => {
      const url = "uam/uam_auth/login/";
      const { ok, payload } = await fetchEdit(url, values, f);
      if (ok) {
        handleTokenChange(payload.token);
        history.push("/");
      }
    },
    [fetchEdit, handleTokenChange, history]
  );

  return { handleSubmit };
}

export default useLoginViewState;
