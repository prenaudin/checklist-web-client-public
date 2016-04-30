import React from 'react';
import classNames from 'classnames';

const {
  PropTypes,
} = React;

const ChecklistsRunPollItem = ({
  status,
  onClick,
  enabled,
  label,
}) => {
  const className = classNames(
    'checklists-poll-item',
    `checklists-poll-item--${status}`,
    {
      'is-enabled': enabled,
    }
  );

  return (
    <div
      className={className}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

ChecklistsRunPollItem.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

ChecklistsRunPollItem.defaultProps = {
  enabled: false,
};

export default ChecklistsRunPollItem;
