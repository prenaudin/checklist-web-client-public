import React from 'react';
import ChecklistPoll from './ChecklistPoll';
import Immutable from 'immutable';

class ChecklistsRunTestsItem extends React.Component {

  render() {
    let comment = (
      <input
        className="checklists-run-input form-input form-input--md"
        type="text"
        value={this.props.test.comment}
        onChange={this.handleChange.bind(this)}
      />
    );

    if (!this.props.test.get('showComment')) {
      comment = (
        <div
          className="checklists-run-tests-item-add-comment"
          onClick={this.handleClickAddComment.bind(this)}
        >
          + Add a comment
        </div>
      );
    }

    return (
      <div className="checklists-run-tests-item">
        <ChecklistPoll
          status={this.props.test.get('status')}
          onClickItem={this.props.onChangeTestStatus}
        />
        <label className="checklists-run-label">
          <div className="form-title">
            {this.props.test.get('title')}
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
