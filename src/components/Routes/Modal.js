import React from 'react';
import { Route } from 'react-router';

import ChecklistsDuplicateContainer from 'containers/ChecklistsDuplicateContainer';
import ChecklistsVersionsContainer from 'containers/VersionsIndexContainer';
import VersionsShareContainer from 'containers/VersionsShareContainer';

const RoutesModal = (
  <Route isModal>
    <Route path="projects/:projectId/checklists">
      <Route path=":checklistId/duplicate" component={ChecklistsDuplicateContainer} />
      <Route path=":checklistId/versions" component={ChecklistsVersionsContainer} />
      <Route path=":checklistId/versions/:versionId/share" component={VersionsShareContainer} />
    </Route>
  </Route>
);

export default RoutesModal;
