import React from 'react';
import { Route, Redirect } from 'react-router';

import Home from 'components/Home';
import AuthSignupContainer from 'containers/AuthSignupContainer';
import AuthSigninContainer from 'containers/AuthSigninContainer';
import PublicVersionsShowContainer from 'containers/PublicVersionsShowContainer';

const RoutesApp = (
  <Route isPage>
    <Route path="home" component={Home} />
    <Route path="signup" component={AuthSignupContainer} />
    <Route path="signin" component={AuthSigninContainer} />
    <Route path="p/checklists/v/:versionSlug" component={PublicVersionsShowContainer} />
    <Redirect from="/" to="/home" />
  </Route>
);

export default RoutesApp;
