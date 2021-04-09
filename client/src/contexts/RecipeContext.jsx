import { createContext, useContext } from 'react';
import useAPI from '../hooks/useAPI';

const RecipeContext = createContext();

const RecipeContextProvider = ({ children }) => {
  const { loading, error, response, data } = useAPI('/recipe?all');

  return (
    <RecipeContext.Provider
      value={{ loading, error, response, recipes: data?.recipes }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContextProvider;

export const useRecipes = () => useContext(RecipeContext);
