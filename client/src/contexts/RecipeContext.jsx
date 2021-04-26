import { createContext, useContext } from 'react';
import useAPI from '../hooks/useAPI';
import { useAuth } from './AuthContext';

const RecipeContext = createContext();

const RecipeContextProvider = ({ children }) => {
  const { user } = useAuth();
  const allRecipes = useAPI('/recipe?all');
  const userRecipes = useAPI(`/userRecipes/${user?._id}`, {
    skipRequest: !user?._id,
  });

  return (
    <RecipeContext.Provider
      value={{
        all: { ...allRecipes, recipes: allRecipes.data?.recipes },
        user: { ...userRecipes, recipes: userRecipes.data?.recipes },
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContextProvider;

export const useRecipes = () => useContext(RecipeContext);
