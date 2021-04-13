import { createContext, useContext } from 'react';
import useAPI from '../hooks/useAPI';

const BoxContext = createContext();

const BoxContextProvider = ({ children }) => {
  const { loading, refresh, error, response, data } = useAPI('/box?all');

  return (
    <BoxContext.Provider
      value={{ loading, refresh, error, response, boxes: data?.boxes }}
    >
      {children}
    </BoxContext.Provider>
  );
};

export default BoxContextProvider;

export const useBoxes = () => useContext(BoxContext);
