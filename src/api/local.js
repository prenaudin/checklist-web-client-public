import Immutable from 'immutable'
import {Promise} from 'es6-promise'

const projectsData = [
  {
    id: '111',
    type: 'project',
    title: 'Azendoo',
    checklists: ['aaa', 'bbb']
  },
  {
    id: '222',
    type: 'project',
    title: 'Sample Project',
    checklists: ['ccc', 'ddd', 'eee']
  }
]

const LocalAPI = {

  createProject: ({data}) => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        const projectData = _.defaults(data, {id: _.uniqueId(), type: 'project'})
        projectsData.push(projectData)
        resolve({
          data: projectData
        });
      }, 100);
    })
  },

  findAllProjects: () => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({
          data: projectsData
        });
      }, 100);
    })
  },

  findProject: (projectId) => {

  }

}

export default LocalAPI
