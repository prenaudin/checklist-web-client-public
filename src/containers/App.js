import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as ProjectActions from '../actions/projects'
import * as AccountActions from '../actions/account'
import * as ChecklistActions from '../actions/checklists'

class App extends Component {
  componentDidMount() {
    this.props.actions.validateToken();
  }

  render() {
    return (
      <div className="app">
        {this.props.header || <Header {...this.props}/>}
        {this.props.content || this.props.children}
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  projects: PropTypes.instanceOf(Immutable.Map).isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    projects: state.projects,
    checklists: state.checklists,
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
