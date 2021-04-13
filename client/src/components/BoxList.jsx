import { useEffect, useState } from 'react';
import { default as RouteLink } from './Link';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar,
  makeStyles,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  ChevronRight as ChevronRightIcon,
  Edit as EditIcon,
  Inbox as BoxIcon,
} from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { useBoxes } from '../contexts/BoxContext';
import useAPI from '../hooks/useAPI';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

function BoxListItem({ _id, name, recipes = [], description = '' }) {
  return (
    <ListItem button>
      <ListItemIcon>
        <BoxIcon />
      </ListItemIcon>
      <ListItemText
        primary={name}
        secondary={`${recipes.length} Recipes${
          description ? `: ${description}` : ''
        }`}
      />
      <ListItemSecondaryAction>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            console.log(`Edit Box (${_id})`);
          }}
        >
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default function BoxList({ userOnly }) {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useAuth();
  const allBoxes = useBoxes();
  const userBoxes = useAPI(`/userBoxes/${user._id}`);

  const [loading, setLoading] = useState(true);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    setLoading(userOnly ? userBoxes.loading : allBoxes.loading);
    setBoxes(userOnly ? userBoxes.data?.boxes : allBoxes.boxes);
  }, [userBoxes, allBoxes]);

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
              .map((_, index) => <BoxListItem name="Many Delicious Recipes" />)}
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
        </List>
      </Grid>
    </Grid>
  );
}
