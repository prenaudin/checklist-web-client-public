import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from './components/Router';
import store from './store/store';
require('../assets/stylesheets/application.scss');

render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  document.getElementById('app-container')
);
