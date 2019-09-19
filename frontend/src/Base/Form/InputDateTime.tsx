import React, { memo, useCallback } from "react";
import { FormikProps } from "formik";
import PropTypes from "prop-types";

import { DateTimePicker } from "@material-ui/pickers";

import useFormInputsState from "./useFormInputsState";

interface IInputDateTimeProps {
  helperText?: string;
  label: string;
  name: string;
  type?: "date" | "datetime" | "time";
}

function InputDateTime({
  label,
  name,
  helperText,
  ...formikProps
}: IInputDateTimeProps & FormikProps<{ [x: string]: any }>) {
  const { inputError, inputValue } = useFormInputsState(name, formikProps);
  const { setFieldTouched, setFieldValue } = formikProps;

  const handleBlur = useCallback(() => setFieldTouched(name, true, true), [
    name,
    setFieldTouched
  ]);
  const handleChange = useCallback(value => setFieldValue(name, value), [
    name,
    setFieldValue
  ]);

  return (
    <DateTimePicker
      error={inputError !== undefined}
      helperText={inputError || helperText}
      id={name}
      label={label}
      margin="normal"
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      style={{ width: "100%" }}
      variant="inline"
      value={inputValue ? inputValue : null}
    />
  );
}

InputDateTime.propTypes = {
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["date", "datetime", "time"])
};
export default memo(InputDateTime);
