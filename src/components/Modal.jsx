import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  disablePadding: {
    padding: 0,

    '&:last-child': {
      padding: 0,
    },
  },
}));

export default function Modal({
  isOpen,
  // open, // unused, no open within modal
  close,
  children,
  title = null,
  actions = null,
  closeActionText = null,
  disablePadding = false,
  dialogOptions = {},
}) {
  // todo: add aria-labelledby (DialogTitle) and aria-describedby (DialogContext/DialogContentText) to Dialog

  const classes = useStyles();
  return (
    <Dialog open={isOpen} onClose={close} {...dialogOptions}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent
        className={clsx({ [classes.disablePadding]: disablePadding })}
      >
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
