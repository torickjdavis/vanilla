import { Route, Switch } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import { useAuth } from '../contexts/AuthContext';
import ErrorView from './ErrorView';

export default function RouterView({ routes }) {
  const { isAuthenticated } = useAuth();
  return (
    <Switch>
      {routes.map(({ path, component, guarded, ...options }) =>
        guarded ? (
          <GuardRoute
            key={path}
            path={path}
            component={component}
            exact
            allow={isAuthenticated}
          />
        ) : (
          <Route
            key={path}
            path={path}
            component={component}
            exact
            {...options}
          />
        )
      )}
      <Route path="*">
        <ErrorView />
      </Route>
    </Switch>
  );
}
