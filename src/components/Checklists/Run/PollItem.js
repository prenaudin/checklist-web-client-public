import React from 'react';
import classNames from 'classnames';

const {
  Component,
  PropTypes,
} = React;

class ChecklistsRunPollItem extends Component {

  render() {
    const className = classNames(
      'checklists-poll-item',
      `checklists-poll-item--${this.props.status}`,
        {
          'is-enabled': this.props.enabled,
        }
    );

    return (
      <div
        className={className}
        onClick={this.props.onClick}
      >
        {this.props.label}
      </div>
    );
  }

}

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
