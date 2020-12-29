import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

export default function Modal({
  isOpen,
  // open, // unused, no open within modal
  close,
  children,
  title = null,
  actions = null,
  dialogOptions = {},
}) {
  // todo: add aria-labelledby (DialogTitle) and aria-describedby (DialogContext/DialogContentText) to Dialog
  return (
    <Dialog open={isOpen} onClose={close} {...dialogOptions}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {actions ?? <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}
