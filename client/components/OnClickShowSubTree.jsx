import React from 'react';
// the !+id means that if the componentID of the string '0' is converted to the number 0 and then checked if !(false) === true,
// if so don't render the - button because we dont want to have to option to delete the button if it is the root of the tree;
const OnClickShowSubTree = ({
  setTimeoutId, 
  recentTimeoutId, 
  state,
  checkID_ClearAndSetTimeout, 
  id, 
  name, 
  showSubTree, 
  deleteSubTreeDropdownItem 
  }) => {
  return (
    <React.Fragment>
    <button onClick={() => {
      showSubTree(+id)
    }}>{name} </button>
    {!+id ? null : 
    <button className='delete-subTree' onClick={() => {
        deleteSubTreeDropdownItem(id);
        showSubTree(0);
        checkID_ClearAndSetTimeout(setTimeoutId, recentTimeoutId, state);
      }}>
      <i className='far fa-minus-square'/>
      </button>}
  </React.Fragment>
  );
}
export default OnClickShowSubTree;