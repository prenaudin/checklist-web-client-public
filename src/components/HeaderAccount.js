import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AccountActions from '../actions/account';

class HeaderAccount extends React.Component {
  render() {
    if (!this.props.account.get('isSignedIn')) {
      return false;
    }
    return (
      <div className="header-infos">
        {this.props.account.get('email')}
        <a href='javascript:void(0)' onClick={this.handleClickLogout.bind(this)}>
          logout
        </a>
      </div>
    );
  }

  handleClickLogout() {
    this.props.actions.signout()
  }
}

function mapStateToProps(state) {
  return {
    account: state.account
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccountActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAccount)
