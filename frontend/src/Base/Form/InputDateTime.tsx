import React, { memo, useCallback, useMemo } from "react";
import { DatePicker, Tooltip } from "antd";
import { FormikProps } from "formik";
import PropTypes from "prop-types";

import useFormInputsState from "./useFormInputsState";

interface IInputDateTimeProps {
  label: string;
  mode?: "date" | "datetime";
  name: string;
}

function InputDateTime({
  label,
  mode = "datetime",
  name,
  ...formikProps
}: IInputDateTimeProps & FormikProps<{ [x: string]: any }>) {
  const { inputError, style } = useFormInputsState(name, formikProps);
  const { setFieldTouched, setFieldValue } = formikProps;

  const handleChange = useCallback(
    value => {
      setFieldValue(name, value);
      setFieldTouched(name, true, true);
    },
    [name, setFieldValue, setFieldTouched]
  );

  const format = useMemo(
    () => {
      switch (mode) {
        case "date":
          return "YYYY-MM-DD";
        case "datetime":
          return "YYYY-MM-DD HH:mm:ss";
        default:
          return "YYYY-MM-DD";
      }
    },
    [mode]
  );

  return (
    <Tooltip title={inputError}>
      <DatePicker
        onChange={handleChange}
        style={{ ...style, width: "100%" }}
        showTime={mode === "datetime"}
        format={format}
      />
    </Tooltip>
  );
}

InputDateTime.propTypes = {
  mode: PropTypes.oneOf(["date", "datetime"]),
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
export default memo(InputDateTime);
