import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectsNewPage from 'components/Projects/New/Page';
import { addProject } from 'actions/projects';

class ProjectsNewContainer extends Component {
  render() {
    return (
      <ProjectsNewPage
        onAddProject={this.props.onAddProject}
      />
    );
  }
}

ProjectsNewContainer.propTypes = {
  onAddProject: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onAddProject: (data) => {
      dispatch(addProject(data));
      ownProps.history.pushState(null, '/projects');
    },
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ProjectsNewContainer);
