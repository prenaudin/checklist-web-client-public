import React from 'react'
import ChecklistsList from './ChecklistsList'
import {getChecklistsByProject} from '../utils/ChecklistsHelpers'
import * as ChecklistActions from '../actions/checklists'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ChecklistsIndex extends React.Component {
  componentDidMount() {
    this.props.actions.findChecklists({projectId: this.props.params.projectId})
  }

  render() {
    const checklists = getChecklistsByProject({
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
    actions: bindActionCreators(ChecklistActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistsIndex);
