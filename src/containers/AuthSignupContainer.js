import React from 'react';
import { connect } from 'react-redux';
import { signup } from 'actions/auth';
import AuthSignup from 'components/Auth/Signup';

class AuthSignupContainer extends React.Component {
  render() {
    return (
      <AuthSignup {...this.props}/>
    );
  }
}

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
