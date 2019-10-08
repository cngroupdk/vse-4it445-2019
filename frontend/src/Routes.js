import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { ExampleOnePage } from './pages/ExampleOnePage';
import { ExampleTwoPage } from './pages/ExampleTwoPage';
import { PageNotFound } from './pages/PageNotFound';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/about" exact component={AboutPage} />
      <Route path="/example1" exact component={ExampleOnePage} />
      <Route path="/example2" exact component={ExampleTwoPage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
