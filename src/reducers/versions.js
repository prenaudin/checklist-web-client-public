import { RECEIVED_ENTITIES } from '../constants/ActionTypes';
import Immutable from 'immutable';

const initialState = new Immutable.Map();

const VersionRecord = Immutable.Record({
  id: null,
  createdAt: null,
  updatedAt: null,
  type: 'versions',
  title: '',
  checklist: null,
  tests: {},
});

const mergeVersions = (state, newVersions) => {
  return state.merge(newVersions.map((version) => {
    return new VersionRecord(version);
  }));
};

export default function versions(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_ENTITIES:
      if (!action.entities.versions) { return state; }
      return mergeVersions(state, Immutable.fromJS(action.entities.versions));

    default:
      return state;
  }
}
