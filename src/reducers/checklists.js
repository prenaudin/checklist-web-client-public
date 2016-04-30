import { RECEIVED_ENTITIES, DELETE_CHECKLIST_SUCCESS } from '../constants/ActionTypes';
import Immutable from 'immutable';
import Checklist from 'models/Checklist';
import ChecklistMap from 'models/ChecklistMap';

const initialState = new ChecklistMap();

const mergeChecklists = (state, newChecklists) =>
  state.merge(newChecklists.map((checklist) => new Checklist(checklist)));

export default function checklists(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_ENTITIES:
      if (!action.entities.checklists) { return state; }
      return mergeChecklists(state, Immutable.fromJS(action.entities.checklists));

    case DELETE_CHECKLIST_SUCCESS:
      return state.remove(action.checklistId);

    default:
      return state;
  }
}
