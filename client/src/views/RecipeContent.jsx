import { useRecipes } from '../contexts/RecipeContext';
import { useUsers } from '../contexts/UserContext';
import RecipeList from '../components/RecipeList';
import ErrorInfo from '../components/ErrorInfo';
import { Typography } from '@material-ui/core';

export default function RecipeContent() {
  const {
    loading: recipesLoading,
    error: recipesError,
    recipes,
  } = useRecipes();
  const { loading: usersLoading, error: usersError, users } = useUsers();
  if (recipesError || usersError)
    return <ErrorInfo error={recipesError || usersError} />;
  return (
    <>
      <Typography variant="h2" paragraph>
        Recipes
      </Typography>
      <RecipeList
        recipes={recipes}
        users={users}
        loading={recipesLoading || usersLoading}
      />
    </>
  );
}
