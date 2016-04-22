import React from 'react';
import { Link } from 'react-router';
import AppPage from 'components/App/Page';
import AppHeaderTitleItem from 'components/App/HeaderTitleItem';
import AppHeaderTitleLink from 'components/App/HeaderTitleLink';

class ChecklistsIndexPage extends React.Component {

  render() {
    const { project } = this.props;

    return (
      <AppPage
        id="checklists-index"
        title={[
          <AppHeaderTitleLink key="projects" to="/projects"> Projects </AppHeaderTitleLink>,
          <AppHeaderTitleItem key="project">{ project.get('title') }</AppHeaderTitleItem>,
        ]}
      >
        <h1 className="checklists-index-h1">
          { project.get('title') }
        </h1>
        <ul className="checklists-list">
          <li className="checklists-list-item checklists-list-item--new">
            <Link
              to={`/projects/${project.get('id')}/checklists/new`}
              className="checklists-list-item-content--new"
            >
              <div className="checklists-list-item-content-text">
                New Checklist
              </div>
            </Link>
          </li>
          { this.props.children }
        </ul>
      </AppPage>
    );
  }
}

ChecklistsIndexPage.propTypes = {
  project: React.PropTypes.any.isRequired,
  children: React.PropTypes.any.isRequired,
};

export default ChecklistsIndexPage;
