import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export default function Modal({
  isOpen,
  // open, // unused, no open within modal
  close,
  children,
  title = null,
  actions = null,
  closeActionText = null,
  dialogOptions = {},
}) {
  // todo: add aria-labelledby (DialogTitle) and aria-describedby (DialogContext/DialogContentText) to Dialog

  return (
    <Dialog open={isOpen} onClose={close} {...dialogOptions}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {typeof children === 'string' ? (
          <DialogContentText>{children}</DialogContentText>
        ) : (
          children
        )}
      </DialogContent>
      {(actions || closeActionText) && (
        <DialogActions>
          <Button onClick={close}>{closeActionText}</Button>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}
