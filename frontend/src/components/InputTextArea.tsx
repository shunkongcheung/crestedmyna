import React, { memo, useMemo } from "react";

import { Input } from "antd";
import { useField } from "formik";

import InputContainer from "./InputContainer";

const { TextArea } = Input;

interface InputTextAreaProps {
  label: string;
  labelPosition?: "left" | "top";
  isMask?: boolean;
  name: string;
  noLabel?: boolean;
  noMargin?: boolean;
  rows?: number;
}

function InputTextArea({
  label,
  isMask,
  labelPosition,
  noLabel,
  noMargin,
  rows = 4,
  ...formikProps
}: InputTextAreaProps) {
  const [field, meta] = useField(formikProps);
  const style = useMemo(() => {
    if (!meta.error || !meta.touched) return undefined;
    return {
      border: "1px solid red",
      borderRadius: 5
    };
  }, [meta.error, meta.touched]);

  return (
    <InputContainer
      label={label}
      labelPosition={labelPosition}
      name={formikProps.name}
      noLabel={noLabel}
      noMargin={noMargin}
    >
      <TextArea
        placeholder={label}
        {...field}
        style={{ ...style, width: "100%" }}
        rows={rows}
      />
    </InputContainer>
  );
}

export default memo(InputTextArea);
