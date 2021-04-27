# Development Notes

This file exists as a log of development and changes.
I considered naming it _CHANGELOG_; however, _DEVLOG_ felt more appropriate.
So, it contains all of my notes while developing the application.

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

## 2020-12-29

So far today I've worked on the `AuthenticationDialog`, but mostly I've been testing and correcting issues with the `RoutedModal` and guarded routes.

I've developed a system in the `Modal` which takes a `closeAction` prop and mutates it to add a click handler to it.
After writing it, I will likely not ever change anything about the close action other than the text.
Yet it was very informational to learn how to use `React.cloneElement` in order to mutate the props on a child element.

```js
// inside src/components/Modal.jsx

const CloseAction = ({ children }) => {
  children = [children].flat(); // works if children is array or single element to create array
  return children.map((child) => {
    return React.cloneElement(
      child,
      { ...child.props, onClick: close, key: child },
      child.props.children
    );
    // return child;
  });
};
```

That would then be used as any other component, but it would add the `close` handler from the greater scope to each of the children of the `CloseAction` component.
Interestingly, I did consider `useContext`, and that may have really been a better route, had I understood how to use it better, but I would need it to work across multiple instances.

So, with that sample documented, I've refactored it to a text prop instead; `closeActionText`.

I then worked on and off on the `AuthenticationDialog`.
At one point I got a login/log out prototype working, so that I can design the look independent of the functionality.

Then, I worked on the standalone designs for the authentication dialogs as cards.
Specifically, I abstracted this into a `ViewportCard` component within the file.
It makes use of a new separate component for the `ViewportGrid` to display content above the fold in a Material UI `Grid`.

## 2020-12-30

Since it was late, _again_, I didn't commit the README development notes.
_(Fun short-terms for this documentation would be a devlog, devblog, or something similar.)_

Anyway, today I started by checking out some more React videos.
Some for new content and concepts, like various hooks such as `useMemo` and `useCallback` among others.
While some videos I watched, and articles I read were intentionally topics I'd seen before.
It was intentional to reinforce the ideas behind them.
I was especially curious to learn more about `useContext`.
Although I built an `AuthContext` in the past inspired by [Thor's](https://github.com/thortek/dgm3790-initial-react-app/blob/fafe568b95e39eedd8aabb6736eacdd4caae89fc/src/contexts/AuthContext.js), I really didn't feel I understood the concepts behind it and how each part worked together.

- [React Hooks - Web Dev Simplified](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h)
  - This is a playlist of really good overviews for many hooks, and even creating your own.
- [React Context Explained (2020) - uidotdev](https://www.youtube.com/watch?v=rFnfvhtrNbQ&ab_channel=uidotdev)
  - This was great to show the differences between the `Context.Consumer` API and `useContext` Hook API.
- [React Hooks useContext Tutorial - Ben Awad](https://www.youtube.com/watch?v=lhMKvyLRWo0&ab_channel=BenAwad)
  - I'm not sure what it was about this video, maybe just the number of times I've been exposed to the concepts; however, at this point I now feel much more confident with `useContext`.
  - Since I liked this tutorial quite a bit, I watched a few others Ben had on `useReducer` and `useEffect`.
    - [React Hooks useReducer Tutorial - Ben Awad](https://www.youtube.com/watch?v=wcRawY6aJaw&ab_channel=BenAwad)
      - Since I'm mostly familiar Vue, with a little React from a few years ago, I found this to be reminiscent to Vuex or Redux (at least what I remember of it.)
      - It's important to remember, **DO NOT MUTATE STATE**, you will always return a new version of the state.
      - So, the question arises, as to when to use `useState` vs `useReducer`; as state gets more complex, it is nicer to use `useReducer`.
      - There's also a recommendation to check out [`use-immer`](https://github.com/immerjs/use-immer), as it allows mutating reducer state.
    - [React Hooks useEffect Tutorial - Ben Awad](https://www.youtube.com/watch?v=j1ZRyw7OtZs&ab_channel=BenAwad)
      - In short, `useEffect` is a way to interact with React in a way similar to lifecycle hooks.
      - The returned function from `useEffect` is a cleanup function, in a way it runs when the component is unmounted.
      - Importantly, multiple `useEffect` calls will be called sequentially.
      - Additionally, the callback to `useEffect` can't be `async`, but it can call an `async` function.

Vue has the concept of slots in components, instead of just children, I wonder if there's a way to mimic this in React without props.
However, that appears to be the way it's meant to be done.

Also, I've noticed components which immediately have a function in their body.
One example is the route matcher from React Router, or the context consumer.
I feel this would be useful to know how to create in some cases.

## 2020-12-31

As an additional note for hooks, `useState` can accept a function which returns the value of the initial state.
Regardless if the function is used to create the initial state, say such as from _some expensive computation_, it will only ever be executed once on the initial render.
I also just want to jot down the [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html) in the React documentation.
From this documentation, there's a nice note that the setter returned from `useState` has a "stable identity; meaning it won't change on re-renders."
That's why it is safe to omit from `useEffect` or `useCallback` dependency lists.
On the same note I had about lifecycle methods, there's [documentation for how many of the lifecycle methods correspond to hooks](https://reactjs.org/docs/hooks-faq.html#how-do-lifecycle-methods-correspond-to-hooks).

## 2021-01-02

Between the last log and today, I spent a lot of time celebrating the new year.
May this new year be better than the last one.
Between that time, I did answer one of the questions I had on a Vue `slot`-like API for React instead of props.
I found a Medium article titled [Vue Slots in React](https://medium.com/@srph/react-imitating-vue-slots-eab8393f96fd).
It discusses using static properties of a class in order to act like slots.
The alternative is to `map` over the children or `find` in the children in order to find children with specific types.
It ends with making use of the [_render prop pattern_](https://reactjs.org/docs/render-props.html).

Next, I wanted to make use of [Formik](https://formik.org/docs/overview) and [Yup](https://github.com/jquense/yup) for form validation, because that's what what used in Thor's sample repository.
I would just use native browser validation; however, I feel it important to have a more flexible validation scheme.

I found it interesting that `noValidate` property was applied and `autocomplete` was turned off in Thor's repository.
I didn't find any information in the commit text associated with the blame of that code which would indicate why that was done.
I've opted not to do that, unless I run into any issues when using Formik that it becomes prevalent as a need.

## 2021-01-04

The time I was able to spend on the project today was very short, but quite productive.
I didn't do much research today; rather, I completed the login form and the form validation using Formik and Yup.
So, with that, I've checked off the related requirement.

Next, I plan on working on the explore page, so that I can feel confident checking off the requirement for using the Context API for data storage.
With that I will also feel confident with marking off the requirements on using Axios.

Either with that, before or after it, I feel the profile can be added.
That page I intend to make use of a sidebar drawer, which will then check off the final requirement.

After that, all that will remain is the account page/dialog, which I feel should be fairly straight forward and will look just like another form.

Somewhere, probably only on the profile page, I would like to add a button for showing a form dialog to add data.
That form may or may not get mocked out.
It will depend on what time I have before the semester starts.

Lastly, I've renamed the `AuthenticationDialog` to `AuthDialog`.
That'll better match the naming of _auth_ related items throughout the application.
Namely, it better matches the `AuthContext`.
With that, I've also slightly modified the order of the `onSubmit` handler to fix an error.

## 2021-01-05

Although it's now early morning, I believe I'll be working more on the project this afternoon.
So, I've started the log for today.

No further work was done yesterday after the late evening development.
This is another round of such late night/early morning developments.

<!-- At this point, I'm also still unsure if a provider abstraction is necessary.
Or how that works if we only call `useContext` in the application. -->

One thing to note for myself, the provider for a context is always necessary.
The creation of the abstracted provider just makes it easier to use.
Any child within the provider can then all make use of the custom hook.

## 2021-01-06

Due to work on my thesis project for Honors and my Bachelor's, I didn't actually end up doing any more work on the project tomorrow.
The work I did do early yesterday morning was creation of a custom `useAxios` hook to make stateful `GET` requests to APIs.
Originally it was mocked as part of a `AxiosContext`, but that was scrapped for re-usability of a custom hook instead.
In place of the `AxiosContext`, I want to create something like and `RecipeContext` or something similarly named.

I initially tested the `useAxios` hook by using [JSON Placeholder](https://jsonplaceholder.typicode.com/).
Then I decided to go forward with the [Spoonacular Food API](https://spoonacular.com/food-api) since it had a _free_ tier that I could use.
So, I signed up for their service and got an API key.

Knowing I didn't want to accidentally post this key to GitHub, but I wanted to use it in my React code, I looked to see if there was a proper way to do it.
I knew I wanted to use a `.env` file, but wasn't sure how I would get the variables into the application.
Thankfully, there was some nice documentation for `create-react-app`.
It described [how to add custom environment variable to React applications](https://create-react-app.dev/docs/adding-custom-environment-variables/) created with `create-react-app`.

Alternatively, I could've created a proxy server to handle the requests, and run both the React development server along side my own proxy API server using `concurrently` or some other method.
However, I wasn't sure how I would then launch it in Netlify, so I checked for a simpler alternative first.
Really, this should probably be done at some point; otherwise, the API could potentially get extracted from the deployed application.

So, I also added the environment variable to Netlify.
To figure that out, I just followed [their documentation](https://docs.netlify.com/configure-builds/environment-variables/).

At some point it might be beneficial to go an add types to all of the props of my custom components in order to make them more usable.
Such as marking the expected datatype, if it's required, etc.
As to how to do this, React has a separate package called `prop-types`.
There's [additional documentation](https://reactjs.org/docs/typechecking-with-proptypes.html) on using it.

I've changed the `RecipeView` to be a `RecipeDialog` so it semantically will match the other dialogs and will also allows standalone viewing of the route.
Again, my real world example is Unsplash.

With that, I've also added a `RecipeList` which simply creates a `React.Fragment` and populates the children with a map over the recipes prop each as a `RecipeCard`.
That's another component, but it's still being worked on at this point in time.

## 2021-01-08

I've considered using the [`Skeleton` component](https://material-ui.com/components/skeleton/) in the `RecipeList` while the data is loading; however, I've decided that's more of a stretch and qualifies more as scope creep.

## 2021-01-10

Todays changes start just after midnight.
I took a nap yesterday, and I don't feel tired enough to sleep again, so I've decided to just work as much as I can on this project.

I implemented using a `Drawer` on the profile page.
It was a challenge in order to get it to display how I wanted.
That is, the _mini_ format, but clipped underneath the main navigation.
The solution was to change the `z-index` of the drawer and an empty `Toolbar` to make the list offset by just the right amount for the `AppBar`.
With that drawer, I've checked off the final item requirement.

Although I originally flagged the use of the `Skeleton` component as scope creep, I've gone ahead and added a `SkeletonCard` component which makes use of it.
I've then used that component within the `RecipeContent` view.

I've just added a lot of content relating to the `RecipeContent` and `BoxContent`.
With the `BoxContent` I added a few new components to help display the data I store with a new `BoxContext`.

I also updated the routes for the `BoxView` to `BoxDialog`, since that will be more semantic to what the view is intended to be used for.

With those changes, the application feels a lot closer to being done.
I feel that I really just need to add the functionality for a few of the dialogs, and then I'll feel confident to submit a final update.
I'll also need to add something to the explore page.
That'll probably just be a nice search input for now.

I know that I planned on sending the final update much earlier, but I guess I didn't anticipate a number of things.
Regardless, I'm glad to have learned so much about React in what feels like such a short time.
Additionally, I'd rather submit this late than never.

As an aside, or more like a **TODO** for myself.
I should add logic to the `RouterView` so that only one modal ever shows.
Potentially by tracking if there's already a backdrop.

As another **TODO**, it would be nice to see the forms added for creating a new recipe, new box, or adding a recipe to a box.

At some point, I probably ought to make the `RecipeList` and `BoxList` [virtualized](https://material-ui.com/components/lists/#virtualized-list) for performance.

I've just now (it's ~7:50 AM) committed the `BoxDialog`.
So that's another dialog down, and only one dialog to go.
I already committed the `AccountDialog`.

I took a break during the middle of the day, but I've now returned to finish the application.
The time is now roughly 15 minutes to midnight; however, I've just completed the `RecipeDialog` view.
It's not perfect, but done is better than perfect.

The last thing to do is to add some basic content to the `ExploreView`.
I'm not going to connect it to any APIs or have any functionality.
It'll mostly just be something to look at instead of the blank view.

It's now just after midnight and I've added some content to the `ExploreView` and the `ErrorView`, just so they aren't so empty.
Being honest, I'm not terribly happy with how they look; however, I'm going to call them done for tonight.

With that, I'm probably going to call this project done.
At the very least, this phase of the project.

## 2021-03-20

Worked on migrating application to a more monorepo style.
Separating the `client` and `server` as separate folders in the repository.
Each will have their own `package.json` and `.env` file(s).

I've implemented a `config/env.js` file for the `server` to mimic how the [`react-scripts`](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used) work.
With that I've used `dotenv-expand` to allow more complex environment variables if needed or preferred.

The root `package.json` has scripts to run the server and client.
It would be nice to potentially use cross-env in order to set the `NODE_ENV` in the `start` and `dev` scripts.

## 2021-03-22

Created `resource.js` for basic CRUDL functionality and fundamental models yesterday.

Primarily spent today refactoring and creating authentication for the `User` model with [JSON Web Tokens](https://jwt.io/).

Inspired by two videos from WebDevSimplified:

- [Build Node.js User Authentication](https://www.youtube.com/watch?v=Ud5xKCYQTjM&ab_channel=WebDevSimplified)
- [JWT Authentication](https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified)

Additionally, I think a [similar video from DevEd](https://www.youtube.com/watch?v=2jqok-WgelI&ab_channel=DevEd) would also be beneficial.

So far, I believe I've got authentication working.
It needed entirely custom routes, so it couldn't use the `resource` wrapper.
To test the authentication routes, I could use Postman or another tool, so I decided to use the [REST Client VSCode extension by Huachao Mao](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

So far the syntax for writing the request files has been pretty simple and straightforward.

## 2021-03-23

Would like to add [Joi](https://joi.dev/api/) for `req.body` validation.
Right now my APIs just leverage the Mongoose schema, but silently ignore additional data.
Potentially might even use something like [Joigoose](https://github.com/yoitsro/joigoose).

I've now got a successful `seed.js` file to add data to the database and register a user if needed.
Otherwise, I've made a few changes to `resource.js` to provide clarity in the pagination metadata.

I've also update the authentication to properly respond when registering an account with the same email.
With that, for security reasons, I've added an expiration to the JWTs.
I would like to implement a refresh token in addition to the access token; however, that'll have to wait.
For now, I've let the tokens expire after a day.

Now that I've got the API to a point I'm happy with, I need to reintegrate it into my front-end React application.
Originally I wanted to migrate this to Vue, because I wanted to learn more about that; however, that was going to take to much time, and I decided against it too late.
So now I'm late for the RESTful CRUD API; however, I feel I am nearly there.
I just hope it won't take too much to integrate it with the API.

### API Routes

\*All routes are prefixed with `/api`, and expect a `Conten-Type: application/json`.

#### Authentication Routes

| Method   | Route\*          | Description                    |
| -------- | ---------------- | ------------------------------ |
| `POST`   | `/auth/register` | Create Account                 |
| `PATCH`  | `/auth/user`     | Update Account; Requires Token |
| `DELETE` | `/auth/user`     | Delete Account; Requires Token |
| `POST`   | `/auth/login`    | Login and Receive Token        |

#### Recipe Routes

| Method   | Route\*       | Description                    |
| -------- | ------------- | ------------------------------ |
| `POST`   | `/recipe`     | Create Recipe                  |
| `GET`    | `/recipe/:id` | Read/Get One Recipe            |
| `PUT`    | `/recipe/:id` | Update Recipe via Replacement  |
| `PATCH`  | `/recipe/:id` | Update Recipe via Modification |
| `DELETE` | `/recipe/:id` | Delete Recipe                  |
| `GET`    | `/recipe`     | List Recipes _(Paginated)_     |

#### Box Routes

| Method   | Route\*    | Description                 |
| -------- | ---------- | --------------------------- |
| `POST`   | `/box`     | Create Box                  |
| `GET`    | `/box/:id` | Read/Get One Box            |
| `PUT`    | `/box/:id` | Update Box via Replacement  |
| `PATCH`  | `/box/:id` | Update Box via Modification |
| `DELETE` | `/box/:id` | Delete Box                  |
| `GET`    | `/box`     | List Boxes _(Paginated)_    |

### 2021-03-24

After having gone to a few courses today, attended a capstone meeting, and helping out some peers, I finally was able to get back to try and finish this up.

Unfortunately, it's now after midnight.

Thankfully, _(I believe)_ I've now got the application back to a working state.
At least to what it was before having a custom API.

I now need to add forms to the applications to register accounts, create recipes and boxes.

After having slept, I started off the day with work and then decided to pivot to this again in the afternoon.

## 2021-03-27

After a few days struggling to find time to get back to this, I finally found some time during the evening.
It was informative to help out [_Daniel Purrington_](https://github.com/TREX1883) and try to get him rolling with his RESTful API.
I spent a few hours on Thursday just working through it with him.

## 2021-04-04

I have not kept up with this dev log over the past week. I've change a number of things and now feel that I can commit the changes to GitHub.
The forms are not yet connected to sending API requests; however, they get the collect data appropriately.

## 2021-04-08

Spent the late evening adding a number of commits in order to be able to work on the project from another computer over the weekend.

## 2021-04-12

Work on committing weekend progress.
Most of the changes were on 2021-04-09 and 2021-04-10.

## 2021-04-19

To put it simply at this point, I definitely grossly underestimated the amount of refactoring I would do in order to add CRUD functionality to the site.
The API itself was easy to implement.
The front end functionality, not as much, because I tend to abstract a lot when possible.
Regardless, I'm determined to complete this project and realize to myself that it's very uncharacteristic to not have a project done at this point.

Currently, I just refactored my `useAxios` hook to have a `skipRequest` option in the config.
This is used in order to conditionally call a request in the hook since hooks themselves cannot be called conditionally.

Since it's late at night, I'm primarily reviewing and committing my changes.
That way I can focus on progress tomorrow.

## 2021-04-21

I debated adding the ability to `populate` resources based off of any `ref`s in a schema.
This would just go one level deep, but I decided not to.

After working on my Computer Science capstone, I came back and revised the authentication system.
In doing so, I made the resource utility _even more_ useful, because it now supports configurable CRUDL authorization.
Meaning, each of the CRUDL requests can be enabled to be authorized when the `resource` is given a `verifier` in the `authConfig`, along with which CRUDL actions should have an authorization check.

I still need to check to see if I can use that in order to see if the user is the same one that created a resource.
To further add security instead of just requiring a valid token.

## 2021-04-22

Refactored the API to remove the authentication router.
Now the `user` model follows the resource pattern.
The `login` route is now part of the helper controller.
Additionally, routes can now be configured to check that they were `madeBy` the original person who created it, given the right configuration.

With that, I finished documenting my _RESTful API_.
It can be seen in the [`restfulAPI.http`](restfulAPI.http) file.
Additionally, I've added it's content to the start of this file.

So, the only _major_ change is that the API routes for authentication have changed:

| Method   | Route\*  | Description                    |
| -------- | -------- | ------------------------------ |
| `POST`   | `/user`  | Create Account                 |
| `PATCH`  | `/user`  | Update Account; Requires Token |
| `DELETE` | `/user`  | Delete Account; Requires Token |
| `POST`   | `/login` | Login and Receive Token        |

\*Like before, each route is prefixed with `/api`.

Additionally each of the create, update, and delete operations require a `Bearer` token in the `Authorization` header.
Also, the update (modify and replace) and delete operations require that the token be for the `user` that creates the resource.

The `User` resource doesn't require a token to create a user. The `Box` and `Recipe` resources do to create them.

I've also updated the `seed` script to use the new API routes.
I also updated the front end to use the new routes, and fixed some related bugs.

I also extracted the development notes into their own DEVLOG file to clean up README.

---

After a break for classes and work on my Computer Science capstone I've started work again.
The goal for right now is to change the client to use a hash router instead of the current browser router.
This is so that I don't have to worry about any special routing configuration being needed on the web server.

After doing that, the next item is to revise the UI and define how a user will perform the CRUD operations for the `Recipe` and `Box` resources.
It would also be a good idea to allow users to update their info.
These routes already exist, they just need to be connected to the UI.

I came out with a few new components to wrap the styling for the CRUD buttons.
Specifically, `CreateButton`, `EditButton`, and `DeleteButton`.
These all are basically fancy `Fab` buttons that also have a loading/`pending` state.

I spent a good hour or so trying to determine how to refactor my `useAPI`, `useAxios`, etc. to also allow the config options.

I've decided that the config isn't really helpful, other than for skipping a request.
For actions that will not be `GET` requests, I should just call Axios directly.
That'll make code _a lot_ simpler.

## 2021-04-25

Updated the `login` route to use only `POST`.
Recently tried out the package `@simbathesailor/use-what-changed` in order to try and determine where and what might have been causing the infinite loop in `useAxios`.

I would like to add the `Snackbar` based `Alert` to every action.
That way it'd be feedback to the user; however, I feel that'll just be something that's nice to have.

I've spent a good part of today working on integrating the CRUDL actions.
At some point I would like to integrate the pagination, but have decided that'll also fall into the category of _nice to have_; rather, than a _need to have_.

I fought with the Box actions and I could successfully create, update, and delete items; however, the lists weren't repopulating.
Eventually I made use of the `refresh` method from my `useAxios` hook through my `useAPI` hook.
However, that only refreshed the lists relating to all data, and not the user specific content.
So, I refactored the whole application starting from the `RecipeContext` and `BoxContext` in order to add the _user_ data to it, and make it more accessible across the application.

Lastly, I completed the ability to create both recipes and boxes.

## 2021-04-26

I connected the edit and delete buttons to their respective actions for recipes.
With that, I'm glad to say the RESTful interactions are in a completed state.
It would be nice to include a confirmation prompt for deletes, but that's more of a _nice to have_ for users.
It would also be _nice_ to be able to search for recipes when adding them to a box, instead of the dropdown.

It would also be _nice_ to adjust the action buttons so that the used action (edit/delete) becomes _disabled_ instead of _pending_.

I finally got the remaining CRUDL operations done for Recipes.
I'm honestly quite happy with how it works and looks.

Lastly, I prepared the application for deployment.
In doing so, I plan to deploy to Heroku after creating a pull request for the `rest-api` branch.

While working on the deployment, I have various issues.
For example, the way I have my application set up, as a monorepo, I had to add script lifecycle hooks to install the dependencies and then properly run each.
Instead, I decided to look into properly publishing a subtree/subfolder of the monorepo.

For Heroku, deployment wasn't quite as simple as I had hoped.
Instead, I scrapped the existing application, and then updated my deploy script to use a `subtree` instead.
For this, I also needed to remember to set the `JWT_SECRET` and `MONGO_URI` environment variables.
However, I have a specified `HOST` variable as well that defaults to `localhost`.
Unfortunately, this causes Heroku to fail to realize the application has been bound.
So, I had to set this to `0.0.0.0` instead, which really represents the same thing.
Doing so was inspired by multiple searches, ending with [this article](https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error).

For Netlify, this was _really_ easy to do.
I only needed to edit the _build & deploy_ settings and update the _base directory_.
I made sure to set the `REACT_APP_API_URL` to the deployed [Heroku URL](https://vanilla-box.herokuapp.com/api/).
