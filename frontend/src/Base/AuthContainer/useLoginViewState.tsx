import { useCallback, useContext, useMemo } from "react";
import { History } from "history";
import * as Yup from "yup";

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
      const submitValues = {
        username: values.username,
        password: values.password
      };

      const url = "uam/uam_auth/login/";
      const { ok, payload } = await fetchEdit(url, submitValues, { formApis });
      if (ok) {
        handleTokenChange(payload.token);
        history.push("/");
      }

      formApis.setSubmitting(false);
    },
    [fetchEdit, handleTokenChange, history]
  );

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required()
    });
  }, []);

  return { handleSubmit, validationSchema };
}

export default useLoginViewState;
