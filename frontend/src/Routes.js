import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AboutPage } from './pages/AboutPage';
import { ExampleOnePage } from './pages/ExampleOnePage';
import { ExampleTwoPage } from './pages/ExampleTwoPage';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/auth/signin" exact component={SignInPage} />
      <Route path="/auth/signup" exact component={SignUpPage} />
      <Route path="/about" exact component={AboutPage} />
      <Route path="/example1" exact component={ExampleOnePage} />
      <Route path="/example2" exact component={ExampleTwoPage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
