import React from 'react';

const {
  Component,
  PropTypes,
} = React;

class ChecklistPollItem extends Component {

  render() {
    return (
      <span
        style={{backgroundColor: this.props.enabled ? 'red' : 'white', marginRight: '5px'}}
        onClick={this.props.onClick}>
        {this.props.label}
      </span>
    );
  }

}

ChecklistPollItem.propTypes = {
  label: PropTypes.string.isRequired,
  enabled: PropTypes.bool,

  onClick: PropTypes.func.isRequired,
};

ChecklistPollItem.defaultProps = {
  enabled: false,
};

export default ChecklistPollItem;
