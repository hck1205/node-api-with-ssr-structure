import React from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { routes } from "lib";

import { Header, Footer } from "components";

export default function App() {
  return (
    <div>
      <Helmet>
        <title>App</title>
      </Helmet>
      <Route path="/" render={() => <Header />} />
      <Switch>
        {routes.map(({ path, page, exact }, i) => (
          <Route
            exact={exact}
            path={path}
            component={page}
            key={`${path}_${i}`}
          />
        ))}
      </Switch>
      <Footer />
    </div>
  );
}
