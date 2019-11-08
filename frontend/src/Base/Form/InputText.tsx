import React, { ReactNode, memo, useMemo } from "react";
import { FormikProps } from "formik";
import PropTypes from "prop-types";
import { Input, Tooltip } from "antd";

import useFormInputsState from "./useFormInputsState";

interface IInputTextProps {
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
  label: string;
  isMask?: boolean;
  type?: "number";
  name: string;
}

function InputText({
  addonAfter,
  addonBefore,
  label,
  isMask,
  name,
  type,
  ...formikProps
}: IInputTextProps & FormikProps<any>) {
  const { inputError, inputValue, style } = useFormInputsState(
    name,
    formikProps
  );
  const { handleBlur, handleChange } = formikProps;

  const finalType = useMemo(
    () => {
      if (isMask) return "password";
      if (type) return type;
    },
    [isMask, type]
  );

  return (
    <Tooltip title={inputError}>
      <Input
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        name={name}
        placeholder={label}
        onBlur={handleBlur}
        onChange={handleChange}
        style={{ ...style, width: "100%" }}
        value={inputValue || ""}
        type={finalType}
      />
    </Tooltip>
  );
}

InputText.propTypes = {
  addonAfter: PropTypes.element,
  addonBefore: PropTypes.element,
  label: PropTypes.string.isRequired,
  isMask: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.oneOf(["number"])
};
export default memo(InputText);
