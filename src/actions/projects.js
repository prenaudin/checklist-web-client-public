import * as types from '../constants/ActionTypes';
import api from '../api/api';

export function addProject(data) {
  return (dispatch) =>
    api.createProject({ data }).then((resp) => {
      dispatch({ type: types.RECEIVED_ENTITIES, entities: resp.entities });
    });
}

export function insertProject(data) {
  return { type: types.INSERT_PROJECT, data };
}

export function findProject({ projectId }) {
  return (dispatch) =>
    api.findProject(projectId).then((resp) => {
      dispatch({ type: types.RECEIVED_ENTITIES, entities: resp.entities });
    });
}

export function findAllProjects() {
  return (dispatch) =>
    api.findAllProjects().then((resp) => {
      dispatch({ type: types.RECEIVED_ENTITIES, entities: resp.entities });
    });
}
