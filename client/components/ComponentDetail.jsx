// Render:
//   Component info:
//          name of component
//          component or container(toggle button to change its attribute)
//          delete current component (if this component is a parent component, show warning message)
//
import React from "react";
import TemplateDropdown from "./TemplateDropdown.jsx";
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
    return currentComponent.depth === 0 ? "disabled" : "";
  };

  return (
    <div id="component-detail">
      <h3>Current Component</h3>
      <div id="rename-field">
        <input
          id="componentNameInput"
          type="text"
          defaultValue={currentComponent.name}
          onBlur={renameComponent}
          disabled={disabled()}
        />
      </div>
      <div id="is-container">
        <input
          id="componentDetailContainerCheckbox"
          type="checkbox"
          checked={currentComponent.isContainer}
          onChange={changeType}
        />
        <span id="container-label">Container</span>
      </div>
      <TemplateDropdown
        templates={templates}
        setTemplatesForComponent={setTemplatesForComponent}
        currentComponent={currentComponent}
        nameLinkedToComponentId={nameLinkedToComponentId}
      />
      <div id="delete-component">
        <button onClick={deleteComponent}>Delete Component</button>
      </div>
    </div>
  );
};

export default ComponentDetail;
