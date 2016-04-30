import React from 'react';
import ChecklistsRunPollItem from './PollItem';

const {
  PropTypes,
} = React;

const ChecklistsRunPoll = (props) => {
  const { status, onClickItem } = props;
  return (
    <div className="checklists-poll">
      <ChecklistsRunPollItem
        label="👍"
        status="ok"
        enabled={status === 'ok'}
        onClick={() => onClickItem('ok')}
      />
      <ChecklistsRunPollItem
        label="👎"
        status="nok"
        enabled={status === 'nok'}
        onClick={() => onClickItem('nok')}
      />
      <ChecklistsRunPollItem
        label="💤"
        status="pending"
        enabled={status === 'pending'}
        onClick={() => onClickItem('pending')}
      />
    </div>
  );
};


ChecklistsRunPoll.propTypes = {
  status: PropTypes.oneOf(['pending', 'nok', 'ok']).isRequired,
  onClickItem: PropTypes.func.isRequired,
};

ChecklistsRunPoll.defaultProps = {
  status: 'pending',
};

export default ChecklistsRunPoll;
