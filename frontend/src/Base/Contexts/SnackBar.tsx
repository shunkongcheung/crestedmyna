import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import MiSnackbar from "@material-ui/core/Snackbar";
import { MdClose } from "react-icons/md";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import classes from "./SnackBar.module.scss";

interface ISnackBarProps {
  message?: string;
  type?: "error" | "warning" | "info";
}

function SnackBar({ message, type = "info" }: ISnackBarProps) {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);
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
  useEffect(() => setOpen(message ? true : false), [message]);

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
  message: PropTypes.string
};
export default memo(SnackBar);
