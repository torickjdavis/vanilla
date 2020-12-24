import AccountDialog from './views/AccountDialog';
import BoxView from './views/BoxView';
import ExploreView from './views/ExploreView';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import RecipeView from './views/RecipeView';
import LoginDialog from './views/LoginDialog';

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
  },
  {
    path: '/profile',
    component: ProfileView,
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
    path: '/login',
    component: LoginDialog,
  },
];

export default routes;
