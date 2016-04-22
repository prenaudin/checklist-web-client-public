import React from 'react';

import Project from 'models/Project';

import AppPage from 'components/App/Page';
import AppHeaderTitleLink from 'components/App/HeaderTitleLink';
import AppHeaderTitleItem from 'components/App/HeaderTitleItem';
import ChecklistsForm from 'components/Checklists/Form';

class ChecklistsNewPage extends React.Component {
  render() {
    const { project, projectId } = this.props;
    return (
      <AppPage
        id="checklists-new"
        title={[
          <AppHeaderTitleLink key="projects" to="/projects"> Projects </AppHeaderTitleLink>,
          <AppHeaderTitleLink key="checklist" to={`/projects/${projectId}/checklists`}>
            { project ? project.get('title') : 'Project' }
          </AppHeaderTitleLink>,
          <AppHeaderTitleItem key="new"> New Checklist </AppHeaderTitleItem>,
        ]}
      >
        <ChecklistsForm
          projectId={projectId}
          onClickSave={this.props.onAddChecklist}
        />
      </AppPage>
    );
  }
}

ChecklistsNewPage.propTypes = {
  projectId: React.PropTypes.string.isRequired,
  project: React.PropTypes.instanceOf(Project),
  onAddChecklist: React.PropTypes.func.isRequired,
};

export default ChecklistsNewPage;
