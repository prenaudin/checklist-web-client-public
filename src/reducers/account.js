import { SIGNIN, SIGNUP, SIGNOUT } from '../constants/ActionTypes'
import Immutable from 'immutable'

const AccountRecord = Immutable.Record({
  id: null,
  email: null,
  isSignedIn: false
})

const initialState = new AccountRecord()

export default function account(state = initialState, action) {

  switch (action.type) {

    case SIGNIN:
    case SIGNUP:
      return state
        .set('id', action.data.id)
        .set('email', action.data.email)
        .set('isSignedIn', true)

    case SIGNOUT:
      return initialState

    default:
      return state

  }
}
