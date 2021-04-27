import { ThemeProvider } from '@material-ui/core';

import theme from './theme';
import Navbar from './components/Navbar';
import RouterView from './views/RouterView';
import routes from './routes';

import AuthContextProvider from './contexts/AuthContext';
import UserContextProvider from './contexts/UserContext';
import RecipeContextProvider from './contexts/RecipeContext';
import BoxContextProvider from './contexts/BoxContext';

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <RecipeContextProvider>
          <BoxContextProvider>
            <ThemeProvider theme={theme}>
              <Navbar />
              <RouterView routes={routes} />
            </ThemeProvider>
          </BoxContextProvider>
        </RecipeContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
