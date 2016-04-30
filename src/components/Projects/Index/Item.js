import React from 'react';
import { Link } from 'react-router';
import Project from 'models/Project';

const ProjectsItem = (props) => {
  const { project } = props;
  return (
    <li key={project.get('id')} className="projects-list-item projects-list-item--show">
      <div className="projects-list-item-patch" />
      <Link
        to={`/projects/${project.get('id')}/checklists`}
        className="projects-list-item-content"
      >
        <div className="projects-list-item-title">
          {project.get('title')}
        </div>
        <div className="projects-list-item-bottom">
          {project.get('checklists').size} checklists
        </div>
      </Link>
    </li>
  );
};

ProjectsItem.propTypes = {
  project: React.PropTypes.instanceOf(Project).isRequired,
};

export default ProjectsItem;
