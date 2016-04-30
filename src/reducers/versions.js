import { RECEIVED_ENTITIES } from '../constants/ActionTypes';
import Immutable from 'immutable';
import Version from 'models/Version';
import VersionMap from 'models/VersionMap';

const initialState = new VersionMap();

const mergeVersions = (state, newVersions) =>
  state.merge(newVersions.map((version) => new Version(version)));

export default function versions(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_ENTITIES:
      if (!action.entities.versions) { return state; }
      return mergeVersions(state, Immutable.fromJS(action.entities.versions));

    default:
      return state;
  }
}
