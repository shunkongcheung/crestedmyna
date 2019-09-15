import React, { memo, ReactNode } from "react";
import PropTypes from "prop-types";

import { CenterArea, SubmitButton } from "../Utils";

import classes from "./FormArea.module.scss";

interface IFormAreaProps {
  banner: ReactNode;
  children: ReactNode;
  handleSubmit: () => any;
  isSubmitting: boolean;
  withPadding?: boolean;
}

function FormArea({
  banner,
  children,
  handleSubmit,
	isSubmitting,
	withPadding
}: IFormAreaProps) {
  return (
    <CenterArea withPadding={withPadding}>
      <form className={classes.container} onSubmit={handleSubmit}>
        <div className={classes.content}>
          <h1 className={classes.banner}>{banner}</h1>
          {children}
          <div className={classes.submitBtnDiv}>
            <SubmitButton
              handleClick={handleSubmit}
              label="Login"
              isSubmitting={isSubmitting}
              varient="primary"
            />
          </div>
        </div>
      </form>
    </CenterArea>
  );
}

FormArea.propTypes = {
  banner: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  withPadding: PropTypes.bool
};
export default memo(FormArea);
