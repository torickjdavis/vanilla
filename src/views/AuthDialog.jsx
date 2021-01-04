import { Button, makeStyles, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useLocation, Redirect } from 'react-router-dom';
import RoutedModal, { useInModal } from '../components/RoutedModal';
import ViewportCard from '../components/ViewportCard';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  loginButton: {
    margin: '0.5rem 0 1rem 0',
  },
}));

const LoginForm = ({ onLogin }) => {
  const classes = useStyles();
  const blank = ' '; // used in help text to avoid reflow if an error is set, also adds some whitespace
  return (
    <Formik
      initialValues={{
        email: 'foo.bar@example.com',
        password: 'foo.bar:password@example.com',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email.')
          .required('Email is required.'),
        password: Yup.string()
          .min(8, 'Password should be at least 8 characters.')
          .required('Password is required.'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log('Form submitted with', values);
        setSubmitting(false);
        onLogin();
      }}
    >
      {({
        values,
        errors,
        touched, // has the field been selected or ever focused
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            type="email"
            name="email"
            // margin="normal" // omit excess whitespace
            variant="filled"
            value={values.email}
            error={!!(touched.email && errors.email)}
            helperText={errors.email || blank}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            margin="normal"
            variant="filled"
            value={values.password}
            error={!!(touched.password && errors.password)}
            helperText={errors.password || blank}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            className={classes.loginButton}
            disabled={isSubmitting}
          >
            Login
          </Button>
        </form>
      )}
    </Formik>
  );
};

const Login = ({ onLogin }) => {
  const inModal = useInModal();

  if (inModal) {
    return (
      <RoutedModal
        title="Authentication - Login &amp; Register"
        // closeActionText="Cancel" // intentionally omitted
      >
        <LoginForm onLogin={onLogin} />
      </RoutedModal>
    );
  }

  return (
    <ViewportCard title="Login &amp; Register" hasCancel={false}>
      <LoginForm onLogin={onLogin} />
    </ViewportCard>
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

  return (
    <ViewportCard title="Logout Confirmation" actions={logoutButton}>
      {confirmationText}
    </ViewportCard>
  );
};

export default function AuthDialog() {
  const { isAuthenticated, login, logout } = useAuth();
  const query = new URLSearchParams(useLocation().search);
  const action = query.get('action');

  if (!isAuthenticated) {
    if (action === 'login') return <Login onLogin={login} />;
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
