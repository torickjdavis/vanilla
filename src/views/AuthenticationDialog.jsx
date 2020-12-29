import { Button, Grid, makeStyles } from '@material-ui/core';
import { useLocation, Redirect } from 'react-router-dom';
import RoutedModal, { useInModal } from '../components/RoutedModal';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => {});

const LoginForm = () => {};
const RegisterForm = () => {};
const Logout = ({ onLogout }) => {
  return (
    <RoutedModal
      title="Authentication - Logout"
      closeActionText="Cancel"
      actions={<Button onClick={() => onLogout()}>Logout</Button>}
    >
      Are you sure you want to logout?
    </RoutedModal>
  );
};

export default function AuthenticationDialog() {
  const classes = useStyles();
  const inModal = useInModal();
  const { isAuthenticated, login, logout } = useAuth();
  const query = new URLSearchParams(useLocation().search);
  const action = query.get('action');

  // prettier-ignore
  if (isAuthenticated && (action === 'login' || action === 'register')) return <Redirect to="/profile" />;
  else if (!isAuthenticated && action === 'logout') return <Redirect to="/" />;
  else if (isAuthenticated && action === 'logout') return <Logout onLogout={logout} />;

  return (
    <RoutedModal title="Authentication">
      <Grid container>
        <Grid item></Grid>
      </Grid>
    </RoutedModal>
  );
}
