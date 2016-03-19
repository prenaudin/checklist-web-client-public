import React from 'react'
import ChecklistsList from './ChecklistsList'
import ChecklistsHelpers from '../utils/ChecklistsHelpers'
import * as ProjectActions from '../actions/projects'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ChecklistsIndex extends React.Component {
  componentDidMount() {
    this.props.actions.findProject({projectId: this.props.params.projectId})
  }

  render() {
    const checklists = ChecklistsHelpers.getChecklistsByProject({
      checklists: this.props.checklists,
      projectId: this.props.params.projectId
    });

    const project = this.props.projects.get(this.props.params.projectId);
    let projectTitle = project ? project.get('title') : '';

    return (
      <div className="checklists-index page">
        <h1 className='checklists-index-h1'>
          {projectTitle}
        </h1>
        <ChecklistsList
          projectId={this.props.params.projectId}
          checklists={checklists}
          versions={this.props.versions}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    checklists: state.checklists,
    projects: state.projects,
    versions: state.versions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProjectActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistsIndex);
