import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './landing-page/LandingPage.jsx';
import App from './App.jsx';
import store from './store';
import './assets/styles/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/styles.css';

render(
  // wrap the App in the Provider and connect with store
  <Provider store={store}>
    <MemoryRouter>
      <Switch>
        <Route path='/' exact>
          <LandingPage />
        </Route>
        <Route path='/application'>
          <App />
        </Route>
      </Switch>
    </MemoryRouter>
  </Provider>,
  document.getElementById('app')
);
