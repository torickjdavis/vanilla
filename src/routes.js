import AccountView from './views/AccountView';
import BoxView from './views/BoxView';
import ExploreView from './views/ExploreView';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import RecipeView from './views/RecipeView';

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
    component: AccountView,
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
];

export default routes;
