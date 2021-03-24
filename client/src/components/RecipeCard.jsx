import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { default as RouteLink } from './Link';

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
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  mediaText: {
    background: theme.palette.secondary.dark,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipContainer: {
    width: '100%',
    overflow: 'hidden',
    height: `${theme.spacing(4)}px`, // create only a single row
  },
  chip: {
    margin: `0 ${theme.spacing(1)}px`,
    '&:first-child': {
      marginLeft: '0',
    },
    '&:last-child': {
      marginRight: '0',
    },
  },
}));

export default function RecipeCard({ recipe, user }) {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const [liked, setLiked] = useState(false);

  const {
    // * overview data
    _id,
    title,
    image,
  } = recipe;

  const avatarBackground = colorHash(user?._id || '');
  const fullname = `${user?.name.first} ${user?.name.last}`;

  return (
    <Card id={`recipe-${_id}`} className={classes.root}>
      <CardHeader
        title={title}
        avatar={
          <Avatar
            title={fullname}
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
      </CardActions>
    </Card>
  );
}
