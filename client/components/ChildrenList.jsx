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
  nameAndCodeLinkedToComponentId
}) => {
  return (
    <div id='children-list'>
      <h4>Children List</h4>
      <form onSubmit={addChild}>
        <input
          type='text'
          id='add-child-name'
          name='childName'
          placeholder="Enter Child's Name"
        />
        <input
          id='add-child-container-checkbox'
          name='checkbox'
          type='checkbox'
        />
        <span className='container-label'>Container</span>
        <button type='submit'>+</button>
      </form>
      {currentComponent.children &&
        currentComponent.children.map((child, idx) =>
          childMaker(
            child,
            idx,
            renameChild,
            changeChildType,
            deleteChild,
            templates,
            setTemplatesForComponent,
            nameAndCodeLinkedToComponentId
          )
        )}
    </div>
  );
};
const childMaker = (
  child,
  idx,
  renameChild,
  changeChildType,
  deleteChild,
  templates,
  setTemplatesForComponent,
  nameAndCodeLinkedToComponentId
) => {
  return (
    <div key={idx}>
      <EachChild
        key={idx}
        name={child.name}
        childId={child.componentId}
        isContainer={child.isContainer}
        renameChild={renameChild}
        changeType={changeChildType}
        deleteChild={deleteChild}
      />
      <TemplateDropdown
        currentComponent={child}
        templates={templates}
        setTemplatesForComponent={setTemplatesForComponent}
        nameAndCodeLinkedToComponentId={nameAndCodeLinkedToComponentId}
      />
    </div>
  );
};
export default ChildrenList;
