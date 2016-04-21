import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AccountActions from 'actions/account';
import AuthPage from 'components/Auth/Page';

class AuthSignin extends React.Component {
  render() {
    return (
      <AuthPage>
        <div className="auth auth-signin form-group">
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
          <button
            className="auth-btn btn btn-primary"
            onClick={this.handleClickSignin.bind(this)}
          >
            Sign in
          </button>
        </div>
      </AuthPage>
    );
  }

  handleClickSignin() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.actions.signin({email, password});
  }
}

AuthSignin.propTypes = {
  actions: React.PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccountActions, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AuthSignin);
