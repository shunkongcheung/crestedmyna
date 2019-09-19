import { useCallback, useMemo } from "react";
import { FormikErrors, FormikProps } from "formik";

function useFormState(
  name: string,
  formikProps: FormikProps<{ [x: string]: any }>
) {
  const { errors, touched, submitCount, values } = formikProps;

  const getByString = useCallback((o: any, s: string): any => {
    s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
    s = s.replace(/^\./, ""); // strip a leading dot
    let a = s.split(".");
    try {
      for (let i = 0, n = a.length; i < n; ++i) {
        let k = a[i];
        if (o !== undefined && o !== null && k in o) {
          o = o[k];
        } else return;
      }
    } catch (ex) {
      return undefined;
    }
    return o;
  }, []);

  const inputTouched = useMemo<boolean>(
    () => {
      if (getByString(touched, name)) return true;
      return false;
    },
    [getByString, name, touched]
  );

  const inputError = useMemo<string | FormikErrors<any> | undefined>(
    () => {
      if (!inputTouched && submitCount === 0) return;
      return getByString(errors, name);
    },
    [errors, getByString, inputTouched, name, submitCount]
  );

  const inputValue = useMemo<any>(() => getByString(values, name), [
    getByString,
    name,
    values
  ]);

  return { inputError, inputValue };
}

export default useFormState;
