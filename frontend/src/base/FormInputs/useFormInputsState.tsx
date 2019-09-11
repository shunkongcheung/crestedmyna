import { useMemo } from "react";
import { FormikErrors, FormikProps } from "formik";

function useFormInputsState(
  name: string,
  formikProps: FormikProps<{ [x: string]: any }>
) {
  const { errors, touched, submitCount, values } = formikProps;

  const inputTouched = useMemo<boolean>(
    () => {
      if (touched[name]) return true;
      return false;
    },
    [name, touched]
  );

  const inputError = useMemo<string | FormikErrors<any> | undefined>(
    () => {
      if (!inputTouched && submitCount === 0) return;
      return errors[name];
    },
    [errors, inputTouched, name, submitCount]
  );

  const inputValue = useMemo<any>(() => values[name], [name, values]);

  return { inputError, inputValue };
}

export default useFormInputsState;
