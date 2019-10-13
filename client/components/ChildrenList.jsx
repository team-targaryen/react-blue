import React from "react";
const ChildrenList = ({
  addChild,
  currentComponent,
  renameChild,
  changeChildType,
  deleteChild
}) => {
  return (
    <div id="children-list">
      <h4>Children List</h4>
      <form onSubmit={addChild}>
        <input
          type="text"
          id="addChildName"
          name="childName"
          placeholder="Enter Child's Name"
        />
        <input id="addChildContainerCheckbox" name="checkbox" type="checkbox" />
        <span className="container-label">Container</span>
        <button type="submit">+</button>
      </form>
      {currentComponent.children &&
        currentComponent.children.map((child, idx) =>
          childMaker(child, idx, renameChild, changeChildType, deleteChild)
        )}
    </div>
  );
};
const childMaker = (child, idx, renameChild, changeType, deleteChild) => {
  return (
    <EachChild
      key={idx}
      name={child.name}
      childId={child.componentId}
      isContainer={child.isContainer}
      renameChild={renameChild}
      changeType={changeType}
      deleteChild={deleteChild}
    />
  );
};
export default ChildrenList;
