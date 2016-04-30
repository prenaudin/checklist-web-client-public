import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';

import Project from 'models/Project';
import Checklist from 'models/Checklist';

import AppPage from 'components/App/Page';
import AppHeaderTitleLink from 'components/App/HeaderTitleLink';
import AppHeaderTitleItem from 'components/App/HeaderTitleItem';
import ChecklistsForm from 'components/Checklists/Form';

const serializeTestSuiteToEditable = (checklist) =>
  checklist.get('testSuite')
    .map((testTitle) =>
      Immutable.Map()
        .set('id', _.uniqueId('testSuiteRecordId'))
        .set('title', testTitle)
    )
    .toMap()
    .mapKeys((key, test) => test.get('id'));

const ChecklistsEditPage = (props) => {
  const { project, checklist, onUpdateChecklist } = props;
  return (
    <AppPage
      id="checklists-edit"
      title={[
        <AppHeaderTitleLink key="projects" to="/projects"> Projects </AppHeaderTitleLink>,
        <AppHeaderTitleLink key="checklist" to={`/projects/${project.get('id')}/checklists`}>
          {project.get('title')}
        </AppHeaderTitleLink>,
        <AppHeaderTitleItem key="new"> Edit Checklist </AppHeaderTitleItem>,
      ]}
    >
      <ChecklistsForm
        projectId={project.get('id')}
        title={checklist.get('title')}
        testSuite={serializeTestSuiteToEditable(checklist)}
        onClickSave={onUpdateChecklist}
      />
    </AppPage>
  );
};

ChecklistsEditPage.propTypes = {
  project: React.PropTypes.instanceOf(Project).isRequired,
  checklist: React.PropTypes.instanceOf(Checklist).isRequired,
  onUpdateChecklist: React.PropTypes.func.isRequired,
};

export default ChecklistsEditPage;
