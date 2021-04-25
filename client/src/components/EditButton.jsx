import { CircularProgress, Fab, makeStyles } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  editButtonRoot: {
    background: theme.palette.info.main,
    color: theme.palette.common.white,

    '&:hover': {
      background: theme.palette.info.dark,
    },
  },
  absolute: {
    position: 'absolute',
  },
}));

export default function EditButton({
  children = null,
  className = null,
  pending = false,
  ...fabProps
}) {
  const styles = useStyles();
  return (
    <Fab
      variant={children ? 'extended' : 'round'}
      className={clsx(styles.editButtonRoot, className)}
      disabled={pending}
      {...fabProps}
    >
      {pending && (
        <CircularProgress className={styles.absolute} thickness={5} />
      )}
      <EditIcon />
      {children}
    </Fab>
  );
}
