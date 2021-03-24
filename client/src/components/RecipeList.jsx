import SkeletonCard from '../components/SkeletonCard';
import { Grid } from '@material-ui/core';
import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes, users, loading }) {
  return (
    <Grid container spacing={2}>
      {loading &&
        Array(10)
          .fill(0)
          .map((_, index) => (
            <Grid item xs={12} md={4} lg={3} key={index}>
              <SkeletonCard avatar media />
            </Grid>
          ))}
      {!loading &&
        recipes?.map((recipe) => {
          const user = users?.find((u) => u._id === recipe.created.by);
          return (
            <Grid item xs={12} md={4} lg={3} key={`recipe-${recipe._id}`}>
              <RecipeCard recipe={recipe} user={user} />
            </Grid>
          );
        })}
    </Grid>
  );
}
