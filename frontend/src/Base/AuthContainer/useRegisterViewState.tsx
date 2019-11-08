import { useCallback, useMemo } from "react";
import { History } from "history";
import * as Yup from "yup";

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
  const { fetchEdit } = useEditState<IRet, IFetch>(isAuthenticated);

  const handleSubmit = useCallback(
    async (values: IFetch, formApis: any) => {
    const submitValues = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      username: values.username,
      password: values.password
    };

      const url = "uam/uam_auth/register/";
      const { ok } = await fetchEdit(url, submitValues, { formApis });
      if (ok) history.push("/uam/login/");
    formApis.setSubmitting(false);
    },
    [fetchEdit, history]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        username: Yup.string().required(),
        first_name: Yup.string().required(),
        last_name: Yup.string(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().required(),
        password_again: Yup.string()
          .required()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
      }),
    []
  );

  return { handleSubmit, validationSchema };
}

export default useRegisterViewState;
