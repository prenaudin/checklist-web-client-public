import React from 'react';
import classNames from 'classnames';
import AuthPage from 'components/Auth/Page';
import User from 'models/User';

class AuthForm extends React.Component {
  render() {
    const authError = this.props.user.get('authError');
    const className = classNames('auth form-group', `auth-${this.props.id}`);
    return (
      <AuthPage>
        <div className={className}>
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
          {
            (() => {
              if ( !authError ) { return false; }
              return (
                <div className="auth-error">
                  {authError.get('message')}
                </div>
              );
            })()
          }
          <button
            disabled={this.props.user.get('isSigning')}
            className="auth-btn btn btn-primary"
            onClick={this.handleClickSubmit.bind(this)}
          >
            {this.props.submitLabel}
          </button>
        </div>
      </AuthPage>
    );
  }

  handleClickSubmit() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.onSubmit({email, password});
  }
}

AuthForm.propTypes = {
  id: React.PropTypes.string.isRequired,
  submitLabel: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  user: React.PropTypes.instanceOf(User).isRequired,
};

export default AuthForm;
