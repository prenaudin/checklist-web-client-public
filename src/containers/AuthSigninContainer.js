import React from 'react';
import { connect } from 'react-redux';
import { signin } from 'actions/auth';
import AuthSignin from 'components/Auth/Signin';

class AuthSigninContainer extends React.Component {
  render() {
    return (
      <AuthSignin {...this.props}/>
    );
  }
}

AuthSigninContainer.propTypes = {
  children: React.PropTypes.any.isRequired,
};

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
