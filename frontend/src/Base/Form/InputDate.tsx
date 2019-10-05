import React, { memo, useCallback, useMemo } from "react";
import { FormikProps } from "formik";
import { Tooltip, DatePicker } from "antd";
import PropTypes from "prop-types";

import useFormInputsState from "./useFormInputsState";

interface IInputDateProps {
  helperText?: string;
  label: string;
  name: string;
}

function InputDate({
  label,
  name,
  helperText,
  ...formikProps
}: IInputDateProps & FormikProps<{ [x: string]: any }>) {
  const { inputError, inputValue } = useFormInputsState(name, formikProps);
  const { setFieldTouched, setFieldValue } = formikProps;

  const handleChange = useCallback(
    date => {
      setFieldValue(name, date);
      setFieldTouched(name, true, true);
    },
    [setFieldTouched, setFieldValue, name]
  );

  const style = useMemo(
    () => {
      if (!inputError) return undefined;
      return {
        border: "1px solid red",
        borderRadius: 5
      };
    },
    [inputError]
  );

  return (
    <Tooltip title={inputError}>
      <DatePicker placeholder={label} onChange={handleChange} style={style} />
    </Tooltip>
  );
}

InputDate.propTypes = {
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
export default memo(InputDate);
