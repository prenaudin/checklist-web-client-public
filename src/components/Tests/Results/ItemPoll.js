import React from 'react';

import TestsResultsItemPollItem from 'components/Tests/Results/ItemPollItem';

const TestsResultsItemPoll = (props) => {
  const { status } = props;
  return (
    <div className="tests-results-item-poll">
      <TestsResultsItemPollItem
        status={status}
        isEnabled
      />
    </div>
  );
};

TestsResultsItemPoll.propTypes = {
  status: React.PropTypes.oneOf(['pending', 'nok', 'ok']).isRequired,
};

TestsResultsItemPoll.defaultProps = {
  status: 'pending',
};

export default TestsResultsItemPoll;
