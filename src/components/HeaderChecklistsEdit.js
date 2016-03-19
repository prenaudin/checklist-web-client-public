import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import HeaderAccount from './HeaderAccount';
import Immutable from 'immutable';

class HeaderChecklistsEdit extends React.Component {
  render() {
    const {projectId} = this.props.params;
    const project = this.props.projects.get(projectId);

    let projectTitle;
    if (project) {
      projectTitle = project.get('title');
    } else {
      projectTitle = 'Checklists';
    }

    return (
      <div className="header header--checklists-index">
        <div className="header-title header-title--breadcrumbs">
          <Link to="/projects" className="header-breadcrumbs-item">
            Projects
          </Link>
          <Link to={`/projects/${projectId}/checklists`} className="header-breadcrumbs-item">
            {projectTitle}
          </Link>
          <div className="header-breadcrumbs-item">
            Edit Checklist
          </div>
        </div>
        <HeaderAccount/>
      </div>
    );
  }
}

HeaderChecklistsEdit.propTypes = {
  params: React.PropTypes.object.isRequired,
  projects: React.PropTypes.instanceOf(Immutable.Map).isRequired,
};

function mapStateToProps(state) {
  return {
    projects: state.projects,
  };
}

export default connect(mapStateToProps)(HeaderChecklistsEdit);
