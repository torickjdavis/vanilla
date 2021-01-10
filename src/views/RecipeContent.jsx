import { useRecipes } from '../contexts/RecipeContext';
import RecipeList from '../components/RecipeList';
import ErrorInfo from '../components/ErrorInfo';

export default function RecipeContent() {
  const { loading, error, recipes } = useRecipes();
  if (error) return <ErrorInfo error={error} />;
  return <RecipeList recipes={recipes} loading={loading} />;
}
