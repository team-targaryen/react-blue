// Render: 
//   Component info: 
//          name of component
//          component or container(toggle button to change its attribute)
//          delete current component (if this component is a parent component, show warning message)
//
import React from 'react';

const ComponentDetail = ({ renameComponent, changeType, deleteComponent, currentComponentId }) => (
    <div className='componentDetail'>
        <input className='componentName' type='text' onChange={() => renameComponent(event, currentComponentId)} />
    </div>
);

export default ComponentDetail;