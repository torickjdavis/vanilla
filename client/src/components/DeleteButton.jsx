import { CircularProgress, Fab, makeStyles } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  deleteButtonRoot: {
    background: theme.palette.error.main,
    color: theme.palette.common.white,

    '&:hover': {
      background: theme.palette.error.dark,
    },
  },
  absolute: {
    position: 'absolute',
  },
}));

export default function DeleteButton({
  children = null,
  className = null,
  pending = false,
  ...fabProps
}) {
  const styles = useStyles();
  return (
    <Fab
      variant={children ? 'extended' : 'round'}
      className={clsx(styles.deleteButtonRoot, className)}
      disabled={pending}
      {...fabProps}
    >
      {pending && (
        <CircularProgress className={styles.absolute} thickness={5} />
      )}
      <DeleteIcon />
      {children}
    </Fab>
  );
}
