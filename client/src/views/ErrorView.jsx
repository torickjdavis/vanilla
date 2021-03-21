import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ViewportGrid from '../components/ViewportGrid';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
  },
  headline: {
    color: 'var(--accent-color)',
  },
}));

export default function ErrorView() {
  const classes = useStyles();

  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Redirect to={redirect} />;

  return (
    <ViewportGrid backgroundImageURL="/assets/andy-chilton-0JFveX0c778-unsplash.jpg">
      <Paper className={classes.paper}>
        <Typography variant="h1" className={classes.headline}>
          404 Missing
        </Typography>
        <Typography variant="h5" paragraph>
          Sorry for the inconvenience, but it appears the page your are looking
          for does not exist.
        </Typography>
        <Typography variant="h5" paragraph>
          Let's get you back on track. Maybe let's start with exploring the
          existing recipes.
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
      </Paper>
    </ViewportGrid>
  );
}
