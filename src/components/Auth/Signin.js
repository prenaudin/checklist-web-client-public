import React from 'react';
import AuthForm from 'components/Auth/Form';
import User from 'models/User';

class AuthSignin extends React.Component {
  render() {
    return (
      <AuthForm
        id="signin"
        onSubmit={this.handleClickSignin.bind(this)}
        user={this.props.user}
        submitLabel="Sign in"
      />
    );
  }

  handleClickSignin({email, password}) {
    this.props.onSignin({email, password});
  }
}

AuthSignin.propTypes = {
  onSignin: React.PropTypes.func.isRequired,
  user: React.PropTypes.instanceOf(User).isRequired,
};

export default AuthSignin;
