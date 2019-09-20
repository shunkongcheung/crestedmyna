import { useCallback, useContext } from "react";
import { History } from "history";

import { AuthContext } from "../Contexts";
import { useEditState } from "../Fetches";

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
  const { fetchEdit } = useEditState<IRet, IFetch>(isAuthenticated);

  const handleSubmit = useCallback(
    async (values: IFetch, formApis: any) => {
      const url = "uam/uam_auth/login/";
      const { ok, payload } = await fetchEdit(url, values, { formApis });
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
