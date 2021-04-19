import { useEffect, useState } from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import SkeletonCard from '../components/SkeletonCard';
import RecipeCard from './RecipeCard';
import { useAuth } from '../contexts/AuthContext';
import { useRecipes } from '../contexts/RecipeContext';
import useAPI from '../hooks/useAPI';

// TODO add error state

export default function RecipeList({ userOnly }) {
  const { user } = useAuth();

  const allRecipes = useRecipes();
  const userRecipes = useAPI(`/userRecipes/${user?._id}`, {
    skipRequest: !user?._id,
  });
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setLoading(userOnly ? userRecipes.loading : allRecipes.loading);
    setRecipes(userOnly ? userRecipes.data?.recipes : allRecipes.recipes);
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
    </Grid>
  );
}
