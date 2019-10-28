// Render:
//   Component info:
//          name of component
//          component or container(toggle button to change its attribute)
//          delete current component (if this component is a parent component, show warning message)
//
import React from 'react';
import TemplateDropdown from './TemplateDropdown.jsx';
const ComponentDetail = ({
  initialName,
  renameComponent,
  changeType,
  deleteComponent,
  currentComponent,
  templates,
  setTemplatesForComponent,
  nameAndCodeLinkedToComponentId,
  recentTimeoutId,
  setTimeoutId,
  checkID_ClearAndSetTimeout,
  showSubTree,
  currentlyDisplayedSubTreeId,
  addOrDeleteNewSubTree,
  state,
  displaySubTreeDropDown
}) => {
  const disabled = () => {
    return currentComponent.depth === 0 ? 'disabled' : '';
  };
  return (
    <React.Fragment>
      <h2>Current Component</h2>
      <div id='component-form'>
        <div id='component-form-top'>
          <input
            id='component-name-input'
            type='text'
            key={`initialName${initialName || currentComponent.name}`}
            defaultValue={initialName || currentComponent.name}
            onBlur={(event)=>{
              renameComponent(event);
              showSubTree(currentlyDisplayedSubTreeId);
              checkID_ClearAndSetTimeout(setTimeoutId, recentTimeoutId, state);
            }}
            disabled={disabled()}
          />
          <div className='is-container'>
            <input
              id='is-container-curr'
              type='checkbox'
              checked={currentComponent.isContainer}
              onChange={(event)=>{
                changeType(event)
                showSubTree(currentlyDisplayedSubTreeId);
              }}
            />
            <label id='container-label' htmlFor='is-container-curr'>
              Container
            </label>
          </div>
          <button onClick={(event) => {
            deleteComponent(event);
            showSubTree(currentlyDisplayedSubTreeId);
            checkID_ClearAndSetTimeout(setTimeoutId, recentTimeoutId, state)
          }}>
            <i className='far fa-minus-square'></i>
          </button>
          <input 
          id='add-sub-tree' 
          type='checkbox' 
          checked={displaySubTreeDropDown[currentComponent.componentId] ? true : false} 
          onChange={(event) => {
              addOrDeleteNewSubTree(event, currentComponent.componentId, currentComponent.name);
              checkID_ClearAndSetTimeout(setTimeoutId, recentTimeoutId, state);
          }}
          disabled={disabled()} />
          <label>Subtree</label>
        </div>
        <div id='component-form-bottom'>
          <TemplateDropdown
            templates={templates}
            setTemplatesForComponent={setTemplatesForComponent}
            currentComponent={currentComponent}
            nameAndCodeLinkedToComponentId={nameAndCodeLinkedToComponentId}
            recentTimeoutId={recentTimeoutId}
            setTimeoutId={setTimeoutId}
            checkID_ClearAndSetTimeout={checkID_ClearAndSetTimeout}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ComponentDetail;
