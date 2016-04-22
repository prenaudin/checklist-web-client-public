import React from 'react';
import { Link } from 'react-router';
import AppPage from 'components/App/Page';
import AppHeaderTitleLink from 'components/App/HeaderTitleLink';

class ProjectsIndexPage extends React.Component {

  render() {
    return (
      <AppPage
        id="projects-index"
        title={[
          <AppHeaderTitleLink key="home" to="/"> Checklyst </AppHeaderTitleLink>,
        ]}
      >
        <ul className="projects-list clearfix">
          <li className="projects-list-item projects-list-item--new">
            <Link
              to="/projects/new"
              className="projects-list-item-content--new"
            >
              <div className="projects-list-item-content-text">
                New Project
              </div>
            </Link>
          </li>
          { this.props.children }
        </ul>
      </AppPage>
    );
  }
}

ProjectsIndexPage.propTypes = {
  children: React.PropTypes.any.isRequired,
};

export default ProjectsIndexPage;
