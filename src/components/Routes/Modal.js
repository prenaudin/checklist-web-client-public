import React from 'react';
import { Route } from 'react-router';

import ChecklistsDuplicateContainer from 'containers/ChecklistsDuplicateContainer';
import ChecklistsVersionsContainer from 'containers/VersionsIndexContainer';

const RoutesModal = (
  <Route isModal>
    <Route path="projects/:projectId/checklists">
      <Route path=":checklistId/duplicate" component={ChecklistsDuplicateContainer} />
      <Route path=":checklistId/versions" component={ChecklistsVersionsContainer} />
    </Route>
  </Route>
);

export default RoutesModal;
