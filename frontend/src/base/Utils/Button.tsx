import React, { memo, ReactNode, useMemo } from "react";
import PropTypes from "prop-types";

import MiButton from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

interface IButtonProps {
  handleClick: () => any;
  isDisabled?: boolean;
  isSubmitting: boolean;
  label: string | ReactNode;
}

function Button({
  handleClick,
  isDisabled,
  isSubmitting,
  label
}: IButtonProps) {
  const renderedButton = useMemo(
    () => {
      return (
        <MiButton
          onClick={handleClick}
          variant="contained"
          style={{ width: "100%" }}
        >
          {label}
        </MiButton>
      );
    },
    [handleClick, label]
  );

  const renderedLoading = useMemo(() => {
    return <CircularProgress color="secondary" style={{ margin: "0.5rem" }} />;
  }, []);

  return <>{isSubmitting ? renderedLoading : renderedButton}</>;
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isSubmitting: PropTypes.bool.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};
export default memo(Button);