import { RECEIVED_ENTITIES, DELETE_CHECKLIST_SUCCESS } from '../constants/ActionTypes'
import Immutable from 'immutable'

const initialState  = new Immutable.Map()

const ProjectRecord = Immutable.Record({
  id: null,
  type: 'project',
  title: '',
  createdAt: null,
  createdBy: null,
  updatedAt: null,
  checklists: new Immutable.OrderedSet()
})

const mergeProjects = (state, projects) => {
  return state.merge(projects.map((project) => {
    return new ProjectRecord(project)
  }))
}

export default function projects(state = initialState, action) {
  let id;

  switch (action.type) {

    case RECEIVED_ENTITIES:
      if (!action.entities.projects) { return state }
      return mergeProjects(state, Immutable.fromJS(action.entities.projects))

    case DELETE_CHECKLIST_SUCCESS:
      return state.updateIn([action.projectId, 'checklists'], (checklists) => {
        return checklists.filter((checklistId) => { return checklistId !== action.checklistId })
      })

    default:
      return state
  }
}
