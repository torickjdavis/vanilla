import { Route, Switch } from 'react-router-dom';
import ErrorView from './ErrorView';

export default function RouterView({ routes }) {
  return (
    <Switch>
      {routes.map(({ path, component, ...options }) => (
        <Route
          key={path}
          path={path}
          component={component}
          exact
          {...options}
        />
      ))}
      <Route path="*">
        <ErrorView />
      </Route>
    </Switch>
  );
}
