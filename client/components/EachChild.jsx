import React, { useState } from "react";

const EachChild = ({ child, renameComponent, changeType, deleteChild }) => {
  const [isInput, setIsInput] = useState(child.name);
  const [isChecked, setIsChecked] = useState(child.isContainer);
  return (
    <div className="eachChild">
      <input
        className="childName"
        type="text"
        value={isInput}
        onChange={e => {
          setIsInput(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            renameComponent(child.id, isInput);
          }
        }}
      ></input>
      <input
        className="containerCheckbox"
        type="checkbox"
        checked={isChecked}
        onChange={event => changeType(event, child.id)}
      />
      <span className="containerLabel">Container</span>
      <button className="deleteChild" onClick={() => deleteChild(child.id)}>
        X
      </button>
    </div>
  );
};

export default EachChild;
