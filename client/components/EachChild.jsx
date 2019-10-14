import React from 'react';

const EachChild = ({
  name,
  childId,
  isContainer,
  renameChild,
  changeType,
  deleteChild
}) => (
  <div className='each-child'>
    <input
      className='child-name'
      type='text'
      defaultValue={name}
      onBlur={() => renameChild(event, childId)}
    ></input>
    <div>
      <input
        className='container-checkbox'
        type='checkbox'
        checked={isContainer}
        onChange={() => changeType(event, childId)}
      />
      <span className='container-label'>Container</span>
    </div>
    <button className='delete-child' onClick={() => deleteChild(childId)}>
      X
    </button>
  </div>
);

export default EachChild;
