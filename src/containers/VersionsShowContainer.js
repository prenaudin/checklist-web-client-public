import React, { Component } from 'react';
import { connect } from 'react-redux';

import { findVersion } from 'actions/versions';
import VersionsShowPage from 'components/Versions/Show/Page';
import Checklist from 'models/Checklist';
import Version from 'models/Version';

class VersionsShowContainer extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { projectId, checklist, version } = this.props;
    if (!version) return false;
    return (
      <VersionsShowPage
        projectId={projectId}
        checklist={checklist}
        version={version}
      />
    );
  }
}

VersionsShowContainer.propTypes = {
  init: React.PropTypes.func.isRequired,
  projectId: React.PropTypes.string.isRequired,
  checklist: React.PropTypes.instanceOf(Checklist),
  version: React.PropTypes.instanceOf(Version),
};

function mapStateToProps(state, ownProps) {
  const { projectId, checklistId, versionId } = ownProps.params;
  return {
    projectId,
    checklist: state.checklists.get(checklistId),
    version: state.versions.get(versionId),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { projectId, checklistId, versionId } = ownProps.params;
  return {
    init: () => dispatch(findVersion({ projectId, checklistId, versionId })),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionsShowContainer);
