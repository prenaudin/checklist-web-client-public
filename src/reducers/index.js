import { combineReducers } from 'redux';
import projects from './projects';
import checklists from './checklists';
import versions from './versions';
import account from './account';

export default combineReducers({
  projects,
  checklists,
  versions,
  account,
});
