import React from 'react';
import Immutable from 'immutable';
import TextareaAutosize from 'react-textarea-autosize';

class ChecklistsFormTestSuiteItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <label className="checklists-new-label form-group">
        <div className="form-title">
          Story #{this.props.index}
        </div>
        <TextareaAutosize
          className="checklists-new-input form-input form-input--md"
          value={this.props.test.get('title')}
          onChange={this.handleChange}
          placeholder="You can use markdown"
        />
      </label>
    );
  }

  handleChange(e) {
    if (this.props.isLast) {
      this.props.onChangeLastTestTitle(e, this.props.test.get('id'));
    } else {
      this.props.onChangeTestTitle(e, this.props.test.get('id'));
    }
  }
}

ChecklistsFormTestSuiteItem.propTypes = {
  test: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(Immutable.Map),
    React.PropTypes.instanceOf(Immutable.Record),
  ]),
  index: React.PropTypes.number.isRequired,
  isLast: React.PropTypes.bool.isRequired,
  onChangeLastTestTitle: React.PropTypes.func.isRequired,
  onChangeTestTitle: React.PropTypes.func.isRequired,
};

export default ChecklistsFormTestSuiteItem;
