import React from 'react';
import TopNavContainer from './containers/TopNavContainer.jsx';
import PanelContainer from './containers/PanelContainer.jsx';
import MainDisplayContainer from './containers/MainDisplayContainer.jsx';

// App is just outter wrapper to get connnection with main container
const App = () => (
  <div>
    <TopNavContainer />
    <PanelContainer />
    <MainDisplayContainer />
  </div>
);

export default App;
