import { ThemeProvider } from '@material-ui/core';

import theme from './theme';
import Navbar from './components/Navbar';
import RouterView from './views/RouterView';
import routes from './routes';

import AuthContextProvider from './contexts/AuthContext';
import RecipeContextProvider from './contexts/RecipeContext';

function App() {
  return (
    <AuthContextProvider>
      <RecipeContextProvider>
        <ThemeProvider theme={theme}>
          <Navbar />
          <RouterView routes={routes} />
        </ThemeProvider>
      </RecipeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
