import { combineReducers } from 'redux';
import projects from './projects';
import checklists from './checklists';
import versions from './versions';
import user from './user';

export default combineReducers({
  projects,
  checklists,
  versions,
  user,
});
