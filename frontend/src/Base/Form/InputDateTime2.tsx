import React, { memo, useCallback, useMemo } from "react";
import { DatePicker, Tooltip } from "antd";
import { useField } from "formik";
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
  ...formikProps
}: IInputDateTimeProps) {
  const { name } = formikProps;
  const [field, meta] = useField(formikProps);
  const { onChange, onBlur, value } = field;
  const { error, touched } = meta;

  const handleChange = useCallback(
    value => onChange({ target: { name, value } }),
    [name, onChange]
  );
	const handleOpenChange = useCallback(() => onBlur({ target: { name } }), 
																			 [name, onBlur]);

  const style = useMemo(
    () => {
      if (!error || !touched) return undefined;
      return {
        border: "1px solid red",
        borderRadius: 5
      };
    },
    [error, touched]
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
    <Tooltip title={error}>
      <DatePicker
        disabledDate={disabledDate}
        format={format}
        placeholder={label}
        name={name}
        onChange={handleChange}
        onOpenChange={handleOpenChange}
        showTime={mode === "datetime"}
        style={{ ...style, width: "100%" }}
        value={value ? moment(value) : undefined}
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
