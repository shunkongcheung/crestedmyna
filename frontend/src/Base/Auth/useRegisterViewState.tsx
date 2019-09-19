import { useCallback } from "react";
import { History } from "history";

import { useEditState } from "../Fetches";

function useRegisterViewState(history: History) {
  interface IRet {}
  interface IFetch {
    first_name: string;
    last_name?: string;
    email: string;
    username: string;
    password: string;
  }

  const isAuthenticated = false;
  const method = "POST";
  const { fetchEdit } = useEditState<IRet, IFetch>(isAuthenticated, method);

  const handleSubmit = useCallback(
    async (values: IFetch, f: any) => {
      const url = "uam/uam_auth/register/";
      const { ok } = await fetchEdit(url, values, f);
      if (ok) history.push("/uam/login/");
    },
    [fetchEdit, history]
  );

  return { handleSubmit };
}

export default useRegisterViewState;
