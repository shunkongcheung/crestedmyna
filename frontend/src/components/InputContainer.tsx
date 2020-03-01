import React, { memo, ReactNode } from "react";

import { useField } from "formik";
import styled from "styled-components";
import { Tooltip } from "antd";

interface InputContainerProps {
  children: ReactNode;
  label: string;
  name: string;
  noLabel?: boolean;
  noMargin?: boolean;
  labelPosition?: LabelPosition;
}

type LabelPosition = "left" | "top";

const Container = styled.div<{
  noMargin: boolean;
  labelPosition: LabelPosition;
}>`
  margin-bottom: ${({ noMargin }) => (noMargin ? "0px" : "1rem")};
  display: ${({ labelPosition }) =>
    labelPosition === "left" ? "flex" : "block"};
`;

const InputContainer: React.FC<InputContainerProps> = ({
  children,
  label,
  name,
  noLabel = false,
  noMargin = false,
  labelPosition = "top"
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, meta] = useField({ name });

  return (
    <Container noMargin={noMargin} labelPosition={labelPosition}>
      {!noLabel && (
        <h4 style={{ width: labelPosition === "left" ? "30%" : "100%" }}>
          {label}
        </h4>
      )}
      <Tooltip title={meta.error}>
        <div style={{ width: labelPosition === "left" ? "70%" : "100%" }}>
          {children}
        </div>
      </Tooltip>
    </Container>
  );
};

export default memo(InputContainer);
