import React, { memo, ReactNode, useMemo } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import MiDialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface IDialogProps {
  children?: ReactNode;
  closeText?: string;
  handleSubmit?: () => void;
  handleClose: () => void;
  isOpen: boolean;
  submitText?: string;
  title: string;
  textContent?: string;
}

function Dialog({
  children,
  closeText = "Close",
  handleSubmit,
  handleClose,
  isOpen,
  submitText = "Submit",
  title,
  textContent
}: IDialogProps) {
  const renderedTextContent = useMemo(
    () => {
      if (!textContent) return <></>;
      return (
        <DialogContentText id="alert-dialog-description">
          {textContent}
        </DialogContentText>
      );
    },
    [textContent]
  );

  const renderedSubmitBtn = useMemo(
    () => {
      if (!handleSubmit) return;
      return (
        <Button onClick={handleSubmit} color="primary" autoFocus>
          {submitText}
        </Button>
      );
    },
    [handleSubmit, submitText]
  );

  return (
    <MiDialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{renderedTextContent}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {closeText}
        </Button>
        {renderedSubmitBtn}
      </DialogActions>
    </MiDialog>
  );
}

Dialog.propTypes = {
  children: PropTypes.any,
  closeText: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  submitText: PropTypes.string,
  title: PropTypes.string.isRequired,
  textContent: PropTypes.string
};
export default memo(Dialog);
