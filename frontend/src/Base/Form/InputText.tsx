import React, { memo, useMemo } from "react";
import { FormikProps } from "formik";
import PropTypes from "prop-types";
import { Input, Tooltip } from "antd";

import useFormInputsState from "./useFormInputsState";

interface IInputTextProps {
  label: string;
  isMask?: boolean;
  name: string;
}

function InputText({
  label,
  isMask,
  name,
  ...formikProps
}: IInputTextProps & FormikProps<{ [x: string]: any }>) {
  const { inputError, inputValue, style } = useFormInputsState(
    name,
    formikProps
  );
  const { handleBlur, handleChange } = formikProps;

  const type = useMemo(
    () => {
      if (isMask) return "password";
    },
    [isMask]
  );

  return (
    <Tooltip title={inputError}>
      <Input
        name={name}
        placeholder={label}
        onBlur={handleBlur}
        onChange={handleChange}
        style={{ ...style, width: "100%" }}
        value={inputValue || ""}
        type={type}
      />
    </Tooltip>
  );
}

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  isMask: PropTypes.bool,
  name: PropTypes.string
};
export default memo(InputText);
