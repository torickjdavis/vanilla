import { CircularProgress, Fab, makeStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  createButtonRoot: {
    background: theme.palette.success.main,
    color: theme.palette.common.white,

    '&:hover': {
      background: theme.palette.success.dark,
    },
  },
  absolute: {
    position: 'absolute',
  },
}));

export default function CreateButton({
  children = null,
  className = null,
  pending = false,
  ...fabProps
}) {
  const styles = useStyles();
  return (
    <Fab
      variant={children ? 'extended' : 'round'}
      className={clsx(styles.createButtonRoot, className)}
      disabled={pending}
      {...fabProps}
    >
      {pending && (
        <CircularProgress className={styles.absolute} thickness={5} />
      )}
      <AddIcon />
      {children}
    </Fab>
  );
}
