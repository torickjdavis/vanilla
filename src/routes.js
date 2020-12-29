import AccountDialog from './views/AccountDialog';
import BoxView from './views/BoxView';
import ExploreView from './views/ExploreView';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import RecipeView from './views/RecipeView';
import AuthenticationDialog from './views/AuthenticationDialog';

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/explore',
    component: ExploreView,
  },
  {
    path: '/account',
    component: AccountDialog,
    guard: true,
  },
  {
    path: '/profile',
    component: ProfileView,
    guard: true,
  },
  {
    path: '/recipe/:id',
    component: RecipeView,
  },
  {
    path: '/box/:id',
    component: BoxView,
  },
  {
    path: '/authentication',
    component: AuthenticationDialog,
  },
];

export default routes;
