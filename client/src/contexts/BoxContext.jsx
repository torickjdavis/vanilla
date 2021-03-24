import { createContext, useContext } from 'react';
import useAxios from '../hooks/useAxios';

const BoxContext = createContext();

const BoxContextProvider = ({ children }) => {
  const apiURL = process.env.REACT_APP_API_URL;
  const resultCount = 25;
  // prettier-ignore
  const { loading, error, response, data } = useAxios(`${apiURL}/box?limit=${resultCount}`);

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
