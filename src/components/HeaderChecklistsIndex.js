import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import HeaderAccount from './HeaderAccount'

class HeaderChecklistsIndex extends React.Component {
  render() {
    const project = this.props.projects.get(this.props.params.projectId)
    let projectTitle
    if (project) {
      projectTitle = project.get('title')
    } else {
      projectTitle = 'Checklists'
    }

    return (
      <div className="header header--checklists-index">
        <div className="header-title header-title--breadcrumbs">
          <Link to='/projects' className='header-breadcrumbs-item'>
            Projects
          </Link>
          <div className='header-breadcrumbs-item'>
            {projectTitle}
          </div>
        </div>
        <HeaderAccount/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps)(HeaderChecklistsIndex)
