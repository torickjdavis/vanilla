import { createContext, useContext } from 'react';
import useAPI from '../hooks/useAPI';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { loading, error, response, data } = useAPI('/auth/user?all');

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
