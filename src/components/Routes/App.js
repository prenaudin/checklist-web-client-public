import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import ProjectsIndexContainer from 'containers/ProjectsIndexContainer';
import ProjectsNewContainer from 'containers/ProjectsNewContainer';
import ProfileContainer from 'containers/ProfileContainer';
import ChecklistsIndexContainer from 'containers/ChecklistsIndexContainer';
import ChecklistsNewContainer from 'containers/ChecklistsNewContainer';
import ChecklistsEditContainer from 'containers/ChecklistsEditContainer';
import ChecklistsRunContainer from 'containers/ChecklistsRunContainer';

const RoutesApp = (
  <Route isPage component={App}>
    <Route path="profile" component={ProfileContainer} />

    <Route path="projects">
      <IndexRoute component={ProjectsIndexContainer} />
      <Route path="new" component={ProjectsNewContainer} />
    </Route>

    <Route path="projects/:projectId/checklists">
      <IndexRoute component={ChecklistsIndexContainer} />
      <Route path="new" component={ChecklistsNewContainer} />
      <Route path=":checklistId/edit" component={ChecklistsEditContainer} />
      <Route path=":checklistId/run" component={ChecklistsRunContainer} />
    </Route>
  </Route>
);

export default RoutesApp;
