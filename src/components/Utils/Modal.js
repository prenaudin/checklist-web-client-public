import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class UtilsModal extends React.Component {
  static propTypes = {
    modalReturnTo: React.PropTypes.string.isRequired,
    children: React.PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  render() {
    return (
      <Modal show onHide={this.close}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
      </Modal>
    );
  }

  close() {
    browserHistory.push(this.props.modalReturnTo);
  }
}

function mapStateToProps(state) {
  return {
    modalReturnTo: state.application.get('modalReturnTo'),
  };
}

export default connect(
  mapStateToProps,
  null,
)(UtilsModal);
