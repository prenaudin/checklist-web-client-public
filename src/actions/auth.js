import * as types from 'constants/ActionTypes';
import api from 'api/api';
import history from 'config/history';

export function signin(data) {
  return (dispatch) => {
    dispatch({ type: types.AUTH_START, data: data });
    return api.signin({data})
      .then((resp) => {
        dispatch({ type: types.SIGNIN, data: resp.data });
        history.pushState(null, '/projects');
      })
      .catch((error) => {
        dispatch({ type: types.AUTH_ERROR, data: error });
      });
  };
}

export function signup(data) {
  return (dispatch) => {
    dispatch({ type: types.AUTH_START, data: data });
    return api.signup({data})
      .then((resp) => {
        dispatch({ type: types.SIGNUP, data: resp.data });
        history.pushState(null, '/projects');
      })
      .catch((error) => {
        dispatch({ type: types.AUTH_ERROR, data: error });
      });
  };
}

export function signout() {
  return (dispatch) => {
    return api.signout().then(() => {
      dispatch({ type: types.SIGNOUT, data: {} });
      history.pushState(null, '/home');
    });
  };
}

export function validateToken() {
  return (dispatch) => {
    return api.validateToken()
      .then((resp) => {
        dispatch({ type: types.SIGNIN, data: resp.data });
      })
      .catch(() => {
        history.pushState(null, '/home');
      });
  };
}
