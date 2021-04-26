import { useEffect, useState } from 'react';
import { Grid, List, Snackbar, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useBoxes } from '../contexts/BoxContext';
import BoxListItem from './BoxListItem';

// TODO add error state

export default function BoxList({ userOnly }) {
  const { all: allBoxes, user: userBoxes } = useBoxes();

  const [loading, setLoading] = useState(true);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    setLoading(userOnly ? userBoxes.loading : allBoxes.loading);
    setBoxes(userOnly ? userBoxes.boxes : allBoxes.boxes);
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
            boxes?.map((box) => (
              <BoxListItem key={`box-${box._id}`} {...box} />
            ))}
          {!loading && !boxes?.length && (
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
