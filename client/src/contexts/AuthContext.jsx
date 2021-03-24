import { useState, createContext, useContext } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

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
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const apiURL = process.env.REACT_APP_API_URL;

  const login = async ({ email, password }) => {
    const token = await axios
      .post(`${apiURL}/auth/login`, {
        email,
        password,
      })
      .then((res) => res.data.accessToken);
    const user = jwt.decode(token); // get payload, signature check is done on secure operations
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
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
