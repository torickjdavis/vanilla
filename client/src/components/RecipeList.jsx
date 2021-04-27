import { useEffect, useState } from 'react';
import { Grid, Snackbar, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import SkeletonCard from '../components/SkeletonCard';
import RecipeCard from './RecipeCard';
import { useRecipes } from '../contexts/RecipeContext';

// TODO add error state

export default function RecipeList({ userOnly }) {
  const { all: allRecipes, user: userRecipes } = useRecipes();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setLoading(userOnly ? userRecipes.loading : allRecipes.loading);
    setRecipes(userOnly ? userRecipes.recipes : allRecipes.recipes);
  }, [userRecipes, allRecipes, userOnly]);

  return (
    <Grid container spacing={2}>
      {loading && (
        <Snackbar open={loading}>
          <Alert variant="filled" severity="info">
            <AlertTitle>Loading Recipes</AlertTitle>
            This might take a moment.
          </Alert>
        </Snackbar>
      )}
      {loading &&
        Array(10)
          .fill(0)
          .map((_, index) => (
            <Grid item xs={12} md={4} lg={3} key={`recipe-temporary-${index}`}>
              <SkeletonCard avatar media />
            </Grid>
          ))}
      {!loading &&
        recipes?.map((recipe) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={`recipe-${recipe._id}`}
            >
              <RecipeCard recipe={recipe} />
            </Grid>
          );
        })}
      {!loading && !recipes?.length && (
        <Grid item>
          <Typography variant="subtitle1">
            Sorry, but there are no recipes here. How about you add one, and
            share something delicious.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
