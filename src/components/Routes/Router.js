import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import RoutesComposer from 'components/Routes/Composer';
import RoutesApp from 'components/Routes/App';
import RoutesPublic from 'components/Routes/Public';
import RoutesModal from 'components/Routes/Modal';

const RoutesRouter = () => (
  <Router history={browserHistory}>
    <Route component={RoutesComposer}>
      {RoutesApp}
      {RoutesPublic}
      {RoutesModal}
    </Route>
  </Router>
);

export default RoutesRouter;
