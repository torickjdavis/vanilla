import { useRecipes } from '../contexts/RecipeContext';
import RecipeList from '../components/RecipeList';

export default function RecipeContent() {
  const { loading, error, recipes } = useRecipes();
  return <RecipeList recipes={recipes} />;
}
