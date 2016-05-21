import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import Checklist from 'models/Checklist';
import Version from 'models/Version';

import AppPage from 'components/App/Page';
import AppHeaderTitleLink from 'components/App/HeaderTitleLink';
import AppHeaderTitleItem from 'components/App/HeaderTitleItem';
import FormFooter from 'components/Utils/FormFooter';
import TestsResultsItem from 'components/Tests/Results/Item';
import Icon from 'components/Utils/Icon';

const VersionsShowPage = (props) => {
  const { projectId, checklist, version, isPublic } = props;
  const checklistId = checklist.get('id');
  const versionId = version.get('id');
  let title = false;
  let actions = false;

  if (!isPublic) {
    title = [
      <AppHeaderTitleLink key="projects" to="/projects">
        Projects
      </AppHeaderTitleLink>,
      <AppHeaderTitleLink
        key="checklists"
        to={`/projects/${projectId}/checklists`}
      >
        {checklist.get('title')}
      </AppHeaderTitleLink>,
      <AppHeaderTitleLink
        key="versions"
        to={`/projects/${projectId}/checklists/${checklist.get('id')}/versions`}
      >
        Versions
      </AppHeaderTitleLink>,
      <AppHeaderTitleItem key="version">
        {version.get('title')}
      </AppHeaderTitleItem>,
    ];
  }

  if (isPublic) {
    actions = (
      <Link
        className="btn btn-default"
        to={`/projects/${projectId}/checklists/${checklistId}/versions/${versionId}/copy`}
      >
        <Icon id="duplicate" />
        Copy
      </Link>
    );
  } else {
    actions = (
      <Link
        className="btn btn-default"
        to={`/projects/${projectId}/checklists/${checklistId}/versions/${versionId}/share`}
      >
        <Icon id="share" />
        Share
      </Link>
    );
  }

  return (
    <AppPage
      id="versions-show"
      title={title}
      isPublic={isPublic}
    >
      <label className="form-group">
        <div className="form-title page-title">
          {checklist.get('title')}
        </div>

        <div className="form-description">
          {version.get('title')}
          {' • '}
          {moment(version.get('createdAt')).format('DD/MM/YYYY')}
        </div>

        <div className="form-description">
          {checklist.get('description')}
        </div>
      </label>

      {
        version.get('tests')
          .map((test, index) => <TestsResultsItem key={index} test={test} />)
          .toArray()
      }

      <FormFooter>
        <FormFooter.Resume
          type="ok"
          count={version.getOkCount()}
        />
        <FormFooter.Resume
          type="nok"
          count={version.getNokCount()}
        />
        <FormFooter.Resume
          type="pending"
          count={version.getPendingCount()}
        />
        <FormFooter.Actions>
          {actions}
        </FormFooter.Actions>
      </FormFooter>
    </AppPage>
  );
};

VersionsShowPage.propTypes = {
  projectId: React.PropTypes.string.isRequired,
  checklist: React.PropTypes.instanceOf(Checklist).isRequired,
  version: React.PropTypes.instanceOf(Version).isRequired,
  isPublic: React.PropTypes.bool.isRequired,
};

export default VersionsShowPage;
