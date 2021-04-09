import { createContext, useContext } from 'react';
import useAPI from '../hooks/useAPI';

const BoxContext = createContext();

const BoxContextProvider = ({ children }) => {
  const { loading, error, response, data } = useAPI('/box?all');

  return (
    <BoxContext.Provider
      value={{ loading, error, response, boxes: data?.boxes }}
    >
      {children}
    </BoxContext.Provider>
  );
};

export default BoxContextProvider;

export const useBoxes = () => useContext(BoxContext);
