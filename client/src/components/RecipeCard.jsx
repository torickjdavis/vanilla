import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { default as RouteLink } from './Link';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../contexts/UserContext';
import { useRecipes } from '../contexts/RecipeContext';

import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';

import { Receipt as InstructionsIcon } from '@material-ui/icons';

import { colorHash } from '../theme';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

import RecipeForm from './RecipeForm';
import { jsonDeepCopy, unhandledError } from '../util';

const useStyles = makeStyles((theme) => ({
  root: {
    // potentially remove, and apply in RecipeView
    // [theme.breakpoints.up('md')]: {
    //   maxWidth: '25vmax',
    // },
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: '100%',
    paddingTop: '56.25%', // 16:9
  },
  mediaText: {
    background: theme.palette.secondary.dark,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userActions: {
    marginLeft: 'auto !important', // hate to use, but necessary for now
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  editButton: {
    color: theme.palette.info.main,
  },
}));

export default function RecipeCard({ recipe }) {
  const { user: authUser, isAuthenticated, token } = useAuth();
  const { refresh } = useRecipes();

  const { users } = useUsers();
  const user = users?.find((u) => u._id === recipe.created.by);
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();

  const {
    _id,
    title,
    image,
    summary,
    readyIn,
    servings,
    directions,
    ingredients,
  } = recipe;

  const avatarBackground = colorHash(user?._id || '');
  const fullname = user?.name.full || '';

  const [recipeFormVisible, setRecipeFormVisible] = useState(false);
  const [working, setWorking] = useState(false);

  const completeAction = () => {
    console.debug('Refreshing Recipes');
    refresh();
    setWorking(false);
  };

  return (
    <>
      <Card id={`recipe-${_id}`} className={classes.root}>
        <CardHeader
          title={title}
          avatar={
            <Avatar
              title={fullname}
              src={user?.picture}
              alt={fullname}
              style={{
                background: avatarBackground,
                color: theme.palette.getContrastText(avatarBackground),
              }}
            >
              {
                // first letter of each word in name
                fullname
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
              }
            </Avatar>
          }
        />
        {image ? (
          <CardMedia image={image} className={classes.media} />
        ) : (
          <Typography className={classes.mediaText}>
            This recipe is missing an image. Sorry.
          </Typography>
        )}
        <CardActions>
          <RouteLink
            to={{
              pathname: `/recipe/${_id}`,
              state: { backdrop: location },
            }}
          >
            <IconButton>
              <InstructionsIcon />
            </IconButton>
          </RouteLink>
          {isAuthenticated && authUser?._id === user?._id && (
            <>
              <EditButton
                size="small"
                pending={working}
                className={classes.userActions}
                onClick={() => {
                  console.debug(`Edit Box (${_id})`);
                  setWorking(true);
                  setRecipeFormVisible(true);
                }}
              />
              <DeleteButton
                size="small"
                pending={working}
                onClick={() => {
                  console.debug(`Delete Recipe (${_id})`);
                  setWorking(true);
                  axios
                    .delete(`${process.env.REACT_APP_API_URL}/recipe/${_id}`, {
                      headers: { Authorization: `Bearer ${token}` },
                    })
                    .then(() => completeAction()) // refresh recipes
                    .catch(unhandledError);
                }}
              />
            </>
          )}
        </CardActions>
      </Card>
      {recipeFormVisible && (
        <RecipeForm
          initialValues={jsonDeepCopy({
            title,
            image,
            summary,
            readyIn,
            servings,
            directions,
            ingredients,
          })}
          onClose={() => {
            setWorking(false);
            setRecipeFormVisible(false);
          }}
          onSubmit={(values) => {
            console.debug('Update Recipe', values);
            axios
              .patch(`${process.env.REACT_APP_API_URL}/recipe/${_id}`, values, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then(() => completeAction())
              .catch(unhandledError)
              .finally(() => setRecipeFormVisible(false));
          }}
        />
      )}
    </>
  );
}
