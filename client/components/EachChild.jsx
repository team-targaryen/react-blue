import React from "react";
import DropdownTemplates from "./DropdownTemplates.jsx";
const EachChild = ({
  name,
  childId,
  isContainer,
  renameChild,
  changeType,
  deleteChild,
  templates,
  setTemplatesForComponent,
  currentComponent
}) => {
  //   setTemplatesForComponent(childId);
  return (
    <div className="eachChild">
      <input
        className="childName"
        type="text"
        defaultValue={name}
        onBlur={() => renameChild(event, childId)}
      ></input>
      <input
        className="containerCheckbox"
        type="checkbox"
        checked={isContainer}
        onChange={() => changeType(event, childId)}
      />
      <DropdownTemplates
        templates={templates}
        setTemplatesForComponent={setTemplatesForComponent}
        childId={childId}
        currentComponent={currentComponent}
      />
      <span className="containerLabel">Container</span>
      <button
        className="deleteChild"
        onClick={() => {
          deleteChild(childId);
        }}
      >
        X
      </button>
    </div>
  );
};

export default EachChild;
