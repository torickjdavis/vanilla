import { ThemeProvider } from '@material-ui/core';

import theme from './theme';
import Navbar from './components/Navbar';
import RouterView from './views/RouterView';
import routes from './routes';

import AuthContextProvider from './contexts/AuthContext';
import RecipeContextProvider from './contexts/RecipeContext';
import BoxContextProvider from './contexts/BoxContext';

function App() {
  return (
    <AuthContextProvider>
      <RecipeContextProvider>
        <BoxContextProvider>
          <ThemeProvider theme={theme}>
            <Navbar />
            <RouterView routes={routes} />
          </ThemeProvider>
        </BoxContextProvider>
      </RecipeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
