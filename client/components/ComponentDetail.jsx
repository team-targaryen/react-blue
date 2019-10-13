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
    <div id='component-detail'>
      <h3>Current Component</h3>
      <input
        id='component-name-input'
        type='text'
        defaultValue={currentComponent.name}
        onBlur={renameComponent}
        disabled={disabled()}
      />
      <div className='is-container'>
        <input
          id='is-container-curr'
          type='checkbox'
          checked={currentComponent.isContainer}
          onChange={changeType}
        />
        <label id='container-label' for='is-container-curr'>
          Container
        </label>
      </div>
      <button onClick={deleteComponent}>Delete Component</button>
    </div>
  );
};

export default ComponentDetail;
