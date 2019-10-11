// Render:
//   Component info:
//          name of component
//          component or container(toggle button to change its attribute)
//          delete current component (if this component is a parent component, show warning message)
//
import React from 'react';

const ComponentDetail = ({
  renameComponent,
  changeType,
  deleteComponent,
  currentComponent
}) => {
  const disabled = () => {
    return currentComponent.depth === 0 ? 'disabled' : '';
  };

  return (
    <div className='componentDetail'>
      <div className='renameField'>
        <input
          className='componentName'
          type='text'
          value={currentComponent.name}
          onChange={renameComponent}
          disabled={disabled()}
        />
      </div>
      <div className='isContainer'>
        <input
          id='componentDetailContainerCheckbox'
          type='checkbox'
          checked={currentComponent.isContainer}
          onChange={changeType}
        />
        <span className='containerLabel'>Container</span>
      </div>
    </div>
  );
};

export default ComponentDetail;
