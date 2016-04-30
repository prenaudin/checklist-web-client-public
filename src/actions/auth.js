import * as types from 'constants/ActionTypes';
import api from 'api/api';
import { browserHistory } from 'react-router';

export function signin(data) {
  return (dispatch) => {
    dispatch({ type: types.AUTH_START, data });
    return api.signin({ data })
      .then((resp) => {
        dispatch({ type: types.SIGNIN, data: resp.data });
        browserHistory.push('/projects');
      })
      .catch((error) => {
        dispatch({ type: types.AUTH_ERROR, data: error });
      });
  };
}

export function signup(data) {
  return (dispatch) => {
    dispatch({ type: types.AUTH_START, data });
    return api.signup({ data })
      .then((resp) => {
        dispatch({ type: types.SIGNUP, data: resp.data });
        browserHistory.push('/projects');
      })
      .catch((error) => {
        dispatch({ type: types.AUTH_ERROR, data: error });
      });
  };
}

export function signout() {
  return (dispatch) =>
    api.signout().then(() => {
      dispatch({ type: types.SIGNOUT, data: {} });
      browserHistory.push('/home');
    });
}

export function validateToken() {
  return (dispatch) =>
    api.validateToken()
      .then((resp) => {
        dispatch({ type: types.SIGNIN, data: resp.data });
      })
      .catch(() => {
        browserHistory.push('/home');
      });
}
