import { ThemeProvider } from '@material-ui/core';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import theme from './theme';
import Navbar from './components/Navbar';
import RouterView from './views/RouterView';
import routes from './routes';

import AuthContextProvider from './contexts/AuthContext';
import UserContextProvider from './contexts/UserContext';
import RecipeContextProvider from './contexts/RecipeContext';
import BoxContextProvider from './contexts/BoxContext';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
