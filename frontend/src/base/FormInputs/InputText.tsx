import React, { memo, useMemo } from "react";
import { FormikProps } from "formik";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

import useFormInputsState from "./useFormInputsState";

interface IInputTextProps {
  helperText?: string;
  label: string;
  isMask?: boolean;
  name: string;
}

function InputText({
  helperText,
  label,
  isMask,
  name,
  ...formikProps
}: IInputTextProps & FormikProps<{ [x: string]: any }>) {
  const { inputError, inputValue } = useFormInputsState(name, formikProps);
  const { handleBlur, handleChange } = formikProps;

  const type = useMemo(
    () => {
      if (isMask) return "password";
    },
    [isMask]
  );

  return (
    <TextField
      error={inputError !== undefined}
      helperText={inputError || helperText}
      id={name}
      label={label}
      margin="normal"
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      value={inputValue || ""}
      type={type}
    />
  );
}

InputText.propTypes = {
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  isMask: PropTypes.bool,
  name: PropTypes.string
};
export default memo(InputText);
