import * as types from '../constants/ActionTypes';
import api from '../api/api';

export function findVersions({ projectId, checklistId }) {
  return (dispatch) =>
    api.findVersions({ projectId, checklistId }).then((resp) => {
      dispatch({ type: types.RECEIVED_ENTITIES, entities: resp.entities });
    });
}
