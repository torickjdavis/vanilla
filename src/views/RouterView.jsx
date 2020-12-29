import { Route, Switch, useLocation } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import RoutedModal from '../components/RoutedModal';
import { useAuth } from '../contexts/AuthContext';
import ErrorView from './ErrorView';

export default function RouterView({ routes }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const backdrop = location.state?.backdrop;

  // prettier-ignore
  const modal = backdrop && routes.find((r) => r.path === location.pathname).component;

  return (
    <>
      <Switch location={backdrop || location}>
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
      {backdrop && <Route path={location.pathname} component={modal} />}
    </>
  );
}
