import { createContext, useContext } from 'react';
import useAxios from '../hooks/useAxios';

const RecipeContext = createContext();

const RecipeContextProvider = ({ children }) => {
  const apiURL = process.env.REACT_APP_API_URL;
  const resultCount = 25;
  // prettier-ignore
  const { loading, error, response, data } = useAxios(`${apiURL}/recipe?limit=${resultCount}`);

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
