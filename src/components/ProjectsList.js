import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProjectActions from '../actions/projects';
import { Link } from 'react-router';

class ProjectsList extends React.Component {
  componentDidMount() {
    this.props.actions.findAllProjects()
  }

  render() {
    return (
      <ul className="projects-list clearfix">
        <li className='projects-list-item projects-list-item--new'>
          <Link
            to={`/projects/new`}
            className='projects-list-item-content--new'
          >
            <div className='projects-list-item-content-text'>
              New Project
            </div>
          </Link>
        </li>
        {
          this.props.projects.map((project) => {
            return (
              <li key={project.get('id')} className='projects-list-item projects-list-item--show'>
                <div className='projects-list-item-patch'/>
                <Link
                  to={`/projects/${project.get('id')}/checklists`}
                  className='projects-list-item-content'
                >
                  <div className='projects-list-item-title'>
                    {project.get('title')}
                  </div>
                  <div className='projects-list-item-bottom'>
                    {project.get('checklists').size} checklists
                  </div>
                </Link>
              </li>
            );
          }).toArray()
        }
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProjectActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)
