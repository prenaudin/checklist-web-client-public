import React from 'react';
import AuthForm from 'components/Auth/Form';
import User from 'models/User';

class AuthSignup extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickSignup = this.handleClickSignup.bind(this);
  }

  render() {
    return (
      <AuthForm
        id="signup"
        onSubmit={this.handleClickSignup}
        user={this.props.user}
        submitLabel="Sign up"
      />
    );
  }

  handleClickSignup({ email, password }) {
    const passwordConfirmation = password;
    this.props.onSignup({ email, password, passwordConfirmation });
  }
}

AuthSignup.propTypes = {
  onSignup: React.PropTypes.func.isRequired,
  user: React.PropTypes.instanceOf(User).isRequired,
};

export default AuthSignup;
