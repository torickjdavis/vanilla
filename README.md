# [Vanilla](https://vanilla-box.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c01282dc-87f1-4197-847e-06436e52329a/deploy-status)](https://app.netlify.com/sites/vanilla-box/deploys)

A digital place for collecting, storing, and sharing recipes alike a physical cookbook or recipe box.

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
  - [ ] Expanding & Collapsing Side Drawer
  - [x] Modal Dialog
  - [ ] Form with Validation
  - [x] Scoped Component Styles
    - Free to choose whatever method.
- [ ] Retrieves Large Data List with Axios
- [ ] Renders a Large List with Discrete React Components
  - Not just text list.
- [ ] Redux or Context API for Data Storage
- [x] App Source on GitHub
- [x] App is Deployed
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

## 2020-10-26

Learning React through YouTube:

- [React Hooks - Web Dev Simplified](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h)
- [React Context & Hooks Tutorial - The Net Ninja](https://www.youtube.com/playlist?list=PL4cUxeGkcC9hNokByJilPg5g9m2APUePI)
- [Complete React Tutorial (with Redux) - The Net Ninja](https://www.youtube.com/playlist?list=PL4cUxeGkcC9ij8CfkAY2RAGb-tmkNwQHG)
- [Material UI](https://www.youtube.com/playlist?list=PLQg6GaokU5CwiVmsZ0d_9Zsg_DnIP_xwr)
- [Full React Course 2020 - Learn Fundamentals, Hooks, Context API, React Router, Custom Hooks](https://www.youtube.com/watch?v=4UZrsTqkcW4&ab_channel=freeCodeCamp.org)

Potential APIs:

- https://spoonacular.com/food-api/docs
- https://api2.bigoven.com/web/documentation/

## 2020-12-22

After a stressful end to the semester, and reviewing many materials to learn React, I've begun working on this project again.
I feel that I have a really good grasp of how React works along with some of the similarities and differences between it and Vue.

Instead of using Redux, I've decided to use the Context API, as it is one less dependency and now comes with React.
Additionally, for component styling I've decided to try and go forward with the `makeStyles` hook from MaterialUI.

Initialized application with various components and a router with many components to load as views along with a fallback `ErrorView` which is intended be used for all HTTP error pages, such as 404 and 500 errors.
Each view will act as a single page for content.

## 2020-12-23

Work on the navigation, getting it all connected with router links to each view.
Added `clsx` as a dependency.
First used it with custom `Link` component which is a wrapper around the `react-router-dom` `Link` and `NavLink`.
It separates the underline color from the text color in the links and makes use of the app's accent color.

One idea I want to explore, is showing a dialog when accessed by a route.
That way it can be linked to and show on top of any page.
Might have to create a wrapper which displays modal routes over the existing component.

Lastly, mocked out the `HomeView` content.
Built and styled in such a way that the main content exists above the "_fold_", as a cover.
Any additional content adds scrolling and is visible below the fold.
As part of this, a number of global utility styles were added to the `base.css`.
The font was also added to the `index.html`, but with all font weights.

The `NavBar` has also been updated to be sticky instead of static.

## 2020-12-28

Fleshed out the `AuthContext`.
Researched some options for better programmatic navigation with React Router.
Options primarily `useHistory` and the `Redirect` component.
Researched ideas for a route-able modal.
Taking inspiration from Unsplash, where the modal works, or if directly visited it is a standalone page.
There are a number of promising options to look further into and try out.
I would like to spike them in isolation, but have opted against that.

Promising Route-able Modal Options:

- [React Router Modal Gallery Example](https://reactrouter.com/web/example/modal-gallery)
- [Create a Modal Route with Link and Nav State in React Router](https://codedaily.io/tutorials/47/Create-a-Modal-Route-with-Link-and-Nav-State-in-React-Router)
- [Building a modal module for React with React-Router](https://blog.logrocket.com/building-a-modal-module-for-react-with-react-router/)
- [How to make routable modals in react with react-router](https://dev.to/unorthodev/how-to-make-routable-modals-in-react-with-react-router-3hgp)

Additionally, updated the applications icons/logo to match the navbar.
Used [`pwa-asset-generator`](https://github.com/onderceylan/pwa-asset-generator) to create the icon assets to be referenced in the manifest and meta tags.
With that same update, I changed the `<title>` for the application.

I also updated the `Navbar` icon to the correct duotone icon to
match the logo.
The AuthContext currently also mocks a random user from [RandomUser.me](https://randomuser.me/) to display content in the avatar when signed in.
Currently, there is no way to actively sign in or out, but this can be simulated to view the functionality.

Next, I updated the `HomeView` to make use of a `<Redirect>` route instead of programmatic navigation with `useHistory`.
The `Profile` was left making use of `useHistory` to demonstrate the differences between the two, as each has their own use cases.

At this point, I also went back to the original checklist and marked items complete.
Since the app makes use of the requested hooks, and I know they'll be used again later, I decided to mark that item off.
However, I did not mark off the item concerning data storage, as I feel that's better suited to when I fetch data from an API with Axios.

Following the update to the `HomeView` and checklist review, I then revisited the `RouterView` and `routes`.
I added a `guard` flag to each route which the `RouterView` would then load a `GuardRoute` instead of a regular `Route`.
This is a new component which will redirect to the `redirectTo` prop when the `allow` prop is falsy; otherwise, it will act like a regular `Route`.
This then also checks-off the need for a guarded route.
To give credit where credit is due, the development of the `GuardRoute` component was heavily inspired by the logic presented in ["How to create guarded routes for your React-App"](https://blog.netcetera.com/how-to-create-guarded-routes-for-your-react-app-d2fe7c7b6122).

_As an aside, any of these development log entries may roll over into the next day if the application is worked on past midnight, so I will try to be consistent and not start the next day's entry until after I've slept._

After a lot of trial and error, I believe I am finally able to get the modals to show up as I want them.
The first two links of my exploration proved to be the most useful in creating what I wanted.

The key takeaways are as follows:

- Assignment of the `backdrop` to the `location` prop of the `Switch`.
- Displaying the routed component outside the `Switch`, but still in the `Router`, if the `backdrop` has been set.

With that, I'm committing the current addition of `Modal` and `RoutedModal`.
This did cause modifications to the `Profile`, but it should be ready for the other dialog components.
I'm debating renaming those to be suffixed with _modal_ instead of _dialog_.
Regardless, I'm committing the application in what I believe is a working state.
Additionally, I feel this checks-off the requirement to use a modal dialog.

The next plan is to flesh out the `AuthenticationDialog` for login, registration, and logout.
