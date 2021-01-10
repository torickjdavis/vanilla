import { Grid } from '@material-ui/core';
import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes }) {
  return (
    <Grid container spacing={2}>
      {recipes.map((recipe) => (
        <Grid item xs={12} md={4} lg={3}>
          <RecipeCard key={recipe.id} recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}
