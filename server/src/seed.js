import './config/env.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const [register = false] = process.argv.slice(2); // any value passed with resolve as truthy

const {
  HOST = 'localhost',
  PORT = 3000,
  SPOONACULAR_API_KEY,
  JWT_SECRET,
} = process.env;
const resultCount = 5;

const baseURL = `http://${HOST}:${PORT}/api`;
const spoonacularURL = `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=${resultCount}&limitLicense=true`;

try {
  if (register) {
    await axios.post(`${baseURL}/auth/register`, {
      email: 'demo@example.com',
      password: 'demo-user',
      name: {
        first: 'John',
        last: 'Doe',
      },
      picture: 'https://randomuser.me/api/portraits/men/84.jpg',
    });
  }

  const accessToken = await axios
    .post(`${baseURL}/auth/login`, {
      email: 'demo@example.com',
      password: 'demo-user',
    })
    .then((response) => response.data.accessToken);

  const demoUser = jwt.verify(accessToken, JWT_SECRET);
  console.log(
    'Seeding Data as',
    demoUser.name.first,
    demoUser.name.last,
    `(${demoUser._id})`
  );

  const spoonacularRecipes = await axios
    .get(spoonacularURL)
    .then((res) => res.data.recipes);

  const createRecipeIds = [];

  console.group('Creating Recipes');
  for (const spoonacularRecipe of spoonacularRecipes) {
    const {
      extendedIngredients,
      title,
      image,
      summary,
      readyInMinutes,
      servings,
      analyzedInstructions,
    } = spoonacularRecipe;

    const recipe = await axios
      .post(`${baseURL}/recipe`, {
        title,
        image,
        summary,
        readyIn: readyInMinutes,
        serves: servings,
        directions: analyzedInstructions.map(({ step }) => ({ step })),
        created: { by: demoUser._id },
        ingredients: extendedIngredients.map(({ name, measures }) => ({
          name,
          quantity: measures.us.amount,
          unit: measures.us.unitLong,
        })),
      })
      .then((res) => res.data);
    createRecipeIds.push(recipe._id);
    console.log('Recipe', recipe._id, recipe.title);
  }
  console.groupEnd();

  console.group('Create Box');
  const box = await axios
    .post(`${baseURL}/box`, {
      name: 'Demo Box',
      recipes: createRecipeIds,
      created: { by: demoUser._id },
    })
    .then((res) => res.data);
  console.log('Box', box._id);
  console.groupEnd();
} catch (error) {
  if (error.response) {
    console.error({
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers,
    });
  } else if (error.request) {
    console.error(error.request);
  } else console.error(error);
}
