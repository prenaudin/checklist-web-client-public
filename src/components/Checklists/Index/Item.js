import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import Icon from 'components/Utils/Icon';
import Version from 'models/Version';

class ChecklistsIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickOptions = this.handleClickOptions.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
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
    const { lastVersion, checklist } = this.props;

    let lastVersionContent = <span className="checklists-list-item-subtitle">No version yet</span>;
    if (lastVersion) {
      lastVersionContent = (
        <Link
          className="checklists-list-item-subtitle"
          to={`/projects/${checklist.get('project')}/checklists/${checklist.get('id')}/versions`}
        >
          Version {lastVersion.get('title')}
          {' • '}
          {moment(lastVersion.get('updatedAt')).format('DD/MM/YY')}
        </Link>
      );
    }

    return (
      <div className="checklists-list-item--default">
        <div
          className="checklists-list-item-show-options"
          onClick={this.handleClickOptions}
        >
          <span className="checklists-list-item-show-options-content">
            Options
          </span>
          <Icon id="options" />
        </div>

        <div className="checklists-list-item-title">
          {checklist.get('title')}
        </div>
        {lastVersionContent}
        <div className="checklists-list-item-counters">
          <div className="checklists-list-item-counters-list clearfix">
            <div className="checklists-list-item-counters-item">
              <div className="checklists-list-item-counters-item-count">
                {lastVersion ? lastVersion.getOkCount() : '-'}
              </div>
              <div className="checklists-list-item-counters-item-label">
                👍
              </div>
            </div>
            <div className="checklists-list-item-counters-item">
              <div className="checklists-list-item-counters-item-count">
                {lastVersion ? lastVersion.getNokCount() : '-'}
              </div>
              <div className="checklists-list-item-counters-item-label">
                👎
              </div>
            </div>
            <div className="checklists-list-item-counters-item">
              <div className="checklists-list-item-counters-item-count">
                {lastVersion ? lastVersion.getPendingCount() : '-'}
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
          onClick={this.handleClickClose}
        >
          <Icon id="close" />
        </div>
        <div className="checklists-list-item-actions">
          <Link
            className="checklists-list-item-actions-item"
            to={`/projects/${checklist.get('project')}/checklists/${checklist.get('id')}/share`}
          >
            <Icon id="share" />
            Share
          </Link>
          <Link
            className="checklists-list-item-actions-item"
            to={`/projects/${checklist.get('project')}/checklists/${checklist.get('id')}/edit`}
          >
            <Icon id="edit" />
            Edit
          </Link>
          <Link
            className="checklists-list-item-actions-item"
            to={`/projects/${checklist.get('project')}/checklists/${checklist.get('id')}/duplicate`}
          >
            <Icon id="duplicate" />
            Duplicate
          </Link>
          <div
            className="checklists-list-item-actions-item"
            onClick={this.handleClickDelete}
          >
            <Icon id="delete" />
            Delete
          </div>
        </div>
      </div>
    );
  }

  handleClickOptions() {
    this.setState({ showOptions: true });
  }

  handleClickClose() {
    this.setState({ showOptions: false });
  }

  handleClickDelete() {
    this.props.onDeleteChecklist({
      checklistId: this.props.checklist.get('id'),
    });
  }
}

ChecklistsIndexItem.propTypes = {
  checklist: React.PropTypes.any.isRequired,
  lastVersion: React.PropTypes.instanceOf(Version),
  onDeleteChecklist: React.PropTypes.func.isRequired,
};

export default ChecklistsIndexItem;
