import { Button, Grid, makeStyles } from '@material-ui/core';
import { useLocation, Redirect } from 'react-router-dom';
import RoutedModal, { useInModal } from '../components/RoutedModal';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => {});

const LoginForm = ({ onLogin }) => {
  return (
    <RoutedModal title="Authentication - Login &amp; Register">
      <Button onClick={onLogin}>Login</Button>
    </RoutedModal>
  );
};

const Logout = ({ onLogout }) => {
  const inModal = useInModal();

  const confirmationText = 'Are you sure you want to logout?';

  const logoutButton = (
    <Button variant="contained" color="primary" onClick={() => onLogout()}>
      Logout
    </Button>
  );

  if (inModal) {
    return (
      <RoutedModal
        title="Authentication - Logout"
        closeActionText="Cancel"
        actions={logoutButton}
      >
        {confirmationText}
      </RoutedModal>
    );
  }

  return <Grid container></Grid>;
};

export default function AuthenticationDialog() {
  const classes = useStyles();
  const { isAuthenticated, login, logout } = useAuth();
  const query = new URLSearchParams(useLocation().search);
  const action = query.get('action');

  if (!isAuthenticated) {
    if (action === 'login') return <LoginForm onLogin={login} />;
    else if (action === 'logout') return <Redirect to="/" />;
  } else {
    if (action === 'login') return <Redirect to="/profile" />;
    else if (action === 'logout') return <Logout onLogout={logout} />;
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
