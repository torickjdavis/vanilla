import axios from 'axios';
import { useState } from 'react';
import {
  Fab,
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

import BoxForm from './BoxForm';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { default as RouteLink } from './Link';
import { useAuth } from '../contexts/AuthContext';
import { useBoxes } from '../contexts/BoxContext';
import { useLocation } from 'react-router';
import { jsonDeepCopy, unhandledError } from '../util';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: '1fr',
    background: theme.palette.primary.light,
    boxShadow: theme.shadows[10],
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),

    '&.hasUserActions': {
      gridTemplateRows: '1fr 1fr',
    },
  },
  userActions: {
    gridColumn: '-1/1',
    display: 'flex',
  },
  userAction: {
    margin: theme.spacing(0, 1),
  },
}));

export default function BoxListItem({
  _id,
  name,
  description = '',
  created,
  recipes = [],
}) {
  const classes = useStyles();
  const { token, isAuthenticated, user } = useAuth();
  const { refresh } = useBoxes();
  const [boxFormVisible, setBoxFormVisible] = useState(false);
  const [working, setWorking] = useState(false);
  const location = useLocation();

  const completeAction = () => {
    console.debug('Refreshing Boxes');
    refresh();
    setWorking(false);
  };

  const isAuthCreator = isAuthenticated && created?.by === user?._id;

  return (
    <>
      <ListItem
        className={clsx(classes.root, { hasUserActions: isAuthCreator })}
      >
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
          <RouteLink
            to={{
              pathname: `/box/${_id}`,
              state: { backdrop: location },
            }}
          >
            <Fab size="small" color="secondary">
              <ChevronRightIcon />
            </Fab>
          </RouteLink>
        </ListItemSecondaryAction>
        {isAuthCreator && (
          <div className={classes.userActions}>
            <EditButton
              size="small"
              pending={working}
              className={classes.userAction}
              onClick={() => {
                console.debug(`Edit Box (${_id})`);
                setWorking(true);
                setBoxFormVisible(true);
              }}
            />
            <DeleteButton
              size="small"
              pending={working}
              className={classes.userAction}
              onClick={() => {
                console.debug(`Delete Box (${_id})`);
                setWorking(true);
                axios
                  .delete(`${process.env.REACT_APP_API_URL}/box/${_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then(() => completeAction()) // refresh boxes
                  .catch(unhandledError);
              }}
            />
          </div>
        )}
      </ListItem>
      {boxFormVisible && (
        <BoxForm
          initialValues={jsonDeepCopy({ name, description, recipes })}
          onClose={() => {
            setWorking(false);
            setBoxFormVisible(false);
          }}
          onSubmit={(values) => {
            console.debug('Update Box', values);
            axios
              .patch(`${process.env.REACT_APP_API_URL}/box/${_id}`, values, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then(() => completeAction())
              .catch(unhandledError)
              .finally(() => setBoxFormVisible(false));
          }}
        />
      )}
    </>
  );
}
