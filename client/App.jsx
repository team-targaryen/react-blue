import React from 'react';
import TopNavBarContainer from './containers/TopNavBarContainer.jsx';
import SideBarContainer from './containers/SideBarContainer.jsx';
import MainDisplayContainer from './containers/MainDisplayContainer.jsx';

// App is just outter wrapper to get connnection with main container
const App = () => (
  <div>
    <TopNavBarContainer />
    <SideBarContainer />
    <MainDisplayContainer />
  </div>
);

export default App;
