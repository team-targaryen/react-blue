import React, { useState } from "react";

const ComponentDetail = ({
  renameComponent,
  changeType,
  deleteComponent,
  currentComponent
}) => {
  const [isInput, setIsInput] = useState(currentComponent.name);
  const [isChecked, setIsChecked] = useState(currentComponent.isContainer);
  return (
    <div className="componentDetail">
      <div className="renameField">
        <input
          className="componentName"
          type="text"
          value={isInput}
          onChange={e => {
            setIsInput(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === "Enter") {
              renameComponent(currentComponent.id, isInput);
            }
            console.log(isInput, currentComponent.id);
          }}
        />
      </div>
      <div className="isContainer">
        <input
          id="componentDetailContainerCheckbox"
          type="checkbox"
          //   checked={isChecked}
          onChange={e => {
            console.log(
              "here in component detail for checked",
              e.target.checked
            );
            setIsChecked(e.target.checked);
            changeType(isChecked, currentComponent.id);
          }}
        />
        <span className="containerLabel">Container</span>
      </div>
    </div>
  );
};

export default ComponentDetail;
