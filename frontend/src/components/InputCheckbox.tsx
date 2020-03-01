import React, { memo } from "react";
import { Checkbox, Tooltip } from "antd";
import { useField } from "formik";

import styled from "styled-components";

interface InputCheckboxProps {
  label?: string;
  name: string;
  noMargin?: boolean;
  value?: string | boolean;
}

const Container = styled.div<{ noMargin: boolean }>`
  margin-bottom: ${({ noMargin }) => (noMargin ? "0px" : "1rem")};
`;

function InputCheckbox({
  label = "",
  noMargin = false,
  value = true,
  ...formikProps
}: InputCheckboxProps) {
  const [field, meta] = useField(formikProps);

  return (
    <Container noMargin={noMargin}>
      <Tooltip title={meta.error}>
        <Checkbox
          {...field}
          value={value}
          checked={Array.isArray(field.value) && field.value.includes(value)}
        >
          {label}
        </Checkbox>
      </Tooltip>
    </Container>
  );
}

export default memo(InputCheckbox);
