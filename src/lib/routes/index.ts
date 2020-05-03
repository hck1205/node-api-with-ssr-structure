import { Home, News } from 'pages';

const routes = [
  {
    path: ['/'],
    page: Home,
    exact: true,
  },
  {
    path: ['/news'],
    page: News,
    exact: false,
  },
];

export default routes;
