import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import Icon from './Icon';
import * as ChecklistActions from '../actions/checklists';
import VersionMap from 'models/VersionMap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ChecklistsListItem extends React.Component {

  constructor() {
    super();

    this.state = {
      showOptions: false,
    };
  }

  render() {
    let content;
    if (this.state.showOptions) {
      content = this.renderOptions();
    } else {
      content = this.renderDefault();
    }

    return (
      <li className="checklists-list-item checklists-list-item--show">
        {content}
      </li>
    );
  }

  renderDefault() {
    const checklist = this.props.checklist;
    const lastVersionId = this.props.checklist.get('lastVersion');
    const lastVersion = this.props.versions.get(lastVersionId);

    let lastVersionContent = <span>No version yet</span>;
    if (lastVersion) {
      lastVersionContent = (
        <span>
          Version { lastVersion.get('title') }
          { ' • ' }
          { moment(lastVersion.get('updatedAt')).format('DD/MM/YY') }
        </span>
      );
    }

    return (
      <div className="checklists-list-item--default">
        <div
          className="checklists-list-item-show-options"
          onClick={this.handleClickOptions.bind(this)}
        >
          <span className="checklists-list-item-show-options-content">
            Options
          </span>
          <Icon id="options"/>
        </div>

        <div className="checklists-list-item-title">
          {checklist.get('title')}
        </div>
        <div className="checklists-list-item-subtitle">
          {lastVersionContent}
        </div>
        <div className="checklists-list-item-counters">
          <div className="checklists-list-item-counters-list clearfix">
            <div className="checklists-list-item-counters-item">
              <div className="checklists-list-item-counters-item-count">
                { lastVersion ? lastVersion.getOkCount() : '-' }
              </div>
              <div className="checklists-list-item-counters-item-label">
                👍
              </div>
            </div>
            <div className="checklists-list-item-counters-item">
              <div className="checklists-list-item-counters-item-count">
                { lastVersion ? lastVersion.getNokCount() : '-' }
              </div>
              <div className="checklists-list-item-counters-item-label">
                👎
              </div>
            </div>
            <div className="checklists-list-item-counters-item">
              <div className="checklists-list-item-counters-item-count">
                { lastVersion ? lastVersion.getPendingCount() : '-' }
              </div>
              <div className="checklists-list-item-counters-item-label">
                💤
              </div>
            </div>
          </div>
          <Link
            to={`/projects/${checklist.get('project')}/checklists/${checklist.get('id')}/run`}
            className="checklists-list-item-counters-btn btn btn-primary"
          >
            New test
          </Link>
        </div>
      </div>
    );
  }

  renderOptions() {
    const checklist = this.props.checklist;
    return (
      <div className="checklists-list-item--options">
        <div
          className="checklists-list-item-close-options"
          onClick={this.handleClickClose.bind(this)}
        >
          <Icon id="close"/>
        </div>
        <div className="checklists-list-item-actions">
          <Link
            className="checklists-list-item-actions-item"
            to={`/projects/${checklist.get('project')}/checklists/${checklist.get('id')}/share`}
          >
            <Icon id="share"/>
            Share
          </Link>
          <Link
            className="checklists-list-item-actions-item"
            to={`/projects/${checklist.get('project')}/checklists/${checklist.get('id')}/edit`}
          >
            <Icon id="edit"/>
            Edit
          </Link>
          <Link
            className="checklists-list-item-actions-item"
            to={`/projects/${checklist.get('project')}/checklists/${checklist.get('id')}/duplicate`}
          >
            <Icon id="duplicate"/>
            Duplicate
          </Link>
          <div
            className="checklists-list-item-actions-item"
            onClick={this.handleClickDelete.bind(this)}
          >
            <Icon id="delete"/>
            Delete
          </div>
        </div>
      </div>
    );
  }

  handleClickOptions() {
    this.setState({showOptions: true});
  }

  handleClickClose() {
    this.setState({showOptions: false});
  }

  handleClickDelete() {
    this.props.actions.deleteChecklist({
      projectId: this.props.checklist.get('project'),
      checklistId: this.props.checklist.get('id'),
    });
  }
}

ChecklistsListItem.propTypes = {
  checklist: React.PropTypes.any.isRequired,
  actions: React.PropTypes.object.isRequired,
  versions: React.PropTypes.instanceOf(VersionMap).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChecklistActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(ChecklistsListItem);
