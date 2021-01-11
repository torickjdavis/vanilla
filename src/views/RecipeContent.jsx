import { useRecipes } from '../contexts/RecipeContext';
import RecipeList from '../components/RecipeList';
import ErrorInfo from '../components/ErrorInfo';
import { Typography } from '@material-ui/core';

export default function RecipeContent() {
  const { loading, error, recipes } = useRecipes();
  if (error) return <ErrorInfo error={error} />;
  return (
    <>
      <Typography variant="h2" paragraph>
        Recipes
      </Typography>
      <RecipeList recipes={recipes} loading={loading} />
    </>
  );
}
