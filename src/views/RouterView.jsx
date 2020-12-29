import { Route, Switch, useLocation } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import { useAuth } from '../contexts/AuthContext';
import ErrorView from './ErrorView';

export default function RouterView({ routes }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const backdrop = location.state?.backdrop;

  const findRoute = (path) => routes.find((r) => r.path === path);

  const modal = backdrop && findRoute(location.pathname)?.component;

  const text = [
    'Route',
    backdrop ? `from(${backdrop?.pathname})` : null,
    `to(${location.pathname})`,
    modal ? `using ${modal.name}` : null,
  ];
  console.debug(text.filter((t) => !!t).join(' '));

  return (
    <>
      <Switch location={backdrop || location}>
        {routes.map(({ path, component, guard, ...options }) =>
          guard ? (
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
