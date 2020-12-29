import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { Search as SearchIcon } from '@material-ui/icons';

import clsx from 'clsx';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
      background: `url("/assets/andy-chilton-0JFveX0c778-unsplash.jpg")`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      opacity: 0.5,
    },
  },
  hero: {
    maxHeight: '100vh',
  },
  heroText: {
    zIndex: 1,
    position: 'relative',
    color: theme.palette.primary.contrastText,
    textShadow: `${theme.palette.primary.main} 0.5em 0.5em 1em`,
    '& h1': {
      fontWeight: '900',
    },
  },
  callToAction: {
    marginTop: `${theme.spacing(2)}px`,
  },
}));

export default function HomeView() {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Redirect to={redirect} />;

  return (
    <Grid container className={clsx(classes.root, 'fill-height')}>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        item
        className={clsx(classes.hero, 'fill-height')}
      >
        <Grid item>
          <Container className={classes.heroText}>
            <Typography variant="h1">Vanilla</Typography>
            <Typography variant="h3">
              Create, collect, and share recipes.
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.callToAction}
              startIcon={<SearchIcon />}
              onClick={() => setRedirect('/explore')}
            >
              Explore Recipes
            </Button>
          </Container>
        </Grid>
        <Grid item className={classes.callToAction}></Grid>
      </Grid>
      {/* <Grid container item>
        Additional content below the fold.
      </Grid> */}
    </Grid>
  );
}
