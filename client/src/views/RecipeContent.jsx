import { useRecipes } from '../contexts/RecipeContext';
import { useUsers } from '../contexts/UserContext';
import RecipeList from '../components/RecipeList';
import ErrorInfo from '../components/ErrorInfo';
import { Typography } from '@material-ui/core';
import { useAuth } from '../contexts/AuthContext';

export default function RecipeContent({ userOnly = false }) {
  const {
    loading: recipesLoading,
    error: recipesError,
    recipes,
  } = useRecipes();
  const { loading: usersLoading, error: usersError, users } = useUsers();
  const { user } = useAuth();
  const filter = (r) => (userOnly ? r.created.by === user?._id : true);

  // prettier-ignore
  if (recipesError || usersError) return <ErrorInfo error={recipesError || usersError} />;

  return (
    <>
      <Typography variant="h2" paragraph>
        Recipes
      </Typography>
      <RecipeList
        recipes={recipes?.filter(filter)}
        users={users}
        loading={recipesLoading || usersLoading}
      />
    </>
  );
}
