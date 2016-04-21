import React, { Component } from 'react';
import history from '../config/history';
import {Router, Route, Redirect} from 'react-router';
import App from '../containers/App';

import Home from './Home';

import ProjectsIndexContainer from 'containers/ProjectsIndexContainer';

import AuthSignup from './Auth/Signup';
import AuthSignin from './Auth/Signin';

import Profile from './Profile';

import ProjectsNewContainer from 'containers/ProjectsNewContainer';
import ChecklistsIndexContainer from 'containers/ChecklistsIndexContainer';

import ChecklistsNew from './ChecklistsNew';
import HeaderChecklistsNew from './HeaderChecklistsNew';

import ChecklistsEdit from './ChecklistsEdit';
import HeaderChecklistsEdit from './HeaderChecklistsEdit';

import ChecklistsRun from './ChecklistsRun';
import HeaderChecklistsRun from './HeaderChecklistsRun';

class AppRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="home" component={Home}/>
        <Route path="signup" component={AuthSignup}/>
        <Route path="signin" component={AuthSignin}/>
        <Route component={App}>
          <Route path="profile" component={Profile}/>
          <Route path="projects" component={ProjectsIndexContainer}/>
          <Route
            path="projects/new"
            component={ProjectsNewContainer}
          />
          <Route
            path="projects/:projectId/checklists"
            components={ChecklistsIndexContainer}
          />
          <Route
            path="projects/:projectId/checklists/new"
            components={{ content: ChecklistsNew, header: HeaderChecklistsNew }}
          />
          <Route
            path="projects/:projectId/checklists/:checklistId/edit"
            components={{ content: ChecklistsEdit, header: HeaderChecklistsEdit }}
          />
          <Route
            path="projects/:projectId/checklists/:checklistId/run"
            components={{ content: ChecklistsRun, header: HeaderChecklistsRun }}
          />
          <Redirect from="/" to="/home"/>
        </Route>
      </Router>
    );
  }
}

export default AppRouter;
