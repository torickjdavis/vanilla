import { createContext, useContext, useEffect, useState } from 'react';

import jsonData from '../data/boxes.json';
import { randomInt } from '../util';
import { useRecipes } from './RecipeContext';

const BoxContext = createContext();

const BoxContextProvider = ({ children }) => {
  const { loading, recipes } = useRecipes();
  const [boxes, setBoxes] = useState(null);

  useEffect(() => {
    if (recipes?.length) {
      // populate boxes with random recipes
      setBoxes(
        jsonData.map((box) => {
          for (let i = 0; i < randomInt(3, 10); i++) {
            box.recipes.push(recipes[randomInt(0, recipes.length)].id);
          }
          return box;
        })
      );
    }
  }, [recipes]);

  return (
    <BoxContext.Provider value={{ loading, boxes: jsonData }}>
      {children}
    </BoxContext.Provider>
  );
};

export default BoxContextProvider;

export const useBoxes = () => useContext(BoxContext);
