import { RECEIVED_ENTITIES, DELETE_CHECKLIST_SUCCESS } from '../constants/ActionTypes';
import Immutable from 'immutable';

const initialState = new Immutable.Map();

const ChecklistRecord = Immutable.Record({
  id: null,
  createdAt: null,
  updatedAt: null,
  type: 'checklists',
  title: '',
  project: null,
  testSuite: {},
  versions: new Immutable.OrderedSet(),
  lastVersionOkCount: 0,
  lastVersionNokCount: 0,
  lastVersionPendingCount: 0,
  lastVersionTitle: 'v0',
});

const mergeChecklists = (state, newChecklists) => {
  return state.merge(newChecklists.map((checklist) => {
    return new ChecklistRecord(checklist);
  }));
};

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
