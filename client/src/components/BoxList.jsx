import { useEffect, useState } from 'react';
import { default as RouteLink } from './Link';
import {
  Grid,
  List,
  Snackbar,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { useLocation } from 'react-router-dom';
import { useBoxes } from '../contexts/BoxContext';
import useAPI from '../hooks/useAPI';
import { useAuth } from '../contexts/AuthContext';
import BoxListItem from './BoxListItem';

// TODO add error state

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

export default function BoxList({ userOnly }) {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useAuth();
  const allBoxes = useBoxes();
  const userBoxes = useAPI(`/userBoxes/${user?._id}`, {
    skipRequest: !user?._id,
  });

  const [loading, setLoading] = useState(true);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    setLoading(userOnly ? userBoxes.loading : allBoxes.loading);
    setBoxes(userOnly ? userBoxes.data?.boxes : allBoxes.boxes);
  }, [userBoxes, allBoxes, userOnly]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          {loading && (
            <Snackbar open={loading}>
              <Alert variant="filled" severity="info">
                <AlertTitle>Loading Boxes</AlertTitle>
                This might take a moment.
              </Alert>
            </Snackbar>
          )}
          {loading &&
            Array(5)
              .fill(0)
              .map((_, index) => (
                <BoxListItem
                  key={`box-temporary-${index}`}
                  name="Many Delicious Recipes"
                />
              ))}
          {!loading &&
            boxes?.map(({ _id, name, description, recipes }) => (
              <RouteLink
                to={{
                  pathname: `/box/${_id}`,
                  state: { backdrop: location },
                }}
                className={classes.link}
                key={`box-${_id}`}
              >
                <BoxListItem
                  _id={_id}
                  name={name}
                  recipes={recipes}
                  description={description}
                />
              </RouteLink>
            ))}
          {!boxes?.length && (
            <Grid item>
              <Typography variant="subtitle1">
                Sorry, but there are no boxes here. How about you create one,
                and share something delicious.
              </Typography>
            </Grid>
          )}
        </List>
      </Grid>
    </Grid>
  );
}
