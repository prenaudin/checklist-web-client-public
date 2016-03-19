import React from 'react';
import ChecklistPollItem from './ChecklistPollItem';

const {
  Component,
  PropTypes,
} = React;

class ChecklistPoll extends Component {

  render() {
    return (
      <div className="checklists-poll">
        <ChecklistPollItem
          label="👍"
          status="ok"
          enabled={this.props.status === 'ok'}
          onClick={() => this.props.onClickItem('ok')}
        />
        <ChecklistPollItem
          label="👎"
          status="nok"
          enabled={this.props.status === 'nok'}
          onClick={() => this.props.onClickItem('nok')}
        />
        <ChecklistPollItem
          label="💤"
          status="pending"
          enabled={this.props.status === 'pending'}
          onClick={() => this.props.onClickItem('pending')}
        />
      </div>
    );
  }

}


ChecklistPoll.propTypes = {
  status: PropTypes.oneOf(['pending', 'nok', 'ok']).isRequired,
  onClickItem: PropTypes.func.isRequired,
};

ChecklistPoll.defaultProps = {
  status: 'pending',
};

export default ChecklistPoll;
