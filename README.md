# [Vanilla](https://vanilla-box.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c01282dc-87f1-4197-847e-06436e52329a/deploy-status)](https://app.netlify.com/sites/vanilla-box/deploys)

A digital place for collecting, storing, and sharing recipes alike a physical cookbook or recipe box.

## Rich Internet Application Development 1 Project Requirements

The following is an overview checklist created from the requirements set out by [Thor Anderson](https://github.com/thortek).

- [] App is Primarily Functional Components using React Hooks
  - [] Demonstrating `useState`
  - [] Demonstrating `useEffect`
  - [] Demonstrating `useContext`
- [] Minimum of 3 Routes
  - [] Uses a Redirected Route
  - [] Uses a Guarded Route
- [] Uses a UI Framework
  - Free to choose, but they are using Material UI this semester.
  - [] Navigation Bar
  - [] Expanding & Collapsing Side Drawer
  - [] Modal Dialog
  - [] Form with Validation
- [] Scoped Component Styles
  - Free to choose whatever method.
- [] Retrieves Large Data List with Axios
- [] Renders a Large List with Discrete React Components
  - Not just text list.
- [] Redux or Context API for Data Storage
- [] App Source on GitHub
- [] App is Deployed
  - Uses Netlify or something similar.

# Create React App Information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
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

# Development Notes

## 2020-10-25

While researching further into [Material Design](https://material.io/), I discovered their [Material Studies](https://material.io/design/material-studies/about-our-material-studies.html).
Especially the [Basil](https://material.io/design/material-studies/basil.html) study, and certainly took inspiration from it.
I generated a series of thumbnail sketches on sticky notes over the past few weeks to think about how I ma want to design the application within the requirements.

I've done some development in the past with React, but this was prior to the creation of the [hooks API](https://reactjs.org/docs/hooks-intro.html) and I had learned very little about [Redux](https://redux.js.org/api/api-reference).
So, I'm primarily approaching this from my experience developing with Vue.

I set up this repository on GitHub and deployed the application using Netlify.
As part of that, I came across the [Netlify Identity Widget](https://github.com/netlify/netlify-identity-widget), and wondered if I should include authentication in the application and if this might be a good addition to abstract that functionality.

Having explored Thor's GitHub, I found a few repositories which seemed like they may be useful for referencing:

- https://github.com/thortek/dgm3790-initial-react-app
- https://github.com/thortek/DGM-3790/tree/master/JaredFinalProject

After an initial setup, I decided it would be best to create a mockup or wireframe using AdobeXD.
Ideally, this would be sent to Thor to get permission to register for the class, and set up a delivery plan to show progress on the application.
The design wouldn't be intended as the final implementation, only as a guiding document.

For a color scheme, the page might use the following as created using the [Material Design Color Tool](https://material.io/resources/color/):

- Primary `#4e342e`
  - Primary (Light) `#7b5e57`
  - Primary (Dark) `#260e04`
- Secondary `#f3e5ab` [_"Vanilla"_](<https://en.wikipedia.org/wiki/Vanilla_(color)>)
  - Secondary (Light) `#ffffdd`
  - Secondary (Dark) `#c0b37b`
