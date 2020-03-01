import React, { ReactNode, memo, useMemo } from "react";
import { Input } from "antd";
import { useField } from "formik";

import InputContainer from "./InputContainer";

interface InputTextProps {
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
  label: string;
  labelPosition?: "left" | "top";
  isMask?: boolean;
  name: string;
  noLabel?: boolean;
  noMargin?: boolean;
  type?: "number";
}

function InputText({
  addonAfter,
  addonBefore,
  label,
  isMask,
  labelPosition,
  noLabel,
  noMargin,
  type,
  ...formikProps
}: InputTextProps) {
  const [field, meta] = useField(formikProps);

  const style = useMemo(() => {
    if (!meta.error || !meta.touched) return undefined;
    return {
      border: "1px solid red",
      borderRadius: 5
    };
  }, [meta.error, meta.touched]);

  const finalType = useMemo(() => {
    if (isMask) return "password";
    if (type) return type;
  }, [isMask, type]);

  return (
    <InputContainer
      label={label}
      labelPosition={labelPosition}
      name={formikProps.name}
      noLabel={noLabel}
      noMargin={noMargin}
    >
      <Input
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        placeholder={label}
        {...field}
        style={{ ...style, width: "100%" }}
        type={finalType}
      />
    </InputContainer>
  );
}

export default memo(InputText);
