import React from 'react';
import classNames from 'classnames';

const {
  PropTypes,
} = React;

const ChecklistsRunPollItem = ({
  status,
  onClick,
  isEnabled,
  label,
}) => {
  const className = classNames(
    'checklists-poll-item',
    `checklists-poll-item--${status}`,
    {
      'is-enabled': isEnabled,
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
  isEnabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

ChecklistsRunPollItem.defaultProps = {
  isEnabled: false,
};

export default ChecklistsRunPollItem;
