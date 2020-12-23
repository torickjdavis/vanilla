import { ThemeProvider } from '@material-ui/core';

import theme from './theme';
import Navbar from './components/Navbar';
import RouterView from './views/RouterView';
import routes from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <RouterView routes={routes} />
    </ThemeProvider>
  );
}

export default App;
