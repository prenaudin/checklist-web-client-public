import React from 'react';
import ChecklistsRunPoll from './Poll';
import Immutable from 'immutable';
import Markdown from 'react-remarkable';

class ChecklistsRunTestsItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickAddComment = this.handleClickAddComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    let comment = (
      <input
        className="checklists-run-input form-input form-input--md"
        type="text"
        value={this.props.test.get('comment')}
        onChange={this.handleChange}
      />
    );

    if (!this.props.test.get('showComment')) {
      comment = (
        <div
          className="checklists-run-tests-item-add-comment"
          onClick={this.handleClickAddComment}
        >
          + Add a comment
        </div>
      );
    }

    return (
      <div className="checklists-run-tests-item">
        <ChecklistsRunPoll
          status={this.props.test.get('status')}
          onClickItem={this.props.onChangeTestStatus}
        />
        <label className="checklists-run-label">
          <div className="checklists-run-tests-item-title form-title">
            <Markdown
              source={this.props.test.get('title') || ''}
            />
          </div>
          {comment}
        </label>
      </div>
    );
  }

  handleChange(e) {
    this.props.onChangeTestComment(e, this.props.test.id);
  }

  handleClickAddComment(e) {
    this.props.onShowTestComment(e, this.props.test.id);
  }
}

ChecklistsRunTestsItem.propTypes = {
  test: React.PropTypes.instanceOf(Immutable.Record),
  onChangeTestStatus: React.PropTypes.func.isRequired,
  onChangeTestComment: React.PropTypes.func.isRequired,
  onShowTestComment: React.PropTypes.func.isRequired,
};

export default ChecklistsRunTestsItem;
