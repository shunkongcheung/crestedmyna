import React, { ReactNode, memo } from "react";
import { Button } from "antd";
import { useFormikContext } from "formik";
import * as PropTypes from "prop-types";

interface FormSubmitBtnProps {
  children: ReactNode;
}

function FormSubmitBtn({ children }: FormSubmitBtnProps) {
  const { isSubmitting, isValid } = useFormikContext();
  return (
    <Button
      disabled={!isValid}
      loading={isSubmitting}
      htmlType="submit"
      type="primary"
    >
      {children}
    </Button>
  );
}

FormSubmitBtn.propTypes = {
  children: PropTypes.node.isRequired
};
export default memo(FormSubmitBtn);
