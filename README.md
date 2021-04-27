# [Vanilla](https://vanilla-box.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c01282dc-87f1-4197-847e-06436e52329a/deploy-status)](https://app.netlify.com/sites/vanilla-box/deploys)

A digital place for collecting, storing, and sharing recipes alike a physical cookbook or recipe box.

For details about the development process and my notes while creating the application, check out the [`DEVLOG`](DEVLOG.md).

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
  - [ ] Use Docker-based PostgreSQL or MySQL
  - [ ] `seed` Script for Populating Data Store
  - [ ] UI Interface for GraphQL API
  - [ ] 1+ Create `Mutation` Resolvers
  - [ ] 3+ Read/Get `Query` Resolvers
  - [ ] 1+ Update `Mutation` Resolvers
  - [ ] 1+ Delete `Mutation` Resolvers

## Application Details

### Available Scripts

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

# Create React App Information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
