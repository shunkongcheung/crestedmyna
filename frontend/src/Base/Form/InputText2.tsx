import React, { ReactNode, memo, useMemo } from "react";
import { Input, Tooltip } from "antd";
import { useField } from "formik";

import PropTypes from "prop-types";

interface IInputTextProps {
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
  label: string;
  isMask?: boolean;
  name: string;
  type?: "number";
}

function InputText({
  addonAfter,
  addonBefore,
  label,
  isMask,
  type,
  ...formikProps
}: IInputTextProps) {
  const [field, meta] = useField(formikProps);

  const style = useMemo(
    () => {
      if (!meta.error || !meta.touched) return undefined;
      return {
        border: "1px solid red",
        borderRadius: 5
      };
    },
    [meta.error, meta.touched]
  );

  const finalType = useMemo(
    () => {
      if (isMask) return "password";
      if (type) return type;
    },
    [isMask, type]
  );

  return (
    <Tooltip title={meta.error}>
      <Input
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        placeholder={label}
        {...field}
        style={{ ...style, width: "100%" }}
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
