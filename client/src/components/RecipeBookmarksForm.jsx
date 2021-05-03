import {
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import * as Yup from 'yup';
import { Remove as RemoveIcon, Add as AddIcon } from '@material-ui/icons';
import FormikForm from './FormikForm.jsx';

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    background: theme.palette.error.main,
    '&:hover': {
      background: theme.palette.error.dark,
    },
  },
  addButton: {
    background: theme.palette.success.main,
    '&:hover': {
      background: theme.palette.success.dark,
    },
  },
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
  innerFieldGroup: {
    margin: theme.spacing(2, 0),
  },
}));

export default function RecipeBookmarksForm({
  onSubmit = null,
  onClose = null,
  initialValues = {},
}) {
  const classes = useStyles();
  const blank = ' '; // used in help text to avoid reflow if an error is set, also adds some whitespace

  const defaultInitialValues = {
    name: '',
    urls: [''],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Bookmarks group name is required.'),
    urls: Yup.array()
      .of(Yup.string().url('Must be a valid URL.'))
      .required('URLs are required.'),
  });

  return (
    <FormikForm
      title="Recipe Bookmarks Details"
      initialValues={{ ...defaultInitialValues, ...initialValues }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      onClose={onClose}
    >
      {(formik) => {
        const { values, touched, errors } = formik;

        const addURL = (url) => {
          values.urls.push('');
          formik.setValues(values);
        };

        const removeURL = (index) => {
          values.urls.splice(index, 1);
          formik.setValues(values);
        };

        return (
          <>
            <Grid
              container
              justify="space-between"
              className={classes.fieldGroup}
            >
              <Grid item xs={12}>
                <Typography className={classes.fieldGroupTitle}>
                  General Info
                </Typography>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  value={values.name}
                  error={!!(touched.name && errors.name)}
                  helperText={errors.name || blank}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} className={classes.fieldGroup}>
              <Grid
                container
                item
                xs={12}
                justify="space-between"
                alignItems="center"
                className={classes.fieldGroupTitle}
              >
                <Grid item>
                  <Typography>URLs</Typography>
                  <Typography variant="caption" color="error">
                    {(!(errors.urls instanceof Array) && errors.urls) || blank}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    className={classes.addButton}
                    title="Add URL"
                    onClick={() => addURL()}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
              {values.urls.map((url, index) => (
                <Grid container item xs={12} key={`url-${index}`}>
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="space-between"
                    className={classes.fieldGroupTitle}
                  >
                    <Grid item>
                      <Typography variant="body2">URL {index + 1}</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        size="small"
                        className={classes.deleteButton}
                        title={`Delete URL ${index + 1}`}
                        onClick={() => removeURL(index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={`urls[${index}]`}
                      name={`urls[${index}]`}
                      label={`URL`}
                      type="url"
                      value={url}
                      error={!!(touched.urls?.[index] && errors.urls?.[index])}
                      helperText={errors.urls?.[index] || blank}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </>
        );
      }}
    </FormikForm>
  );
}
