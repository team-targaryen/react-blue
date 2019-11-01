import React from 'react';
import OnClickShowSubTree from './OnClickShowSubTree.jsx';
/**
 * Renders the dropdown for each of the displaySubTreeDropDown properties
 */

const SubTree = ({
  displaySubTreeDropDown,
  setTimeoutId,
  recentTimeoutId,
  state,
  checkID_ClearAndSetTimeout,
  showSubTree,
  deleteSubTreeDropdownItem
}) => {
  const displaySubTreeArray = [];
  for (let [key, value] of Object.entries(displaySubTreeDropDown)) {
    displaySubTreeArray.push(
      <OnClickShowSubTree
        setTimeoutId={setTimeoutId}
        recentTimeoutId={recentTimeoutId}
        state={state}
        checkID_ClearAndSetTimeout={checkID_ClearAndSetTimeout}
        key={`SubTreeDropdown${key}`}
        id={key}
        name={value}
        showSubTree={showSubTree}
        deleteSubTreeDropdownItem={deleteSubTreeDropdownItem}
      />
    );
  }
  return (
    <div id='subtree-container'>
      <h2>SubTrees</h2>
      <ul>{displaySubTreeArray}</ul>
    </div>
  );
};
export default SubTree;
