import {
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import ViewportGrid from '../components/ViewportGrid';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export default function ExploreView() {
  const classes = useStyles();
  return (
    <ViewportGrid backgroundImageURL="/assets/andy-chilton-0JFveX0c778-unsplash.jpg">
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h2">Explore Recipes</Typography>
          <Grid container spacing={2} alignItems="flex-end" justify="center">
            <Grid item xs={1}>
              <SearchIcon />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="search-query"
                label="Search"
                type="search"
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </ViewportGrid>
  );
}
