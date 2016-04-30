import React from 'react';
import { connect } from 'react-redux';
import { signup } from 'actions/auth';
import AuthSignup from 'components/Auth/Signup';

const AuthSignupContainer = (props) => <AuthSignup {...props} />;

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSignup: (data) => dispatch(signup(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthSignupContainer);
