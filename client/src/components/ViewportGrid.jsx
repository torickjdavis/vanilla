import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = ({ backgroundBase, imageURL }) => {
  return makeStyles((theme) => ({
    root: {
      position: 'relative',
      background: theme.palette.primary.main,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        // prettier-ignore
        background: `${backgroundBase || theme.palette.primary.main}${imageURL ? ` url("${imageURL}")` : ''}`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.5,
      },
    },
    content: {
      maxHeight: '100vh',
      zIndex: 1,
    },
    afterFold: {
      zIndex: 1,
    },
  }))();
};

export default function ViewportGrid({
  children,
  background = null,
  backgroundImageURL = null,
  gridContainerOptions = {},
  afterFold = null,
}) {
  const classes = useStyles({
    backgroundBase: background,
    imageURL: backgroundImageURL,
  });

  return (
    <Grid container className={clsx(classes.root, 'fill-height')}>
      <Grid
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        className={clsx(classes.content, 'fill-height')}
        {...gridContainerOptions}
      >
        {children}
      </Grid>
      {/* additional content below the fold */}
      {afterFold && (
        <Grid container item className={classes.afterFold}>
          {afterFold}
        </Grid>
      )}
    </Grid>
  );
}
