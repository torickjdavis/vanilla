import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  makeStyles,
} from '@material-ui/core';

import {
  Receipt as RecipeIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';

import { default as RouteLink } from '../components/Link';
import RoutedModal, { useInModal } from '../components/RoutedModal';
import ViewportCard from '../components/ViewportCard';

import { useBoxes } from '../contexts/BoxContext';
import { useRecipes } from '../contexts/RecipeContext';

import { useRouterViewParams } from './RouterView';
import routes from '../routes';

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

function BoxDetails() {
  const classes = useStyles();
  const { boxes } = useBoxes();
  const { recipes } = useRecipes();
  const params = useRouterViewParams(routes);
  const id = Number(params.id);

  const box = boxes?.find((b) => b.id === id); // intentional similarity instead of identity
  const { name, description, recipeIds } = box || {};

  return (
    <>
      <Typography variant="h3">{name}</Typography>
      <Typography variant="subtitle1">{description}</Typography>
      <List>
        {recipeIds?.map((recipeId) => {
          const recipe = recipes.find((r) => r.id === recipeId);
          return (
            <RouteLink
              to={{
                pathname: `/recipe/${recipe.id}`,
                // state: { backdrop: location },
              }}
              className={classes.link}
              key={`box-recipe-${recipeId}`}
            >
              <ListItem button>
                <ListItemIcon>
                  <RecipeIcon />
                </ListItemIcon>
                <ListItemText primary={recipe.title} />
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
    </>
  );
}

export default function BoxDialog() {
  // a lot of the dialogs have a very similar base structure, it would be beneficial to abstract
  const inModal = useInModal();
  if (inModal) {
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

  return (
    <ViewportCard title="Box Details">
      <BoxDetails />
    </ViewportCard>
  );
}
