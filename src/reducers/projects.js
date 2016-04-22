import { RECEIVED_ENTITIES, DELETE_CHECKLIST_SUCCESS } from '../constants/ActionTypes';
import Immutable from 'immutable';
import Project from 'models/Project';
import ProjectMap from 'models/ProjectMap';

const initialState = new ProjectMap();

const mergeProjects = (state, newProjects) => {
  return state.merge(newProjects.map((project) => {
    return new Project(project);
  }));
};

export default function projects(state = initialState, action) {
  switch (action.type) {

    case RECEIVED_ENTITIES:
      if (!action.entities.projects) { return state; }
      return mergeProjects(state, Immutable.fromJS(action.entities.projects));

    case DELETE_CHECKLIST_SUCCESS:
      return state.updateIn([action.projectId, 'checklists'], (checklists) => {
        return checklists.filter((checklistId) => { return checklistId !== action.checklistId; });
      });

    default:
      return state;
  }
}
