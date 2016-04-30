import { RECEIVED_ENTITIES, DELETE_CHECKLIST_SUCCESS } from '../constants/ActionTypes';
import Immutable from 'immutable';
import Project from 'models/Project';
import ProjectMap from 'models/ProjectMap';

const initialState = new ProjectMap();

const mergeProjects = (state, newProjects) =>
  state.merge(newProjects.map((project) => new Project(project)));

export default function projects(state = initialState, action) {
  switch (action.type) {

    case RECEIVED_ENTITIES:
      if (!action.entities.projects) { return state; }
      return mergeProjects(state, Immutable.fromJS(action.entities.projects));

    case DELETE_CHECKLIST_SUCCESS:
      return state.updateIn([action.projectId, 'checklists'], (checklists) =>
        checklists.filter((checklistId) => checklistId !== action.checklistId)
      );

    default:
      return state;
  }
}
