import React, { memo, useMemo } from "react";

import { Select } from "antd";
import { useField } from "formik";

import InputContainer from "./InputContainer";

const { Option } = Select;

interface InputSelectProps {
  label: string;
  name: string;
  noLabel?: boolean;
  noMargin?: boolean;
  options: Array<{ label: string; value: any }>;
}

function InputSelect({
  label,
  noLabel,
  noMargin = false,
  options,
  ...formikProps
}: InputSelectProps) {
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
      noMargin={noMargin}
      noLabel={noLabel}
      name={formikProps.name}
    >
      <Select
        placeholder={label}
        {...field}
        onChange={(value: any) =>
          field.onChange({ target: { name: field.name, value } })
        }
        style={{ ...style, width: "100%" }}
      >
        {options.map(({ label, value }) => (
          <Option key={`Option-${field.name}-${value}`} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </InputContainer>
  );
}

export default memo(InputSelect);
