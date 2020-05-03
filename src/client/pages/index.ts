import loadable from "@loadable/component";

export const News = loadable(() =>
  import(/* webpackChunkName: "News" */ "./News")
);

export const Home = loadable(() =>
  import(/* webpackChunkName: "Home" */ "./Home")
);
