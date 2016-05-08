import React from 'react';
import classNames from 'classnames';

const {
  PropTypes,
} = React;

const TestsResultsItemPollItem = ({
  status,
  isEnabled,
}) => {
  const className = classNames(
    'tests-results-item-poll-item',
    `tests-results-item-poll-item--${status}`,
    {
      'is-enabled': isEnabled,
    }
  );

  let label;
  switch (status) {
    case 'ok':
      label = '👍';
      break;
    case 'nok':
      label = '👎';
      break;
    case 'pending':
      label = '💤';
      break;
    default:
      return false;
  }

  return (
    <div className={className}>
      {label}
    </div>
  );
};

TestsResultsItemPollItem.propTypes = {
  status: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool,
};

TestsResultsItemPollItem.defaultProps = {
  isEnabled: false,
};

export default TestsResultsItemPollItem;
