import { Button } from '@material-ui/core';
import { useLocation, Redirect } from 'react-router-dom';
import RoutedModal from '../components/RoutedModal';
import { useAuth } from '../contexts/AuthContext';
import { AuthForm } from '../components/AuthForm';

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
  const query = new URLSearchParams(useLocation().search);
  const action = query.get('action');

  if (isAuthenticated && (action === 'login' || action === 'register')) {
    return <Redirect to="/" />;
  } else if (action === 'logout') {
    return <Logout onLogout={logout} />;
  } else if (action === 'login') {
    return <AuthForm title="Login" onSubmit={login} />;
  } else if (action === 'register') {
    return <AuthForm title="Register" onSubmit={register} showRegistration />;
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
