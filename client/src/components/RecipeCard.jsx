import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { default as RouteLink } from './Link';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../contexts/UserContext';

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

import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Receipt as InstructionsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

import { colorHash } from '../theme';

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
  const { user: authUser, isAuthenticated } = useAuth();
  const { users } = useUsers();
  const user = users?.find((u) => u._id === recipe.created.by);
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const [liked, setLiked] = useState(false);

  const { _id, title, image } = recipe;

  const avatarBackground = colorHash(user?._id || '');
  const fullname = `${user?.name.first} ${user?.name.last}`;

  return (
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
        <IconButton
          onClick={() => setLiked(!liked)}
          title={liked ? 'Unlike' : 'Like'}
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
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
        {isAuthenticated && authUser._id === user._id && (
          <div className={classes.userActions}>
            <IconButton className={classes.editButton}>
              <EditIcon />
            </IconButton>
            <IconButton className={classes.deleteButton}>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </CardActions>
    </Card>
  );
}
