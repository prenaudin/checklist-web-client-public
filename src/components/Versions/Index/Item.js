import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import Version from 'models/Version';

const VersionsIndexModal = (props) => {
  const { projectId, checklistId, version } = props;
  return (
    <Link
      className="versions-item"
      to={
        `/projects/${projectId}` +
        `/checklists/${checklistId}` +
        `/versions/${version.get('id')}`
      }
    >
      <div className="versions-item-informations">
        <div className="versions-item-informations-title">
          Version {version.get('title')}
        </div>
        <div className="versions-item-informations-date">
          {moment(version.get('createdAt')).format('DD/MM/YYYY')}
        </div>
      </div>
      <ul className="versions-item-results">
        <li>
          👍 {version.getOkCount()}
        </li>
        <li>
          👎 {version.getNokCount()}
        </li>
        <li>
          💤 {version.getPendingCount()}
        </li>
      </ul>
    </Link>
  );
};

VersionsIndexModal.propTypes = {
  projectId: React.PropTypes.string.isRequired,
  checklistId: React.PropTypes.string.isRequired,
  version: React.PropTypes.instanceOf(Version).isRequired,
};

export default VersionsIndexModal;
