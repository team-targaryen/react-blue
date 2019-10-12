import React from 'react';
import TopNavBarContainer from './containers/TopNavBarContainer.jsx';
import PanelContainer from './containers/PanelContainer.jsx';
import MainDisplayContainer from './containers/MainDisplayContainer.jsx';

// App is just outter wrapper to get connnection with main container
const App = () => (
  <div>
    <TopNavBarContainer />
    <PanelContainer />
    <MainDisplayContainer />
  </div>
);

export default App;
