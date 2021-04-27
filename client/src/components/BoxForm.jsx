import {
  Checkbox,
  Chip,
  FormControl,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import * as Yup from 'yup';
import { useRecipes } from '../contexts/RecipeContext.jsx';
import FormikForm from './FormikForm.jsx';

const useStyles = makeStyles((theme) => ({
  selectRecipes: {
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
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
}));

const MENU_WIDTH = 250;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function BoxForm({
  onSubmit = null,
  onClose = null,
  initialValues = {},
}) {
  const classes = useStyles();
  const {
    all: { recipes },
  } = useRecipes();
  const blank = ' '; // used in help text to avoid reflow if an error is set, also adds some whitespace

  const defaultInitialValues = {
    name: '',
    description: '',
    recipes: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Box name is required.'),
    description: Yup.string(),
    recipes: Yup.array().of(Yup.string()).required('Recipes are required.'),
  });

  return (
    <FormikForm
      title="Box Details"
      initialValues={{ ...defaultInitialValues, ...initialValues }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      onClose={onClose}
    >
      {(formik) => {
        const { values, touched, errors } = formik;

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
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  type="url"
                  value={values.description}
                  error={!!(touched.description && errors.description)}
                  helperText={errors.description || blank}
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
                  <Typography>Recipes</Typography>
                  <Typography variant="caption" color="error">
                    {errors.recipes || blank}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <Grid
                  item
                  container
                  alignItems="center"
                  justify="space-between"
                  className={classes.fieldGroupTitle}
                >
                  <FormControl className={classes.selectRecipes}>
                    <InputLabel id="recipes-label" htmlFor="recipes">
                      Recipes
                    </InputLabel>
                    <Select
                      name="recipes"
                      id="recipes"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="outlined"
                      value={values.recipes}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((id) => {
                            const recipe = recipes.find((r) => r._id === id);
                            return (
                              <Chip
                                key={`recipe-chip-${id}`}
                                label={recipe.title}
                                className={classes.chip}
                              />
                            );
                          })}
                        </div>
                      )}
                      input={<Input />}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            width: MENU_WIDTH,
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                          },
                        },
                      }}
                      multiple
                    >
                      {recipes?.map((recipe) => (
                        <MenuItem value={recipe._id} key={recipe._id}>
                          <Checkbox
                            checked={values.recipes.indexOf(recipe._id) !== -1}
                          />
                          <ListItemText primary={recipe.title} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </>
        );
      }}
    </FormikForm>
  );
}
