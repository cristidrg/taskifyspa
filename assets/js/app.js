import "phoenix_html"
import { Provider, connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import store from './store';
import {getTasks, getUsers} from './api';
import TaskifyApp from "./src/app";

$(function() {
  fetch(getTasks)
    .then(res => res.json())
    .then(json => store.dispatch({
      type: 'UPDATE_TASKS',
      tasks: json.data,
    }));

  fetch(getUsers)
    .then(res => res.json())
    .then(json => store.dispatch({
      type: 'UPDATE_USERS',
      users: json.data,
    }))

  ReactDOM.render(
    <Provider store={store}>
      <TaskifyApp state={store.getState()} />
    </Provider>,
    document.getElementById('root'),
  );
});
