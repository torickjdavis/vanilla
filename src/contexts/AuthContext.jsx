import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

// creates context to be used, with default values (only used without a provider)
// const AuthContext = createContext({
//   isAuthenticated: false,
//   login: () => {},
//   logout: () => {},
// });

const AuthContext = createContext();

// provides state to all children through context provider, reassigning initial values
const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    // used to simulate loading user information from a request
    const fetchData = async () => {
      try {
        // prettier-ignore
        const response = await axios.get('https://randomuser.me/api/?inc=name,email,login,picture&seed=DGM3790');
        setUser(response.data.results[0]);
      } catch (error) {
        console.error(error);
      }
    };
    if (isAuthenticated) fetchData();
    else setUser(null);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

// exposes useable context as hook to access value of state in provider; as a consumer
export const useAuth = () => useContext(AuthContext);
