import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import MiSnackbar from "@material-ui/core/Snackbar";
import { MdClose } from "react-icons/md";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import classes from "./SnackBar.module.scss";

interface ISnackBarContext {
  message?: string;
  type: "info" | "warning" | "error";
  status: number;
}

interface ISnackBarProps {
  message?: string;
  handleSnackBarChange: (v: ISnackBarContext) => any;
  type?: "error" | "warning" | "info";
}

function SnackBar({
  handleSnackBarChange,
  message,
  type = "info"
}: ISnackBarProps) {
  const handleClose = useCallback(
    () => handleSnackBarChange({ type, status: 200 }),
    [handleSnackBarChange, type]
  );
  const className = useMemo(
    () => {
      switch (type) {
        case "warning":
          return classes.warningContent;
        case "error":
          return classes.errorContent;
        default:
          return undefined;
      }
    },
    [type]
  );
  const open = useMemo(() => (message ? true : false), [message]);

  return (
    <MiSnackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      onClose={handleClose}
    >
      <SnackbarContent
        aria-describedby="client-snackbar"
        className={className}
        message={<span id="client-snackbar">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <MdClose />
          </IconButton>
        ]}
      />
    </MiSnackbar>
  );
}

SnackBar.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["info", "warning", "error"]),
  handleSnackBarChange: PropTypes.func.isRequired
};
export default memo(SnackBar);
