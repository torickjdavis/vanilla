import RecipeList from '../components/RecipeList';
import { Typography } from '@material-ui/core';
export default function RecipeContent({ userOnly = false }) {
  return (
    <>
      <Typography variant="h2" paragraph>
        Recipes
      </Typography>
      <RecipeList userOnly={userOnly} />
    </>
  );
}
