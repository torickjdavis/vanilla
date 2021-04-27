import { Grid, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import { useState } from 'react';
import BoxContent from './BoxContent';
import RecipeContent from './RecipeContent';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    background: theme.palette.primary.main,
    height: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    background: theme.palette.secondary.dark,
  },
}));

// TODO add search functionality for each type

/*
  <Fab variant="extended">
    <AddIcon />
    Create Box
  </Fab>
 */

export default function ExploreView() {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.tabs} square>
            <Tabs
              value={tabIndex}
              onChange={(event, value) => setTabIndex(value)}
              centered
            >
              <Tab label="Recipes" />
              <Tab label="Boxes" />
            </Tabs>
          </Paper>
          <Paper className={classes.paper} square elevation={0}>
            <div>
              {tabIndex === 0 && <RecipeContent />}
              {tabIndex === 1 && <BoxContent />}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
