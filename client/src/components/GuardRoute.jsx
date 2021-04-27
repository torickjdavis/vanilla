import { Route, Redirect } from 'react-router-dom';

export default function GuardRoute({
  allow,
  redirectTo = '/',
  children,
  ...rest
}) {
  return allow ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to={redirectTo} />
  );
}
