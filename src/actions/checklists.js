import * as types from '../constants/ActionTypes';
import api from '../api/api';
import { browserHistory } from 'react-router';

export function addChecklist(data) {
  return (dispatch) =>
    api.createChecklist({ data }).then((resp) => {
      dispatch({ type: types.RECEIVED_ENTITIES, entities: resp.entities });
    });
}

export function updateChecklist(data) {
  return (dispatch) =>
    api.updateChecklist({ data }).then((resp) => {
      dispatch({ type: types.RECEIVED_ENTITIES, entities: resp.entities });
    });
}

export function findChecklists({ projectId }) {
  return (dispatch) =>
    api.findChecklists({ projectId }).then((resp) => {
      dispatch({ type: types.RECEIVED_ENTITIES, entities: resp.entities });
    });
}

export function findChecklist({ projectId, checklistId }) {
  return (dispatch) =>
    api.findChecklist({ projectId, checklistId }).then((resp) => {
      dispatch({ type: types.RECEIVED_ENTITIES, entities: resp.entities });
    });
}

export function deleteChecklist({ projectId, checklistId }) {
  return (dispatch) =>
    api.deleteChecklist({ projectId, checklistId }).then(() => {
      dispatch({ type: types.DELETE_CHECKLIST_SUCCESS, projectId, checklistId });
    });
}

export function createVersion({ projectId, checklistId, data }) {
  return (dispatch) =>
    api.createVersion({ projectId, checklistId, data }).then((resp) => {
      dispatch({ type: types.RECEIVED_ENTITIES, entities: resp.entities });
      browserHistory.push(null, `/projects/${projectId}/checklists`);
    });
}
