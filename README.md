# [Vanilla](https://vanilla-box.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c01282dc-87f1-4197-847e-06436e52329a/deploy-status)](https://app.netlify.com/sites/vanilla-box/deploys)

A digital place for collecting, storing, and sharing recipes alike a physical cookbook or recipe box.

For details about the development process and my notes while creating the application, check out the [`DEVLOG`](DEVLOG.md).

The application is created with various technologies.
The front end is done using [React](https://reactjs.org/) and [Material UI](https://material-ui.com/).
The back end is primarily based in NodeJS with [Express](https://expressjs.com/).
Most of the back end is a RESTful API using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) as a datastore and [Mongoose](https://mongoosejs.com/) as a modeling tool.
The remaining back end functionality is a GraphQL API using Docker-based PostgreSQL as a datastore, and [Prisma](https://www.prisma.io/) as a modeling tool.

The front end is deployed on [Netlify](https://www.netlify.com/) and can be viewed here: https://vanilla-box.netlify.app/

The backend is deployed on Heroku and the APIs can be accessed here: https://vanilla-box.herokuapp.com/api/ (RESTful), and https://vanilla-box.herokuapp.com/graphql/ (GraphQL).

## Rich Internet Application Development 1 Project Requirements

The following is an overview checklist created from the requirements set out by [Thor Anderson](https://github.com/thortek).

- [x] App is Primarily Functional Components using React Hooks
  - [x] Demonstrating `useState`
  - [x] Demonstrating `useEffect`
  - [x] Demonstrating `useContext`
- Routing
  - [x] Minimum of 3 Routes
  - [x] Uses a Redirected Route
  - [x] Uses a Guarded Route
- [x] Uses a UI Framework
  - Free to choose, but they are using Material UI this semester.
- Uses Components of UI Framework
  - [x] Navigation Bar
  - [x] Expanding & Collapsing Side Drawer
  - [x] Modal Dialog
  - [x] Form with Validation
  - [x] Scoped Component Styles
    - Free to choose whatever method.
- [x] Retrieves Large Data List with Axios
- [x] Renders a Large List with Discrete React Components
  - Not just text list.
- [x] Redux or Context API for Data Storage
- [x] App Source on GitHub
- [x] App is Deployed
  - Uses Netlify or something similar.

## Rich Internet Application Development 2 Project Requirements

- [ ] Properly use Git with an Established Record of Commits
- [ ] Detailed `README` for running code on Docker or accessing from deployed sites.
- [Front-End Client (General)](https://vanilla-box.netlify.app)
  - [x] Conditional Logic, JS Array Methods, and Front-End Framework Elements for Lists
  - [x] Use VueJS or React to Manage Front-End Client
- [x] Use NPM Scripts and Node for Backend
- Data Stores Contain at Least _25 Items_
  - [ ] GraphQL API
  - [x] RESTful API
- [RESTful API](https://vanilla-box.herokuapp.com/api)
  - [x] [Mongoose](https://mongoosejs.com/) for Data Modeling
  - [x] Use MongoDB Atlas for Data Store
  - [x] `seed` Script for Populating Data Store
  - [x] User Interface for RESTful API
  - [x] 1+ `CREATE` Endpoints
  - [x] 3+ `GET` Endpoints
  - [x] 1+ `UPDATE` Endpoints
  - [x] 1+ `DELETE` Endpoints
- GraphQL API
  - [ ] [Prisma](https://www.prisma.io/) for Data Modeling
  - [x] Use Docker-based PostgreSQL or MySQL
  - [ ] `seed` Script for Populating Data Store
  - [ ] UI Interface for GraphQL API
  - [ ] 1+ Create `Mutation` Resolvers
  - [ ] 3+ Read/Get `Query` Resolvers
  - [ ] 1+ Update `Mutation` Resolvers
  - [ ] 1+ Delete `Mutation` Resolvers

## Getting Started with the Application Locally

To run the application locally, make sure to install all dependencies for the `client`, `server`, and the root project.
This can be done easily by simply running `npm install` in the root folder, which will trigger a `postinstall` hook which will install the dependencies of the `client` and `server`.

Next, a `.env.local` should be made in the `client` and `server` folders from the default `.env` files.
The `.env` files have defaults that are overridden in the format [_Create React App_ uses](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used).

Most importantly, the following environment variables **MUST** be configured before running the application:

| Project  | Environment Variable | Description                               |
| -------- | -------------------- | ----------------------------------------- |
| `server` | `MONGO_URI`          | The URI to connect to a MongoDB instance. |
| `server` | `JWT_SECRET`         | Some value used to sign access tokens.    |
| `client` | `REACT_APP_API_URL`  | URL the server is hosted at.              |

The following don't need to be configured, but can be:

| Project  | Environment Variable  | Default           | Description                     |
| -------- | --------------------- | ----------------- | ------------------------------- |
| `server` | `SPOONACULAR_API_KEY` | _None_            | Needed to `seed` data from API. |
| `server` | `PORT`                | `8080`            | Port to run application.        |
| `server` | `HOST`                | `localhost`       | Host to bind to.\*              |
| `server` | `PUBLIC_PATH`         | `../client/build` | Option static content.          |

\*Although `localhost`, `127.0.0.1` are the same, this is commonly configured to `0.0.0.0` on hosting services, such as Heroku.

## Application Scripts

### Root Project Scripts

#### `start`

Start the server in _production_ mode. This is synonymous with `server:start`.

#### `build`

Run the build step for the front end, and currently is synonymous for `client:build`.
It can be extended to include other build steps.

#### `postinstall`

After running install at the root level, go and install the dependencies for the subtree projects.
Currently runs `client:install` and `server:install`, and installs _all_ dependencies.

#### `dev`

Run the application in _dev_ mode.
This will run both `client:dev` and `server:dev` _concurrently_.
Great for rapid local development.

#### `client:install`

Moves into the `client` folder and installs all dependencies using `npm install`.

#### `client:dev`

Moves into the `client` project and runs it's `dev` script.

#### `client:build`

Moves into the `client` project and runs it's `build` script.

#### `server:install`

Moves into the `server` folder and installs all dependencies using `npm install`.

#### `server:start`

Moves into the `server` project and runs it's `start` script; which runs the production server.

#### `server:dev`

Moves into the `server` project and runs it's `dev` script.

#### `server:seed`

Moves into the `server` project and runs it's `seed` script with the default options, but the other options can be passed.
The `<recipeCount>` is the number of recipes to grab from the [Spoonacular API](https://spoonacular.com/food-api/), and they will be put into a `box`.

```sh
npm run server:seed <shouldRegister> <recipeCount>
```

```sh
# example executions
npm run server:seed
npm run server:seed false 5 # same as default
npm run server:seed false 10 # grab ten recipes
npm run server:seed false 25 # grab twenty-five
```

#### `server:seed:register`

Moves into the `server` project and runs it's `seed` script, but defaults `<shouldRegister>` to `true` the configured user before creating resources.

```sh
npm run server:seed <recipeCount>
```

```sh
# example executions
npm run server:seed:register
npm run server:seed:register 5 # same as default
npm run server:seed:register 10 # grab ten recipes
npm run server:seed:register 25 # grab twenty-five
```

#### `deploy:heroku`

Push the `server` subtree to Heroku.

#### ~~`test`~~

Script exists, but there are no tests defined at the root level.

### Client Scripts (Create React App)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the `client` directory, you can run:

#### `start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Server Scripts

In the `server` directory, you can run:

#### `start`

Start the server in a _production_ mode.

#### `dev`

Start the server in _dev_ mode using _Nodemon_ for rapid development.

#### `seed <shouldRegister> <recipeCount>`

Seed the database with `recipeCount` items, grouping them into a box.
Additionally, there's the option whether the script `shouldRegister` the user with the configured credentials.

#### `seed:register <recipeCount>`

This is the same as the other `seed` script, but with `<shouldRegister>` always set to `true`.

#### ~~`test`~~

Script exists, but there are no tests defined at the root level.

### RESTful API Endpoints

For examples, see the [`restfulAPI.http`](restfulAPI.http).

**Each route is prefixed with `/api`.**

#### Resource Routes

This applies to the `User`, `Recipe`, and `Box` models.
In place of `:resource` will be the model's name.

| CRUDL              | Method   | Route            | Authorization Required  |
| ------------------ | -------- | ---------------- | ----------------------- |
| _CREATE_           | `POST`   | `/:resource`     | Yes, except for `User`. |
| _READ_             | `GET`    | `/:resource/:id` | None required.          |
| _UPDATE (Replace)_ | `PUT`    | `/:resource/:id` | Required.\*             |
| _UPDATE (Modify)_  | `PATCH`  | `/:resource/:id` | Required.\*             |
| _DELETE_           | `DELETE` | `/:resource/:id` | Required.\*             |
| _List (Paginated)_ | `GET`    | `/:resource`     | None required.          |

\*In addition to being required, the resources can only be updated by the `User` that created them.

For _pagination_, there are a number of query parameters allowed:

| Parameter | Type    | Default | Description                                      |
| --------- | ------- | ------- | ------------------------------------------------ |
| `limit`   | Integer | `10`    | The number of elements in the response per page. |
| `page`    | Integer | `1`     | The selected page.                               |
| `all`     | Boolean | `false` | Query all elements; ignores the other options.   |

#### Utility Routes

No authorization required for these routes, and these all also prefixed with `/api`.

| Method | Route                  | Description                               |
| ------ | ---------------------- | ----------------------------------------- |
| `POST` | `/login`               | Request an access token to be authorized. |
| `GET`  | `/userBoxes/:userId`   | Request all the boxes a user made.        |
| `GET`  | `/userRecipes/:userId` | Request all the recipes a user made.      |

### GraphQL

For fully detailed documentation, visit the playground.
Otherwise, here are some sample queries:

```graphql
# incredibly useful paginated query
query {
  paginateRecipeBookmarks {
    recipeBookmarks {
      id
    }
    meta {
      page
      pages
      limit
      count
    }
  }
}
```

```graphql
mutation {
  createRecipeBookmarks(
    data: {
      creator: "<MONGO_DB_ID>"
      name: "Demo Bookmarks"
      urls: ["https://unsplash.com/", "https://unsplash.com/"]
    }
  ) {
    id
    creator
    createdAt
    updatedAt
    name
    urls
  }
}
```
