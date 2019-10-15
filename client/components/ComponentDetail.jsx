// Render:
//   Component info:
//          name of component
//          component or container(toggle button to change its attribute)
//          delete current component (if this component is a parent component, show warning message)
//
import React from 'react';
import TemplateDropdown from './TemplateDropdown.jsx';
const ComponentDetail = ({
  renameComponent,
  changeType,
  deleteComponent,
  currentComponent,
  templates,
  setTemplatesForComponent,
  nameLinkedToComponentId
}) => {
  const disabled = () => {
    return currentComponent.depth === 0 ? 'disabled' : '';
  };

  return (
    <div id='component-detail'>
      <h2>Current Component</h2>
      <div id='component-form'>
        <div id='component-form-top'>
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
            <label id='container-label' htmlFor='is-container-curr'>
              Container
            </label>
          </div>
          <button onClick={deleteComponent}>
            <i className='far fa-minus-square'></i>
          </button>
        </div>
        <div id='component-form-bottom'>
          <TemplateDropdown
            templates={templates}
            setTemplatesForComponent={setTemplatesForComponent}
            currentComponent={currentComponent}
            nameLinkedToComponentId={nameLinkedToComponentId}
          />
        </div>
      </div>
    </div>
  );
};

export default ComponentDetail;
