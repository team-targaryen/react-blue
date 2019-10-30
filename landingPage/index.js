import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx'

render(
  // wrap the App in the Provider and connect with store
  <App />,
  document.getElementById('landing-page')
);
