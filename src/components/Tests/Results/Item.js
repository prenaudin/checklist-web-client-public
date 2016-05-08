import React from 'react';
import Immutable from 'immutable';
import Markdown from 'react-remarkable';

import TestsResultsItemPoll from 'components/Tests/Results/ItemPoll';

const TestsResultsItem = (props) => {
  const { test } = props;
  return (
    <div className="tests-results-item">
      <TestsResultsItemPoll status={test.get('status')} />
      <label className="tests-results-item-label">
        <div className="tests-results-item-label-title form-title">
          <Markdown source={test.get('title')} />
        </div>
        <div className="tests-results-item-label-comment text-muted">
          <Markdown source={test.get('comment')} />
        </div>
      </label>
    </div>
  );
};

TestsResultsItem.propTypes = {
  test: React.PropTypes.instanceOf(Immutable.Map).isRequired,
};

export default TestsResultsItem;
