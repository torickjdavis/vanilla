import { ThemeProvider } from '@material-ui/core';

import theme from './theme';
import Navbar from './components/Navbar';
import RouterView from './views/RouterView';
import routes from './routes';

import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <Navbar />
        <RouterView routes={routes} />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
