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
  const { projectId, checklist, version } = props;
  return (
    <AppPage
      id="versions-show"
      title={[
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
      ]}
    >
      <label className="form-group">
        <div className="form-title">
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
          <Link
            className="btn btn-default"
            to={`/projects/${projectId}/checklists/${checklist.get('id')}/share`}
          >
            <Icon id="share" />
            Share
          </Link>
        </FormFooter.Actions>
      </FormFooter>
    </AppPage>
  );
};

VersionsShowPage.propTypes = {
  projectId: React.PropTypes.string.isRequired,
  checklist: React.PropTypes.instanceOf(Checklist).isRequired,
  version: React.PropTypes.instanceOf(Version).isRequired,
};

export default VersionsShowPage;
