import React from 'react';
import TopNavContainer from './containers/TopNavContainer.jsx';
import PanelContainer from './containers/PanelContainer.jsx';
import VisualContainer from './containers/VisualContainer.jsx';

// App is just outter wrapper to get connnection with main container
const App = () => (

  <React.Fragment>
    <TopNavContainer />
    <div id='panel-main-container'>
      <PanelContainer />
      <VisualContainer />
    </div>
  </React.Fragment>
);

export default App;
