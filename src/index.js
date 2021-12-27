import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/styles.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import axios from 'axios';
(function() {
  var token = window.localStorage.getItem('token');
  if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
  } else {
      axios.defaults.headers.common['x-auth-token'] = null;
  }
})();
ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);
