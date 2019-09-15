import React, { memo, ReactNode, useMemo } from "react";
import PropTypes from "prop-types";

import MiButton from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import classes from "./SubmitButton.module.scss";

interface ISubmitButtonProps {
  handleClick: () => any;
  isDisabled?: boolean;
  isSubmitting: boolean;
  label: string | ReactNode;
  varient?: "primary" | "default";
}

function SubmitButton({
  handleClick,
  isDisabled,
  isSubmitting,
  label,
  varient='default'
}: ISubmitButtonProps) {
  const className = useMemo(
    () => (varient === "primary" ? classes.btnPrimary : classes.btnSecondary),
    [varient]
  );
  const renderedButton = useMemo(
    () => {
      return (
        <MiButton
          className={className}
          disabled={isDisabled}
          onClick={handleClick}
          variant="contained"
          style={{ width: "100%" }}
        >
          {label}
        </MiButton>
      );
    },
    [className, isDisabled, handleClick, label]
  );

  const renderedLoading = useMemo(() => {
    return <CircularProgress color="secondary" style={{ margin: "0.5rem" }} />;
  }, []);

  return <>{isSubmitting ? renderedLoading : renderedButton}</>;
}

SubmitButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isSubmitting: PropTypes.bool.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  varient: PropTypes.oneOf(["primary", "default"])
};
export default memo(SubmitButton);