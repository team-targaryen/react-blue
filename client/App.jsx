import React from 'react';
import MainDisplayContainer from './containers/MainDisplayContainer.jsx';
import SideBarContainer from './containers/SideBarContainer.jsx';
import TopNavBarContainer from './containers/TopNavBarContainer.jsx';

// App is just outter wrapper to get connnection with main container
const App = () => (
  <div>
    <SideBarContainer />
  </div>
);

export default App;
