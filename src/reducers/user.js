import { SIGNIN, SIGNUP, SIGNOUT } from '../constants/ActionTypes';
import User from 'models/User';

const initialState = new User();

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
    case SIGNUP:
      return state
        .set('id', action.data.id)
        .set('email', action.data.email)
        .set('isSignedIn', true);

    case SIGNOUT:
      return initialState;

    default:
      return state;
  }
}
