import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from 'actions/auth';
import AuthPage from 'components/Auth/Page';

class AuthSignup extends React.Component {
  render() {
    return (
      <AuthPage>
        <div className="auth auth-signup form-group">
          <input
            type="text"
            className="form-input form-input--md"
            defaultValue=""
            ref="email"
            placeholder="Email"
          />
          <input
            type="password"
            className="form-input form-input--md"
            defaultValue=""
            ref="password"
            placeholder="Password"
          />
          <input
            type="password"
            className="form-input form-input--md"
            defaultValue=""
            ref="passwordConfirmation"
            placeholder="Password confirmation"
          />
          <button
            className="auth-btn btn btn-primary"
            onClick={this.handleClickSignin.bind(this)}
          >
            Sign up for free
          </button>
        </div>
      </AuthPage>
    );
  }

  handleClickSignin() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const passwordConfirmation = this.refs.passwordConfirmation.value;
    this.props.actions.signup({email, password, passwordConfirmation});
  }
}

AuthSignup.propTypes = {
  actions: React.PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AuthSignup);
