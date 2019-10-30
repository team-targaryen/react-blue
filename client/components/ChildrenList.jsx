import React from 'react';
import EachChild from './EachChild.jsx';
import TemplateDropdown from './TemplateDropdown.jsx';
const ChildrenList = ({
  addChild,
  renameChild,
  changeChildType,
  deleteChild,
  templates,
  setTemplatesForComponent,
  currentComponent,
  nameAndCodeLinkedToComponentId,
  state,
  recentTimeoutId,
  setTimeoutId,
  checkID_ClearAndSetTimeout,
  showSubTree,
  currentlyDisplayedSubTreeId,
}) => {
  return (
    <React.Fragment>
      <h3>Add Child</h3>
      <form id='children-list-form' onSubmit={(e) => {
        addChild(e);
        showSubTree(currentlyDisplayedSubTreeId);
        checkID_ClearAndSetTimeout(setTimeoutId, recentTimeoutId, state);
      }}>

        <input
          type='text'
          id='add-child-name'
          name='childName'
          placeholder="Enter Child's Name"
        />
        <div>
          <input
            id='add-child-container-checkbox'
            name='checkbox'
            type='checkbox'
          />
          <label
            className='container-label'
            htmlFor='add-child-container-checkbox'
          >
            Container
          </label>
        </div>
        <button type='submit'>
          <i className='far fa-plus-square'></i>
        </button>
      </form>
      <h3>Children List</h3>
      <div id='children-list'>
        {currentComponent.children &&
          currentComponent.children.filter((node, index) => {
            return node !== null;
          }).map((child, index) => {
            return childMaker(
              child,
              index,
              renameChild,
              changeChildType,
              deleteChild,
              templates,
              setTemplatesForComponent,
              nameAndCodeLinkedToComponentId,
              state,
              recentTimeoutId,
              setTimeoutId,
              checkID_ClearAndSetTimeout,
              showSubTree,
              currentlyDisplayedSubTreeId
            )
          }
          )}
      </div>
    </React.Fragment>
  );
};

const childMaker = (
  child,
  index,
  renameChild,
  changeChildType,
  deleteChild,
  templates,
  setTemplatesForComponent,
  nameAndCodeLinkedToComponentId,
  state,
  recentTimeoutId,
  setTimeoutId,
  checkID_ClearAndSetTimeout,
  showSubTree,
  currentlyDisplayedSubTreeId
) => {
  return (
    <div key={`EachChild${index}`} className='each-child-container'>
      {/*console.log('Inside of childMaker function inside of ChildrenList.jsx')*/}
      <EachChild
        key={index}
        name={child.name}
        childId={child.componentId}
        isContainer={child.isContainer}
        renameChild={renameChild}
        changeType={changeChildType}
        deleteChild={deleteChild}
        state={state}
        recentTimeoutId={recentTimeoutId}
        setTimeoutId={setTimeoutId}
        checkID_ClearAndSetTimeout={checkID_ClearAndSetTimeout}
        showSubTree={showSubTree}
        currentlyDisplayedSubTreeId={currentlyDisplayedSubTreeId}
      />
      <TemplateDropdown
        currentComponent={child}
        templates={templates}
        setTemplatesForComponent={setTemplatesForComponent}
        nameAndCodeLinkedToComponentId={nameAndCodeLinkedToComponentId}
        state={state}
        recentTimeoutId={recentTimeoutId}
        setTimeoutId={setTimeoutId}
        checkID_ClearAndSetTimeout={checkID_ClearAndSetTimeout}
        showSubTree={showSubTree}
        currentlyDisplayedSubTreeId={currentlyDisplayedSubTreeId}
      />
    </div>
  );
};

export default ChildrenList;

