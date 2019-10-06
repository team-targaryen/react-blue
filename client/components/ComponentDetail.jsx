// Render: 
//   Component info: 
//          name of component
//          component or container(toggle button to change its attribute)
//          delete current component (if this component is a parent component, show warning message)
//
import React from 'react';


const ComponentDetail = ({ renameComponent, changeType, deleteComponent, currentComponent }) => {
    console.log("In componentDetail");
    return (
    <div className='componentDetail'>
        <div className='renameField'>
            <input className='componentName' type='text' onChange={() => renameComponent(event)} /> 
        </div>
        <div className='isContainer'>
            <input className="containerCheckbox" type="checkbox" checked={currentComponent.isContainer} onChange={() => changeType(!currentComponent.isContainer)}/><span className="containerLabel">Container</span>
        </div>
    </div>
    )
}

export default ComponentDetail;