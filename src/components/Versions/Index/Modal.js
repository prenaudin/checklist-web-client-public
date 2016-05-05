import React from 'react';
import Modal from 'components/Utils/Modal';
import Checklist from 'models/Checklist';

const VersionsIndexModal = (props) => (
  <Modal>
    <div className="versions-index-modal">
      <div className="modal-title">{props.checklist.get('title')}</div>
      <div className="modal-subtitle">Versions</div>
      {props.children}
    </div>
  </Modal>
);

VersionsIndexModal.propTypes = {
  children: React.PropTypes.node.isRequired,
  checklist: React.PropTypes.instanceOf(Checklist).isRequired,
};

export default VersionsIndexModal;
