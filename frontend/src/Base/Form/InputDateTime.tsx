import React, { memo, useCallback, useMemo } from "react";
import { DatePicker, Tooltip } from "antd";
import { FormikProps } from "formik";
import moment, { Moment } from "moment";
import PropTypes from "prop-types";

import useFormInputsState from "./useFormInputsState";

interface IInputDateTimeProps {
  disabledDate?: (t: Moment | undefined) => boolean;
  label: string;
  mode?: "date" | "datetime";
  name: string;
}

function InputDateTime({
  disabledDate,
  label,
  mode = "datetime",
  name,
  ...formikProps
}: IInputDateTimeProps & FormikProps<{ [x: string]: any }>) {
  const { inputError, inputValue, style } = useFormInputsState(
    name,
    formikProps
  );
  const { setFieldTouched, setFieldValue } = formikProps;

  const handleChange = useCallback(
    value => {
      setFieldValue(name, value && value.isValid() ? value : undefined);
      setFieldTouched(name, true, true);
    },
    [name, setFieldValue, setFieldTouched]
  );
  const handleBlur = useCallback(
    open => {
      console.log("hey open changed...", name, open);
      setFieldTouched(name, true, true);
    },
    [name, setFieldTouched]
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
        disabledDate={disabledDate}
        format={format}
        placeholder={label}
        onChange={handleChange}
        onOpenChange={handleBlur}
        showTime={mode === "datetime"}
        style={{ ...style, width: "100%" }}
        value={inputValue ? moment(inputValue) : undefined}
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
