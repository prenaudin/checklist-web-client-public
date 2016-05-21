import React, { Component } from 'react';
import { connect } from 'react-redux';

import VersionsShareModal from 'components/Versions/Share/Modal';
import { findVersion, shareVersion } from 'actions/versions';
import Checklist from 'models/Checklist';
import Version from 'models/Version';

class VersionsShareContainer extends Component {
  componentDidMount() {
    this.props.onInit();
  }

  componentDidUpdate() {
    if (this.props.version && !this.props.version.isPublic()) {
      this.props.onShare();
    }
  }

  render() {
    const { checklist, version } = this.props;
    if (!version || !checklist) return false;
    if (!version.isPublic()) return false;
    return (
      <VersionsShareModal
        checklist={checklist}
        version={version}
      />
    );
  }
}

VersionsShareContainer.propTypes = {
  onInit: React.PropTypes.func.isRequired,
  onShare: React.PropTypes.func.isRequired,
  checklist: React.PropTypes.instanceOf(Checklist),
  version: React.PropTypes.instanceOf(Version),
};

function mapStateToProps(state, ownProps) {
  const { checklistId, versionId } = ownProps.params;
  const checklist = state.checklists.get(checklistId);
  const version = state.versions.get(versionId);

  return {
    checklist,
    version,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { projectId, checklistId, versionId } = ownProps.params;
  return {
    onInit: () => {
      dispatch(findVersion({ projectId, checklistId, versionId }));
    },
    onShare: () => {
      dispatch(shareVersion({ projectId, checklistId, versionId }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionsShareContainer);
