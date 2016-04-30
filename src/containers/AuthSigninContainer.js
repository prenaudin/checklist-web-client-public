import React from 'react';
import { connect } from 'react-redux';
import { signin } from 'actions/auth';
import AuthSignin from 'components/Auth/Signin';

const AuthSigninContainer = (props) => <AuthSignin {...props} />;

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSignin: (data) => dispatch(signin(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthSigninContainer);
