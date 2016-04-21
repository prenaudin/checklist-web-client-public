import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChecklistsIndexPage from 'components/Checklists/Index/Page';
import ChecklistsIndexItem from 'components/Checklists/Index/Item';
import { getChecklistsByProject } from 'utils/ChecklistsHelpers';
import { findChecklists, deleteChecklist } from 'actions/checklists';
import Project from 'models/Project';

class ChecklistsIndexContainer extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { project, checklists, versions } = this.props;
    return (
      <ChecklistsIndexPage project={project}>
        {
          checklists.map((checklist) => {
            const lastVersionId = checklist.get('lastVersion');
            const lastVersion = versions.get(lastVersionId);
            return (
              <ChecklistsIndexItem
                key={checklist.get('id')}
                project={project}
                checklist={checklist}
                lastVersion={lastVersion}
                onDeleteChecklist={this.props.onDeleteChecklist}
              />
            );
          }).toArray()
        }
      </ChecklistsIndexPage>
    );
  }
}

ChecklistsIndexContainer.propTypes = {
  init: React.PropTypes.func.isRequired,
  project: React.PropTypes.instanceOf(Project).isRequired,
  checklists: React.PropTypes.any.isRequired,
  versions: React.PropTypes.any.isRequired,
  onDeleteChecklist: React.PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { projectId } = ownProps.params;
  const project = state.projects.get(projectId) || new Project({id: projectId});

  const checklists = getChecklistsByProject({
    checklists: state.checklists,
    projectId: projectId,
  });

  return {
    checklists: checklists,
    project: project,
    versions: state.versions,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { projectId } = ownProps.params;
  return {
    init: () => dispatch(findChecklists({ projectId })),
    onDeleteChecklist: ({ checklistId }) => dispatch(deleteChecklist({ projectId, checklistId })),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistsIndexContainer);
