import * as types from 'constants/ActionTypes';

export function setModalReturnTo(modalReturnTo) {
  return { type: types.SET_MODAL_RETURN_TO, data: { modalReturnTo } };
}
