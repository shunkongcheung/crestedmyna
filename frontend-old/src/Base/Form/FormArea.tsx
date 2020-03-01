import React, { memo, ReactNode } from "react";
import { Button } from "antd";
import { Form } from "formik";
import PropTypes from "prop-types";

import { CenterArea } from "../Utils";

import classes from "./FormArea.module.scss";

interface IFormAreaProps {
  banner: ReactNode;
  children: ReactNode;
  handleSubmit: () => any;
  submitText?: string;
  isSubmitting: boolean;
  withPadding?: boolean;
}

function FormArea({
  banner,
  children,
  handleSubmit,
  isSubmitting,
  withPadding,
  submitText = "SUBMIT"
}: IFormAreaProps) {
  return (
    <CenterArea withPadding={withPadding}>
      <Form className={classes.container} onSubmit={handleSubmit}>
        <div className={classes.content}>
          <h1 className={classes.banner}>{banner}</h1>
          {children}
          <div className={classes.submitBtnDiv}>
            <Button
              htmlType="submit"
              loading={isSubmitting}
              onClick={handleSubmit}
              type="primary"
            >
              {submitText}
            </Button>
          </div>
        </div>
      </Form>
    </CenterArea>
  );
}

FormArea.propTypes = {
  banner: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  submitText: PropTypes.string,
  withPadding: PropTypes.bool
};
export default memo(FormArea);
