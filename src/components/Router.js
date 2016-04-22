import React, { Component } from 'react';
import history from '../config/history';
import {Router, Route, Redirect} from 'react-router';

import Home from './Home';

import AuthSignup from './Auth/Signup';
import AuthSignin from './Auth/Signin';

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
        <Route path="signup" component={AuthSignup}/>
        <Route path="signin" component={AuthSignin}/>
        <Route component={App}>
          <Route path="profile" component={ProfileContainer}/>
          <Route path="projects" component={ProjectsIndexContainer}/>
          <Route
            path="projects/new"
            component={ProjectsNewContainer}
          />
          <Route
            path="projects/:projectId/checklists"
            component={ChecklistsIndexContainer}
          />
          <Route
            path="projects/:projectId/checklists/new"
            component={ChecklistsNewContainer}
          />
          <Route
            path="projects/:projectId/checklists/:checklistId/edit"
            component={ChecklistsEditContainer}
          />
          <Route
            path="projects/:projectId/checklists/:checklistId/run"
            component={ChecklistsRunContainer}
          />
          <Redirect from="/" to="/home"/>
        </Route>
      </Router>
    );
  }
}

export default AppRouter;
