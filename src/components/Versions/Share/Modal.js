import React from 'react';

import Modal from 'components/Utils/Modal';
import Checklist from 'models/Checklist';
import Version from 'models/Version';

const VersionsShareModal = (props) => {
  const baseUrl = window.location.origin;
  const publicSlug = props.version.get('publicSlug');
  const publicLink = `${baseUrl}/p/checklists/v/${publicSlug}`;
  return (
    <Modal>
      <div className="versions-share-modal">
        <div className="modal-title">
          Share a link to {props.checklist.get('title')}
          {' - '}
          {props.version.get('title')}
        </div>
        <div className="modal-subtitle">
          View it in any browser or mobile
        </div>

        <div className="form-group">
          <input
            className="form-input"
            readOnly
            value={publicLink}
            type="text"
          />
        </div>

        <p className="text-muted">
          Note: Even people without an account will be able to open
          this Checklist, so choose wisely
        </p>
      </div>
    </Modal>
  );
};

VersionsShareModal.propTypes = {
  version: React.PropTypes.instanceOf(Version).isRequired,
  checklist: React.PropTypes.instanceOf(Checklist).isRequired,
};

export default VersionsShareModal;
