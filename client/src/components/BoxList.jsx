import { default as RouteLink } from './Link';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import {
  ChevronRight as ChevronRightIcon,
  Inbox as BoxIcon,
} from '@material-ui/icons';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

export default function BoxList({ boxes }) {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          {boxes?.map(({ _id, name, description, recipes }) => (
            <RouteLink
              to={{
                pathname: `/box/${_id}`,
                state: { backdrop: location },
              }}
              className={classes.link}
              key={`box-${_id}`}
            >
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
                </ListItemSecondaryAction>
              </ListItem>
            </RouteLink>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
