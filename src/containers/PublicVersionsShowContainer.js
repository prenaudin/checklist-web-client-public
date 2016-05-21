import React, { Component } from 'react';
import { connect } from 'react-redux';

import { findPublicVersion } from 'actions/versions';
import VersionsShowPage from 'components/Versions/Show/Page';
import Checklist from 'models/Checklist';
import Version from 'models/Version';

class PublicVersionsShowContainer extends Component {
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
        isPublic
      />
    );
  }
}

PublicVersionsShowContainer.propTypes = {
  init: React.PropTypes.func.isRequired,
  projectId: React.PropTypes.string,
  checklist: React.PropTypes.instanceOf(Checklist),
  version: React.PropTypes.instanceOf(Version),
};

function mapStateToProps(state, ownProps) {
  const { versionSlug } = ownProps.params;
  const version = state.versions.find((item) => item.get('publicSlug') === versionSlug);
  if (!version) { return {}; }
  const checklist = state.checklists.find((item) => item.get('id') === version.get('checklist'));
  const projectId = checklist.get('project');
  return {
    projectId,
    version,
    checklist,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { versionSlug } = ownProps.params;
  return {
    init: () => dispatch(findPublicVersion({ versionSlug })),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicVersionsShowContainer);
