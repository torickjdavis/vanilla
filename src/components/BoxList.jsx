import { default as RouteLink } from './Link';
import {
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
    <List>
      {boxes?.map(({ id, name, description }) => (
        <RouteLink
          to={{
            pathname: `/box/${id}`,
            state: { backdrop: location },
          }}
          className={classes.link}
        >
          <ListItem button key={id}>
            <ListItemIcon>
              <BoxIcon />
            </ListItemIcon>
            <ListItemText primary={name} secondary={description} />
            <ListItemSecondaryAction>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </RouteLink>
      ))}
    </List>
  );
}
