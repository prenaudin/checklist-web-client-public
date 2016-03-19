import React from 'react';
import classNames from 'classnames';

const {
  Component,
  PropTypes,
} = React;

class ChecklistPollItem extends Component {

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

ChecklistPollItem.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

ChecklistPollItem.defaultProps = {
  enabled: false,
};

export default ChecklistPollItem;
