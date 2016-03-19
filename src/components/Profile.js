import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AccountActions from '../actions/account';

class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        Profile
        <br/>
        <a href="javascript:void(0)" onClick={this.handleClickLogout.bind(this)}>
          logout
        </a>
      </div>
    );
  }

  handleClickLogout() {
    this.props.actions.signout();
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccountActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
