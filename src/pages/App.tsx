import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Home } from './Home';
import { News } from './News';
import { Header, Footer } from '../components';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>App</title>
        </Helmet>
        <Route path="/" render={() => <Header />} />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/news" render={() => <News />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default App;
