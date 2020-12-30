import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { Search as SearchIcon } from '@material-ui/icons';

import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ViewportGrid from '../components/ViewportGrid';

const useStyles = makeStyles((theme) => ({
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
    <ViewportGrid backgroundImageURL="/assets/andy-chilton-0JFveX0c778-unsplash.jpg">
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
    </ViewportGrid>
  );
}
