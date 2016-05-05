import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { setModalReturnTo } from 'actions/application';

import RoutesModalRedirect from 'components/Routes/ModalRedirect';

class RoutesComposer extends React.Component {
  static propTypes = {
    modalReturnTo: React.PropTypes.string.isRequired,
    onSetModalReturnTo: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleEnterRedirectPage = this.handleEnterRedirectPage.bind(this);
    this.state = _.extend({}, this.getRouteState(props));
  }

  componentWillMount() {
    this.storeReturnTo();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getRouteState(nextProps));
  }

  componentDidUpdate() {
    this.storeReturnTo();
  }

  getRouteState(props) {
    const isModal = props.routes[1].isModal === true;
    const isReturnTo = this.state && props.location.pathname === this.props.modalReturnTo;

    if (isModal) {
      return {
        modal: props.children,
      };
    } else if (isReturnTo) {
      return {
        modal: false,
      };
    }
    return {
      page: props.children,
      modal: false,
    };
  }

  render() {
    return (
      <div className="routes-composer">
        {
          this.state.page ||
            <RoutesModalRedirect
              onRedirect={this.handleRedirect}
              onEnterRedirectPage={this.handleEnterRedirectPage}
              location={this.props.location}
            />
        }
        {this.state.modal}
      </div>
    );
  }

  storeReturnTo() {
    if (this.state.modal) { return false; }
    this.props.onSetModalReturnTo(this.props.location.pathname);
    return true;
  }

  handleRedirect(page) {
    this.setState({ page });
  }

  handleEnterRedirectPage(nextState) {
    this.props.onSetModalReturnTo(nextState.location.pathname);
  }
}


function mapStateToProps(state) {
  return {
    modalReturnTo: state.application.get('modalReturnTo'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSetModalReturnTo: (modalReturnTo) => {
      dispatch(setModalReturnTo(modalReturnTo));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutesComposer);
