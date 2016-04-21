import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChecklistsNewPage from 'components/Checklists/New/Page';
import { addChecklist } from 'actions/checklists';
import Project from 'models/Project';

class ChecklistsNewContainer extends Component {
  render() {
    return (
      <ChecklistsNewPage
        projectId={this.props.projectId}
        project={this.props.project}
        onAddChecklist={this.props.onAddChecklist}
      />
    );
  }
}

ChecklistsNewContainer.propTypes = {
  projectId: React.PropTypes.string.isRequired,
  project: React.PropTypes.instanceOf(Project),
  onAddChecklist: React.PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { projectId } = ownProps.params;
  const project = state.projects.get(projectId);
  return {
    projectId,
    project,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onAddChecklist: (data) => {
      const { projectId } = ownProps.params;
      dispatch(addChecklist(data));
      ownProps.history.pushState(null, `/projects/${projectId}/checklists`);
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistsNewContainer);
