import { createContext, useContext } from 'react';
import useAxios from '../hooks/useAxios';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const apiURL = process.env.REACT_APP_API_URL;
  const resultCount = 25;
  // prettier-ignore
  const { loading, error, response, data } = useAxios(`${apiURL}/auth/user?limit=${resultCount}`);

  return (
    <UserContext.Provider
      value={{ loading, error, response, users: data?.users }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUsers = () => useContext(UserContext);
