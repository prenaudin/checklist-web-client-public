import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import VersionsIndexModal from 'components/Versions/Index/Modal';
import VersionsIndexItem from 'components/Versions/Index/Item';
import { findVersions } from 'actions/versions';
import { getVersionsByChecklist } from 'utils/VersionsHelpers';
import Checklist from 'models/Checklist';

class VersionsIndexContainer extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const { projectId, checklistId, checklist, versions } = this.props;
    return (
      <VersionsIndexModal checklist={checklist}>
        {
          versions
            .sort((version) => moment(version.get('createdAt')).unix())
            .map((version) => (
              <VersionsIndexItem
                key={version.get('id')}
                projectId={projectId}
                checklistId={checklistId}
                version={version}
              />
            ))
            .toArray()
        }
      </VersionsIndexModal>
    );
  }
}

VersionsIndexContainer.propTypes = {
  init: React.PropTypes.func.isRequired,
  projectId: React.PropTypes.string.isRequired,
  checklistId: React.PropTypes.string.isRequired,
  checklist: React.PropTypes.any.isRequired,
  versions: React.PropTypes.any.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { projectId, checklistId } = ownProps.params;
  const checklist = state.checklists.get(checklistId) || new Checklist({ id: checklistId });

  const versions = getVersionsByChecklist({
    versions: state.versions,
    checklistId,
  });

  return {
    projectId,
    checklistId,
    checklist,
    versions,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { projectId, checklistId } = ownProps.params;
  return {
    init: () => dispatch(findVersions({ projectId, checklistId })),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionsIndexContainer);
