import React from 'react';
import { Router, Route, Redirect, createMemoryHistory } from 'react-router';

import RoutesApp from 'components/Routes/App';
import RoutesPublic from 'components/Routes/Public';
import RoutesRedirectLayout from 'components/Routes/RedirectLayout';

const redirectHistory = createMemoryHistory();

class RoutesModalRedirect extends React.Component {

  static propTypes = {
    onEnterRedirectPage: React.PropTypes.func.isRequired,
    onRedirect: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    redirectHistory.replace(this.props.location.pathname);
  }

  render() {
    return (
      <Router history={redirectHistory}>
        <Route
          onEnter={this.props.onEnterRedirectPage}
          onRedirect={this.props.onRedirect}
          component={RoutesRedirectLayout}
        >
          {RoutesApp}
          {RoutesPublic}
        </Route>
        <Route>
          <Redirect
            from="/projects/:projectId/checklists/:checklistId/duplicate"
            to="/projects/:projectId/checklists"
          />
          <Redirect
            from="/projects/:projectId/checklists/:checklistId/versions"
            to="/projects/:projectId/checklists"
          />
          <Redirect
            from="/projects/:projectId/checklists/:checklistId/versions/:versionId/share"
            to="/projects/:projectId/checklists/:checklistId/versions/:versionId"
          />
        </Route>
      </Router>
    );
  }
}

export default RoutesModalRedirect;
