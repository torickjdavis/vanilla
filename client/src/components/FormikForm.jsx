import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    background: theme.palette.primary.main,
  },
}));

export default function FormikForm({
  initialValues,
  validationSchema,
  title,
  onSubmit = null,
  onClose = null,
  cancelText = 'Cancel',
  submitText = 'Submit',
  children,
}) {
  if (!initialValues) throw new Error('initialValues is required.');
  if (!validationSchema) throw new Error('validationSchema is required.');
  if (!title) throw new Error('title is required.');

  const classes = useStyles();

  // starts open when rendered; otherwise, closed
  const [open, setOpen] = useState(true);
  const closeDialog = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (onSubmit) onSubmit(values);
      else console.debug('Form Submit', values);
      setSubmitting(false);
      closeDialog();
    },
  });
  const { isSubmitting, errors } = formik;
  const canSubmit = !isSubmitting && !Object.keys(errors).length;

  return (
    <Dialog
      disableBackdropClick
      open={open}
      onClose={closeDialog}
      scroll="paper"
      color="secondary"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <form onSubmit={formik.handleSubmit}>{children(formik)}</form>
      </DialogContent>
      <DialogActions>
        <Button size="large" onClick={closeDialog}>
          {cancelText}
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          disabled={!canSubmit}
          onClick={formik.handleSubmit}
        >
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
