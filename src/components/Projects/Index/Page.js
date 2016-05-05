import React from 'react';
import { Link } from 'react-router';
import AppPage from 'components/App/Page';
import AppHeaderTitleLink from 'components/App/HeaderTitleLink';

const ProjectsIndexPage = (props) => {
  const { children } = props;
  return (
    <AppPage
      id="projects-index"
      title={[
        <AppHeaderTitleLink key="home" to="/"> Checklist </AppHeaderTitleLink>,
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
        {children}
      </ul>
    </AppPage>
  );
};

ProjectsIndexPage.propTypes = {
  children: React.PropTypes.any.isRequired,
};

export default ProjectsIndexPage;
