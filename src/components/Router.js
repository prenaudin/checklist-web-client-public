import React, { Component } from 'react';
import history from '../config/history';
import { Router, Route, IndexRoute, Redirect } from 'react-router';

import Home from './Home';

import AuthSignupContainer from 'containers/AuthSignupContainer';
import AuthSigninContainer from 'containers/AuthSigninContainer';

import App from 'containers/App';
import ProjectsIndexContainer from 'containers/ProjectsIndexContainer';
import ProjectsNewContainer from 'containers/ProjectsNewContainer';
import ProfileContainer from 'containers/ProfileContainer';
import ChecklistsIndexContainer from 'containers/ChecklistsIndexContainer';
import ChecklistsNewContainer from 'containers/ChecklistsNewContainer';
import ChecklistsEditContainer from 'containers/ChecklistsEditContainer';
import ChecklistsRunContainer from 'containers/ChecklistsRunContainer';

class AppRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="home" component={Home}/>
        <Route path="signup" component={AuthSignupContainer}/>
        <Route path="signin" component={AuthSigninContainer}/>

        <Route component={App}>
          <Route path="profile" component={ProfileContainer}/>

          <Route path="projects">
            <IndexRoute component={ProjectsIndexContainer}/>
            <Route path="new" component={ProjectsNewContainer}/>
          </Route>

          <Route path="projects/:projectId/checklists">
            <IndexRoute component={ChecklistsIndexContainer}/>
            <Route path="new" component={ChecklistsNewContainer}/>
            <Route path=":checklistId/edit" component={ChecklistsEditContainer}/>
            <Route path=":checklistId/run" component={ChecklistsRunContainer}/>
          </Route>

          <Redirect from="/" to="/home"/>
        </Route>
      </Router>
    );
  }
}

export default AppRouter;
