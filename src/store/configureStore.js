import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import rootReducer from '../reducers';

const initialState = {
  projects: new Immutable.Map(),
  checklists: new Immutable.Map(),
  account: new Immutable.Map(),
  versions: new Immutable.Map(),
};

export default function configureStore() {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : defaultFunction => defaultFunction
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
