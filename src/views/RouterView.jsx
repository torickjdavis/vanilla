import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import GuardRoute from '../components/GuardRoute';
import { useAuth } from '../contexts/AuthContext';
import ErrorView from './ErrorView';

// RouterView hooks used to simulate regular React Router hooks, but in a Dialog

export const useRouterViewMatch = (routes) => {
  return useRouteMatch({ path: routes.map((r) => r.path), exact: true });
};

export const useRouterViewParams = (routes) => {
  const { params } = useRouterViewMatch(routes);
  return params;
};

export default function RouterView({ routes }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const backdrop = location.state?.backdrop;

  const match = useRouteMatch({ path: routes.map((r) => r.path), exact: true });

  // prettier-ignore
  const modal = backdrop && routes.find((r) => r.path === match.path)?.component;

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
