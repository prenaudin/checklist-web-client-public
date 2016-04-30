import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectsIndexPage from 'components/Projects/Index/Page';
import ProjectsIndexItem from 'components/Projects/Index/Item';
import { findAllProjects } from 'actions/projects';
import ProjectMap from 'models/ProjectMap';

class ProjectsIndexContainer extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { projects } = this.props;
    return (
      <ProjectsIndexPage>
        {
          projects.map((project) => (
            <ProjectsIndexItem
              key={project.get('id')}
              project={project}
            />
          )).toArray()
        }
      </ProjectsIndexPage>
    );
  }
}

ProjectsIndexContainer.propTypes = {
  init: React.PropTypes.func.isRequired,
  projects: React.PropTypes.instanceOf(ProjectMap).isRequired,
};

function mapStateToProps(state) {
  return {
    projects: state.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(findAllProjects()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsIndexContainer);
