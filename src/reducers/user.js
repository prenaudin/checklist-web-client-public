import { SIGNIN, SIGNUP, SIGNOUT, AUTH_ERROR, AUTH_START } from '../constants/ActionTypes';
import User from 'models/User';

const initialState = new User();

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
    case SIGNUP:
      return state
        .set('id', action.data.id)
        .set('email', action.data.email)
        .set('isSignedIn', true)
        .set('isSigning', false)
        .set('authError', false);

    case SIGNOUT:
      return initialState;

    case AUTH_START:
      return state
        .set('isSigning', true)
        .set('authError', false);

    case AUTH_ERROR:
      return state
        .set('authError', action.data)
        .set('isSigning', false);

    default:
      return state;
  }
}
