import '../config/env.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import prisma from '@prisma/client';

const prismaClient = new prisma.PrismaClient();

let [shouldRegister = false, resultCount, urlCount] = process.argv.slice(2);

const {
  HOST = 'localhost',
  PORT = 3000,
  SPOONACULAR_API_KEY,
  JWT_SECRET,
} = process.env;
resultCount = parseInt(resultCount) || 5;
urlCount = parseInt(urlCount) || 5;
shouldRegister = JSON.parse(shouldRegister); // true/false

const userDetails = {
  email: 'demo@example.com',
  password: 'demo-user',
  name: {
    first: 'Demo',
    last: 'User',
  },
  picture: 'https://source.unsplash.com/idTwDKt2j2o/512x512',
};

const restfulURL = `http://${HOST}:${PORT}/api`;
const spoonacularURL = `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=${resultCount}&limitLicense=true`;

try {
  await prismaClient.$connect();

  console.log(`Making Requests to ${restfulURL}`);
  if (shouldRegister) await axios.post(`${restfulURL}/user`, userDetails);

  const accessToken = await axios
    .post(`${restfulURL}/login`, {
      email: userDetails.email,
      password: userDetails.password,
    })
    .then((response) => response.data.accessToken);

  const demoUser = jwt.verify(accessToken, JWT_SECRET);
  console.log(
    'Seeding Data as',
    demoUser.name.first,
    demoUser.name.last,
    `(${demoUser._id})`
  );

  console.group(`Seeding Data with Prisma Client`);
  for (let i = 0; i < resultCount; i++) {
    // prettier-ignore
    console.log(`Seed iteration ${i + 1}/${resultCount} with ${urlCount} recipes.`);
    const spoonacularRecipes = await axios
      .get(spoonacularURL)
      .then((res) => res.data.recipes);

    const urls = spoonacularRecipes.map((r) => r.spoonacularSourceUrl);
    await prismaClient.recipeBookmarks.create({
      data: {
        creator: demoUser._id,
        name: `Seed Bookmarks ${i + 1}`,
        urls,
      },
    });
  }
  console.groupEnd();
  await prismaClient.$disconnect();
} catch (error) {
  console.error(error);
}
