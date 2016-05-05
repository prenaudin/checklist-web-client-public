import { SET_MODAL_RETURN_TO } from '../constants/ActionTypes';
import ApplicationState from 'models/ApplicationState';

const initialState = new ApplicationState();

export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_RETURN_TO:
      return initialState.set('modalReturnTo', action.data.modalReturnTo);
    default:
      return state;
  }
}
