import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ChecklistsEditPage from 'components/Checklists/Edit/Page';
import { updateChecklist, findChecklist } from 'actions/checklists';
import Project from 'models/Project';
import Checklist from 'models/Checklist';

class ChecklistsEditContainer extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    if ( !this.props.checklist ) { return false; }

    return (
      <ChecklistsEditPage
        project={this.props.project}
        checklist={this.props.checklist}
        onUpdateChecklist={this.props.onUpdateChecklist}
      />
    );
  }
}

ChecklistsEditContainer.propTypes = {
  project: React.PropTypes.instanceOf(Project),
  checklist: React.PropTypes.instanceOf(Checklist),
  init: React.PropTypes.func.isRequired,
  onUpdateChecklist: React.PropTypes.func.isRequired,
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
      const {checklistId, projectId} = ownProps.params;
      dispatch(findChecklist({checklistId, projectId}));
    },

    onUpdateChecklist: (data) => {
      const {checklistId, projectId} = ownProps.params;
      const updateData = _.extend({}, data, {checklistId});
      dispatch(updateChecklist(updateData));
      ownProps.history.pushState(null, `/projects/${projectId}/checklists`);
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistsEditContainer);
