import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import User from 'models/User';
import * as AuthActions from '../actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.actions.validateToken();
  }

  render() {
    if (!this.props.user.get('isSignedIn')) {
      return false;
    }

    return (
      <div className="app">
        {this.props.header || false}
        {this.props.content || this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  projects: PropTypes.instanceOf(Immutable.Map).isRequired,
  user: PropTypes.instanceOf(User).isRequired,
  actions: PropTypes.object.isRequired,
  content: PropTypes.object,
  header: PropTypes.object,
  children: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    projects: state.projects,
    checklists: state.checklists,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
