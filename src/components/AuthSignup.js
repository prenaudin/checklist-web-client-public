import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AccountActions from '../actions/account';

class AuthSignup extends React.Component {
  render() {
    return (
      <div className="auth auth-signup form-group">
        Sign up
        <input
          type='text'
          className='form-input form-input--md'
          defaultValue=''
          ref='email'
          placeholder='Email'
        />
        <input
          type='password'
          className='form-input form-input--md'
          defaultValue=''
          ref='password'
          placeholder='Password'
        />
        <input
          type='password'
          className='form-input form-input--md'
          defaultValue=''
          ref='passwordConfirmation'
          placeholder='Password confirmation'
        />
        <button
          className='btn btn-primary'
          onClick={this.handleClickSignin.bind(this)}
        >
          Sign up
        </button>
      </div>
    );
  }

  handleClickSignin() {
    const email = this.refs.email.value
    const password = this.refs.password.value
    const passwordConfirmation = this.refs.passwordConfirmation.value
    this.props.actions.signup({email, password, passwordConfirmation})
  }
}

AuthSignup.propTypes = {
  actions: React.PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccountActions, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AuthSignup)
