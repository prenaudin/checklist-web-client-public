import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ChecklistActions from '../actions/checklists';
import ChecklistsForm from './ChecklistsForm';

class ChecklistsNew extends React.Component {

  render() {
    return (
      <ChecklistsForm
        params={this.props.params}
        onClickSave={this.handleClickSave.bind(this)}
      />
    );
  }

  handleClickSave(data) {
    const {projectId} = this.props.params;
    this.props.actions.addChecklist(data);
    this.props.history.pushState(null, `/projects/${projectId}/checklists`);
  }
}

ChecklistsNew.propTypes = {
  params: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChecklistActions, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ChecklistsNew);
