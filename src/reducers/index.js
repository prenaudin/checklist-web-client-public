import { combineReducers } from 'redux';
import projects from './projects';
import checklists from './checklists';
import versions from './versions';
import user from './user';
import application from './application';

export default combineReducers({
  application,
  projects,
  checklists,
  versions,
  user,
});
