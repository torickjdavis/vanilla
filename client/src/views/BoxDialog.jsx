import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  makeStyles,
  Paper,
} from '@material-ui/core';

import {
  Receipt as RecipeIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';

import { default as RouteLink } from '../components/Link';
import RoutedModal from '../components/RoutedModal';
import { useBoxes } from '../contexts/BoxContext';
import { useRecipes } from '../contexts/RecipeContext';

import { useRouterViewParams } from './RouterView';
import routes from '../routes';
import clsx from 'clsx';
import { useLocation } from 'react-router';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

function BoxDetails() {
  const classes = useStyles();
  const {
    all: { boxes },
  } = useBoxes();
  const {
    all: { recipes },
  } = useRecipes();
  const params = useRouterViewParams(routes);
  const location = useLocation();
  const id = params.id;

  const box = boxes?.find((b) => b._id === id); // intentional similarity instead of identity
  const { name, description, recipes: recipeIds } = box || {};

  return (
    <Paper elevation={0} square className={clsx('fill-height', classes.root)}>
      <Typography variant="h3" className={classes.name}>
        {name}
      </Typography>
      <Typography variant="subtitle1">{description}</Typography>
      <List>
        {recipeIds?.map((recipeId) => {
          const recipe = recipes?.find((r) => r._id === recipeId);
          return (
            <RouteLink
              to={{
                pathname: `/recipe/${recipe?._id}`,
                state: { backdrop: location },
              }}
              className={classes.link}
              key={`box-recipe-${recipeId}`}
            >
              <ListItem button>
                <ListItemIcon>
                  <RecipeIcon />
                </ListItemIcon>
                <ListItemText primary={recipe?.title} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ChevronRightIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </RouteLink>
          );
        })}
      </List>
    </Paper>
  );
}

export default function BoxDialog() {
  return (
    <RoutedModal
      title="Box Details"
      closeActionText="Close"
      dialogOptions={{ fullWidth: true, maxWidth: 'md', scroll: 'paper' }}
    >
      <BoxDetails />
    </RoutedModal>
  );
}
