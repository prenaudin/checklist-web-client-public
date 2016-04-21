import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import * as AccountActions from '../actions/account';

class App extends Component {
  componentDidMount() {
    this.props.actions.validateToken();
  }

  render() {
    if (!this.props.account.get('isSignedIn')) {
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
  account: PropTypes.instanceOf(Immutable.Record).isRequired,
  actions: PropTypes.object.isRequired,
  content: PropTypes.object,
  header: PropTypes.object,
  children: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    projects: state.projects,
    checklists: state.checklists,
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccountActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
