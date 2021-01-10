import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { default as RouteLink } from './Link';

import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Link,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';

import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Receipt as InstructionsIcon,
  ExitToApp as ExternalLinkIcon,
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

export default function RecipeCard({ recipe }) {
  const classes = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const [liked, setLiked] = useState(false);

  const {
    // * overview data
    id,
    title,
    image,
    // * source data
    sourceName,
    sourceUrl,
    // * detail information
    // summary,
    // analyzedInstructions,
    // extendedIngredients,
    // * tags to display as pills/chips
    cuisines,
    dishTypes,
    occasions,
  } = recipe;

  const chips = [...new Set([...cuisines, ...dishTypes, ...occasions])]; // unique items
  const avatarBackground = colorHash(sourceName);

  return (
    <Card id={`recipe-${id}`} className={classes.root}>
      <CardHeader
        title={title}
        action={
          sourceUrl && (
            <Link href={sourceUrl} target="_blank">
              <IconButton title={`Source (${sourceUrl})`}>
                <ExternalLinkIcon />
              </IconButton>
            </Link>
          )
        }
        avatar={
          <Avatar
            title={sourceName}
            style={{
              background: avatarBackground,
              color: theme.palette.getContrastText(avatarBackground),
            }}
          >
            {
              // first letter of each word in name
              sourceName
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

      <CardContent>
        <div className={classes.chipContainer}>
          {chips.map((chip) => (
            <Chip label={chip} key={chip} className={classes.chip} />
          ))}
        </div>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => setLiked(!liked)}
          title={liked ? 'Unlike' : 'Like'}
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <RouteLink
          to={{
            pathname: `/recipe/${id}`,
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
