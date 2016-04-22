import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChecklistsRunPage from 'components/Checklists/Run/Page';
import { createVersion, findChecklist } from 'actions/checklists';
import Project from 'models/Project';
import Checklist from 'models/Checklist';

class ChecklistsRunContainer extends Component {
  componentWillMount() {
    this.props.init();
  }

  render() {
    if (!this.props.checklist) { return false; }

    return (
      <ChecklistsRunPage
        checklist={this.props.checklist}
        project={this.props.project}
        onCreateVersion={this.props.onCreateVersion}
      />
    );
  }
}

ChecklistsRunContainer.propTypes = {
  checklist: React.PropTypes.instanceOf(Checklist),
  project: React.PropTypes.instanceOf(Project),
  init: React.PropTypes.func.isRequired,
  onCreateVersion: React.PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { projectId, checklistId } = ownProps.params;
  const project = state.projects.get(projectId);
  const checklist = state.checklists.get(checklistId);
  return {
    project,
    checklist,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    init: () => {
      const { projectId, checklistId } = ownProps.params;
      dispatch(findChecklist({ projectId, checklistId }));
    },

    onCreateVersion: (data) => {
      const { projectId, checklistId } = ownProps.params;
      dispatch(createVersion({ projectId, checklistId, data }));
      ownProps.history.pushState(null, `/projects/${projectId}/checklists`);
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistsRunContainer);
