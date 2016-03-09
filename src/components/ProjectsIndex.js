import React from 'react';
import ProjectsList from './ProjectsList';

class ProjectsIndex extends React.Component {
  render() {
    return (
      <div className="projects-index page">
        <ProjectsList {...this.props}/>
      </div>
    );
  }
}

export default ProjectsIndex;
