import { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const AuthContext = createContext();

const stateChanged = 'AUTH_STATE_CHANGED';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case stateChanged:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// provides state to all children through context provider, reassigning initial values
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const apiURL = process.env.REACT_APP_API_URL;

  const login = async ({ email, password }) => {
    const token = await axios
      .post(`${apiURL}/auth/login`, {
        email,
        password,
      })
      .then((res) => res.data.accessToken);
    const user = jwt.decode(token); // get payload, signature check is done on secure operations
    console.debug('Auth Login', user);
    dispatch({
      type: stateChanged,
      payload: {
        isAuthenticated: true,
        user,
        token,
      },
    });
  };

  const logout = async () => {
    console.debug('Auth Logout');
    dispatch({
      type: stateChanged,
      payload: initialState,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
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
