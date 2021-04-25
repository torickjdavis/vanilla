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

export default function RecipeForm({
  onSubmit = null,
  onClose = null,
  initialValues = {},
}) {
  const classes = useStyles();
  const blank = ' '; // used in help text to avoid reflow if an error is set, also adds some whitespace

  const defaultInitialValues = {
    title: '',
    image: '',
    summary: '',
    readyIn: 0,
    servings: 0,
    directions: [
      {
        step: '',
        details: '',
      },
    ],
    ingredients: [
      {
        name: '',
        quantity: 0,
        unit: '',
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Recipe title is required.'),
    image: Yup.string().url('Must be a valid URL.'),
    summary: Yup.string(),
    readyIn: Yup.number(),
    servings: Yup.number(),
    directions: Yup.array()
      .of(
        Yup.object().shape({
          step: Yup.string(),
          details: Yup.string(),
        })
      )
      .required('Directions are required.'),
    ingredients: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string(),
          quantity: Yup.number(),
          unit: Yup.string(),
        })
      )
      .required('Ingredients are required.'),
  });

  return (
    <FormikForm
      title="Recipe Details"
      initialValues={{ ...defaultInitialValues, ...initialValues }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      onClose={onClose}
    >
      {(formik) => {
        const { values, touched, errors } = formik;
        const addValue = (key, value) => {
          values[key].push(value);
          formik.setValues(values);
        };

        const removeValue = (key, index) => {
          values[key].splice(index, 1);
          formik.setValues(values);
        };

        // prettier-ignore
        const addIngredient = () => addValue('ingredients', { name: '', quantity: 0, unit: '' });
        const removeIngredient = (index) => removeValue('ingredients', index);

        // prettier-ignore
        const addDirection = () => addValue('directions', { step: '', details: '' });
        const removeDirection = (index) => removeValue('directions', index);

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
                  id="title"
                  name="title"
                  label="Title"
                  type="text"
                  value={values.title}
                  error={!!(touched.title && errors.title)}
                  helperText={errors.title || blank}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="image"
                  name="image"
                  label="Image URL"
                  type="url"
                  value={values.image}
                  error={!!(touched.image && errors.image)}
                  helperText={errors.image || blank}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="summary"
                  name="summary"
                  label="Summary"
                  multiline
                  rowsMax={4}
                  value={values.summary}
                  error={!!(touched.summary && errors.summary)}
                  helperText={errors.summary || blank}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  id="readyIn"
                  name="readyIn"
                  label="Ready In"
                  type="number"
                  min={0}
                  value={values.readyIn}
                  error={!!(touched.readyIn && errors.readyIn)}
                  helperText={errors.readyIn || blank}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  id="servings"
                  name="servings"
                  label="Servings"
                  type="number"
                  min={0}
                  value={values.servings}
                  error={!!(touched.servings && errors.servings)}
                  helperText={errors.servings || blank}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  <Typography>Directions</Typography>
                  <Typography variant="caption" color="error">
                    {errors.directions || blank}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    className={classes.addButton}
                    title="Add Step"
                    onClick={() => addDirection()}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
              {values.directions.map((direction, index) => (
                <Grid container item xs={12} key={`direction-${index}`}>
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="space-between"
                    className={classes.fieldGroupTitle}
                  >
                    <Grid item>
                      <Typography variant="body2">Step {index + 1}</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        size="small"
                        className={classes.deleteButton}
                        title={`Delete Step ${index + 1}`}
                        onClick={() => removeDirection(index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={`directions[${index}].step`}
                      name={`directions[${index}].step`}
                      label={`Step Info`}
                      type="text"
                      value={direction.step}
                      error={
                        !!(
                          touched.directions?.[index] &&
                          errors.directions?.[index]
                        )
                      }
                      helperText={errors.directions?.[index] || blank}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      id={`directions[${index}].details`}
                      name={`directions[${index}].details`}
                      label={`Step Details`}
                      type="text"
                      value={direction.details}
                      error={
                        !!(
                          touched.directions?.[index] &&
                          errors.directions?.[index]
                        )
                      }
                      helperText={errors.directions?.[index] || blank}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              ))}
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
                  <Typography>Ingredients</Typography>
                  <Typography variant="caption" color="error">
                    {errors.ingredients || blank}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    className={classes.addButton}
                    title="Add Ingredient"
                    onClick={() => addIngredient()}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
              {values.ingredients.map((ingredient, index) => (
                <Grid
                  container
                  item
                  xs={12}
                  key={`ingredient-${index}`}
                  justify="space-between"
                >
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="space-between"
                    className={classes.fieldGroupTitle}
                  >
                    <Grid item>
                      <Typography variant="body2">
                        Ingredient {index + 1}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        size="small"
                        className={classes.deleteButton}
                        title={`Delete Ingredient ${index + 1}`}
                        onClick={() => removeIngredient(index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={`ingredients[${index}].name`}
                      name={`ingredients[${index}].name`}
                      label={`Name`}
                      type="text"
                      value={ingredient.name}
                      error={
                        !!(
                          touched.ingredients?.[index] &&
                          errors.ingredients?.[index]
                        )
                      }
                      helperText={errors.ingredients?.[index] || blank}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <TextField
                      id={`ingredients[${index}].quantity`}
                      name={`ingredients[${index}].quantity`}
                      label={`Quantity`}
                      type="number"
                      min={0}
                      value={ingredient.quantity}
                      error={
                        !!(
                          touched.ingredients?.[index] &&
                          errors.ingredients?.[index]
                        )
                      }
                      helperText={errors.ingredients?.[index] || blank}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <TextField
                      id={`ingredients[${index}].unit`}
                      name={`ingredients[${index}].unit`}
                      label={`Unit`}
                      type="text"
                      min={0}
                      value={ingredient.unit}
                      error={
                        !!(
                          touched.ingredients?.[index] &&
                          errors.ingredients?.[index]
                        )
                      }
                      helperText={errors.ingredients?.[index] || blank}
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
