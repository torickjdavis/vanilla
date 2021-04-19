import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import FormikForm from './FormikForm.jsx';

const useStyles = makeStyles((theme) => ({
  fieldGroup: {
    background: theme.palette.primary.light,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[2],
  },
  fieldGroupTitle: {
    marginBottom: theme.spacing(2),
  },
  blockButton: {
    width: '100%',
  },
}));

export function AuthForm({
  title = null,
  onSubmit = null,
  onClose = null,
  initialValues = {},
  showRegistration = false,
}) {
  const classes = useStyles();
  const history = useHistory();
  const blank = ' '; // used in help text to avoid reflow if an error is set, also adds some whitespace

  const closeAction = () => {
    if (onClose) onClose();
    history.push('/');
  };

  const defaultInitialValues = {
    email: '',
    password: '',
    name: {
      first: '',
      last: '',
    },
    picture: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email.')
      .required('Email is required.'),
    password: Yup.string()
      .min(8, 'Password should be at least 8 characters.')
      .required('Password is required.'),
    name: Yup.object().shape({
      first: Yup.string(),
      last: Yup.string(),
    }),
    picture: Yup.string().url('Picture must be a valid URL.'),
  });

  return (
    <FormikForm
      title={`Authentication${title ? ` - ${title}` : ''}`}
      initialValues={{ ...defaultInitialValues, ...initialValues }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      onClose={closeAction}
      submitText={showRegistration ? 'Register' : 'Login'}
    >
      {(formik) => {
        const { values, touched, errors } = formik;

        return (
          <>
            <Grid container className={classes.fieldGroup} alignItems="center">
              {showRegistration && (
                <>
                  <Grid item xs={6}>
                    <Typography>Already registered?</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      className={classes.blockButton}
                      onClick={() =>
                        history.push('/authentication?action=login')
                      }
                    >
                      Login
                    </Button>
                  </Grid>
                </>
              )}
              {!showRegistration && (
                <>
                  <Grid item xs={6}>
                    <Typography>Brand new?</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      className={classes.blockButton}
                      onClick={() =>
                        history.push('/authentication?action=register')
                      }
                    >
                      Register
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
            <Grid
              container
              justify="space-between"
              className={classes.fieldGroup}
            >
              <Grid item xs={12}>
                <Typography className={classes.fieldGroupTitle}>
                  Credentials
                </Typography>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  error={!!(touched.email && errors.email)}
                  helperText={errors.email || blank}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  error={!!(touched.password && errors.password)}
                  helperText={errors.password || blank}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            {showRegistration && (
              <Grid
                container
                justify="space-between"
                className={classes.fieldGroup}
              >
                <Grid item xs={12}>
                  <Typography className={classes.fieldGroupTitle}>
                    Account Info
                  </Typography>
                  <TextField
                    id="name.first"
                    name="name.first"
                    label="First Name"
                    type="text"
                    value={values.name.first}
                    error={!!(touched.name?.first && errors.name?.first)}
                    helperText={errors.name?.first || blank}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    id="name.last"
                    name="name.last"
                    label="Last Name"
                    type="text"
                    value={values.name.last}
                    error={!!(touched.name?.last && errors.name?.last)}
                    helperText={errors.name?.last || blank}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="picture"
                    name="picture"
                    label="Picture"
                    type="url"
                    value={values.picture}
                    error={!!(touched.picture && errors.picture)}
                    helperText={errors.picture || blank}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            )}
          </>
        );
      }}
    </FormikForm>
  );
}
