import React from 'react';
import ChecklistsRunPollItem from './PollItem';

const {
  Component,
  PropTypes,
} = React;

class ChecklistsRunPoll extends Component {

  render() {
    return (
      <div className="checklists-poll">
        <ChecklistsRunPollItem
          label="👍"
          status="ok"
          enabled={this.props.status === 'ok'}
          onClick={() => this.props.onClickItem('ok')}
        />
        <ChecklistsRunPollItem
          label="👎"
          status="nok"
          enabled={this.props.status === 'nok'}
          onClick={() => this.props.onClickItem('nok')}
        />
        <ChecklistsRunPollItem
          label="💤"
          status="pending"
          enabled={this.props.status === 'pending'}
          onClick={() => this.props.onClickItem('pending')}
        />
      </div>
    );
  }

}


ChecklistsRunPoll.propTypes = {
  status: PropTypes.oneOf(['pending', 'nok', 'ok']).isRequired,
  onClickItem: PropTypes.func.isRequired,
};

ChecklistsRunPoll.defaultProps = {
  status: 'pending',
};

export default ChecklistsRunPoll;
