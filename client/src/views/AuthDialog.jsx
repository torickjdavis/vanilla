import { Button } from '@material-ui/core';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import RoutedModal from '../components/RoutedModal';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';

const Logout = ({ onLogout }) => {
  const confirmationText = 'Are you sure you want to logout?';

  const logoutButton = (
    <Button variant="contained" color="primary" onClick={() => onLogout()}>
      Logout
    </Button>
  );

  return (
    <RoutedModal
      title="Authentication - Logout"
      closeActionText="Cancel"
      actions={logoutButton}
    >
      {confirmationText}
    </RoutedModal>
  );
};

export default function AuthDialog() {
  const { isAuthenticated, login, logout, register } = useAuth();
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const action = query.get('action');

  const onLogout = () => {
    logout();
    history.push('/'); // after logging out, go home
  };

  if (!isAuthenticated && action === 'logout') return <Redirect to="/" />;
  if (isAuthenticated && action === 'login') return <Redirect to="/" />;
  if (isAuthenticated && action === 'register') return <Redirect to="/" />;

  if (action === 'logout') {
    return <Logout onLogout={onLogout} />;
  } else if (action === 'login') {
    return (
      <AuthForm
        title="Login"
        onSubmit={async (values) => {
          await login(values);
          history.push('/profile');
        }}
      />
    );
  } else if (action === 'register') {
    return (
      <AuthForm
        title="Register"
        onSubmit={async (values) => {
          await register(values);
          history.push('/profile');
        }}
        showRegistration
      />
    );
  }

  // with an unknown action, swap to login
  console.warn(`Unhandled Action (${action})`);
  return (
    <Redirect
      to={{
        pathname: '/authentication',
        search: '?action=login',
      }}
    />
  );
}
