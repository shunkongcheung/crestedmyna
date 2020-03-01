import React, { memo } from "react";

import { Radio } from "antd";
import { useField } from "formik";

import InputContainer from "./InputContainer";

interface InputRadioProps {
  direction?: "row" | "column";
  name: string;
  label: string;
  noMargin?: boolean;
  options: Array<{ label: string; value: any }>;
}

function InputRadio({
  direction = "row",
  label,
  noMargin = false,
  options,
  ...formikProps
}: InputRadioProps) {
  const [field] = useField(formikProps);

  return (
    <InputContainer name={formikProps.name} noMargin={noMargin} label={label}>
      {direction === "row" ? (
        <Radio.Group {...field} options={options} />
      ) : (
        <Radio.Group {...field}>
          {options.map(({ label, value }, idx) => (
            <div key={`Radio-${value}-${formikProps.name}-${idx}`}>
              <Radio name={formikProps.name} value={value}>
                {label}
              </Radio>
            </div>
          ))}
        </Radio.Group>
      )}
    </InputContainer>
  );
}

export default memo(InputRadio);
